# RFT Epistemic Mapping System

**An AI-powered prototype for structured knowledge base construction in contested domains.**

Built by [Bianca Avanzo](https://avanzorft.com) | Root Lab, Bauru, SP, Brazil  
ORCID: [0009-0006-9226-1241](https://orcid.org/0009-0006-9226-1241)  
Submission for: [Lab Leaks, Black Holes, and Eggs — FLF Epistemic Case Study Competition (2026)](https://www.ftxfuturefund.org)

---

## What This Is

This prototype implements the full epistemic mapping pipeline described in the accompanying paper:

**Source → Claim Extraction → Provenance Tagging → RFT Signal Classification → Dynamic Map Update**

It is grounded in **Root Frequency Theory (RFT)** — a framework originally developed to measure experiential continuity and meaning integration across biological layers, whose architecture generalizes to any contested knowledge domain.

The formal metric is:

**M = (Φ · Kₑ) / F**

Where:
- **Φ** = Source coherence (does the claim connect reliably to its evidential source?)
- **Kₑ** = Epistemic alignment (is the mechanism verified, or is institutional authority substituting for mechanistic proof?)
- **F** = Fragmentation (contradiction density, variation erasure, structural incoherence)
- **σ(M)** = Stability index (has nominal consensus actually compressed variance over time?)

---

## Features

- **12 pre-seeded nodes** across three FLF case studies: Eggs & Cholesterol, COVID-19 Origins, LHC Black Hole Safety
- **Live AI pipeline**: paste any source → Claude extracts a node, classifies RFT signal, assigns calibrated scores
- **Scoring rubric**: structured anchor points for reproducibility (±0.1 inter-rater agreement target)
- **Competing interpretations**: every node preserves two named priors with explicit score impacts
- **Crux identification**: the single highest-leverage unresolved question per node
- **Missing evidence inventory**: what perspectives, datasets, or primary sources are absent
- **Correlated evidence detection**: flags when nodes share source clusters and cannot be treated as independent
- **Adversarial flags**: methodological concerns surfaced automatically
- **σ(M) trajectory chart**: instability visualized across all nodes over time
- **M uncertainty intervals**: ±0.1 propagated through the formula

---

## Case Studies Included

| Case | Nodes | Key Finding |
|------|-------|-------------|
| Eggs & Cholesterol | 4 | σ(M) remained elevated 10 years after institutional reversal — behavioral attractor anchored to 1968 claim |
| COVID-19 Origins | 4 | σ(M) elevation is a structural output of investigative apparatus sharing provenance with original claim |
| LHC Black Hole Safety | 4 | Highest-M nodes in the base (M = 8.55) — demonstrates framework identifies genuine consensus, not only failure |

---

## Running Locally

This is a React component. To run:

```bash
npm install
npm run dev
```

Or paste `src/App.jsx` directly into [Claude.ai Artifacts](https://claude.ai) or any React sandbox (CodeSandbox, StackBlitz).

**Note:** The live AI pipeline requires an Anthropic API key. In Claude.ai Artifacts, this is handled automatically.

---

## Paper

The full methodology paper (APA format, all three case studies, complete rubric tables) is included as `Avanzo_RFT_FLF2026_Final.docx`.

Preprints:
- [RFT Theory — Zenodo 18905376](https://doi.org/10.5281/zenodo.18905376)
- [M-RFT Metric — Zenodo 19423115](https://doi.org/10.5281/zenodo.19423115)
- [N=1 Study — Zenodo 20261109](https://doi.org/10.5281/zenodo.20261109)

---

## Contact

Bianca Avanzo  
bianca@avanzorft.com  
[avanzorft.com](https://avanzorft.com)  
[linkedin.com/in/bianca-avanzo-b1b5231a9](https://linkedin.com/in/bianca-avanzo-b1b5231a9)
