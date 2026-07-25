<div align="center">

<a href="https://github.com/kevinbayter/kevinbayter/blob/main/README.md"><img alt="English" src="https://img.shields.io/badge/English-1E293B?style=flat-square&logo=googletranslate&logoColor=94A3B8"/></a>
<a href="https://github.com/kevinbayter/kevinbayter/blob/main/README.es.md"><img alt="Español" src="https://img.shields.io/badge/Espa%C3%B1ol-2563EB?style=flat-square&logo=googletranslate&logoColor=white"/></a>

<img width="100%" alt="Kevin Bayter — Líder Técnico · AI Engineer" src="assets/hero.svg"/>

<br/>

<a href="https://bayterx.com"><img alt="Portafolio" src="https://img.shields.io/badge/Portafolio-0F172A?style=for-the-badge&logo=google-chrome&logoColor=white"/></a>
<a href="https://linkedin.com/in/kevin-bayter"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-2563EB?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
<a href="mailto:kevin@bayterx.com"><img alt="Email" src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/></a>
<img alt="Ubicación" src="https://img.shields.io/badge/Bogot%C3%A1-Colombia-334155?style=for-the-badge"/>
<img alt="Visitas al perfil" src="https://komarev.com/ghpvc/?username=kevinbayter&style=for-the-badge&color=2563EB&label=VISITAS"/>

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3200&pause=900&color=38BDF8&center=true&vCenter=true&width=900&lines=L%C3%ADder+T%C3%A9cnico+%7C+Senior+Software+Engineer;AI+Engineer+%E2%80%94+sistemas+ag%C3%A9nticos+en+producci%C3%B3n;Platform+Engineering+%E2%80%94+Kubernetes%2C+GitOps%2C+on-prem+%2B+cloud;Pagos+%E2%80%94+sistemas+transaccionales+cr%C3%ADticos;Hago+que+la+IA+sirva+donde+equivocarse+cuesta+caro" alt="roles"/>

</div>

---

## `whoami`

Soy **Líder Técnico y Senior Software Engineer**, y dedico la mayor parte de mi tiempo a la versión difícil de la pregunta sobre IA: *no "¿puede un modelo hacer esto?", sino "¿puedo poner esto frente a producción y dormir tranquilo?"*

Construyo **sistemas agénticos que tocan infraestructura real** — clústeres, gateways, pipelines, dinero — con los guardrails, las compuertas de aprobación, la trazabilidad y los núcleos deterministas que los hacen lo bastante seguros como para desplegarlos de verdad. En paralelo, modernizo plataformas de pagos y construyo las plataformas internas por las que despliegan otros equipos.

Lidero construyendo: escribo las partes difíciles, defino la arquitectura y hago que los límites sean *exigibles*, para que el diseño sobreviva al tercer sprint del equipo bajo presión.

```yaml
rol:      Líder Técnico · Senior Software Engineer
foco:     ingeniería de IA · platform engineering · pagos
hoy:      WOM Colombia — modernización de pagos + plataforma interna de despliegue
antes:    Mercado Libre — backend, observabilidad y automatización con IA a escala
idiomas:  Español (nativo) · Portugués (avanzado) · Inglés (profesional)
creencia: "el modelo propone, el código decide, el humano aprueba"
```

---

## Impacto

<img width="100%" alt="Métricas de impacto" src="assets/impact.svg"/>

- **Reduje el ruido de alertas en producción más de un 85%** con triage asistido por IA delante de la guardia — menos llamadas, diagnóstico más rápido, menos desgaste.
- **Convertí un ritual manual de ocho pasos en un solo clic**, con rollback disponible en cada etapa y todas las acciones auditadas.
- **Puse un agente autónomo junto a un clúster vivo — y lo hice seguro.** Las lecturas corren libres, las escrituras se detienen en una compuerta de aprobación humana, y las operaciones destructivas siguen bloqueadas sin importar quién apruebe.
- **Convertí la arquitectura en un fallo de build, no en una opinión de code review** — los límites entre capas se verifican con tests automáticos en cada commit.
- **Cero credenciales persistidas** en un flujo regulado que automatiza un portal estatal.

---

## Trabajo destacado

> Nombro a las empresas porque son públicas. Los nombres de proyectos internos, hosts, esquemas y datos de negocio no lo son: todo lo que sigue describe **arquitectura y decisiones de ingeniería**, nunca los internals de un cliente.

<br/>

### 🤖 Copiloto agéntico de operaciones — un LLM con las manos en producción

<img width="100%" alt="El loop agéntico: contexto, planeación, herramientas, compuerta de riesgo, aprobación humana, ejecución, observación" src="assets/agent-loop.svg"/>

Un agente operativo embebido en una plataforma interna. Le preguntas *"¿por qué este servicio está devolviendo 5xx?"* y no adivina: va y mira. Inspecciona workloads, lee las definiciones de rutas del gateway, consulta métricas, logs y trazas, correlaciona alertas y vuelve con evidencia.

**Lo que lo hizo difícil, y lo que construí:**

| Problema | Decisión de ingeniería |
|---|---|
| Un LLM con acceso al clúster es un pasivo | Cada herramienta está **clasificada por riesgo**: las lecturas se ejecutan de inmediato, las escrituras se convierten en una *acción pendiente* que un humano debe confirmar antes de que corra nada |
| "Aprobado" no es lo mismo que "seguro" | Una **lista de bloqueo dura sobrevive a la aprobación**: borrados masivos, namespaces protegidos, nodos, cluster roles y volúmenes nunca son ejecutables |
| La salida de las herramientas filtra secretos al contexto | La salida se **redacta antes de llegar al modelo**, no después |
| Un solo proveedor es un punto único de falla | **Enrutamiento multi-proveedor con failover automático**, presupuestos de tokens por proveedor y límite de iteraciones |
| Un agente que "piensa" en silencio parece roto | **Streaming por SSE** del texto parcial, el progreso de cada herramienta y gráficas de métricas dibujadas dentro de la conversación |
| Los agentes olvidan lo que enseñó el último incidente | Una **memoria operativa persistente** que el agente puede escribir, recordar y olvidar |

**Stack:** TypeScript · Node · Prisma/PostgreSQL · Redis + BullMQ · servidores MCP · Kubernetes · CRDs de APISIX · Prometheus · Loki · Grafana · SSE<br/>
**Forma:** 20+ herramientas tipadas · loop agéntico acotado a 14 iteraciones · trazabilidad completa por ejecución

<br/>

### 🚀 Plataforma interna de despliegue — entra un tag, sale un rollout auditado

<img width="100%" alt="Pipeline de entrega: tag, build, publicación, catálogo, solicitud, orquestación, rollout, feedback en vivo" src="assets/platform-flow.svg"/>

Un control plane que permite a cada equipo versionar, desplegar y observar sus servicios sobre **Kubernetes on-premise y cloud bajo el mismo contrato** — en lugar de un ritual de pipelines que solo tres personas entendían.

- **Un camino a producción que los equipos manejan solos.** La política de ramas decide a qué ambientes es elegible un tag; la plataforma correlaciona tag ↔ commit ↔ pipeline, así que desplegar una versión nunca la reconstruye.
- **Deploys y rollbacks como operaciones de primera clase.** Un clic hacia adelante, un clic de vuelta a la última versión buena conocida, con el rol efectivo resuelto por proyecto *y* por ambiente.
- **Verdad en tiempo real.** Eventos de webhook — idempotentes y tolerantes a reintentos — transmitidos a la UI por SSE. Sin refrescar para saber si producción está arriba.
- **Secretos con rastro auditable.** Aplicados dentro del clúster, versionados, con checksum, enmascarados en la UI y auditados en cada cambio.
- **Observabilidad de vuelta al mismo lugar.** Métricas, alertas y logs del clúster integrados en la vista del proyecto, para que el diagnóstico no empiece con *"¿en cuál dashboard era?"*.
- **Un CLI que los equipos sí usan** — chequeos de salud, registro de versiones, bootstrap de CI — distribuido por el package registry interno.

**Stack:** TypeScript · Express + Bun · Prisma/PostgreSQL · Angular + Tailwind · Kubernetes · GitLab CI · Kaniko · Harbor · APISIX · Prometheus/Loki/Grafana<br/>
**Forma:** módulos hexagonales · 200+ tests automatizados · arquitectura verificada en CI

<br/>

### 🧮 IA en dominio regulado — donde una alucinación es un problema legal

<img width="100%" alt="La IA lee, el código calcula: extracción de doble pasada, confirmación humana, motor determinista" src="assets/ai-fiscal.svg"/>

Una plataforma de declaración de renta donde la IA hace exactamente un trabajo — leer documentos desordenados — y está *estructuralmente* impedida de hacer el otro.

**La decisión central: el modelo nunca calcula el número.**

- **Extracción de doble pasada.** Cada documento se lee dos veces, de forma independiente; las discrepancias salen primero, con la fuente al lado, para que el usuario las resuelva.
- **La confirmación humana es una compuerta dura.** Ningún valor extraído avanza hasta que una persona lo confirma.
- **Un núcleo de cálculo puro, con cero dependencias.** Cada regla lleva la cita normativa que la respalda, versionada en el repositorio junto al código.
- **Un golden test como contrato.** Una declaración real reproducida casilla por casilla: si un cambio lo rompe, el cambio está mal — salvo que exista una *regla nueva documentada*.
- **Credenciales que no se pueden filtrar porque nunca existen en reposo.** La automatización del portal corre en un worker aislado sin acceso a la base de datos, sobre sesiones efímeras en memoria destruidas en un `finally` garantizado.
- **Aritmética entera de punta a punta.** Ni un solo float cerca del dinero.

**Stack:** TypeScript · Next.js · Turborepo · Prisma/PostgreSQL · Playwright · adaptador LLM compatible con OpenAI (cambiar de proveedor es una variable de entorno) · Vitest

<br/>

### 🛡️ Code review con IA, triage de alertas y automatización de ingeniería

Sistemas más pequeños, misma filosofía: **code review con LLM disparado por webhooks**, que publica comentarios inline anclados al diff real con sugerencias aplicables, deduplicados entre re-reviews y con fallback de modelos; **triage de alertas con IA** que convierte ruido en tickets diagnosticados y accionables; y herramientas internas que eliminan el trabajo tedioso que los equipos absorben en silencio.

---

## El stack de ingeniería de IA con el que realmente construyo

<img width="100%" alt="Modelos, orquestación, herramientas, guardrails, evaluación, observabilidad" src="assets/ai-stack.svg"/>

Cualquiera puede llamar a una API. La ingeniería interesante es todo lo que está debajo de esa llamada: **acotar lo que un agente puede hacer, poder probar lo que hizo, y mantener las decisiones irreversibles en código determinista.**

---

## Arquitectura que no se pudre

<img width="100%" alt="Arquitectura hexagonal con límites impuestos por reglas de lint y tests de arquitectura" src="assets/hexagon.svg"/>

Hexagonal por defecto y — más importante — **exigida**. Las reglas de lint bloquean los imports ilegales; los tests de arquitectura leen el grafo de imports *real* y hacen fallar el CI cuando una capa alcanza donde no debe. La documentación se desactualiza. Los tests no.

---

## Herramientas

<table>
<tr><td><b>Lenguajes</b></td><td>

![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-336791?style=flat-square&logo=postgresql&logoColor=white)

</td></tr>
<tr><td><b>Backend</b></td><td>

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring&logoColor=white)
![WebFlux](https://img.shields.io/badge/WebFlux-6DB33F?style=flat-square&logo=spring&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-231F20?style=flat-square&logo=apachekafka&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white)
![REST](https://img.shields.io/badge/REST_%26_microservicios-2563EB?style=flat-square)

</td></tr>
<tr><td><b>Ingeniería de IA</b></td><td>

![MCP](https://img.shields.io/badge/MCP-111827?style=flat-square)
![Agentes](https://img.shields.io/badge/Orquestaci%C3%B3n_ag%C3%A9ntica-7C3AED?style=flat-square)
![Retrieval](https://img.shields.io/badge/Retrieval-0EA5E9?style=flat-square)
![Guardrails](https://img.shields.io/badge/Guardrails_%26_evals-F59E0B?style=flat-square)
![Claude](https://img.shields.io/badge/Claude-D97757?style=flat-square&logo=anthropic&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-4285F4?style=flat-square&logo=googlegemini&logoColor=white)
![Kimi](https://img.shields.io/badge/Kimi-1E293B?style=flat-square)

</td></tr>
<tr><td><b>Cloud y plataforma</b></td><td>

![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-4285F4?style=flat-square&logo=googlecloud&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat-square&logo=microsoftazure&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-844FBA?style=flat-square&logo=terraform&logoColor=white)
![GitLab CI](https://img.shields.io/badge/GitLab_CI-FC6D26?style=flat-square&logo=gitlab&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=flat-square&logo=argo&logoColor=white)
![APISIX](https://img.shields.io/badge/APISIX-E8433E?style=flat-square&logo=apacheapisix&logoColor=white)

</td></tr>
<tr><td><b>Datos</b></td><td>

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=flat-square&logo=oracle&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)

</td></tr>
<tr><td><b>Observabilidad y seguridad</b></td><td>

![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white)
![Loki](https://img.shields.io/badge/Loki-F5A623?style=flat-square&logo=grafana&logoColor=white)
![Datadog](https://img.shields.io/badge/Datadog-632CA6?style=flat-square&logo=datadog&logoColor=white)
![New Relic](https://img.shields.io/badge/New_Relic-1CE783?style=flat-square&logo=newrelic&logoColor=black)
![Opsgenie](https://img.shields.io/badge/Opsgenie-172B4D?style=flat-square&logo=atlassian&logoColor=white)
![OWASP](https://img.shields.io/badge/OWASP-000000?style=flat-square&logo=owasp&logoColor=white)

</td></tr>
<tr><td><b>Calidad</b></td><td>

![JUnit](https://img.shields.io/badge/JUnit-25A162?style=flat-square&logo=junit5&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=flat-square&logo=selenium&logoColor=white)
![Análisis estático](https://img.shields.io/badge/An%C3%A1lisis_est%C3%A1tico-4E9BCD?style=flat-square&logo=sonarqube&logoColor=white)

</td></tr>
</table>

---

## En lo que estoy trabajando

```text
▸ Hacer que las operaciones con IA sean confiables al punto de ser aburridas
  — aprobaciones, auditoría, evals y diseño del radio de impacto
▸ Modernización de plataformas de pago: resiliencia, trazabilidad y continuidad
  en flujos transaccionales críticos
▸ Platform engineering interno: entre menos decisiones tome un equipo para
  desplegar, más rápido despliega
▸ Un producto de IA en dominio regulado donde el modelo lee y el código
  — solo el código — decide
```

---

## GitHub

<div align="center">

<img height="165" alt="estadísticas" src="https://github-readme-stats.vercel.app/api?username=kevinbayter&show_icons=true&theme=react&hide_border=true&bg_color=0D1117&title_color=38BDF8&icon_color=34D399&text_color=94A3B8&rank_icon=github&locale=es"/>
<img height="165" alt="lenguajes más usados" src="https://github-readme-stats.vercel.app/api/top-langs/?username=kevinbayter&layout=compact&theme=react&hide_border=true&bg_color=0D1117&title_color=38BDF8&text_color=94A3B8&langs_count=8&locale=es"/>

<br/>

<img height="165" alt="racha de contribuciones" src="https://streak-stats.demolab.com?user=kevinbayter&theme=react&hide_border=true&background=0D1117&ring=38BDF8&fire=34D399&currStreakLabel=38BDF8&locale=es"/>

<br/><br/>

<img width="97%" alt="gráfico de actividad" src="https://github-readme-activity-graph.vercel.app/graph?username=kevinbayter&theme=react-dark&hide_border=true&bg_color=0D1117&color=38BDF8&line=34D399&point=A78BFA&area=true"/>

<br/>

<img alt="trofeos" src="https://github-profile-trophy.vercel.app/?username=kevinbayter&theme=nord&no-frame=true&no-bg=true&column=7&margin-w=8&margin-h=8"/>

</div>

---

<div align="center">

### Hablemos

Si estás construyendo algo donde **la IA tiene que acertar, no solo impresionar** — agentes con permisos reales, plataformas de las que dependen otros ingenieros, o sistemas de pago que no se pueden caer — me gustaría escucharlo.

<a href="https://linkedin.com/in/kevin-bayter"><img alt="LinkedIn" src="https://img.shields.io/badge/Conectemos-2563EB?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
<a href="mailto:kevin@bayterx.com"><img alt="Email" src="https://img.shields.io/badge/Escr%C3%ADbeme-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/></a>
<a href="https://bayterx.com"><img alt="Portafolio" src="https://img.shields.io/badge/Ver_m%C3%A1s-0F172A?style=for-the-badge&logo=google-chrome&logoColor=white"/></a>

<br/><br/>

<sub><i>"El modelo propone. El código decide. El humano aprueba."</i></sub>

</div>
