---
id: schedule
title: "Schedule en Kavor: dale un reloj a tu grafo"
description: Programa prompts y comandos recurrentes con vista previa, pausa, Run now e historial persistente sin ampliar permisos.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/es/docs/schedule
---

# Schedule en Kavor: dale un reloj a tu grafo

Schedule es una causa visible de actividad: eliges cuándo debe ocurrir algo, conectas un único objetivo y mantienes
cada intento inspeccionable en el Canvas.

En el dominio de Kavor, Schedule es la fuente de Trigger disponible. No realiza el trabajo ni decide si conviene
actuar. Solo tiene dos responsabilidades: **cuándo disparar** y **qué payload entregar**.

El objetivo da sentido al payload:

- conectado a un **CodingAgent**, es un prompt;
- conectado a un **Terminal**, es un comando de shell.

El resto pertenece al objetivo. Workspace, directorio, provider o shell, Git mode, permisos, Guardrails y contexto
del grafo permanecen como estaban.

![Un Schedule completado conectado a un CodingAgent que recibió un prompt de revisión, con una Sticky Note que comparte la intención del loop](https://agentkavor.com/kavor-schedule-trigger-demo.jpg)

*Schedule inicia la actividad; el CodingAgent usa el contexto alcanzable para ejecutar y explicar el resultado.*

## Tres usos que justifican un Schedule

### Despertar a un Maintainer con contexto

Un Schedule entrega un prompt diario a un CodingAgent. Ese agente alcanza una Specification con el contrato de
mantenimiento, un Terminal para ejecutar verificaciones, un File con datos de entrada, una Sticky Note para el
informe y un Reviewer para una evaluación independiente.

Schedule inicia una causa. El grafo aporta intención, herramientas, memoria y colaboración.

### Ejecutar un comando operativo visible

Un Schedule conectado directamente a un Terminal puede entregar una verificación, script o comando de mantenimiento.
Si un File también está conectado al Terminal mediante una variable de entorno, el comando consume su ruta canónica
sin copiar valores entre ventanas.

```sh
sqlite3 app.db < "$CHECK_SQL"
```

El proceso permanece en el Terminal real. El historial registra lo que Kavor observó sobre la entrega sin inventar
éxito a partir del texto del shell.

### Crear un pequeño sistema semiautónomo

```text
Schedule — Maintainer — Specification
                      ├─ Terminal
                      ├─ File
                      ├─ Sticky Note
                      └─ Reviewer
```

Las líneas son Connections sin dirección persistida. Schedule tiene un solo objetivo directo: `Maintainer`. El
CodingAgent usa el resto del componente alcanzable y deja evidencia para la decisión humana.

## Configura primero, libera el reloj después

Un Schedule nuevo comienza **Paused** como ejecución única futura. Así puedes escribir el payload, elegir la
recurrencia, conectar el objetivo y revisar la vista previa antes de autorizar actividad.

Orden recomendado:

1. añade un Schedule al Canvas;
2. escribe un payload específico y verificable;
3. elige una ejecución única o recurrente;
4. revisa `Next occurrences` y la zona mostrada;
5. conecta directamente un CodingAgent o Terminal;
6. usa `Resume` solo cuando la estructura esté lista.

Un Trigger puede existir sin objetivo mientras se configura. Un Schedule en ejecución sin Connection de objetivo
registra el instante como `Blocked`; `Run now` sin objetivo se rechaza antes de crear un intento.

## Escribe un payload que pueda terminar

Un buen prompt indica objetivo, recursos del grafo, evidencia esperada y condición de parada:

> Analiza las fallas recientes de CI. Ejecuta solo las verificaciones relevantes en el Terminal Checks, registra un
> resumen con evidencias en la Sticky Note Daily report y pide al Reviewer una evaluación independiente. No cambies
> código antes de registrar la causa probable y detente si la corrección requiere ampliar la Specification.

Un buen comando de Terminal es explícito, no interactivo y deja un resultado observable:

```sh
pnpm test -- --runInBand
```

El payload no sustituye Connections. Mencionar una Sticky Note, File o Specification no concede acceso si el Node no
pertenece al componente alcanzable del CodingAgent.

## Recurrencia sin ocultar el calendario

El editor ofrece `Once`, `Hourly`, `Daily`, `Weekdays`, `Weekly`, `Monthly` y `Custom` para cron avanzado. Los presets
y el editor avanzado cambian la misma expresión; no hay dos agendas paralelas. El intervalo mínimo es un minuto. No
aproximes con cron una recurrencia que no representa correctamente, como “cada dos semanas desde esta fecha”.

Kavor guarda una zona IANA explícita y muestra las próximas ocurrencias en la zona local de la máquina que presenta
el Canvas. La zona no se edita en la interfaz: se toma del host al guardar. Revisa siempre la vista previa antes de
usar `Resume`.

En transiciones de horario de verano, una hora local repetida dispara una vez. Una hora inexistente se desplaza al
primer instante local válido. En el preset mensual, un día ausente se omite; el día 31 no se ejecuta en febrero.

## Pause, Resume y Run now son diferentes

- **Pause** detiene nuevas ocurrencias de inmediato. El tiempo pausado no crea intentos ni registros `Missed`.
- **Resume** considera solo ocurrencias futuras y exige un payload válido; una ejecución única debe seguir en el
  futuro.
- **Run now** crea un intento manual independiente, funciona en pausa y no mueve la próxima recurrencia.

`Run now` valida payload y objetivo antes de liberar el reloj. No es un retry automático y no cambia el estado Paused
o Running. Una ejecución `Once` vuelve a Paused después de consumirse; el historial y `Run now` permanecen.

## Qué ocurre cuando llega la hora

Kavor registra un intento persistente y arbitra la entrega junto con mensajes ya aceptados por el objetivo. Puede
pasar por `Pending` y `Delivering` antes del resultado observado.

- **Completed** — Kavor observó la finalización;
- **Needs attention** — el CodingAgent pidió intervención y aún puede terminar;
- **Fired** — hubo entrega, pero ese camino no ofrece finalización observable;
- **Failed** — hubo una falla observable;
- **Interrupted** — la entrega comenzó sin terminar con un resultado fiable;
- **Blocked** — el objetivo o Workspace no estaba disponible;
- **Missed** — el instante pasó sin que el runtime pudiera reclamarlo;
- **Coalesced** — otro intento ocupaba el único slot pendiente del objetivo.

La hora programada no prueba ejecución. Consulta el estado reciente del Node y abre el historial para ver hora
nominal, entrega, resultado y diagnóstico.

## Cuando la máquina duerme o Kavor está cerrado

Schedule depende del runtime local: Kavor debe estar abierto, la máquina despierta, el usuario autenticado y la
sesión del objetivo activa.

Si pasan varias ocurrencias durante la indisponibilidad, Kavor registra solo la perdida más reciente de ese Schedule.
No ejecuta por sorpresa trabajo antiguo al volver. La interfaz muestra `Missed` y ofrece una acción explícita
equivalente a `Run now`.

No hay catch-up automático ni retry de efectos externos.

## Cuando el objetivo ya está ocupado

Schedule mantiene como máximo un intento pendiente mientras el objetivo trabaja. Nuevas ocurrencias con ese slot
ocupado se registran como `Coalesced` y no se entregan después.

Si la tarea puede durar más que la recurrencia, aumenta el intervalo o haz que el objetivo reconcilie el estado
actual de forma idempotente.

## Límites que debes asumir

- un Schedule tiene como máximo un objetivo directo, CodingAgent o Terminal;
- no inicia una sesión cerrada deliberadamente;
- no amplía el grafo, permisos ni Guardrails del objetivo;
- no sustituye criterios de aceptación ni decide si el resultado es correcto;
- hace como máximo un intento automático de entrega por intento registrado;
- no promete efectos externos exactly-once;
- no acumula todas las ocurrencias `Missed` o `Coalesced` para después.

Si el trabajo exige fan-out, aprobación por etapas, compensación u orquestación transaccional, modélalo en el grafo
y mantén explícita la decisión humana.

## Checklist antes de usar Resume

- ¿el payload define objetivo, evidencia y condición de parada?
- ¿`Next occurrences` coincide con el horario esperado?
- ¿la zona mostrada es correcta?
- ¿existe exactamente una Connection de objetivo?
- ¿la sesión debe permanecer activa?
- ¿el grafo contiene solo contexto y capacidades necesarios?
- ¿repetir es seguro si ya ocurrió un efecto externo?
- ¿sabes dónde consultar resultado e historial?

## Continúa

- Revisa la [matriz de Connections](./connections.md).
- Entiende [cómo CodingAgents ven y construyen el Canvas](./coding-agents-and-canvas.md).
- Usa [CodingAgents y roles](./agents-and-roles.md) para separar mantenimiento, revisión y decisión.
