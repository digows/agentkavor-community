---
id: connections
title: Matriz de Connections soportadas en Kavor
description: Consulta las combinaciones soportadas entre Nodes, las capacidades concedidas, los parámetros necesarios y los Guardrails disponibles.
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/es/docs/connections
---

# Matriz de Connections soportadas en Kavor

Una Connection no es solo una línea dibujada en el Canvas. Declara que dos Nodes participan en el mismo grafo y
define las capacidades que esa combinación añade al trabajo.

No todas las combinaciones son válidas. Cada par soportado tiene un contrato específico: algunas Connections hacen
alcanzable el contexto, otras permiten operaciones mediadas por Kavor y dos proporcionan rutas canónicas a un Terminal
mediante variables de entorno.

Esta página es la referencia pública de esos contratos.

## Cómo leer una Connection

Una Connection tiene tres responsabilidades diferentes:

1. **Existencia:** conecta los Nodes en un mismo componente alcanzable del grafo.
2. **Parámetros:** registra una configuración obligatoria cuando la combinación la necesita.
3. **Guardrails:** resta capacidades al comportamiento normalmente permitido entre los dos Nodes.

Las Connections son relaciones bidireccionales. Kavor almacena ambos endpoints en orden canónico, pero ese orden no
expresa flujo, control ni precedencia. Un mensaje sigue teniendo remitente y destinatario; un Trigger sigue teniendo
un objetivo. Esas direcciones pertenecen a la operación, no a la Connection persistida.

## Combinaciones soportadas

| Par de Nodes | Qué permite la Connection | Parámetros | Guardrail disponible | Ejemplo principal |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Leer metadatos y Markdown canónico, trabajar con el lifecycle y registrar outputs duraderos cuando esté permitido. | Ninguno | `specification_read_only` | Spec Writer, Builder y Reviewer compartiendo el mismo contrato. |
| **CodingAgent + Sticky Note** | Leer y escribir memoria informal en Markdown con control de versión; cada escritura elige append o replace. | Ninguno | `sticky_note_read_only` | Decisiones abiertas, progreso, findings y handoffs visibles. |
| **CodingAgent + Terminal** | Leer output, ejecutar comandos, seguir o interrumpir una ejecución correlacionada e interactuar con el proceso en foreground cuando esté permitido. | Ninguno | `terminal_read_only` | Diagnóstico, tests, logs o asistencia en una sesión SSH supervisada. |
| **CodingAgent + File** | Hacer explícita en el grafo una fuente canónica del filesystem para leerla, revisarla o modificarla cuando esté permitido. | Ninguno | `file_read_only` | Delimitar un módulo, PDF, imagen, informe o configuración. |
| **CodingAgent + CodingAgent** | Formar un grafo alcanzable para mensajes asíncronos, respuestas, revisión independiente y trabajo paralelo. | Ninguno | Ninguno | Un Builder solicitando revisión a un Reviewer. |
| **Specification + Terminal** | Exportar a la sesión del Terminal la ruta absoluta canónica de la Specification. | Nombre obligatorio de variable de entorno | Ninguno | Validar, inspeccionar o comparar el Markdown de una Specification. |
| **File + Terminal** | Exportar a la sesión del Terminal la ruta absoluta canónica del File. | Nombre obligatorio de variable de entorno | Ninguno | Ejecutar un script o usar un archivo SQL sin copiar su ruta entre ventanas. |
| **Trigger + CodingAgent** | Entregar en un horario configurado un prompt a un CodingAgent con sesión activa. | Ninguno | Ninguno | Despertar a un Maintainer para analizar fallos, escribir un informe y pedir revisión. |
| **Trigger + Terminal** | Entregar en un horario configurado un comando a la sesión activa de un Terminal. | Ninguno | Ninguno | Ejecutar tests, una verificación de base de datos o un script de mantenimiento. |

## Los Guardrails restringen; no conceden acceso

Una Connection comienza con las capacidades implementadas para esa combinación. Un Guardrail registra una restricción
elegida por el usuario sobre esa base:

| Guardrail | Connection | Efecto |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Mantiene la lectura y prohíbe cambios de lifecycle y outputs mediante Kavor. La edición directa del Markdown se convierte en un contrato explícito de solo lectura. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Mantiene la lectura y bloquea append o replace del contenido. |
| `terminal_read_only` | CodingAgent + Terminal | Mantiene la inspección del Terminal y bloquea operaciones que alterarían la sesión, el proceso o su entrada. |
| `file_read_only` | CodingAgent + File | Declara que el agente no debe modificar la fuente canónica. |

Los Guardrails pertenecen a la Connection directa entre el CodingAgent y el recurso. Una ruta alternativa por el
grafo no elimina una restricción existente en ese par directo.

Las operaciones mediadas por Kavor se rechazan antes de producir efectos cuando un Guardrail las bloquea. Los Files y
el cuerpo de las Specifications también pueden ser accesibles mediante las herramientas de filesystem del harness;
allí el Guardrail es un contrato visible y monitorizado, no una sandbox del sistema operativo.

Un Guardrail no crea una Connection, no hace alcanzable un Node y no aumenta permisos. Si un recurso no debe participar
en el grafo, no crees la Connection.

## Connections con variables de entorno

Solo dos combinaciones tienen parámetros persistidos:

- **File + Terminal**;
- **Specification + Terminal**.

En ambos casos eliges el nombre de una variable de entorno. El valor entregado al Terminal es la ruta absoluta
canónica de la fuente, nunca el contenido del archivo.

Por ejemplo, un File conectado como `CHECK_SQL` puede usarse en el shell así:

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor aplica el valor al iniciar la sesión del Terminal. Si la Connection o su parámetro cambia mientras el shell está
abierto, la interfaz indica que la variable espera el reinicio de la sesión. `TERM` y `COLORTERM` son nombres reservados
y no pueden usarse en estos parámetros.

## El límite especial de un Trigger

Un Trigger tiene como máximo un objetivo directo: un CodingAgent o un Terminal. No se conecta directamente a una
Specification, File o Sticky Note ni distribuye el mismo disparo a varios objetivos.

El resto del grafo puede ampliar lo que el objetivo puede hacer sin ampliar sus permisos. Un CodingAgent despertado
por un Trigger puede trabajar con Nodes ya alcanzables bajo los mismos Guardrails y límites de sesión.

Para que la entrega ocurra, Kavor debe estar en ejecución y la sesión del objetivo activa. Un Trigger no inicia una
sesión que dejaste apagada, no decide el objetivo del trabajo ni convierte efectos externos en operaciones exactamente
una vez. Cada TriggerFiring conserva su resultado duradero para inspección.

## Combinaciones que no existen

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
- Terminal + Terminal.

Un Node tampoco puede conectarse consigo mismo. Invertir los mismos endpoints no crea otra Connection, pues la relación
persistida no tiene dirección.

La proximidad en el Canvas, una mención en un mensaje o la pertenencia al mismo Workspace no sustituyen una Connection.
Si una combinación no aparece en esta página, estar cerca visualmente de otro Node no le concede capacidades.

## Elige la Connection mínima que resuelva el trabajo

Antes de conectar dos Nodes, pregunta qué capacidad concreta falta:

- ¿el agente necesita intención duradera? Conecta una Specification;
- ¿humano y agente necesitan memoria de trabajo compartida? Conecta una Sticky Note;
- ¿el agente necesita ejecutar u observar un proceso? Conecta un Terminal;
- ¿una fuente canónica debe quedar explícita? Conecta un File;
- ¿otro punto de vista mejoraría la implementación o revisión? Conecta otro CodingAgent;
- ¿el tiempo debe iniciar realmente la actividad? Añade un Trigger al final.

Una buena Connection hace el trabajo más explícito. Si no puedes nombrar la capacidad que añade, probablemente el
grafo no la necesita.

## Continúa

- Lee la [guía central de Nodes](./nodes.md) para entender la responsabilidad de cada participante.
- [Cierra tu primer loop](./first-loop.md) con intención, implementación, revisión y decisión humana.
- Aprende [cómo elegir CodingAgents y papeles](./agents-and-roles.md) antes de ampliar el grafo.
