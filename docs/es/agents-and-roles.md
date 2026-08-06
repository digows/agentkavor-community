---
id: agents-and-roles
title: Cómo elegir CodingAgents y definir papeles en Kavor
description: Aprende a dividir el trabajo entre CodingAgents, conservar el contexto compartido y elegir provider, modelo y effort para cada responsabilidad.
kind: guide
lastReviewedAt: 2026-08-06
canonicalUrl: https://agentkavor.com/es/docs/agents-and-roles
---

# Cómo elegir CodingAgents y definir papeles en Kavor

Elegir un CodingAgent no empieza por el provider. Empieza por la responsabilidad que debe asumir.

Una sola sesión puede analizar el problema, escribir la Specification, implementar, revisar y preparar la entrega.
Parece más sencillo porque participan menos personas, pero concentra objetivos distintos en la misma ventana de
contexto. La implementación carga toda la investigación anterior, la revisión hereda las mismas premisas de quien
escribió el código y la preparación de la entrega compite por atención con decisiones que ya deberían estar
conservadas fuera de la sesión.

Kavor permite dividir esas responsabilidades entre CodingAgents sin convertir el trabajo en chats aislados. Los
participantes forman un grafo alrededor de recursos duraderos, como Specifications, Files y Sticky Notes. Las
Connections hacen visibles el contexto y las capacidades; los mensajes permiten handoffs y discusiones; y la decisión
final sigue bajo tu control.

[![Spec Writer, Builder, Reviewer y Shipper conectados en un Canvas de Kavor](https://agentkavor.com/kavor-agents-and-roles-article.jpg)](https://agentkavor.com/es/videos/agents-and-roles)

[Mira cómo cuatro papeles forman un grafo de trabajo →](https://agentkavor.com/es/videos/agents-and-roles)

## Empieza por el trabajo, no por el agente

Antes de añadir un CodingAgent al Canvas, escribe en una frase por qué existe. Una buena definición contiene:

- una responsabilidad principal;
- el contexto necesario para cumplirla;
- el resultado que debe producir;
- la condición en la que debe detenerse.

«Revisar el código» sigue siendo amplio. «Comparar la implementación con los criterios de la Specification, registrar
findings y detenerse antes de modificar el código» define un papel verificable.

El mismo provider puede ocupar papeles distintos en sesiones separadas. Providers diferentes también pueden cumplir
el mismo papel. El papel pertenece al trabajo; provider, modelo y effort son configuraciones elegidas para ejecutarlo.

## Cuatro papeles útiles

No todas las tareas necesitan los cuatro papeles siguientes. Son límites para razonar sobre el trabajo, no una cuota
de agentes.

| Papel | Pregunta principal | Contexto esencial | Resultado esperado |
| --- | --- | --- | --- |
| **Analista o Spec Writer** | ¿Qué debe cambiar y qué límites deben permanecer? | Problema, restricciones, decisiones y comportamiento existente | Una Specification clara, con alcance y criterios verificables |
| **Implementer** | ¿Cómo producir el cambio dentro del contrato? | Specification, Files relevantes, Terminal y convenciones del Workspace | Implementación acompañada de verificaciones y evidencias |
| **Reviewer** | ¿Qué es incorrecto, incompleto o arriesgado? | Specification, cambios y resultados de las verificaciones | Findings concretos o una revisión sin bloqueos identificados |
| **Shipper** | ¿El trabajo está listo para entregarse con seguridad? | Specification, revisión, estado de Git y requisitos de release | Preparación de la entrega, riesgos restantes y evidencia para la decisión humana |

Para una corrección pequeña pueden bastar un Implementer y la revisión humana. En un cambio de mayor riesgo, separar
Specification, implementación, revisión y entrega reduce la posibilidad de que una única línea de razonamiento
controle todo el ciclo.

Separar papeles no exige providers distintos. Dos sesiones del mismo provider ya aíslan objetivos y contextos.
Combinar providers puede aportar otra perspectiva y reducir puntos ciegos correlacionados, pero no reemplaza los
criterios de aceptación ni garantiza una revisión mejor.

## El grafo es la memoria compartida

Dividir el trabajo no debería exigir copiar y pegar el mismo prompt en varias sesiones. En Kavor, el contexto común
permanece en Nodes duraderos:

- la **Specification** conserva intención, alcance y criterios;
- los **Files** mantienen las fuentes relevantes dentro del flujo;
- la **Sticky Note** registra observaciones y decisiones de trabajo;
- el **Terminal** aporta el entorno donde se ejecutan comandos y verificaciones;
- los **CodingAgents** asumen responsabilidades distintas alrededor de esos recursos.

Esta memoria compartida no es un único historial de conversación que crece indefinidamente. Es un conjunto explícito
de recursos que los participantes pueden consultar y actualizar según lo permitan las Connections y los Guardrails.
Cuando termina una sesión, la Specification, los Files, las notas y las evidencias permanecen en el Workspace.

Un grafo de implementación, revisión y entrega puede representarse así:

~~~text
Specification
    ├── Spec Writer
    ├── Implementer ↔ Reviewer
    └── Shipper

Contexto duradero: Files · Sticky Note · Terminal · outputs de la Specification
~~~

Esta representación muestra la división de responsabilidades, no la dirección de las Connections. Las Connections no
ejecutan una secuencia automáticamente; hacen que las relaciones, el contexto y las capacidades sean inspeccionables
en el Canvas.

## Divide también la ventana de contexto

Cada papel necesita una parte distinta del problema. El Spec Writer puede necesitar explorar alternativas y
restricciones. El Implementer necesita el contrato aceptado, los archivos relevantes y las convenciones del código.
El Reviewer necesita los criterios, el diff y las evidencias, no toda la conversación que llevó al Implementer hasta
la solución.

Esta separación mejora la relación entre contexto útil y contexto total:

- cada CodingAgent recibe un objetivo más estrecho;
- los recursos comunes quedan en el Workspace en vez de repetirse en prompts;
- los detalles se consultan cuando hacen falta;
- la revisión parte del contrato y del resultado, no de la justificación acumulada por el autor;
- una sesión larga deja de cargar etapas que ya terminaron.

La reducción del uso de tokens puede ser un beneficio, no una promesa. Un grafo bien dividido evita contexto repetido
o irrelevante; un grafo con demasiados agentes, mensajes redundantes y papeles vagos puede consumir más. El objetivo
no es maximizar el número de CodingAgents. Es dar a cada token una responsabilidad más clara.

## Elige provider, modelo y effort después del papel

Con la responsabilidad definida, configura la sesión de acuerdo con la tarea. Usa los controles nativos del provider
para elegir modelo y effort cuando estén disponibles.

Considera cuatro factores:

1. **Ambigüedad:** ¿la tarea debe descubrir el problema o ejecutar un contrato claro?
2. **Riesgo:** ¿un fallo sería local y reversible, o afectaría seguridad, datos, arquitectura o release?
3. **Uso de herramientas:** ¿el papel necesita explorar código y ejecutar comandos, o sobre todo analizar evidencias?
4. **Coste de coordinación:** ¿una sesión más potente puede resolver el papel con menos handoffs, o hace falta una
   segunda perspectiva?

Un effort mayor suele tener sentido para Specifications ambiguas, decisiones arquitectónicas y revisiones de alto
riesgo. Las tareas mecánicas y bien delimitadas pueden funcionar con modelos más rápidos o effort menor. La
implementación varía según el tamaño del cambio y la necesidad de navegar y probar el código.

No conviertas estas orientaciones en asignaciones permanentes. «Provider A siempre implementa» y «Provider B siempre
revisa» sustituyen una decisión de ingeniería por una costumbre. Reevalúa la configuración para cada papel y aprende
de la calidad de las evidencias producidas.

## Usa conversaciones para handoffs y trabajo paralelo

Los CodingAgents del mismo flujo no tienen que trabajar en silencio. Usa los mensajes de Kavor cuando un agente
necesite:

- entregar una implementación para revisión;
- pedir aclaraciones a quien escribió la Specification;
- discutir un finding antes de registrarlo como bloqueo;
- devolver una corrección para una nueva verificación;
- coordinar investigaciones independientes que pueden avanzar en paralelo.

Un buen mensaje informa:

- el objetivo del handoff;
- qué recursos del grafo contienen el contexto;
- qué ya se hizo y verificó;
- qué acción debe realizar el destinatario;
- dónde debe conservarse el resultado.

Las conversaciones son asíncronas e inspeccionables. No sustituyen la memoria duradera. Una decisión que deba
sobrevivir al handoff debe volver a la Specification, a una Sticky Note o a otro output adecuado; no debe quedar
oculta únicamente en los mensajes.

Paraleliza solo trabajos que puedan avanzar sin disputar la misma decisión ni modificar la misma superficie. Dos
agentes pueden investigar hipótesis diferentes o revisar aspectos independientes. Dos Implementers modificando los
mismos archivos sin una división explícita suelen generar más reconciliación que velocidad.

## Qué evitar

### Concentrar todo el ciclo en una sesión

Análisis, Specification, implementación, revisión y release plantean preguntas y criterios distintos. Reutilizar una
sesión para todo conserva también sus premisas, distracciones y puntos ciegos.

### Crear un agente para cada subtarea

La separación sin responsabilidad independiente añade mensajes, contexto duplicado y coste de coordinación. Si no
puedes describir un resultado y una condición de parada distintos, probablemente no necesitas otro CodingAgent.

### Usar siempre la misma configuración por comodidad

Un modelo o effort insuficientes degradan tareas ambiguas o críticas. Configuraciones excesivas desperdician tiempo y
tokens en trabajo mecánico. Elige la configuración según el riesgo y la naturaleza del papel.

### Pedir al Implementer que revise su propio razonamiento

La autorrevisión puede encontrar errores simples, pero no crea independencia. Cuando importa una segunda perspectiva,
usa otra sesión con criterios explícitos y acceso a resultados verificables.

### Mantener los agentes aislados

Copiar mensajes manualmente entre sesiones fragmenta la procedencia y oculta el handoff. Usa las conversaciones de
Kavor para revisiones, aclaraciones y coordinación del trabajo paralelo.

### Dejar decisiones solo en los mensajes

Los mensajes coordinan participantes. Specifications, Sticky Notes y outputs conservan lo que el Workspace debe
recordar.

## Tres diseños para empezar

### Cambio pequeño

Usa una Specification, un Implementer y un Reviewer. Conecta ambos agentes al contexto necesario y conserva
implementación y revisión en una Sticky Note o en los outputs de la Specification. Es el diseño útil más pequeño; el
vídeo de esta página muestra cómo la misma lógica crece hasta el Shipper sin perder contexto.

### Cambio de alto riesgo

Separa Spec Writer, Implementer, Reviewer y Shipper. Da al Reviewer criterios explícitos e independencia para
cuestionar la implementación. El Shipper prepara la evidencia de entrega, pero no sustituye tu decisión de publicar.

### Investigación paralela

Usa dos CodingAgents para explorar hipótesis o áreas distintas, con un tercer papel responsable de reconciliar los
resultados. Define antes dónde se registrará cada descubrimiento y usa mensajes para dudas y handoffs.

## Checklist antes de empezar

Para cada CodingAgent, confirma:

- ¿puedo describir su papel en una frase?
- ¿tiene un resultado observable y una condición de parada?
- ¿el grafo ofrece solo el contexto y las capacidades necesarias?
- ¿provider, modelo y effort corresponden a la ambigüedad y al riesgo?
- ¿está claro con quién debe hablar y para qué?
- ¿las decisiones y evidencias se conservarán fuera de la conversación?
- ¿añadir este CodingAgent mejora independencia, paralelismo o calidad lo suficiente para justificar la coordinación?

Un buen Canvas no es el que contiene más agentes. Es el que deja claras la responsabilidad, el contexto, los
handoffs, las evidencias y las decisiones para todos los participantes, incluido tú.

Monta esta estructura en [Cierra tu primer loop en Kavor](./first-loop.md) o repasa los conceptos en
[¿Qué es Kavor?](./what-is-kavor.md).

