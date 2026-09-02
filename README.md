<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./assets/anclora-insights-medalla-inverso-transparente.png" alt="Anclora Insights ADN" width="120" />

# Anclora Insights ADN — Brand Portal

### Manual de marca, ADN de negocio y suite editorial con IA para el sello editorial de Anclora Group

**Español** · [English](./README.en.md)

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Documentation](https://img.shields.io/badge/documentation-premium-BFA46A)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN-047857)

</div>

---

> [!IMPORTANT]
> Repositorio interno del ecosistema Anclora. No publicar detalles operativos, credenciales,
> datos reales ni lógica sensible fuera de los canales autorizados.

## Qué es

Este repositorio es el **portal interno de marca y asistencia editorial** de Anclora Insights ADN — el sello editorial de Anclora Group dedicado a la investigación, el análisis y la creación de conocimiento aplicado. No es el sello editorial en sí, sino la herramienta que documenta su identidad de marca y da soporte con IA a quienes producen sus contenidos.

## Funcionalidades principales

- **Brand Book**: manual de marca navegable (voz, tono, paleta, tipografía, usos correctos e incorrectos).
- **Business DNA**: documento de posicionamiento y criterio editorial del sello.
- **Asistente editorial con IA**: reescritura de texto, generación de contenido y resumen de libros/capítulos, apoyado en la API de Gemini.
- **Comprobador de contraste**: verificación de accesibilidad de color sobre la paleta de marca.
- **Guía de marca imprimible**: exportación de las guidelines de marca a PDF.

## Arranque local

```bash
npm install
npm run dev
```

Requiere una clave de API de Gemini configurada como variable de entorno para el asistente editorial (ver `.env.example` si existe, o la configuración del servidor en `server.ts`).

## Tecnología

| Área | Detalle |
| --- | --- |
| Frontend | React + Vite + Tailwind CSS |
| Backend | Express (servidor propio, `server.ts`) |
| IA | Google Gemini API (`@google/genai`) |
| Exportación | Generación de PDF (`src/lib/pdfGenerator.ts`) |

## Documentación

- Documentación técnica pendiente de consolidar en `docs/`.

## Gobernanza

- Producto canónico: `anclora-insights-adn`
- Contratos: `contracts/` y `docs/governance/`
- Asset de marca: `presente` (`assets/`)

---

<div align="center">

### Anclora Group · Uso interno

</div>
