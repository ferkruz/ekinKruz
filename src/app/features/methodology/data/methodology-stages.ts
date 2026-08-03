export type MethodologyStageVisual =
  | 'discovery'
  | 'strategy'
  | 'design'
  | 'engineering'
  | 'validation'
  | 'launch'
  | 'evolution';

export interface MethodologyStage {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly sensation: string;
  readonly visual: MethodologyStageVisual;
  readonly visualTerms: readonly string[];
}

export const METHODOLOGY_STAGES: readonly MethodologyStage[] = [
  {
    id: 'discovery',
    index: '01',
    title: 'Descubrimiento',
    eyebrow: 'Exploración inicial',
    description:
      'La Energy Line llega como señal dispersa: abre preguntas, detecta patrones y empieza a convertir incertidumbre en comprensión accionable.',
    sensation: 'Exploración · Curiosidad · Comprensión',
    visual: 'discovery',
    visualTerms: ['Partículas', 'Mapa mental', 'Conexiones', 'Nodos'],
  },
  {
    id: 'strategy',
    index: '02',
    title: 'Estrategia',
    eyebrow: 'Dirección del sistema',
    description:
      'La señal encuentra un camino: las conexiones se ordenan, aparecen mapas de arquitectura y el roadmap define dónde invertir energía primero.',
    sensation: 'Claridad · Dirección · Orden',
    visual: 'strategy',
    visualTerms: ['Wireframes', 'Diagramas', 'Roadmaps', 'Arquitectura'],
  },
  {
    id: 'design',
    index: '03',
    title: 'Diseño',
    eyebrow: 'Experiencia tangible',
    description:
      'Los diagramas se transforman en interfaz: componentes, jerarquía visual y sistema de diseño empiezan a revelar cómo se sentirá el producto.',
    sensation: 'Creatividad · Elegancia · Experiencia',
    visual: 'design',
    visualTerms: ['Cards', 'UI', 'Componentes', 'Design system'],
  },
  {
    id: 'engineering',
    index: '04',
    title: 'Ingeniería',
    eyebrow: 'Arquitectura viva',
    description:
      'La línea se vuelve flujo de datos: atraviesa módulos, APIs y servicios hasta ensamblar una plataforma preparada para escalar.',
    sensation: 'Ingeniería · Potencia · Escalabilidad',
    visual: 'engineering',
    visualTerms: ['Módulos', 'APIs', 'Data flow', 'Código'],
  },
  {
    id: 'validation',
    index: '05',
    title: 'Validación',
    eyebrow: 'Calidad controlada',
    description:
      'Cada decisión pasa por filtros de prueba: los riesgos bajan, los indicadores se iluminan y el producto gana confianza operativa.',
    sensation: 'Confianza · Calidad · Control',
    visual: 'validation',
    visualTerms: ['Testing', 'QA', 'Checks', 'Dashboards'],
  },
  {
    id: 'launch',
    index: '06',
    title: 'Lanzamiento',
    eyebrow: 'Salida a producción',
    description:
      'La energía acumulada atraviesa infraestructura, nube y red global para convertir el sistema en una experiencia disponible y medible.',
    sensation: 'Impacto · Producción · Escalabilidad',
    visual: 'launch',
    visualTerms: ['Cloud', 'Deploy', 'Infraestructura', 'Red global'],
  },
  {
    id: 'evolution',
    index: '07',
    title: 'Evolución',
    eyebrow: 'Ciclo continuo',
    description:
      'La línea no termina: se divide, aprende de datos reales y abre nuevos ciclos de optimización, automatización e innovación.',
    sensation: 'Innovación · Futuro · Crecimiento',
    visual: 'evolution',
    visualTerms: ['Analytics', 'IA', 'Optimización', 'Expansión'],
  },
];
