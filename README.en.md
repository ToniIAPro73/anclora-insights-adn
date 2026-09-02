<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./assets/anclora-insights-medalla-inverso-transparente.png" alt="Anclora Insights ADN" width="120" />

# Anclora Insights ADN — Brand Portal

### Brand book, business DNA and AI editorial suite for Anclora Group's editorial imprint

[Español](./README.md) · **English**

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Documentation](https://img.shields.io/badge/documentation-premium-BFA46A)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN-047857)

</div>

---

> [!IMPORTANT]
> Internal Anclora ecosystem repository. Do not publish operational details, credentials,
> real data or sensitive logic outside approved channels.

## What this is

This repository is the **internal brand and editorial-assistance portal** for Anclora Insights ADN — Anclora Group's editorial imprint dedicated to research, analysis and applied knowledge creation. It is not the imprint itself, but the tool that documents its brand identity and gives AI-assisted support to the people producing its content.

## Main features

- **Brand book**: navigable brand manual (voice, tone, palette, typography, correct and incorrect usage).
- **Business DNA**: positioning and editorial-criteria document for the imprint.
- **AI editorial assistant**: text rewriting, content generation and book/chapter summarization, powered by the Gemini API.
- **Contrast checker**: color accessibility verification against the brand palette.
- **Printable brand guidelines**: export the brand guidelines to PDF.

## Local start

```bash
npm install
npm run dev
```

Requires a Gemini API key configured as an environment variable for the editorial assistant (see `.env.example` if present, or the server configuration in `server.ts`).

## Technology

| Area | Detail |
| --- | --- |
| Frontend | React + Vite + Tailwind CSS |
| Backend | Express (custom server, `server.ts`) |
| AI | Google Gemini API (`@google/genai`) |
| Export | PDF generation (`src/lib/pdfGenerator.ts`) |

## Documentation

- Technical documentation pending consolidation in `docs/`.

## Governance

- Canonical product: `anclora-insights-adn`
- Contracts: `contracts/` and `docs/governance/`
- Brand asset: `present` (`assets/`)

---

<div align="center">

### Anclora Group · Internal use

</div>
