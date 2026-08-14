const modelsData = [
    {
        rank: 1,
        name: "Gemini 3.1 Pro",
        logic: 425,
        prose: 470,
        flexibility: 480,
        desc: "Absolute best at prose and content flexibility. Has a bit of a problem with strict instruction following and constraint adherence. Sycophantic, resists earned character development.",
        context: "1M"
    },
    {
        rank: 2,
        name: "Kimi k3",
        logic: 500,
        prose: 400,
        flexibility: 400,
        desc: "Number one in logic, decent at prose. 1M context via API / select tiers (256k on web interface). Reasoning Token Tax: eats significant context window space on internal Chain-of-Thought (CoT) before outputting narrative text and thinks for a long time.",
        context: "256k (1M API)"
    },
    {
        rank: 3,
        name: "Opus 4.8",
        logic: 480,
        prose: 380,
        flexibility: 350,
        desc: "Superior logic compared to Opus 4.6 and Opus 5. The logic king of Anthropic.",
        context: "200k (1M API)"
    },
    {
        rank: 4,
        name: "Opus 4.6",
        logic: 460,
        prose: 400,
        flexibility: 350,
        desc: "Not as great as 4.8 in logic, but better in prose by a small margin.",
        context: "200k (1M API)"
    },
    {
        rank: 5,
        name: "Gemini 3 Flash",
        logic: 320,
        prose: 420,
        flexibility: 450,
        desc: "Very flexible. Absolutely amazing lightweight model. Better than Deepseek at prose but worse at flexibility. Makes mistakes.",
        context: "1M"
    },
    {
        rank: 6,
        name: "Deepseek flash v4 (not updated)",
        logic: 150,
        prose: 400,
        flexibility: 480,
        desc: "Very bad at logic. Great at flexibility, but Gemini 3 Flash beats it in prose.",
        context: "1M"
    },
    {
        rank: 7,
        name: "Opus 5",
        logic: 400,
        prose: 300,
        flexibility: 200,
        desc: "Better than GLM 5.2 at logic. Highly capable but very limited flexibility in prose, quite dry, projects biases.",
        context: "200k (1M API)"
    },
    {
        rank: 8,
        name: "GLM 5.2",
        logic: 380,
        prose: 300,
        flexibility: 250,
        desc: "Worse than Opus 4.6 and Opus 5 at logic. Isn't very flexible in prose.",
        context: "200k"
    },
    {
        rank: 9,
        name: "Gemini 3.5 Flash",
        logic: 380,
        prose: 350,
        flexibility: 350,
        desc: "Better at logic than 3 flash. Suggest over 3 if you value logic.",
        context: "1M"
    },
    {
        rank: 10,
        name: "Gemini 3.6 Flash",
        logic: 300,
        prose: 320,
        flexibility: 370,
        desc: "Second best right after ChatGPT at context remembrance and needle tracking across massive context windows. Worse at abstract creativity.",
        context: "1M-2M"
    },
    {
        rank: 11,
        name: "Muse Spark 1.1",
        logic: 360,
        prose: 300,
        flexibility: 330,
        desc: "Better at logic and prose than Sonnet 4.5. Decent overall.",
        context: "1M"
    },
    {
        rank: 12,
        name: "Sonnet 4.6",
        logic: 350,
        prose: 320,
        flexibility: 300,
        desc: "Better for creative writing than Sonnet 5, but prose is still not great and lacks flexibility.",
        context: "200k (1M API)"
    },
    {
        rank: 13,
        name: "Qwen 3.8 Max",
        logic: 200,
        prose: 350,
        flexibility: 150,
        desc: "Better than Sonnet 4.6 at prose, but flexibility is pretty bad.",
        context: "1M"
    },
    {
        rank: 14,
        name: "ChatGPT 5.6 Sol Max",
        logic: 50,
        prose: 250,
        flexibility: 100,
        desc: "Top model for literal context remembrance and retrieval accuracy (requires API for 1M; 256k on Plus). However, exhibits a 92% hallucination severity rate on creative benchmarks—hallucinating frequently and heavily (misreading canon, inventing facts, and rigid narrative drift).",
        context: "256k (1M API)"
    }
];

const modelBrandConfig = {
    "Gemini 3.1 Pro": { brand: "Google Gemini", logoImg: "assets/gemini.png", icon: "G", color: "transparent", gradient: "linear-gradient(180deg, #ff4e50 0%, #fabc05 32%, #22c55e 65%, #3b82f6 100%)" },
    "Kimi k3": { brand: "Moonshot Kimi", icon: "K", color: "#111114", gradient: "linear-gradient(180deg, #38383e 0%, #1c1c20 45%, #070708 100%)" },
    "Opus 4.8": { brand: "Anthropic Claude", logoImg: "assets/claude.png", icon: "A", color: "transparent", gradient: "linear-gradient(180deg, #fb923c 0%, #ea580c 55%, #7c2d12 100%)" },
    "Opus 4.6": { brand: "Anthropic Claude", logoImg: "assets/claude.png", icon: "A", color: "transparent", gradient: "linear-gradient(180deg, #fb923c 0%, #ea580c 55%, #7c2d12 100%)" },
    "Gemini 3 Flash": { brand: "Google Gemini", logoImg: "assets/gemini.png", icon: "G", color: "transparent", gradient: "linear-gradient(180deg, #ff4e50 0%, #fabc05 32%, #22c55e 65%, #3b82f6 100%)" },
    "Deepseek flash v4 (not updated)": { brand: "DeepSeek", logoImg: "assets/deepseek.png", icon: "D", color: "transparent", gradient: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 50%, #172554 100%)" },
    "Opus 5": { brand: "Anthropic Claude", logoImg: "assets/claude.png", icon: "A", color: "transparent", gradient: "linear-gradient(180deg, #fb923c 0%, #ea580c 55%, #7c2d12 100%)" },
    "GLM 5.2": { brand: "Zhipu AI GLM", logoImg: "assets/glm.png", icon: "Z", color: "transparent", gradient: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 45%, #27272a 100%)" },
    "Gemini 3.5 Flash": { brand: "Google Gemini", logoImg: "assets/gemini.png", icon: "G", color: "transparent", gradient: "linear-gradient(180deg, #ff4e50 0%, #fabc05 32%, #22c55e 65%, #3b82f6 100%)" },
    "Gemini 3.6 Flash": { brand: "Google Gemini", logoImg: "assets/gemini.png", icon: "G", color: "transparent", gradient: "linear-gradient(180deg, #ff4e50 0%, #fabc05 32%, #22c55e 65%, #3b82f6 100%)" },
    "Muse Spark 1.1": { brand: "Meta", icon: "M", color: "#2563eb", gradient: "linear-gradient(180deg, #60a5fa 0%, #2563eb 55%, #1e3a8a 100%)" },
    "Sonnet 4.6": { brand: "Anthropic Claude", logoImg: "assets/claude.png", icon: "A", color: "transparent", gradient: "linear-gradient(180deg, #fb923c 0%, #ea580c 55%, #7c2d12 100%)" },
    "Qwen 3.8 Max": { brand: "Alibaba Qwen", logoImg: "assets/qwen.png", icon: "Q", color: "transparent", gradient: "linear-gradient(180deg, #818cf8 0%, #6366f1 50%, #312e81 100%)" },
    "ChatGPT 5.6 Sol Max": { brand: "OpenAI ChatGPT", logoImg: "assets/chatgpt.png", icon: "O", color: "transparent", gradient: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%)" }
};

const modelDisplayNames = {
    "Gemini 3.1 Pro": "Gemini 3.1 Pro",
    "Kimi k3": "Kimi k3",
    "Opus 4.8": "Opus 4.8",
    "Opus 4.6": "Opus 4.6",
    "Gemini 3 Flash": "Gemini 3 Flash",
    "Deepseek flash v4 (not updated)": "DeepSeek v4",
    "Opus 5": "Opus 5",
    "GLM 5.2": "GLM 5.2",
    "Gemini 3.5 Flash": "Gemini 3.5 Flash",
    "Gemini 3.6 Flash": "Gemini 3.6 Flash",
    "Muse Spark 1.1": "Muse Spark 1.1",
    "Sonnet 4.6": "Sonnet 4.6",
    "Qwen 3.8 Max": "Qwen 3.8 Max",
    "ChatGPT 5.6 Sol Max": "ChatGPT 5.6 Sol"
};

const modelQuirkMapping = {
    "Gemini 3.1 Pro": { tag: "Instruction & Sycophancy Note", targetId: "quirk-gemini", isDanger: false },
    "Kimi k3": { tag: "CoT Context Tax & Latency", targetId: "quirk-kimi", isDanger: false },
    "ChatGPT 5.6 Sol Max": { tag: "92% Hallucination Flaw", targetId: "quirk-chatgpt", isDanger: true },
    "Opus 5": { tag: "Opus Regression Note", targetId: "quirk-opus", isDanger: false }
};

const container = document.getElementById('leaderboard-container');
const sortBtns = document.querySelectorAll('.sort-btn');
const filterPills = document.querySelectorAll('.filter-pill');
const searchInput = document.getElementById('model-search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const noResultsCard = document.getElementById('no-results-card');
const resetFilterBtn = document.getElementById('reset-filter-btn');
const modelCountBadge = document.getElementById('model-count-badge');

// Export & Share Buttons
const exportMarkdownBtn = document.getElementById('export-markdown-btn');
const shareLinkBtn = document.getElementById('share-link-btn');
const exportHarnessBtn = document.getElementById('export-harness-btn');

// Matchup Elements
const matchupSelectA = document.getElementById('matchup-model-a');
const matchupSelectB = document.getElementById('matchup-model-b');
const matchupResultsContainer = document.getElementById('matchup-results-container');
const randomMatchupBtn = document.getElementById('random-matchup-btn');

// Modal Elements
const modalBackdrop = document.getElementById('model-modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Harness Elements
const copyBtn = document.getElementById('copy-harness-btn');
const toggleExpandBtn = document.getElementById('toggle-expand-btn');
const harnessBody = document.getElementById('harness-body');
const harnessFade = document.getElementById('harness-fade');

// Back to Top Element
const backToTopBtn = document.getElementById('back-to-top-btn');

// State Management
let currentSort = 'rank';
let currentFilter = 'all';
let currentSearch = '';
let isMatchupRolling = false;

// Helper to get Icon/Logo HTML
function getModelLogoHTML(modelName, sizeClass = "brand-logo-img") {
    const cfg = modelBrandConfig[modelName] || { icon: "•", color: "#ff2e93", gradient: "var(--accent-gradient)" };
    if (cfg.logoImg) {
        return `<img src="${cfg.logoImg}" alt="${cfg.brand}" class="${sizeClass}">`;
    }
    return `<span class="brand-logo-letter">${cfg.icon}</span>`;
}

// Render Artificial Analysis-Style Vertical Benchmark Column Charts
function renderBenchmarkCharts() {
    renderSingleChart('logic', 'logic-chart-container', 50);
    renderSingleChart('prose', 'prose-chart-container', 250);
    renderSingleChart('flexibility', 'flex-chart-container', 100);
}

function renderSingleChart(metric, containerId, baseline) {
    const targetEl = document.getElementById(containerId);
    if (!targetEl) return;
    targetEl.innerHTML = '';

    // Sort descending by metric
    const sorted = [...modelsData].sort((a, b) => b[metric] - a[metric]);
    const maxVal = sorted[0][metric];

    sorted.forEach((model, idx) => {
        const heightPct = Math.max(12, Math.round((model[metric] / maxVal) * 100));
        const cfg = modelBrandConfig[model.name] || { icon: "•", color: "#ff2e93", gradient: "var(--accent-gradient)" };
        const multText = (model[metric] / baseline).toFixed(1) + '×';
        const displayName = modelDisplayNames[model.name] || model.name;
        const iconHTML = getModelLogoHTML(model.name);

        const col = document.createElement('div');
        col.className = 'bar-column';
        col.innerHTML = `
            <div class="bar-pillar" style="height: ${heightPct}%; background: ${cfg.gradient};">
                <span class="bar-val">${model[metric]}</span>
            </div>
            <div class="bar-brand-icon" style="background: ${cfg.color};" title="${cfg.brand}">${iconHTML}</div>
            <div class="bar-label-rotated" title="${model.name}">${displayName}</div>
            <div class="bar-tooltip">
                <div class="bar-tooltip-title">${model.name}</div>
                <div class="bar-tooltip-score">${model[metric]} pts (#${idx + 1})</div>
                <div class="bar-tooltip-meta">${multText} Sol Base (${baseline})</div>
            </div>
        `;

        col.addEventListener('click', () => {
            openModelModal(model, model.rank);
        });

        targetEl.appendChild(col);
    });
}

// Head-to-Head Matchup Tool Engine
function initMatchupTool() {
    if (!matchupSelectA || !matchupSelectB || !matchupResultsContainer) return;

    matchupSelectA.innerHTML = '';
    matchupSelectB.innerHTML = '';

    modelsData.forEach(model => {
        const optA = document.createElement('option');
        optA.value = model.name;
        optA.textContent = `#${model.rank} ${model.name}`;
        matchupSelectA.appendChild(optA);

        const optB = document.createElement('option');
        optB.value = model.name;
        optB.textContent = `#${model.rank} ${model.name}`;
        matchupSelectB.appendChild(optB);
    });

    // Default: Model A = Gemini 3.1 Pro (#1), Model B = Kimi k3 (#2)
    matchupSelectA.value = "Gemini 3.1 Pro";
    matchupSelectB.value = "Kimi k3";

    matchupSelectA.addEventListener('change', () => renderMatchup());
    matchupSelectB.addEventListener('change', () => renderMatchup());

    if (randomMatchupBtn) {
        randomMatchupBtn.addEventListener('click', triggerRandomMatchup);
    }

    renderMatchup();
}

function triggerRandomMatchup() {
    if (isMatchupRolling || !matchupSelectA || !matchupSelectB || modelsData.length < 2) return;
    isMatchupRolling = true;

    // Pick final target models (distinct)
    const finalIdxA = Math.floor(Math.random() * modelsData.length);
    let finalIdxB = Math.floor(Math.random() * (modelsData.length - 1));
    if (finalIdxB >= finalIdxA) finalIdxB++;

    // Charging state on button
    if (randomMatchupBtn) {
        randomMatchupBtn.classList.add('charging');
        const btnText = randomMatchupBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = "Rolling...";
    }

    if (matchupResultsContainer) {
        matchupResultsContainer.classList.add('shuffling');
        matchupResultsContainer.classList.remove('locked-in');
    }

    // Slot machine roulette ticker for 600ms
    let rollTicks = 0;
    const maxTicks = 10;
    const intervalTime = 50; // ms

    const shuffleInterval = setInterval(() => {
        rollTicks++;
        const tempIdxA = Math.floor(Math.random() * modelsData.length);
        let tempIdxB = Math.floor(Math.random() * (modelsData.length - 1));
        if (tempIdxB >= tempIdxA) tempIdxB++;

        matchupSelectA.value = modelsData[tempIdxA].name;
        matchupSelectB.value = modelsData[tempIdxB].name;
        renderMatchup(true);

        if (rollTicks >= maxTicks) {
            clearInterval(shuffleInterval);

            // Lock in target values
            matchupSelectA.value = modelsData[finalIdxA].name;
            matchupSelectB.value = modelsData[finalIdxB].name;
            renderMatchup(false);

            if (matchupResultsContainer) {
                matchupResultsContainer.classList.remove('shuffling');
                matchupResultsContainer.classList.add('locked-in');
            }

            if (randomMatchupBtn) {
                const btnText = randomMatchupBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = "Match Locked!";
                
                // Cooldown charge reset
                setTimeout(() => {
                    randomMatchupBtn.classList.remove('charging');
                    if (btnText) btnText.textContent = "Surprise Me";
                    isMatchupRolling = false;
                }, 600);
            } else {
                isMatchupRolling = false;
            }
        }
    }, intervalTime);
}

function renderMatchup(isShuffling = false) {
    if (!matchupSelectA || !matchupSelectB || !matchupResultsContainer) return;

    const nameA = matchupSelectA.value;
    const nameB = matchupSelectB.value;

    const modelA = modelsData.find(m => m.name === nameA) || modelsData[0];
    const modelB = modelsData.find(m => m.name === nameB) || modelsData[1];

    const cfgA = modelBrandConfig[modelA.name] || { color: "transparent" };
    const cfgB = modelBrandConfig[modelB.name] || { color: "transparent" };

    const iconA = getModelLogoHTML(modelA.name);
    const iconB = getModelLogoHTML(modelB.name);

    const logicDelta = modelA.logic - modelB.logic;
    const proseDelta = modelA.prose - modelB.prose;
    const flexDelta = modelA.flexibility - modelB.flexibility;

    const maxLogic = 500;
    const maxProse = 500;
    const maxFlex = 500;

    // Evaluator matchup verdict logic
    let takeawayText = "";
    if (modelA.name === modelB.name) {
        takeawayText = "Comparing a model with itself yields an identical baseline. Choose two different models to analyze strategic trade-offs.";
    } else if ((modelA.name === "Gemini 3.1 Pro" && modelB.name === "Kimi k3") || (modelA.name === "Kimi k3" && modelB.name === "Gemini 3.1 Pro")) {
        takeawayText = "<strong>Evaluator Verdict:</strong> Choose <strong>Kimi k3</strong> for intricate mystery plots, long-horizon causal deductions, and strictly coherent constraints. Choose <strong>Gemini 3.1 Pro</strong> for vibrant prose, conversational chemistry, and unhindered creative scene fluidity.";
    } else if ((modelA.name === "Opus 4.8" && modelB.name === "Opus 5") || (modelA.name === "Opus 5" && modelB.name === "Opus 4.8")) {
        takeawayText = "<strong>Evaluator Verdict:</strong> <strong>Opus 4.8</strong> decisively outperforms Opus 5 in deductive logic (+80) and character neutrality. Opus 5 tends to be noticeably drier in dialogue and projects rigid biases.";
    } else if (logicDelta >= 0 && proseDelta >= 0 && flexDelta >= 0 && (logicDelta > 0 || proseDelta > 0 || flexDelta > 0)) {
        // Model A clean sweep!
        const deltas = [];
        if (logicDelta > 0) deltas.push(`Logic (+${logicDelta})`);
        if (proseDelta > 0) deltas.push(`Prose (+${proseDelta})`);
        if (flexDelta > 0) deltas.push(`Flexibility (+${flexDelta})`);
        takeawayText = `<strong>Evaluator Verdict:</strong> Definitively choose <strong>${modelA.name}</strong>. It completely outclasses <strong>${modelB.name}</strong> across the board (${deltas.join(', ')}). In these creative benchmark evaluations, there is no scenario where ${modelB.name} is preferred over ${modelA.name}.`;
    } else if (logicDelta <= 0 && proseDelta <= 0 && flexDelta <= 0 && (logicDelta < 0 || proseDelta < 0 || flexDelta < 0)) {
        // Model B clean sweep!
        const deltas = [];
        if (logicDelta < 0) deltas.push(`Logic (+${Math.abs(logicDelta)})`);
        if (proseDelta < 0) deltas.push(`Prose (+${Math.abs(proseDelta)})`);
        if (flexDelta < 0) deltas.push(`Flexibility (+${Math.abs(flexDelta)})`);
        takeawayText = `<strong>Evaluator Verdict:</strong> Definitively choose <strong>${modelB.name}</strong>. It completely outclasses <strong>${modelA.name}</strong> across the board (${deltas.join(', ')}). In these creative benchmark evaluations, there is no scenario where ${modelA.name} is preferred over ${modelB.name}.`;
    } else {
        // Mixed trade-off
        const strongA = [];
        const strongB = [];
        if (logicDelta > 0) strongA.push(`Logic (+${logicDelta})`);
        else if (logicDelta < 0) strongB.push(`Logic (+${Math.abs(logicDelta)})`);

        if (proseDelta > 0) strongA.push(`Prose (+${proseDelta})`);
        else if (proseDelta < 0) strongB.push(`Prose (+${Math.abs(proseDelta)})`);

        if (flexDelta > 0) strongA.push(`Flexibility (+${flexDelta})`);
        else if (flexDelta < 0) strongB.push(`Flexibility (+${Math.abs(flexDelta)})`);

        takeawayText = `<strong>Evaluator Verdict:</strong> Strategic trade-off. Choose <strong>${modelA.name}</strong> if your narrative priorities favor <strong>${strongA.join(' & ')}</strong>; choose <strong>${modelB.name}</strong> if you require stronger <strong>${strongB.join(' & ')}</strong>.`;
    }

    matchupResultsContainer.innerHTML = `
        <div class="matchup-cards-row">
            <!-- Model A Card -->
            <div class="matchup-model-box">
                <div class="matchup-model-header">
                    <div class="model-title-with-logo">
                        <div class="card-brand-logo" style="background: ${cfgA.color};">${iconA}</div>
                        <div class="matchup-model-title">${modelA.name}</div>
                    </div>
                    <span class="context-tag">#${modelA.rank} • ${modelA.context}</span>
                </div>
                <div class="matchup-metric-bars">
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Logic & Coherence</span>
                            <span class="matchup-metric-score">${modelA.logic} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.logic / maxLogic) * 100}%; background: #a855f7;"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Prose & Tone Quality</span>
                            <span class="matchup-metric-score">${modelA.prose} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.prose / maxProse) * 100}%; background: var(--primary-pink);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Content Flexibility</span>
                            <span class="matchup-metric-score">${modelA.flexibility} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.flexibility / maxFlex) * 100}%; background: #06b6d4;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Model B Card -->
            <div class="matchup-model-box">
                <div class="matchup-model-header">
                    <div class="model-title-with-logo">
                        <div class="card-brand-logo" style="background: ${cfgB.color};">${iconB}</div>
                        <div class="matchup-model-title">${modelB.name}</div>
                    </div>
                    <span class="context-tag">#${modelB.rank} • ${modelB.context}</span>
                </div>
                <div class="matchup-metric-bars">
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Logic & Coherence</span>
                            <span class="matchup-metric-score">${modelB.logic} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.logic / maxLogic) * 100}%; background: #a855f7;"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Prose & Tone Quality</span>
                            <span class="matchup-metric-score">${modelB.prose} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.prose / maxProse) * 100}%; background: var(--primary-pink);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Content Flexibility</span>
                            <span class="matchup-metric-score">${modelB.flexibility} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.flexibility / maxFlex) * 100}%; background: #06b6d4;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delta Comparison Summary -->
        <div class="matchup-delta-summary">
            <div class="delta-box">
                <div class="delta-label">Logic Advantage</div>
                <div class="delta-val ${logicDelta > 0 ? 'delta-winner-a' : logicDelta < 0 ? 'delta-winner-b' : 'delta-tie'}">
                    ${logicDelta > 0 ? `+${logicDelta} (${modelA.name})` : logicDelta < 0 ? `+${Math.abs(logicDelta)} (${modelB.name})` : 'Tied'}
                </div>
            </div>
            <div class="delta-box">
                <div class="delta-label">Prose Advantage</div>
                <div class="delta-val ${proseDelta > 0 ? 'delta-winner-a' : proseDelta < 0 ? 'delta-winner-b' : 'delta-tie'}">
                    ${proseDelta > 0 ? `+${proseDelta} (${modelA.name})` : proseDelta < 0 ? `+${Math.abs(proseDelta)} (${modelB.name})` : 'Tied'}
                </div>
            </div>
            <div class="delta-box">
                <div class="delta-label">Flexibility Advantage</div>
                <div class="delta-val ${flexDelta > 0 ? 'delta-winner-a' : flexDelta < 0 ? 'delta-winner-b' : 'delta-tie'}">
                    ${flexDelta > 0 ? `+${flexDelta} (${modelA.name})` : flexDelta < 0 ? `+${Math.abs(flexDelta)} (${modelB.name})` : 'Tied'}
                </div>
            </div>
        </div>

        <!-- Matchup Takeaway -->
        <div class="matchup-takeaway-card">
            <h4>Direct Head-to-Head Takeaway</h4>
            <p>${takeawayText}</p>
        </div>
    `;
}

function getProcessedModels() {
    let filtered = [...modelsData];

    // 1. Search Filter
    if (currentSearch.trim() !== '') {
        const query = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(model => 
            model.name.toLowerCase().includes(query) ||
            model.desc.toLowerCase().includes(query) ||
            (model.context && model.context.toLowerCase().includes(query))
        );
    }

    // 2. Category Quick Filters (Uncapped 100-baseline scale)
    if (currentFilter === 'top-logic') {
        filtered = filtered.filter(m => m.logic >= 400);
    } else if (currentFilter === 'top-prose') {
        filtered = filtered.filter(m => m.prose >= 400);
    } else if (currentFilter === 'top-flex') {
        filtered = filtered.filter(m => m.flexibility >= 400);
    }

    // 3. Sorting with competition ranking support
    if (currentSort === 'rank') {
        filtered.sort((a, b) => a.rank - b.rank);
    } else if (currentSort === 'logic') {
        filtered.sort((a, b) => b.logic - a.logic || a.rank - b.rank);
    } else if (currentSort === 'prose') {
        filtered.sort((a, b) => b.prose - a.prose || a.rank - b.rank);
    } else if (currentSort === 'flexibility') {
        filtered.sort((a, b) => b.flexibility - a.flexibility || a.rank - b.rank);
    }

    return filtered;
}

function renderLeaderboard() {
    const data = getProcessedModels();
    container.innerHTML = '';

    if (data.length === 0) {
        noResultsCard.style.display = 'block';
        if (modelCountBadge) modelCountBadge.textContent = '0 Models Found';
        return;
    }

    noResultsCard.style.display = 'none';
    if (modelCountBadge) {
        modelCountBadge.textContent = `${data.length} Model${data.length === 1 ? '' : 's'} Evaluated`;
    }

    let currentRank = 1;

    data.forEach((model, index) => {
        let displayRank = index + 1;

        if (currentSort !== 'rank' && index > 0) {
            if (model[currentSort] === data[index - 1][currentSort]) {
                displayRank = currentRank;
            } else {
                currentRank = index + 1;
                displayRank = currentRank;
            }
        } else {
            currentRank = index + 1;
        }

        const cfg = modelBrandConfig[model.name] || { icon: "•", color: "transparent" };
        const iconHTML = getModelLogoHTML(model.name);

        const card = document.createElement('div');
        card.className = 'model-card fade-in';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${model.name}`);

        // Rank decoration
        let rankClass = '';
        let medalLabel = '';
        if (displayRank === 1) {
            rankClass = 'rank-top-1';
            medalLabel = '<span class="rank-medal">#1 Pick</span>';
        } else if (displayRank === 2) {
            rankClass = 'rank-top-2';
            medalLabel = '<span class="rank-medal">2nd</span>';
        } else if (displayRank === 3) {
            rankClass = 'rank-top-3';
            medalLabel = '<span class="rank-medal">3rd</span>';
        }

        // Context Badge
        const contextBadge = model.context && model.context !== 'N/A' 
            ? `<span class="context-tag" title="Tested Context Window">${model.context}</span>` 
            : '';

        // Quirk Badge
        const quirkInfo = modelQuirkMapping[model.name];
        const quirkBadge = quirkInfo 
            ? `<a href="#${quirkInfo.targetId}" class="card-quirk-tag ${quirkInfo.isDanger ? 'danger' : ''}" onclick="event.stopPropagation();" title="Jump to evaluator quirks">${quirkInfo.tag}</a>`
            : '';

        card.innerHTML = `
            <div class="model-rank-wrapper">
                <div class="model-rank ${rankClass}">#${displayRank}</div>
                ${medalLabel}
            </div>
            <div class="model-info">
                <div class="model-header-line">
                    <div class="model-title-with-logo">
                        <div class="card-brand-logo" style="background: ${cfg.color};">${iconHTML}</div>
                        <h3>${model.name}</h3>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                        ${contextBadge}
                        ${quirkBadge}
                    </div>
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

        // Card Click opens Modal
        card.addEventListener('click', () => openModelModal(model, displayRank));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModelModal(model, displayRank);
            }
        });

        container.appendChild(card);
    });
}

// Modal Logic
function openModelModal(model, rank) {
    if (!modalBackdrop || !modalContent) return;

    const cfg = modelBrandConfig[model.name] || { color: "transparent" };
    const iconHTML = getModelLogoHTML(model.name);
    const quirkInfo = modelQuirkMapping[model.name];
    const quirkCallout = quirkInfo
        ? `<div class="modal-quirk-callout">
             <span><strong>Evaluator Note:</strong> Critical caveat recorded for this model.</span>
             <a href="#${quirkInfo.targetId}" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk Analysis →</a>
           </div>`
        : '';

    modalContent.innerHTML = `
        <div class="modal-header-section">
            <div class="modal-rank-badge">#${rank}</div>
            <div class="modal-title-area">
                <div class="model-title-with-logo">
                    <div class="card-brand-logo" style="background: ${cfg.color}; width: 34px; height: 34px;">${iconHTML}</div>
                    <h2>${model.name}</h2>
                </div>
                <span class="context-tag">${model.context && model.context !== 'N/A' ? model.context : 'Standard Context Window'}</span>
            </div>
        </div>

        ${quirkCallout}

        <div class="modal-score-grid">
            <div class="modal-score-box">
                <div class="modal-score-num">${model.logic}</div>
                <div class="modal-score-label">Logic & Coherence</div>
            </div>
            <div class="modal-score-box">
                <div class="modal-score-num">${model.prose}</div>
                <div class="modal-score-label">Prose & Tone</div>
            </div>
            <div class="modal-score-box">
                <div class="modal-score-num">${model.flexibility}</div>
                <div class="modal-score-label">Content Flexibility</div>
            </div>
        </div>

        <div class="modal-desc-box">
            <h4 style="color: var(--primary-pink); margin-bottom: 0.5rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px;">Evaluator's Assessment</h4>
            <p>${model.desc}</p>
        </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModelModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModelModal);
if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModelModal();
    });
}

// Export Benchmark Leaderboard as Markdown
if (exportMarkdownBtn) {
    exportMarkdownBtn.addEventListener('click', async () => {
        let md = `# LLM Creative Writing Benchmark V3\n\n`;
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
                    title: 'LLM Creative Writing Benchmark V3',
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

// Export System Prompt as Markdown File
if (exportHarnessBtn && harnessBody) {
    exportHarnessBtn.addEventListener('click', () => {
        const textToExport = `# Rules & Context - System Instruction Harness\n\n` + 
            Array.from(harnessBody.querySelectorAll('p'))
                .map(p => p.textContent.trim())
                .join('\n\n');
        
        const blob = new Blob([textToExport], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'creative-writing-system-harness.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

// Sorting Event Listeners
sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.getAttribute('data-sort');
        renderLeaderboard();
    });
});

// Quick Filters
filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-filter');
        renderLeaderboard();
    });
});

// Search Input Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        if (clearSearchBtn) {
            clearSearchBtn.style.display = currentSearch.length > 0 ? 'block' : 'none';
        }
        renderLeaderboard();
    });
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        renderLeaderboard();
    });
}

if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentSearch = '';
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        currentFilter = 'all';
        filterPills.forEach(p => p.classList.remove('active'));
        const allPill = document.querySelector('.filter-pill[data-filter="all"]');
        if (allPill) allPill.classList.add('active');
        renderLeaderboard();
    });
}

// Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    } else if (e.key === 'Escape') {
        closeModelModal();
    }
});

// Harness Expand/Collapse Toggle
if (toggleExpandBtn && harnessBody) {
    toggleExpandBtn.addEventListener('click', () => {
        const isExpanded = harnessBody.classList.toggle('expanded');
        toggleExpandBtn.querySelector('.btn-text').textContent = isExpanded ? 'Collapse' : 'Expand';
        if (harnessFade) {
            harnessFade.style.display = isExpanded ? 'none' : 'block';
        }
    });
}

// Harness Copy Functionality
if (copyBtn && harnessBody) {
    copyBtn.addEventListener('click', async () => {
        const textToCopy = Array.from(harnessBody.querySelectorAll('p'))
            .map(p => p.textContent.trim())
            .join('\n\n');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            const originalHTML = copyBtn.innerHTML;
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="btn-text">Copied!</span>
            `;
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    if (harnessFade) {
        harnessBody.addEventListener('scroll', () => {
            const isBottom = harnessBody.scrollHeight - harnessBody.scrollTop <= harnessBody.clientHeight + 20;
            harnessFade.style.opacity = isBottom ? '0' : '1';
        });
    }
}

// ==========================================
// High-Performance Smooth & Fast Scroll Engine
// ==========================================
let currentScrollAnimationId = null;

function fastSmoothScrollTo(targetY, customDuration = null) {
    if (currentScrollAnimationId) {
        cancelAnimationFrame(currentScrollAnimationId);
        currentScrollAnimationId = null;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clampedTargetY = Math.max(0, Math.min(targetY, maxScrollY));
    const distance = clampedTargetY - startY;

    if (Math.abs(distance) < 4) return;

    // Fast, responsive, yet buttery smooth duration scaling (320ms - 560ms max)
    const duration = customDuration !== null 
        ? customDuration 
        : Math.min(560, Math.max(320, 260 + Math.abs(distance) * 0.08));

    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // easeInOutCubic: smooth acceleration and gentle deceleration
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + (distance * ease));

        if (timeElapsed < duration) {
            currentScrollAnimationId = requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, clampedTargetY);
            currentScrollAnimationId = null;
        }
    }

    currentScrollAnimationId = requestAnimationFrame(animation);
}

function fastSmoothScrollToElement(el, offset = 28) {
    if (!el) return;
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const rect = el.getBoundingClientRect();
    const targetY = Math.max(0, rect.top + currentY - offset);
    fastSmoothScrollTo(targetY);
}

// Cancel scroll animation if user interrupts with wheel, touch, or keys
['wheel', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, (e) => {
        if (currentScrollAnimationId && (evt !== 'keydown' || ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key))) {
            cancelAnimationFrame(currentScrollAnimationId);
            currentScrollAnimationId = null;
        }
    }, { passive: true });
});

// Intercept all internal anchor navigation links for fluid, fast scrolling
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#' || hash === '#!') return;

    const targetEl = document.querySelector(hash);
    if (targetEl) {
        e.preventDefault();

        if (anchor.classList.contains('modal-quirk-jump')) {
            closeModelModal();
        }

        fastSmoothScrollToElement(targetEl, 28);

        if (history.pushState) {
            history.pushState(null, '', hash);
        } else {
            location.hash = hash;
        }
    }
});

// Floating Back to Top Button
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fastSmoothScrollTo(0, 380);
    });
}

// Stat Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1200; // ms
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize
renderBenchmarkCharts();
initMatchupTool();
renderLeaderboard();
animateCounters();
