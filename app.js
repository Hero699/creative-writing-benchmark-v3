// Model Evaluation Data
const modelsData = [
    {
        rank: 1,
        name: "Gemini 3.1 Pro",
        logic: 405,
        prose: 470,
        flexibility: 480,
        knowledge: 500,
        context: "1M",
        desc: "Absolute best at prose, canon knowledge recall, and content flexibility. Resists earned character development, slight instruction-following drift."
    },
    {
        rank: 2,
        name: "Gemini 3.7 Flash",
        logic: 390,
        prose: 430,
        flexibility: 490,
        knowledge: 480,
        context: "1M",
        desc: "Slightly weaker logic than 3.1 Pro, but the flexibility champion. More concise, resistant to sycophancy, with rapid punchy prose."
    },
    {
        rank: 3,
        name: "Kimi k3",
        logic: 500,
        prose: 400,
        flexibility: 400,
        knowledge: 420,
        context: "256k (1M API)",
        desc: "Number one in logic, decent at prose. Heavy CoT reasoning tax."
    },
    {
        rank: 4,
        name: "GLM 5.3",
        logic: 510,
        prose: 360,
        flexibility: 420,
        knowledge: 380,
        context: "200k (1M API)",
        desc: "Better in logic than Kimi by a little, worse at prose than Kimi (meh), and solid flexibility."
    },
    {
        rank: 5,
        name: "Opus 4.8",
        logic: 480,
        prose: 380,
        flexibility: 350,
        knowledge: 350,
        context: "200k (1M API)",
        desc: "Superior logic compared to Opus 4.6 and Opus 5. The logic king of Anthropic."
    },
    {
        rank: 6,
        name: "Opus 4.6",
        logic: 460,
        prose: 400,
        flexibility: 350,
        knowledge: 340,
        context: "200k (1M API)",
        desc: "Decent logic, slightly better than 4.8 in prose."
    },
    {
        rank: 7,
        name: "Gemini 3 Flash",
        logic: 320,
        prose: 420,
        flexibility: 450,
        knowledge: 400,
        context: "1M",
        desc: "Very flexible. Amazing lightweight model."
    },
    {
        rank: 8,
        name: "DeepSeek v4",
        logic: 150,
        prose: 400,
        flexibility: 480,
        knowledge: 270,
        context: "1M",
        desc: "Great flexibility, lower logic consistency."
    },
    {
        rank: 9,
        name: "Opus 5",
        logic: 400,
        prose: 300,
        flexibility: 200,
        knowledge: 360,
        context: "200k (1M API)",
        desc: "Highly capable logic, but very limited flexibility and dry prose."
    },
    {
        rank: 10,
        name: "Gemini 3.5 Flash",
        logic: 380,
        prose: 350,
        flexibility: 350,
        knowledge: 440,
        context: "1M",
        desc: "Solid step up in logic from 3 Flash."
    },
    {
        rank: 11,
        name: "GLM 5.2",
        logic: 380,
        prose: 300,
        flexibility: 250,
        knowledge: 300,
        context: "200k",
        desc: "Sits below Opus 4.6/5 in logic, stiffer prose."
    },
    {
        rank: 12,
        name: "Gemini 3.6 Flash",
        logic: 300,
        prose: 320,
        flexibility: 370,
        knowledge: 460,
        context: "1M-2M",
        desc: "Excellent long-context needle retrieval."
    },
    {
        rank: 13,
        name: "Muse Spark 1.1",
        logic: 360,
        prose: 300,
        flexibility: 330,
        knowledge: 290,
        context: "1M",
        desc: "Well-balanced overall baseline."
    },
    {
        rank: 14,
        name: "Sonnet 4.6",
        logic: 350,
        prose: 320,
        flexibility: 300,
        knowledge: 320,
        context: "200k (1M API)",
        desc: "Good general benchmark baseline, stiffer narrative prose."
    },
    {
        rank: 15,
        name: "Qwen 3.8 Max",
        logic: 200,
        prose: 350,
        flexibility: 150,
        knowledge: 250,
        context: "1M",
        desc: "Capable prose styling, constrained flexibility."
    },
    {
        rank: 16,
        name: "ChatGPT 5.6 Sol Max",
        logic: 50,
        prose: 250,
        flexibility: 100,
        knowledge: 200,
        context: "256k (1M API)",
        desc: "Baseline retrieval champion, but high creative hallucination severity rate."
    }
];

// Baseline values for percentage and multiplier calculations
const BASES = {
    logic: 50,
    prose: 250,
    flexibility: 100,
    knowledge: 200
};

// Brand Icon and Logo mapping helper
function getBrandLogoInfo(modelName) {
    const name = modelName.toLowerCase();
    if (name.includes('gemini')) {
        return {
            letter: 'G',
            bg: 'linear-gradient(135deg, #1a73e8, #8ab4f8)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEyIDI0QzEyIDE3LjM3MyA2LjYyNyAxMiAwIDEyQzYuNjI3IDEyIDEyIDYuNjI3IDEyIDBDMTIgNi42MjcgMTcuMzczIDEyIDI0IDEyQzE3LjM3MyAxMiAxMiAxNy4zNzMgMTIgMjRaIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+'
        };
    } else if (name.includes('chatgpt') || name.includes('gpt')) {
        return {
            letter: 'O',
            bg: 'linear-gradient(135deg, #10a37f, #0d8a6a)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMi4yOCA5LjgyYTUuOTggNS45OCAwIDAgMC0uNTEtNC45MSA2LjA1IDYuMDUgMCAwIDAtNi41MS0yLjlBNi4wNiA2LjA2IDAgMCAwIDQuOTggNC4xOGE1Ljk4IDUuOTggMCAwIDAtNCAyLjkgNi4wNSA2LjA1IDAgMCAwIC43NSA3LjEgNS45OCA1Ljk4IDAgMCAwIC41MSA0LjkxIDYuMDUgNi4wNSAwIDAgMCA2LjUxIDIuOUE1Ljk4IDUuOTggMCAwIDAgMTMuMjYgMjRhNi4wNiA2LjA2IDAgMCAwIDUuNzctNC4yIDUuOTkgNS45OSAwIDAgMCA0LTIuOSA2LjA2IDYuMDYgMCAwIDAtLjc1LTcuMDh6bS05LjAyIDEyLjYxYTQuNDggNC40OCAwIDAgMS0yLjg4LTEuMDRsLjE0LS4wOCA0Ljc4LTIuNzZhLjc5Ljc5IDAgMCAwIC4zOS0uNjh2LTYuNzRsMi4wMiAxLjE3YS4wNy4wNyAwIDAgMSAuMDQuMDV2NS41OWE0LjUgNC41IDAgMCAxLTQuNDkgNC40OXptLTkuNjYtNC4xM2E0LjQ3IDQuNDcgMCAwIDEtLjUzLTMuMDFsLjE0LjA4IDQuNzggMi43NmEuNzcuNzcgMCAwIDAgLjc4IDBsNS44NS0zLjM3djIuMzNhLjA4LjA4IDAgMCAxLS4wNC4wNkw5Ljc0IDE5Ljk1YTQuNSA0LjUgMCAwIDEtNi4xNC0xLjY1ek0yLjM0IDcuOWE0LjQ4IDQuNDggMCAwIDEgMi4zNy0xLjk4djUuNjlhLjc3Ljc3IDAgMCAwIC4zOC42N2w1LjgyIDMuMzYtMi4wMiAxLjE3YS4wOC4wOCAwIDAgMS0uMDcgMGwtNC44My0yLjc5QTQuNSA0LjUgMCAwIDEgMi4zNCA3Ljg3em0xNi42IDMuODVMMTMuMSA4LjM2bDIuMDItMS4xNmEuMDguMDggMCAwIDEgLjA3IDBsNC44MyAyLjc5YTQuNDkgNC40OSAwIDAgMS0uNjggOC4xdi01LjY3YS43OS43OSAwIDAgMC0uNC0uNjd6bTIuMDEtMy4wMmwtLjE0LS4wOC00Ljc3LTIuNzlhLjc4Ljc4IDAgMCAwLS43OSAwTDkuNDEgOS4yM1Y2LjlhLjA3LjA3IDAgMCAxIC4wMy0uMDZsNC44My0yLjc5YTQuNSA0LjUgMCAwIDEgNi42OCA0LjY2ek04LjMxIDEyLjg2bC0yLjAyLTEuMTZhLjA4LjA4IDAgMCAxLS4wNC0uMDZWNi4wN2E0LjUgNC41IDAgMCAxIDcuMzgtMy40NWwtLjE1LjA4LTQuNzggMi43NmEuNzkuNzkgMCAwIDAtLjM5LjY4em0xLjEtMi4zNmwyLjYtMS41IDIuNiAxLjV2M2wtMi42IDEuNS0yLjYtMS41WiIvPjwvc3ZnPg=='
        };
    } else if (name.includes('opus') || name.includes('sonnet') || name.includes('claude')) {
        return {
            letter: 'A',
            bg: 'linear-gradient(135deg, #d97706, #b45309)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEzLjggMy41TDguMiAxOS41SDExTDEyLjMgMTUuNkgxNy43TDE5IDE5LjVIMjEuOEwxNi4yIDMuNUgxMy44Wk0xMy4xIDEzLjFMMTUgNy40TDE2LjkgMTMuMUgxMy4xWk0yLjIgMTkuNUg1TDguNSA5LjVINS43TDIuMiAxOS41WiIvPjwvc3ZnPg=='
        };
    } else if (name.includes('deepseek')) {
        return {
            letter: 'D',
            bg: 'linear-gradient(135deg, #0284c7, #0369a1)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMjUgNjUgQzMwIDQyIDQ4IDI4IDcyIDI4IEM5MCAyOCA5OCAzOCA5NiA1MiBDODggNDggNzggNDYgNjggNDggQzUyIDUwIDM4IDYyIDMwIDc2IEMyNiA3MyAyNCA3MCAxMiA2NSBaIiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iNDYiIGN5PSI0NiIgcj0iNSIgZmlsbD0iIzAyODRjNyIvPjxwYXRoIGQ9Ik0xOCA2OCBDMTAgNzQgNiA4MiA1IDkwIEMxNSA4OSAyNCA4MyAzMCA3NiBDMjUgNzMgMjEgNzAgMTggNjggWiIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg=='
        };
    } else if (name.includes('kimi')) {
        return {
            letter: 'K',
            bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMzAgMjAgaDE2IHYyNiBsMjItMjYgaDIwIEw2MiA1MCBsMjggMzAgSDY4IEw0NiA1NCB2MjYgSDMwIFYyMCB6IiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+'
        };
    } else if (name.includes('glm') || name.includes('z ai') || name.includes('zhipu')) {
        return {
            letter: 'Z',
            bg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#ffffff',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAK4ElEQVR4nO2de0zV2RHH75OHrrrFijQhroppbS0otkZiJBoTtgY36B/QSjBaq2jAEIu22dal0aQRMTRAtBFMtMQ2bfhDUQiNUbFmNSRYqqRRUBuDxjfUF1Eel9+r+d79jf3tVROXe8C5Mp/kl8vVS5g7Z86cmXPmnONyCYIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIwJvH7/cHXmpqaPMuyLE3TBqwIxTRNQ9f1QCAQeDFnzpxofC+Px/Pqu7rdbpfP5wv+3N7eXoffMQxDs5hBMjU0NHzxTdvzq283RtF1fdDv948rKSlZ0tHREfB6vS7DMF79P97ruu46fPjw+nnz5v3MNE3d4/Gw0hlkwmtPT09nYWFh2Yj/wQ/FA6DnW5ZltbS01ERFRQUbGz2ewHuQlZWV4Pw8Nw9G+k9NTY0dTnv+39+NIaA7t9vt6e7uvlpQUPDLoaEh/FvwAWQIcXFx7gMHDjShl+HzLmZALp/PF1NaWvppe3v7AA1XI8qH4AGGhob68JqTk5OI7+JUnHPch3fgPu4jNomNjX3Ng4kBvAUy2Lq6uq1Ogw51/du3b/+x8/PcXD+MGE9aWtpHTrnFAN6x10ydOtWDiN/Za+h9SkpKzIsXLx7h81C2xQyKR9auXZs0qo0fyUMApXyDg4O9b+o1brc7+D46Otp19+7df3J1/dT4J06c+C0MNtxxn11gM5Ipn9frjaqsrPxpa2vrSxiyEZLy4X1VVVVuYmLiAnyeW8oHO8brgwcP2ouLi8sRtJpm8J9Gj0j0ACTjlStXjkP+UJfptd8vX7782+hheDi7/vT09ElOucNh2BYOBRmGMYSHY4oEIBfkw2QPJkry8vJyNU17bbYPTJkyxVNVVfUXeAmOaR88ElK+ysrKVRcuXOiFIeO7jDrkAWprazdYEUJXV9eXycnJMZDb2fiAxtDTp0+XcfVoFIt0dHQ0Tpo0ya0y5fvGHoAmS27cuNHR1tZ2BMJ5vd6v51KMJnvq6ur2Hzx48FJfX9+rcd7Z+LquuwoKCuZkZGR8rmlaP7yFixFfxa+mjmfr1q0/7+3ttfA9qB2EdyS059P7WbNm+R8/fvwfrikfTVrt378/B/KOymzfuwAXBCVyf6CwUHeJ9xjKoqKiXE1NTTu5zvWTTGfOnNlLMo/KbN+HDsUx5eXlnzl7GSfgjfDcu3fvX7Nnz46iDieECaVO2dnZiagDQNDH0fVTMLpixYp4Vq4/kqFelJCQ4Onp6bnGdbaPGh91CJAbQ5WgAOpFR48e/ZVT0Zwgg7xz507r5MmTlaZ8Yxpq/Nzc3E+4Nr5pr1e8fPmyG7OSo77Q86FCwRNcf3d3dwf3lK+kpGTxm5aqhWFA6VNMTIwLK2jcU762trY/w1tJ4yuCFLljx45FXFM+wzA0PJTyQV5J+RRA4+eqVau+QxU0FkOGbLny8vKmQ15J+RSmfPHx8Z5bt25d4J7yHTt27NeQW1y/IkiRhw4dWudUNMdx//Lly39Tvco3piEXmpmZOYVr45uOXUmLFy+eCHkl5VMABU/Y6oVVPq7VPZptlHv37s10Gq0QBlTTj6e5ubmcc8pnGIaGAg/ILa5fEdSLioqK5nJ1/c5gdP78+eOoGlkIE1JiRkbGZNo4wdn1FxUVzXXKLShI+SZOnOi+du3a3+2CVXYpn24PRydPnvw95A7dmCKE6fr37duXzdX1G/b6w82bN/8xYcIEN2SW2T4FkAtdsmTJx1A0xwIP097GjdelS5d+7JRbCAOq+5s2bZrv2bNntzk2vtMjsSvsjHSoF2FM5ZryGXYscvv27ZZx48a9sUhVCKPx8/PzZ3Md903b9ff19f13+vTpwW4v474CaOJkwYIF46HoSEn5fOL61aV8WOzp7OxsgoI5p3znzp2rfNv+BGGYvR9UVFSsdCqaE4YBz68N4JAJ7DySmv4RqOmHojkWeJiOSSgq7BTXrwC4URgAtnE/f/78DpVRWczQbY+ESSlpfIVQ9FxfX/+5U9Gc0O2l50uXLv3VKbOgyPVv2rTp+6Roi+lePsuyLNQikMcSFDQ+gigoNVTRnNBto4SROo1WUGAAAG6VyqgsZui2TBieIKu4fkVQ9Lxr166lXGf7DDsYRWCKABUGKwagsOcvW7bsW/39/U+4b+fKzs4OHjsrrl8BGPPxYFv0w4cP/w0Fc075KioqVkrjKy7sxOvZs2f/4FQ0JwzbIDEdjWlpqe5RBLlQKuzk2PimXXOIn7EgJYWdiqDgaebMmX4soXIv8MjPz5/tNFohTMiVnj9//o9ce78eUtgpja94L19xcfF8zgs9mqYNPHny5CbK0GSVTxHUi1Aw2dvbe4/rdq5AIPACrxs2bPgu5JVVPoVRP3bHomSaa8qnSWHnyEBHoFFNP0fXb9iTUNevXz+JzSc0TyGECbnQjRs3fo+qaCxmmI5tZth2Bnkl8FMATZwkJSX5nz592sV1lU+Tws6RO7kLNDY2ljgVzTHla25uLqdt5+L6Fbp+HI7AtfFNe+kZh0y86V5hYZjQ+IljUSLhsObMzMwpTqMVwoDmzJHy4WAkrrN9mt34OGAKcsvJXYogReJINKeiOWHYcxA4Wg5HzMkqnyLIheIwRK75PhklZMPhkpBXUj4FUPCEY1BxHCrXmv4h2yhxrCzkFdevCEqhcBAy13Fft2VqbW09jIOl5X4eRVAvwhHo3LdzdXd3d6SmpsZCXkn5FEDj59y5c2NxCQL3lC83N/cTyCspn8KUD9eeXLx48U9QMMdxX7MbH9fIQG4Z9xWv8uHiI6eiOWHYBokLpHCbiKR8iiAXiivPOI/7un1Ys9T0j2DKx3WVj4yyvLz8M8grrl/xYc247pR7ytfZ2dmEoept18vSYY7cHzYrlNSLtmzZkszZ9WPsxypf6ltSvrGUAiozHSjNNM1ggcfVq1d7cA27x+NB5Swrbeq6Pujz+WIKCwt/WF1d3UFXyId+j/Hjx7s2b978o9WrVxfRVfQuZsCQvV6vv76+vqasrKw19LuMGlQejVU+zKRxT/lOnTpV+qZ832P3/OTk5Jiurq4vrQihtrZ2w3DjGCWL3FCkpmmunTt3Zi1cuPAX1MtcjEAvhkwDAwNP169f/zsYrWmar/X8GTNm+Jqbmy/Fx8f/QNO0fq/XG4XfdTGE9DwwMND33mf70tPTJ3HN9ynlw0MpX+g477Mva2xoaPiCa/wSCum6pqYm771kMhSBotfcv3//MtcNHaSo6urqXKfREjQU7Nmz5yeR0vgsDIDSJM5XstLSMw5rjo6Ofu1+Hq9tDGlpaR8NDg72cj12dqQMYNiRLRSHiHPNmjVJK1euLDUMYwjjpYsZGAGQjaxbt25FIBDA++AD3G538OfY2FhXdXX1oejo6In4DhwjflY4ew1dycqx11APoQKPUNfvt3tMaWnpp1w9GLshgFb50Gva29vruKZ8JFNLS0sN5A6dMaNxPycnh+2xsywNgBS3e/fuDK69xnkbd1xc3GtXslIGkJKSEvPo0aMrXINXtkEg7rsjATgqjowyKysrIdT1kwfDGkBLS0uN8/ORxnsJAvFHjhw5gkMbdQRL3AImyIVADrNjjY2Nj+CxDMP4Wu/H+23btqUtWrRoM032vFehI4njx4//huu4T0vPqO0j1++c8HHeK4w6AD1CXT+beQBBEARBEARBEARBEARBEARBEARBEARBEARBEARBENjwP+lG+Z69THq2AAAAAElFTkSuQmCC'
        };
    } else if (name.includes('qwen')) {
        return {
            letter: 'Q',
            bg: 'linear-gradient(135deg, #ea580c, #c2410c)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cG9seWdvbiBwb2ludHM9IjUwLDEyIDg2LDMyIDg2LDcyIDUwLDkyIDE0LDcyIDE0LDMyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTIiIHI9IjE1IiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+'
        };
    } else if (name.includes('muse')) {
        return {
            letter: 'M',
            bg: 'linear-gradient(135deg, #db2777, #be185d)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMjIgNzggVjI0IEw1MCA1NiBMNzggMjQgVjc4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=='
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
        if (currentFilter === 'top-knowledge') return model.knowledge >= 400;

        return true;
    });

    // Sorting
    filtered.sort((a, b) => {
        if (currentSort === 'rank') return a.rank - b.rank;
        if (currentSort === 'logic') return b.logic - a.logic;
        if (currentSort === 'prose') return b.prose - a.prose;
        if (currentSort === 'flexibility') return b.flexibility - a.flexibility;
        if (currentSort === 'knowledge') return b.knowledge - a.knowledge;
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
                    <div class="metric" title="Knowledge Score: ${model.knowledge}">
                        <span class="metric-val" style="color: #34d399;">${model.knowledge}</span>
                        <span class="metric-label">Know</span>
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
    const knowledgeContainer = document.getElementById('knowledge-chart-container');

    if (!logicContainer || !proseContainer || !flexContainer) return;

    // Highest points in dataset for proper scaling
    const maxLogic = Math.max(...modelsData.map(m => m.logic));
    const maxProse = Math.max(...modelsData.map(m => m.prose));
    const maxFlex = Math.max(...modelsData.map(m => m.flexibility));
    const maxKnowledge = Math.max(...modelsData.map(m => m.knowledge));

    // 1. Logic Chart
    const sortedByLogic = [...modelsData].sort((a, b) => b.logic - a.logic);
    logicContainer.innerHTML = buildChartHTML(sortedByLogic, 'logic', maxLogic, '#a855f7', 'linear-gradient(180deg, #c084fc, #7e22ce)');

    // 2. Prose Chart
    const sortedByProse = [...modelsData].sort((a, b) => b.prose - a.prose);
    proseContainer.innerHTML = buildChartHTML(sortedByProse, 'prose', maxProse, '#ff2e93', 'linear-gradient(180deg, #ff66b2, #ff2e93)');

    // 3. Flexibility Chart
    const sortedByFlex = [...modelsData].sort((a, b) => b.flexibility - a.flexibility);
    flexContainer.innerHTML = buildChartHTML(sortedByFlex, 'flexibility', maxFlex, '#06b6d4', 'linear-gradient(180deg, #38bdf8, #0284c7)');

    // 4. Knowledge Chart
    if (knowledgeContainer) {
        const sortedByKnowledge = [...modelsData].sort((a, b) => b.knowledge - a.knowledge);
        knowledgeContainer.innerHTML = buildChartHTML(sortedByKnowledge, 'knowledge', maxKnowledge, '#10b981', 'linear-gradient(180deg, #34d399, #059669)');
    }

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

    // Default Selection: Gemini 3.1 Pro (#1) vs Gemini 3.7 Flash (#2)
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
    const knowledgeDiff = modelA.knowledge - modelB.knowledge;

    const brandA = getBrandLogoInfo(modelA.name);
    const brandB = getBrandLogoInfo(modelB.name);

    const logoA = brandA.img
        ? `<div class="card-brand-logo" style="background: ${brandA.bg};"><img src="${brandA.img}" alt="${modelA.name}" class="brand-logo-img"></div>`
        : `<div class="card-brand-logo" style="background: ${brandA.bg};"><span class="brand-logo-letter">${brandA.letter}</span></div>`;

    const logoB = brandB.img
        ? `<div class="card-brand-logo" style="background: ${brandB.bg};"><img src="${brandB.img}" alt="${modelB.name}" class="brand-logo-img"></div>`
        : `<div class="card-brand-logo" style="background: ${brandB.bg};"><span class="brand-logo-letter">${brandB.letter}</span></div>`;

    // Maximums for meter fills
    const maxLogic = Math.max(500, ...modelsData.map(m => m.logic));
    const maxProse = Math.max(500, ...modelsData.map(m => m.prose));
    const maxFlex = Math.max(500, ...modelsData.map(m => m.flexibility));
    const maxKnowledge = Math.max(500, ...modelsData.map(m => m.knowledge));

    const deltaLogicHTML = formatDeltaBox('Logic Delta', logicDiff, modelA.name, modelB.name);
    const deltaProseHTML = formatDeltaBox('Prose Delta', proseDiff, modelA.name, modelB.name);
    const deltaFlexHTML = formatDeltaBox('Flexibility Delta', flexDiff, modelA.name, modelB.name);
    const deltaKnowledgeHTML = formatDeltaBox('Knowledge Delta', knowledgeDiff, modelA.name, modelB.name);

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

        if (modelA.knowledge > modelB.knowledge) advantagesA.push(`Deeper canon knowledge (+${knowledgeDiff} pts)`);
        else if (modelB.knowledge > modelA.knowledge) advantagesB.push(`Deeper canon knowledge (+${Math.abs(knowledgeDiff)} pts)`);

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
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Knowledge & Canon Recall</span>
                            <span class="matchup-metric-score" style="color: #34d399;">${modelA.knowledge} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.knowledge / maxKnowledge) * 100}%; background: linear-gradient(90deg, #34d399, #059669);"></div>
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
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Knowledge & Canon Recall</span>
                            <span class="matchup-metric-score" style="color: #34d399;">${modelB.knowledge} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.knowledge / maxKnowledge) * 100}%; background: linear-gradient(90deg, #34d399, #059669);"></div>
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
            ${deltaKnowledgeHTML}
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
    const knowledgeMult = (model.knowledge / BASES.knowledge).toFixed(1);

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

    const maxLogic = Math.max(500, ...modelsData.map(m => m.logic));
    const maxProse = Math.max(500, ...modelsData.map(m => m.prose));
    const maxFlex = Math.max(500, ...modelsData.map(m => m.flexibility));
    const maxKnowledge = Math.max(500, ...modelsData.map(m => m.knowledge));

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
                <div class="modal-vector-track"><div class="modal-vector-bar" style="width: ${(model.logic / maxLogic) * 100}%;"></div></div>
                <div class="modal-score-label">Logic (${logicMult}x Sol)</div>
            </div>
            <div class="modal-score-box">
                <div class="modal-score-num">${model.prose}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar" style="width: ${(model.prose / maxProse) * 100}%;"></div></div>
                <div class="modal-score-label">Prose (${proseMult}x Sol)</div>
            </div>
            <div class="modal-score-box">
                <div class="modal-score-num">${model.flexibility}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar" style="width: ${(model.flexibility / maxFlex) * 100}%;"></div></div>
                <div class="modal-score-label">Flex (${flexMult}x Sol)</div>
            </div>
            <div class="modal-score-box">
                <div class="modal-score-num" style="color: #34d399;">${model.knowledge}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar" style="width: ${(model.knowledge / maxKnowledge) * 100}%; background: linear-gradient(90deg, #34d399, #059669);"></div></div>
                <div class="modal-score-label">Knowledge (${knowledgeMult}x Sol)</div>
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
        md += `> **Sol Baseline**: 50 Logic / 250 Prose / 100 Flex / 200 Knowledge (Uncapped Scale)\n\n`;
        md += `| Rank | Model Name | Logic | Prose | Flexibility | Knowledge | Context Window | Evaluator Notes |\n`;
        md += `|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---|\n`;

        modelsData.forEach(m => {
            md += `| #${m.rank} | **${m.name}** | ${m.logic} | ${m.prose} | ${m.flexibility} | ${m.knowledge} | ${m.context} | ${m.desc} |\n`;
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

// Chart Dimension Tab Switcher
function initChartDimensionTabs() {
    const tabBtns = document.querySelectorAll('.chart-tab-btn');
    const cards = {
        logic: document.getElementById('card-chart-logic'),
        prose: document.getElementById('card-chart-prose'),
        flex: document.getElementById('card-chart-flex'),
        knowledge: document.getElementById('card-chart-knowledge')
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetChart = btn.getAttribute('data-chart');
            if (targetChart === 'all') {
                Object.values(cards).forEach(card => {
                    if (card) card.style.display = 'flex';
                });
            } else {
                Object.entries(cards).forEach(([key, card]) => {
                    if (card) {
                        card.style.display = (key === targetChart) ? 'flex' : 'none';
                    }
                });
            }
        });
    });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    renderComparativeCharts();
    initChartDimensionTabs();
    initMatchupDropdowns();
    renderLeaderboard();
});
