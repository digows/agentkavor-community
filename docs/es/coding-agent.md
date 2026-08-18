---
id: coding-agent
title: "CodingAgent en Kavor: tu harness favorito como parte de un grafo"
description: Elige un provider, conserva su experiencia nativa y conecta el CodingAgent con el contexto, las herramientas y los participantes adecuados.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/es/docs/coding-agent
---

# CodingAgent en Kavor: tu harness favorito como parte de un grafo

Un CodingAgent es tu agente de programación ejecutado en la interfaz nativa de su provider, ahora como participante
visible del Canvas.

Kavor no sustituye cada harness por un chat genérico. Conserva la experiencia del provider y añade una estructura a
su alrededor: responsabilidad explícita, contexto alcanzable, herramientas, otros CodingAgents y límites que puedes
inspeccionar.

[![Selector de provider en la toolbar de Kavor antes de añadir un CodingAgent al Canvas.](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)](https://agentkavor.com/es/videos/coding-agent-provider-selector)

## Qué posee un CodingAgent

Cada CodingAgent representa una sesión separada. El Node conserva la configuración y el estado necesarios para ese
papel, incluido el provider elegido y, cuando el provider los ofrece, modelo, nivel de effort, permisos y sesión
nativa.

El provider es una configuración del CodingAgent, no otro tipo de Node. El selector incluye:

- Anthropic Claude Code;
- OpenAI Codex;
- Google Antigravity;
- xAI Grok;
- SST OpenCode.

Al añadir un CodingAgent desde la toolbar, primero eliges el provider. Después configuras la sesión para el trabajo.
Las opciones pueden variar porque Kavor conserva las capacidades reales de cada harness en lugar de fingir que todos
comparten el mismo contrato.

## Qué puede hacer por sí solo

Sin ninguna Connection, un CodingAgent sigue siendo una sesión provider-native dentro del Workspace. Puedes
conversar, usar las herramientas del harness y mantener el trabajo delimitado por la raíz de ese Workspace.

El Node ya ayuda a separar contextos: una sesión puede investigar mientras otra implementa. Sin un grafo, sin
embargo, el contexto compartido aún depende de lo que introduzcas en cada conversación.

La Connection convierte la sesión aislada en participante de un sistema de trabajo.

## Qué gana en el grafo

Un CodingAgent puede trabajar con cualquier Node alcanzable mediante un camino de Connections válidas en su
componente. No todos los recursos necesitan una conexión directa.

Las Connections directas con un CodingAgent tienen papeles específicos:

| Connection | Qué añade |
| --- | --- |
| **CodingAgent + Specification** | Coloca intención, alcance y criterios duraderos en el grafo. Puede incluir `specification_read_only`. |
| **CodingAgent + Sticky Note** | Añade memoria informal compartida para decisiones abiertas, progreso y findings. Puede incluir `sticky_note_read_only`. |
| **CodingAgent + File** | Hace explícita una fuente canónica del filesystem. Puede incluir `file_read_only`. |
| **CodingAgent + Terminal** | Permite ejecutar comandos, observar procesos y consultar evidencias del shell. Puede incluir `terminal_read_only`. |
| **CodingAgent + CodingAgent** | Une participantes en un mismo componente. Los CodingAgents alcanzables pueden intercambiar mensajes asíncronos y consultar el contexto necesario para coordinarse. |
| **Trigger + CodingAgent** | Selecciona esa sesión activa como objetivo directo de un prompt programado. Un Trigger no inicia una sesión que cerraste. |

El alcance no elimina los contratos directos. Si la Connection exacta entre un CodingAgent y un recurso tiene un
Guardrail, la restricción sigue rigiendo ese par aunque exista otra ruta en el grafo.

## Tres patrones útiles

### Implementar a partir de un contrato

Conecta una Specification, un CodingAgent con papel de Implementer y un Terminal. El agente lee el contrato en la
fuente, cambia solo el alcance necesario, ejecuta las verificaciones y registra outputs en la Specification.

Así la intención queda fuera del historial de conversación y la evidencia permanece en el Workspace.

### Separar implementación y revisión

Usa sesiones distintas para Implementer y Reviewer. Ambos alcanzan la misma Specification y sus evidencias, pero cada
uno recibe una pregunta diferente.

El Implementer pregunta «¿cómo cumplo el contrato?». El Reviewer pregunta «¿el resultado cumple realmente el
contrato y qué riesgos permanecen?». La separación reduce la posibilidad de que la revisión herede automáticamente
las premisas del autor.

### Combinar providers sin crear una competición

Providers diferentes pueden participar en el mismo grafo. Combínalos cuando otra interfaz, modelo o línea de
razonamiento mejore una responsabilidad concreta.

No añadas un provider solo para aumentar el número de agentes. Define primero el papel, el resultado esperado y la
condición de parada; después elige el harness que mejor sirva al trabajo.

## Un grafo práctico

```text
Specification — Implementer — Reviewer
                    │            │
                  Terminal    Sticky Note
                    │
                   File
```

Las líneas representan Connections sin dirección persistida. Todos los Nodes forman el mismo componente alcanzable.
El Implementer ejecuta el contrato, el Reviewer produce una evaluación independiente y la Sticky Note mantiene
preguntas o findings visibles para la decisión humana.

No es una secuencia automática. Los mensajes coordinan handoffs; las Specifications y otros recursos conservan lo
que debe sobrevivir a las sesiones; tú decides cuándo aceptar el trabajo.

## Un prompt inicial mejor

Para un Implementer:

> Implementa únicamente el alcance definido en la Specification alcanzable. Antes de modificar código, identifica
> los Files y las verificaciones relevantes. Usa el Terminal para producir evidencias, registra el resultado como
> output de la Specification y pide al Reviewer una evaluación independiente. Detente si una decisión necesaria
> queda fuera del contrato.

Para un Reviewer:

> Compara la implementación y las evidencias con los criterios de la Specification. Busca comportamiento incorrecto,
> escenarios ausentes, regresiones y riesgos operativos. Registra findings concretos antes de sugerir cambios y no
> apruebes el trabajo solo porque los tests existentes pasaron.

## Límites importantes

- Un CodingAgent no recibe acceso por proximidad visual; debe existir un camino de Connections.
- Referenciar un Node en un mensaje no concede acceso.
- Un Guardrail restringe el par directo al que pertenece; no es una política global del Workspace.
- Los mensajes coordinan el trabajo, pero no deben ser el único lugar de una decisión duradera.
- Los providers no ofrecen necesariamente los mismos modelos, permisos, eventos u operaciones de sesión.
- Un Trigger entrega un prompt a una sesión activa; no amplía permisos ni garantiza que un efecto externo suceda
  exactamente una vez.
- Autorizar ediciones del Canvas no autoriza eliminar Nodes ni cambiar Guardrails; esas fronteras siguen siendo
  humanas.

## Antes de iniciar la sesión

Confirma:

- qué responsabilidad tiene este CodingAgent;
- qué resultado observable debe producir;
- qué Nodes deben ser alcanzables;
- qué Guardrails deben existir en las Connections directas;
- si provider, modelo y effort encajan con el riesgo de la tarea;
- dónde se conservarán decisiones, progreso y evidencias;
- con quién debe conversar y cuándo debe detenerse.

Un CodingAgent no se vuelve poderoso por recibir un prompt más largo. Se vuelve más útil cuando responsabilidad,
contexto, herramientas, colaboración y límites forman un diseño coherente.

Continúa con [Cómo elegir CodingAgents y definir papeles](./agents-and-roles.md), aprende
[cómo los CodingAgents ven y construyen el Canvas](./coding-agents-and-canvas.md) o consulta la
[matriz de Connections soportadas](./connections.md).
