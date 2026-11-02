---
id: diagrams
title: "Diagramas en Kavor: de la idea al dibujo, sin salir del grafo"
description: Crea diagramas con CodingAgents, edita la fuente o un dibujo Excalidraw y comprueba el resultado en el Canvas, con ejemplos por formato.
kind: guide
lastReviewedAt: 2026-11-02
canonicalUrl: https://agentkavor.com/es/docs/diagrams
---

# Diagramas: convierte una explicación en algo que puedas ver

Una arquitectura, una máquina de estados o un modelo de datos resulta más fácil de discutir cuando la persona y el
agente miran el mismo dibujo. Un **Diagram** mantiene la fuente de ese dibujo en un archivo y su presentación en el
Canvas. Puedes pedir una propuesta, editar la fuente, ver el resultado y revisar la decisión sin cambiar de contexto.

El dibujo no sustituye a la Specification: puede revelar una ambigüedad, explicar una decisión o dar forma a una
alternativa. El contrato sigue en el lugar adecuado.

[![Un Diagram Mermaid conectado a un CodingAgent en el Canvas, junto a una Sticky Note con el contexto de la demostración.](https://media.agentkavor.com/editorial/diagrams/overview/image.ffa637039fea.jpg)](https://media.agentkavor.com/editorial/diagrams/overview/native.e719329c8ac6.png)

El dibujo participa en el mismo grafo de trabajo que el CodingAgent y la Sticky Note. La fuente sigue en un archivo.

## Crea o añade un Diagram

### Desde la interfaz

1. Haz clic en **Diagram** en la barra de herramientas del Canvas o abre el panel **Diagrams**, justo después de **Specs**, y usa **New diagram**.
2. Selecciona el formato e introduce un nombre. Mermaid es el predeterminado.
3. Comprueba la ruta y la extensión mostradas antes de crear. `Enter` confirma; `Escape` cancela.
4. Escribe en **Source** o empieza a dibujar, en el caso de Excalidraw.

También puedes arrastrar **Diagram** desde la barra de herramientas hasta el punto deseado del Canvas. El formulario
se abre en el panel y conserva ese punto hasta la confirmación; al hacer clic en la barra, la creación usa el área visible.

El formulario no tiene un campo de carpeta separado. Desde la barra de herramientas o la acción general **New
diagram**, usa el destino configurado en el Workspace. Desde el menú **New Diagram…** de una carpeta, usa esa
carpeta. Comprueba la ruta mostrada antes de confirmar. Las colisiones de nombres y los fallos se muestran en el
formulario, sin sobrescribir archivos. draw.io no aparece entre los formatos de creación porque su editor es externo.

[![Panel Diagrams con el formulario New diagram abierto y la lista de formatos disponibles para crear.](https://media.agentkavor.com/editorial/diagrams/panel-create/image.5cafbedbecc9.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-create/native.fcf3ecd7562d.png)

Elige un formato para crearlo desde el panel. draw.io se abre a partir de un archivo existente, por eso no aparece
en esta lista de creación.

### Elige la carpeta de nuevos diagramas

Abre **Workspace Settings → Documentation roots**. Specifications y Diagrams comparten estas raíces; no existe una
lista separada de raíces para Diagramas.

El campo **Diagrams folder** es relativo a la **primera Documentation root**. El valor predeterminado es `diagrams`:
con la raíz `docs`, el resultado es `docs/diagrams/`. Puedes introducir una carpeta anidada, como
`architecture/diagrams`, y comprobar el destino calculado antes de guardar. Usa `.` para crear directamente en la
primera raíz, sin una subcarpeta.

Cambiar este campo o reordenar las roots solo modifica el destino de las próximas creaciones. No se mueven archivos
ni Nodes existentes. El panel descubre diagramas dentro de las Documentation roots; un archivo fuera de ellas sigue
pudiendo abrirse en el Canvas mediante su ruta explícita. La configuración de descubrimiento no es un nuevo permiso
de filesystem.

### Desde un archivo existente

Usa **Add to Canvas** en el panel Diagrams o [arrastra un archivo al Canvas](./adding-content.md). La extensión
selecciona el formato, incluidas las extensiones compuestas como `.vl.json`. La fuente permanece en su ubicación
original; los cambios en disco actualizan el Node.

**SVG es una elección explícita:** abrir o arrastrar un `.svg` normalmente crea un File, no un Diagram. Al pedir a un
CodingAgent que lo añada, indica que quieres un Diagram. Si el mismo archivo ya está representado por un File, esta
operación convierte el Node conservando su identidad, posición, tamaño y Connections, sin modificar el archivo.

Cada fuente tiene como máximo un Node por Workspace. Renombrar un Diagram renombra su fuente; eliminar el Node no
borra el archivo.

## Trabaja con un CodingAgent

Describe qué quieres comunicar, no solo el formato. «Muestra la decisión y los caminos de fallo de este flujo»
aporta más contexto que «haz un diagrama bonito». Usa ejemplos pequeños y comprueba que el dibujo corresponde al sistema.

Los prompts siguientes son puntos de partida con datos ficticios. Pégalos en el CodingAgent responsable y ajusta
nombres y rutas antes de enviarlos. Para crear el Node, necesita `Allow workspace editing`; los recursos existentes
deben ser alcanzables y sus Guardrails siguen vigentes. Sin autorización estructural, pide solo la fuente u orientación.

Si no indicas una ruta, el CodingAgent consulta las **Documentation roots** y **Diagrams folder** del Workspace y usa
el mismo destino que la interfaz: `docs/diagrams/` en la configuración predeterminada. Una ruta explícita en el prompt
tiene prioridad. Los ejemplos usan rutas explícitas en `docs/diagrams/`; adáptalas si quieres mantener los archivos
dentro de otra raíz configurada y encontrarlos desde el panel.

### Verifica el dibujo, no solo la sintaxis

Un CodingAgent puede escribir la fuente, añadir su Diagram al Canvas y consultar el resultado de la renderización
actual: `rendered`, `failed` o `not_rendered`. Si falla, recibe el error del engine y la línea cuando está disponible.

Una fuente que parece válida no demuestra que se haya renderizado. `not_rendered` significa que no hay una observación
válida para el archivo actual; abre o revela el Diagram para que se muestre. Los resultados de otra revisión del
archivo, los previews aún sin guardar y las observaciones anteriores a un reinicio no cuentan como éxito actual.

Si el Diagram es alcanzable con `diagram_read_only` en la Connection directa, el agente debe conservar la fuente y
no puede renombrar ni eliminar el Node. No uses el prompt ni herramientas del filesystem para evitar esta restricción.

### Del pedido al dibujo en el Canvas

[Mira cómo un CodingAgent crea un diagrama de entidades de CRM en el Canvas](https://agentkavor.com/es/videos/creating-diagram).

Una demostración práctica comienza con un CodingAgent y una Sticky Note de contexto. El usuario pide un diagrama
básico de entidades de CRM; el agente usa Excalidraw, escribe la fuente y añade un Diagram conectado a él en el
Canvas. Como en los ejemplos de abajo, crear el Node depende del permiso de edición del Workspace.

El resultado reúne **Account**, **Contact**, **Lead**, **Opportunity** y **Activity**, con campos y relaciones
ficticios. Comprueba el dibujo antes de usarlo como modelo de tu proyecto: ilustra una propuesta, no un análisis de
tu schema real. La demostración sigue la creación hasta el resultado visual; la edición, la exportación y la
organización de carpetas tienen sus propios procedimientos en esta guía.

La grabación es silenciosa y está en inglés. Los tramos de escritura y espera se han acelerado; el resultado final
aparece a velocidad normal. El texto anterior permite seguir la demostración sin depender del vídeo.

## Elige el formato según lo que necesites explicar

Todos los ejemplos piden fuente y comprobación en el Canvas, no ejecución de código de tu aplicación. La descarga
inicial de los recursos necesarios puede requerir red; consulta [descargas y modo offline](#descargas-privacidad-y-modo-offline).

[![Diagram Nodes que muestran ejemplos de D2, WaveDrom, draw.io, Mermaid y PlantUML en el mismo Canvas.](https://media.agentkavor.com/editorial/diagrams/formats/image.a4d2d23386fa.jpg)](https://media.agentkavor.com/editorial/diagrams/formats/native.6ceae5434ad2.png)

Distintos formatos pueden convivir en el Canvas. Estos ejemplos son ilustrativos; los formatos y límites se
detallan a continuación.

### Mermaid — `.mmd`, `.mermaid`

Un buen comienzo para flujos, secuencias y estados. Usa los tipos disponibles en el engine integrado en Kavor; no
asumas que una sintaxis recién añadida a Mermaid ya está disponible en él. Pega el prompt en el CodingAgent para
crear un flujo ficticio pequeño.

```prompt
Crea docs/diagrams/checkout.mmd en Mermaid: carrito → pago → confirmación, con un camino de pago rechazado.
Añádelo como Diagram a mi grafo y comprueba el resultado de la renderización actual.
Corrige los errores reportados; no modifiques la aplicación ni declares éxito sin observar el resultado.
```

**Resultado esperado:** un flujo con un camino de fallo legible y el resultado de renderización comunicado. Si aún
no hay una observación válida, el agente informa `not_rendered`, no un éxito supuesto.

### PlantUML — `.puml`, `.plantuml`

Para UML, secuencias, Gantt, mapas mentales y wireframes. El engine JavaScript no exige instalar Java. Las bibliotecas
estándar, incluida C4, se obtienen bajo demanda; el primer uso de C4 puede requerir una descarga adicional. Pega el
prompt en el CodingAgent.

```prompt
Crea docs/diagrams/checkout-context.puml usando la biblioteca C4: cliente, tienda y proveedor externo de pagos.
Identifica las relaciones, añade el archivo como Diagram y consulta el resultado actual.
Si falta una biblioteca o hay un error, comunica el motivo antes de afirmar que el dibujo está listo.
```

**Resultado esperado:** un contexto C4 sencillo, con la dependencia externa explícita. La falta de red o de una
biblioteca no debe confundirse con la validación del dibujo.

### Graphviz — `.dot`, `.gv`

Para grafos en los que la disposición de los vértices ayuda a entender dependencias. Los layouts son los incluidos
en el engine integrado. Pega el prompt en el CodingAgent; en este ejemplo, las dependencias son ficticias, no
inferidas de tu repositorio.

```prompt
Crea docs/diagrams/dependencies.dot: web depende de api; api depende de billing y catalog; ambos dependen de storage.
Organiza el grafo de izquierda a derecha, añádelo como Diagram y comprueba la renderización actual.
No inventes dependencias del proyecto real; este es solo el ejemplo descrito.
```

**Resultado esperado:** un grafo de dependencias etiquetado, sin convertir una ilustración en un diagnóstico del proyecto.

### D2 — `.d2`

Para arquitectura y relaciones entre componentes. Kavor ofrece los layouts **Dagre y ELK**; **TALA no está soportado**.
Pega el prompt en el CodingAgent y mantén explícita la elección de layout cuando sea importante.

```prompt
Crea docs/diagrams/order-service.d2 con layout Dagre: cliente, API, cola y worker, mostrando el recorrido de un pedido.
Añádelo como Diagram y comprueba la renderización actual. Usa solo recursos compatibles con Dagre o ELK, sin TALA.
Comunica cualquier error y no modifiques la infraestructura real.
```

**Resultado esperado:** un dibujo de arquitectura legible, sin depender de TALA ni crear los servicios ilustrados.

### SVG — `.svg`

Para dibujos vectoriales en los que quieras controlar formas, etiquetas y composición directamente. La
renderización es integrada. Pega el prompt en el CodingAgent y pide explícitamente un **Diagram**, conservando la
distinción respecto a un File común.

```prompt
Crea docs/diagrams/review-cycle.svg: tres cajas, Builder, Reviewer y decisión humana, conectadas en ese orden.
Usa SVG autocontenido, sin scripts ni recursos remotos, y añádelo explícitamente como Diagram, no como File.
Comprueba la renderización actual y comunica el resultado sin modificar otros Nodes.
```

**Resultado esperado:** un vector presentado como Diagram. La extensión `.svg` por sí sola no cambia el tipo de un File.

### Excalidraw — `.excalidraw`

Para un dibujo exploratorio que quieras seguir manipulando visualmente. El archivo contiene la escena Excalidraw;
es el formato con editor visual en Kavor. Pega el prompt en el CodingAgent para preparar una escena sencilla.

```prompt
Crea docs/diagrams/review-workshop.excalidraw con una escena válida: idea, implementación y revisión, con flechas y etiquetas.
Añádelo como Diagram y comprueba la renderización. Mantén el dibujo sencillo para que pueda continuar con Edit drawing.
No sustituyas un archivo existente ni afirmes que mi revisión ya se ha realizado.
```

**Resultado esperado:** una escena que puedes abrir en `Edit drawing`. Generar una escena no resuelve por sí solo la
calidad del flujo representado; revísala antes de usarla como decisión.

### draw.io — `.drawio`

Para visualizar diagramas de este formato, incluidas páginas y capas. **View only**: no hay editor visual ni edición
del XML en Source de Kavor. Produce o edita el archivo con una herramienta externa, incluido el CodingAgent mediante
el filesystem cuando esté autorizado. Pega el prompt en el agente para generar un ejemplo nuevo, no sobrescribir
un documento tuyo.

```prompt
Crea docs/diagrams/order-overview.drawio como un archivo draw.io válido con una página: cliente → API → base de datos.
Añade el archivo existente como Diagram y comprueba la renderización actual.
No uses New diagram para draw.io ni prometas edición visual dentro de Kavor.
```

**Resultado esperado:** una página consultable en el Node. Para modificar el dibujo después, usa la aplicación
externa o una edición autorizada de la fuente; Kavor refleja el cambio en el archivo.

### Vega-Lite / Vega — `.vl.json`, `.vg.json`

Para gráficos de datos. `.vl.json` selecciona Vega-Lite; `.vg.json`, Vega. Son gramáticas distintas; no basta con
cambiar la extensión. Para un ejemplo sin dependencia de red, pega el prompt en el CodingAgent y pide datos integrados.

```prompt
Crea docs/diagrams/build-times.vl.json en Vega-Lite: barras para tiempos de build ficticios de 12, 18 y 9 segundos.
Incluye los datos en el propio JSON, nombra los ejes y no busques datasets externos.
Añádelo como Diagram y comprueba la renderización actual.
```

**Resultado esperado:** un gráfico que permite comparar, con unidades claras. Para trabajar en Vega, pide
explícitamente esa gramática y una ruta `.vg.json`. Un dataset remoto sigue dependiendo de la red, incluso con el
engine en caché.

### WaveDrom — `.wavedrom`

Para temporización de señales digitales. La fuente que usa Kavor es JSON válido, no un script JavaScript. Pega el
prompt en el CodingAgent para visualizar un handshake sencillo.

```prompt
Crea docs/diagrams/handshake.wavedrom en JSON válido con clock, request y acknowledge a lo largo de ocho ciclos.
Deja explícito cuándo acknowledge responde a request; no ejecutes ningún script.
Añádelo como Diagram y consulta el resultado actual, corrigiendo los errores reportados por el engine.
```

**Resultado esperado:** señales alineadas en el tiempo. El dibujo explica el ejemplo; no demuestra una medición de hardware.

### nomnoml — `.nomnoml`, `.noml`

Para bocetos UML concisos. La sintaxis es propia de nomnoml, no intercambiable con PlantUML. Pega el prompt en el CodingAgent.

```prompt
Crea docs/diagrams/order-model.nomnoml con Order, OrderItem y Product, mostrando las relaciones y unos pocos atributos.
Usa la sintaxis nomnoml, añádelo como Diagram y comprueba la renderización actual.
Mantén el modelo ficticio; no modifiques clases ni el schema del proyecto.
```

**Resultado esperado:** un boceto de entidades para discutir, sin convertir el dibujo en una implementación automática.

### Pikchr — `.pikchr`

Para composiciones técnicas en un lenguaje de dibujo de estilo PIC. Usa la gramática Pikchr, no un programa PIC
arbitrario. Pega el prompt en el CodingAgent para un dibujo pequeño de procesamiento.

```prompt
Crea docs/diagrams/processing.pikchr con entrada, transformación y salida, usando cajas etiquetadas y flechas.
Usa sintaxis Pikchr, añádelo como Diagram y comprueba la renderización actual.
Si el engine rechaza la fuente, corrige el error observado antes de comunicar el resultado.
```

**Resultado esperado:** una composición vectorial sencilla. Una sintaxis visualmente plausible no sustituye la
observación del resultado del engine.

### Svgbob — `.bob`

Para convertir un boceto ASCII en un dibujo vectorial. La alineación del texto forma parte de la fuente. Pega el
prompt en el CodingAgent y conserva la alineación en el archivo.

```prompt
Crea docs/diagrams/request-path.bob en ASCII: dos cajas etiquetadas Client y Server, conectadas por una flecha.
Conserva la alineación, añádelo como Diagram y comprueba la renderización actual.
No pegues solo una imagen: mantén el boceto textual como fuente editable.
```

**Resultado esperado:** un dibujo a partir del boceto textual. Los cambios en los espacios pueden cambiar la geometría.

### DBML — `.dbml`

Para discutir tablas, columnas y relaciones. La fuente es DBML, no SQL; renderizar no crea tablas ni ejecuta una
migration. Pega el prompt en el CodingAgent usando un modelo ficticio.

```prompt
Crea docs/diagrams/shop-schema.dbml con customers, orders y order_items, indicando claves y relaciones.
Añádelo como Diagram y comprueba la renderización actual.
No conectes a una base de datos real, no generes migrations ni trates el ejemplo como el schema de mi proyecto.
```

**Resultado esperado:** un modelo de datos revisable. Si después quieres representar el schema real, proporciona
fuentes autorizadas y mantén separados los descubrimientos, las hipótesis y las decisiones.

## Alterna entre dibujo y fuente

- **Diagram:** prioriza el resultado visual. Los archivos existentes se abren en esta vista.
- **Source:** muestra la fuente. En los formatos editables, usa el editor y el flujo de guardado de los Files.
- **Split:** fuente a la izquierda y preview a la derecha, útil para ajustar y comparar sin cambiar de contexto.

Los nuevos diagramas de formatos de fuente se abren en Source. En Excalidraw, usa **Edit drawing** para entrar en el
editor visual y **Finish editing** para volver al dibujo. Los cambios usan el mismo archivo y flujo de guardado; no
existe un segundo Save separado para el dibujo. La edición visual y la de fuente no están activas a la vez.

draw.io mantiene Source en solo lectura. Usa **Open with default app** para trabajar en un editor externo.

En la vista Diagram, arrastrar con el botón derecho desplaza la vista interna; el gesto de pellizcar o `Ctrl`/`⌘` +
rueda ajusta el zoom, sin arrastrar el Canvas. Usa los controles de zoom y **Fit** para encuadrar. La cabecera sigue
siendo la zona para mover el Node. El editor Excalidraw conserva sus propios controles.

[![PlantUML en Split, con la fuente a la izquierda y la renderización a la derecha, y otro Diagram abierto en el editor visual de Excalidraw.](https://media.agentkavor.com/editorial/diagrams/source-editing/image.71cde50ac832.jpg)](https://media.agentkavor.com/editorial/diagrams/source-editing/native.57f2690ef912.png)

En los formatos de fuente, Split acerca código y resultado. Excalidraw también ofrece edición visual del propio dibujo.

### Cuando el preview queda desactualizado

Si una edición no se renderiza, el último resultado correcto puede seguir visible con **Preview out of date** y el
error del engine. Pertenece a la fuente anterior; no demuestra el éxito de la nueva. Cuando se informa de una línea
real, puedes abrirla en Source; un archivo que nunca se haya renderizado muestra la fuente y el fallo.

Corrige la sintaxis, guarda y comprueba el resultado actual. Los problemas de guardado y los conflictos son distintos
de los fallos de renderización; no descartes una edición local solo porque aún haya un dibujo en pantalla.

### Exporta para compartir

La acción **Export** ofrece SVG y PNG del dibujo completo, no una captura recortada de lo que cabe en el Node. En
draw.io, exporta la página activa y sus capas. Si el preview está desactualizado, la exportación usa el último render
correcto y lo indica. Sin ningún resultado renderizado, exportar no está disponible.

## Usa el panel Diagrams sin llenar el Canvas

El panel encuentra archivos de diagrama recursivamente dentro de las **Documentation roots**, respeta `.gitignore`
y permite buscar por nombre o ruta y filtrar por formato en **All formats**. No busca de forma general todos los
archivos del Workspace.

La lista refleja la jerarquía real de carpetas en disco. Sin búsqueda ni filtro de formato, incluye carpetas vacías;
expande y contrae los directorios para navegar. Con varias roots, el árbol se agrupa por raíz.

Specs y Diagrams muestran las mismas **Documentation roots**. Una carpeta creada en un panel aparece en el otro:
es la misma carpeta en disco, no una copia. Esto no convierte una Specification en diagrama ni cambia su ciclo de vida.

- **Preview:** abre una visualización de solo lectura, sin añadir un Node. Pasar el puntero o seleccionar la fila
  no la abre. Hay una vista previa a la vez; `Escape` cierra y devuelve el foco a la acción.
- **Add to Canvas:** añade la fuente; cuando ya existe un Node, la acción localiza el existente.
- **New diagram:** crea desde el formulario inline, con formato y nombre.
- **Show in File Manager:** localiza el archivo o la carpeta en el gestor del sistema.

Una vista previa puede necesitar descargar el engine de ese formato. Cerrarla no convierte un resultado tardío en
una renderización válida de otro archivo.

[![Panel Diagrams con la vista previa de un archivo Excalidraw abierta fuera del Canvas y el menú Add to Canvas de otro archivo.](https://media.agentkavor.com/editorial/diagrams/panel-preview/image.b05789ae15d3.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-preview/native.1e11695f5729.png)

Preview permite consultar el dibujo sin crear un Node. Add to Canvas es una acción separada.

### Crea y organiza carpetas

Abre el menú contextual de una carpeta en el árbol:

- **New Diagram…:** abre el formulario inline para crear dentro de esa carpeta, aunque no sea el destino
  predeterminado en **Diagrams folder**. Elige el formato, introduce el nombre y comprueba la ruta.
- **New Folder…:** crea una subcarpeta real; puede quedar vacía hasta que necesites un diagrama allí.
- **Rename Folder…:** cambia el nombre de la carpeta sin elegir otro directorio padre. Los Diagram Nodes afectados
  reflejan la nueva ruta.
- **Show in File Manager:** abre la ubicación en el gestor del sistema.

Las Documentation roots configuradas no pueden renombrarse ni eliminarse mediante estas acciones. Para cambiar las
raíces de descubrimiento o el destino predeterminado de las nuevas creaciones, usa la configuración del Workspace,
no la eliminación de una carpeta.

### Renombra, mueve y versiona el archivo

En el menú contextual de un diagrama, **Rename Diagram…** cambia el nombre del archivo conservando la extensión,
incluidas las extensiones compuestas como `.vl.json`. Para mover el archivo, arrastra la fila hasta otra carpeta o
raíz del árbol. Si Git ya lo rastrea, se mueve mediante `git mv`; un archivo no rastreado también puede moverse.

El Diagram Node refleja la ruta tras renombrar el archivo, renombrar su carpeta o mover el diagrama. No necesitas
añadirlo de nuevo: se conservan la identidad del Node y sus Connections.

En un repositorio Git, **Commit Diagram** crea un commit solo de la ruta de ese archivo y muestra el hash resultante.
No incluye cambios de otras rutas que ya estén en el stage. La acción funciona incluso sin un Node en el Canvas;
versiona el archivo, no una captura del dibujo.

Si hay una edición local aún sin guardar, resuelve la decisión presentada antes de cambiar la fuente o hacer el
commit. Si la operación falla, lee el mensaje del panel y corrige la causa; no consideres terminado un movimiento
o commit solo porque hayas iniciado la acción.

### Elimina sin confundir archivo y Node

**Delete Diagram**, en el menú del archivo y tras confirmación, borra la fuente y elimina sus Diagram Nodes. Es
distinto de quitar solo un Node del Canvas, que conserva el archivo.

**Delete Folder and Contents** exige confirmación y solo elimina un subárbol que contenga archivos de diagrama
reconocidos y directorios reales. Si encuentra una Specification, otro tipo de archivo, una entrada oculta o un
enlace simbólico, el panel rechaza la operación antes de cambiar nada e indica que uses **Files** para gestionar
contenido mixto. La comprobación es específica de Diagrams; no cambia las reglas de eliminación del panel Specs.

Al eliminar un diagrama individual rastreado, Kavor usa el flujo de eliminación de Git. Si Git rechaza la operación,
por ejemplo por cambios locales, resuelve el estado indicado antes de intentarlo de nuevo; la confirmación no
autoriza descartar esos cambios por la fuerza.

## Lleva la fuente al grafo

Un Diagram alcanzable aporta fuente y resultado visual al trabajo de un CodingAgent. No es necesario conectar
todos los agentes directamente a él; una Connection directa es importante cuando quieres aplicar
`diagram_read_only` a ese par.

Una Connection **Diagram + Terminal** proporciona la ruta absoluta de la fuente mediante una variable de entorno
que eliges tú, como en File + Terminal. El valor es la ruta, no el SVG o PNG renderizado. Configúrala antes de
iniciar la sesión o reiníciala para recibir un cambio en el parámetro. Consulta la [matriz de Connections](./connections.md).

## Descargas, privacidad y modo offline

El dibujo se renderiza dentro de Kavor; no se envía a un servicio externo de renderización. Los engines, las fuentes
tipográficas y los recursos auxiliares se descargan bajo demanda, se verifican y se guardan en la caché de datos de
la aplicación. Abrir Kavor o un Workspace no descarga todos los formatos. SVG usa la presentación integrada.

Después del primer uso, los recursos ya obtenidos pueden reutilizarse offline. El editor Excalidraw solo se descarga
al entrar en edición; las bibliotecas PlantUML, como C4, y los recursos de draw.io también pueden necesitar una
primera descarga. Una actualización de Kavor que cambie estos recursos puede requerir otra descarga en el próximo uso.

En el primer intento offline o si falla una descarga, el Node muestra el motivo y **Retry**. La fuente de los
formatos editables sigue disponible; inténtalo de nuevo cuando se puedan obtener los recursos.

**La caché del engine no significa ausencia total de red.** El propio contenido puede referenciar imágenes,
datasets u otros recursos remotos. Los includes locales se resuelven desde la carpeta del diagrama y sus cambios
pueden actualizar el dibujo. Revisa las fuentes que no conozcas antes de abrirlas; para uso offline, prefiere
contenido autocontenido y prepara antes todos los recursos necesarios.

La superficie del diagrama está aislada de la interfaz privilegiada de la aplicación. Esto no convierte las
referencias del dibujo en fuentes fiables. Si pides a un CodingAgent que produzca o analice contenido, la
participación del provider sigue las condiciones del harness elegido; no confundas renderización local con
procesamiento local del modelo.

## Continúa

- [Añade contenido al Canvas](./adding-content.md) sin copiar innecesariamente sus fuentes.
- Mantén las decisiones en la [Specification](./specification.md) y usa el dibujo para explicarlas.
- Consulta [las Connections soportadas](./connections.md) y [los límites de contexto de los CodingAgents](./coding-agents-and-canvas.md).
