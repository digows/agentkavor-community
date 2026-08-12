---
id: nodes
title: Nodes de Kavor
description: Entiende qué hacen CodingAgent, Specification, Sticky Note, Terminal, File y Trigger por separado y qué obtienen al conectarse.
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/es/docs/nodes
---

# Un Node es útil por sí solo. Un grafo transforma el trabajo en un sistema.

Kavor no te pide abandonar tu coding agent favorito, ocultar el terminal ni convertir cada decisión en otro chat. Pone
participantes, herramientas y contexto en el mismo Canvas para que puedas ver quién trabaja, con qué recursos y bajo
qué límites.

Cada elemento de primera clase de ese Canvas es un **Node**. Un CodingAgent es un Node. Una Specification también.
Sticky Notes, Terminals, Files y Triggers comparten el mismo espacio porque todos pueden participar en el trabajo, cada
uno con una responsabilidad distinta.

Un Node ya es útil por separado. Cuando creas una **Connection**, esa utilidad se convierte en una capacidad explícita.
Cuando varias Connections forman un grafo, el contexto, la ejecución, la memoria y la colaboración dejan de estar
dispersos entre ventanas y sesiones aisladas.

Este es el modelo:

**Node → Connection → grafo → decisión humana**

La secuencia describe cómo el trabajo adquiere estructura. Las Connections no son flechas persistidas ni una
automatización que ejecuta la siguiente caja. Son relaciones visibles entre Nodes.

![CodingAgents, Specification, Sticky Note, Terminal, File y Trigger conectados en el Canvas de Kavor](https://media.agentkavor.com/editorial/nodes-and-connections/graph.b499a1b842e8.jpg)

*Un Canvas puede combinar intención duradera, memoria compartida, ejecución, archivos y una causa programada sin
ocultar a los participantes ni sus Connections.*

## Qué cambia realmente una Connection

Una Connection responde una pregunta práctica: **¿qué pueden hacer juntos estos dos Nodes?**

Según la combinación, puede permitir que un CodingAgent trabaje con una Specification, escriba en una Sticky Note,
opere un Terminal, trate un File como parte explícita del alcance o converse con otro CodingAgent. También puede
entregar a un Terminal la ruta canónica de un File o despertar a un CodingAgent con sesión activa en un horario
definido.

Al mismo tiempo, una Connection establece un límite:

- los Nodes cercanos en el Canvas no obtienen acceso entre sí;
- mencionar un Node en un mensaje no concede una capacidad;
- no todas las combinaciones de Nodes están soportadas;
- un Guardrail puede restringir una capacidad concedida por la Connection;
- el grafo hace alcanzable el contexto, pero no aprueba acciones automáticamente.

El resultado es menos mágico y más útil: puedes inspeccionar la estructura antes, durante y después del trabajo.

## Los seis Nodes

### CodingAgent: tu harness favorito como participante del grafo

Un CodingAgent es el provider nativo que ya usas, ejecutado en su propia interfaz de terminal. En lugar de sustituir
Claude Code, Codex o Google Antigravity por un chat genérico, Kavor preserva la experiencia de cada harness y lo coloca
en el Canvas.

Cada CodingAgent puede tener un papel claro. El harness conserva sus opciones nativas de provider, modelo y nivel de
esfuerzo cuando las ofrece. Puedes mantener un Spec Writer centrado en preguntas y decisiones, un Builder en la
implementación y un Reviewer responsable de cuestionar el resultado.

Los CodingAgents conectados pueden intercambiar mensajes asíncronos. Sigues viendo las conversaciones en el panel
Messages y puedes intervenir cuando sea necesario. Al conectarlos con Specifications, Files, Sticky Notes y Terminals,
el grafo deja claro qué recursos participan en el trabajo.

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

### Terminal: ejecución que permanece visible

Un Terminal mantiene el shell dentro del mismo Workspace visual. Puedes navegar entre terminales, seguir un log,
ejecutar verificaciones o permanecer conectado a una máquina remota sin perder el Canvas que lo rodea.

Cuando un CodingAgent está conectado, ambos pueden trabajar en el mismo Terminal. El agente puede inspeccionar output,
ejecutar comandos cuando esté permitido, seguir una ejecución correlacionada y ayudar en un diagnóstico. La entrada
humana mantiene prioridad y un Guardrail puede dejar la Connection en modo de solo lectura.

Files y Specifications también pueden proporcionar sus rutas al Terminal mediante variables de entorno. Un Trigger
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

### Trigger: una causa visible de actividad

Un Trigger programa una acción en el tiempo. Puede entregar un comando a un Terminal, como un cron del sistema
operativo, o enviar un prompt claro a un CodingAgent con una sesión activa.

Su valor crece cuando el objetivo ya está conectado a otros Nodes. Un Trigger puede despertar a un agente encargado
de inspeccionar un File, ejecutar verificaciones en un Terminal, escribir un informe en una Sticky Note y solicitar
una revisión independiente a otro CodingAgent.

Así, una hora del calendario puede iniciar un pequeño sistema autónomo o semiautónomo. El Trigger inicia la actividad;
el grafo proporciona contexto, herramientas, memoria y colaboración.

Un Trigger no decide qué merece hacerse, no amplía permisos ni inicia una sesión que dejaste apagada. Solo tiene un
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

## Empieza por el trabajo, no por la cantidad de Nodes

Un Canvas más grande no es automáticamente mejor. Empieza por la estructura mínima que haga verificable el resultado:

1. define qué debe ocurrir;
2. añade una Specification cuando deban sobrevivir decisiones, alcance o criterios;
3. elige un CodingAgent y dale un papel claro;
4. conecta un File cuando el alcance concreto deba quedar explícito;
5. conecta un Terminal cuando la tarea requiera ejecución o evidencia;
6. usa una Sticky Note cuando humano y agente necesiten memoria de trabajo compartida;
7. añade otro CodingAgent cuando una revisión independiente o trabajo paralelo mejore realmente el resultado;
8. añade un Trigger cuando el tiempo sea una causa legítima de actividad.

El objetivo no es llenar el Canvas. Es construir un sistema lo bastante pequeño para entenderse y lo bastante
completo para preservar intención, ejecución, evidencia y decisión.

## Continúa

- Consulta la [matriz de Connections soportadas](./connections.md) para conocer el contrato exacto de cada combinación.
- [Cierra tu primer loop](./first-loop.md) con una Specification, dos CodingAgents y una Sticky Note.
- Aprende [cómo elegir CodingAgents y papeles](./agents-and-roles.md) para formulación, implementación, revisión y entrega.
- Vuelve a [¿Qué es Kavor?](./what-is-kavor.md) para revisar el modelo completo del producto.
