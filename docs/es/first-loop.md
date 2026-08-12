---
id: first-loop
title: Cómo cerrar tu primer loop en Kavor
description: Monta un loop pequeño con una Specification, Claude Code, Codex y una Sticky Note, desde la intención hasta la decisión humana.
kind: tutorial
lastReviewedAt: 2026-08-05
canonicalUrl: https://agentkavor.com/es/docs/first-loop
---

# Cómo cerrar tu primer loop en Kavor

El mejor primer Canvas no es el más completo. Es el más pequeño que convierte una intención clara en un cambio que
puedes revisar.

En este tutorial, Claude Code implementa una Specification, Codex revisa el resultado, ambos conservan evidencias en
una Sticky Note y tú decides cuándo ha terminado el trabajo.

[![Specification, Claude Code, Codex y Sticky Note conectados en el Canvas](https://media.agentkavor.com/demos/first-loop/canvas.24845dea72ff.jpg)](https://agentkavor.com/es/videos/small-loop)

[Mira el loop completo en 1 minuto y 29 segundos →](https://agentkavor.com/es/videos/small-loop)

## Antes de empezar

Necesitas:

- Kavor con un Workspace abierto;
- Claude Code y Codex instalados y autenticados;
- una tarea pequeña, con un resultado observable, dentro del directorio del Workspace.

Una buena primera tarea cabe en una frase y tiene dos o tres criterios objetivos. Por ejemplo: «Añadir validación al
formulario y mantener las pruebas existentes en verde». Evita empezar con una refactorización amplia.

## El loop que vas a montar

El trabajo seguirá esta secuencia:

`Specification → Claude Code → mensaje → Codex → decisión humana`

La Specification estará conectada a los dos CodingAgents. Claude Code y Codex también estarán conectados entre sí y a
la misma Sticky Note.

Las Connections no son flechas de flujo. Son relaciones entre Nodes; la secuencia anterior describe el trabajo de
este tutorial.

## ¿Prefieres montarlo con ayuda?

Tu CodingAgent favorito también puede consultar la documentación oficial de Kavor, sin configuración adicional, para
explicar el Canvas, responder preguntas y ayudarte a montar el loop. Cuando las Connections y los permisos actuales
lo permitan, el CodingAgent también puede crear Nodes y Connections contigo.

Puedes empezar con esta petición:

> Consulta la documentación oficial de Kavor y ayúdame a montar un primer loop para esta tarea. Primero, explica la
> estructura y las Connections necesarias. Después, si las Connections actuales lo permiten, crea la Specification,
> los CodingAgents y la Sticky Note, conéctalos y detente antes de comenzar la implementación para que pueda revisar
> el loop.

La documentación no amplía el acceso del CodingAgent, no crea Connections implícitas ni permite eludir Guardrails.
Si el servicio de documentación no está disponible, las demás herramientas locales de Kavor siguen funcionando.

## 1. Crea una Specification pequeña

1. Haz clic derecho en un área vacía del Canvas y elige `Add Spec…`.
2. Dale un nombre directo, como `Corregir validación del formulario`, y confirma.
3. Edita la Specification para registrar:
   - el problema actual;
   - el resultado esperado;
   - lo que queda fuera del alcance;
   - dos o tres criterios de aceptación verificables.
4. Cambia el estado de `Draft` a `Ready` cuando el contrato esté listo para implementarse.

Una Specification es Markdown duradero. Permanece en el Workspace cuando termina una sesión y permite que la
implementación, la revisión y la decisión humana partan del mismo contrato.

## 2. Añade los participantes y la memoria compartida

Haz clic derecho en el Canvas y añade:

- `Add Claude Code`;
- `Add Codex`;
- `Add Sticky Note`.

Renombra los CodingAgents si ayuda a aclarar sus funciones, por ejemplo `Implementer` y `Reviewer`. Dale a la Sticky
Note un título sencillo, como `Implementation and review notes`.

Crea estas cinco Connections:

1. Specification — Claude Code;
2. Specification — Codex;
3. Claude Code — Codex;
4. Claude Code — Sticky Note;
5. Codex — Sticky Note.

Arrastra el punto circular de un Node hasta el punto circular del otro. En la primera Connection de cada tipo, lee la
confirmación de Kavor antes de continuar. No añadas Guardrails en este primer loop; úsalos después, cuando tengas una
restricción concreta que aplicar.

## 3. Pide una entrega verificable

Envía esto a Claude Code:

> Lee la Specification conectada e implementa únicamente ese alcance. Antes de modificar el código, confirma los
> criterios de aceptación. Al terminar, ejecuta las verificaciones relevantes, registra los outputs duraderos en la
> Specification y añade a la Sticky Note un resumen de los archivos modificados, las pruebas ejecutadas y los riesgos
> restantes. Después envía un mensaje de Kavor a Codex, haciendo referencia a la Specification, y pide una revisión
> según los criterios de aceptación.

Una Connection hace accesibles el contexto y las capacidades autorizadas; no ejecuta la tarea por sí sola. Sigue el
trabajo en el CodingAgent y no trates «terminado» como evidencia suficiente.

## 4. Recibe la revisión

Cuando llegue el mensaje, Codex podrá usar la Specification y la Sticky Note conectadas directamente. Pídele que:

- compare la implementación con cada criterio de aceptación;
- ejecute las verificaciones relevantes;
- registre hallazgos concretos o declare que no encontró bloqueos;
- añada el resultado de la revisión a la Sticky Note;
- responda a Claude Code cuando haga falta una corrección.

Abre `Messages` en el Node para inspeccionar la entrega y las respuestas. Si hay hallazgos, deja que Claude Code los
corrija y solicita otra revisión. Ese retorno forma parte del mismo loop.

## 5. Cierra el loop con una decisión humana

Antes de marcar el trabajo como completado:

1. vuelve a leer los criterios de la Specification;
2. inspecciona los outputs y los cambios producidos;
3. confirma que la Sticky Note contiene los resúmenes de implementación y revisión;
4. resuelve los hallazgos bloqueantes;
5. cambia el estado de la Specification a `Done`.

El estado no sustituye tu decisión. Todavía puedes aceptar, pedir una corrección, reducir el alcance o descartar el
cambio. El loop queda cerrado cuando la intención, la ejecución, la revisión, la evidencia y la aceptación siguen
visibles en el Workspace.

## Resultado esperado

Al final:

- el Canvas muestra quién participó y qué contexto se compartió;
- la Specification conserva el contrato y los outputs duraderos;
- los mensajes entre CodingAgents siguen siendo inspeccionables;
- la Sticky Note reúne las observaciones de implementación y revisión;
- la decisión final sigue siendo tuya.

## Si algo no funciona

- **El CodingAgent no encuentra la Specification o la Sticky Note:** confirma la Connection directa entre los dos
  Nodes. Hacer referencia a un Node en un mensaje no concede acceso por sí solo.
- **El mensaje no llega:** confirma la Connection entre los CodingAgents y abre `Messages` para comprobar la entrega.
  Un proveedor ocupado puede recibir el mensaje más tarde.
- **Un Guardrail bloquea la acción:** abre la Connection y revisa la restricción; no pidas al CodingAgent que la evite.
- **Faltan evidencias:** pide al CodingAgent que registre archivos, commits u otros outputs duraderos en la
  Specification y complete la Sticky Note.

Continúa con [¿Qué es Kavor?](https://agentkavor.com/es/docs/what-is-kavor), consulta las
[notas de la versión](https://agentkavor.com/es/docs/release-notes) o comparte tu primer loop en la
[Kavor Community](https://github.com/digows/agentkavor-community/discussions).
