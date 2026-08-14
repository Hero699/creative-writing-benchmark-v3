# LLM Creative Writing Benchmark Beta V3

> **Important Note**: I actually haven't tested or am testing models FOR v3. So that's why you won't see it.

Comprehensive creative writing evaluation across 14 frontier and open-weights LLMs tested on 600 narrative scenarios, deep constraint adherence tests, and qualitative genre evaluations.

Live Public Site: [https://hero699.github.io/creative-writing-benchmark-v3/](https://hero699.github.io/creative-writing-benchmark-v3/)

---

## Core Evaluated Dimensions

1. **Logic & Coherence** (Uncapped, 50 Sol Max baseline):
   - Long-horizon causal chains, deductive problem solving, narrative logic, world-state persistence, and mystery deduction without contradictions.
2. **Prose & Tone Quality** (Uncapped, 250 Sol Max baseline):
   - Dialogue cadence, voice distinctiveness, emotional depth, metaphoric richness, show-don't-tell, and avoidance of AI clichés.
3. **Content Flexibility** (Uncapped, 100 Sol Max baseline):
   - Freedom to navigate complex, dark, romantic, suspenseful, or gritty themes without artificial moralizing, preachy refusals, or sycophancy.

---

## Current Rankings & Baselines

| Rank | Model Name | Logic | Prose | Flexibility | Context Window | Evaluator Notes |
|:---:|:---|:---:|:---:|:---:|:---:|:---|
| #1 | **Gemini 3.1 Pro** | 405 | 470 | 480 | 1M | Absolute best at prose and content flexibility. Resists earned character development, slight instruction-following drift. |
| #2 | **Kimi k3** | 500 | 400 | 400 | 256k (1M API) | Number one in logic, decent at prose. Heavy CoT reasoning tax. |
| #3 | **Opus 4.8** | 480 | 380 | 350 | 200k (1M API) | Superior logic compared to Opus 4.6 and Opus 5. The logic king of Anthropic. |
| #4 | **Opus 4.6** | 460 | 400 | 350 | 200k (1M API) | Decent logic, slightly better than 4.8 in prose. |
| #5 | **Gemini 3 Flash** | 320 | 420 | 450 | 1M | Very flexible. Amazing lightweight model. |
| #6 | **DeepSeek v4** | 150 | 400 | 480 | 1M | Great flexibility, lower logic consistency. |
| #7 | **Opus 5** | 400 | 300 | 200 | 200k (1M API) | Highly capable logic, but very limited flexibility and dry prose. |
| #8 | **GLM 5.2** | 380 | 300 | 250 | 200k | Sits below Opus 4.6/5 in logic, stiffer prose. |
| #9 | **Gemini 3.5 Flash** | 380 | 350 | 350 | 1M | Solid step up in logic from 3 Flash. |
| #10 | **Gemini 3.6 Flash** | 300 | 320 | 370 | 1M-2M | Excellent long-context needle retrieval. |
| #11 | **Muse Spark 1.1** | 360 | 300 | 330 | 1M | Well-balanced overall baseline. |
| #12 | **Sonnet 4.6** | 350 | 320 | 300 | 200k (1M API) | Good general benchmark baseline, stiffer narrative prose. |
| #13 | **Qwen 3.8 Max** | 200 | 350 | 150 | 1M | Capable prose styling, constrained flexibility. |
| #14 | **ChatGPT 5.6 Sol Max** | 50 | 250 | 100 | 256k (1M API) | Baseline retrieval champion, but high creative hallucination severity rate. |

---

## Features Included in Web Interface

- Artificial Analysis-Style Column Bar Charts with Sol baseline multipliers.
- Interactive Head-to-Head Comparison Tool with slot-machine randomized match generator and direct evaluator takeaways.
- Fast Smooth-Scrolling Navigation Engine across all section pills, banner links, and quirk footnotes.
- System Instruction Harness Viewer & Markdown Exporters (instant table copying and harness downloads).
- Responsive Theme Design built in vanilla HTML5, CSS3, and modern JS.

---

## Feedback, Model Requests & Suggestions

Any advice is welcome! I would love to hear feedback and ideas on:
- What you want to see improved in the benchmark methodology, scoring, or narrative test scenarios.
- Which upcoming or existing models you would like to see tested next.
- Any bugs, rendering issues, or visual inconsistencies you encounter on the website.
- Any tips or feature recommendations to improve the website presentation, interactivity, or tooling.

Feel free to open an issue or submit feedback directly via the [GitHub Issues](https://github.com/Hero699/creative-writing-benchmark-v3/issues) tab.
