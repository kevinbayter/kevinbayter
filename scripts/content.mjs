/**
 * All copy for the profile, in both languages.
 *
 * Nothing here mentions internal project names, hosts, schemas or client data:
 * employers are public, the engineering is described in the abstract.
 */

export const LOCALES = ['en', 'es'];

export const site = {
  user: 'kevinbayter',
  portfolio: 'https://bayterx.com',
  linkedin: 'https://linkedin.com/in/kevin-bayter',
  email: 'kevin@bayterx.com',
  repo: 'https://github.com/kevinbayter/kevinbayter',
};

export const content = {
  en: {
    langLabel: 'English',
    otherLangLabel: 'Español',
    otherLangFile: 'README.es.md',
    selfFile: 'README.md',

    buttons: {
      portfolio: 'Portfolio',
      linkedin: 'LinkedIn',
      email: 'Email',
      connect: "Let's connect",
      write: 'Write to me',
      more: 'See more',
    },

    hero: {
      prompt: 'whoami',
      name: 'Kevin Bayter',
      roles: [
        'AI Engineer · agentic systems in production',
        'Tech Lead · payments & platform modernization',
        'Platform Engineer · Kubernetes, GitOps, on-prem + cloud',
        'Backend Engineer · Java, Go, TypeScript, Kotlin',
      ],
      chips: ['LLM orchestration', 'Kubernetes', 'Payments', 'Observability'],
      footer: 'Bogotá, Colombia • building systems that survive production',
    },

    whoami: {
      eyebrow: 'WHOAMI',
      heading: 'The model proposes. The code decides.',
      paragraphs: [
        "I'm a Technical Lead and Senior Software Engineer who spends most of his time on the hardest version of the AI question: not “can a model do this?”, but “can I put this in front of production and sleep at night?”",
        'I build agentic systems that touch real infrastructure — clusters, gateways, pipelines, money — with the guardrails, approval gates, audit trails and deterministic cores that make them safe enough to actually ship. Alongside that, I modernize payment platforms and build the internal platforms other engineers deploy through.',
        'I lead by building: I write the hard parts, set the architecture, and make the boundaries enforceable so the design survives the team’s third sprint under pressure.',
      ],
      code: [
        { key: 'role:     ', value: 'Technical Lead · Senior Software Engineer' },
        { key: 'focus:    ', value: 'AI engineering · platform engineering · payments' },
        { key: 'now:      ', value: 'WOM Colombia — payments + internal delivery platform' },
        { key: 'before:   ', value: 'Mercado Libre — backend, observability, AI automation' },
        { key: 'languages:', value: 'Spanish (native) · Portuguese (advanced) · English' },
        { key: 'belief:   ', value: '"the model proposes, the code decides, the human approves"' },
      ],
    },

    impact: {
      eyebrow: 'IMPACT · WHAT THE WORK ACTUALLY MOVED',
      heading: 'Numbers, not adjectives',
      cards: [
        { value: '85%+', label: 'less alert noise', sub: ['AI triage in front of', 'the on-call rotation'], bar: 0.91 },
        { value: '20+', label: 'agent tools, live', sub: ['cluster, gateway, metrics,', 'logs, traces, memory'], bar: 0.84 },
        { value: '200+', label: 'automated tests', sub: ['unit, integration and', 'architecture, gating CI'], bar: 0.96 },
        { value: '1 click', label: 'tag → prod → rollback', sub: ['an eight-step manual', 'ritual, now self-service'], bar: 1 },
        { value: 'zero', label: 'credentials persisted', sub: ['ephemeral sessions in an', 'isolated, DB-less worker'], bar: 1 },
      ],
      bullets: [
        { lead: 'Cut production alert noise by 85%+', text: 'with AI-assisted triage in front of the on-call rotation — fewer pages, faster diagnosis, less burnout.' },
        { lead: 'Turned an eight-step manual release ritual into one click,', text: 'with rollback available at every step and every action audited.' },
        { lead: 'Put an autonomous agent next to a live cluster — and made it safe.', text: 'Reads run freely, writes stop at a human approval gate, destructive operations stay blocked no matter who approves.' },
        { lead: 'Made architecture a build failure, not a code-review opinion', text: '— layer boundaries verified by automated tests on every commit.' },
        { lead: 'Zero credentials persisted', text: 'in a regulated flow that automates a government portal.' },
      ],
    },

    work: {
      eyebrow: 'SELECTED WORK',
      heading: 'Three systems, three hard problems',
      note: 'Employers are named because they are public. Internal project names, hostnames, schemas and business data are not — everything below describes architecture and engineering decisions, never a client’s internals.',
    },

    cases: [
      {
        id: 'ops-copilot',
        accent: 'violet',
        eyebrow: '01 · AGENTIC OPERATIONS',
        title: 'An LLM with its hands on production',
        intro: 'An operational agent embedded in an internal platform. Ask it “why is this service returning 5xx?” and it doesn’t guess — it goes and looks: inspects workloads, reads gateway route definitions, queries metrics, logs and traces, correlates alerts, and comes back with evidence.',
        tableHeaders: ['PROBLEM', 'ENGINEERING DECISION'],
        rows: [
          ['An LLM with cluster access is a liability', 'Every tool is risk-classified: reads execute immediately, writes become a pending action a human must confirm before anything runs'],
          ['"Approved" is not the same as "safe"', 'A hard blocklist survives approval — mass deletions, protected namespaces, nodes, cluster roles and volumes are never executable'],
          ['Tool output leaks secrets into context', 'Output is redacted before it reaches the model, not after'],
          ['A single provider is a single point of failure', 'Multi-provider routing with automatic failover, per-provider token budgets and iteration limits'],
          ['Agents that "think" silently feel broken', 'SSE streaming of partial text, live tool progress, and metric charts rendered inline in the conversation'],
          ['Agents forget what the last incident taught them', 'A persistent operational memory the agent can write to, recall from, and forget'],
        ],
        stackLabel: 'STACK',
        stack: 'TypeScript · Node · Prisma/PostgreSQL · Redis + BullMQ · MCP servers · Kubernetes · APISIX CRDs · Prometheus · Loki · Grafana · SSE',
        shapeLabel: 'SHAPE',
        shape: '20+ typed tools · bounded 14-iteration agent loop · full audit trail per execution',
      },
      {
        id: 'platform',
        accent: 'cyan',
        eyebrow: '02 · PLATFORM ENGINEERING',
        title: 'One tag in, one audited rollout out',
        intro: 'A control plane that lets every team version, deploy and observe their services on on-premise Kubernetes and cloud through the same contract — instead of a pipeline ritual only three people understood.',
        bullets: [
          { lead: 'A release path teams own themselves.', text: 'Branch policy decides which environments a tag is eligible for; the platform correlates tag, commit and pipeline so deploying a version never rebuilds it.' },
          { lead: 'Deploys and rollbacks as first-class operations.', text: 'One click forward, one click back to the last known-good version, with the effective role resolved per project and per environment.' },
          { lead: 'Real-time truth.', text: 'Webhook events — idempotent and retry-safe — streamed to the UI over SSE. No refreshing to find out whether prod is up.' },
          { lead: 'Secrets with a paper trail.', text: 'Applied in-cluster, versioned, checksummed, masked in the UI, audited on change.' },
          { lead: 'Observability folded back in.', text: 'Cluster metrics, alerts and logs stitched into the same project view, so diagnosis doesn’t start with "which dashboard was it?"' },
          { lead: 'A CLI teams actually use', text: '— doctor checks, version registration, CI bootstrap — distributed through the internal package registry.' },
        ],
        stackLabel: 'STACK',
        stack: 'TypeScript · Express + Bun · Prisma/PostgreSQL · Angular + Tailwind · Kubernetes · GitLab CI · Kaniko · Harbor · APISIX · Prometheus/Loki/Grafana',
        shapeLabel: 'SHAPE',
        shape: 'hexagonal modules · 200+ automated tests · architecture verified in CI',
      },
      {
        id: 'fiscal',
        accent: 'green',
        eyebrow: '03 · AI IN A REGULATED DOMAIN',
        title: 'Where a hallucination is a legal problem',
        intro: 'A tax-filing platform where the AI does exactly one job — reading messy documents — and is structurally prevented from doing the other one. The core decision: the model never computes the number.',
        bullets: [
          { lead: 'Dual-pass extraction.', text: 'Every document is read twice, independently; disagreements surface first, with the source, for the user to resolve.' },
          { lead: 'Human confirmation is a hard gate.', text: 'No extracted value advances until a person confirms it.' },
          { lead: 'A pure calculation core with zero dependencies.', text: 'Every rule carries the citation that backs it, checked into the repo next to the code.' },
          { lead: 'A golden test as the contract.', text: 'A real filing reproduced box by box: if a change breaks it, the change is wrong — unless a newly documented rule says otherwise.' },
          { lead: 'Credentials that can’t leak because they never exist at rest.', text: 'Portal automation runs in an isolated worker with no database access, on ephemeral in-memory sessions destroyed in a guaranteed finally.' },
          { lead: 'Integer arithmetic end to end.', text: 'No floats anywhere near money.' },
        ],
        stackLabel: 'STACK',
        stack: 'TypeScript · Next.js · Turborepo · Prisma/PostgreSQL · Playwright · OpenAI-compatible LLM adapter (swapping providers is one env var) · Vitest',
      },
      {
        id: 'smaller',
        accent: 'amber',
        eyebrow: '04 · SMALLER SYSTEMS, SAME PHILOSOPHY',
        title: 'AI code review, alert triage & engineering automation',
        intro: 'Webhook-driven LLM code review that posts inline comments anchored to the real diff with applicable suggestions, deduplicated across re-reviews and with model fallback. AI alert triage that turns noise into diagnosed, actionable tickets. And internal tooling that removes the toil engineers quietly absorb.',
      },
    ],

    aiStack: {
      eyebrow: 'AI ENGINEERING',
      heading: 'The stack I actually build with',
      closing: 'Anyone can call an API. The interesting engineering is everything below the call: bounding what an agent can do, proving what it did, and keeping the irreversible decisions in deterministic code.',
    },

    arch: {
      eyebrow: 'ARCHITECTURE',
      heading: 'Boundaries that cannot rot',
      closing: 'Hexagonal by default and — more importantly — enforced. Lint rules block illegal imports; architecture tests read the real import graph and fail CI when a layer reaches somewhere it shouldn’t. Documentation drifts. Tests don’t.',
    },

    toolbox: {
      eyebrow: 'TOOLBOX',
      heading: 'What I reach for',
      groups: [
        { label: 'Languages', color: 'blue', items: ['Java', 'Go', 'TypeScript', 'Kotlin', 'Python', 'SQL'] },
        { label: 'Backend', color: 'cyan', items: ['Spring Boot', 'WebFlux', 'Node.js', 'Bun', 'Kafka', 'GraphQL', 'REST · microservices'] },
        { label: 'AI engineering', color: 'violet', items: ['MCP', 'Agentic orchestration', 'Retrieval', 'Guardrails & evals', 'Claude', 'OpenAI', 'Gemini', 'Kimi'] },
        { label: 'Cloud & platform', color: 'green', items: ['Kubernetes', 'Docker', 'AWS', 'GCP', 'Azure', 'Terraform', 'GitLab CI', 'ArgoCD', 'APISIX'] },
        { label: 'Data', color: 'amber', items: ['PostgreSQL', 'Oracle', 'MySQL', 'MongoDB', 'Redis'] },
        { label: 'Observability & security', color: 'blue', items: ['Grafana', 'Prometheus', 'Loki', 'Datadog', 'New Relic', 'Opsgenie', 'OWASP'] },
        { label: 'Quality', color: 'cyan', items: ['JUnit', 'Jest', 'Vitest', 'Playwright', 'Selenium', 'Static analysis'] },
      ],
    },

    now: {
      eyebrow: 'CURRENTLY',
      heading: 'What I am working on',
      terminalTitle: 'now.txt',
      lines: [
        'Making AI operations trustworthy enough to be boring',
        '  — approvals, audit, evals, blast-radius design',
        'Payment platform modernization: resilience, traceability and',
        '  continuity in critical transactional flows',
        'Internal platform engineering: the fewer decisions a team makes',
        '  to ship, the faster it ships',
        'A regulated-domain AI product where the model reads and the code',
        '  — only the code — decides',
      ],
    },

    github: {
      eyebrow: 'GITHUB',
      heading: 'Activity',
      note: 'Rendered from the GitHub API by a scheduled workflow in this repo — no third-party image service to go down.',
      statLabels: {
        contributions: 'total contributions',
        thisYear: 'this year',
        streak: 'current streak',
        longest: 'longest streak',
        repos: 'public repos',
        stars: 'stars earned',
        followers: 'followers',
        busiest: 'busiest day',
        languages: 'MOST USED LANGUAGES',
        updated: 'updated',
        days: 'days',
        year: 'year',
      },
    },

    contact: {
      eyebrow: "LET'S TALK",
      heading: 'If it has to be right, not just impressive',
      body: 'If you’re building something where AI has to be correct — agents with real permissions, platforms other engineers depend on, or payment systems that cannot go down — I’d like to hear about it.',
      quote: '"The model proposes. The code decides. The human approves."',
    },
  },

  es: {
    langLabel: 'Español',
    otherLangLabel: 'English',
    otherLangFile: 'README.md',
    selfFile: 'README.es.md',

    buttons: {
      portfolio: 'Portafolio',
      linkedin: 'LinkedIn',
      email: 'Email',
      connect: 'Conectemos',
      write: 'Escríbeme',
      more: 'Ver más',
    },

    hero: {
      prompt: 'whoami',
      name: 'Kevin Bayter',
      roles: [
        'AI Engineer · sistemas agénticos en producción',
        'Líder Técnico · pagos y modernización de plataformas',
        'Platform Engineer · Kubernetes, GitOps, on-prem + cloud',
        'Backend Engineer · Java, Go, TypeScript, Kotlin',
      ],
      chips: ['Orquestación LLM', 'Kubernetes', 'Pagos', 'Observabilidad'],
      footer: 'Bogotá, Colombia • sistemas que sobreviven a producción',
    },

    whoami: {
      eyebrow: 'WHOAMI',
      heading: 'El modelo propone. El código decide.',
      paragraphs: [
        'Soy Líder Técnico y Senior Software Engineer, y dedico la mayor parte de mi tiempo a la versión difícil de la pregunta sobre IA: no “¿puede un modelo hacer esto?”, sino “¿puedo poner esto frente a producción y dormir tranquilo?”',
        'Construyo sistemas agénticos que tocan infraestructura real — clústeres, gateways, pipelines, dinero — con los guardrails, las compuertas de aprobación, la trazabilidad y los núcleos deterministas que los hacen lo bastante seguros como para desplegarlos de verdad. En paralelo, modernizo plataformas de pagos y construyo las plataformas internas por las que despliegan otros equipos.',
        'Lidero construyendo: escribo las partes difíciles, defino la arquitectura y hago que los límites sean exigibles, para que el diseño sobreviva al tercer sprint del equipo bajo presión.',
      ],
      code: [
        { key: 'rol:     ', value: 'Líder Técnico · Senior Software Engineer' },
        { key: 'foco:    ', value: 'ingeniería de IA · platform engineering · pagos' },
        { key: 'hoy:     ', value: 'WOM Colombia — pagos + plataforma interna de despliegue' },
        { key: 'antes:   ', value: 'Mercado Libre — backend, observabilidad, automatización IA' },
        { key: 'idiomas: ', value: 'Español (nativo) · Portugués (avanzado) · Inglés' },
        { key: 'creencia:', value: '"el modelo propone, el código decide, el humano aprueba"' },
      ],
    },

    impact: {
      eyebrow: 'IMPACTO · LO QUE EL TRABAJO REALMENTE MOVIÓ',
      heading: 'Números, no adjetivos',
      cards: [
        { value: '85%+', label: 'menos ruido de alertas', sub: ['triage con IA delante', 'de la guardia'], bar: 0.91 },
        { value: '20+', label: 'herramientas del agente', sub: ['clúster, gateway, métricas,', 'logs, trazas, memoria'], bar: 0.84 },
        { value: '200+', label: 'tests automatizados', sub: ['unitarios, integración y', 'arquitectura, en el CI'], bar: 0.96 },
        { value: '1 clic', label: 'tag → prod → rollback', sub: ['un ritual manual de ocho', 'pasos, ahora self-service'], bar: 1 },
        { value: 'cero', label: 'credenciales guardadas', sub: ['sesiones efímeras en un', 'worker aislado, sin BD'], bar: 1 },
      ],
      bullets: [
        { lead: 'Reduje el ruido de alertas en producción más de un 85%', text: 'con triage asistido por IA delante de la guardia — menos llamadas, diagnóstico más rápido, menos desgaste.' },
        { lead: 'Convertí un ritual manual de ocho pasos en un solo clic,', text: 'con rollback disponible en cada etapa y todas las acciones auditadas.' },
        { lead: 'Puse un agente autónomo junto a un clúster vivo — y lo hice seguro.', text: 'Las lecturas corren libres, las escrituras se detienen en una compuerta de aprobación humana, y las operaciones destructivas siguen bloqueadas sin importar quién apruebe.' },
        { lead: 'Convertí la arquitectura en un fallo de build, no en una opinión de code review', text: '— los límites entre capas se verifican con tests automáticos en cada commit.' },
        { lead: 'Cero credenciales persistidas', text: 'en un flujo regulado que automatiza un portal estatal.' },
      ],
    },

    work: {
      eyebrow: 'TRABAJO DESTACADO',
      heading: 'Tres sistemas, tres problemas difíciles',
      note: 'Nombro a las empresas porque son públicas. Los nombres de proyectos internos, hosts, esquemas y datos de negocio no lo son — todo lo que sigue describe arquitectura y decisiones de ingeniería, nunca los internals de un cliente.',
    },

    cases: [
      {
        id: 'ops-copilot',
        accent: 'violet',
        eyebrow: '01 · OPERACIONES AGÉNTICAS',
        title: 'Un LLM con las manos en producción',
        intro: 'Un agente operativo embebido en una plataforma interna. Le preguntas “¿por qué este servicio está devolviendo 5xx?” y no adivina: va y mira. Inspecciona workloads, lee las definiciones de rutas del gateway, consulta métricas, logs y trazas, correlaciona alertas y vuelve con evidencia.',
        tableHeaders: ['PROBLEMA', 'DECISIÓN DE INGENIERÍA'],
        rows: [
          ['Un LLM con acceso al clúster es un pasivo', 'Cada herramienta está clasificada por riesgo: las lecturas se ejecutan de inmediato, las escrituras se vuelven una acción pendiente que un humano debe confirmar'],
          ['"Aprobado" no es lo mismo que "seguro"', 'Una lista de bloqueo dura sobrevive a la aprobación: borrados masivos, namespaces protegidos, nodos, cluster roles y volúmenes nunca son ejecutables'],
          ['La salida de las herramientas filtra secretos', 'La salida se redacta antes de llegar al modelo, no después'],
          ['Un solo proveedor es un punto único de falla', 'Enrutamiento multi-proveedor con failover automático, presupuestos de tokens por proveedor y límite de iteraciones'],
          ['Un agente que "piensa" en silencio parece roto', 'Streaming por SSE del texto parcial, el progreso de cada herramienta y gráficas de métricas dentro de la conversación'],
          ['Los agentes olvidan lo que enseñó el último incidente', 'Una memoria operativa persistente que el agente puede escribir, recordar y olvidar'],
        ],
        stackLabel: 'STACK',
        stack: 'TypeScript · Node · Prisma/PostgreSQL · Redis + BullMQ · servidores MCP · Kubernetes · CRDs de APISIX · Prometheus · Loki · Grafana · SSE',
        shapeLabel: 'FORMA',
        shape: '20+ herramientas tipadas · loop agéntico acotado a 14 iteraciones · trazabilidad completa por ejecución',
      },
      {
        id: 'platform',
        accent: 'cyan',
        eyebrow: '02 · PLATFORM ENGINEERING',
        title: 'Entra un tag, sale un rollout auditado',
        intro: 'Un control plane que permite a cada equipo versionar, desplegar y observar sus servicios sobre Kubernetes on-premise y cloud bajo el mismo contrato — en lugar de un ritual de pipelines que solo tres personas entendían.',
        bullets: [
          { lead: 'Un camino a producción que los equipos manejan solos.', text: 'La política de ramas decide a qué ambientes es elegible un tag; la plataforma correlaciona tag, commit y pipeline, así que desplegar una versión nunca la reconstruye.' },
          { lead: 'Deploys y rollbacks como operaciones de primera clase.', text: 'Un clic hacia adelante, un clic de vuelta a la última versión buena conocida, con el rol efectivo resuelto por proyecto y por ambiente.' },
          { lead: 'Verdad en tiempo real.', text: 'Eventos de webhook — idempotentes y tolerantes a reintentos — transmitidos a la UI por SSE. Sin refrescar para saber si producción está arriba.' },
          { lead: 'Secretos con rastro auditable.', text: 'Aplicados dentro del clúster, versionados, con checksum, enmascarados en la UI y auditados en cada cambio.' },
          { lead: 'Observabilidad de vuelta al mismo lugar.', text: 'Métricas, alertas y logs del clúster integrados en la vista del proyecto, para que el diagnóstico no empiece con "¿en cuál dashboard era?"' },
          { lead: 'Un CLI que los equipos sí usan', text: '— chequeos de salud, registro de versiones, bootstrap de CI — distribuido por el package registry interno.' },
        ],
        stackLabel: 'STACK',
        stack: 'TypeScript · Express + Bun · Prisma/PostgreSQL · Angular + Tailwind · Kubernetes · GitLab CI · Kaniko · Harbor · APISIX · Prometheus/Loki/Grafana',
        shapeLabel: 'FORMA',
        shape: 'módulos hexagonales · 200+ tests automatizados · arquitectura verificada en CI',
      },
      {
        id: 'fiscal',
        accent: 'green',
        eyebrow: '03 · IA EN DOMINIO REGULADO',
        title: 'Donde una alucinación es un problema legal',
        intro: 'Una plataforma de declaración de renta donde la IA hace exactamente un trabajo — leer documentos desordenados — y está estructuralmente impedida de hacer el otro. La decisión central: el modelo nunca calcula el número.',
        bullets: [
          { lead: 'Extracción de doble pasada.', text: 'Cada documento se lee dos veces, de forma independiente; las discrepancias salen primero, con la fuente al lado, para que el usuario las resuelva.' },
          { lead: 'La confirmación humana es una compuerta dura.', text: 'Ningún valor extraído avanza hasta que una persona lo confirma.' },
          { lead: 'Un núcleo de cálculo puro, con cero dependencias.', text: 'Cada regla lleva la cita normativa que la respalda, versionada en el repositorio junto al código.' },
          { lead: 'Un golden test como contrato.', text: 'Una declaración real reproducida casilla por casilla: si un cambio lo rompe, el cambio está mal — salvo que exista una regla nueva documentada.' },
          { lead: 'Credenciales que no se pueden filtrar porque nunca existen en reposo.', text: 'La automatización del portal corre en un worker aislado sin acceso a la base de datos, sobre sesiones efímeras destruidas en un finally garantizado.' },
          { lead: 'Aritmética entera de punta a punta.', text: 'Ni un solo float cerca del dinero.' },
        ],
        stackLabel: 'STACK',
        stack: 'TypeScript · Next.js · Turborepo · Prisma/PostgreSQL · Playwright · adaptador LLM compatible con OpenAI (cambiar de proveedor es una variable de entorno) · Vitest',
      },
      {
        id: 'smaller',
        accent: 'amber',
        eyebrow: '04 · SISTEMAS MÁS PEQUEÑOS, MISMA FILOSOFÍA',
        title: 'Code review con IA, triage de alertas y automatización',
        intro: 'Code review con LLM disparado por webhooks, que publica comentarios inline anclados al diff real con sugerencias aplicables, deduplicados entre re-reviews y con fallback de modelos. Triage de alertas con IA que convierte ruido en tickets diagnosticados y accionables. Y herramientas internas que eliminan el trabajo tedioso que los equipos absorben en silencio.',
      },
    ],

    aiStack: {
      eyebrow: 'INGENIERÍA DE IA',
      heading: 'El stack con el que realmente construyo',
      closing: 'Cualquiera puede llamar a una API. La ingeniería interesante es todo lo que está debajo de esa llamada: acotar lo que un agente puede hacer, poder probar lo que hizo, y mantener las decisiones irreversibles en código determinista.',
    },

    arch: {
      eyebrow: 'ARQUITECTURA',
      heading: 'Límites que no se pudren',
      closing: 'Hexagonal por defecto y — más importante — exigida. Las reglas de lint bloquean los imports ilegales; los tests de arquitectura leen el grafo de imports real y hacen fallar el CI cuando una capa alcanza donde no debe. La documentación se desactualiza. Los tests no.',
    },

    toolbox: {
      eyebrow: 'HERRAMIENTAS',
      heading: 'Con qué trabajo',
      groups: [
        { label: 'Lenguajes', color: 'blue', items: ['Java', 'Go', 'TypeScript', 'Kotlin', 'Python', 'SQL'] },
        { label: 'Backend', color: 'cyan', items: ['Spring Boot', 'WebFlux', 'Node.js', 'Bun', 'Kafka', 'GraphQL', 'REST · microservicios'] },
        { label: 'Ingeniería de IA', color: 'violet', items: ['MCP', 'Orquestación agéntica', 'Retrieval', 'Guardrails y evals', 'Claude', 'OpenAI', 'Gemini', 'Kimi'] },
        { label: 'Cloud y plataforma', color: 'green', items: ['Kubernetes', 'Docker', 'AWS', 'GCP', 'Azure', 'Terraform', 'GitLab CI', 'ArgoCD', 'APISIX'] },
        { label: 'Datos', color: 'amber', items: ['PostgreSQL', 'Oracle', 'MySQL', 'MongoDB', 'Redis'] },
        { label: 'Observabilidad y seguridad', color: 'blue', items: ['Grafana', 'Prometheus', 'Loki', 'Datadog', 'New Relic', 'Opsgenie', 'OWASP'] },
        { label: 'Calidad', color: 'cyan', items: ['JUnit', 'Jest', 'Vitest', 'Playwright', 'Selenium', 'Análisis estático'] },
      ],
    },

    now: {
      eyebrow: 'AHORA',
      heading: 'En lo que estoy trabajando',
      terminalTitle: 'ahora.txt',
      lines: [
        'Hacer que las operaciones con IA sean confiables al punto de ser',
        '  aburridas — aprobaciones, auditoría, evals, radio de impacto',
        'Modernización de plataformas de pago: resiliencia, trazabilidad y',
        '  continuidad en flujos transaccionales críticos',
        'Platform engineering interno: entre menos decisiones tome un equipo',
        '  para desplegar, más rápido despliega',
        'Un producto de IA en dominio regulado donde el modelo lee y el código',
        '  — solo el código — decide',
      ],
    },

    github: {
      eyebrow: 'GITHUB',
      heading: 'Actividad',
      note: 'Generado desde la API de GitHub por un workflow programado en este repositorio — sin servicios de imágenes de terceros que se puedan caer.',
      statLabels: {
        contributions: 'contribuciones totales',
        thisYear: 'este año',
        streak: 'racha actual',
        longest: 'racha más larga',
        repos: 'repos públicos',
        stars: 'estrellas recibidas',
        followers: 'seguidores',
        busiest: 'día más activo',
        languages: 'LENGUAJES MÁS USADOS',
        updated: 'actualizado',
        days: 'días',
        year: 'año',
      },
    },

    contact: {
      eyebrow: 'HABLEMOS',
      heading: 'Si tiene que acertar, no solo impresionar',
      body: 'Si estás construyendo algo donde la IA tiene que acertar — agentes con permisos reales, plataformas de las que dependen otros ingenieros, o sistemas de pago que no se pueden caer — me gustaría escucharlo.',
      quote: '"El modelo propone. El código decide. El humano aprueba."',
    },
  },
};
