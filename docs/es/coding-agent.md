---
id: coding-agent
title: "CodingAgent en Kavor: tu harness favorito como parte de un grafo"
description: Elige un provider, conserva su experiencia nativa y conecta el CodingAgent con el contexto, las herramientas y los participantes adecuados.
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/es/docs/coding-agent
---

# CodingAgent en Kavor: tu harness favorito como parte de un grafo

Un CodingAgent es tu agente de programación ejecutado en la interfaz nativa de su provider, ahora como participante
visible del Canvas.

Kavor no sustituye cada harness por un chat genérico. Conserva la experiencia del provider y añade una estructura a
su alrededor: responsabilidad explícita, contexto alcanzable, herramientas, otros CodingAgents y límites que puedes
inspeccionar.

![Selector de provider en la toolbar de Kavor antes de añadir un CodingAgent al Canvas](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)

[Mira cómo seleccionar el provider de un CodingAgent →](https://agentkavor.com/es/videos/coding-agent-provider-selector)

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

## Cuentas, uso y rotación

Puedes consultar el uso de los providers en la barra superior y abrir el panel de **Accounts** para añadir cuentas,
elegir cuáles participan en cada Workspace y usar la selección **Automatic** o una cuenta fija. El inicio de sesión
nativo sigue disponible; configurar otras cuentas es opcional y no sustituye el login de las aplicaciones del provider.

La [guía de CodingAgent Accounts](./coding-agent-accounts.md) explica las ventanas de uso, la distribución entre
Workspaces, la copia inicial de preferencias, el cambio de cuenta con continuidad de sesión y los límites de cada provider.

## Qué puede hacer por sí solo

Sin ninguna Connection, un CodingAgent sigue siendo una sesión provider-native dentro del Workspace. Puedes
conversar, usar las herramientas del harness y elegir su directorio de trabajo. Ese directorio puede estar fuera de
la raíz del Workspace cuando el papel necesita otro repositorio o worktree; la asociación sigue explícita en la
sesión.

El Node ya ayuda a separar contextos: una sesión puede investigar mientras otra implementa. Sin un grafo, sin
embargo, el contexto compartido aún depende de lo que introduzcas en cada conversación.

La Connection convierte la sesión aislada en participante de un sistema de trabajo.

### Proporciona un archivo o captura en la entrada

En una sesión abierta puedes pegar archivos del portapapeles del sistema o imágenes PNG/JPEG. Kavor inserta una
referencia sin crear un File ni Connection en el Canvas. Comprueba la ruta y escribe tu petición antes de enviarla;
interpretar la imagen sigue dependiendo del harness.

La [guía de Terminal](./terminal.md#pega-archivos-e-imágenes-en-la-entrada-de-la-sesión) explica el procedimiento,
los límites y la diferencia entre una referencia pegada y un recurso mantenido en el grafo.

## Inicia, reinicia o detén la ejecución

El Node y el proceso del provider no son lo mismo. Puedes mantener el CodingAgent en el Canvas aunque su ejecución esté detenida.

- **Start** inicia una sesión detenida en el directorio seleccionado. Repetir Start en una sesión en ejecución no crea otro proceso.
- **Restart** cierra el proceso actual e inicia su sustituto, manteniendo la cuenta, la raíz de trabajo y la intención de reanudar la sesión nativa. No borra el historial ni deshace cambios en el proyecto.
- **Shutdown** termina la ejecución sin eliminar el Node ni el historial nativo. Usa Start para volver a ejecutarlo.

Kavor muestra las etapas de preparación e informa cuándo el provider está listo o cuándo falla el inicio. Una aprobación pendiente sigue siendo tuya: iniciar o reiniciar no autoriza al agente a responder por ti.

Si falla el inicio, lee el error antes de repetirlo. Corrige el directorio ausente, la instalación, la autenticación u otro requisito indicado y usa **Retry**. Un nuevo intento no es la sesión anterior ni confirma que se haya ejecutado la tarea.

## Separa el trabajo con Git worktrees

Una conversación nueva separa el contexto. Un Git worktree separa también el checkout, con su propio directorio, archivos e index. Dos CodingAgents pueden trabajar en branches distintas sin cambiar la branch del checkout compartido.

En el control **Git** del CodingAgent:

1. Elige la referencia de base y un nombre para el worktree.
2. Usa **Create** para crear el worktree gestionado en `.worktrees/` y asociarlo a ese CodingAgent.
3. O usa **Use** en un worktree existente para seleccionar su directorio.
4. Comprueba la raíz y la branch mostradas antes de solicitar cambios o commits.

**Workspace root → Use** devuelve el CodingAgent a la raíz del Workspace sin eliminar el worktree anterior. Crear o seleccionar un worktree para el agente no cambia la branch, el index ni los archivos del checkout compartido. El merge y la limpieza posteriores son decisiones separadas.

Al cambiar la asociación Git de un CodingAgent en ejecución, Kavor lo vuelve a iniciar en la raíz seleccionada, conservando la identidad nativa para reanudar cuando el provider lo permite. Una sesión detenida deliberadamente permanece detenida. Si falla la reanudación, el error queda visible para corregirlo y usar Retry; cambiar de raíz no demuestra que la sesión esté lista.

El worktree no es una copia completa del entorno local. Pueden faltar dependencias instaladas y archivos no versionados, como la configuración local. Prepara lo que exige el proyecto sin copiar credenciales automáticamente. Una ruta inexistente o un worktree inválido deben corregirse antes del inicio, no sustituirse silenciosamente por otro directorio.

Eliminar un worktree no es eliminar su Node. Kavor rechaza eliminar o finalizar un worktree que otro CodingAgent todavía referencia. Si su carpeta se eliminó fuera de Kavor, revisa el estado Git y recupera la asociación antes de continuar.

## Continúa por otro camino con Fork

**Fork** crea otro CodingAgent a partir del historial nativo de una sesión existente. El origen sigue siendo independiente; el Node nuevo recibe otra identidad de sesión y una Connection con quien solicitó el Fork.

Úsalo para explorar una alternativa sin empezar la conversación de nuevo, o separar una investigación desde un contexto ya construido. Después, define el objetivo y la condición de parada del nuevo CodingAgent.

El soporte depende del provider y la versión instalada. Claude Code, Codex, Grok y OpenCode tienen integración de Fork; Antigravity no ofrece esta capacidad en Kavor. Debe existir una sesión nativa que pueda bifurcarse. Si el historial no está disponible o el provider rechaza la operación, Kavor informa del fallo en lugar de presentar una conversación vacía como Fork.

Fork no crea una branch Git, prepara dependencias ni aísla archivos por sí solo. Por defecto, la sesión nueva usa la raíz del origen; selecciona un worktree separado y preparado cuando también necesites aislar código. Copiar y pegar un Node en el Canvas tampoco sustituye Fork: la copia no transporta el historial nativo de la sesión.

## Habla mediante Channels

También puedes hablar con este mismo CodingAgent mediante un Channel, empezando por WhatsApp. El agente permanece en el desktop con el contexto y los límites del Workspace; la conversación remota no sustituye el harness ni crea otro agente en la nube. Consulta [Agent Kavor y Channels](./agent-kavor.md) para configurar la conversación y elegir su destinatario.

Puedes pedir al CodingAgent que publique un resultado en una conversación habilitada de ese Workspace, aunque el
trabajo comenzara en el desktop. El envío elige un destino explícito; no es un mensaje a otro CodingAgent ni una
transmisión a todos los Channels. La respuesta a una solicitud humana mantiene la conversación original.
Consulta [cómo recibir avisos sin iniciar otra solicitud en WhatsApp](./agent-kavor.md#recibe-avisos-sin-iniciar-otra-solicitud-en-whatsapp).

La misma guía explica la preparación automática del audio recibido, la conservación del original y los límites
reales de imágenes y vídeos. Estos recursos no convierten todos los providers en lectores universales ni evitan
las aprobaciones del desktop.

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
| **CodingAgent + WebBrowser** | Permite observar y operar las páginas reales de ese WebBrowser en el mismo estado visible para la persona. |
| **CodingAgent + CodingAgent** | Une participantes en un mismo componente. Los CodingAgents alcanzables pueden intercambiar mensajes asíncronos y consultar el contexto necesario para coordinarse. |
| **Trigger + CodingAgent** | Selecciona esa sesión activa como objetivo directo de un prompt programado. Un Trigger no inicia una sesión que cerraste. |

El alcance no elimina los contratos directos. Si la Connection exacta entre un CodingAgent y un recurso tiene un
Guardrail, la restricción sigue rigiendo ese par aunque exista otra ruta en el grafo.

## Patrones útiles

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

### Trabajar con una página viva

Conecta un WebBrowser cuando la tarea dependa de una interfaz web real. Tú sigues viendo y usando las mismas pestañas;
el CodingAgent puede navegar, interactuar, esperar cambios y capturar evidencia sin reconstruir la página desde texto
copiado al chat.

El WebBrowser puede seguir activo cuando cambias de Workspace y volver en el mismo estado. Así el agente continúa un
trabajo ya autorizado sin recargar la página en cada cambio de contexto visual.

![CodingAgent y WebBrowser conectados en el Canvas](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

[Mira un CodingAgent trabajando con WebBrowser →](https://agentkavor.com/es/videos/web-browser-node)

### Consultar la sesión actual de otro CodingAgent

Un CodingAgent alcanzable puede recorrer de forma pasiva y paginada los turnos terminados de la sesión
provider-native actual de otro CodingAgent. La lectura recupera razonamiento, evidencia y contexto que todavía no se
convirtieron en mensaje u output duradero.

No envía entrada al provider, no activa la sesión consultada y no sustituye un mensaje cuando el otro agente debe
actuar, decidir o responder. Si la sesión cambia durante la paginación, la continuación anterior se rechaza; el
lector debe iniciar otra consulta para no mezclar historiales diferentes.

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

Pega el pedido en el Implementer con una Specification lista para implementar, los Files relevantes y un Terminal alcanzables. El Reviewer debe compartir el grafo para recibirlo.

```prompt
Implementa únicamente el alcance definido en la Specification alcanzable. Antes de modificar código, identifica
los Files y las verificaciones relevantes. Usa el Terminal para producir evidencias, registra el resultado como
output de la Specification y pide al Reviewer una evaluación independiente. Detente si una decisión necesaria
queda fuera del contrato.
```

**Resultado esperado:** Una entrega delimitada registra cambios y comprobaciones reales y solicita revisión. Si falta contexto o una decisión del contrato, el agente informa de la pendiente.

Para un Reviewer:

Úsalo con el Reviewer cuando el Implementer identifique la entrega y estabilice el commit o diff. Haz alcanzables la Specification y las evidencias.

```prompt
Compara la implementación y las evidencias con los criterios de la Specification. Busca comportamiento incorrecto,
escenarios ausentes, regresiones y riesgos operativos. Registra findings concretos antes de sugerir cambios y no
apruebes el trabajo solo porque los tests existentes pasaron.
```

**Resultado esperado:** La revisión informa findings verificables o criterios examinados sin bloqueos identificados. Los tests existentes no sustituyen la revisión.

## Ejemplo: un handoff que el Reviewer puede verificar

Imagina una corrección en el formulario de registro. La Specification exige que un correo electrónico inválido
muestre un mensaje, que el envío se bloquee y que un correo válido siga funcionando. Usa el grafo anterior y mantén
Builder y Reviewer en sesiones separadas.

Petición al Builder:

Úsalo con el Builder después de adaptar la Specification al formulario real. Mantén el Terminal y el Reviewer en el mismo grafo; publicar queda fuera del pedido.

```prompt
Implementa la validación definida en la Specification. Conserva el comportamiento del camino válido. Ejecuta los
tests relevantes en el Terminal y registra los archivos modificados, comandos y resultados. Después envía al
Reviewer el handle de la Specification y el commit o diff exacto para revisar. Informa de los pendientes y detente
antes de publicar.
```

**Resultado esperado:** El Builder identifica la entrega y referencia el contexto canónico de revisión, sin afirmar comprobaciones que no ejecutó.

Un handoff útil identifica la entrega en lugar de copiar toda la conversación:

> La implementación está en el commit indicado en los outputs de la Specification. Los tests de correo inválido,
> vacío y válido pasaron en el Terminal Checks. Revisa los criterios y los caminos de fallo en ese commit. Registra
> findings con archivo, escenario y evidencia; responde cuando termines. No cambies el código en esta revisión.

Petición al Reviewer:

Úsalo con el Reviewer cuando la entrega referenciada esté estable. Haz alcanzables la Specification y la Sticky Note y autoriza registrar la revisión en la nota.

```prompt
Lee el contrato y examina la entrega referenciada. Verifica cada criterio, reproduce los escenarios relevantes y
añade tus conclusiones a la Sticky Note. Distingue un defecto demostrado de una hipótesis. Si encuentras un bloqueo,
explica qué comportamiento falla y devuélvelo al Builder para corregirlo.
```

**Resultado esperado:** Los criterios reciben una evaluación basada en evidencias. Los findings vuelven al Builder; la falta de evidencia es una limitación, no una aprobación.

El resultado esperado es un cambio identificable, una revisión independiente y una decisión tuya basada en evidencia.
Si el Builder todavía está modificando la entrega, espera a que estabilice el resultado o delimita explícitamente qué
está listo para revisión. Dos agentes mirando revisiones diferentes del código no están evaluando la misma entrega.

## Límites importantes

- Un CodingAgent no recibe acceso por proximidad visual; debe existir un camino de Connections.
- Referenciar un Node en un mensaje no concede acceso.
- Leer pasivamente la sesión de otro CodingAgent no lo activa ni transfiere una decisión duradera a la Specification.
- Un Guardrail restringe el par directo al que pertenece; no es una política global del Workspace.
- Los mensajes coordinan el trabajo, pero no deben ser el único lugar de una decisión duradera.
- Los providers no ofrecen necesariamente los mismos modelos, permisos, eventos u operaciones de sesión.
- Un Trigger entrega un prompt a una sesión activa; no amplía permisos ni garantiza que un efecto externo suceda
  exactamente una vez.
- Con `Allow workspace editing`, un CodingAgent puede controlar sesiones y eliminar Nodes alcanzables dentro de la petición autorizada. No permite cambiar Guardrails ni eludir aprobaciones humanas. Consulta los [límites de edición del Canvas](./coding-agents-and-canvas.md#allow-workspace-editing).
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
