---
id: agent-kavor
title: "Agent Kavor: habla con tus agentes mediante Channels"
description: Vincula WhatsApp, elige un CodingAgent y participa desde Self-chat o un grupo dedicado al Workspace.
kind: guide
lastReviewedAt: 2026-10-16
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

## 3. Participa a distancia

Envía una solicitud clara al agente seleccionado. Por ejemplo:

> Comprueba los resultados de las pruebas de la tarea en curso. No cambies código. Dime qué pasó, qué falló y qué
> evidencias pudiste consultar.

Sigue el progreso y la respuesta en la misma conversación. Si hace falta una decisión, responde a la pregunta
correspondiente mediante sus opciones o el formato solicitado. Confirmar el envío no confirma la finalización.

[Mira una solicitud remota y la respuesta completa del CodingAgent →](https://agentkavor.com/es/videos/whatsapp-agent-interaction)

Puedes intercambiar imágenes, vídeos, audio y archivos, con o sin texto. Interpretarlos depende del harness y sus
herramientas; Kavor no promete transcripción automática ni comprensión de cualquier formato por cualquier agente.

Los adjuntos gestionados y sus copias temporales caducan **siete días después de completar el upload**. Leerlos o
reintentar no renueva el plazo. Si caducan, envíalos otra vez; esto no elimina tus archivos originales ni el texto de los mensajes.

## 4. Separa proyectos en grupos de Workspace

Usa un grupo para mantener una conversación vinculada a un proyecto sin cambiar de Workspace en Self-chat.

1. Tras vincular, selecciona los Workspaces deseados en **Workspace groups** y confirma la creación de grupos. También
   puedes gestionar la asociación en la pestaña Channels del Workspace y seleccionar un grupo existente.
2. Comprueba el resultado de cada Workspace. Un grupo nuevo se llama `Kavor · Nombre del Workspace`.
3. Abre el grupo y elige un CodingAgent con `/agents` y `/agent "Nombre"`, o menciónalo explícitamente.

El Workspace del grupo es fijo. Puedes cambiar el agente predeterminado dentro de ese proyecto; `/workspace` no
cambia el proyecto del grupo. Los Workspaces nuevos no reciben grupos automáticamente.

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
  de WhatsApp y los adjuntos, almacenamiento temporal gestionado por Kavor. Comparte solo contenido permitido.
- **Límites de WhatsApp:** se usan dispositivos vinculados, no la WhatsApp Business API alojada por Meta. Las reglas,
  restricciones y suspensiones de la cuenta siguen bajo el control de Meta.

## Continúa

- Entiende [qué puede hacer un CodingAgent en el grafo](./coding-agent.md).
- Organiza [mensajes y colaboración entre agentes](./coding-agents-and-canvas.md).
- Consulta [modos de entrega y Guardrails de las Connections](./connections.md).
- [Sugiere otro Channel con un caso de uso real](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
