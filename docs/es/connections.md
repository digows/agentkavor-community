---
id: connections
title: Matriz de Connections soportadas en Kavor
description: Consulta los pares de Nodes que pueden conectarse, su función estructural, parámetros, Guardrails y límites.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/es/docs/connections
---

# Matriz de Connections soportadas en Kavor

Una Connection no es una flecha de workflow. Es una relación explícita y sin dirección que sitúa dos Nodes en el
mismo componente alcanzable del Canvas.

Para un CodingAgent importa el grafo entero: puede trabajar con cualquier Node alcanzable por un camino de
Connections válidas, aunque el recurso no esté conectado directamente a él. La Connection directa sigue siendo
importante cuando selecciona el objetivo de un Schedule, lleva parámetros o mantiene un Guardrail específico entre
un CodingAgent y un recurso.

Esta página es la referencia pública de los pares que Kavor permite conectar directamente y del contrato especial
de cada par.

## Cuatro reglas para leer el grafo

1. **Las Connections no tienen dirección persistida.** El orden de los endpoints no expresa flujo, control ni precedencia.
2. **El alcance es transitivo.** Si existe un camino válido entre un CodingAgent y otro Node, ambos pertenecen al
   mismo grafo de contexto y capacidades.
3. **Algunas reglas siguen siendo directas.** Un Guardrail pertenece a la Connection exacta que lo lleva; los
   parámetros de Terminal pertenecen a su par; un Trigger selecciona su único objetivo mediante la Connection directa.
4. **Un par no soportado significa «sin Connection directa».** Dos Nodes aún pueden participar en el mismo
   componente mediante otros pares soportados.

Un mensaje sigue teniendo remitente y destinatario. Un Schedule sigue entregando a un objetivo. Esas direcciones
pertenecen a la operación realizada, no a la Connection dibujada en el Canvas.

## Combinaciones soportadas

| Par de Nodes | Función de la Connection directa | Parámetros | Guardrail disponible | Ejemplo principal |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Sitúa la intención duradera en el grafo y ofrece el punto directo para restringir a ese agente. | Ninguno | `specification_read_only` | Spec Writer, Builder y Reviewer trabajando con el mismo contrato alcanzable. |
| **CodingAgent + Sticky Note** | Sitúa la memoria informal en el grafo y ofrece el punto directo para restringir a ese agente. | Ninguno | `sticky_note_read_only` | Decisiones abiertas, progreso, findings y handoffs visibles. |
| **CodingAgent + Terminal** | Pone el shell al alcance del grafo y ofrece el punto directo para restringir a ese agente. | Ninguno | `terminal_read_only` | Diagnóstico, tests, logs o asistencia en una sesión SSH supervisada. |
| **CodingAgent + File** | Sitúa una fuente canónica del filesystem en el grafo y ofrece el punto directo para restringir a ese agente. | Ninguno | `file_read_only` | Delimitar un módulo, PDF, imagen, informe o configuración. |
| **CodingAgent + Diagram** | Pone la fuente y el resultado de renderización del diagrama al alcance del grafo. | Ninguno | `diagram_read_only` | Producir una propuesta visual y comprobar los errores de la fuente actual. |
| **CodingAgent + WebBrowser** | Dar al agente acceso mediado a las páginas vivas de ese WebBrowser. | Ninguno | Ninguno | Persona y agente navegando, completando, verificando y capturando evidencia en el mismo estado visible. |
| **CodingAgent + CodingAgent** | Une participantes en un componente. Cualquier CodingAgent alcanzable puede intercambiar mensajes con otro. | Modo predeterminado de entrega | Bloquear After turn, Native input o Send now | Un Builder solicitando revisión a un Reviewer. |
| **Specification + Terminal** | Exportar a la sesión del Terminal la ruta absoluta canónica de la Specification. | Nombre obligatorio de variable de entorno | Ninguno | Validar, inspeccionar o comparar el Markdown de una Specification. |
| **File + Terminal** | Exportar a la sesión del Terminal la ruta absoluta canónica del File. | Nombre obligatorio de variable de entorno | Ninguno | Ejecutar un script o usar un archivo SQL sin copiar su ruta entre ventanas. |
| **Diagram + Terminal** | Exporta a la sesión la ruta absoluta canónica de la fuente del Diagram. | Nombre obligatorio de variable de entorno | Ninguno | Usar la fuente de un diagrama como entrada de una herramienta del proyecto. |
| **Trigger + CodingAgent** | Selecciona un CodingAgent con sesión activa como objetivo del prompt de Schedule. | Ninguno | Ninguno | Despertar a un Maintainer para analizar fallos, escribir un informe y pedir revisión. |
| **Trigger + Terminal** | Selecciona una sesión activa de Terminal como objetivo del comando de Schedule. | Ninguno | Ninguno | Ejecutar tests, una verificación de base de datos o un script de mantenimiento. |

Las Connections entre CodingAgent y recurso no son la única forma de alcanzar el recurso. Son la forma más explícita
de situarlo en el grafo de ese agente y la única superficie donde puede existir un Guardrail específico para ese par.

CodingAgent + WebBrowser posee un contrato propio: la Connection permite navegar, interactuar, esperar y capturar
las páginas reales de ese Node mediante operaciones controladas. No hereda un Guardrail genérico ni evita
autenticación, permisos del sitio o decisiones humanas. El perfil dedicado acepta certificados de desarrollo no
válidos; es un comportamiento explícito del navegador, no un permiso creado por la Connection.

## Los Guardrails restringen un par directo

El grafo está abierto por defecto para los Nodes alcanzables. Un Guardrail registra una restricción elegida por el
usuario en la Connection directa entre un CodingAgent y un recurso:

| Guardrail | Connection | Efecto |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Mantiene la lectura y prohíbe cambios de lifecycle y outputs mediante Kavor. La edición directa del Markdown se convierte en un contrato explícito de solo lectura. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Mantiene la lectura y bloquea append o replace del contenido. |
| `terminal_read_only` | CodingAgent + Terminal | Mantiene la inspección del Terminal y bloquea operaciones que alterarían la sesión, el proceso o su entrada. |
| `file_read_only` | CodingAgent + File | Declara que el agente no debe modificar la fuente canónica. |
| `diagram_read_only` | CodingAgent + Diagram | Conserva la lectura y la consulta del resultado; prohíbe escribir en la fuente y bloquea renombrar o eliminar el Node. |
| `coding_agent_message_after_turn_blocked` | CodingAgent + CodingAgent | Bloquea la entrega After turn entre el par. |
| `coding_agent_message_native_blocked` | CodingAgent + CodingAgent | Bloquea la entrega Native input entre el par. |
| `coding_agent_message_immediate_blocked` | CodingAgent + CodingAgent | Bloquea Send now y steering entre el par. |

Una ruta alternativa por el grafo no elimina un Guardrail que siga existiendo en la Connection directa entre el
agente y el recurso. A su vez, una restricción en la Connection de otro agente no se convierte en una política
global de ese Node.

Las operaciones mediadas por Kavor se rechazan antes de producir efectos cuando un Guardrail las bloquea. Los Files, Diagrams y
el cuerpo de las Specifications también pueden ser accesibles mediante las herramientas de filesystem del harness;
allí el Guardrail es un contrato visible y monitorizado, no una sandbox del sistema operativo.

Un Guardrail no crea una Connection, no amplía permisos ni se aplica a un Node solo por estar cerca en el Canvas.

## Entrega entre CodingAgents

La Connection directa elige el modo predeterminado para mensajes que no especifican otro. Sin configuración, es **Native input**. Los agentes pueden solicitar otro modo por mensaje cuando los Guardrails lo permiten.

- **After turn:** espera a que el destinatario termine su turno y esté disponible.
- **Native input:** utiliza la entrada normal del provider, que puede incorporar, encolar, orientar o interrumpir según sus capacidades y ajustes. No promete entrega sin interrupciones.
- **Send now:** solicita entrada inmediata con posible interrupción. Requiere soporte del provider y no deshace cambios, comandos ni efectos ya producidos.

![Connection entre CodingAgents con After turn, Native input, Send now y Guardrails de entrega](https://media.agentkavor.com/releases/2.0.0/agent-communication/delivery/master.cda7ab810311.png)

Un Guardrail directo sigue vigente aunque exista otra ruta en el grafo. Ningún modo evita borradores, aprobaciones ni entregas retenidas por el humano. Aceptación y entrega no equivalen a finalización.

## Connections con variables de entorno

Tres pares suministran rutas mediante variables de entorno:

- **File + Terminal**;
- **Diagram + Terminal**;
- **Specification + Terminal**.

En los tres casos eliges el nombre de una variable de entorno. El valor entregado al Terminal es la ruta absoluta
canónica de la fuente, nunca el contenido del archivo.

Por ejemplo, un File conectado como `CHECK_SQL` puede usarse en el shell así:

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor aplica el valor al iniciar la sesión del Terminal. Si la Connection o su parámetro cambia mientras el shell está
abierto, la interfaz indica que la variable espera el reinicio de la sesión. `TERM` y `COLORTERM` son nombres reservados
y no pueden usarse en estos parámetros.

## El límite especial de un Schedule

Schedule es la fuente de Trigger disponible en el producto. Cada Trigger tiene como máximo un objetivo directo:
un CodingAgent o un Terminal. La Connection selecciona ese objetivo; su id no se duplica en la configuración.

Un CodingAgent despertado por Schedule puede trabajar con todos los Nodes de su componente alcanzable, bajo los
mismos límites y Guardrails que ya tenía. Schedule añade el momento y el payload, no nuevos permisos.

Para que la entrega ocurra, Kavor debe estar en ejecución, la máquina despierta y la sesión del objetivo abierta. Al
iniciar, Kavor restaura las sesiones marcadas para permanecer abiertas cuando son objetivo de Triggers en ejecución,
incluso en otros Workspaces del usuario. Schedule no inicia una sesión cerrada deliberadamente, no distribuye un
disparo a varios objetivos ni promete efectos externos exactamente una vez. Eliminar su Connection de objetivo
pausa el Trigger y registra el motivo.

Lee [Schedule: dale un reloj a tu grafo](./schedule.md) para configurar recurrencia, usar `Run now` e interpretar el
historial duradero.

## Combinaciones que no existen directamente

Kavor rechaza cualquier par ausente de la matriz. Esto incluye, entre otros:

- Trigger + Specification;
- Trigger + File;
- Trigger + Sticky Note;
- Specification + File;
- Specification + Sticky Note;
- File + Sticky Note;
- File + File;
- Sticky Note + Terminal;
- Sticky Note + Sticky Note;
- WebBrowser + Specification;
- WebBrowser + Sticky Note;
- WebBrowser + Terminal;
- WebBrowser + File;
- WebBrowser + Trigger;
- WebBrowser + WebBrowser;
- Terminal + Terminal.

Un Node tampoco puede conectarse consigo mismo. Invertir los mismos endpoints no crea otra Connection, pues la relación
persistida no tiene dirección.

Estos límites no impiden composiciones útiles. Una Specification y una Sticky Note, por ejemplo, pueden participar
en el mismo grafo cuando ambas están conectadas a CodingAgents mediante pares soportados. Lo que no existe es una
Connection directa entre ellas.

La proximidad en el Canvas, una mención en un mensaje o la pertenencia al mismo Workspace no sustituyen un camino
de Connections.

## Elige la estructura mínima que resuelva el trabajo

Antes de crear una Connection, pregunta qué falta en el componente:

- intención duradera: añade una Specification;
- memoria de trabajo entre persona y agente: añade una Sticky Note;
- ejecución o evidencia: añade un Terminal;
- una fuente canónica explícita: añade un File;
- una explicación visual editable como fuente: añade un [Diagram](./diagrams.md);
- una página viva para persona y agente: añade un WebBrowser;
- otra perspectiva: añade un CodingAgent;
- tiempo como causa legítima de actividad: añade un Schedule al final.

No conectes por reflejo cada CodingAgent directamente a cada recurso. Crea la topología mínima que mantenga todo
alcanzable y añade una Connection directa cuando mejore la lectura del Canvas, lleve un parámetro o necesite un
Guardrail propio.

## Copia un prompt para revisar las Connections

Úsalo en un CodingAgent del componente a revisar e indica su tarea. No autoriza conectarse a Nodes preexistentes externos ni cambiar Guardrails.

```prompt
Consulta la documentación oficial de Connections y examina mi componente alcanzable.
Explica qué recursos ya permite alcanzar la topología y qué pares tienen parámetros o Guardrails directos.
Para la tarea que describí, señala Connections redundantes o ausentes solo si hay una razón concreta.
No modifiques el Canvas. Presenta la propuesta y el efecto de cada cambio antes de que decida.
```

**Resultado esperado:** Una revisión que distingue alcance transitivo de contratos directos. Una sugerencia no concede acceso, no elimina un Guardrail ni convierte Connections en flechas de ejecución.

## Continúa

- Lee la [guía central de Nodes](./nodes.md) para entender la responsabilidad de cada participante.
- Profundiza con las guías de [CodingAgent](./coding-agent.md), [Specification](./specification.md) y
  [Terminal](./terminal.md), además de [Sticky Note](./sticky-note.md), [File](./file.md) y
  [WebBrowser](./web-browser.md) y [Diagramas](./diagrams.md).
- [Cierra tu primer loop](./first-loop.md) con intención, implementación, revisión y decisión humana.
- Aprende [cómo ven y construyen el Canvas los CodingAgents](./coding-agents-and-canvas.md).
