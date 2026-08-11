---
id: coding-agents-and-canvas
title: Cómo CodingAgents ven y construyen el Canvas
description: Comprende el contexto alcanzable, los mensajes entre agentes y la edición atómica del Canvas dentro de límites que tú controlas.
kind: guide
lastReviewedAt: 2026-08-11
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

En cada interacción, Kavor entrega al CodingAgent el estado actual de su componente alcanzable: Nodes, Connections,
Guardrails y los hechos necesarios para comprender el trabajo.

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
- CodingAgents informan estado y hechos de trabajo; los mensajes anteriores se consultan cuando son útiles.

El contenido grande o vivo no se copia continuamente a la ventana de contexto. El agente recibe una referencia clara
para consultarlo, preservando espacio de razonamiento y las fuentes reales.

## Los mensajes también siguen el grafo

Cualquier CodingAgent alcanzable puede enviar mensajes a otro del componente; no necesitan una Connection directa.
Los mensajes son persistentes e inspeccionables en `Messages`. Úsalos para entregar una implementación al Reviewer,
pedir aclaraciones, dividir investigaciones o devolver hallazgos y pedir otra verificación.

Una decisión duradera no debe existir solo en un mensaje. Conserva contratos en la Specification, memoria de trabajo
en una Sticky Note y resultados en outputs apropiados.

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

- crear Nodes activos: CodingAgent, Specification, Sticky Note, Terminal, File y Schedule;
- crear una Specification canónica y materializarla en el Canvas;
- añadir Connections soportadas y cambiar parámetros de Connections con Terminal;
- quitar Connections;
- renombrar Nodes alcanzables y Specifications;
- configurar un Schedule alcanzable;
- mover, redimensionar y revelar Nodes.

Desactivado, los cambios estructurales son rechazados y el agente debe informarlo sin insistir. El layout permanece
disponible porque mover un Node no amplía autoridad ni cambia contenido.

## La estructura sigue el grafo, no todo el Workspace

Un CodingAgent puede cambiar estructuralmente Nodes y Connections de su componente alcanzable, además de Nodes que
creó antes dentro del mismo cambio atómico. Puede crear un Node y conectarlo inmediatamente sin dejar residuos, o
crear recursos y conectarse a ellos en el mismo lote.

El primer vínculo con un Node preexistente fuera del grafo sigue siendo tuyo. La visibilidad del layout no permite al
agente anexarse a un recurso que nunca hiciste alcanzable.

## Los cambios son atómicos

Kavor valida el conjunto completo y aplica los cambios en orden como una unidad. Si un paso falla, ningún cambio
estructural anterior del lote permanece.

Crear un Terminal y conectarlo produce ambos o ninguno; no queda un Node huérfano. El resultado devuelve la forma
realmente persistida y el agente debe leerla, no asumir defaults, geometría o rutas.

## Lo que sigue siendo humano

`Allow workspace editing` no concede control irrestricto. Un CodingAgent no puede:

- eliminar Nodes;
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
