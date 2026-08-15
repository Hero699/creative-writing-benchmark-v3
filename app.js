// Model Evaluation Data
const modelsData = [
    {
        rank: 1,
        name: "Gemini 3.1 Pro",
        logic: 405,
        prose: 470,
        flexibility: 480,
        context: "1M",
        desc: "Absolute best at prose and content flexibility. Resists earned character development, slight instruction-following drift."
    },
    {
        rank: 2,
        name: "Kimi k3",
        logic: 500,
        prose: 400,
        flexibility: 400,
        context: "256k (1M API)",
        desc: "Number one in logic, decent at prose. Heavy CoT reasoning tax."
    },
    {
        rank: 3,
        name: "Opus 4.8",
        logic: 480,
        prose: 380,
        flexibility: 350,
        context: "200k (1M API)",
        desc: "Superior logic compared to Opus 4.6 and Opus 5. The logic king of Anthropic."
    },
    {
        rank: 4,
        name: "Opus 4.6",
        logic: 460,
        prose: 400,
        flexibility: 350,
        context: "200k (1M API)",
        desc: "Decent logic, slightly better than 4.8 in prose."
    },
    {
        rank: 5,
        name: "Gemini 3 Flash",
        logic: 320,
        prose: 420,
        flexibility: 450,
        context: "1M",
        desc: "Very flexible. Amazing lightweight model."
    },
    {
        rank: 6,
        name: "DeepSeek v4",
        logic: 150,
        prose: 400,
        flexibility: 480,
        context: "1M",
        desc: "Great flexibility, lower logic consistency."
    },
    {
        rank: 7,
        name: "Opus 5",
        logic: 400,
        prose: 300,
        flexibility: 200,
        context: "200k (1M API)",
        desc: "Highly capable logic, but very limited flexibility and dry prose."
    },
    {
        rank: 8,
        name: "GLM 5.2",
        logic: 380,
        prose: 300,
        flexibility: 250,
        context: "200k",
        desc: "Sits below Opus 4.6/5 in logic, stiffer prose."
    },
    {
        rank: 9,
        name: "Gemini 3.5 Flash",
        logic: 380,
        prose: 350,
        flexibility: 350,
        context: "1M",
        desc: "Solid step up in logic from 3 Flash."
    },
    {
        rank: 10,
        name: "Gemini 3.6 Flash",
        logic: 300,
        prose: 320,
        flexibility: 370,
        context: "1M-2M",
        desc: "Excellent long-context needle retrieval."
    },
    {
        rank: 11,
        name: "Muse Spark 1.1",
        logic: 360,
        prose: 300,
        flexibility: 330,
        context: "1M",
        desc: "Well-balanced overall baseline."
    },
    {
        rank: 12,
        name: "Sonnet 4.6",
        logic: 350,
        prose: 320,
        flexibility: 300,
        context: "200k (1M API)",
        desc: "Good general benchmark baseline, stiffer narrative prose."
    },
    {
        rank: 13,
        name: "Qwen 3.8 Max",
        logic: 200,
        prose: 350,
        flexibility: 150,
        context: "1M",
        desc: "Capable prose styling, constrained flexibility."
    },
    {
        rank: 14,
        name: "ChatGPT 5.6 Sol Max",
        logic: 50,
        prose: 250,
        flexibility: 100,
        context: "256k (1M API)",
        desc: "Baseline retrieval champion, but high creative hallucination severity rate."
    }
];

// Baseline values for percentage and multiplier calculations
const BASES = {
    logic: 50,
    prose: 250,
    flexibility: 100
};

// Brand Icon and Logo mapping helper
function getBrandLogoInfo(modelName) {
    const name = modelName.toLowerCase();
    if (name.includes('gemini')) {
        return {
            letter: 'G',
            bg: 'linear-gradient(135deg, #1a73e8, #8ab4f8)',
            color: '#ffffff',
            img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M12%2024C12%2017.373%206.627%2012%200%2012C6.627%2012%2012%206.627%2012%200C12%206.627%2017.373%2012%2024%2012C17.373%2012%2012%2017.373%2012%2024Z%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E'
        };
    } else if (name.includes('chatgpt') || name.includes('gpt')) {
        return {
            letter: 'O',
            bg: 'linear-gradient(135deg, #10a37f, #0d8a6a)',
            color: '#ffffff',
            img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23ffffff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M22.28%209.82a5.98%205.98%200%200%200-.51-4.91%206.05%206.05%200%200%200-6.51-2.9A6.06%206.06%200%200%200%204.98%204.18a5.98%205.98%200%200%200-4%202.9%206.05%206.05%200%200%200%20.75%207.1%205.98%205.98%200%200%200%20.51%204.91%206.05%206.05%200%200%200%206.51%202.9A5.98%205.98%200%200%200%2013.26%2024a6.06%206.06%200%200%200%205.77-4.2%205.99%205.99%200%200%200%204-2.9%206.06%206.06%200%200%200-.75-7.08zm-9.02%2012.61a4.48%204.48%200%200%201-2.88-1.04l.14-.08%204.78-2.76a.79%20.79%200%200%200%20.39-.68v-6.74l2.02%201.17a.07%20.07%200%200%201%20.04.05v5.59a4.5%204.5%200%200%201-4.49%204.49zm-9.66-4.13a4.47%204.47%200%200%201-.53-3.01l.14.08%204.78%202.76a.77%20.77%200%200%200%20.78%200l5.85-3.37v2.33a.08%20.08%200%200%201-.04.06L9.74%2019.95a4.5%204.5%200%200%201-6.14-1.65zM2.34%207.9a4.48%204.48%200%200%201%202.37-1.98v5.69a.77%20.77%200%200%200%20.38.67l5.82%203.36-2.02%201.17a.08%20.08%200%200%201-.07%200l-4.83-2.79A4.5%204.5%200%200%201%202.34%207.87zm16.6%203.85L13.1%208.36l2.02-1.16a.08%20.08%200%200%201%20.07%200l4.83%202.79a4.49%204.49%200%200%201-.68%208.1v-5.67a.79%20.79%200%200%200-.4-.67zm2.01-3.02l-.14-.08-4.77-2.79a.78%20.78%200%200%200-.79%200L9.41%209.23V6.9a.07%20.07%200%200%201%20.03-.06l4.83-2.79a4.5%204.5%200%200%201%206.68%204.66zM8.31%2012.86l-2.02-1.16a.08%20.08%200%200%201-.04-.06V6.07a4.5%204.5%200%200%201%207.38-3.45l-.15.08-4.78%202.76a.79%20.79%200%200%200-.39.68zm1.1-2.36l2.6-1.5%202.6%201.5v3l-2.6%201.5-2.6-1.5Z%22/%3E%3C/svg%3E'
        };
    } else if (name.includes('opus') || name.includes('sonnet') || name.includes('claude')) {
        return {
            letter: 'A',
            bg: 'linear-gradient(135deg, #d97706, #b45309)',
            color: '#ffffff',
            img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23ffffff%22%3E%3Cpath%20d%3D%22M13.8%203.5L8.2%2019.5H11L12.3%2015.6H17.7L19%2019.5H21.8L16.2%203.5H13.8ZM13.1%2013.1L15%207.4L16.9%2013.1H13.1ZM2.2%2019.5H5L8.5%209.5H5.7L2.2%2019.5Z%22/%3E%3C/svg%3E'
        };
    } else if (name.includes('deepseek')) {
        return {
            letter: 'D',
            bg: 'linear-gradient(135deg, #0284c7, #0369a1)',
            color: '#ffffff',
            img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20d%3D%22M25%2065%20C30%2042%2048%2028%2072%2028%20C90%2028%2098%2038%2096%2052%20C88%2048%2078%2046%2068%2048%20C52%2050%2038%2062%2030%2076%20C26%2073%2024%2070%2012%2065%20Z%22%20fill%3D%22%23ffffff%22/%3E%3Ccircle%20cx%3D%2246%22%20cy%3D%2246%22%20r%3D%225%22%20fill%3D%22%230284c7%22/%3E%3Cpath%20d%3D%22M18%2068%20C10%2074%206%2082%205%2090%20C15%2089%2024%2083%2030%2076%20C25%2073%2021%2070%2018%2068%20Z%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E'
        };
    } else if (name.includes('kimi')) {
        return {
            letter: 'K',
            bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            color: '#ffffff',
            img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20d%3D%22M30%2020%20h16%20v26%20l22-26%20h20%20L62%2050%20l28%2030%20H68%20L46%2054%20v26%20H30%20V20%20z%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E'
        };
    } else if (name.includes('glm') || name.includes('z ai') || name.includes('zhipu')) {
        return {
            letter: 'Z',
            bg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#ffffff',
            img: 'assets/zai.png'
        };
    } else if (name.includes('qwen')) {
        return {
            letter: 'Q',
            bg: 'linear-gradient(135deg, #ea580c, #c2410c)',
            color: '#ffffff',
            img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpolygon%20points%3D%2250%2C12%2086%2C32%2086%2C72%2050%2C92%2014%2C72%2014%2C32%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%228%22%20stroke-linejoin%3D%22round%22/%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2252%22%20r%3D%2215%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E'
        };
    } else if (name.includes('muse')) {
        return {
            letter: 'M',
            bg: 'linear-gradient(135deg, #db2777, #be185d)',
            color: '#ffffff',
            img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20d%3D%22M22%2078%20V24%20L50%2056%20L78%2024%20V78%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%2212%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E'
        };
    }
    return {
        letter: modelName.charAt(0),
        bg: 'linear-gradient(135deg, #ff2e93, #7e22ce)',
        color: '#ffffff',
        img: null
    };
}

// Global state
let currentSort = 'rank';
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const leaderboardContainer = document.getElementById('leaderboard-container');
const sortButtons = document.querySelectorAll('.sort-btn');
const filterPills = document.querySelectorAll('.filter-pills .filter-pill');
const searchInput = document.getElementById('model-search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const noResultsCard = document.getElementById('no-results-card');
const resetFilterBtn = document.getElementById('reset-filter-btn');
const modelModalBackdrop = document.getElementById('model-modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');
const copyHarnessBtn = document.getElementById('copy-harness-btn');
const toggleExpandBtn = document.getElementById('toggle-expand-btn');
const exportHarnessBtn = document.getElementById('export-harness-btn');
const harnessBody = document.getElementById('harness-body');
const harnessFade = document.getElementById('harness-fade');
const backToTopBtn = document.getElementById('back-to-top-btn');
const modelCountBadge = document.getElementById('model-count-badge');
const exportMarkdownBtn = document.getElementById('export-markdown-btn');
const shareLinkBtn = document.getElementById('share-link-btn');

// Matchup DOM Elements
const matchupSelectA = document.getElementById('matchup-model-a');
const matchupSelectB = document.getElementById('matchup-model-b');
const matchupResultsContainer = document.getElementById('matchup-results-container');
const randomMatchupBtn = document.getElementById('random-matchup-btn');

// Animate numbers for methodology stat-boxes
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 1200;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// Render Leaderboard Model Cards
function renderLeaderboard() {
    let filtered = modelsData.filter(model => {
        const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              model.desc.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;

        if (currentFilter === 'top-logic') return model.logic >= 400;
        if (currentFilter === 'top-prose') return model.prose >= 400;
        if (currentFilter === 'top-flex') return model.flexibility >= 400;

        return true;
    });

    // Sorting
    filtered.sort((a, b) => {
        if (currentSort === 'rank') return a.rank - b.rank;
        if (currentSort === 'logic') return b.logic - a.logic;
        if (currentSort === 'prose') return b.prose - a.prose;
        if (currentSort === 'flexibility') return b.flexibility - a.flexibility;
        return 0;
    });

    leaderboardContainer.innerHTML = '';

    if (filtered.length === 0) {
        noResultsCard.style.display = 'block';
    } else {
        noResultsCard.style.display = 'none';
        
        filtered.forEach(model => {
            const card = document.createElement('div');
            card.className = 'model-card glass-card';
            card.id = `model-card-${model.rank}`;

            let rankClass = '';
            let medalText = '';
            if (model.rank === 1) { rankClass = 'rank-top-1'; medalText = 'Gold'; }
            else if (model.rank === 2) { rankClass = 'rank-top-2'; medalText = 'Silver'; }
            else if (model.rank === 3) { rankClass = 'rank-top-3'; medalText = 'Bronze'; }

            // Check if model has a quirk callout
            let quirkTagHTML = '';
            if (model.name.includes('ChatGPT')) {
                quirkTagHTML = `<a href="#quirk-chatgpt" class="card-quirk-tag danger" onclick="event.stopPropagation();">⚠ 92% Hallucination</a>`;
            } else if (model.name.includes('Gemini 3.1 Pro')) {
                quirkTagHTML = `<a href="#quirk-gemini" class="card-quirk-tag" onclick="event.stopPropagation();">✦ Instruction Quirk</a>`;
            } else if (model.name.includes('Kimi')) {
                quirkTagHTML = `<a href="#quirk-kimi" class="card-quirk-tag" onclick="event.stopPropagation();">⏱ CoT Tax</a>`;
            } else if (model.name.includes('Opus 5')) {
                quirkTagHTML = `<a href="#quirk-opus" class="card-quirk-tag" onclick="event.stopPropagation();">📉 Logic Regression</a>`;
            }

            const brand = getBrandLogoInfo(model.name);
            const logoHTML = brand.img 
                ? `<div class="card-brand-logo" style="background: ${brand.bg};"><img src="${brand.img}" alt="${model.name} logo" class="brand-logo-img" onerror="this.style.display='none'; this.parentElement.innerHTML='${brand.letter}'"></div>`
                : `<div class="card-brand-logo" style="background: ${brand.bg};"><span class="brand-logo-letter">${brand.letter}</span></div>`;

            card.innerHTML = `
                <div class="model-rank-wrapper">
                    <div class="model-rank ${rankClass}">#${model.rank}</div>
                    ${medalText ? `<span class="rank-medal">${medalText}</span>` : ''}
                </div>
                <div class="model-info">
                    <div class="model-header-line">
                        ${logoHTML}
                        <h3>${model.name}</h3>
                        <span class="context-tag">${model.context} Context</span>
                        ${quirkTagHTML}
                    </div>
                    <p class="model-desc">${model.desc}</p>
                </div>
                <div class="model-metrics">
                    <div class="metric" title="Logic Score: ${model.logic}">
                        <span class="metric-val">${model.logic}</span>
                        <span class="metric-label">Logic</span>
                    </div>
                    <div class="metric" title="Prose Score: ${model.prose}">
                        <span class="metric-val">${model.prose}</span>
                        <span class="metric-label">Prose</span>
                    </div>
                    <div class="metric" title="Flexibility Score: ${model.flexibility}">
                        <span class="metric-val">${model.flexibility}</span>
                        <span class="metric-label">Flex</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openModelModal(model));
            leaderboardContainer.appendChild(card);
        });
    }

    if (modelCountBadge) {
        modelCountBadge.textContent = `${filtered.length} Models Shown`;
    }
}

// Render Artificial Analysis Style Vertical Column Charts
function renderComparativeCharts() {
    const logicContainer = document.getElementById('logic-chart-container');
    const proseContainer = document.getElementById('prose-chart-container');
    const flexContainer = document.getElementById('flex-chart-container');

    if (!logicContainer || !proseContainer || !flexContainer) return;

    // Highest points in dataset for proper scaling
    const maxLogic = Math.max(...modelsData.map(m => m.logic)); // 500
    const maxProse = Math.max(...modelsData.map(m => m.prose)); // 470
    const maxFlex = Math.max(...modelsData.map(m => m.flexibility)); // 480

    // 1. Logic Chart
    const sortedByLogic = [...modelsData].sort((a, b) => b.logic - a.logic);
    logicContainer.innerHTML = buildChartHTML(sortedByLogic, 'logic', maxLogic, '#a855f7', 'linear-gradient(180deg, #c084fc, #7e22ce)');

    // 2. Prose Chart
    const sortedByProse = [...modelsData].sort((a, b) => b.prose - a.prose);
    proseContainer.innerHTML = buildChartHTML(sortedByProse, 'prose', maxProse, '#ff2e93', 'linear-gradient(180deg, #ff66b2, #ff2e93)');

    // 3. Flexibility Chart
    const sortedByFlex = [...modelsData].sort((a, b) => b.flexibility - a.flexibility);
    flexContainer.innerHTML = buildChartHTML(sortedByFlex, 'flexibility', maxFlex, '#06b6d4', 'linear-gradient(180deg, #38bdf8, #0284c7)');

    // Attach click listeners on columns to open model popup
    document.querySelectorAll('.bar-column').forEach(col => {
        col.addEventListener('click', () => {
            const rank = parseInt(col.getAttribute('data-rank'));
            const model = modelsData.find(m => m.rank === rank);
            if (model) openModelModal(model);
        });
    });
}

// Helper to construct Side-by-Side Column Bar Chart
function buildChartHTML(dataList, metricKey, maxValue, themeColor, gradientBg) {
    const baseValue = BASES[metricKey];

    return dataList.map(model => {
        const val = model[metricKey];
        // Calculate height percentage relative to highest score (min 12% so bar is visible)
        const heightPct = Math.max(14, Math.round((val / maxValue) * 88));
        const multiplier = (val / baseValue).toFixed(1);
        const brand = getBrandLogoInfo(model.name);

        const iconHTML = brand.img
            ? `<img src="${brand.img}" alt="${model.name}" class="brand-logo-img" onerror="this.style.display='none'; this.parentElement.innerHTML='${brand.letter}'">`
            : `<span class="brand-logo-letter">${brand.letter}</span>`;

        return `
            <div class="bar-column" data-rank="${model.rank}" title="${model.name}: ${val} pts">
                <!-- Hover Tooltip -->
                <div class="bar-tooltip">
                    <div class="bar-tooltip-title">${model.name}</div>
                    <div class="bar-tooltip-score" style="color: ${themeColor};">${val} pts (${multiplier}x Sol)</div>
                    <div class="bar-tooltip-meta">Rank #${model.rank} • ${model.context}</div>
                </div>

                <!-- Pillar Bar with Score & Brand Logo -->
                <div class="bar-pillar" style="height: ${heightPct}%; background: ${gradientBg};">
                    <span class="bar-val">${val}</span>
                    <div class="bar-brand-icon" style="background: ${brand.bg};">
                        ${iconHTML}
                    </div>
                </div>

                <!-- Parallel Angled Label (Artificial Analysis Exact Style) -->
                <span class="bar-label-rotated">${model.name}</span>
            </div>
        `;
    }).join('');
}

// Populate Matchup Select Dropdowns
function initMatchupDropdowns() {
    if (!matchupSelectA || !matchupSelectB) return;

    matchupSelectA.innerHTML = '';
    matchupSelectB.innerHTML = '';

    modelsData.forEach(model => {
        const optA = document.createElement('option');
        optA.value = model.rank;
        optA.textContent = `#${model.rank} ${model.name}`;
        matchupSelectA.appendChild(optA);

        const optB = document.createElement('option');
        optB.value = model.rank;
        optB.textContent = `#${model.rank} ${model.name}`;
        matchupSelectB.appendChild(optB);
    });

    // Default Selection: Gemini 3.1 Pro (#1) vs Kimi k3 (#2)
    matchupSelectA.value = "1";
    matchupSelectB.value = "2";

    matchupSelectA.addEventListener('change', renderMatchupComparison);
    matchupSelectB.addEventListener('change', renderMatchupComparison);

    if (randomMatchupBtn) {
        randomMatchupBtn.addEventListener('click', triggerRouletteMatchup);
    }

    renderMatchupComparison();
}

// High-Energy Roulette Random Matchup Generator
function triggerRouletteMatchup() {
    if (randomMatchupBtn.classList.contains('charging')) return;

    randomMatchupBtn.classList.add('charging');
    matchupResultsContainer.classList.add('shuffling');

    let counter = 0;
    const maxRolls = 14;
    const rollInterval = 60;

    const interval = setInterval(() => {
        const randA = Math.floor(Math.random() * modelsData.length);
        let randB = Math.floor(Math.random() * modelsData.length);
        while (randB === randA) {
            randB = Math.floor(Math.random() * modelsData.length);
        }

        matchupSelectA.value = modelsData[randA].rank;
        matchupSelectB.value = modelsData[randB].rank;
        renderMatchupComparison();

        counter++;
        if (counter >= maxRolls) {
            clearInterval(interval);
            randomMatchupBtn.classList.remove('charging');
            matchupResultsContainer.classList.remove('shuffling');
            matchupResultsContainer.classList.add('locked-in');
            setTimeout(() => {
                matchupResultsContainer.classList.remove('locked-in');
            }, 600);
        }
    }, rollInterval);
}

// Render Head-to-Head Comparison Results
function renderMatchupComparison() {
    if (!matchupResultsContainer) return;

    const rankA = parseInt(matchupSelectA.value);
    const rankB = parseInt(matchupSelectB.value);

    const modelA = modelsData.find(m => m.rank === rankA) || modelsData[0];
    const modelB = modelsData.find(m => m.rank === rankB) || modelsData[1];

    // Compute Deltas
    const logicDiff = modelA.logic - modelB.logic;
    const proseDiff = modelA.prose - modelB.prose;
    const flexDiff = modelA.flexibility - modelB.flexibility;

    const brandA = getBrandLogoInfo(modelA.name);
    const brandB = getBrandLogoInfo(modelB.name);

    const logoA = brandA.img
        ? `<div class="card-brand-logo" style="background: ${brandA.bg};"><img src="${brandA.img}" alt="${modelA.name}" class="brand-logo-img"></div>`
        : `<div class="card-brand-logo" style="background: ${brandA.bg};"><span class="brand-logo-letter">${brandA.letter}</span></div>`;

    const logoB = brandB.img
        ? `<div class="card-brand-logo" style="background: ${brandB.bg};"><img src="${brandB.img}" alt="${modelB.name}" class="brand-logo-img"></div>`
        : `<div class="card-brand-logo" style="background: ${brandB.bg};"><span class="brand-logo-letter">${brandB.letter}</span></div>`;

    // Maximums for meter fills
    const maxLogic = 500;
    const maxProse = 500;
    const maxFlex = 500;

    const deltaLogicHTML = formatDeltaBox('Logic Delta', logicDiff, modelA.name, modelB.name);
    const deltaProseHTML = formatDeltaBox('Prose Delta', proseDiff, modelA.name, modelB.name);
    const deltaFlexHTML = formatDeltaBox('Flexibility Delta', flexDiff, modelA.name, modelB.name);

    // Qualitative Takeaway
    let takeawayText = "";
    if (modelA.rank === modelB.rank) {
        takeawayText = `Same model selected. Choose two distinct models to evaluate architectural divergence.`;
    } else {
        const advantagesA = [];
        const advantagesB = [];

        if (modelA.logic > modelB.logic) advantagesA.push(`Superior causal logic (+${logicDiff} pts)`);
        else if (modelB.logic > modelA.logic) advantagesB.push(`Superior causal logic (+${Math.abs(logicDiff)} pts)`);

        if (modelA.prose > modelB.prose) advantagesA.push(`Richer prose flow (+${proseDiff} pts)`);
        else if (modelB.prose > modelA.prose) advantagesB.push(`Richer prose flow (+${Math.abs(proseDiff)} pts)`);

        if (modelA.flexibility > modelB.flexibility) advantagesA.push(`Broader thematic versatility (+${flexDiff} pts)`);
        else if (modelB.flexibility > modelA.flexibility) advantagesB.push(`Broader thematic versatility (+${Math.abs(flexDiff)} pts)`);

        takeawayText = `<strong>${modelA.name}</strong> (${advantagesA.length > 0 ? advantagesA.join(', ') : 'No primary score edge'}) vs <strong>${modelB.name}</strong> (${advantagesB.length > 0 ? advantagesB.join(', ') : 'No primary score edge'}).`;
    }

    matchupResultsContainer.innerHTML = `
        <div class="matchup-cards-row">
            <!-- Model A Box -->
            <div class="matchup-model-box">
                <div class="matchup-model-header">
                    <div class="model-title-with-logo">
                        ${logoA}
                        <div>
                            <div class="matchup-model-title">${modelA.name}</div>
                            <span class="context-tag">Rank #${modelA.rank} • ${modelA.context}</span>
                        </div>
                    </div>
                </div>
                <div class="matchup-metric-bars">
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Logic & Reasoning</span>
                            <span class="matchup-metric-score" style="color: #c084fc;">${modelA.logic} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.logic / maxLogic) * 100}%; background: linear-gradient(90deg, #c084fc, #7e22ce);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Prose & Tone Quality</span>
                            <span class="matchup-metric-score" style="color: #ff2e93;">${modelA.prose} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.prose / maxProse) * 100}%; background: linear-gradient(90deg, #ff66b2, #ff2e93);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Content Flexibility</span>
                            <span class="matchup-metric-score" style="color: #38bdf8;">${modelA.flexibility} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.flexibility / maxFlex) * 100}%; background: linear-gradient(90deg, #38bdf8, #0284c7);"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Model B Box -->
            <div class="matchup-model-box">
                <div class="matchup-model-header">
                    <div class="model-title-with-logo">
                        ${logoB}
                        <div>
                            <div class="matchup-model-title">${modelB.name}</div>
                            <span class="context-tag">Rank #${modelB.rank} • ${modelB.context}</span>
                        </div>
                    </div>
                </div>
                <div class="matchup-metric-bars">
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Logic & Reasoning</span>
                            <span class="matchup-metric-score" style="color: #c084fc;">${modelB.logic} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.logic / maxLogic) * 100}%; background: linear-gradient(90deg, #c084fc, #7e22ce);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Prose & Tone Quality</span>
                            <span class="matchup-metric-score" style="color: #ff2e93;">${modelB.prose} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.prose / maxProse) * 100}%; background: linear-gradient(90deg, #ff66b2, #ff2e93);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Content Flexibility</span>
                            <span class="matchup-metric-score" style="color: #38bdf8;">${modelB.flexibility} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.flexibility / maxFlex) * 100}%; background: linear-gradient(90deg, #38bdf8, #0284c7);"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delta Summary -->
        <div class="matchup-delta-summary">
            ${deltaLogicHTML}
            ${deltaProseHTML}
            ${deltaFlexHTML}
        </div>

        <!-- Qualitative Verdict Box -->
        <div class="matchup-takeaway-card">
            <h4>Evaluator Matchup Breakdown</h4>
            <p>${takeawayText}</p>
        </div>
    `;
}

// Helper to format individual delta box
function formatDeltaBox(title, diff, nameA, nameB) {
    if (diff === 0) {
        return `
            <div class="delta-box">
                <div class="delta-label">${title}</div>
                <div class="delta-val delta-tie">Even (0)</div>
            </div>
        `;
    }
    const winnerClass = diff > 0 ? 'delta-winner-a' : 'delta-winner-b';
    const leaderName = diff > 0 ? nameA : nameB;
    const sign = diff > 0 ? `+${diff}` : `+${Math.abs(diff)}`;

    return `
        <div class="delta-box">
            <div class="delta-label">${title}</div>
            <div class="delta-val ${winnerClass}">${sign} pts</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.2rem;">${leaderName} leads</div>
        </div>
    `;
}

// Open Modal with Detailed Model Evaluation
function openModelModal(model) {
    const brand = getBrandLogoInfo(model.name);
    const logoHTML = brand.img 
        ? `<div class="card-brand-logo" style="background: ${brand.bg};"><img src="${brand.img}" alt="${model.name} logo" class="brand-logo-img"></div>`
        : `<div class="card-brand-logo" style="background: ${brand.bg};"><span class="brand-logo-letter">${brand.letter}</span></div>`;

    // Multipliers relative to Sol baseline
    const logicMult = (model.logic / BASES.logic).toFixed(1);
    const proseMult = (model.prose / BASES.prose).toFixed(1);
    const flexMult = (model.flexibility / BASES.flexibility).toFixed(1);

    // Dynamic Quirk Callout
    let quirkCallout = '';
    if (model.name.includes('ChatGPT')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>⚠ <strong>Hallucination Caveat:</strong> Exhibits 92% hallucination severity rate despite top retrieval needle accuracy.</span>
                <a href="#quirk-chatgpt" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    } else if (model.name.includes('Gemini 3.1 Pro')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>✦ <strong>Instruction Drift:</strong> Slightly resists character arc progression and requires anti-sycophancy prompts.</span>
                <a href="#quirk-gemini" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    } else if (model.name.includes('Kimi')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>⏱ <strong>Reasoning Token Tax:</strong> Heavy context drain on internal CoT tokens before prose streaming begins.</span>
                <a href="#quirk-kimi" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    } else if (model.name.includes('Opus 5')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>📉 <strong>Logic Regression:</strong> Opus 4.8 scores higher in logic (480) than Opus 5 (400).</span>
                <a href="#quirk-opus" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    }

    modalContent.innerHTML = `
        <div class="modal-header-section">
            <div class="modal-rank-badge">#${model.rank}</div>
            <div class="modal-title-area">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    ${logoHTML}
                    <h2>${model.name}</h2>
                </div>
                <span class="context-tag">${model.context} Context Window</span>
            </div>
        </div>

        ${quirkCallout}

        <div class="modal-score-grid">
            <div class="modal-score-box">
                <div class="modal-score-num">${model.logic}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar" style="width: ${(model.logic / 500) * 100}%;"></div></div>
                <div class="modal-score-label">Logic (${logicMult}x Sol)</div>
            </div>
            <div class="modal-score-box">
                <div class="modal-score-num">${model.prose}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar" style="width: ${(model.prose / 500) * 100}%;"></div></div>
                <div class="modal-score-label">Prose (${proseMult}x Sol)</div>
            </div>
            <div class="modal-score-box">
                <div class="modal-score-num">${model.flexibility}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar" style="width: ${(model.flexibility / 500) * 100}%;"></div></div>
                <div class="modal-score-label">Flex (${flexMult}x Sol)</div>
            </div>
        </div>

        <div class="modal-desc-box">
            <h4 style="color: var(--primary-pink); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">Evaluator Deep-Dive Notes</h4>
            <p>${model.desc}</p>
        </div>
    `;

    modelModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModelModal() {
    modelModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners for Filters & Sorting
sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sortButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.getAttribute('data-sort');
        renderLeaderboard();
    });
});

filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-filter');
        renderLeaderboard();
    });
});

// Search input handling
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) {
            clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
        }
        renderLeaderboard();
    });
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderLeaderboard();
        searchInput.focus();
    });
}

if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
        searchQuery = '';
        currentFilter = 'all';
        currentSort = 'rank';
        if (searchInput) searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        
        filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
        sortButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-sort') === 'rank'));
        renderLeaderboard();
    });
}

// Global keyboard shortcut ('/' to search)
window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    if (e.key === 'Escape') {
        if (modelModalBackdrop.classList.contains('active')) {
            closeModelModal();
        }
    }
});

// Modal Close Triggers
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModelModal);
}

if (modelModalBackdrop) {
    modelModalBackdrop.addEventListener('click', (e) => {
        if (e.target === modelModalBackdrop) {
            closeModelModal();
        }
    });
}

// System Instruction Harness Actions
if (copyHarnessBtn) {
    copyHarnessBtn.addEventListener('click', async () => {
        const textToCopy = harnessBody.innerText;
        try {
            await navigator.clipboard.writeText(textToCopy);
            copyHarnessBtn.classList.add('copied');
            const originalHTML = copyHarnessBtn.innerHTML;
            copyHarnessBtn.innerHTML = `<span>Copied!</span>`;
            setTimeout(() => {
                copyHarnessBtn.classList.remove('copied');
                copyHarnessBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy harness: ', err);
        }
    });
}

if (toggleExpandBtn) {
    toggleExpandBtn.addEventListener('click', () => {
        harnessBody.classList.toggle('expanded');
        const isExpanded = harnessBody.classList.contains('expanded');
        toggleExpandBtn.querySelector('.btn-text').textContent = isExpanded ? 'Minimize' : 'Expand';
        if (harnessFade) {
            harnessFade.style.display = isExpanded ? 'none' : 'block';
        }
    });
}

if (exportHarnessBtn) {
    exportHarnessBtn.addEventListener('click', () => {
        const harnessText = harnessBody.innerText;
        const blob = new Blob([harnessText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'system-harness.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Export Benchmark Leaderboard as Markdown
if (exportMarkdownBtn) {
    exportMarkdownBtn.addEventListener('click', async () => {
        let md = `# LLM Creative Writing Benchmark Beta V3\n\n`;
        md += `> **Important Note**: I actually haven't tested or am testing models FOR v3. So that's why you won't see it.\n\n`;
        md += `> **Scale**: 600 Tests | 12 Genres | 150 Unique Samples\n`;
        md += `> **Sol Baseline**: 50 Logic / 250 Prose / 100 Flex (Uncapped Scale)\n\n`;
        md += `| Rank | Model Name | Logic | Prose | Flexibility | Context Window | Evaluator Notes |\n`;
        md += `|:---:|:---|:---:|:---:|:---:|:---:|:---|\n`;

        modelsData.forEach(m => {
            md += `| #${m.rank} | **${m.name}** | ${m.logic} | ${m.prose} | ${m.flexibility} | ${m.context} | ${m.desc} |\n`;
        });

        try {
            await navigator.clipboard.writeText(md);
            const originalHTML = exportMarkdownBtn.innerHTML;
            exportMarkdownBtn.classList.add('copied');
            exportMarkdownBtn.innerHTML = `<span>Copied Table!</span>`;
            setTimeout(() => {
                exportMarkdownBtn.classList.remove('copied');
                exportMarkdownBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy markdown: ', err);
        }
    });
}

// Share Link
if (shareLinkBtn) {
    shareLinkBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'LLM Creative Writing Benchmark Beta V3',
                    text: 'Explore frontier LLM creative writing benchmark rankings, logic vs prose scores, and system prompt harness.',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share dismissed');
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const originalHTML = shareLinkBtn.innerHTML;
                shareLinkBtn.classList.add('copied');
                shareLinkBtn.innerHTML = `<span>Link Copied!</span>`;
                setTimeout(() => {
                    shareLinkBtn.classList.remove('copied');
                    shareLinkBtn.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy link: ', err);
            }
        }
    });
}

// Floating Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fast Smooth Scroll Engine for all anchor links & buttons
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').substring(1);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        e.preventDefault();
        
        // Custom offset scroll accounting for zoom
        const elementRect = targetElement.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const targetScrollPosition = absoluteElementTop - 30;

        window.scrollTo({
            top: Math.max(0, targetScrollPosition),
            behavior: 'smooth'
        });

        // Flash target section for instant visual confirmation
        targetElement.style.transition = 'box-shadow 0.3s ease';
        targetElement.style.boxShadow = '0 0 35px rgba(255, 46, 147, 0.45)';
        setTimeout(() => {
            targetElement.style.boxShadow = '';
        }, 1200);
    }
});

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    renderComparativeCharts();
    initMatchupDropdowns();
    renderLeaderboard();
});
