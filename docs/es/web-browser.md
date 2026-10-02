---
id: web-browser
title: "WebBrowser: desarrolla y prueba delante de tu agente"
description: Usa el WebBrowser compartido de Kavor para desarrollar aplicaciones web, reproducir bugs, depurar páginas y demostrar flujos E2E.
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/es/docs/web-browser
---

# WebBrowser pone la aplicación delante de ti y de tu agente

WebBrowser es una superficie Chromium viva dentro del Canvas. Un CodingAgent conectado puede observar, interactuar,
esperar, depurar y probar la página que tú también estás viendo.

Consulta la [demostración de WebBrowser en Kavor](https://agentkavor.com/es/videos/web-browser-node) en otra pestaña
mientras lees esta guía.

![Un CodingAgent conectado al WebBrowser que comparte la misma página visible con la persona](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

## El browser como herramienta de desarrollo

Para desarrollar una aplicación web, un CodingAgent necesita más que archivos. Necesita abrir la aplicación, interactuar
con ella, esperar estados reales e investigar qué ocurrió en el browser.

Con una Connection entre CodingAgent y WebBrowser, el agente dispone de una superficie amplia de operaciones mediadas
por Kavor:

- **observar:** leer el estado de la página, obtener un snapshot de accesibilidad y capturar screenshots;
- **interactuar:** hacer clic, rellenar campos, insertar texto, pulsar teclas, seleccionar opciones, marcar controles,
  desplazarse, arrastrar, subir archivos y responder a diálogos;
- **sincronizar:** esperar un selector, texto, URL, carga, inactividad de red o condición específica;
- **depurar:** consultar mensajes de consola, requests de red y cuerpos de respuesta retenidos;
- **probar:** reproducir un bug, ejecutar un flujo E2E y conservar evidencia visual;
- **aislar escenarios:** bloquear, continuar o simular respuestas de red durante una prueba controlada;
- **organizar páginas:** abrir, seleccionar y cerrar pestañas, seguir descargas y atender desafíos de autenticación.

El objetivo no es ocultar el browser detrás de una automatización. Es hacer verificables el estado y las acciones
mientras trabaja el agente.

## Un loop práctico para una aplicación web

Empieza con un WebBrowser y un CodingAgent en el mismo componente. Si la aplicación se ejecuta localmente, conecta
también el Terminal que inicia el servidor.

Pide al agente que observe la página antes de actuar, reproduzca el camino que falla, recopile evidencia de consola,
red o screenshot, cambie el código dentro del alcance definido y valide de nuevo el flujo completo. Registra el
resultado y los riesgos restantes en una [Sticky Note](./sticky-note.md).

Un prompt inicial puede ser:

> Abre la aplicación conectada en WebBrowser. Primero observa la página y reproduce el flujo sin cambiar código. Después describe la causa probable, propone el cambio mínimo y valida el recorrido completo con evidencia visual y de consola.

## Tres ejemplos para desarrollar con evidencia

### Reproducir un bug de formulario

Con el servidor en el Terminal y la aplicación abierta en WebBrowser, pide:

> Reproduce el envío con un e-mail inválido y luego con uno válido. Antes de editar código, registra el estado de los
> campos, el mensaje mostrado y si hubo request. Después de la corrección autorizada, repite ambos caminos y prueba
> corregir la dirección sin recargar la página.

Espera comportamiento visible y requests observados. Un screenshot del mensaje no demuestra por sí solo que se
bloqueó el envío; la red ayuda a verificar ese criterio.

### Descubrir por qué la página quedó vacía

> Observa la página, consulta los errores del console e identifica la petición relacionada con el contenido ausente.
> Distingue falla de red, respuesta inesperada y error de renderizado. Registra el URL relevante, el status y la
> evidencia disponible. Si no puedes observar el cuerpo de la respuesta, indica esa limitación.

Espera señales que permitan distinguir las causas antes de cambiar código. El contenido ausente no basta para
concluir que falló el backend.

### Validar la recuperación de una falla de red

En una aplicación de pruebas bajo tu control, pide un escenario temporal:

> Simula una respuesta de error solo en la petición de carga definida en la Specification. Verifica el mensaje de
> falla y la opción de reintentar. Después elimina la regla temporal y confirma que el flujo normal se recupera.
> Conserva los resultados y termina la prueba con las reglas de red limpias.

Espera cobertura de falla y recuperación en un escenario aislado. Usa endpoints y datos de prueba; la simulación debe
ser suficientemente específica para no cambiar peticiones ajenas al escenario.

## El mismo browser para la persona

También puedes usar WebBrowser como una página normal dentro del Workspace: abrir documentación, ver un vídeo o dejar
una referencia abierta mientras trabajan los agentes.

YouTube y otras páginas comunes son usos naturales. Servicios de streaming como Netflix pueden requerir autenticación,
DRM, permisos o condiciones específicas del sistema; Kavor no promete reproducción para un servicio concreto.

## Una superficie compartida, no un browser invisible

El agente y la persona comparten la misma página viva. Puedes ver las acciones e intervenir; el agente no tiene una
ventana privada; las pestañas persistentes pertenecen al perfil propio del browser de Kavor; y las extensiones, historial
y cookies del Chrome externo no se reutilizan automáticamente.

El contenido de las páginas no es confiable. WebBrowser tampoco es un servicio de browser remoto ni un permiso general
para operar el filesystem de la máquina.

## Límites y cuidado

CAPTCHAs, passkeys, permisos del sitio, certificados y prompts de autenticación pueden requerir tu intervención. Las
referencias de snapshot expiran después de navegar o cambiar el DOM. Las reglas de red son temporales y deben limpiarse
al terminar la prueba. El perfil de desarrollo acepta certificados autofirmados, expirados y de autoridades privadas,
lo que reduce la protección frente a una red hostil. Un snapshot puede omitir frames cross-origin y los historiales de
console/red están limitados; el agente debe informar lo observado y no inventar lo que no pudo inspeccionar.

Al cambiar de Workspace en la misma ventana, Kavor conserva la página presentada. El CodingAgent puede continuar
operándola mientras otro Workspace está visible. Cerrar la pestaña, eliminar el Node o terminar la sesión acaba esa
continuidad.

## Connection y Guardrail

El par directo CodingAgent + WebBrowser coloca el browser en el componente alcanzable del agente. El grafo puede incluir
Specification, Files, Terminal, Sticky Note y otros CodingAgents mediante caminos válidos; la proximidad visual o una
mención no crean acceso.

WebBrowser no tiene un Guardrail específico propio hoy. Esto no elimina los límites de los recursos del mismo grafo:
un File read-only sigue siendo read-only, el Terminal conserva sus controles y la Specification sigue su lifecycle.

## Continúa

- Consulta la [matriz de Connections](./connections.md) para el contrato de CodingAgent + WebBrowser.
- Lee [cómo ven y construyen el Canvas los CodingAgents](./coding-agents-and-canvas.md).
- Combina browser, código y evidencia en [tu primer loop](./first-loop.md).
- Usa una [Specification](./specification.md) para definir el comportamiento esperado antes de probar la aplicación.
