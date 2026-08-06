import type { LanguageCode } from '../../../core/i18n/language.service';

export interface BlogSection {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
  readonly ordered?: readonly string[];
}

export interface BlogPostTranslation {
  readonly seoTitle: string;
  readonly metaDescription: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly readTime: string;
  readonly cta: string;
  readonly goal: string;
  readonly sections: readonly BlogSection[];
}

export interface BlogPost {
  readonly slug: string;
  readonly image: string;
  readonly imageAlt: Record<LanguageCode, string>;
  readonly accent: 'signal' | 'trust';
  readonly translations: Record<LanguageCode, BlogPostTranslation>;
}

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'software-a-medida',
    image: 'assets/blog/custom-software.png',
    accent: 'signal',
    imageAlt: {
      es: 'Flujos de trabajo dispersos que se transforman en una plataforma de software modular.',
      en: 'Scattered workflows turning into a modular software platform.',
      eu: 'Lan-fluxu sakabanatuak software plataforma modular batean bihurtzen.',
    },
    translations: {
      es: {
        seoTitle: 'Software a medida: qué es y cuándo tu empresa realmente lo necesita',
        metaDescription:
          'Un software genérico resuelve rápido, pero a veces cuesta más caro a largo plazo. Te contamos cuándo conviene un desarrollo a medida y cómo evaluarlo.',
        title: 'Software a medida: qué es y cuándo tu empresa realmente lo necesita',
        excerpt:
          'Un software genérico resuelve rápido, pero a veces cuesta más caro a largo plazo. El punto está en entender qué tan particular es tu proceso.',
        category: 'Software Factory',
        readTime: '5 min de lectura',
        cta: 'Agendá una consultoría de diagnóstico gratuita y evaluamos juntos si tu caso lo justifica.',
        goal: 'Objetivo asociado: generación de leads calificados',
        sections: [
          {
            heading: 'Comprar un software de catálogo es rápido. El problema aparece después.',
            paragraphs: [
              'Una solución genérica te tiene funcionando en semanas. El costo oculto aparece seis meses más tarde, cuando tu equipo termina adaptando su forma de trabajar al sistema, en vez de que el sistema se adapte a cómo trabaja realmente tu empresa: hojas de cálculo paralelas, pasos manuales que nadie documentó, "trucos" que todo el equipo conoce pero que no están en ningún manual.',
            ],
          },
          {
            heading:
              'La pregunta correcta no es "cuánto cuesta", es "qué tan particular es mi proceso"',
            paragraphs: [
              'El software a medida no es una opción premium reservada para empresas grandes. Es la respuesta a una pregunta puntual: ¿tu forma de operar es lo bastante específica como para que una herramienta genérica te obligue a compensar todos los días? Si la respuesta es sí, un desarrollo propio deja de ser un gasto y se convierte en una inversión que se paga sola con el tiempo que deja de perderse en parches.',
            ],
          },
          {
            heading: 'Qué entra dentro de "software a medida"',
            paragraphs: ['En Ekin Kruz trabajamos en cuatro frentes concretos:'],
            bullets: [
              'Aplicaciones web y mobile pensadas para un flujo de trabajo específico, no genérico.',
              'Sistemas de gestión internos (stock, producción, turnos, clientes) que reemplazan planillas y procesos manuales.',
              'Plataformas digitales completas cuando el proyecto excede una sola aplicación.',
              'Integración de APIs y sistemas existentes (ERP, CRM, herramientas propias) para que dejen de funcionar como islas separadas.',
            ],
          },
          {
            heading: 'Cómo evaluamos un proyecto antes de proponer una solución',
            paragraphs: [
              'No arrancamos por la tecnología. Arrancamos por mapear el proceso actual: qué se hace hoy, dónde se pierde tiempo, quién usa qué herramienta y por qué apareció ese "parche" en primer lugar. Recién con ese mapa tiene sentido decidir arquitectura, stack tecnológico y alcance, porque un desarrollo bien pensado ahorra más por lo que no hay que reconstruir en dos años que por lo que cuesta hoy.',
            ],
          },
          {
            heading: '¿Cómo saber si te conviene a vos?',
            paragraphs: [
              'Una señal simple: si tu equipo ya inventó una forma "no oficial" de resolver algo que el sistema actual no contempla, ese punto es, casi siempre, donde arranca un buen proyecto de software a medida.',
            ],
          },
        ],
      },
      en: {
        seoTitle: 'Custom Software Development: What It Is and When Your Company Actually Needs It',
        metaDescription:
          "Off-the-shelf software is fast to deploy, but it isn't always the cheaper option long-term. Here's how to know when custom development makes sense.",
        title: 'Custom Software Development: What It Is and When Your Company Actually Needs It',
        excerpt:
          "Off-the-shelf software is fast to deploy, but it isn't always cheaper long-term. The key is understanding how specific your process really is.",
        category: 'Software Factory',
        readTime: '5 min read',
        cta: "Book a free diagnostic consultation and let's evaluate your case together.",
        goal: 'Associated goal: qualified lead generation',
        sections: [
          {
            heading: 'Off-the-shelf software is fast to deploy. The real cost shows up later.',
            paragraphs: [
              'A generic tool gets you running in weeks. The hidden cost shows up six months later, when your team ends up adapting how it works to fit the system, instead of the system fitting how your business actually operates: parallel spreadsheets, undocumented manual steps, "workarounds" the whole team knows about but that live nowhere official.',
            ],
          },
          {
            heading:
              'The right question is not "how much does it cost" but "how specific is my process"',
            paragraphs: [
              "Custom software isn't a premium option reserved for large enterprises. It's the answer to one specific question: is your way of operating specific enough that a generic tool forces you to compensate for it every single day? If the answer is yes, custom development stops being an expense and becomes an investment that pays for itself in the time no longer lost to patches.",
            ],
          },
          {
            heading: 'What "custom software" covers',
            paragraphs: ['At Ekin Kruz we work across four concrete areas:'],
            bullets: [
              'Web and mobile applications built around a specific workflow, not a generic one.',
              'Internal management systems (inventory, production, scheduling, customers) that replace spreadsheets and manual processes.',
              'Full digital platforms when a project outgrows a single application.',
              'API integration with existing systems (ERP, CRM, in-house tools) so they stop operating as disconnected islands.',
            ],
          },
          {
            heading: 'How we evaluate a project before proposing a solution',
            paragraphs: [
              'We do not start with technology. We start by mapping the current process: what happens today, where time gets lost, who uses which tool and why that "workaround" appeared in the first place. Only with that map does it make sense to decide architecture, tech stack, and scope, because a well-thought-out build saves more by what will not need to be rebuilt in two years than by what it costs today.',
            ],
          },
          {
            heading: 'How do you know if this applies to you?',
            paragraphs: [
              'A simple signal: if your team already invented an "unofficial" way to solve something the current system does not support, that is almost always where a good custom software project begins.',
            ],
          },
        ],
      },
      eu: {
        seoTitle:
          'Neurrira egindako softwarea: zer den eta noiz behar duen benetan zure enpresak',
        metaDescription:
          'Software generiko batek azkar konpontzen du, baina epe luzera garestiagoa izan daiteke. Noiz komeni den neurrira egindako garapena azaltzen dugu.',
        title: 'Neurrira egindako softwarea: zer den eta noiz behar duen benetan zure enpresak',
        excerpt:
          'Software generiko batek azkar konpontzen du, baina epe luzera ez da beti merkeena. Gakoa zure prozesua zenbateraino den berezia ulertzea da.',
        category: 'Software Factory',
        readTime: '5 min irakurketa',
        cta: 'Diagnostiko-kontsulta doakoa adostu eta zure kasuak zentzua duen elkarrekin ebaluatuko dugu.',
        goal: 'Lotutako helburua: lead kualifikatuak sortzea',
        sections: [
          {
            heading:
              'Katalogoko software bat erostea azkarra da. Arazoa geroago agertzen da.',
            paragraphs: [
              'Soluzio generiko batek aste gutxitan martxan jartzen zaitu. Kostu ezkutua sei hilabete geroago agertzen da, zure taldeak lan egiteko modua sistemara egokitzen amaitzen duenean, sistemak enpresak benetan lan egiten duen modura egokitu beharrean: kalkulu-orri paraleloak, inork dokumentatu gabeko urrats manualak eta talde osoak ezagutzen dituen baina eskuliburutan agertzen ez diren "trikimailuak".',
            ],
          },
          {
            heading:
              'Galdera zuzena ez da "zenbat balio du?", baizik eta "zenbateraino da berezia nire prozesua?"',
            paragraphs: [
              'Neurrira egindako softwarea ez da enpresa handientzat bakarrik gordetako aukera premium bat. Galdera zehatz bati emandako erantzuna da: zure jarduteko modua nahikoa berezia al da tresna generiko batek egunero konpentsatzera behartzeko? Erantzuna bai bada, garapen propioa gastu izateari utzi eta denboran galtzen ez den lanarekin bere burua ordaintzen duen inbertsio bihurtzen da.',
            ],
          },
          {
            heading: 'Zer sartzen da "neurrira egindako softwarearen" barruan',
            paragraphs: ['Ekin Kruzen lau arlo zehatzetan lan egiten dugu:'],
            bullets: [
              'Lan-fluxu zehatz baterako pentsatutako web eta mobile aplikazioak, ez generikoak.',
              'Barne kudeaketa-sistemak (stocka, produkzioa, txandak, bezeroak), kalkulu-orriak eta prozesu manualak ordezkatzeko.',
              'Plataforma digital osoak, proiektuak aplikazio bakar bat gainditzen duenean.',
              'APIen eta lehendik dauden sistemen integrazioa (ERP, CRM, tresna propioak), uharte bereizi gisa funtzionatzeari utz diezaioten.',
            ],
          },
          {
            heading: 'Nola ebaluatzen dugu proiektu bat soluzioa proposatu aurretik',
            paragraphs: [
              'Ez gara teknologiatik hasten. Gaur egungo prozesua mapatzetik hasten gara: zer egiten den gaur, non galtzen den denbora, nork erabiltzen duen tresna bakoitza eta zergatik agertu zen "adabaki" hori lehenik. Mapa hori izan arte ez du zentzurik arkitektura, stack teknologikoa eta irismena erabakitzeak; ondo pentsatutako garapen batek gaur kostatzen denagatik baino gehiago aurrezten du bi urte barru berreraiki beharko ez denagatik.',
            ],
          },
          {
            heading: 'Nola jakin komeni zaizun?',
            paragraphs: [
              'Seinale sinple bat: zure taldeak jada sistema egungoak aurreikusten ez duen zerbait konpontzeko modu "ez ofizial" bat asmatu badu, puntu horretan hasten da, ia beti, neurrira egindako software-proiektu on bat.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'experiencias-3d-interactivas',
    image: 'assets/blog/interactive-3d-experiences.png',
    accent: 'trust',
    imageAlt: {
      es: 'Persona explorando una experiencia 3D interactiva con capas de datos y narrativa.',
      en: 'Person exploring an interactive 3D experience with data layers and narrative path.',
      eu: 'Pertsona bat datu-geruzak eta narrazio-bidea dituen 3D esperientzia interaktiboa arakatzen.',
    },
    translations: {
      es: {
        seoTitle: 'Experiencias 3D interactivas: qué son y por qué son el diferencial de Ekin Kruz',
        metaDescription:
          'Diseño, tecnología y narrativa combinados en una sola experiencia. Así pensamos las experiencias 3D interactivas para educación, industria y arquitectura.',
        title: 'Experiencias 3D interactivas: qué son y por qué son el diferencial de Ekin Kruz',
        excerpt:
          'Diseño, tecnología, datos y narrativa combinados para que una persona no solo vea algo complejo, sino que lo explore.',
        category: 'Experiencias 3D',
        readTime: '4 min de lectura',
        cta: 'Conocé cómo estamos armando nuestro primer portfolio de proyectos demo.',
        goal: 'Objetivo asociado: portfolio y visibilidad de marca',
        sections: [
          {
            heading: 'Mostrar algo no es lo mismo que hacer que se entienda',
            paragraphs: [
              'Un video explica un proceso complejo. Una experiencia 3D interactiva hace que la persona lo explore, lo manipule y se lo apropie, y ese pequeño cambio, de mirar a hacer, es lo que determina cuánto se retiene y cuánto convence realmente.',
            ],
          },
          {
            heading: 'No es "un modelo 3D lindo"',
            paragraphs: [
              'Es fácil confundir experiencia 3D interactiva con un render vistoso para una landing page. La diferencia está en que una experiencia bien diseñada combina cuatro capas al mismo tiempo: diseño, tecnología, datos y narrativa. Sacar cualquiera de esas cuatro capas convierte una experiencia en una simple curiosidad visual.',
            ],
          },
          {
            heading: 'Dónde tiene más sentido usarla',
            bullets: [
              'Educación: módulos interactivos que reemplazan la lámina estática por algo que se explora capa por capa.',
              'Industria: gemelos digitales para entrenar o visualizar procesos sin exponer a nadie a un riesgo real ni detener la producción.',
              'Arquitectura y real estate: recorridos de un espacio antes de que exista físicamente.',
              'Marketing y comunicación: infografías o presentaciones de producto que se navegan en vez de solo leerse.',
            ],
          },
          {
            heading: 'Cómo encaramos un proyecto de este tipo',
            paragraphs: [
              'Empezamos por la misma pregunta en todos los casos: ¿qué necesita entender o sentir la persona que va a usar esto, y en qué orden? Esa respuesta define la narrativa antes de tocar cualquier herramienta de modelado 3D, porque una experiencia técnicamente impecable pero mal pensada en su narrativa termina siendo una demo bonita, sin impacto real.',
            ],
          },
          {
            heading: 'El criterio para saber si tiene sentido para tu proyecto',
            paragraphs: [
              'Si hoy explicás algo complejo con una lámina, un video o una planilla, y notás que la otra persona necesita "verlo" más de una vez para entenderlo del todo, ahí es exactamente donde una experiencia interactiva 3D suele marcar la diferencia frente a un contenido estático.',
            ],
          },
        ],
      },
      en: {
        seoTitle:
          "Interactive 3D Experiences: What They Are and Why They're Ekin Kruz's Flagship Product",
        metaDescription:
          "Design, technology, and storytelling combined into one experience. Here's how we approach interactive 3D for education, industry, and architecture.",
        title: "Interactive 3D Experiences: What They Are and Why They're Ekin Kruz's Flagship Product",
        excerpt:
          'Design, technology, data, and storytelling combined so a person does not just see something complex, but explores it.',
        category: '3D Experiences',
        readTime: '4 min read',
        cta: "See how we're building our first portfolio of demo projects.",
        goal: 'Associated goal: portfolio and brand visibility',
        sections: [
          {
            heading: "Showing something isn't the same as making it understood",
            paragraphs: [
              'A video can explain a complex process. An interactive 3D experience lets a person explore it, manipulate it, and make it their own, and that shift, from watching to doing, is what determines how much gets retained and how persuasive it really is.',
            ],
          },
          {
            heading: 'It is not "a nice 3D model"',
            paragraphs: [
              'It is easy to confuse an interactive 3D experience with an impressive render on a landing page. The difference lies in combining four layers at once: design, technology, data, and narrative. Drop any one of those four layers and the experience becomes a visual curiosity rather than a tool.',
            ],
          },
          {
            heading: 'Where it makes the most sense',
            bullets: [
              'Education: interactive modules that replace the static diagram with something explored layer by layer.',
              'Industry: digital twins that let teams train on or visualize plant processes without real risk or stopping production.',
              'Architecture and real estate: walking through a space before it physically exists.',
              'Marketing and communication: infographics or product presentations that get navigated instead of just read.',
            ],
          },
          {
            heading: 'How we approach a project like this',
            paragraphs: [
              'We start with the same question every time: what does the person using this need to understand or feel, and in what order? That answer shapes the narrative before we touch any 3D modeling tool, because a technically flawless experience with a poorly thought-out narrative ends up being a pretty demo with no real impact.',
            ],
          },
          {
            heading: 'A simple test for whether it fits your project',
            paragraphs: [
              'If you currently explain something complex with a static diagram, a video, or a spreadsheet, and notice the other person needs to "see it" more than once to fully get it, that is usually exactly where an interactive 3D experience makes a real difference over static content.',
            ],
          },
        ],
      },
      eu: {
        seoTitle:
          '3D esperientzia interaktiboak: zer diren eta zergatik diren Ekin Kruzen bereizgarria',
        metaDescription:
          'Diseinua, teknologia eta narrazioa esperientzia bakarrean. Horrela pentsatzen ditugu 3D esperientzia interaktiboak hezkuntzarako, industriarako eta arkitekturarako.',
        title:
          '3D esperientzia interaktiboak: zer diren eta zergatik diren Ekin Kruzen bereizgarria',
        excerpt:
          'Diseinua, teknologia, datuak eta narrazioa uztartuta, pertsona batek zerbait konplexua ikusi ez ezik arakatu dezan.',
        category: '3D esperientziak',
        readTime: '4 min irakurketa',
        cta: 'Ezagutu nola ari garen gure lehen demo-proiektuen portfolioa eraikitzen.',
        goal: 'Lotutako helburua: portfolioa eta markaren ikusgarritasuna',
        sections: [
          {
            heading: 'Zerbait erakustea ez da ulertaraztea bezalakoa',
            paragraphs: [
              'Bideo batek prozesu konplexu bat azal dezake. 3D esperientzia interaktibo batek pertsonari hura arakatu, manipulatu eta bere egiteko aukera ematen dio; eta aldaketa txiki horrek, ikustetik egitera igarotzeak, erabakitzen du zenbat atxikitzen den eta zenbat konbentzitzen duen benetan.',
            ],
          },
          {
            heading: 'Ez da "3D eredu polit bat"',
            paragraphs: [
              'Erraza da 3D esperientzia interaktiboa landing page baterako render ikusgarri batekin nahastea. Aldea da ondo diseinatutako esperientzia batek lau geruza batera uztartzen dituela: diseinua, teknologia, datuak eta narrazioa. Lau horietako bat kentzeak esperientzia jakin-min bisual hutsera murrizten du.',
            ],
          },
          {
            heading: 'Non du zentzu gehien',
            bullets: [
              'Hezkuntza: lamina estatikoa geruzaz geruza arakatzen den zerbaitekin ordezkatzen duten modulu interaktiboak.',
              'Industria: arrisku errealik sortu gabe eta produkzioa gelditu gabe entrenatzeko edo prozesuak bistaratzeko biki digitalak.',
              'Arkitektura eta real estate: espazio bat fisikoki existitu aurretik zeharkatzea.',
              'Marketinga eta komunikazioa: irakurri ordez nabigatzen diren infografiak edo produktu-aurkezpenak.',
            ],
          },
          {
            heading: 'Nola heltzen diogu halako proiektu bati',
            paragraphs: [
              'Kasu guztietan galdera beretik hasten gara: zer ulertu edo sentitu behar du hau erabiliko duen pertsonak, eta zein ordenatan? Erantzun horrek narrazioa definitzen du edozein 3D modelatze-tresna ukitu aurretik; teknikoki akatsik gabeko baina narratiboki gaizki pentsatutako esperientzia demo polit bat bihurtzen baita, benetako eraginik gabe.',
            ],
          },
          {
            heading: 'Zure proiekturako zentzua duen jakiteko irizpidea',
            paragraphs: [
              'Gaur egun zerbait konplexua lamina, bideo edo kalkulu-orri batekin azaltzen baduzu, eta beste pertsonak guztiz ulertzeko behin baino gehiagotan "ikusi" behar duela nabaritzen baduzu, hor markatzen du normalean alde nabarmena 3D esperientzia interaktibo batek eduki estatikoaren aldean.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'modernizar-sistema-legacy',
    image: 'assets/blog/legacy-modernization.png',
    accent: 'signal',
    imageAlt: {
      es: 'Sistema industrial antiguo encapsulado por capas modernas sin detener la operación.',
      en: 'Old industrial system wrapped by modern layers without stopping operations.',
      eu: 'Sistema industrial zaharra geruza modernoekin bilduta, operazioa gelditu gabe.',
    },
    translations: {
      es: {
        seoTitle: 'Cómo modernizar un sistema legacy sin detener tu operación',
        metaDescription:
          'Migrar un sistema viejo no tiene por qué significar downtime. Te contamos el criterio que usamos para modernizar por capas, sin frenar la producción.',
        title: 'Cómo modernizar un sistema legacy sin detener tu operación',
        excerpt:
          'Migrar un sistema viejo no tiene por qué significar downtime. La clave está en modernizar por capas, no de golpe.',
        category: 'Modernización',
        readTime: '5 min de lectura',
        cta: 'Descargá la guía "5 preguntas antes de modernizar tu sistema legacy".',
        goal: 'Objetivo asociado: generación de leads calificados',
        sections: [
          {
            heading: '"Si tocamos el sistema, se para la producción"',
            paragraphs: [
              'Es la frase que más se repite en plantas industriales cuando aparece la palabra "modernización". Y tiene sentido: un sistema de gestión con diez o quince años, aunque esté viejo, es predecible. Lo nuevo, hasta que se prueba, no lo es. Ese miedo no es exagerado: es, de hecho, el punto de partida correcto para planificar bien un proyecto de este tipo.',
            ],
          },
          {
            heading: 'El error más común no es técnico, es de proceso',
            paragraphs: [
              'La forma más rápida de generar un problema real es migrar todo de una sola vez. No porque la tecnología nueva sea mala, sino porque no hay margen para detectar un error a tiempo si todo cambia simultáneamente. La alternativa es migrar por capas.',
            ],
          },
          {
            heading: 'Cómo se ve una migración por capas, en la práctica',
            ordered: [
              'Mapeo de criticidad: se separa qué partes del sistema actual no pueden fallar ni un minuto de las que simplemente están viejas, pero no son urgentes.',
              'Empezar por lo de menor impacto: se moderniza primero lo que, si algo sale mal, no frena la operación.',
              'Convivencia, no reemplazo abrupto: el sistema anterior sigue corriendo en paralelo hasta confirmar que el nuevo responde igual o mejor en condiciones reales.',
              'Recién ahí, lo crítico: las partes más sensibles se migran al final, cuando ya hay evidencia real de que el enfoque funciona.',
            ],
          },
          {
            heading: 'Por qué este orden importa más que la tecnología elegida',
            paragraphs: [
              'Un stack tecnológico moderno no genera downtime por sí solo; lo genera un plan de migración mal secuenciado. La mayoría de los "sistemas viejos que dan miedo tocar" no son un problema técnico irresoluble; son un problema de que nadie diseñó un camino de migración gradual y reversible.',
            ],
          },
          {
            heading: 'Una pregunta para evaluar tu propio caso',
            paragraphs: [
              '¿Tu sistema actual "funciona pero ya nadie del equipo original sabe bien cómo mantenerlo"? Esa combinación, funciona pero es una caja negra, es exactamente el escenario donde una migración por capas, bien planificada, resuelve el problema sin la crisis que todos temen.',
            ],
          },
        ],
      },
      en: {
        seoTitle: 'How to Modernize a Legacy System Without Stopping Your Operation',
        metaDescription:
          "Migrating an old system doesn't have to mean downtime. Here's the layer-by-layer approach we use to modernize without halting production.",
        title: 'How to Modernize a Legacy System Without Stopping Your Operation',
        excerpt:
          'Migrating an old system does not have to mean downtime. The key is modernizing in layers, not all at once.',
        category: 'Modernization',
        readTime: '5 min read',
        cta: 'Download the guide "5 Questions Before Modernizing Your Legacy System."',
        goal: 'Associated goal: qualified lead generation',
        sections: [
          {
            heading: '"If we touch the system, production stops"',
            paragraphs: [
              'It is the phrase that comes up most often in industrial plants whenever "modernization" enters the conversation. And it makes sense: a management system that is ten or fifteen years old, however outdated, is predictable. Something new, until it is proven, is not. That fear is not exaggerated; it is actually the right starting point for planning this kind of project well.',
            ],
          },
          {
            heading: 'The most common mistake is not technical, it is about process',
            paragraphs: [
              'The fastest way to create a real problem is migrating everything at once. Not because the new technology is bad, but because there is no room to catch an issue in time if everything changes simultaneously. The alternative is migrating in layers.',
            ],
          },
          {
            heading: 'What a layered migration looks like in practice',
            ordered: [
              'Map criticality: separate which parts of the current system cannot fail for even a minute from the ones that are simply old, but not urgent.',
              'Start with the lowest-impact pieces: modernize first what will not stop operations if something goes wrong.',
              'Coexistence, not an abrupt swap: the old system keeps running in parallel until the new one is confirmed to perform as well or better under real conditions.',
              'Only then, the critical pieces: the most sensitive parts get migrated last, once there is real evidence the approach works.',
            ],
          },
          {
            heading: 'Why this sequence matters more than the tech stack you choose',
            paragraphs: [
              'A modern tech stack does not cause downtime by itself; a poorly sequenced migration plan does. Most "old systems everyone is afraid to touch" are not an unsolvable technical problem; they are a problem of nobody having designed a gradual, reversible migration path.',
            ],
          },
          {
            heading: 'A question to evaluate your own case',
            paragraphs: [
              'Does your current system "work, but nobody on the original team really knows how to maintain it anymore"? That combination, working but a black box, is exactly the scenario where a well-planned, layered migration solves the problem without the crisis everyone fears.',
            ],
          },
        ],
      },
      eu: {
        seoTitle: 'Nola modernizatu legacy sistema bat zure operazioa gelditu gabe',
        metaDescription:
          'Sistema zahar bat migratzeak ez du zertan downtime esan nahi. Geruzaz geruza modernizatzeko erabiltzen dugun irizpidea azaltzen dugu.',
        title: 'Nola modernizatu legacy sistema bat zure operazioa gelditu gabe',
        excerpt:
          'Sistema zahar bat migratzeak ez du zertan downtime esan nahi. Gakoa geruzaka modernizatzea da, ez dena batera aldatzea.',
        category: 'Modernizazioa',
        readTime: '5 min irakurketa',
        cta: 'Deskargatu gida: "5 galdera zure legacy sistema modernizatu aurretik".',
        goal: 'Lotutako helburua: lead kualifikatuak sortzea',
        sections: [
          {
            heading: '"Sistema ukitzen badugu, produkzioa geldituko da"',
            paragraphs: [
              'Industria-plantetan "modernizazioa" hitza agertzen denean gehien errepikatzen den esaldia da. Eta zentzua du: hamar edo hamabost urteko kudeaketa-sistema bat, zaharra izan arren, aurreikusgarria da. Berria, probatu arte, ez. Beldur hori ez da gehiegizkoa; halako proiektu bat ondo planifikatzeko abiapuntu egokia da.',
            ],
          },
          {
            heading: 'Akats ohikoena ez da teknikoa, prozesukoa baizik',
            paragraphs: [
              'Arazo erreal bat sortzeko modurik azkarrena dena batera migratzea da. Ez teknologia berria txarra delako, baizik eta dena aldi berean aldatzen bada ez dagoelako akatsa garaiz detektatzeko tarterik. Alternatiba geruzaka migratzea da.',
            ],
          },
          {
            heading: 'Nolakoa da geruzaz geruzako migrazioa praktikan',
            ordered: [
              'Kritikotasuna mapatzea: egungo sistemaren zein zatitan ezin den minutu bakar batez ere huts egin eta zeintzuk dauden zahartuta baina ez diren premiazkoak bereiztea.',
              'Inpaktu txikienekotik hastea: zerbait gaizki badoa operazioa geldituko ez duen zatia modernizatzea lehenik.',
              'Elkarbizitza, ez ordezkapen bortitza: sistema zaharrak paraleloan jarraitzen du berriak baldintza errealetan berdin edo hobeto erantzuten duela baieztatu arte.',
              'Orduan bakarrik, kritikoa: zatirik sentikorrenak amaieran migratzen dira, ikuspegiak funtzionatzen duela erakusten duen ebidentzia dagoenean.',
            ],
          },
          {
            heading: 'Zergatik axola duen ordenak aukeratutako teknologiak baino gehiago',
            paragraphs: [
              'Stack teknologiko moderno batek ez du berez downtime sortzen; gaizki sekuentziatutako migrazio-plan batek sortzen du. "Ukitzeak beldurra ematen duten sistema zahar" gehienak ez dira konpondu ezin diren arazo teknikoak; inork migrazio-bide gradual eta itzulgarri bat diseinatu ez duelako dira arazo.',
            ],
          },
          {
            heading: 'Zure kasua ebaluatzeko galdera bat',
            paragraphs: [
              'Zure egungo sistemak "funtzionatzen du, baina jatorrizko taldeko inork ez daki ondo nola mantendu"? Konbinazio hori, funtzionatzen duen baina kutxa beltza den sistema, da geruzaz geruzako migrazio ondo planifikatu batek denek beldurtzen duten krisia gabe arazoa konpontzen duen egoera.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'realidad-3d-educacion-superior',
    image: 'assets/blog/3d-education.png',
    accent: 'trust',
    imageAlt: {
      es: 'Estudiantes explorando un modelo anatómico 3D interactivo en un aula moderna.',
      en: 'Students exploring an interactive 3D anatomical model in a modern classroom.',
      eu: 'Ikasleak 3D anatomia-eredu interaktibo bat arakatzen ikasgela moderno batean.',
    },
    translations: {
      es: {
        seoTitle: 'Realidad 3D en educación superior: qué cambia para los estudiantes',
        metaDescription:
          'Lo que se manipula se retiene mejor que lo que solo se observa. Te contamos cómo pensamos las experiencias 3D interactivas aplicadas a la educación.',
        title: 'Realidad 3D en educación superior: qué cambia para los estudiantes',
        excerpt:
          'Lo que se manipula se retiene mejor que lo que solo se observa. La tecnología importa cuando refuerza el aprendizaje real.',
        category: 'Educación 3D',
        readTime: '4 min de lectura',
        cta: 'Conversemos sobre cómo se vería aplicado a tu programa académico.',
        goal: 'Objetivo asociado: portfolio y visibilidad de marca',
        sections: [
          {
            heading: 'Una diferencia de retención, no de gusto',
            paragraphs: [
              'Pensá en la última vez que aprendiste algo complejo mirando una diapositiva. Ahora pensá en la última vez que aprendiste algo complejo haciéndolo. La diferencia no es una cuestión de preferencia estética: es una diferencia de retención. Lo que se manipula se recuerda mejor que lo que solo se observa.',
            ],
          },
          {
            heading: 'Por qué esto importa especialmente hoy',
            paragraphs: [
              'No es una tendencia pasajera de "innovación por innovación". Las instituciones educativas compiten hoy por algo muy concreto: estudiantes que crecieron con videojuegos y contenido inmersivo, para quienes una clase enteramente basada en láminas estáticas se siente, literalmente, de otra época. Eso no significa reemplazar la pedagogía tradicional; significa darle una herramienta más a un método de enseñanza que ya funciona.',
            ],
          },
          {
            heading: 'El desafío real no es tecnológico',
            paragraphs: [
              'El obstáculo más grande no es construir un modelo 3D técnicamente impecable. Es encontrar un enfoque que entienda tanto de pedagogía como de desarrollo 3D. Un modelo tridimensional impresionante, pero pensado sin considerar cómo aprende realmente una persona, termina siendo una demo vistosa para mostrar en una feria, no una herramienta que un docente use en su clase todas las semanas.',
            ],
          },
          {
            heading: 'Cómo pensamos un proyecto educativo de este tipo',
            ordered: [
              'Partimos del contenido curricular real, no de "qué se puede hacer en 3D que se vea bien".',
              'Definimos en qué momento exacto del proceso de aprendizaje el estudiante se traba o pierde interés con el formato actual.',
              'Diseñamos la experiencia para resolver específicamente ese punto de fricción, no como un agregado decorativo.',
              'Pensamos la experiencia para que un docente pueda incorporarla a su forma de dar clase, no para que dependa de un especialista técnico cada vez que se usa.',
            ],
          },
          {
            heading: 'Una pregunta para tu institución',
            paragraphs: [
              '¿Hay alguna materia donde, todos los años, los mismos conceptos generan la misma confusión en los estudiantes? Ese es, casi siempre, el mejor punto de partida para pensar una experiencia 3D interactiva: no la materia más vistosa para mostrar, sino la que más se beneficia con explorarse en vez de solo explicarse.',
            ],
          },
        ],
      },
      en: {
        seoTitle: '3D Reality in Higher Education: What Actually Changes for Students',
        metaDescription:
          "What gets manipulated is retained better than what's only observed. Here's how we approach interactive 3D experiences applied to education.",
        title: '3D Reality in Higher Education: What Actually Changes for Students',
        excerpt:
          'What gets manipulated is retained better than what is only observed. Technology matters when it reinforces real learning.',
        category: '3D Education',
        readTime: '4 min read',
        cta: "Let's talk about how this could apply to your academic program.",
        goal: 'Associated goal: portfolio and brand visibility',
        sections: [
          {
            heading: 'A difference in retention, not in taste',
            paragraphs: [
              'Think about the last time you learned something complex by looking at a slide. Now think about the last time you learned something complex by doing it. The difference is not a matter of aesthetic preference; it is a difference in retention. What gets manipulated is remembered better than what is only observed.',
            ],
          },
          {
            heading: 'Why this matters especially now',
            paragraphs: [
              'This is not a passing "innovation for innovation\'s sake" trend. Educational institutions today compete for something very concrete: students who grew up with video games and immersive content, for whom a class built entirely around static diagrams feels, literally, out of another era. That does not mean replacing traditional pedagogy; it means giving one more tool to a teaching method that already works.',
            ],
          },
          {
            heading: 'The real challenge is not technological',
            paragraphs: [
              'The biggest obstacle is not building a technically flawless 3D model. It is finding an approach that understands both pedagogy and 3D development equally well. An impressive 3D model built without considering how a person actually learns ends up being a flashy demo for a trade fair, not a tool a teacher uses in class every week.',
            ],
          },
          {
            heading: 'How we approach an education project like this',
            ordered: [
              'We start from the actual curriculum content, not from "what looks good in 3D."',
              'We define exactly where in the learning process students get stuck or lose interest with the current format.',
              'We design the experience to solve specifically that friction point, not as a decorative add-on.',
              'We design the experience so a teacher can incorporate it into how they already teach, rather than depending on a technical specialist every time it is used.',
            ],
          },
          {
            heading: 'A question for your institution',
            paragraphs: [
              'Is there a subject where, year after year, the same concepts confuse students in the same way? That is almost always the best starting point for an interactive 3D experience: not the flashiest subject to showcase, but the one that benefits most from being explored instead of just explained.',
            ],
          },
        ],
      },
      eu: {
        seoTitle: '3D errealitatea goi-mailako hezkuntzan: zer aldatzen den ikasleentzat',
        metaDescription:
          'Manipulatzen dena hobeto atxikitzen da soilik behatzen dena baino. Horrela pentsatzen ditugu hezkuntzara aplikatutako 3D esperientzia interaktiboak.',
        title: '3D errealitatea goi-mailako hezkuntzan: zer aldatzen den ikasleentzat',
        excerpt:
          'Manipulatzen dena hobeto atxikitzen da soilik behatzen dena baino. Teknologiak balioa du benetako ikaskuntza indartzen duenean.',
        category: '3D hezkuntza',
        readTime: '4 min irakurketa',
        cta: 'Hitz egin dezagun zure programa akademikoan nola aplikatuko litzatekeen.',
        goal: 'Lotutako helburua: portfolioa eta markaren ikusgarritasuna',
        sections: [
          {
            heading: 'Atxikipen-aldea da, ez gustu-kontua',
            paragraphs: [
              'Pentsatu diapositiba bat begiratuz zerbait konplexua ikasi zenuen azken aldian. Orain pentsatu zerbait konplexua eginez ikasi zenuen azken aldian. Aldea ez da lehentasun estetiko kontua: atxikipenaren aldea da. Manipulatzen dena hobeto gogoratzen da soilik behatzen dena baino.',
            ],
          },
          {
            heading: 'Zergatik den bereziki garrantzitsua gaur',
            paragraphs: [
              'Ez da "berrikuntza berrikuntzagatik" joera iragankorra. Hezkuntza-erakundeek gaur egun oso gauza zehatzagatik lehiatzen dute: bideo-jokoekin eta eduki murgiltzaileekin hazi diren ikasleengatik. Haientzat, lamina estatikoetan soilik oinarritutako klase batek beste garai batekoa dirudi. Horrek ez du pedagogia tradizionala ordezkatzea esan nahi; dagoeneko funtzionatzen duen irakaskuntza-metodo bati beste tresna bat ematea baizik.',
            ],
          },
          {
            heading: 'Benetako erronka ez da teknologikoa',
            paragraphs: [
              'Oztoporik handiena ez da teknikoki akatsik gabeko 3D eredu bat eraikitzea. Pedagogia eta 3D garapena berdin ulertzen dituen ikuspegia aurkitzea da. Pertsona batek benetan nola ikasten duen kontuan hartu gabe egindako 3D eredu ikusgarri bat azoka batean erakusteko demo deigarri bihurtzen da, ez irakasle batek astero klasean erabiliko duen tresna.',
            ],
          },
          {
            heading: 'Nola pentsatzen dugu halako hezkuntza-proiektu bat',
            ordered: [
              'Benetako curriculum-edukitik abiatzen gara, ez "3Dn zer egin daitekeen polit ikusteko" galderatik.',
              'Ikaskuntza-prozesuko zein une zehatzetan trabatzen den edo interesa galtzen duen ikasleak egungo formatuarekin definitzen dugu.',
              'Esperientzia marruskadura-puntu hori konpontzeko diseinatzen dugu, ez klaseari gehigarri apaingarri bat gehitzeko.',
              'Esperientzia irakasleak bere klase-emateko moduan txertatu ahal izateko pentsatzen dugu, erabiltzen den bakoitzean teknikari baten menpe egon ez dadin.',
            ],
          },
          {
            heading: 'Zure erakundearentzako galdera bat',
            paragraphs: [
              'Ba al dago urtero kontzeptu berberek ikasleengan nahasmen bera sortzen duten irakasgairik? Hori izaten da, ia beti, 3D esperientzia interaktibo bat pentsatzeko abiapunturik onena: ez erakusteko irakasgairik ikusgarriena, baizik eta azaldu ordez arakatzeak onura handiena ematen diona.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'consultoria-tecnologica',
    image: 'assets/blog/tech-consulting.png',
    accent: 'signal',
    imageAlt: {
      es: 'Mapa de diagnóstico tecnológico que conecta procesos de negocio con bloques de arquitectura.',
      en: 'Technology diagnostic map connecting business processes with architecture blocks.',
      eu: 'Negozio-prozesuak arkitektura-blokeekin lotzen dituen diagnostiko teknologikoaren mapa.',
    },
    translations: {
      es: {
        seoTitle: 'Consultoría tecnológica: por qué entendemos el problema antes de escribir código',
        metaDescription:
          '"Necesitamos una app" es una conclusión, no un diagnóstico. Así encaramos la etapa de consultoría antes de proponer cualquier solución técnica.',
        title: 'Consultoría tecnológica: por qué entendemos el problema antes de escribir código',
        excerpt:
          '"Necesitamos una app" es una conclusión, no un diagnóstico. La consultoría evita construir bien la solución equivocada.',
        category: 'Consultoría',
        readTime: '4 min de lectura',
        cta: 'Agendá una consultoría de diagnóstico gratuita para tu próximo proyecto.',
        goal: 'Objetivo asociado: generación de leads calificados',
        sections: [
          {
            heading: 'Empezar por la solución es la forma más rápida de gastar mal',
            paragraphs: [
              '"Necesitamos una app", "necesitamos IA", "necesitamos automatizar esto" son conclusiones, no diagnósticos. Y muchas veces, cuando se investiga el problema de fondo, la tecnología correcta termina siendo distinta, a veces más simple, de lo que se pensó al principio.',
            ],
          },
          {
            heading: 'Qué pasa cuando se salta la etapa de diagnóstico',
            paragraphs: [
              'El resultado más común de saltar directo a la solución es un desarrollo técnicamente correcto que no resuelve el problema real, porque nadie preguntó por qué el proceso funcionaba como funcionaba antes de decidir cambiarlo. Es, probablemente, la causa más frecuente de proyectos de tecnología que terminan sin usarse.',
            ],
          },
          {
            heading: 'Cómo encaramos la etapa de consultoría',
            paragraphs: ['Antes de proponer una arquitectura o un stack tecnológico, el trabajo empieza por entender:'],
            bullets: [
              'Cómo funciona hoy el proceso, en la práctica, no en la teoría o el manual.',
              'Dónde se pierde tiempo, dinero, o ambos.',
              'Quién usa cada herramienta actual, y por qué apareció esa herramienta en primer lugar.',
              'Qué objetivo de negocio hay detrás del pedido técnico, que no siempre coincide con lo que se pidió originalmente.',
            ],
          },
          {
            heading: 'Por qué esto no es una etapa decorativa',
            paragraphs: [
              'Define si el proyecto que sigue va a resolver el problema real o solo la versión que alguien imaginó de ese problema. Un proyecto de software que resuelve el síntoma equivocado cuesta lo mismo, o más, que uno bien diagnosticado, con la diferencia de que el primero no se termina usando.',
            ],
          },
          {
            heading: 'Qué hace distinta a una consultora que trabaja así',
            paragraphs: [
              'Permite acompañar a una organización desde el diseño de la solución hasta su desarrollo, en vez de simplemente tomar un pedido técnico y ejecutarlo tal cual llegó. La consultoría y el desarrollo dejan de ser dos servicios separados, y pasan a ser dos etapas del mismo proceso.',
            ],
          },
        ],
      },
      en: {
        seoTitle: 'Tech Consulting: Why We Understand the Problem Before Writing a Line of Code',
        metaDescription:
          '"We need an app" is a conclusion, not a diagnosis. Here\'s how we approach the consulting stage before proposing any technical solution.',
        title: 'Tech Consulting: Why We Understand the Problem Before Writing a Line of Code',
        excerpt:
          '"We need an app" is a conclusion, not a diagnosis. Consulting prevents building the wrong solution well.',
        category: 'Consulting',
        readTime: '4 min read',
        cta: 'Book a free diagnostic consultation for your next project.',
        goal: 'Associated goal: qualified lead generation',
        sections: [
          {
            heading: 'Starting with the solution is the fastest way to spend badly',
            paragraphs: [
              '"We need an app," "we need AI," "we need to automate this" are conclusions, not diagnoses. And often, once the underlying problem is actually investigated, the right technology turns out to be different, sometimes simpler, than what was originally assumed.',
            ],
          },
          {
            heading: 'What happens when the diagnostic stage gets skipped',
            paragraphs: [
              'The most common result of jumping straight to a solution is a technically correct build that does not solve the real problem, because nobody asked why the process worked the way it did before deciding to change it. It is probably the most frequent cause of technology projects that end up unused.',
            ],
          },
          {
            heading: 'How we approach the consulting stage',
            paragraphs: ['Before proposing an architecture or a tech stack, the work starts by understanding:'],
            bullets: [
              'How the process actually works today, in practice, not in theory or in a manual.',
              'Where time, money, or both are being lost.',
              'Who uses each current tool, and why that tool appeared in the first place.',
              'What business objective sits behind the technical request, which does not always match what was originally asked for.',
            ],
          },
          {
            heading: 'Why this is not a decorative stage',
            paragraphs: [
              'It determines whether the project that follows solves the real problem or just the version of that problem someone imagined. A software project that solves the wrong symptom costs the same, or more, as a well-diagnosed one, with the difference that the first one never ends up getting used.',
            ],
          },
          {
            heading: 'What makes a consultancy that works this way different',
            paragraphs: [
              'It allows a company to be accompanied from solution design through development, instead of simply taking a technical request and executing it exactly as it arrived. Consulting and development stop being two separate services and become two stages of the same process.',
            ],
          },
        ],
      },
      eu: {
        seoTitle:
          'Aholkularitza teknologikoa: zergatik ulertzen dugun arazoa kodea idatzi aurretik',
        metaDescription:
          '"App bat behar dugu" ondorio bat da, ez diagnostiko bat. Horrela heltzen diogu aholkularitza-etapari edozein soluzio tekniko proposatu aurretik.',
        title:
          'Aholkularitza teknologikoa: zergatik ulertzen dugun arazoa kodea idatzi aurretik',
        excerpt:
          '"App bat behar dugu" ondorio bat da, ez diagnostiko bat. Aholkularitzak okerreko soluzioa ondo eraikitzea saihesten du.',
        category: 'Aholkularitza',
        readTime: '4 min irakurketa',
        cta: 'Adostu diagnostiko-kontsulta doakoa zure hurrengo proiekturako.',
        goal: 'Lotutako helburua: lead kualifikatuak sortzea',
        sections: [
          {
            heading: 'Soluzioarekin hastea gaizki gastatzeko modurik azkarrena da',
            paragraphs: [
              '"App bat behar dugu", "IA behar dugu", "hau automatizatu behar dugu" ondorioak dira, ez diagnostikoak. Eta askotan, sakoneko arazoa ikertzen denean, teknologia egokia hasieran pentsatutakoa baino bestelakoa izaten da, batzuetan sinpleagoa.',
            ],
          },
          {
            heading: 'Zer gertatzen da diagnostiko-etapa saltatzen denean',
            paragraphs: [
              'Soluziora zuzenean salto egitearen emaitzarik ohikoena teknikoki zuzena den baina arazo erreala konpontzen ez duen garapena da; inork ez duelako galdetu prozesuak zergatik funtzionatzen zuen horrela hura aldatzea erabaki aurretik. Seguruenik, erabili gabe amaitzen diren teknologia-proiektuen kausarik ohikoena da.',
            ],
          },
          {
            heading: 'Nola heltzen diogu aholkularitza-etapari',
            paragraphs: ['Arkitektura edo stack teknologiko bat proposatu aurretik, lana hau ulertzetik hasten da:'],
            bullets: [
              'Nola funtzionatzen duen gaur prozesuak praktikan, ez teorian edo eskuliburuan.',
              'Non galtzen den denbora, dirua edo biak.',
              'Nork erabiltzen duen egungo tresna bakoitza, eta zergatik agertu zen tresna hori lehenik.',
              'Zer negozio-helburu dagoen eskaera teknikoaren atzean; ez dator beti bat hasieran eskatu zenarekin.',
            ],
          },
          {
            heading: 'Zergatik ez den etapa apaingarri bat',
            paragraphs: [
              'Ondoren datorren proiektuak arazo erreala konponduko duen edo norbaitek arazo horri buruz imajinatu zuen bertsioa bakarrik konponduko duen definitzen du. Sintoma okerra konpontzen duen software-proiektu batek ondo diagnostikatutako batek adina edo gehiago kostatzen du, baina lehenengoa ez da erabiltzen amaitzen.',
            ],
          },
          {
            heading: 'Zer egiten du desberdin horrela lan egiten duen aholkularitza batek',
            paragraphs: [
              'Erakunde bati soluzioaren diseinutik garapeneraino laguntzea ahalbidetzen du, eskaera tekniko bat hartu eta iritsi den bezala exekutatzera mugatu ordez. Aholkularitza eta garapena bi zerbitzu bereizi izateari utzi, eta prozesu bereko bi etapa bihurtzen dira.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'talent-outsourcing',
    image: 'assets/blog/talent-outsourcing.png',
    accent: 'trust',
    imageAlt: {
      es: 'Equipo distribuido de especialistas conectados a un roadmap central de producto.',
      en: 'Distributed specialist team connected to a central product roadmap.',
      eu: 'Espezialista-talde banatua produktu-roadmap zentral batera konektatuta.',
    },
    translations: {
      es: {
        seoTitle: 'Talent outsourcing: cómo sumar talento especializado sin perder el control del proyecto',
        metaDescription:
          'Sumar un desarrollador o un squad completo no debería significar perder continuidad. Así pensamos el talent outsourcing en Ekin Kruz.',
        title: 'Talent outsourcing: cómo sumar talento especializado sin perder el control del proyecto',
        excerpt:
          'Sumar talento externo no debería significar perder continuidad. La integración importa tanto como la capacidad técnica.',
        category: 'Talent Outsourcing',
        readTime: '4 min de lectura',
        cta: 'Escribinos para conversar sobre tu necesidad puntual de talento.',
        goal: 'Objetivo asociado: comunidad en LinkedIn',
        sections: [
          {
            heading: 'El riesgo no es la falta de talento, es la falta de continuidad',
            paragraphs: [
              'Cuando un equipo interno necesita reforzarse, un desarrollador frontend, un especialista en 3D/WebGL, un Product Manager, la salida rápida suele ser una contratación tradicional, lenta, o una plataforma de freelancers sueltos, rápida pero sin continuidad. Ambos caminos comparten el mismo riesgo de fondo: que la persona que se suma no termine de entender el contexto real del proyecto.',
            ],
          },
          {
            heading: 'Qué significa "talent outsourcing bien hecho"',
            paragraphs: [
              'No es "poner un cuerpo más" en un equipo. Es sumar a alguien, o un squad completo, que se integra al proyecto con la misma seriedad que un miembro interno: entendiendo el objetivo de negocio detrás de cada tarea técnica, no solo la lista de tickets que le asignaron.',
            ],
          },
          {
            heading: 'Las dos modalidades que tienen sentido según el caso',
            bullets: [
              'Incorporación de especialistas individuales: cuando el equipo interno ya tiene la estructura definida y necesita una capacidad puntual que no tiene.',
              'Equipos dedicados o squads completos: cuando el proyecto necesita una capacidad de desarrollo sostenida en el tiempo sin que la empresa tenga que armar y gestionar esa estructura desde cero.',
            ],
          },
          {
            heading:
              'Por qué esto es distinto cuando lo ofrece una consultora que también desarrolla software propio',
            paragraphs: [
              'El talento que se suma no llega desde cero: llega con estándares de trabajo ya probados en proyectos reales de desarrollo y de experiencias 3D. Eso reduce una fricción típica del outsourcing tradicional, que es el tiempo que un equipo pierde "calibrando" cómo trabaja cada persona nueva antes de ser realmente productiva.',
            ],
          },
          {
            heading: 'Una pregunta para evaluar si aplica a tu caso',
            paragraphs: [
              '¿Tu equipo necesita crecer en capacidad técnica, pero sin sumar la carga de gestión de reclutar, entrevistar y volver a capacitar desde cero? Ese es, en términos concretos, el problema que resuelve el talent outsourcing bien planteado.',
            ],
          },
        ],
      },
      en: {
        seoTitle: 'Talent Outsourcing: How to Add Specialized Talent Without Losing Project Control',
        metaDescription:
          "Adding a developer or a full squad shouldn't mean losing continuity. Here's how we approach talent outsourcing at Ekin Kruz.",
        title: 'Talent Outsourcing: How to Add Specialized Talent Without Losing Project Control',
        excerpt:
          'Adding external talent should not mean losing continuity. Integration matters as much as technical capability.',
        category: 'Talent Outsourcing',
        readTime: '4 min read',
        cta: 'Reach out to talk about your specific talent need.',
        goal: 'Associated goal: LinkedIn community growth',
        sections: [
          {
            heading: 'The risk is not a lack of talent, it is a lack of continuity',
            paragraphs: [
              'When an internal team needs to scale up, a frontend developer, a 3D/WebGL specialist, a Product Manager, the quick options are usually traditional hiring, slow, or a freelance platform, fast but with no continuity. Both paths share the same underlying risk: the person who joins never fully understands the real context of the project.',
            ],
          },
          {
            heading: 'What "talent outsourcing done right" actually means',
            paragraphs: [
              'It is not about "adding one more body" to a team. It is about bringing in someone, or a full squad, who integrates into the project with the same seriousness as an internal team member: understanding the business objective behind each technical task, not just the list of tickets assigned to them.',
            ],
          },
          {
            heading: 'The two models that make sense, depending on the case',
            bullets: [
              'Individual specialists: when the internal team structure is already defined and it just needs a specific capability it does not have.',
              'Dedicated teams or full squads: when a project needs sustained development capacity over time without the company having to build and manage that structure from scratch.',
            ],
          },
          {
            heading:
              'Why this looks different coming from a consultancy that also builds its own software',
            paragraphs: [
              'The talent that joins does not start from zero: it arrives with working standards already proven on real development and 3D-experience projects. That reduces a common friction point in traditional outsourcing, the time a team loses "calibrating" how each new person works before they are actually productive.',
            ],
          },
          {
            heading: 'A question to evaluate whether this applies to you',
            paragraphs: [
              'Does your team need to grow in technical capacity without taking on the management load of recruiting, interviewing, and retraining from scratch? That is, in concrete terms, the problem well-structured talent outsourcing solves.',
            ],
          },
        ],
      },
      eu: {
        seoTitle:
          'Talent outsourcing: nola gehitu talentu espezializatua proiektuaren kontrola galdu gabe',
        metaDescription:
          'Garatzaile bat edo squad oso bat gehitzeak ez luke jarraitutasuna galtzea esan behar. Horrela ulertzen dugu talent outsourcing-a Ekin Kruzen.',
        title:
          'Talent outsourcing: nola gehitu talentu espezializatua proiektuaren kontrola galdu gabe',
        excerpt:
          'Kanpoko talentua gehitzeak ez luke jarraitutasuna galtzea esan behar. Integrazioa gaitasun teknikoa bezain garrantzitsua da.',
        category: 'Talent Outsourcing',
        readTime: '4 min irakurketa',
        cta: 'Idatz iezaguzu zure talentu-behar zehatzaz hitz egiteko.',
        goal: 'Lotutako helburua: LinkedIn komunitatea haztea',
        sections: [
          {
            heading: 'Arriskua ez da talentu-falta, jarraitutasun-falta baizik',
            paragraphs: [
              'Barne-talde batek indartu behar duenean, frontend garatzaile bat, 3D/WebGL espezialista bat edo Product Manager bat, irtenbide azkarra kontratazio tradizionala izaten da, motela, edo freelancer solteentzako plataforma bat, azkarra baina jarraitutasunik gabea. Bi bideek arrisku bera dute oinarrian: gehitzen den pertsonak proiektuaren benetako testuingurua ez ulertzea.',
            ],
          },
          {
            heading: 'Zer esan nahi du "ondo egindako talent outsourcing-ak"',
            paragraphs: [
              'Ez da talde batean "gorputz bat gehiago" jartzea. Pertsona bat, edo squad oso bat, barne-kide baten seriotasun berarekin proiektuan integratzea da: zeregin tekniko bakoitzaren atzean dagoen negozio-helburua ulertuz, ez soilik esleitu zaion ticket-zerrenda.',
            ],
          },
          {
            heading: 'Kasuaren arabera zentzua duten bi modalitateak',
            bullets: [
              'Espezialista indibidualak txertatzea: barne-taldeak egitura definituta duenean eta falta duen gaitasun puntual bat behar duenean.',
              'Talde dedikatuak edo squad osoak: proiektuak denboran zehar garapen-gaitasun iraunkorra behar duenean, enpresak egitura hori zerotik eraiki eta kudeatu gabe.',
            ],
          },
          {
            heading:
              'Zergatik den desberdina software propioa ere garatzen duen aholkularitza batek eskaintzen duenean',
            paragraphs: [
              'Gehitzen den talentua ez da hutsetik iristen: garapen-proiektu errealetan eta 3D esperientzietan probatutako lan-estandarrekin iristen da. Horrek outsourcing tradizionalaren marruskadura tipiko bat murrizten du: talde batek pertsona berri bakoitzak nola lan egiten duen "kalibratzen" galtzen duen denbora.',
            ],
          },
          {
            heading: 'Zure kasuari aplikatzen zaion ebaluatzeko galdera bat',
            paragraphs: [
              'Zure taldeak gaitasun teknikoan hazi behar du, baina kontratatu, elkarrizketatu eta berriz trebatzeko kudeaketa-karga gehitu gabe? Hori da, termino zehatzetan, ondo planteatutako talent outsourcing-ak konpontzen duen arazoa.',
            ],
          },
        ],
      },
    },
  },
] as const;

export function findBlogPost(slug: string | null | undefined): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
