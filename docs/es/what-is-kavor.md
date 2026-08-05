---
id: what-is-kavor
title: ¿Qué es Kavor?
description: Comprende el sistema visual local-first de Kavor para coordinar coding agents y contexto de ingeniería duradero.
kind: guide
lastReviewedAt: 2026-08-05
canonicalUrl: https://agentkavor.com/es/docs/what-is-kavor
---

# ¿Qué es Kavor?

Kavor es un sistema visual local-first para coordinar coding agents y el trabajo de ingeniería que los rodea. Mantiene
el contexto visible en un Canvas en vez de enterrarlo en chats y terminales desconectados.

Los coding agents abarataron la implementación. No eliminaron la necesidad de plantear el problema, preservar el
contexto, revisar evidencia, tomar decisiones y entender quién puede actuar sobre qué. Kavor da una estructura
explícita a ese trabajo.

## Cómo funciona Kavor

Un Workspace parte de un directorio que eliges. En su Canvas añades Nodes para los recursos y participantes del
trabajo: Specifications, Files, Sticky Notes, Terminals y CodingAgents. Las Connections entre Nodes transmiten
contexto y otorgan capacidades visibles. Los Guardrails limitan esas capacidades cuando el trabajo requiere un
límite más estricto.

Un CodingAgent puede implementar una Specification, otro revisar el resultado y un tercero preparar la versión. La
Specification y la evidencia permanecen en el Workspace cuando termina cualquier sesión individual. Puedes
inspeccionar el grafo, intervenir y decidir qué se acepta.

[![Canvas de Kavor con CodingAgents, Specifications, Files, Sticky Notes y Terminals conectados](https://agentkavor.com/kavor-working-demo-poster.jpg)](https://agentkavor.com/es/videos/overview)

[Mira un Workspace real de Kavor en 38 segundos →](https://agentkavor.com/es/videos/overview)

## Vocabulario central

- **Workspace** — el entorno de Kavor arraigado en un directorio que eliges.
- **Canvas** — la superficie visual donde se organiza el trabajo.
- **Node** — un elemento de primera clase del Canvas, como CodingAgent, Specification, File, Terminal o Sticky Note.
- **Connection** — una relación explícita que comparte contexto u otorga una capacidad entre Nodes.
- **CodingAgent** — un proveedor de agente que participa en el Workspace.
- **Specification** — un contrato Markdown duradero para intención, restricciones y criterios de aceptación.
- **Guardrail** — una restricción controlada por el usuario y aplicada a una Connection.
- **Sticky Note** — memoria de trabajo informal compartida para decisiones, observaciones y próximos pasos.

## Lo que permanece local

Kavor es local-first. Tu Workspace, repositorios, archivos, terminales y sesiones de proveedores permanecen bajo tu
control, en tu máquina. Una Connection expresa autorización dentro de Kavor; no es una razón para copiar contenido
privado del Workspace a servicios públicos.

## Un primer loop útil

Empieza con poco: conecta una Specification a un CodingAgent y un Terminal. Pide al CodingAgent que implemente el
contrato, inspecciona la evidencia y conserva la decisión en el Workspace. Añade revisores y loops más ricos solo
cuando el trabajo se beneficie de ellos.

[Descarga Kavor](https://download.agentkavor.com/es) o lee las [notas de la versión](./release-notes/index.md).
