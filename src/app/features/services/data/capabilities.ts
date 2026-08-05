import type { CapabilityVisualKind } from '../../../shared/ui/capability-visual/capability-visual';

export type CapabilityVisual = CapabilityVisualKind;
export type CapabilitySize = 'hero' | 'tall' | 'wide' | 'standard';

export interface Capability {
  readonly id: string;
  readonly index: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly relatedKeys: readonly string[];
  readonly visual: CapabilityVisual;
  readonly size: CapabilitySize;
  readonly accent: 'signal' | 'trust';
}

export const CAPABILITIES: readonly Capability[] = [
  {
    id: 'software-factory',
    index: '01',
    titleKey: 'services.capabilities.softwareFactory.title',
    descriptionKey: 'services.capabilities.softwareFactory.description',
    relatedKeys: [
      'services.capabilities.softwareFactory.related.webDevelopment',
      'services.capabilities.softwareFactory.related.frontendArchitecture',
      'services.capabilities.softwareFactory.related.backend',
      'services.capabilities.softwareFactory.related.apis',
      'services.capabilities.softwareFactory.related.integrations',
      'services.capabilities.softwareFactory.related.cloud',
      'services.capabilities.softwareFactory.related.devOps',
    ],
    visual: 'factory',
    size: 'hero',
    accent: 'signal',
  },
  {
    id: 'experiencias-3d',
    index: '02',
    titleKey: 'services.capabilities.spatial.title',
    descriptionKey: 'services.capabilities.spatial.description',
    relatedKeys: [
      'services.capabilities.spatial.related.smartCities',
      'services.capabilities.spatial.related.digitalTwins',
      'services.capabilities.spatial.related.industry',
      'services.capabilities.spatial.related.configurators',
      'services.capabilities.spatial.related.scientificVisualization',
      'services.capabilities.spatial.related.interactiveInfographics',
      'services.capabilities.spatial.related.architecture',
      'services.capabilities.spatial.related.education',
    ],
    visual: 'spatial',
    size: 'tall',
    accent: 'trust',
  },
  {
    id: 'inteligencia-artificial',
    index: '03',
    titleKey: 'services.capabilities.ai.title',
    descriptionKey: 'services.capabilities.ai.description',
    relatedKeys: [
      'services.capabilities.ai.related.generativeAi',
      'services.capabilities.ai.related.chatbots',
      'services.capabilities.ai.related.automation',
      'services.capabilities.ai.related.rag',
      'services.capabilities.ai.related.llm',
      'services.capabilities.ai.related.documentProcessing',
      'services.capabilities.ai.related.intelligentAgents',
    ],
    visual: 'neural',
    size: 'wide',
    accent: 'signal',
  },
  {
    id: 'ux-producto',
    index: '04',
    titleKey: 'services.capabilities.ux.title',
    descriptionKey: 'services.capabilities.ux.description',
    relatedKeys: [
      'services.capabilities.ux.related.uxResearch',
      'services.capabilities.ux.related.uiDesign',
      'services.capabilities.ux.related.productDiscovery',
      'services.capabilities.ux.related.accessibility',
      'services.capabilities.ux.related.designSystems',
      'services.capabilities.ux.related.uxArchitecture',
    ],
    visual: 'ux',
    size: 'standard',
    accent: 'trust',
  },
] as const;
