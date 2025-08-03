document.addEventListener('DOMContentLoaded', () => {
    // 获取所有需要的DOM元素
    const screens = {
        setup: document.getElementById('setup-section'),
        cards: document.getElementById('cards-section'),
        vote: document.getElementById('vote-section'),
        result: document.getElementById('result-section')
    };

    const startBtn = document.getElementById('start-btn');
    const playerTurnText = document.getElementById('player-turn');
    const cardElement = document.querySelector('.card');
    const cardBack = document.querySelector('.card-back');
    const nextPlayerBtn = document.getElementById('next-player-btn');
    const killerSelect = document.getElementById('killer-select');
    const revealBtn = document.getElementById('reveal-btn');
    const resultMessage = document.getElementById('result-message');
    const finalCardsContainer = document.getElementById('final-cards');
    const restartBtn = document.getElementById('restart-btn');

    // 词库
   const wordPairs = [
    // 植物类
    { civilian: "大树", undercover: "小树" },
    { civilian: "花朵", undercover: "绿叶" },
    { civilian: "小草", undercover: "苔藓" },
    { civilian: "松树", undercover: "柏树" },
    { civilian: "苹果", undercover: "梨子" },
    { civilian: "香蕉", undercover: "橙子" },
    { civilian: "竹子", undercover: "芦苇" },
    { civilian: "荷花", undercover: "莲花" },
    // 文具类
    { civilian: "铅笔", undercover: "钢笔" },
    { civilian: "橡皮", undercover: "修正液" },
    { civilian: "书包", undercover: "笔袋" },
    { civilian: "尺子", undercover: "圆规" },
    { civilian: "彩笔", undercover: "蜡笔" },
    // 新增：食物类
    { civilian: "水果", undercover: "蛋糕" },
    // 新增：动画《熊出没》
    { civilian: "熊大", undercover: "熊二" },
    { civilian: "光头强", undercover: "熊大" },
    // 新增：动画《小马宝莉》
    { civilian: "紫悦", undercover: "碧琪" },
    { civilian: "云宝", undercover: "柔柔" },
    // 新增：动画《哪吒之魔童降世》
    { civilian: "哪吒", undercover: "敖丙" },
    { civilian: "静夜思", undercover: "春晓" },
    { civilian: "咏鹅", undercover: "画鸡" },
    { civilian: "登鹳雀楼", undercover: "望庐山瀑布" },
    { civilian: "春晓", undercover: "咏柳" }
    ];

    // 游戏状态变量
    let players;
    let currentPlayer;

    // ⭐ 核心函数：切换显示的界面
    function showScreen(screenName) {
        for (let key in screens) {
            screens[key].classList.add('hidden');
        }
        screens[screenName].classList.remove('hidden');
    }

    // ⭐ 核心函数：开始新游戏
    function startGame() {
        // 1. 初始化游戏状态
        players = [];
        currentPlayer = 1;

        // 2. 随机选择词组并分配角色
        const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
        const undercoverIndex = Math.floor(Math.random() * 3);

        for (let i = 0; i < 3; i++) {
            const isUndercover = (i === undercoverIndex);
            players.push({
                id: i + 1,
                word: isUndercover ? wordPair.undercover : wordPair.civilian,
                role: isUndercover ? '卧底' : '平民'
            });
        }

        console.log("本局底牌:", players); // 测试用，保留

        // 3. 重置并准备UI
        cardElement.classList.remove('is-flipped');
        killerSelect.value = '';
        prepareTurn();
        showScreen('cards');
    }

    // ⭐ 核心函数：为当前玩家准备回合
    function prepareTurn() {
        const player = players[currentPlayer - 1];
        playerTurnText.textContent = `请 ${player.id} 号玩家查看身份`;

        // ⭐ UI修改核心：去掉“你的身份是”，UI更简洁
        cardBack.innerHTML = `
            <h2>${player.role}</h2>
            <h1>${player.word}</h1>
        `;

        // 更新按钮文字
        nextPlayerBtn.textContent = (currentPlayer === 3) ? '查看完毕，开始讨论' : '查看完毕，传给下一位';
        nextPlayerBtn.disabled = true; // 必须先翻牌才能点击
    }

    // 翻牌
    function flipCard() {
        if (!cardElement.classList.contains('is-flipped')) {
            cardElement.classList.add('is-flipped');
            nextPlayerBtn.disabled = false; // 翻牌后才能点击按钮
        }
    }

    // ⭐ BUG修复核心：重构后的下一位玩家逻辑
    function handleNextPlayer() {
        nextPlayerBtn.disabled = true;
        cardElement.classList.remove('is-flipped');

        // 等待卡牌翻转动画结束
        setTimeout(() => {
            if (currentPlayer < 3) {
                // 如果不是最后一位玩家
                currentPlayer++;
                prepareTurn();
            } else {
                // 如果是最后一位玩家，进入投票环节
                showScreen('vote');
            }
        }, 800); // 必须等待动画播放完
    }

    // 揭晓结果
    function revealResult() {
        const votedPlayerId = parseInt(killerSelect.value);
        if (!votedPlayerId) {
            alert('请选择一个玩家！');
            return;
        }

        const undercover = players.find(p => p.role === '卧底');
        resultMessage.textContent = (votedPlayerId === undercover.id) ? '平民胜利！卧底已被揪出！' : '卧底胜利！很遗憾，抓错人了。';

        finalCardsContainer.innerHTML = '';
        players.forEach(player => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('final-card');
            if (player.role === '卧底') {
                cardDiv.classList.add('undercover');
            }
            cardDiv.innerHTML = `<strong>${player.id}号: ${player.role}</strong> (${player.word})`;
            finalCardsContainer.appendChild(cardDiv);
        });

        showScreen('result');
    }

    // 事件监听
    startBtn.addEventListener('click', startGame);
    cardElement.addEventListener('click', flipCard);
    nextPlayerBtn.addEventListener('click', handleNextPlayer);
    revealBtn.addEventListener('click', revealResult);
    restartBtn.addEventListener('click', () => showScreen('setup')); // 返回主菜单

    // 初始加载时，显示主界面
    showScreen('setup');

});


