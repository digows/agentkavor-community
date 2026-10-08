---
id: sticky-note
title: "Sticky Note: memoria de trabajo compartida"
description: Usa una Sticky Note para registrar estado, hallazgos y puntos de atención con tus CodingAgents sin convertir cada nota de trabajo en una Specification.
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/es/docs/sticky-note
---

# Una Sticky Note es pequeña, pero mantiene visible el trabajo

Una Sticky Note empieza como un post-it para humanos. Conectada a un CodingAgent, se convierte en memoria de trabajo
compartida: tú y el agente pueden registrar lo importante durante el turno sin depender de una conversación que pronto
quedará enterrada.

![Una Specification, un CodingAgent y una Sticky Note comparten observaciones en el Canvas de Kavor](https://media.agentkavor.com/demos/spec-agent-notes/poster.463994b8b377.jpg)

[Mira el agente trabajando con la Specification y las notas →](https://agentkavor.com/es/videos/spec-agent-notes)

*Una nota compartida mantiene visibles las observaciones, decisiones abiertas y próximos pasos junto al grafo.*

## Qué hace una Sticky Note

Una Sticky Note es útil incluso sin un agente. Escribe una pregunta, hipótesis, recordatorio o lista breve de cosas
que quieres observar. Su valor crece cuando el contenido forma parte del mismo grafo de trabajo.

Con una Connection hacia un CodingAgent, el agente puede leer y actualizar la nota contigo. Úsala para mantener:

- un resumen de **hecho / haciendo / siguiente**;
- una decisión abierta mientras formas una Specification;
- un punto de atención que quieras revisar después;
- hallazgos descubiertos durante la implementación;
- findings de una revisión independiente;
- una checklist de handoff compartida por los participantes.

La nota es deliberadamente informal. Hace el trabajo transparente en ambas direcciones: tú ves lo que observó el
agente y el agente recibe una superficie explícita para conservar lo que debe seguir visible.

## Tres formas de usarla

### 1. Memoria de tu turno

Antes de empezar, escribe el objetivo y las preguntas que no pueden desaparecer. Durante el trabajo, añade hechos
breves, enlaces o decisiones provisionales. Al terminar, deja claros los siguientes pasos para cuando vuelvas al
Workspace.

Un formato sencillo funciona bien:

- **Estado:** hecho, haciendo, siguiente.
- **Atención:** qué necesita tu decisión o inspección.
- **Evidencia:** la comprobación, archivo u observación que respalda la nota.

### 2. Segunda mano del CodingAgent

Conecta la Sticky Note al agente y pídele que registre solo los hechos que ayudarán en tu próxima decisión:

> Mantén la Sticky Note como un resumen breve del turno. Registra cambios, evidencias, riesgos y preguntas que necesitan mi decisión. No conviertas hipótesis en decisiones finales.

El agente puede añadir bloques separados o reemplazar el contenido cuando pidas una reorganización completa. El
contenido sigue siendo editable por la persona y cada cambio debe respetar la última versión de la nota.

Si la nota ya contiene tus observaciones, delimita qué puede actualizar el agente. Una nota llena no es una invitación
a reorganizarla sin pedirlo. Una instrucción más concreta es:

> Mantén esta Sticky Note durante la investigación. Conserva mis notas y las del Reviewer. Añade solo tus hallazgos
> verificados y actualiza únicamente los elementos identificados con tu nombre. Pide permiso antes de reorganizar
> todo el cuerpo.

### 3. Puente entre implementación y revisión

Un Builder puede registrar qué cambió y qué comprobaciones ejecutó. Un Reviewer puede añadir findings y riesgos. Tú
puedes seguir ambos sin buscar la información en dos sesiones distintas.

La Connection entre CodingAgents no es una secuencia automática de workflow; hace alcanzables a los participantes y
permite intercambiar mensajes.

## Ejemplo: una nota que te ayuda a retomar el trabajo

Al investigar un fallo de login, no necesitas convertir cada observación en una decisión de arquitectura. Usa una
nota para conservar el hallazgo, la evidencia y la pregunta que sigue abierta:

```markdown
## Hecho
- Reproducido el fallo después de expirar la sesión.
- El login con una sesión nueva sigue funcionando.

## Haciendo
- Comparando la respuesta de sesión expirada con el tratamiento del cliente.

## Atención del humano
- Decidir si el cliente debe renovar la sesión o pedir un nuevo login.
- Hipótesis: el retry repite el request con la credencial antigua. Todavía no confirmado.

## Evidencia
- Terminal Checks: comando de reproducción y respuesta observada.
- File del cliente: punto donde empieza el retry.

## Siguiente
- Confirmar la hipótesis antes de editar el cliente.
```

Pide al agente:

> Añade hallazgos verificados y preguntas a la nota. Conserva mis observaciones. Cuando una hipótesis se confirme o
> se descarte, actualiza su estado con la evidencia. Si la decisión define el alcance de una corrección, llévala a la
> Specification correspondiente y deja aquí una referencia breve.

Para una revisión, un bloque separado puede registrar **escenario, comportamiento observado, evidencia y próximo
paso**. Así puedes distinguir lo que el Builder completó de lo que el Reviewer verificó.

Usa una actualización puntual o un bloque nuevo cuando solo haya un hallazgo. Pide una reorganización del cuerpo
cuando la nota acumule estados antiguos; conserva las decisiones abiertas y tus observaciones. El resultado debe
permitir retomar el turno sin releer todas las conversaciones.

## Compartir la nota no significa tomar posesión

Un camino de Connections permite leer la nota y realizar escrituras autorizadas. No pide a todos los agentes del
grafo que empiecen a reportar allí automáticamente.

Sin una petición tuya, el reporte automático se limita a una Sticky Note **conectada directamente a ese CodingAgent**
que estaba vacía cuando la encontró por primera vez. Usa una lista breve e identifica cada entrada con su nombre:

```markdown
- [x] Builder — done: reproduced the expired-session failure.
- [ ] Builder — doing: checking the client's retry handling.
- [ ] Builder — will: verify the fix against the Specification.
```

El agente actualiza solo sus entradas cuando cambia significativamente el trabajo. No debe completar, reescribir ni
eliminar elementos tuyos o de otro agente. Una nota con contenido requiere una petición explícita de mantenimiento;
otra ruta o la Connection de un colega no autoriza reportes proactivos.

Si limpias una nota en la que ya escribía, debe dejarla vacía hasta que pidas retomar el reporte. Compartir memoria no
debe quitarte el control sobre lo que permanece en el Canvas.

Son instrucciones de colaboración, no un bloqueo técnico de cualquier edición posible. Para impedir escrituras por
las operaciones de Kavor, usa `sticky_note_read_only` en la Connection directa.

## Markdown, edición y conflictos

Una Sticky Note acepta Markdown para títulos, listas, tareas, énfasis, código y otros elementos comunes de una nota
de trabajo. No acepta HTML crudo. Admite hasta 64.000 puntos de código Unicode y ofrece cuatro colores para agrupar
visualmente el contexto; el color no cambia la autoridad del contenido.

Kavor guarda los cambios automáticamente y avisa si otro participante modificó la nota antes de tu guardado. En vez de
descartar silenciosamente el cambio concurrente, la interfaz permite resolver el conflicto. Una escritura puede añadir
un bloque nuevo o reemplazar todo el cuerpo.

## Lo que no debe ser

No uses una Sticky Note como sustituto de todo:

- una decisión estable, con alcance y criterios de aceptación, pertenece a una [Specification](./specification.md);
- el código fuente y otros artefactos canónicos pertenecen a un [File](./file.md);
- los comandos y la evidencia de ejecución pertenecen al [Terminal](./terminal.md);
- un mensaje coordina participantes, pero no debe ser el único registro de una decisión importante.

La mejor nota es lo bastante breve para leerse y lo bastante rica para que el siguiente paso no dependa de la memoria
de una sola sesión.

## Guardrail y alcance

Una Sticky Note está disponible para un CodingAgent solo mediante un camino válido de [Connections](./connections.md).
La proximidad visual en el Canvas o mencionar el Node en un mensaje no concede acceso.

Puedes colocar el Guardrail sticky_note_read_only en la Connection directa entre el agente y la nota. El agente todavía
puede consultarla, pero no puede añadir ni reemplazar contenido mediante las operaciones de Kavor. El Guardrail limita
ese par directo; no crea una Connection ni convierte la nota en una política global del Workspace.

## Continúa

- [Entiende el modelo de Nodes](./nodes.md).
- [Elige el conjunto mínimo de Connections](./connections.md) para el trabajo.
- [Cierra tu primer loop](./first-loop.md) con Specification, CodingAgents, Terminal y Sticky Note.
