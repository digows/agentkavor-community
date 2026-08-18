---
id: specification
title: "Specification en Kavor: piensa con cuidado una vez, implementa mejor"
description: Estructura intención, decisiones y criterios en Markdown duradero, organiza varias roots y guía el lifecycle de la Specification.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/es/docs/specification
---

# Specification en Kavor: piensa con cuidado una vez, implementa mejor

Una Specification convierte la intención en un contrato duradero que humanos y CodingAgents pueden leer, discutir,
implementar y revisar sin depender de la memoria de una sola conversación.

Puede definir una arquitectura, integración, modelado de dominio, feature, módulo o conjunto delimitado de
correcciones. Su tamaño varía; su responsabilidad no: explicar qué debe ser cierto antes de considerar terminado el
trabajo.

![Workspace Settings de Kavor con cuatro roots de Specification configuradas.](https://media.agentkavor.com/releases/1.4.0/multiple-specification-roots/article.7d42383e3a37.jpg)

## La fuente de verdad es un archivo

El contenido de una Specification vive en Markdown dentro de tu Workspace. El archivo es tuyo: puedes abrirlo en
Kavor, editarlo con otras herramientas, versionarlo en Git y permitir que los CodingAgents lo lean directamente.

Kavor mantiene alrededor de esa fuente solo metadatos operativos, como identidad, estado y outputs. El frontmatter
conserva la identidad que permite seguir una Specification cuando su archivo se mueve o cambia de nombre.

No edites manualmente en el frontmatter los campos controlados por Kavor. Escribe el contrato en el cuerpo y deja que
las operaciones del producto actualicen identidad y lifecycle.

## Escríbela tú o con un CodingAgent

Puedes empezar manualmente o coescribir con un CodingAgent. Para un tema difícil, puede valer la pena usar una sesión
orientada a planificación y más capacidad de razonamiento antes de implementar.

Un buen punto de partida es:

> Entrevístame sobre el tema X para escribir la Specification Y. Separa hechos verificados, decisiones, premisas,
> non-goals, escenarios de fallo y criterios de aceptación observables. No trates el documento como Ready mientras
> haya decisiones pendientes que puedan cambiar la solución.

Pensar mejor aquí puede reducir retrabajo, contexto desperdiciado e implementación ambigua. No garantiza menor coste:
una Specification mala sigue siendo mala aunque sea larga o la escriba un modelo caro.

## Un contrato mínimo capaz de orientar el trabajo

Una Specification útil suele incluir:

- contexto y problema actual;
- objetivo y definición de éxito;
- non-goals que delimitan el alcance;
- decisiones y restricciones;
- enfoque previsto cuando ya está decidido;
- criterios de aceptación observables;
- escenarios de fallo y riesgos relevantes;
- preguntas abiertas;
- referencias a código, ADRs, issues u otras Specifications.

El documento no necesita un ritual fijo si el Workspace posee una convención mejor. Sí debe distinguir decisiones de
hipótesis y permitir que otra persona evalúe el resultado sin reconstruir la conversación original.

## El lifecycle orienta; no es decoración

Kavor utiliza cinco estados:

| Estado | Significado práctico |
| --- | --- |
| **Draft** | El problema todavía se investiga, discute o decide. |
| **Ready** | El contrato contiene información suficiente para iniciar la implementación con seguridad. |
| **In progress** | El trabajo autorizado por la Specification está en curso. |
| **Blocked** | Una condición concreta impide un progreso significativo. |
| **Done** | Se alcanzó el objetivo y no queda trabajo exigido por el contrato. |

El estado es deliberadamente advisory. Kavor no convierte checkboxes de Markdown en un sistema propietario ni
demuestra por sí solo que se cumplieron todos los criterios. Tratar el trabajo como Done sigue exigiendo evidencia y
juicio.

Una práctica sólida es separar autoría, implementación y revisión. El CodingAgent que ayudó a escribir puede aclarar
el contrato; otro implementa; un Reviewer independiente compara el resultado con sus criterios.

## Organiza más de una Specification root

Un Workspace puede guardar Specifications en más de una carpeta. Es útil cuando un proyecto ya separa decisiones de
producto, ingeniería, operaciones o módulos, o cuando una única root resulta difícil de navegar.

Abre Workspace Settings y usa **Specification roots** para añadir, eliminar o reordenar carpetas. Las roots son:

- relativas al directorio del Workspace;
- ordenadas;
- únicas y no superpuestas;
- limitadas a 32 por Workspace.

La primera root es **Primary** y recibe nuevas Specifications por defecto. Reordenar cambia ese destino; no mueve
archivos existentes. Eliminar una root tampoco borra sus archivos. Las Specifications fuera de las roots configuradas
dejan la lista activa y pueden volver al añadir de nuevo la root.

Con más de una root, el panel de Specifications agrupa primero por root y luego por las carpetas reales del
filesystem. El Canvas no crea una taxonomía paralela: la organización sigue siendo la estructura de archivos que ya
posees.

### Un diseño sencillo de roots

```text
docs/         decisiones y contratos generales del producto
specs/        features e integraciones en implementación
marketing/    campañas y experimentos editoriales
operations/   mantenimiento y cambios operativos
```

No crees roots solo para acortar una lista. Úsalas cuando cada carpeta represente una frontera duradera y comprensible
para humanos y agentes.

## Qué gana la Specification en el grafo

Una Specification acepta dos Connections directas:

- **Specification + CodingAgent** pone el contrato al alcance del agente y permite lifecycle y outputs. Puede incluir
  `specification_read_only`.
- **Specification + Terminal** exporta la ruta absoluta canónica del Markdown mediante una variable de entorno
  configurada en la Connection.

Otros CodingAgents del mismo componente también alcanzan la Specification por caminos válidos. No necesitas repetir
la Connection directa para cada participante, salvo que mejore la lectura de la topología o requiera un Guardrail
específico para ese par.

## Tres usos que justifican una Specification

### Fundación arquitectónica

Registra invariantes, dependencias permitidas, límites de seguridad, estrategia de migración y criterios verificables.
El documento orienta features posteriores sin que cada agente redescubra la base.

### Feature con implementación y revisión independientes

Un Spec Writer agota las decisiones y mueve el contrato a Ready. Un Implementer trabaja desde él. Un Reviewer
comprueba comportamiento, fallos y evidencias. Los outputs mantienen commits u otros resultados ligados al trabajo.

### Serie delimitada de correcciones

Cuando varios defectos comparten causa o superficie, una Specification puede definir el comportamiento esperado, el
conjunto exacto de correcciones y los tests de regresión. Si se convierte en una lista infinita de bugs sin frontera
común, ha perdido su papel de contrato.

## Un grafo práctico

```text
Spec Writer — Specification — Implementer — Reviewer
                        │
                     Terminal
```

El Spec Writer registra decisiones. El Implementer ejecuta únicamente el contrato Ready. El Reviewer compara
resultado y criterios. El Terminal aporta evidencias. La decisión de tratar el trabajo como Done sigue siendo humana.

## Qué evitar

- Salir de Draft porque el texto parece largo sin resolver decisiones que cambian la solución.
- Concentrar análisis, Specification, implementación y revisión en una sesión por comodidad.
- Escribir criterios como «funciona correctamente» o «tiene buen rendimiento» sin un resultado observable.
- Editar el frontmatter controlado por Kavor como contenido común.
- Tratar el estado como prueba automática de calidad o conclusión.
- Crear roots superpuestas o varias roots sin una frontera editorial duradera.
- Guardar la única decisión relevante en una conversación o mensaje que el próximo participante no encontrará.

## Antes de mover a Ready

Confirma:

- ¿están claros el problema, objetivo y non-goals?
- ¿están separados hechos, decisiones e hipótesis?
- ¿se trataron los escenarios de fallo relevantes?
- ¿pueden verificarse los criterios de aceptación?
- ¿sabrá el Implementer qué puede y qué no puede modificar?
- ¿podrá el Reviewer evaluar el resultado sin heredar el razonamiento del autor?
- ¿se respondieron las preguntas que podrían cambiar la solución?

Una buena Specification no intenta predecir cada línea de código. Elimina suficiente ambigüedad para que ejecución y
revisión sean independientes, verificables y recuperables.

Continúa en [Cómo cerrar tu primer loop](./first-loop.md), elige participantes en
[CodingAgents y papeles](./agents-and-roles.md) o revisa la [matriz de Connections](./connections.md).
