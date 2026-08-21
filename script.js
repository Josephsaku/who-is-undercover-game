document.addEventListener('DOMContentLoaded', () => {
    const RECENT_WORDS_KEY = 'undercover-recent-word-pairs-v2';
    const RECENT_WORDS_LIMIT = 20;

    const wordPairs = [
        // 动画：只保留国内小学生普遍熟悉的作品与角色。
        ['animation', '熊大', '熊二'],
        ['animation', '喜羊羊', '懒羊羊'],
        ['animation', '美羊羊', '暖羊羊'],
        ['animation', '灰太狼', '红太狼'],
        ['animation', '猪猪侠', '超人强'],
        ['animation', '大头儿子', '小头爸爸'],
        ['animation', '海绵宝宝', '派大星'],
        ['animation', '蜡笔小新', '小白'],
        ['animation', '哆啦A梦', '大雄'],
        ['animation', '静香', '小夫'],
        ['animation', '柯南', '小兰'],
        ['animation', '孙悟空', '猪八戒'],
        ['animation', '阿奇', '毛毛'],
        ['animation', '乐迪', '小爱'],
        ['animation', '佩奇', '乔治'],
        ['animation', '汤姆', '杰瑞'],
        ['animation', '艾莎', '安娜'],
        ['animation', '胡迪', '巴斯光年'],
        ['animation', '皮卡丘', '杰尼龟'],
        ['animation', '马里奥', '路易吉'],
        ['animation', '小黄人', '格鲁'],
        ['animation', '奥特曼', '怪兽'],

        // 校园
        ['campus', '铅笔', '自动铅笔'],
        ['campus', '钢笔', '圆珠笔'],
        ['campus', '橡皮', '修正带'],
        ['campus', '直尺', '三角尺'],
        ['campus', '书包', '笔袋'],
        ['campus', '课本', '练习册'],
        ['campus', '讲台', '课桌'],
        ['campus', '粉笔', '白板笔'],
        ['campus', '语文', '数学'],
        ['campus', '英语', '科学'],
        ['campus', '上课', '自习'],
        ['campus', '早读', '晚读'],
        ['campus', '班长', '组长'],
        ['campus', '老师', '校长'],
        ['campus', '同桌', '前后桌'],
        ['campus', '操场', '体育馆'],
        ['campus', '图书馆', '阅览室'],
        ['campus', '考试', '测验'],
        ['campus', '寒假', '暑假'],
        ['campus', '红领巾', '校徽'],
        ['campus', '值日', '大扫除'],
        ['campus', '作业本', '日记本'],

        // 生活
        ['life', '洗发水', '沐浴露'],
        ['life', '毛巾', '浴巾'],
        ['life', '沙发', '椅子'],
        ['life', '冰箱', '空调'],
        ['life', '电视', '电脑'],
        ['life', '耳机', '音箱'],
        ['life', '雨伞', '雨衣'],
        ['life', '拖鞋', '运动鞋'],
        ['life', '公交车', '地铁'],
        ['life', '出租车', '网约车'],
        ['life', '超市', '便利店'],
        ['life', '医院', '诊所'],
        ['life', '公园', '游乐园'],
        ['life', '电梯', '扶梯'],
        ['life', '门铃', '闹钟'],
        ['life', '钥匙', '门卡'],
        ['life', '台灯', '手电筒'],
        ['life', '镜子', '相框'],
        ['life', '杯子', '水壶'],
        ['life', '筷子', '勺子'],
        ['life', '盘子', '碗'],
        ['life', '被子', '毛毯'],

        // 自然
        ['nature', '老虎', '狮子'],
        ['nature', '豹子', '猎豹'],
        ['nature', '大象', '犀牛'],
        ['nature', '长颈鹿', '斑马'],
        ['nature', '熊猫', '北极熊'],
        ['nature', '海豚', '鲸鱼'],
        ['nature', '鲨鱼', '鳄鱼'],
        ['nature', '乌龟', '甲鱼'],
        ['nature', '兔子', '松鼠'],
        ['nature', '猫', '狐狸'],
        ['nature', '蚂蚁', '蜜蜂'],
        ['nature', '蝴蝶', '蜻蜓'],
        ['nature', '青蛙', '蟾蜍'],
        ['nature', '金鱼', '锦鲤'],
        ['nature', '荷花', '睡莲'],
        ['nature', '松树', '柏树'],
        ['nature', '竹子', '芦苇'],
        ['nature', '玫瑰', '月季'],
        ['nature', '太阳', '月亮'],
        ['nature', '雷', '闪电'],
        ['nature', '河流', '湖泊'],
        ['nature', '森林', '草原'],

        // 食物
        ['food', '苹果', '梨'],
        ['food', '香蕉', '芒果'],
        ['food', '橙子', '橘子'],
        ['food', '葡萄', '蓝莓'],
        ['food', '西瓜', '哈密瓜'],
        ['food', '草莓', '樱桃'],
        ['food', '桃子', '李子'],
        ['food', '白菜', '生菜'],
        ['food', '土豆', '红薯'],
        ['food', '西红柿', '胡萝卜'],
        ['food', '黄瓜', '丝瓜'],
        ['food', '玉米', '豌豆'],
        ['food', '米饭', '粥'],
        ['food', '馒头', '包子'],
        ['food', '饺子', '馄饨'],
        ['food', '面条', '米粉'],
        ['food', '蛋糕', '面包'],
        ['food', '饼干', '薯片'],
        ['food', '牛奶', '豆浆'],
        ['food', '果汁', '酸奶'],
        ['food', '冰淇淋', '雪糕'],
        ['food', '巧克力', '糖果'],

        // 运动
        ['sports', '篮球', '足球'],
        ['sports', '乒乓球', '羽毛球'],
        ['sports', '网球', '排球'],
        ['sports', '跳绳', '踢毽子'],
        ['sports', '跑步', '竞走'],
        ['sports', '跳高', '跳远'],
        ['sports', '游泳', '潜水'],
        ['sports', '滑冰', '滑雪'],
        ['sports', '轮滑', '滑板'],
        ['sports', '自行车', '平衡车'],
        ['sports', '围棋', '象棋'],
        ['sports', '军棋', '飞行棋'],
        ['sports', '仰卧起坐', '俯卧撑'],
        ['sports', '接力赛', '拔河'],
        ['sports', '射箭', '射击'],
        ['sports', '武术', '跆拳道'],
        ['sports', '体操', '舞蹈'],
        ['sports', '保龄球', '台球'],
        ['sports', '冠军', '亚军'],
        ['sports', '球拍', '球棒'],
        ['sports', '泳镜', '泳帽'],
        ['sports', '短跑', '长跑']
    ].map(([category, first, second], index) => ({
        id: `${category}-${index + 1}`,
        category,
        words: [first, second]
    }));

    const screens = {
        setup: document.getElementById('setup-section'),
        cards: document.getElementById('cards-section'),
        vote: document.getElementById('vote-section'),
        result: document.getElementById('result-section')
    };

    const modeButtons = [...document.querySelectorAll('[data-mode]')];
    const categoryPanel = document.getElementById('category-panel');
    const categoryButtons = [...document.querySelectorAll('[data-category]')];
    const startBtn = document.getElementById('start-btn');
    const playerTurn = document.getElementById('player-turn');
    const playerProgress = document.getElementById('player-progress');
    const roundCount = document.getElementById('round-count');
    const wordCard = document.querySelector('.word-card');
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    const secretWord = document.getElementById('secret-word');
    const nextPlayerBtn = document.getElementById('next-player-btn');
    const voteButtons = [...document.querySelectorAll('.player-vote')];
    const revealBtn = document.getElementById('reveal-btn');
    const resultSymbol = document.getElementById('result-symbol');
    const resultKicker = document.getElementById('result-kicker');
    const resultMessage = document.getElementById('result-message');
    const resultSummary = document.getElementById('result-summary');
    const finalCards = document.getElementById('final-cards');
    const restartBtn = document.getElementById('restart-btn');
    const homeBtn = document.getElementById('home-btn');

    let selectionMode = 'all';
    let selectedCategory = 'animation';
    let players = [];
    let currentPlayerIndex = 0;
    let votedPlayerId = null;
    let isTransitioning = false;

    function secureRandomInt(max) {
        if (!Number.isInteger(max) || max <= 0) {
            throw new RangeError('max must be a positive integer');
        }

        if (!globalThis.crypto?.getRandomValues) {
            return Math.floor(Math.random() * max);
        }

        const range = 0x100000000;
        const cutoff = range - (range % max);
        const values = new Uint32Array(1);
        do {
            globalThis.crypto.getRandomValues(values);
        } while (values[0] >= cutoff);
        return values[0] % max;
    }

    function vibrate(pattern = 18) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }

    function readRecentPairIds() {
        try {
            const stored = JSON.parse(localStorage.getItem(RECENT_WORDS_KEY) || '[]');
            return Array.isArray(stored) ? stored.filter(id => typeof id === 'string') : [];
        } catch {
            return [];
        }
    }

    function rememberPair(id) {
        const recent = readRecentPairIds().filter(recentId => recentId !== id);
        recent.unshift(id);
        try {
            localStorage.setItem(RECENT_WORDS_KEY, JSON.stringify(recent.slice(0, RECENT_WORDS_LIMIT)));
        } catch {
            // The game still works when storage is unavailable or full.
        }
    }

    function pickWordPair() {
        const pool = selectionMode === 'category'
            ? wordPairs.filter(pair => pair.category === selectedCategory)
            : wordPairs;
        const recent = new Set(readRecentPairIds());
        const freshPool = pool.filter(pair => !recent.has(pair.id));
        const candidates = freshPool.length ? freshPool : pool;
        const pair = candidates[secureRandomInt(candidates.length)];
        rememberPair(pair.id);
        return pair;
    }

    function showScreen(name) {
        Object.entries(screens).forEach(([screenName, element]) => {
            element.hidden = screenName !== name;
        });
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function setPressed(buttons, activeButton, attribute = 'aria-pressed') {
        buttons.forEach(button => {
            const selected = button === activeButton;
            button.classList.toggle('is-selected', selected);
            button.setAttribute(attribute, String(selected));
        });
    }

    function createPlayers(pair) {
        const undercoverIndex = secureRandomInt(3);
        const swapWords = secureRandomInt(2) === 1;
        const civilianWord = pair.words[swapWords ? 1 : 0];
        const undercoverWord = pair.words[swapWords ? 0 : 1];

        return Array.from({ length: 3 }, (_, index) => {
            const isUndercover = index === undercoverIndex;
            return {
                id: index + 1,
                role: isUndercover ? '卧底' : '平民',
                word: isUndercover ? undercoverWord : civilianWord
            };
        });
    }

    function startGame() {
        players = createPlayers(pickWordPair());
        currentPlayerIndex = 0;
        votedPlayerId = null;
        voteButtons.forEach(button => {
            button.classList.remove('is-selected');
            button.setAttribute('aria-checked', 'false');
        });
        revealBtn.disabled = true;
        prepareTurn();
        showScreen('cards');
        vibrate();
    }

    function renderProgress() {
        playerProgress.replaceChildren();
        players.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'progress-dot';
            if (index < currentPlayerIndex) dot.classList.add('is-complete');
            if (index === currentPlayerIndex) dot.classList.add('is-current');
            playerProgress.appendChild(dot);
        });
    }

    function prepareTurn() {
        const player = players[currentPlayerIndex];
        playerTurn.textContent = `${player.id} 号玩家`;
        secretWord.textContent = player.word;
        secretWord.classList.toggle('is-medium', Array.from(player.word).length === 3);
        secretWord.classList.toggle('is-long', Array.from(player.word).length >= 4);
        roundCount.textContent = `${currentPlayerIndex + 1} / 3`;
        renderProgress();
        wordCard.classList.remove('is-flipped');
        wordCard.setAttribute('aria-pressed', 'false');
        wordCard.setAttribute('aria-label', '点击查看词语');
        cardFront.setAttribute('aria-hidden', 'false');
        cardBack.setAttribute('aria-hidden', 'true');
        nextPlayerBtn.textContent = currentPlayerIndex === 2 ? '查看完毕，开始讨论' : '查看完毕，传给下一位';
        nextPlayerBtn.disabled = true;
        isTransitioning = false;
    }

    function flipCard() {
        if (isTransitioning || wordCard.classList.contains('is-flipped')) return;
        wordCard.classList.add('is-flipped');
        wordCard.setAttribute('aria-pressed', 'true');
        wordCard.setAttribute('aria-label', `你的词语是${players[currentPlayerIndex].word}`);
        cardFront.setAttribute('aria-hidden', 'true');
        cardBack.setAttribute('aria-hidden', 'false');
        nextPlayerBtn.disabled = false;
        vibrate();
    }

    function handleNextPlayer() {
        if (isTransitioning || nextPlayerBtn.disabled) return;
        isTransitioning = true;
        nextPlayerBtn.disabled = true;
        wordCard.classList.remove('is-flipped');
        wordCard.setAttribute('aria-pressed', 'false');
        wordCard.setAttribute('aria-label', '点击查看词语');
        cardFront.setAttribute('aria-hidden', 'false');
        cardBack.setAttribute('aria-hidden', 'true');
        vibrate(12);

        window.setTimeout(() => {
            if (currentPlayerIndex < 2) {
                currentPlayerIndex += 1;
                prepareTurn();
            } else {
                isTransitioning = false;
                showScreen('vote');
            }
        }, 520);
    }

    function selectVotedPlayer(button) {
        votedPlayerId = Number(button.dataset.player);
        setPressed(voteButtons, button, 'aria-checked');
        revealBtn.disabled = false;
        vibrate(12);
    }

    function renderResult() {
        const undercover = players.find(player => player.role === '卧底');
        const civiliansWon = votedPlayerId === undercover.id;

        resultSymbol.textContent = civiliansWon ? '✓' : '!';
        resultSymbol.className = `result-symbol ${civiliansWon ? 'is-win' : 'is-loss'}`;
        resultKicker.textContent = civiliansWon ? '平民胜利' : '卧底胜利';
        resultMessage.textContent = civiliansWon ? '卧底找到了！' : '卧底藏住了！';
        resultSummary.textContent = `你们选择了 ${votedPlayerId} 号，真正的卧底是 ${undercover.id} 号。`;

        finalCards.replaceChildren();
        players.forEach(player => {
            const item = document.createElement('article');
            item.className = 'final-card';
            if (player.role === '卧底') item.classList.add('is-undercover');
            if (player.id === votedPlayerId) item.classList.add('is-voted');

            const badges = [];
            if (player.id === votedPlayerId) badges.push('<span class="result-badge voted-badge">被票</span>');
            if (player.role === '卧底') badges.push('<span class="result-badge role-badge">卧底</span>');

            item.innerHTML = `
                <div class="final-player">
                    <span class="final-number">0${player.id}</span>
                    <div>
                        <strong>${player.id} 号玩家</strong>
                        <span>${player.role}</span>
                    </div>
                </div>
                <div class="final-word">${player.word}</div>
                <div class="result-badges">${badges.join('')}</div>
            `;
            finalCards.appendChild(item);
        });

        showScreen('result');
        vibrate(civiliansWon ? [25, 40, 25] : [60]);
    }

    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectionMode = button.dataset.mode;
            setPressed(modeButtons, button);
            categoryPanel.hidden = selectionMode !== 'category';
            vibrate(10);
        });
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedCategory = button.dataset.category;
            setPressed(categoryButtons, button);
            vibrate(10);
        });
    });

    startBtn.addEventListener('click', startGame);
    wordCard.addEventListener('click', flipCard);
    nextPlayerBtn.addEventListener('click', handleNextPlayer);
    voteButtons.forEach(button => button.addEventListener('click', () => selectVotedPlayer(button)));
    revealBtn.addEventListener('click', renderResult);
    restartBtn.addEventListener('click', startGame);
    homeBtn.addEventListener('click', () => showScreen('setup'));

    showScreen('setup');

});
