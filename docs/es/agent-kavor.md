---
id: agent-kavor
title: "Agent Kavor: habla con tus agentes mediante Channels"
description: Vincula WhatsApp, elige un CodingAgent y participa desde Self-chat o un grupo dedicado al Workspace.
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/es/docs/agent-kavor
---

# Agent Kavor: la conversación va contigo

Dejas un CodingAgent trabajando y te alejas del ordenador sin perder el contacto. Agent Kavor permite enviar
solicitudes, seguir respuestas y participar en decisiones mediante **Channels**. **WhatsApp** es el primero disponible.

Agent Kavor no es otro modelo ni un agente alojado que sustituye a tus CodingAgents. Es la experiencia de hablar con
ellos mediante Channels, manteniendo el trabajo en los Workspaces de Kavor. Un Channel tampoco es un Node ni una
Connection del Canvas: transporta la conversación; el grafo sigue definiendo el contexto y las capacidades del agente.

## Antes de empezar

- Mantén Kavor ejecutándose y con sesión iniciada en el desktop, con acceso a la red. El equipo debe permanecer despierto.
- Ten un Workspace y un CodingAgent configurados, incluido el harness y su autenticación.
- Usa una cuenta WhatsApp que puedas vincular como dispositivo. Self-chat es el camino más corto para empezar.

Las solicitudes siguen sujetas a la configuración del CodingAgent, los límites del provider y los controles humanos.
Un mensaje desde el móvil no evita una aprobación pendiente en el desktop.

## 1. Vincula la cuenta en el desktop

1. Abre **Channels** en la barra superior de Kavor.
2. Inicia la vinculación de WhatsApp. Escanea el QR o elige **Link with a code** y confirma el vínculo en la cuenta
   WhatsApp correspondiente. El código de vinculación no es un inicio de sesión por SMS.
3. Espera la confirmación de conexión. Una vinculación explícita completada habilita el Channel.
4. En **Personal chat**, selecciona **Self-chat**. Si vinculas otra cuenta, también puedes configurar **Another number**
   como destino personal. Los ajustes se guardan automáticamente.

![Channels en el desktop con WhatsApp conectado, Self-chat seleccionado y configuración de grupos por Workspace](https://media.agentkavor.com/releases/2.0.0/whatsapp/setup/master.2552b26a5322.png)

La prueba de envío usa el destino personal indicado: no inicia trabajo en un CodingAgent ni envía mensajes a todos
los grupos. Comprueba el destino antes de utilizarla.

## 2. Elige Workspace y agente en Self-chat

Abre tu conversación personal en WhatsApp. El onboarding ofrece seleccionar primero un Workspace y después un
CodingAgent. Responde a esas selecciones y comprueba el contexto confirmado antes de enviar la primera solicitud.

![Onboarding de WhatsApp con Workspace y CodingAgent seleccionados y confirmación del contexto](https://media.agentkavor.com/releases/2.0.0/whatsapp/onboarding/poster-framed.7636ed112536.png)

[Mira cómo seleccionar Workspace y agente en WhatsApp →](https://agentkavor.com/es/videos/whatsapp-onboarding)

La conversación personal conserva la selección. Puedes consultar o cambiar el contexto sin volver a vincular:

| Qué quieres hacer | Comando |
| --- | --- |
| Consultar Workspace y agente seleccionados | `/context` |
| Listar Workspaces | `/workspaces` |
| Cambiar de Workspace en la conversación personal | `/workspace "Mi proyecto"` |
| Listar agentes del Workspace | `/agents` |
| Elegir el agente predeterminado | `/agent "Reviewer"` |
| Consultar el estado sin solicitar un análisis | `/status` |
| Ver comandos y ejemplos disponibles | `/help` |

Usa los nombres reales que muestra Kavor. Una mención explícita como `@Reviewer` dirige una solicitud a otro agente
sin cambiar el predeterminado. El estado de ejecución no demuestra que una implementación haya pasado pruebas o revisión.

### Consulta y elige la cuenta del CodingAgent

En el Workspace seleccionado, `/accounts` muestra el uso, las renovaciones y las cuentas de reserva por provider.
`/account` indica la cuenta y el modo del CodingAgent seleccionado; `/status` también incluye esta información.

Para fijar una cuenta existente o volver a la selección automática, usa el nombre real de la cuenta:

```text
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
```

El último comando desactiva **Auto Rotate** para Codex en ese Workspace; no mueve los agentes en ejecución. Son
controles estructurados de Kavor, no solicitudes de análisis a un modelo. Elegir otra cuenta respeta la misma
validación y el límite seguro entre turnos del desktop; una respuesta al comando no demuestra que el cambio haya terminado.

Añadir cuentas, iniciar o cerrar sesión, eliminar cuentas y elegir la participación o la cuenta predeterminada del
Workspace siguen siendo acciones del panel de Accounts en el desktop. Consulta [CodingAgent Accounts](./coding-agent-accounts.md#comandos-de-agent-kavor)
para ver la sintaxis completa, los ejemplos y el efecto de cada elección. Las reglas sobre quién puede enviar
comandos mediante el Channel no cambian.

## 3. Participa a distancia

Envía una solicitud clara al agente seleccionado. Por ejemplo:

En la conversación de WhatsApp vinculada, confirma el Workspace y el CodingAgent con `/context`. Envía el pedido a ese agente, con la tarea y sus evidencias alcanzables.

```prompt
Comprueba los resultados de las pruebas de la tarea en curso. No cambies código. Dime qué pasó, qué falló y qué
evidencias pudiste consultar.
```

**Resultado esperado:** La respuesta distingue aprobado, fallido y no verificado, citando la evidencia consultada. El pedido no autoriza cambios de código.

Sigue el progreso y la respuesta en la misma conversación. Si hace falta una decisión, responde a la pregunta
correspondiente mediante sus opciones o el formato solicitado. Confirmar el envío no confirma la finalización.

Los avisos breves de estado mantienen el contexto y el texto en la misma línea, sin quitar el formato. La línea
puede ajustarse de forma natural en una pantalla estrecha. Las respuestas completas, preguntas y contenidos largos
conservan su propia disposición.

[Mira una solicitud remota y la respuesta completa del CodingAgent →](https://agentkavor.com/es/videos/whatsapp-agent-interaction)

### Recibe avisos sin iniciar otra solicitud en WhatsApp

Puedes pedir al CodingAgent, incluso desde la sesión del desktop, que publique el resultado en una conversación ya
configurada. Por ejemplo:

En el desktop, pide el envío al CodingAgent responsable de la revisión. El grupo del Workspace debe estar configurado y habilitado; comprueba que sus participantes puedan recibir el resumen.

```prompt
Cuando termines esta revisión, envía el resumen al grupo de WhatsApp de este Workspace. No publiques en otras conversaciones.
```

**Resultado esperado:** El agente publica solo en el destino solicitado o explica por qué no pudo enviarlo. Completar la revisión y confirmar la publicación son resultados distintos.

El agente descubre las conversaciones habilitadas de su Workspace y elige un destino explícito. Un Channel puede
tener varias conversaciones: esto no envía a todos los grupos ni refleja automáticamente todo su terminal.

Este aviso no necesita responder a un mensaje previo de WhatsApp. En cambio, la respuesta a una solicitud recibida
regresa a la conversación original aunque después cambies el Workspace o el agente predeterminado. Citar una respuesta
conocida de un CodingAgent dirige la nueva solicitud a su autor, sin cambiar el agente predeterminado de la conversación.

### Envía audio conservando el original

Puedes enviar una grabación sola o con texto. Antes de entregar la solicitud a cualquier CodingAgent destinatario,
Kavor prepara automáticamente una transcripción y la identifica como texto generado a partir del audio. Conserva
la leyenda, el archivo original y la selección de destinatarios; la transcripción puede contener errores y no sustituye
la grabación.

Los agentes que reciben la misma solicitud usan el mismo resultado. Reenviar exactamente la misma solicitud o
recuperar su contexto reutiliza la referencia de ese audio, en vez de pedir una transcripción distinta para cada agente.
El límite de transcripción es **25 MB por audio (25.000.000 bytes)**, separado del almacenamiento de adjuntos originales.

Decir un comando como `/shutdown` no activa el control de Kavor: el habla transcrita es contenido de la solicitud,
no entrada para el intérprete de comandos. Para operar un control, usa el comando escrito correspondiente.

Si falla la preparación, recibes un aviso en la conversación original y los agentes en espera no reciben esa solicitud.
Sigue sus indicaciones o envía la solicitud en texto. Una grabación ilegible o sin voz puede requerir otro audio;
una demasiado grande puede sustituirse por otra más corta. Un fallo del servicio o un límite de uso no significa que
el CodingAgent empezara a trabajar. Si el resultado no está confirmado, no supongas éxito ni un reintento automático.

La transcripción usa un servicio autenticado en la nube y necesita red; no es totalmente offline. Tu equipo sigue
ejecutando los CodingAgents y el audio original mantiene el mismo plazo de acceso y caducidad.

### Imágenes, vídeos y otros archivos

También puedes intercambiar imágenes, vídeos y archivos, con o sin texto. Las imágenes requieren entrada nativa o una
herramienta de lectura compatible con el harness y el modelo elegidos. Los vídeos se entregan como archivos originales,
en la medida de lo posible, sin garantizar que cualquier agente pueda interpretarlos. Kavor no convierte vídeos ni
extrae fotogramas automáticamente.

Los adjuntos gestionados y sus copias temporales caducan **siete días después de completar el upload**. Leerlos,
reintentar o transcribirlos no renueva el plazo. Si caducan, envíalos otra vez; esto no elimina tus archivos originales
ni el texto de los mensajes.

## 4. Separa proyectos en grupos de Workspace

Usa un grupo para mantener una conversación vinculada a un proyecto sin cambiar de Workspace en Self-chat.

1. Tras vincular, selecciona los Workspaces deseados en **Workspace groups** y confirma la creación de grupos. También
   puedes gestionar la asociación en la pestaña Channels del Workspace y seleccionar un grupo existente.
2. Comprueba el resultado de cada Workspace. Un grupo nuevo se llama `Kavor · Nombre del Workspace`.
3. Abre el grupo y elige un CodingAgent con `/agents` y `/agent "Nombre"`, o menciónalo explícitamente.

El Workspace del grupo es fijo. Puedes cambiar el agente predeterminado dentro de ese proyecto; `/workspace` no
cambia el proyecto del grupo. Los Workspaces nuevos no reciben grupos automáticamente.

En Channels del Workspace, **Check group** comprueba si la cuenta vinculada aún puede acceder al grupo. Que no esté
disponible para esa cuenta no significa necesariamente que se haya eliminado. Un fallo temporal de conexión tampoco
elimina automáticamente la asociación.

Para cambiar la asociación, usa **Remove group link** y confirma. Solo desvincula ese Workspace: conserva el grupo de
WhatsApp, la vinculación del teléfono, el historial aceptado y los demás Workspaces. Después puedes elegir otro grupo
o crear uno. Si una creación no está confirmada, comprueba el resultado antes de repetirla.

[Mira cómo se crea y abre un grupo dedicado al Workspace →](https://agentkavor.com/es/videos/whatsapp-workspace-group)

**Elige con cuidado a los participantes.** Por defecto, **All messages** permite enviar solicitudes y responder
preguntas. **Mentions & replies** exige mencionar la cuenta vinculada, usar `@kavor` o responder citando un mensaje
de Kavor. Filtra la activación; no es un sistema de permisos individuales. Añadir personas puede delegar acceso al
trabajo de tus agentes.

## Conexión, privacidad y recuperación

- **Equipo no disponible:** WhatsApp no convierte Kavor en un servicio alojado. Recupera el desktop y comprueba el
  estado real antes de reenviar una acción que podría haber producido efectos.
- **Agente sin respuesta:** consulta `/context` y `/status`, y revisa autenticación, diálogos o aprobaciones pendientes
  en el desktop. El silencio no significa éxito ni permite repetir una solicitud destructiva.
- **Conexión interrumpida:** usa los controles de reconexión de Channels. Parar conserva el vínculo; desvincular es
  distinto. Una reconexión automática no debe deshacer una parada o desactivación explícita.
- **Pregunta o selección obsoleta:** consulta el contexto y pide una selección actual. No supongas que una opción
  antigua sigue señalando al mismo destinatario.
- **Privacidad:** ejecución y credenciales de vinculación quedan en el equipo, pero los mensajes usan los servicios
  de WhatsApp y los adjuntos, almacenamiento temporal gestionado por Kavor. El audio recibido también usa transcripción
  en la nube. Comparte solo contenido permitido.
- **Límites de WhatsApp:** se usan dispositivos vinculados, no la WhatsApp Business API alojada por Meta. Las reglas,
  restricciones y suspensiones de la cuenta siguen bajo el control de Meta.

## Continúa

- Entiende [qué puede hacer un CodingAgent en el grafo](./coding-agent.md).
- Organiza [mensajes y colaboración entre agentes](./coding-agents-and-canvas.md).
- Consulta [modos de entrega y Guardrails de las Connections](./connections.md).
- [Sugiere otro Channel con un caso de uso real](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
