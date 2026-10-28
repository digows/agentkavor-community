---
id: coding-agents-and-canvas
title: Cómo CodingAgents ven y construyen el Canvas
description: Comprende el contexto alcanzable, los mensajes entre agentes y la edición atómica del Canvas dentro de límites que tú controlas.
kind: guide
lastReviewedAt: 2026-10-28
canonicalUrl: https://agentkavor.com/es/docs/coding-agents-and-canvas
---

# Cómo CodingAgents ven y construyen el Canvas

El Canvas no es solo una imagen para ti. Para un CodingAgent es contexto vivo, mapa de capacidades y, cuando lo
permites, una superficie que el propio agente puede organizar.

Son dos capacidades distintas:

1. **comprender el grafo alcanzable** para trabajar con Nodes, recursos y otros CodingAgents;
2. **editar la estructura del Canvas** mediante cambios inmediatos y atómicos.

Ver la posición de un Node no implica leer su contenido, y trabajar con un recurso no implica poder eliminar
cualquier elemento del Workspace.

## El grafo es contexto compartido

En cada interacción, Kavor entrega al CodingAgent contexto compacto para la solicitud actual: identidad, estado
necesario del componente alcanzable, Guardrails activos y referencias para consultar el resto bajo demanda. Si la
estructura cambia durante el trabajo, Kavor informa que debe volver a leerse.

El agente puede operar cualquier Node unido por un camino de Connections válidas, a cualquier distancia:

```text
Specification — Builder — Reviewer — Sticky Note
```

Builder alcanza la Sticky Note a través de Reviewer; Reviewer alcanza la Specification a través de Builder. Ambos
pueden intercambiar mensajes sin que cada recurso necesite una Connection directa con cada agente.

Esto mantiene legible el Canvas. La topología sigue siendo explícita: eliminar una Connection puede dividir el
componente y cambiar lo alcanzable en la próxima interacción.

## Qué llega completo y qué se consulta bajo demanda

Kavor prioriza contexto útil, no un volcado permanente del Workspace.

- información textual pequeña puede llegar con el estado del grafo;
- Specifications informan lifecycle, ruta y outputs recientes; el Markdown canónico sigue en el Workspace;
- Terminals informan estado y comando en foreground; el output se consulta cuando hace falta;
- Files informan su fuente canónica; el contenido sigue en el filesystem;
- CodingAgents informan estado y hechos de trabajo; los mensajes y turnos terminados de sesiones provider-native se
  consultan cuando son útiles.

El contenido grande o vivo no se copia continuamente a la ventana de contexto. El agente recibe una referencia clara
para consultarlo, preservando espacio de razonamiento y las fuentes reales.

La lectura de la sesión de otro CodingAgent es pasiva y paginada. No envía entrada al provider ni despierta al peer.
Cuando el otro agente deba recibir contexto, actuar o responder, usa un mensaje.

## Los mensajes también siguen el grafo

Cualquier CodingAgent alcanzable puede enviar mensajes a otro del componente; no necesitan una Connection directa.
Los mensajes son persistentes e inspeccionables en `Messages`. Úsalos para entregar una implementación al Reviewer,
pedir aclaraciones, dividir investigaciones o devolver hallazgos y pedir otra verificación.

Una decisión duradera no debe existir solo en un mensaje. Conserva contratos en la Specification, memoria de trabajo
en una Sticky Note y resultados en outputs apropiados.

### Elige la entrega según el efecto deseado

- Para una revisión que puede esperar, usa **After turn**: la solicitud espera a que el destinatario esté disponible.
- Para coordinación normal, usa **Native input**: el provider decide cómo incorporar la entrada. No garantiza ausencia de interrupciones.
- Para un cambio explícito de dirección, **Send now** puede interrumpir si el provider y los Guardrails lo permiten. Indica qué instrucción se sustituye, qué debe detenerse y cuál es la siguiente acción. Interrumpir no deshace efectos.

Una solicitud aceptada o en cola no demuestra que el otro agente la haya leído o ejecutado. Los borradores y aprobaciones humanos siguen protegidos; no evites una entrega retenida por otra ruta.

La Connection directa define modo predeterminado y restricciones. Consulta la [referencia de Connections](./connections.md); enviar mensajes no equivale a leer pasivamente el historial.

## Los Guardrails siguen ligados al par directo

Reachability define acceso; Guardrail define restricción. Si la Connection directa CodingAgent + Specification lleva
`specification_read_only`, sigue limitando ese par aunque exista otra ruta. La restricción de otro CodingAgent no se
convierte en política global del recurso.

Proximidad visual, labels o referencias en mensajes no conceden acceso: debe existir un camino real de Connections.

## El agente también ve el layout, con menos autoridad

Un CodingAgent puede consultar labels, tipos y geometría de todos los Nodes para organizar el Workspace. Esa vista no
incluye configuración, contenido ni Connections fuera de su grafo.

Puede alinear o mover un Node externo sin acceder a su contenido. El layout es Workspace-wide; el contexto y los
cambios estructurales no.

## Allow workspace editing

Cada CodingAgent tiene `Allow workspace editing` en la configuración avanzada. Controla cambios estructurales
iniciados por el agente y actúa inmediatamente.

Cuando está activado, dentro de su alcance puede:

- crear Nodes activos: CodingAgent, Specification, Sticky Note, Terminal, File, WebBrowser y Schedule;
- eliminar Nodes alcanzables, deteniendo su ejecución cuando sea necesario;
- crear una Specification canónica y materializarla en el Canvas;
- añadir Connections soportadas y cambiar parámetros de Connections con Terminal;
- quitar Connections;
- renombrar Nodes alcanzables y Specifications;
- configurar un Schedule alcanzable;
- mover, redimensionar y revelar Nodes.

Desactivado, los cambios estructurales son rechazados y el agente debe informarlo sin insistir. El layout permanece
disponible porque mover un Node no amplía autoridad ni cambia contenido.

Esta opción también es necesaria cuando un CodingAgent inicia, reinicia, detiene o hace Fork de otro CodingAgent alcanzable. Estas acciones siguen la petición autorizada; no aprueban mensajes retenidos ni responden diálogos humanos.

Eliminar un Node quita su presencia y sus Connections del Canvas; no borra el File o la Specification canónica ni elimina un Git worktree. Si falla el cierre necesario, Kavor informa de un fallo recuperable en vez de afirmar que la eliminación terminó normalmente.

## Delega a una sesión realmente lista

Crear un CodingAgent, disponer de su directorio y entregar un mensaje son pasos distintos. Un Node creado o un mensaje en cola no prueban que el provider haya arrancado ni que la tarea se haya ejecutado.

Para delegar trabajo en un worktree:

1. Prepara el worktree con Git y comprueba los requisitos del proyecto.
2. Crea el CodingAgent asociado a esa raíz y conéctalo al contexto necesario.
3. Comprueba el inicio y la disponibilidad antes de anunciar un handoff completado.
4. Envía una tarea con resultado esperado y condición de parada.
5. Inspecciona la entrega y la respuesta en **Messages**.

Si hay un fallo, el agente coordinador debe consultar el estado del destinatario e informar de la etapa y el error disponibles. Corrige la causa antes de Start o Retry. No crees otro Node solo para ocultar un intento fallido ni reenvíes una tarea porque todavía no haya llegado la respuesta.

Start y Restart esperan a que la interfaz nativa esté lista. Eso no significa aprobación de una acción, éxito de la tarea ni permiso para publicar. Fork necesita soporte e historial reales del provider. Consulta los [controles de sesión, worktrees y Fork](./coding-agent.md).

## La estructura sigue el grafo, no todo el Workspace

Un CodingAgent puede cambiar estructuralmente Nodes y Connections de su componente alcanzable, además de Nodes que
creó antes dentro del mismo cambio atómico. Puede crear un Node y conectarlo inmediatamente sin dejar residuos, o
crear recursos y conectarse a ellos en el mismo lote.

El primer vínculo con un Node preexistente fuera del grafo sigue siendo tuyo. La visibilidad del layout no permite al
agente anexarse a un recurso que nunca hiciste alcanzable.

Una Connection directa CodingAgent + WebBrowser da acceso mediado a las páginas vivas de ese navegador. La página
puede seguir activa mientras cambias de Workspace y volver en el mismo estado; alcance del grafo, autenticación y
límites humanos siguen vigentes.

## Los cambios son atómicos

Kavor valida el conjunto completo y aplica los cambios en orden como una unidad. Si un paso falla, ningún cambio
estructural anterior del lote permanece.

Crear un Terminal y conectarlo produce ambos o ninguno; no queda un Node huérfano. El resultado devuelve la forma
realmente persistida y el agente debe leerla, no asumir defaults, geometría o rutas.

La atomicidad estructural no promete deshacer comandos externos ni reabrir procesos ya detenidos. Comprueba los errores de ejecución y recuperación antes de continuar.

## Lo que sigue siendo humano

`Allow workspace editing` no concede control irrestricto. Un CodingAgent no puede:

- crear, quitar o relajar Guardrails;
- reconfigurar arbitrariamente otros tipos de Node;
- cambiar el control humano que retiene mensajes para aprobación;
- usar una referencia o posición para ampliar su propio grafo.

Puede quitar una Connection alcanzable, así que sé explícito si eso puede retirar contexto o interrumpir a otro
CodingAgent. Kavor orienta a tocar Connections de peers solo cuando lo pediste o es necesario para trabajo delegado.

## Docs MCP ayuda al agente a enseñar Kavor

Los CodingAgents pueden consultar la documentación oficial mediante el Docs MCP local. Puedes pedir ayuda sin
memorizar nombres de Nodes, combinaciones soportadas o detalles de Schedule.

La documentación orienta; no concede autoridad. Docs MCP no crea Connections, desactiva Guardrails ni convierte una
sugerencia en un cambio del Canvas.

## Tres prompts para colaborar

### Explica antes de tocar

> Consulta la documentación oficial de Kavor y el grafo actual. Explica la menor estructura que resuelve esta tarea,
> qué Nodes serán alcanzables y qué límites permanecen. No cambies todavía el Canvas.

### Construye un loop revisable

> Construye un loop pequeño con una Specification, un Builder, un Reviewer y una Sticky Note. Usa el menor número de
> Connections, crea y conecta los Nodes en un cambio atómico y detente antes de implementar para que revise el Canvas.

### Organiza sin ampliar acceso

> Organiza visualmente el Canvas para que intención, implementación, revisión y evidencia sean legibles. No crees ni
> quites Connections, no cambies Guardrails y no asumas acceso a Nodes fuera de tu grafo.

## Checklist antes de autorizar una edición

- ¿el agente explicó el resultado estructural esperado?
- ¿cada Node nuevo tiene una función concreta?
- ¿cada Node creado se conectará en el mismo lote o es solo para lectura humana?
- ¿el cambio permanece en el componente alcanzable?
- ¿quitar una Connection puede dividir el grafo o interrumpir otro agente?
- ¿hace falta un Guardrail directo antes de entregar el recurso?
- ¿está claro dónde debe detenerse para tu revisión?

Usa el CodingAgent como colaborador del Canvas, no como dueño invisible. El valor está en inspeccionar la estructura
recibida, la que cambió y los límites que siguieron bajo tu control.

## Continúa

- [Cierra tu primer loop](./first-loop.md) con una topología mínima.
- Consulta la [matriz de Connections](./connections.md).
- Aprende [cómo elegir CodingAgents y roles](./agents-and-roles.md).
- Configura [Schedule](./schedule.md) sin ampliar permisos.
