---
id: terminal
title: "Terminal en Kavor: ejecución visible para humano y agente"
description: Usa un shell real en el Canvas, conecta contexto mediante rutas canónicas y permite la asistencia del CodingAgent sin perder supervisión.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/es/docs/terminal
---

# Terminal en Kavor: ejecución visible para humano y agente

Un Terminal es un shell real en el Canvas. Sigues escribiendo comandos, siguiendo logs y usando herramientas
conocidas; Kavor añade contexto, observabilidad y colaboración alrededor de esa sesión.

El objetivo no es ocultar la ejecución detrás de un botón. Es permitir que humano y CodingAgent trabajen en el mismo
entorno visible, cada uno bajo límites claros.

## Qué posee un Terminal

Cada Terminal tiene su propia sesión, shell e historial de pantalla retenido por el Node. Varios Terminals son útiles
cuando las responsabilidades difieren: aplicación, tests, base de datos, logs o una máquina remota que ya abriste.

El proceso sigue siendo un proceso de shell. Kavor no convierte texto mostrado en éxito, no transforma cada comando
en una tarea persistida ni supone que una herramienta terminó solo porque imprimió un mensaje optimista.

## Qué puede hacer por sí solo

Sin Connections, el Terminal ya mantiene el shell dentro del Workspace y evita romper el flujo para cambiar a
ventanas externas. Puedes ejecutar comandos interactivos, observar procesos largos y mantener sesiones separadas en
el mismo Canvas.

Las Connections añaden participantes y fuentes canónicas sin sustituir el shell.

## Qué gana en el grafo

El Terminal admite cuatro pares directos:

| Connection | Qué añade |
| --- | --- |
| **Terminal + CodingAgent** | El agente puede ejecutar comandos correlacionados, seguir el proceso, consultar pantalla o historial e interrumpir una ejecución cuando esté autorizado. Puede incluir `terminal_read_only`. |
| **Terminal + File** | Exporta la ruta absoluta canónica del File en una variable de entorno elegida por ti. |
| **Terminal + Specification** | Exporta la ruta absoluta canónica del Markdown de la Specification mediante una variable de entorno. |
| **Terminal + Trigger** | Selecciona la sesión activa como objetivo directo de un comando programado por Schedule. |

Un CodingAgent no necesita conexión directa con el Terminal si ambos ya pertenecen al mismo componente alcanzable.
La Connection directa, sin embargo, es donde `terminal_read_only` declara e impone que ese agente solo observe.

## Asistencia sin disputar el teclado

El Terminal es una superficie compartida con prioridad para el humano. Un CodingAgent no debe volcar un comando
sobre texto que todavía estás escribiendo. Cuando la entrada no es segura, la operación espera o devuelve una
condición que debe tratarse, en vez de corromper la línea.

Para trabajo iniciado por el agente, Kavor correlaciona el comando con su seguimiento. El agente puede esperar el
resultado, cancelar la ejecución correspondiente o consultar el estado visible. En una sesión existente elige la
vista adecuada: pantalla actual, tail limitado o buffer completo.

La distinción importa. La pantalla responde «¿qué ve ahora el humano?». Un tail ayuda con logs recientes. El buffer
completo sirve para una investigación que de verdad necesita historial sin convertir cada interacción en un dump
automático de contexto.

## Usa Files y Specifications sin copiar rutas

Las Connections con File o Specification reciben el nombre de una variable de entorno. Su valor es la ruta absoluta
canónica de la fuente, nunca su contenido.

Ejemplos:

```sh
node "$IMPORT_SCRIPT" --input "$SOURCE_FILE"
```

```sh
markdownlint "$SPECIFICATION_FILE"
```

Las variables se aplican al iniciar la sesión del Terminal. Si una Connection o su parámetro cambia con el shell
abierto, la nueva configuración espera al reinicio de esa sesión. `TERM` y `COLORTERM` están reservadas por el
emulador.

Usa nombres que expresen responsabilidad, como `CHECK_SQL`, `SPECIFICATION_FILE` o `IMPORT_SCRIPT`. Una variable
genérica como `FILE` pierde significado cuando el grafo crece.

## Tres patrones útiles

### Implementación acompañada de evidencia

Conecta Specification, CodingAgent y Terminal. El agente ejecuta solo las verificaciones relevantes, conserva el
output necesario y registra el resultado como output. Observas el mismo shell y puedes intervenir.

### Diagnóstico de una aplicación en ejecución

Mantén la aplicación en un Terminal y los tests o consultas en otro. Un CodingAgent alcanzable consulta la pantalla o
el tail necesario, formula una hipótesis y ejecuta un comando delimitado. Los logs siguen visibles; la investigación
no se convierte en una caja negra.

### Operación remota supervisada

Abres una sesión SSH en el Terminal. Un CodingAgent puede ayudar a interpretar el estado y sugerir o ejecutar comandos
cuando esté autorizado. Kavor no se convierte en servicio remoto: credenciales, conexión, shell y supervisión siguen
en la sesión que abriste.

## Un grafo práctico

```text
Specification — Maintainer — Reviewer
                     │
                  Terminal
                     │
              File: check.sql
```

El Maintainer usa la Specification como contrato, el File como fuente explícita y el Terminal para ejecutar la
verificación. El Reviewer evalúa resultado y evidencias. La Connection File + Terminal proporciona `CHECK_SQL`; el
shell puede usarla sin copiar una ruta manualmente.

## Una petición inicial mejor

> Diagnostica el fallo usando solo el contexto alcanzable. Lee primero la pantalla actual del Terminal. Ejecuta un
> comando cada vez, explica qué discrimina y conserva el output necesario para el Reviewer. No interrumpas un proceso
> iniciado por mí y detente antes de una acción destructiva o que amplíe el alcance de la Specification.

Para monitorización:

> Sigue solo el tail necesario de este Terminal. Avísame cuando aparezca evidencia nueva; no trates la ausencia de
> nuevas líneas como éxito ni dejes ejecutándose un watcher iniciado únicamente para tu investigación.

## Guardrail de solo lectura

`terminal_read_only` conserva la inspección y bloquea operaciones que modificarían sesión, proceso o entrada mediante
esa Connection directa. Es útil para un Reviewer que necesita leer evidencias, pero no debe ejecutar correcciones.

El Guardrail pertenece al par. No convierte todo el Terminal en una superficie global de solo lectura ni sustituye
los permisos del sistema operativo.

## Límites importantes

- El output del Terminal no demuestra automáticamente que un efecto externo sucedió correctamente.
- Un CodingAgent no debe interferir con entrada humana inacabada.
- Los comandos destructivos siguen exigiendo alcance exacto y autorización adecuada.
- Una variable proporcionada por Connection contiene una ruta, no contenido ni un secreto.
- Los cambios en esas variables exigen reiniciar la sesión del Terminal para entrar en el entorno.
- Schedule entrega solo a una sesión activa y no recupera automáticamente comandos perdidos mientras Kavor estaba
  cerrado.
- Un proceso iniciado para investigar debe finalizar cuando no necesite permanecer para el humano.
- Varios Terminals ayudan si representan responsabilidades reales; duplicarlos sin propósito solo fragmenta el
  estado operativo.

## Antes de delegar un comando

Confirma:

- ¿es el Terminal correcto para esta responsabilidad?
- ¿hay entrada humana en curso?
- ¿el comando está delimitado y es reversible cuando sea necesario?
- ¿sabe el agente qué output constituye evidencia?
- ¿necesita pantalla, tail o historial completo?
- ¿usan Files y Specifications nombres de variable comprensibles?
- ¿debe observar el Reviewer bajo `terminal_read_only`?
- ¿está claro cuándo detenerse, esperar o pedir tu decisión?

El Terminal gana valor en el grafo cuando la ejecución sigue siendo real, el contexto queda explícito y la
supervisión no desaparece.

Consulta la [matriz de Connections](./connections.md), aprende
[cómo los CodingAgents ven y construyen el Canvas](./coding-agents-and-canvas.md) o configura
[Schedule para comandos y prompts](./schedule.md).
