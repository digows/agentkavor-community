---
id: adding-content
title: Añadir contenido al Canvas
description: Arrastra archivos, pega imágenes, enlaces y texto y reutiliza grupos de Nodes sin perder de vista sus fuentes y sesiones.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/es/docs/adding-content
---

# Añadir contenido al Canvas

Un PDF de referencia, una captura del problema, un enlace a la aplicación y una nota de investigación pueden formar
parte del mismo trabajo. No necesitas empezar creando cada Node a mano: arrastra archivos del sistema o pega el
contenido directamente en el Canvas.

El resultado depende del contenido y de dónde lo pegues. En el Canvas, pegar crea o localiza Nodes. Dentro de un
editor, Terminal, CodingAgent o página del WebBrowser, sigue siendo la acción de pegar de ese entorno.

## Arrastra archivos del sistema

1. Abre el Workspace de destino.
2. Arrastra uno o varios archivos desde Finder, Explorer u otro gestor de archivos hasta una zona del Canvas.
3. Suéltalos donde deba aparecer el conjunto. Los archivos se organizan en una cuadrícula y quedan seleccionados juntos.
4. Comprueba el resumen: Nodes añadidos, fuentes ya presentes y elementos omitidos.

Los archivos **permanecen donde están**. Kavor no los importa, copia ni mueve. Cada fuente tiene como máximo un Node
por Workspace: repetir el gesto selecciona y revela el Node existente, sin duplicarlo ni cambiar su posición.

El tipo se elige según la fuente:

- una Specification que pertenece al Workspace aparece como Specification;
- un archivo con formato de diagrama aparece como [Diagram](./diagrams.md), con la excepción de SVG;
- los demás aparecen como [File](./file.md). Un `.svg` común sigue siendo File; pide explícitamente un Diagram
  cuando quieras tratarlo de esa forma.

Las carpetas no se añaden. Si arrastras una carpeta junto con archivos, Kavor informa del elemento omitido y añade
los archivos válidos. Un archivo que no se pueda leer también aparece en el resumen con el motivo.

Arrastrar sobre la entrada de un Terminal o CodingAgent sigue insertando la ruta en esa sesión; no crea un Node en
el Canvas. Los paneles Files y Specs conservan sus propios gestos de arrastre.

### Archivos fuera del Workspace

Puedes referenciar un archivo sin colocarlo dentro de la carpeta del proyecto. El Node muestra la ruta absoluta y
el indicador `Outside this Workspace`. Dentro del Workspace, la ruta se muestra relativa a la raíz.

Los cambios del archivo externo actualizan su presentación en vivo; si se elimina la fuente, el Node indica que
no está disponible. No necesitas usar Reload con cada cambio. Una edición local sin guardar requiere resolver los
conflictos antes de sustituir el contenido.

Una referencia externa no convierte el archivo en parte del repositorio. Si compartes el proyecto o cambias de
máquina, comprueba que esa fuente seguirá existiendo en la ruta esperada.

## Pega archivos, imágenes, enlaces y texto

Con el foco en el Canvas, usa `⌘V` en macOS o `Ctrl+V` en Windows/Linux. El menú contextual también ofrece Paste en
el punto donde se abrió. Con el teclado, se pega en la posición del puntero dentro del Canvas o en el centro del
área visible; las acciones de pegado repetidas reciben un pequeño desplazamiento.

Cuando el portapapeles ofrece más de una representación, Kavor utiliza la primera aplicable en este orden:

| Contenido copiado | Resultado en el Canvas |
| --- | --- |
| Grafo de Nodes copiado o cortado en Kavor | Pega la selección siguiendo las reglas de abajo. |
| Archivos copiados en el gestor de archivos | Referencia los archivos, igual que al arrastrar y soltar. |
| Datos de imagen, como una captura sin archivo de origen | Guarda un PNG en el Workspace y crea su File Node. |
| Una URL aislada | Crea un WebBrowser abierto en esa dirección. |
| Texto | Crea una Sticky Note con el texto literal, sin interpretarlo como Markdown. |

Pega dentro de una sesión cuando quieras proporcionarle una entrada, no crear Nodes. Para archivos e imágenes en
la entrada de un harness, consulta [cómo pegar en el Terminal](./terminal.md#pega-archivos-e-imágenes-en-la-entrada-de-la-sesión).

### Dónde se guarda una imagen pegada

Los datos de imagen son la excepción a la regla de solo referenciar: aún no tienen un archivo que el Canvas pueda
usar. Kavor guarda un PNG en la carpeta `assets/` de la **primera Documentation root**. Con la raíz predeterminada
`docs/`, por ejemplo:

```text
docs/assets/pasted-image-20261030-093000.png
```

El nombre usa la fecha y la hora; si ya existe, recibe un sufijo numérico. No se sobrescribe ningún archivo
existente. La notificación muestra la ruta realmente guardada solo después de que existan el archivo y el Node.

El límite de datos de imagen en el portapapeles es **20 MB**. Un fallo al guardar se comunica como fallo de la imagen;
no se convierte silenciosamente en una Sticky Note. Este límite no sustituye los límites de visualización de abajo.

## Copia, corta y pega Nodes

Úsalo para reutilizar un loop que ya funciona, como Specification, Builder, Reviewer y Sticky Note.

1. Selecciona los Nodes que deban viajar juntos, con el foco fuera de editores y sesiones.
2. Usa `⌘C` / `Ctrl+C` para copiar o `⌘X` / `Ctrl+X` para cortar. El menú contextual ofrece las mismas acciones.
3. Sigue en el mismo Canvas o abre el Workspace de destino, incluso en otra ventana de Kavor.
4. Coloca el puntero y pega. Comprueba los participantes y las Connections antes de retomar el trabajo.

Solo las Connections cuyos **dos endpoints están seleccionados** forman parte de la captura. Una Connection
aislada no lleva los Nodes, y los enlaces con participantes fuera de la selección no se copian.

Copiar crea nuevas identidades y conserva la disposición relativa. La misma copia puede pegarse más de una vez.
Cortar en el mismo Canvas solo recoloca el grupo, manteniendo sus identidades y sesiones. Entre Workspaces, mueve
los Nodes y las Connections internas y elimina las Connections de frontera en el origen; el corte se consume tras
completarse correctamente. Antes de pegar, `Esc` en el Canvas de origen cancela el corte.

### Qué viaja con cada Node

| Node | Qué se conserva y qué no se clona |
| --- | --- |
| Sticky Note | Contenido y color. |
| File y Diagram | Referencia a la misma fuente, no una copia de los bytes. Se reutiliza un Node ya existente para esa fuente. |
| Specification | Se reutiliza en el Workspace propietario; en otro Workspace aparece como File. El lifecycle sigue en el propietario original. |
| Terminal | Configuración del shell e intención de apertura, no buffer ni historial. Al moverlo entre Workspaces, se cierra la sesión de origen. |
| CodingAgent | Configuración de provider, modelo y preferencias, no conversación, mensajes ni worktree aislado. Al moverlo, se cierra la sesión de origen; comprueba la raíz y la configuración en el destino. |
| Trigger | Una copia nace pausada, sin historial de disparos. Un corte conserva la configuración, pero no puede mover un disparo aún sin terminar. |
| WebBrowser | Pestañas, no popups, descargas ni observaciones. Las páginas se recrean en el destino. |

Los Guardrails y parámetros de las Connections acompañan al conjunto según las reglas del par. Cuando una
Specification se convierte en File en otro Workspace, su restricción de lectura se adapta a `file_read_only`;
Diagram conserva `diagram_read_only`. Revisa las restricciones en el destino antes de iniciar una tarea nueva.

El portapapeles de grafos pertenece a la ejecución actual de Kavor. Sustituirlo con otra copia o reiniciar la
aplicación invalida la captura; esto nunca borra el origen de un corte pendiente. No es un backup ni una exportación
entre máquinas.

Una captura admite hasta **512 Nodes, 2.048 Connections y 16 MiB**. Si la selección cortada cambia antes de pegarla,
o una fuente deja de existir, se rechaza la operación sin pegar parcialmente. Comprueba el origen y captura de nuevo.

## Entiende el preview de un archivo

El Node sigue representando la fuente real, aunque no disponga de un preview enriquecido:

- **Texto UTF-8:** editor, preview cuando esté disponible, guardado y gestión de conflictos.
- **Imágenes:** PNG, JPEG, GIF, WebP, BMP, ICO, AVIF y SVG. Un SVG en un File se muestra como imagen, no como markup
  de la interfaz de la aplicación.
- **PDF:** páginas visualizables en el Canvas, sin editor de formularios ni anotaciones y sin ejecutar JavaScript del PDF.
- **Diagramas:** presentación y edición específicas en la [guía de Diagramas](./diagrams.md).
- **Otros formatos:** tarjeta con icono o miniatura disponible en el sistema, nombre, tipo, tamaño, fecha de
  modificación y ruta. El audio y el vídeo aparecen en esta tarjeta; no hay reproducción integrada.

Las imágenes y los PDF tienen un límite de **32 MiB por archivo**; las imágenes también tienen un límite de
**16 megapíxeles**. Los formatos no soportados, límites excedidos o fallos de preview no convierten una fuente
existente en un archivo ausente: la tarjeta explica la situación y mantiene las acciones disponibles. `Retry` aparece
cuando otro intento puede ayudar, no para eliminar un límite de tamaño o formato.

Usa **Open** para abrir en la aplicación predeterminada, **Reveal in Finder** o su equivalente del sistema para
localizar la fuente y **Copy path** para copiar su ruta. Las miniaturas dependen del sistema: macOS y Windows pueden
proporcionarlas; cuando no haya una, el icono sigue identificando el archivo.

## Deshaz sin confundir Nodes y archivos

Cada gesto de añadir contenido o pegar un grafo genera una entrada en el historial del Canvas. Undo deshace los
Nodes creados por esa operación, sin borrar una fuente solo referenciada ni un Node que ya existía. Redo restaura
el resultado.

Una imagen guardada por el propio Kavor al pegar datos es diferente: Undo también elimina ese PNG y Redo lo restaura.
Si modificas la imagen o creas una referencia en conflicto después, Kavor puede rechazar el undo en lugar de borrar
trabajo posterior. Comprueba el motivo; no trates Undo como una eliminación incondicional de archivos.

Al cortar entre Workspaces, Undo necesita restaurar ambos lados. Un cambio posterior en conflicto también puede
impedir la operación, sin restaurar solo la mitad de un grafo.

## Usa el contenido con un CodingAgent

Arrastrar, pegar y usar el portapapeles de grafos son gestos humanos. Un CodingAgent añade fuentes por ruta, no opera
tu portapapeles. Después de añadir el material, conecta solo lo que deba participar en el trabajo.

Para una primera lectura, indica al CodingAgent qué Nodes acabas de añadir y hazlos alcanzables. No incluyas
credenciales ni autorices cambios implícitamente.

```prompt
Examina los Nodes que identifiqué en mi grafo alcanzable.
Separa fuente canónica, referencia visual, página viva y nota de trabajo.
Explica cómo ayuda este material en la tarea que describí e indica qué no pudiste leer.
No modifiques archivos, no ejecutes comandos ni crees Connections; presenta primero tu lectura.
```

**Resultado esperado:** un mapa breve del material realmente consultado, con lagunas explícitas. El preview no
garantiza que el harness pueda interpretar todos los formatos, y añadir un Node no autoriza el acceso a contenido
fuera del grafo.

## Continúa

- Usa [File como contexto y alcance](./file.md), sin convertir una referencia en una copia descartable.
- Crea y revisa [Diagramas](./diagrams.md) con un CodingAgent.
- Consulta la [matriz de Connections](./connections.md) antes de conectar recursos.
- Entiende [qué ven los agentes en el Canvas](./coding-agents-and-canvas.md).
