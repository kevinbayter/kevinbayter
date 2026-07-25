<div align="center">

<a href="https://github.com/kevinbayter/kevinbayter/blob/main/README.md"><img alt="English" src="https://img.shields.io/badge/English-2563EB?style=flat-square&logo=googletranslate&logoColor=white"/></a>
<a href="https://github.com/kevinbayter/kevinbayter/blob/main/README.es.md"><img alt="Español" src="https://img.shields.io/badge/Espa%C3%B1ol-1E293B?style=flat-square&logo=googletranslate&logoColor=94A3B8"/></a>

<img width="100%" alt="Kevin Bayter — Tech Lead · AI Engineer" src="assets/hero.svg"/>

<br/>

<a href="https://bayterx.com"><img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-0F172A?style=for-the-badge&logo=google-chrome&logoColor=white"/></a>
<a href="https://linkedin.com/in/kevin-bayter"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-2563EB?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
<a href="mailto:kevin@bayterx.com"><img alt="Email" src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/></a>
<img alt="Location" src="https://img.shields.io/badge/Bogot%C3%A1-Colombia-334155?style=for-the-badge"/>
<img alt="Profile views" src="https://komarev.com/ghpvc/?username=kevinbayter&style=for-the-badge&color=2563EB&label=VISITS"/>

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3200&pause=900&color=38BDF8&center=true&vCenter=true&width=880&lines=Technical+Lead+%7C+Senior+Software+Engineer;AI+Engineer+%E2%80%94+agentic+systems+that+run+in+production;Platform+Engineering+%E2%80%94+Kubernetes%2C+GitOps%2C+on-prem+%2B+cloud;Payments+%E2%80%94+critical+transactional+systems;I+make+AI+useful+where+being+wrong+is+expensive" alt="roles"/>

</div>

---

## `whoami`

I'm a **Technical Lead and Senior Software Engineer** who spends most of his time on the hardest version of the AI question: *not "can a model do this?", but "can I put this in front of production and sleep at night?"*

I build **agentic systems that touch real infrastructure** — clusters, gateways, pipelines, money — with the guardrails, approval gates, audit trails and deterministic cores that make them safe enough to actually ship. Alongside that, I modernize payment platforms and build the internal platforms other engineers deploy through.

I lead by building: I write the hard parts, set the architecture, and make the boundaries *enforceable* so the design survives the team's third sprint under pressure.

```yaml
role:      Technical Lead · Senior Software Engineer
focus:     AI engineering · platform engineering · payments
now:       WOM Colombia — payments modernization + internal delivery platform
before:    Mercado Libre — backend, observability & AI automation at scale
languages: Spanish (native) · Portuguese (advanced) · English (professional)
belief:    "the model proposes, the code decides, the human approves"
```

---

## Impact

<img width="100%" alt="Impact metrics" src="assets/impact.svg"/>

- **Cut production alert noise by 85%+** with AI-assisted triage in front of the on-call rotation — fewer pages, faster diagnosis, less burnout.
- **Turned an eight-step manual release ritual into one click**, with rollback available at every step and every action audited.
- **Put an autonomous agent next to a live cluster — and made it safe.** Reads run freely, writes stop at a human approval gate, destructive operations stay blocked no matter who approves.
- **Made architecture a build failure, not a code-review opinion** — layer boundaries verified by automated tests on every commit.
- **Zero credentials persisted** in a regulated flow that automates a government portal.

---

## Selected work

> Employers are named because they're public. Internal project names, hostnames, schemas and business data are not — everything below describes **architecture and engineering decisions**, never a client's internals.

<br/>

### 🤖 Agentic Ops Copilot — an LLM with its hands on production

<img width="100%" alt="The agentic loop: context, planning, tools, risk gate, human approval, execution, observation" src="assets/agent-loop.svg"/>

An operational agent embedded in an internal platform. Ask it *"why is this service returning 5xx?"* and it doesn't guess — it goes and looks: inspects workloads, reads gateway route definitions, queries metrics, logs and traces, correlates alerts, and comes back with evidence.

**What made it hard, and what I built:**

| Problem | Engineering decision |
|---|---|
| An LLM with cluster access is a liability | Every tool is **risk-classified**: reads execute immediately, writes become a *pending action* a human must confirm before anything runs |
| "Approved" is not the same as "safe" | A **hard blocklist survives approval** — mass deletions, protected namespaces, nodes, cluster roles and volumes are never executable |
| Tool output leaks secrets into context | Output is **redacted before it reaches the model**, not after |
| A single provider is a single point of failure | **Multi-provider routing with automatic failover**, per-provider token budgets and iteration limits |
| Agents that "think" silently feel broken | **SSE streaming** of partial text, live tool progress, and metric charts rendered inline in the conversation |
| Agents forget what the last incident taught them | A **persistent operational memory** the agent can write to, recall from, and forget |

**Stack:** TypeScript · Node · Prisma/PostgreSQL · Redis + BullMQ · MCP servers · Kubernetes · APISIX CRDs · Prometheus · Loki · Grafana · SSE<br/>
**Shape:** 20+ typed tools · bounded 14-iteration agent loop · full audit trail per execution

<br/>

### 🚀 Internal Developer Platform — one tag in, one audited rollout out

<img width="100%" alt="Delivery pipeline: tag, build, publish, catalog, request, orchestrate, rollout, live feedback" src="assets/platform-flow.svg"/>

A control plane that lets every team version, deploy and observe their services on **on-premise Kubernetes and cloud through the same contract** — instead of a pipeline ritual only three people understood.

- **A release path teams own themselves.** Branch policy decides which environments a tag is eligible for; the platform correlates tag ↔ commit ↔ pipeline so deploying a version never rebuilds it.
- **Deploys and rollbacks as first-class operations.** One click forward, one click back to the last known-good version, with the effective role resolved per project *and* per environment.
- **Real-time truth.** Webhook events — idempotent and retry-safe — streamed to the UI over SSE. No refreshing to find out whether prod is up.
- **Secrets with a paper trail.** Applied in-cluster, versioned, checksummed, masked in the UI, audited on change.
- **Observability folded back in.** Cluster metrics, alerts and logs stitched into the same project view, so diagnosis doesn't start with *"which dashboard was it?"*
- **A CLI teams actually use** — doctor checks, version registration, CI bootstrap — distributed through the internal package registry.

**Stack:** TypeScript · Express + Bun · Prisma/PostgreSQL · Angular + Tailwind · Kubernetes · GitLab CI · Kaniko · Harbor · APISIX · Prometheus/Loki/Grafana<br/>
**Shape:** hexagonal modules · 200+ automated tests · architecture verified in CI

<br/>

### 🧮 Regulated-domain AI — where a hallucination is a legal problem

<img width="100%" alt="AI reads, code computes: dual-pass extraction, human confirmation, deterministic engine" src="assets/ai-fiscal.svg"/>

A tax-filing platform where the AI does exactly one job — reading messy documents — and is *structurally* prevented from doing the other one.

**The core decision: the model never computes the number.**

- **Dual-pass extraction.** Every document is read twice, independently; disagreements surface first, with the source, for the user to resolve.
- **Human confirmation is a hard gate.** No extracted value advances until a person confirms it.
- **A pure calculation core with zero dependencies.** Every rule carries the citation that backs it, checked into the repo next to the code.
- **A golden test as the contract.** A real filing reproduced box by box: if a change breaks it, the change is wrong — unless a *newly documented rule* says otherwise.
- **Credentials that can't leak because they never exist at rest.** Portal automation runs in an isolated worker with no database access, on ephemeral in-memory sessions destroyed in a guaranteed `finally`.
- **Integer arithmetic end to end.** No floats anywhere near money.

**Stack:** TypeScript · Next.js · Turborepo · Prisma/PostgreSQL · Playwright · OpenAI-compatible LLM adapter (swapping providers is one env var) · Vitest

<br/>

### 🛡️ AI code review, alert triage & engineering automation

Smaller systems, same philosophy: **webhook-driven LLM code review** that posts inline comments anchored to the real diff with applicable suggestions, deduplicated across re-reviews and with model fallback; **AI alert triage** that turns noise into diagnosed, actionable tickets; and internal tooling that removes the toil engineers quietly absorb.

---

## The AI engineering stack I actually build with

<img width="100%" alt="Models, orchestration, tools, guardrails, evaluation, observability" src="assets/ai-stack.svg"/>

Anyone can call an API. The interesting engineering is everything below the call: **bounding what an agent can do, proving what it did, and keeping the irreversible decisions in deterministic code.**

---

## Architecture that cannot rot

<img width="100%" alt="Hexagonal architecture with boundaries enforced by lint rules and architecture tests" src="assets/hexagon.svg"/>

Hexagonal by default and — more importantly — **enforced**. Lint rules block illegal imports; architecture tests read the *real* import graph and fail CI when a layer reaches somewhere it shouldn't. Documentation drifts. Tests don't.

---

## Toolbox

<table>
<tr><td><b>Languages</b></td><td>

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
![REST](https://img.shields.io/badge/REST_%26_microservices-2563EB?style=flat-square)

</td></tr>
<tr><td><b>AI engineering</b></td><td>

![MCP](https://img.shields.io/badge/MCP-111827?style=flat-square)
![Agents](https://img.shields.io/badge/Agentic_orchestration-7C3AED?style=flat-square)
![Retrieval](https://img.shields.io/badge/Retrieval-0EA5E9?style=flat-square)
![Guardrails](https://img.shields.io/badge/Guardrails_%26_evals-F59E0B?style=flat-square)
![Claude](https://img.shields.io/badge/Claude-D97757?style=flat-square&logo=anthropic&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-4285F4?style=flat-square&logo=googlegemini&logoColor=white)
![Kimi](https://img.shields.io/badge/Kimi-1E293B?style=flat-square)

</td></tr>
<tr><td><b>Cloud &amp; platform</b></td><td>

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
<tr><td><b>Data</b></td><td>

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=flat-square&logo=oracle&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)

</td></tr>
<tr><td><b>Observability &amp; security</b></td><td>

![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white)
![Loki](https://img.shields.io/badge/Loki-F5A623?style=flat-square&logo=grafana&logoColor=white)
![Datadog](https://img.shields.io/badge/Datadog-632CA6?style=flat-square&logo=datadog&logoColor=white)
![New Relic](https://img.shields.io/badge/New_Relic-1CE783?style=flat-square&logo=newrelic&logoColor=black)
![Opsgenie](https://img.shields.io/badge/Opsgenie-172B4D?style=flat-square&logo=atlassian&logoColor=white)
![OWASP](https://img.shields.io/badge/OWASP-000000?style=flat-square&logo=owasp&logoColor=white)

</td></tr>
<tr><td><b>Quality</b></td><td>

![JUnit](https://img.shields.io/badge/JUnit-25A162?style=flat-square&logo=junit5&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=flat-square&logo=selenium&logoColor=white)
![Static analysis](https://img.shields.io/badge/Static_analysis-4E9BCD?style=flat-square&logo=sonarqube&logoColor=white)

</td></tr>
</table>

---

## What I'm working on

```text
▸ Making AI operations trustworthy enough to be boring — approvals, audit, evals, blast-radius design
▸ Payment platform modernization: resilience, traceability and continuity in critical transactional flows
▸ Internal platform engineering: the fewer decisions a team makes to ship, the faster it ships
▸ A regulated-domain AI product where the model reads and the code — only the code — decides
```

---

## GitHub

<div align="center">

<img height="165" alt="stats" src="https://github-readme-stats.vercel.app/api?username=kevinbayter&show_icons=true&theme=react&hide_border=true&bg_color=0D1117&title_color=38BDF8&icon_color=34D399&text_color=94A3B8&rank_icon=github"/>
<img height="165" alt="top languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=kevinbayter&layout=compact&theme=react&hide_border=true&bg_color=0D1117&title_color=38BDF8&text_color=94A3B8&langs_count=8"/>

<br/>

<img height="165" alt="streak" src="https://streak-stats.demolab.com?user=kevinbayter&theme=react&hide_border=true&background=0D1117&ring=38BDF8&fire=34D399&currStreakLabel=38BDF8"/>

<br/><br/>

<img width="97%" alt="contribution activity" src="https://github-readme-activity-graph.vercel.app/graph?username=kevinbayter&theme=react-dark&hide_border=true&bg_color=0D1117&color=38BDF8&line=34D399&point=A78BFA&area=true"/>

<br/>

<img alt="trophies" src="https://github-profile-trophy.vercel.app/?username=kevinbayter&theme=nord&no-frame=true&no-bg=true&column=7&margin-w=8&margin-h=8"/>

</div>

---

<div align="center">

### Let's talk

If you're building something where **AI has to be right, not just impressive** — agents with real permissions, platforms other engineers depend on, or payment systems that cannot go down — I'd like to hear about it.

<a href="https://linkedin.com/in/kevin-bayter"><img alt="LinkedIn" src="https://img.shields.io/badge/Let's_connect-2563EB?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
<a href="mailto:kevin@bayterx.com"><img alt="Email" src="https://img.shields.io/badge/Write_to_me-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/></a>
<a href="https://bayterx.com"><img alt="Portfolio" src="https://img.shields.io/badge/See_more-0F172A?style=for-the-badge&logo=google-chrome&logoColor=white"/></a>

<br/><br/>

<sub><i>"The model proposes. The code decides. The human approves."</i></sub>

</div>
