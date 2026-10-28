---
id: coding-agent-accounts
title: "CodingAgent Accounts: tus cuentas, uso y rotación"
description: Consulta los límites de los providers, añade tus cuentas y elige cómo comparten capacidad los CodingAgents entre Workspaces sin sustituir tu login nativo.
kind: guide
lastReviewedAt: 2026-10-28
canonicalUrl: https://agentkavor.com/es/docs/coding-agent-accounts
---

# CodingAgent Accounts: tus cuentas, uso y rotación

## Visión general

Una Specification puede tener un Builder y un Reviewer trabajando a la vez mientras otro Workspace usa una tercera
sesión. Estas sesiones no tienen por qué competir por el mismo login sin que lo sepas: **CodingAgent Accounts**
muestra la capacidad de tus cuentas y permite elegir cómo la utilizan los CodingAgents.

El pool te pertenece y se comparte entre tus Workspaces. No es una función para compartir cuentas con otras
personas. La configuración es opcional: con solo el login nativo del provider puedes seguir trabajando como antes.

El login que ya existe en el equipo es la cuenta principal, **Main**. Cuando el provider informa de tu correo
electrónico, Kavor usa únicamente ese correo como nombre visible; si la identidad no está disponible, muestra
**Main**. Añadir una cuenta en Kavor no sustituye ese login ni cierra la sesión de las aplicaciones del provider que lo usan.

Empieza por el grupo **Accounts** de la barra superior del Workspace. Pasa el puntero sobre un provider para ver el
resumen y haz clic para abrir el panel. Este panel reúne uso, cuentas, opciones del Workspace y preferencias; no hay
otro gestor de cuentas en Settings.

## Uso

**Los porcentajes muestran capacidad restante, no cantidad de agentes.** Varios CodingAgents pueden usar la misma
cuenta y consumir sus ventanas al mismo tiempo.

![Ilustración de los indicadores Accounts de Claude Code, Codex, Antigravity y Grok.](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/header.118710635e3f.png)

Ilustración de la interfaz con valores registrados en la captura de referencia; no es una nueva lectura de uso de los providers.

### Lee el resumen de la barra superior

- Cada indicador usa el color de su provider y muestra hasta dos ventanas generales de la cuenta, de la más corta a
  la siguiente. Una cuenta con ventanas de cinco horas y semanal muestra ambas; una cuenta solo mensual no recibe
  una ventana inventada de cinco horas. No se suman los porcentajes de cuentas distintas.
- Cuando hay más de una cuenta en uso en ese Workspace, el resumen representa la que tiene menos capacidad restante
  en alguna de esas ventanas. Al pasar el puntero se identifican las cuentas en uso y las ventanas de cada una.
- Si ningún CodingAgent usa ese provider, el indicador se atenúa y muestra la mejor cuenta disponible conocida entre
  las que el Workspace puede elegir en Automatic. Esto no significa que ya se haya seleccionado.
- **+N** es la reserva de otras cuentas con capacidad conocida para la selección automática de ese Workspace, no una
  reserva exclusiva. También pueden contar cuentas que usan otros CodingAgents. **+N?** indica lecturas aún
  desconocidas; un provider con una sola cuenta no muestra reserva.
- Una ventana se vuelve ámbar al alcanzar el umbral de rotación. El indicador entero se vuelve rojo claro cuando se
  confirma que todas las cuentas que Automatic puede usar en ese Workspace están en el umbral configurado o por
  encima. Es información de capacidad, no un bloqueo del trabajo.

### Comprueba las ventanas y la lectura

En el panel, cada ventana muestra la capacidad restante y la próxima renovación. Las ventanas específicas de modelo
aparecen en los detalles de la cuenta, no en el indicador general. Abre **More** para consultar la hora **Read**, el
plan, los créditos, los resets acumulados y otros datos que el provider haya informado realmente.

Las lecturas visibles se actualizan periódicamente. Durante una actualización, la última lectura válida sigue
visible con su hora real; cerrar y volver a abrir el panel no convierte datos antiguos en una observación nueva.
Un fallo muestra indisponibilidad o indicaciones para iniciar sesión sin sustituir los últimos porcentajes válidos
por valores inventados. Usa **Refresh**, junto al selector de provider, para solicitar una actualización.

**Unavailable** o **—** no significan 0% ni 100%. Una lectura desconocida no confirma que la cuenta se haya quedado
sin capacidad ni que el login haya caducado. Comprueba el error y la hora; intenta actualizar o vuelve a iniciar
sesión cuando se indique. Un fallo en la consulta de uso no oculta las acciones para añadir una cuenta o volver a
iniciar sesión.

| Provider | Qué puede mostrarse |
| --- | --- |
| **Codex** | Ventanas primaria y secundaria, sus periodos y resets, alcance por modelo, créditos y resets acumulados cuando se informan. Los periodos varían según la cuenta. |
| **Claude Code** | Ventanas reconocidas en el resultado nativo de uso, como sesión y semana, con porcentajes y resets. Las estadísticas locales de tokens o coste no se convierten en cuota. |
| **Grok** | Uso de créditos, periodo y renovación; plan y saldo prepago cuando se informan. |
| **Antigravity** | Capacidad restante y resets de los grupos o buckets que informa el CLI. |
| **OpenCode** | No participa en este seguimiento; el uso depende del provider configurado en el harness. |

Las consultas usan el canal nativo del provider, sin pedir trabajo a un modelo. Consultar un saldo no autoriza a gastarlo.

## Cuentas

### Añade y autentica una cuenta

1. Abre el panel de un provider compatible: **Codex**, **Claude Code** o **Grok**.
2. Usa **Add account**, dale un nombre reconocible, como `Trabalho`, y confirma **Add account and sign in**.
3. Completa el inicio de sesión nativo en la página del provider y usa el código mostrado cuando sea necesario. La
   dirección de autorización se abre una vez para el flujo que has iniciado; si el CLI del provider abre su propio
   navegador, Kavor no abre una segunda pestaña.
4. Comprueba el estado de autenticación y la lectura de uso. **Abrir el navegador no significa haber completado el login.**
5. Si quieres incluir la nueva cuenta en la selección automática, activa su participación en el Workspace deseado.
   Una cuenta recién añadida empieza fuera de Automatic en todos los Workspaces; el pool global no la habilita por sí solo.

Kavor prepara un perfil aislado para la cuenta añadida. Las credenciales quedan en el almacenamiento que usa el CLI
de esa cuenta, no en la base de datos de Kavor. El login nativo Main sigue donde estaba.

Si el login ha caducado, usa **Sign in again**. En las cuentas gestionadas, el panel también ofrece esta acción
cuando no se ha podido determinar el estado de autenticación; eso no convierte una lectura desconocida en una
caducidad confirmada. Cada clic que inicia un login, incluido un reintento, abre la dirección de autorización una
vez cuando está disponible. Si no se abre, usa **Continue provider sign-in** manualmente. Volver a abrir el panel o
restaurar una operación pendiente no abre pestañas por sí solo.

### Main no es una copia de tu login

Main usa el login nativo en el mismo lugar donde lo mantiene el provider. El panel no ofrece iniciar sesión,
cerrarla ni eliminar Main; gestiona ese login con las herramientas del provider. Cuando cambias la cuenta nativa
fuera de Kavor, Main pasa a representar ese login, sin ofrecer recuperar la cuenta anterior.

Un login nativo sin identidad ni datos de uso, como una clave de API de Codex, sigue funcionando como antes, pero no
participa en la rotación automática. Kavor no lee credenciales para intentar deducir una identidad.

### Cerrar sesión no es lo mismo que eliminar

**Sign out** mantiene la cuenta en la lista para que puedas volver a iniciar sesión. **Remove account** retira la
cuenta de la lista y elimina su perfil aislado gestionado por Kavor; no borra el login Main ni el historial compartido
de las sesiones.

Si hay CodingAgents usando la cuenta, Kavor muestra cuáles se ven afectados y pide confirmación. El cambio espera
al límite seguro entre turnos y a la liberación del proceso anterior. Una elección fija de esa cuenta vuelve
a Automatic; si era la cuenta predeterminada de un Workspace, el valor predeterminado vuelve a Main. Sin otra cuenta,
la ejecución usa el login nativo.

## Copia de la configuración personal

Al añadir una cuenta, recibes **una copia inicial** de la configuración personal del provider en el entorno nativo.
Así no tienes que volver a configurar preferencias, skills y MCPs en cada cuenta. El contenido depende del provider
y de lo que exista en el origen:

| Provider | Qué se copia |
| --- | --- |
| **Codex** | `config.toml`, con preferencias, perfiles, MCPs personales y providers personalizados; hooks personales de `hooks.json`; `AGENTS.md` y los directorios `skills`, `plugins`, `rules` y `prompts`. No se copia `forced_chatgpt_workspace_id`. |
| **Claude Code** | `settings.json`, incluidos statusline y hooks personales; `keybindings.json`; `CLAUDE.md`; los directorios `skills`, `plugins`, `rules`, `agents` y `commands`. De `.claude.json`, solo los MCPs personales, no el archivo completo. |
| **Grok** | `config.toml`, con preferencias y MCPs personales; `AGENTS.md` y los directorios `skills`, `plugins`, `rules` y `hooks`. |

**También se copian los secretos incluidos en esas configuraciones.** Esto incluye valores de entorno de MCPs,
cabeceras HTTP estáticas y claves de providers personalizados guardados en esos archivos. Los archivos conservan
sus permisos; esos valores no se registran en logs ni se guardan en la base de datos de Kavor.

**El login nativo, los archivos de autenticación, los elementos del Keychain y la identidad de la cuenta nunca se
copian.** La cuenta añadida necesita su propio login. Tampoco se heredan las entradas de integración que pertenecen
a Kavor: Kavor prepara su integración para esa cuenta.

Es una copia, no una sincronización. Un MCP que añadas después en Main también debe configurarse en las cuentas
donde quieras usarlo. Cambiar una cuenta añadida no modifica Main; repetir el login no vuelve a copiar preferencias.

Si la preparación indica un error de configuración, revisa el TOML o JSON personal indicado antes de intentarlo de
nuevo. No copies archivos de autenticación ni borres el perfil nativo completo como intento de reparación.

## Cambio de cuenta

### Elige el comportamiento de cada Workspace

Una elección **Manual** en la configuración del CodingAgent fija una cuenta para ese Node y prevalece sobre la
política del Workspace. Un CodingAgent en **Auto (Automatic)** sigue las opciones de su Workspace para ese provider.

Cuando el modo efectivo es **Manual**, definido en el Node o heredado del Workspace, completar un turno no
dispara una consulta de capacidad para la rotación. Esto no desactiva las lecturas de uso visibles ni **Refresh**.

En el panel de Accounts del Workspace:

- Con **Auto Rotate** activado, los interruptores de participación definen qué cuentas puede usar Automatic. Cada
  Workspace tiene su propia selección, aunque use el mismo pool. Una cuenta fuera de esa selección sigue visible y
  puede elegirse manualmente en el CodingAgent o usarse en otro Workspace.
- Con una sola cuenta participante, Automatic permanece en ella incluso si alcanza el umbral. Sin participantes,
  usa el login nativo Main, sin rotación automática en ese Workspace.
- Con **Auto Rotate** desactivado, los botones de selección única definen la cuenta predeterminada para los
  CodingAgents en Automatic. Al desactivarlo, Main pasa a ser la predeterminada; no se recupera una elección anterior.
  Las participaciones se guardan para cuando vuelvas a activar Auto Rotate.

Guardar Auto Rotate o una participación es inmediato y **no reinicia ni redistribuye agentes en ejecución**.
La participación se aplica en la siguiente selección automática real, como la apertura de una sesión o una rotación
por umbral. En cambio, elegir explícitamente otra cuenta predeterminada u otra cuenta Manual puede mover los
CodingAgents afectados en el límite seguro entre turnos. Un agente cuya cuenta efectiva no haya cambiado no se reinicia.

![Panel Accounts de Codex con Auto Rotate activado, participación de las cuentas, capacidad restante y preferencias de rotación; identidades ocultas.](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/panel.2cf397f707ee.png)

La participación de las cuentas se configura en el panel Accounts de cada Workspace. Los valores de capacidad restante y los horarios de renovación proceden de la captura de referencia, no de una consulta en tiempo real al proveedor. Las identidades se han ocultado.

### Cómo elige Automatic otra cuenta

El umbral predeterminado es **95% de uso**, ajustable en **Rotate at used capacity (%)**, dentro de
**Global rotation preferences**. Kavor considera la autenticación, la elegibilidad del plan, el modelo elegido, la
participación en el Workspace y todas las ventanas informadas. No cambia el modelo para que una cuenta encaje en la selección.

Las decisiones de Automatic pueden compartir una lectura válida de la misma cuenta entre tus Workspaces durante
un máximo de **30 segundos** desde la consulta original. Reutilizarla no renueva ese plazo. Su vencimiento, la
renovación de una ventana o un fallo confirmado de autenticación o cuota exigen una nueva evaluación; los datos no
disponibles no pasan a representar capacidad elegible. La rotación sigue siendo preventiva, en el umbral configurado,
sin esperar a que falle un turno.

Se mantiene una cuenta actual válida. Cuando necesita elegir entre cuentas elegibles que estén por debajo del
umbral en todas las ventanas, Kavor prefiere, por este orden:

1. Una cuenta que ya usen los CodingAgents de ese Workspace.
2. Una cuenta que no esté usando ningún otro Workspace.
3. La cuenta compartida con menos Workspaces.

Entre candidatas equivalentes, prefiere la que renueva su capacidad antes. Con cuatro Workspaces y cuatro cuentas
elegibles disponibles, esto permite distribuir una cuenta por Workspace. No es una reserva exclusiva: las cuentas
pueden compartirse cuando sea necesario. Abrir o cerrar un Workspace no provoca una redistribución general.

El cambio reinicia el harness con la otra cuenta **entre turnos**, retomando la misma sesión nativa y su historial.
El Node muestra las etapas reales de espera, elección, reinicio y reanudación. Una indicación de espera no bloquea
un terminal que aún se puede usar; durante el reinicio del CLI, el terminal se cierra y vuelve cuando la sesión está
lista. Un cambio completado no genera una notificación del sistema; las notificaciones se reservan para fallos
reales e identifican el Workspace y el CodingAgent.

### Capacidad agotada y fallos de turno

**La capacidad baja o agotada, por sí sola, no pausa el CodingAgent, no bloquea un mensaje ni desactiva la entrada
del terminal.** Sin una alternativa con capacidad, permanece en la cuenta actual. Una apertura inicial en Automatic
sin una cuenta elegible con capacidad usa Main e informa de esa condición. El provider sigue aplicando los límites
reales y la facturación del turno.

Un login confirmado como caducado se excluye de las elecciones automáticas; un fallo de red o una lectura desconocida
no confirman que haya caducado. Esto no sustituye una elección Manual.

En **Codex y Claude Code**, un turno que haya fallado por una cuota de cuenta confirmada por el provider puede
reanudarse en otra cuenta, con las mismas reglas de Automatic y cuando sea seguro reenviarlo. Una entrega incierta,
la autenticación, un rate limit, la sobrecarga general y una causa desconocida no autorizan a repetir una solicitud.
**Un turno fallido de Grok no se reenvía automáticamente**, porque la señal nativa no distingue cuota de rate limit;
la rotación por umbral de uso sigue disponible.

### Créditos y resets acumulados

**Allow spending credits** y **Allow spending banked resets** son permisos separados, desactivados por defecto.
Rigen la selección y la rotación que realiza Kavor; ver un saldo no activa ninguno. Con los créditos desactivados,
una cuenta en el umbral configurado no obtiene elegibilidad automática por tener saldo. Esto no interrumpe una
sesión en ejecución ni cambia tu elección Manual.

**Estas opciones no bloquean la facturación nativa dentro de un turno.** Controla los límites de gasto y el consumo
de pago de la cuenta en el propio provider. Kavor no compra créditos ni cambia los ajustes de facturación de tu login.

Los resets acumulados y sus fechas de caducidad solo aparecen cuando se informan. El consumo de un reset acumulado
no se ha verificado; la presencia del saldo o de la preferencia no debe interpretarse como una operación de consumo garantizada.

## Herramientas para CodingAgents

Un CodingAgent puede consultar tus cuentas sin recibir credenciales:

- `kavor_coding_agent_account_list_usage` consulta el pool global y los logins nativos, con paginación, ventanas,
  resets, elegibilidad y hora de observación; puede filtrar por provider.
- `kavor_coding_agent_account_request_change` solicita el cambio de la **propia cuenta del CodingAgent que llama**
  para el final del turno, respetando Automatic y las cuentas permitidas en ese Workspace.

La solicitud se rechaza en Manual y no garantiza que exista una alternativa elegible. Estas herramientas no permiten
cambiar la cuenta de otro CodingAgent, iniciar sesión, eliminar cuentas, cambiar permisos de gasto ni acceder a tokens.

Por ejemplo:

> Compara las ventanas y renovaciones de mis cuentas sin cambiar ninguna selección. Si recomiendas un cambio para
> tu propia sesión, explica qué lecturas respaldan la sugerencia y respeta mi elección Manual.

## Comandos de Agent Kavor

En la conversación de **Agent Kavor**, incluso mediante un Channel habilitado, los comandos operan en el Workspace
seleccionado, sin un turno de modelo para interpretar el control. Usa los nombres reales que muestra Kavor:

```text
/accounts
/accounts codex
/account
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
/autorotate codex on
/status
```

- `/accounts [provider]` muestra el resumen de uso, renovaciones y reserva del Workspace. No es una exportación
  completa de todas las cuentas: si hay más resultados o lecturas desconocidas, indica los límites y remite al panel.
- `/account [@Nome]` consulta la cuenta y el modo del agente seleccionado o indicado. Añade el nombre o correo de una
  cuenta para fijarla; usa `auto` para volver a Automatic. Los nombres con espacios necesitan comillas.
- `/autorotate [provider] on|off` activa o desactiva Auto Rotate en ese Workspace sin mover agentes en ejecución.
  Sin provider, usa el del CodingAgent predeterminado; sin agente predeterminado, debes indicar el provider.
- `/status` incluye la cuenta y sus ventanas generales; `/help` presenta los controles y ejemplos disponibles.

Fijar otra cuenta respeta la misma validación, el límite seguro y el feedback del desktop. Una respuesta al comando
no demuestra que la reanudación haya terminado. Añadir cuentas, iniciar o cerrar sesión, eliminarlas, cambiar las
participaciones y elegir la cuenta predeterminada del Workspace siguen siendo acciones del panel del desktop.
Las reglas de autorización del Channel no cambian.

Consulta [Agent Kavor y Channels](./agent-kavor.md) para seleccionar el Workspace y el destinatario antes de operar
los controles.

## Soporte y limitaciones por provider

- **Codex, Claude Code y Grok** ofrecen cuentas gestionadas y cambio con continuidad de sesión. El plan de la cuenta
  y el modelo deben permitir la ejecución. Una configuración aislada no convierte un plan no elegible en uno aceptado.
- **Grok** no informa de la identidad nativa de la cuenta. Main conserva ese nombre neutro; no se usan el plan ni el
  saldo para deducir un correo. La excepción de reenvío de turnos se describe arriba.
- **Antigravity** ofrece seguimiento de la cuenta del equipo, sin pool, cambio de cuentas ni la copia de configuración
  descrita en esta guía.
- **OpenCode** queda fuera del seguimiento y la gestión de cuentas descritos aquí; sus límites dependen del provider
  configurado en el propio harness.
- Los logins sin identidad o uso informado siguen disponibles por la vía nativa, sin inventar cuota ni activar la
  rotación automática. La información y las ventanas disponibles pueden variar entre cuentas y modos de autenticación.
- Los datos ausentes no son saldos cero. Los cambios en los formatos nativos pueden dejar una observación no
  disponible; comprueba la hora, el mensaje y el login antes de concluir que se ha agotado la cuota.

Para organizar el trabajo con estas cuentas, continúa con la [guía de CodingAgent](./coding-agent.md) y con
[cómo elegir agentes y definir papeles](./agents-and-roles.md).
