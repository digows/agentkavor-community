---
id: sticky-note
title: "Sticky Note: memoria de trabajo compartida"
description: Usa una Sticky Note para registrar estado, hallazgos y puntos de atención con tus CodingAgents sin convertir cada nota de trabajo en una Specification.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/es/docs/sticky-note
---

# Una Sticky Note es pequeña, pero mantiene visible el trabajo

Una Sticky Note empieza como un post-it para humanos. Conectada a un CodingAgent, se convierte en memoria de trabajo
compartida: tú y el agente pueden registrar lo importante durante el turno sin depender de una conversación que pronto
quedará enterrada.

[![CodingAgents y una Sticky Note conectados en el Canvas de Kavor](https://agentkavor.com/kavor-connections-demo-poster.jpg)](https://agentkavor.com/es/videos/connections)

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

### 3. Puente entre implementación y revisión

Un Builder puede registrar qué cambió y qué comprobaciones ejecutó. Un Reviewer puede añadir findings y riesgos. Tú
puedes seguir ambos sin buscar la información en dos sesiones distintas.

La Connection entre CodingAgents no es una secuencia automática de workflow; hace alcanzables a los participantes y
permite intercambiar mensajes.

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
