---
id: nodes
title: Nodes de Kavor
description: Entiende qué hacen CodingAgent, Specification, Sticky Note, Terminal, File, Diagram, WebBrowser y Trigger por separado y qué obtienen al conectarse.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/es/docs/nodes
---

# Un Node es útil por sí solo. Un grafo transforma el trabajo en un sistema.

Kavor no te pide abandonar tu coding agent favorito, ocultar el terminal ni convertir cada decisión en otro chat. Pone
participantes, herramientas y contexto en el mismo Canvas para que puedas ver quién trabaja, con qué recursos y bajo
qué límites.

Cada elemento de primera clase de ese Canvas es un **Node**. Un CodingAgent es un Node. Una Specification también.
Sticky Notes, Terminals, Files, Diagrams, WebBrowsers y Triggers comparten el mismo espacio porque todos pueden
participar en el trabajo, cada uno con una responsabilidad distinta.

Un Node ya es útil por separado. Cuando creas una **Connection**, pasa a participar en un componente alcanzable.
En ese grafo, los CodingAgents pueden trabajar con contexto, ejecución, memoria y colaboradores a cualquier
distancia, sin depender de una Connection directa para cada recurso.

Este es el modelo:

**Node → Connection → grafo → decisión humana**

La secuencia describe cómo el trabajo adquiere estructura. Las Connections no son flechas persistidas ni una
automatización que ejecuta la siguiente caja. Son relaciones visibles entre Nodes.

![CodingAgents, Specification, Sticky Note, Terminal, File y Trigger conectados en el Canvas de Kavor](https://media.agentkavor.com/editorial/nodes-and-connections/graph.b499a1b842e8.jpg)

*Un Canvas puede combinar intención duradera, memoria compartida, ejecución, archivos y una causa programada sin
ocultar a los participantes ni sus Connections.*

## Qué cambia realmente una Connection

Una Connection responde primero una pregunta práctica: **¿en qué grafo participan estos Nodes?**

Cualquier CodingAgent puede trabajar con los Nodes alcanzables por ese grafo y conversar con otros CodingAgents del
mismo componente. La Connection directa aún puede tener un contrato propio: seleccionar el objetivo de un Schedule,
entregar al Terminal la ruta canónica de un File, Diagram o Specification y llevar un Guardrail entre un CodingAgent
y un recurso.

Al mismo tiempo, una Connection establece un límite:

- los Nodes cercanos en el Canvas no obtienen acceso entre sí;
- mencionar un Node en un mensaje no concede una capacidad;
- no todas las combinaciones de Nodes aceptan una Connection directa, aunque los pares no soportados pueden
  participar en el mismo grafo por rutas válidas;
- un Guardrail restringe solo el par directo donde se colocó y sigue vigente aunque exista otra ruta;
- el grafo hace alcanzable el contexto, pero no aprueba acciones automáticamente.

El resultado es menos mágico y más útil: puedes inspeccionar la estructura antes, durante y después del trabajo.

## Copia un prompt para entender tu grafo

Pega el pedido en un CodingAgent del Workspace y describe la tarea. Solo solicita lectura y orientación; los Nodes externos no se vuelven accesibles por aparecer en el layout.

```prompt
Explica cómo pueden ayudar los Nodes de mi grafo alcanzable con la tarea que describí.
Identifica dónde están la intención, las fuentes, la ejecución y la memoria de trabajo.
Si falta algo, propón la menor estructura necesaria y explica por qué existe cada Node.
No crees ni elimines Nodes o Connections ni leas contenido fuera de tu grafo.
```

**Resultado esperado:** Un mapa breve del contexto disponible y una propuesta cuando haga falta. La explicación no crea un pipeline automático ni concede accesos nuevos; tú decides el siguiente paso.

## Tipos de Node

### CodingAgent: tu harness favorito como participante del grafo

Un CodingAgent es el provider nativo que ya usas, ejecutado en su propia interfaz de terminal. En lugar de sustituir
Claude Code, Codex o Google Antigravity por un chat genérico, Kavor preserva la experiencia de cada harness y lo coloca
en el Canvas.

Cada CodingAgent puede tener un papel claro. El harness conserva sus opciones nativas de provider, modelo y nivel de
esfuerzo cuando las ofrece. Puedes mantener un Spec Writer centrado en preguntas y decisiones, un Builder en la
implementación y un Reviewer responsable de cuestionar el resultado.

Los CodingAgents del mismo componente alcanzable pueden intercambiar mensajes asíncronos, incluso sin una
Connection directa entre ellos. Sigues viendo las conversaciones en el panel Messages y puedes intervenir cuando
sea necesario. Las Specifications, Files, Sticky Notes y Terminals alcanzables dejan claro qué recursos participan
en ese trabajo.

Es el mismo harness, ahora con contexto y capacidades visibles.

### Specification: intención que sobrevive a la sesión

Una Specification registra decisiones, alcance, restricciones y criterios de aceptación en Markdown duradero. Puede
describir la base de una arquitectura, una integración, el modelado de un dominio, una feature, un módulo o una serie
delimitada de correcciones.

Puedes escribirla manualmente o coescribirla con un CodingAgent. Para temas difíciles, conviene invertir el mejor
razonamiento disponible antes de implementar. Pensar en profundidad aquí suele costar menos que corregir ambigüedades
después.

Las Specifications tienen lifecycle. **Draft** es el espacio para investigar y decidir. **Ready** indica que el
contrato puede implementarse. **In progress**, **Blocked** y **Done** mantienen visible el estado. **Done** solo tiene
sentido cuando los criterios de aceptación se cumplieron realmente.

Conectada a agentes con funciones distintas, la misma Specification puede orientar a quien escribe, implementa y
revisa sin depender de la memoria de una sola conversación.

### Sticky Note: memoria de trabajo compartida

Una Sticky Note es un post-it en el Canvas. Puedes registrar preguntas, hipótesis, decisiones temporales, findings y
próximos pasos como en cualquier nota rápida.

Conectada a un CodingAgent, obtiene una segunda mano. El agente puede mantenerla contigo: compilar decisiones abiertas
durante una Specification, registrar algo que requiere tu atención durante la implementación o responder “¿qué has
hecho, qué estás haciendo y qué viene después?” sin enterrar ese estado en el historial del chat.

Las Sticky Notes funcionan bien como memoria informal y visible. Cuando una decisión se convierte en un contrato
duradero para implementación y mantenimiento futuro, debe promoverse a una Specification.

Compartir contexto no autoriza al agente a reorganizar tus notas ni las de otro participante. Indica qué nota debe
mantener y qué debe conservar; consulta la [guía de Sticky Note](./sticky-note.md).

### Terminal: ejecución que permanece visible

Un Terminal mantiene el shell dentro del mismo Workspace visual. Puedes navegar entre terminales, seguir un log,
ejecutar verificaciones o permanecer conectado a una máquina remota sin perder el Canvas que lo rodea.

Cuando un CodingAgent está conectado, ambos pueden trabajar en el mismo Terminal. El agente puede inspeccionar output,
ejecutar comandos cuando esté permitido, seguir una ejecución correlacionada y ayudar en un diagnóstico. La entrada
humana mantiene prioridad y un Guardrail puede dejar la Connection en modo de solo lectura.

Files, Diagrams y Specifications también pueden proporcionar sus rutas al Terminal mediante variables de entorno. Un Trigger
puede entregar un comando programado directamente a una sesión activa del shell.

El Terminal no oculta la ejecución detrás de una automatización opaca. El proceso, el comando y el resultado permanecen
visibles.

### File: un archivo que participa en el Canvas

Un File es un archivo. La ganancia consiste en hacer visible y explícita su fuente canónica dentro del grafo.

Conectado a un CodingAgent, puede delimitar el archivo que debe leerse, revisarse o modificarse. En el Canvas también
puede mantener a la vista un texto, una imagen o un PDF mientras organizas el resto del trabajo.

Conectado a un Terminal, la ruta absoluta del File puede exponerse mediante una variable de entorno. Así puedes usar
visualmente un script, un archivo SQL, una configuración u otro material como entrada de un comando sin copiar rutas
entre ventanas.

El File no se convierte en un attachment descartable. Sigue siendo la fuente real en el filesystem.

### Diagram: una fuente que también puede leerse como dibujo

Un Diagram representa un archivo de diagrama en el Canvas. Un CodingAgent puede producir una propuesta de
arquitectura, flujo o modelo de datos; tú compruebas el resultado, editas la fuente y mantienes el dibujo cerca de
la Specification que ayuda a explicar. Excalidraw también ofrece edición visual; draw.io es solo para visualización
en Kavor.

La fuente sigue siendo un archivo real. La extensión selecciona el formato, con la excepción de SVG: un SVG común
se abre como File y debe añadirse explícitamente como Diagram. Una Connection con Terminal proporciona la ruta de
la fuente; con un CodingAgent, un Guardrail directo puede mantenerla en solo lectura.

Usa [Diagramas](./diagrams.md) para elegir el formato y copiar ejemplos de prompts. La página explica la edición,
el resultado de renderización, las descargas y los límites offline sin confundir un preview anterior con el éxito
de la nueva fuente.

### WebBrowser: la web abierta a la persona y al agente

Un WebBrowser coloca páginas reales de Chromium en el Canvas. Puedes navegar, mantener pestañas y seguir lo que
ocurre sin salir del Workspace.

Conectado a un CodingAgent, deja de ser solo una referencia visual. El agente puede observar y operar las mismas
páginas vivas que ves: navegar, hacer clic, completar campos, esperar estados y capturar evidencia. La Connection
hace alcanzable el navegador; no evita autenticación, permisos ni decisiones humanas.

El perfil del navegador está dedicado a Kavor y es compartido por sus WebBrowsers. Cookies y sesiones pueden
sobrevivir a la eliminación de un Node hasta que borres los datos en Settings. Como este perfil sirve al desarrollo,
acepta certificados autofirmados, caducados y privados. Una red hostil puede presentar cualquier certificado a este
perfil; ten presente esa exposición, especialmente al iniciar sesión en servicios.

Al cambiar de Workspace en la misma ventana, Kavor conserva la página viva. Al volver, el WebBrowser aparece sin
recargarse y un CodingAgent conectado puede seguir operando ese estado mientras el Workspace no está visible. Cerrar
la pestaña, eliminar el Node o finalizar la sesión termina esa continuidad.

[![WebBrowser conectado a un CodingAgent en el Canvas de Kavor](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/es/videos/web-browser-node)

[Mira a una persona y un CodingAgent trabajando en la misma página →](https://agentkavor.com/es/videos/web-browser-node)

### Schedule: una causa visible de actividad

Schedule es la fuente de Trigger disponible en Kavor. Programa una acción en el tiempo: puede entregar un comando a
un Terminal, como un cron del sistema operativo, o enviar un prompt claro a un CodingAgent con una sesión activa.

Su valor crece cuando el objetivo ya está conectado a otros Nodes. Un Trigger puede despertar a un agente encargado
de inspeccionar un File, ejecutar verificaciones en un Terminal, escribir un informe en una Sticky Note y solicitar
una revisión independiente a otro CodingAgent.

Así, una hora del calendario puede iniciar un pequeño sistema autónomo o semiautónomo. El Trigger inicia la actividad;
el grafo proporciona contexto, herramientas, memoria y colaboración.

Schedule no decide qué merece hacerse, no amplía permisos ni inicia una sesión que dejaste apagada. Solo tiene un
objetivo directo: un CodingAgent o un Terminal.

## Cuando los Nodes forman un grafo

El valor del Canvas aparece cuando cada Node tiene una responsabilidad y las Connections expresan una necesidad real.
Tres grafos muestran esa progresión.

### De la intención a la revisión

**Specification → Builder → Reviewer → decisión humana**

La Specification conserva el contrato. El Builder implementa. El Reviewer compara el resultado con los criterios de
aceptación. Una Sticky Note preserva findings y decisiones de trabajo; un Terminal aporta evidencias como tests y
verificaciones.

Las Connections no ejecutan esa secuencia automáticamente. Hacen alcanzables en un mismo grafo los participantes y
capacidades necesarios.

### Mantenimiento programado

**Trigger → Maintainer**

El Maintainer está conectado a un File con los datos de entrada, un Terminal para ejecutar verificaciones, una Sticky
Note para el informe y un Reviewer para una evaluación independiente.

El Trigger entrega el prompt en el horario configurado mientras Kavor está en ejecución y la sesión del objetivo está
activa. El CodingAgent trabaja con el contexto y los límites que ya tenía. Puedes inspeccionar resultados, mensajes y
evidencias al volver al Workspace.

### Comando operativo supervisado

**Trigger → Terminal**

Un File con SQL o un script entrega su ruta al Terminal mediante una variable de entorno. El Trigger envía el comando
programado a la sesión activa. Un CodingAgent conectado al Terminal puede ayudar a analizar el resultado mientras tú
mantienes visibilidad sobre el proceso.

Este grafo automatiza una causa y una ejecución sin fingir que el sistema conoce por sí solo el significado del éxito.

## Reutiliza un grafo sin reconstruir cada Node

Cuando un loop funciona bien, su grupo de Nodes puede copiarse o moverse para otra tarea, incluso entre Workspaces.
Los archivos del sistema, las capturas, los enlaces y el texto también pueden entrar en el Canvas arrastrándolos o
mediante Paste. Estos gestos no clonan sesiones ni convierten las referencias a archivos en copias de sus bytes.

La guía [Añadir contenido al Canvas](./adding-content.md) reúne el procedimiento, la prioridad del portapapeles, lo
que conserva cada tipo de Node y el efecto de Undo. Úsala como referencia antes de mover un loop en ejecución.

## Empieza por el trabajo, no por la cantidad de Nodes

Un Canvas más grande no es automáticamente mejor. Empieza por la estructura mínima que haga verificable el resultado:

1. define qué debe ocurrir;
2. añade una Specification cuando deban sobrevivir decisiones, alcance o criterios;
3. elige un CodingAgent y dale un papel claro;
4. conecta un File cuando el alcance concreto deba quedar explícito;
5. conecta un Terminal cuando la tarea requiera ejecución o evidencia;
6. usa una Sticky Note cuando humano y agente necesiten memoria de trabajo compartida;
7. conecta un WebBrowser cuando el trabajo necesite observar u operar una página viva;
8. añade otro CodingAgent cuando una revisión independiente o trabajo paralelo mejore realmente el resultado;
9. añade un Diagram cuando una decisión, estructura o flujo deba quedar visualmente explícito;
10. añade un Trigger cuando el tiempo sea una causa legítima de actividad.

El objetivo no es llenar el Canvas. Es construir un sistema lo bastante pequeño para entenderse y lo bastante
completo para preservar intención, ejecución, evidencia y decisión.

## Continúa

- Consulta la [matriz de Connections soportadas](./connections.md) para conocer el contrato exacto de cada combinación.
- [Cierra tu primer loop](./first-loop.md) con una Specification, dos CodingAgents y una Sticky Note.
- Aprende [cómo elegir CodingAgents y papeles](./agents-and-roles.md) para formulación, implementación, revisión y entrega.
- Usa una [Sticky Note como memoria de trabajo compartida](./sticky-note.md).
- Entiende cómo un [File convierte una fuente canónica en contexto y alcance](./file.md).
- Desarrolla, depura y prueba junto a un agente en [WebBrowser](./web-browser.md).
- Aprende a usar [Schedule para dar un reloj a tu grafo](./schedule.md).
- Entiende [cómo ven y construyen el Canvas los CodingAgents](./coding-agents-and-canvas.md).
- Vuelve a [¿Qué es Kavor?](./what-is-kavor.md) para revisar el modelo completo del producto.
