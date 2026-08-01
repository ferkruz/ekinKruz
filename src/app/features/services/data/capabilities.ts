import type { CapabilityVisualKind } from '../../../shared/ui/capability-visual/capability-visual';

export type CapabilityVisual = CapabilityVisualKind;
export type CapabilitySize = 'hero' | 'tall' | 'wide' | 'standard';

export interface Capability {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly related: readonly string[];
  readonly visual: CapabilityVisual;
  readonly size: CapabilitySize;
  readonly accent: 'signal' | 'trust';
}

export const CAPABILITIES: readonly Capability[] = [
  {
    id: 'software-factory',
    index: '01',
    title: 'Software Factory',
    description:
      'Desarrollamos plataformas digitales, aplicaciones empresariales, APIs, sistemas a medida e integraciones escalables utilizando arquitecturas modernas y buenas prácticas de ingeniería.',
    related: [
      'Desarrollo Web',
      'Arquitectura Frontend',
      'Backend',
      'APIs',
      'Integraciones',
      'Cloud',
      'DevOps',
    ],
    visual: 'factory',
    size: 'hero',
    accent: 'signal',
  },
  {
    id: 'experiencias-3d',
    index: '02',
    title: 'Experiencias 3D',
    description:
      'Creamos experiencias tridimensionales interactivas que permiten visualizar, explicar y comercializar productos, procesos e información compleja directamente desde el navegador.',
    related: [
      'Smart Cities',
      'Digital Twins',
      'Industria 4.0',
      'Configuradores',
      'Visualización Científica',
      'Infografías Interactivas',
      'Arquitectura',
      'Educación',
    ],
    visual: 'spatial',
    size: 'tall',
    accent: 'trust',
  },
  {
    id: 'inteligencia-artificial',
    index: '03',
    title: 'Inteligencia Artificial',
    description:
      'Incorporamos inteligencia artificial en productos digitales mediante asistentes inteligentes, automatización de procesos e integración con modelos generativos.',
    related: [
      'IA Generativa',
      'Chatbots',
      'Automatización',
      'RAG',
      'LLM',
      'Procesamiento Documental',
      'Agentes Inteligentes',
    ],
    visual: 'neural',
    size: 'wide',
    accent: 'signal',
  },
  {
    id: 'ux-producto',
    index: '04',
    title: 'UX & Producto',
    description:
      'Diseñamos experiencias intuitivas centradas en las personas mediante investigación, estrategia de producto, accesibilidad y diseño de interfaces.',
    related: [
      'UX Research',
      'UI Design',
      'Product Discovery',
      'Accesibilidad',
      'Design Systems',
      'Arquitectura UX',
    ],
    visual: 'ux',
    size: 'standard',
    accent: 'trust',
  },
] as const;
