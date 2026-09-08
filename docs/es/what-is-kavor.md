---
id: what-is-kavor
title: ¿Qué es Kavor?
description: Comprende el sistema visual local-first de Kavor para coordinar coding agents y contexto de ingeniería duradero.
kind: guide
lastReviewedAt: 2026-09-08
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
trabajo: Specifications, Files, Sticky Notes, Terminals, WebBrowsers, Triggers y CodingAgents. Las Connections forman
componentes alcanzables. Un CodingAgent puede trabajar con cualquier Node de su componente sin una Connection
directa. Los parámetros y Guardrails siguen ligados a Connections específicas cuando hace falta configuración o un
límite más estricto.

Un CodingAgent puede implementar una Specification, otro revisar el resultado y un tercero preparar la versión. La
Specification y la evidencia permanecen en el Workspace cuando termina cualquier sesión individual. Puedes
inspeccionar el grafo, intervenir y decidir qué se acepta.

[![Canvas de Kavor con CodingAgents, Specifications, Files, Sticky Notes y Terminals conectados](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)](https://agentkavor.com/es/videos/overview)

[Mira un Workspace real de Kavor en 38 segundos →](https://agentkavor.com/es/videos/overview)

## Vocabulario central

- **Workspace** — el entorno de Kavor arraigado en un directorio que eliges.
- **Canvas** — la superficie visual donde se organiza el trabajo.
- **Node** — un elemento de primera clase del Canvas, como CodingAgent, Specification, Sticky Note, Terminal, File,
  WebBrowser o Trigger.
- **Connection** — una relación explícita y no dirigida que integra Nodes en un componente alcanzable.
- **CodingAgent** — un proveedor de agente que participa en el Workspace.
- **Specification** — un contrato Markdown duradero para intención, restricciones y criterios de aceptación.
- **Guardrail** — una restricción controlada por el usuario y aplicada a una Connection.
- **Sticky Note** — memoria de trabajo informal compartida para decisiones, observaciones y próximos pasos.
- **WebBrowser** — páginas reales de Chromium que una persona y un CodingAgent pueden observar y operar en el mismo estado vivo.
- **Trigger** — una causa visible de actividad; Schedule es su fuente disponible para acciones en el tiempo.

## La web también forma parte del grafo

Un WebBrowser mantiene páginas reales en el Canvas. Conectado a un CodingAgent, permite que la persona y el agente
trabajen sobre las mismas pestañas, navegación y estado visible, sin reducir la web a texto copiado en una
conversación. Al cambiar de Workspace, la página puede seguir activa y volver en el mismo estado.

[![WebBrowser de Kavor conectado a un CodingAgent que opera la misma página](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/es/videos/web-browser-node)

[Mira el WebBrowser en funcionamiento →](https://agentkavor.com/es/videos/web-browser-node)

## Lo que permanece local

Kavor es local-first. Tu Workspace, repositorios, archivos, terminales y sesiones de proveedores permanecen bajo tu
control, en tu máquina. Una Connection expresa autorización dentro de Kavor; no es una razón para copiar contenido
privado del Workspace a servicios públicos.

## Un primer loop útil

Empieza con poco: conecta una Specification a un CodingAgent y un Terminal. Pide al CodingAgent que implemente el
contrato, inspecciona la evidencia y conserva la decisión en el Workspace. Añade revisores y loops más ricos solo
cuando el trabajo se beneficie de ellos.

[Sigue el tutorial completo del primer loop](./first-loop.md) para añadir implementación, revisión, evidencia
compartida y una decisión humana.

Cuando quieras que el propio CodingAgent ayude a montar la estructura, consulta [cómo CodingAgents ven y construyen
el Canvas](./coding-agents-and-canvas.md). Para iniciar trabajo en el tiempo, aprende a usar [Schedule](./schedule.md).

## Una aplicación, varios Workspaces

Puedes abrir Workspaces diferentes en ventanas independientes y distribuirlos entre monitores. Cada ventana mantiene
su propio Canvas y sus sesiones, mientras la aplicación continúa usando un único runtime compartido.

![Varios Workspaces de Kavor abiertos en ventanas diferentes](https://media.agentkavor.com/releases/1.3.0/multiple-workspaces/overview.baa20506a993.jpg)

[Descarga Kavor](https://download.agentkavor.com/es) o lee las [notas de la versión](./release-notes/index.md).
