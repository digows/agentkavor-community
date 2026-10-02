---
id: file
title: "File: contexto y alcance en el Canvas"
description: Usa un File para mantener visible una fuente canónica, delimitar el contexto de un CodingAgent y pasar su ruta a un Terminal.
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/es/docs/file
---

# Un File es un archivo — y eso ya es potente

Un File no es un adjunto descartable. Representa una fuente canónica del filesystem dentro del Canvas, dejando claro
qué material debe leer, revisar, editar o usar como entrada el trabajo.

![Un PDF en un File Node conectado a un CodingAgent en el Canvas](https://media.agentkavor.com/demos/pdf-canvas-agent/poster.7306bdccc7f5.jpg)

[Ve un PDF participar en el trabajo del Canvas →](https://agentkavor.com/es/videos/pdf-canvas-agent)

*El File mantiene el material visible mientras organizas agentes, decisiones y ejecución a su alrededor.*

## Qué hace un File

Por sí solo, un File permite visualizar y trabajar con una fuente del Workspace. Según el formato, Kavor ofrece
edición de texto, búsqueda, preferencias de lectura y preview enriquecido.

Los formatos de texto incluyen Plain Text, Markdown, JSON, SQL, TypeScript, JavaScript, YAML, Shell, HTML y CSS. Las
imágenes y los PDF pueden visualizarse en el Canvas; SVG puede alternar entre preview y source.

El File sigue apuntando a la fuente real. Si el archivo cambia fuera de Kavor, el Node refleja el cambio y avisa
cuando una edición local debe reconciliarse. Así no confundes una copia de contexto con el artefacto que realmente se
versionará.

## Un File como alcance explícito

Conectado a un CodingAgent, un File convierte una intención genérica en una fuente concreta de trabajo. Puede
delimitar un módulo, proporcionar un contrato de entrada, mantener una imagen o PDF disponible para analizar o
identificar la configuración que debe revisarse.

Un pedido inicial puede ser:

> Lee el File conectado como la fuente canónica de esta tarea. Explica qué debe cambiar, conserva el alcance y edita solo después de que confirme el plan.

Cuando el agente solo necesita consultar el material, usa el Guardrail file_read_only en la Connection directa. El
agente puede alcanzar el File, pero no cambiar su fuente mediante operaciones mediadas por Kavor.

## Un File como entrada de Terminal

Una Connection File + Terminal exporta la ruta absoluta canónica del archivo a la sesión mediante un nombre de variable
de entorno que eliges tú. El valor es la ruta, no una copia del contenido.

La ruta se aplica cuando inicia la sesión del Terminal. Si cambias la Connection o su parámetro mientras el shell ya
está abierto, la interfaz informa que la sesión debe reiniciarse para recibir el nuevo valor.

Esto sirve para scripts, SQL, configuraciones e informes: el File mantiene la fuente explícita en el Canvas y el
Terminal ejecuta el comando sin copiar rutas entre ventanas.

## Tres formas de usarlo

### Revisar una fuente existente

Conecta el File a un CodingAgent y pide una lectura orientada al riesgo. Para una revisión visual, mantén el File, una
Sticky Note para findings y un Terminal para las comprobaciones en el mismo grafo.

### Implementar con alcance claro

Conecta una Specification, el File y el Builder. La Specification explica el resultado; el File identifica la
fuente concreta; el CodingAgent realiza el cambio y registra la evidencia en los lugares adecuados.

### Convertir un artefacto en entrada ejecutable

Conecta un File SQL o de script a un Terminal, nombra la variable y ejecuta el comando desde el shell. Si también hay un
agente conectado, puede ayudar a interpretar la salida mientras sigues el proceso.

## Ejemplos: un Node, tres tipos de entrada

### Código como foco de una revisión

Añade el cliente HTTP como File, conecta un Reviewer y deja una Sticky Note alcanzable para los findings. Pide:

> Revisa el File del cliente HTTP, especialmente timeout, retry y tratamiento de errores. Úsalo como foco del
> análisis. Si una conclusión depende de otro archivo, identifica esa dependencia antes de ampliar la investigación.
> Registra solo findings respaldados por código o reproducción y no implementes correcciones.

Espera una revisión localizada con escenario y referencia al código relevante. El File explicita el foco; no es un
sandbox para las herramientas nativas del harness. Delimita el alcance en la petición y utiliza el Guardrail
adecuado para las operaciones de Kavor.

### PDF o imagen como referencia

Mantén un PDF de requisitos o una imagen de referencia en el mismo grafo que la Specification y el CodingAgent:

> Compara el material del File con la Specification. Separa requisitos explícitos, interpretaciones y dudas. Para
> cada divergencia, identifica la página o elemento observado y registra la pregunta en la Sticky Note. No inventes
> contenido que no puedas leer.

Espera una comparación verificable, no solo un resumen. La interpretación depende del formato y de las herramientas
del harness; el preview de Kavor mantiene la referencia visible para ti.

### Un script como entrada del Terminal

Crea un File para un pequeño script Node.js y configura su Connection al Terminal con el nombre `CHECK_SCRIPT`:

```javascript
console.log('Canvas file connection is working');
```

Inicia la sesión del Terminal después de configurar la Connection y ejecuta:

```sh
test -n "$CHECK_SCRIPT" && node "$CHECK_SCRIPT"
```

Espera `Canvas file connection is working`. La variable contiene la ruta del script. Si está vacía, comprueba el
nombre en la Connection y reinicia la sesión para recibir la configuración. Este ejemplo usa un shell POSIX y
requiere Node.js; en PowerShell, consulta `$env:CHECK_SCRIPT` y ejecuta `node $env:CHECK_SCRIPT`.

## Límites importantes

- una Connection no convierte el File en acceso genérico al filesystem; el Node sigue representando su fuente canónica configurada;
- no todos los formatos binarios se pueden editar como texto;
- la ruta exportada al Terminal no contiene el cuerpo del archivo;
- se necesita una Connection directa con CodingAgent para un Guardrail específico del File;
- los cambios externos o concurrentes deben reconciliarse antes de reemplazar una edición local;
- estar cerca de un File en el Canvas no concede acceso a su contenido.

## Continúa

- Consulta la [matriz de Connections](./connections.md), incluyendo File + Terminal y CodingAgent + File.
- Aprende [cómo ven el grafo los CodingAgents](./coding-agents-and-canvas.md).
- Combina un File con una [Sticky Note](./sticky-note.md) para separar fuente canónica y memoria de trabajo.
- [Cierra tu primer loop](./first-loop.md) con intención, implementación, evidencia y revisión.
