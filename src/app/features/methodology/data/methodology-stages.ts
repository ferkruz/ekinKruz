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
  readonly titleKey: string;
  readonly eyebrowKey: string;
  readonly descriptionKey: string;
  readonly sensationKey: string;
  readonly visual: MethodologyStageVisual;
  readonly visualTermKeys: readonly string[];
}

export const METHODOLOGY_STAGES: readonly MethodologyStage[] = [
  {
    id: 'discovery',
    index: '01',
    titleKey: 'methodology.stages.discovery.title',
    eyebrowKey: 'methodology.stages.discovery.eyebrow',
    descriptionKey: 'methodology.stages.discovery.description',
    sensationKey: 'methodology.stages.discovery.sensation',
    visual: 'discovery',
    visualTermKeys: [
      'methodology.stages.discovery.visualTerms.particles',
      'methodology.stages.discovery.visualTerms.mindMap',
      'methodology.stages.discovery.visualTerms.connections',
      'methodology.stages.discovery.visualTerms.nodes',
    ],
  },
  {
    id: 'strategy',
    index: '02',
    titleKey: 'methodology.stages.strategy.title',
    eyebrowKey: 'methodology.stages.strategy.eyebrow',
    descriptionKey: 'methodology.stages.strategy.description',
    sensationKey: 'methodology.stages.strategy.sensation',
    visual: 'strategy',
    visualTermKeys: [
      'methodology.stages.strategy.visualTerms.wireframes',
      'methodology.stages.strategy.visualTerms.diagrams',
      'methodology.stages.strategy.visualTerms.roadmaps',
      'methodology.stages.strategy.visualTerms.architecture',
    ],
  },
  {
    id: 'design',
    index: '03',
    titleKey: 'methodology.stages.design.title',
    eyebrowKey: 'methodology.stages.design.eyebrow',
    descriptionKey: 'methodology.stages.design.description',
    sensationKey: 'methodology.stages.design.sensation',
    visual: 'design',
    visualTermKeys: [
      'methodology.stages.design.visualTerms.cards',
      'methodology.stages.design.visualTerms.ui',
      'methodology.stages.design.visualTerms.components',
      'methodology.stages.design.visualTerms.designSystem',
    ],
  },
  {
    id: 'engineering',
    index: '04',
    titleKey: 'methodology.stages.engineering.title',
    eyebrowKey: 'methodology.stages.engineering.eyebrow',
    descriptionKey: 'methodology.stages.engineering.description',
    sensationKey: 'methodology.stages.engineering.sensation',
    visual: 'engineering',
    visualTermKeys: [
      'methodology.stages.engineering.visualTerms.modules',
      'methodology.stages.engineering.visualTerms.apis',
      'methodology.stages.engineering.visualTerms.dataFlow',
      'methodology.stages.engineering.visualTerms.code',
    ],
  },
  {
    id: 'validation',
    index: '05',
    titleKey: 'methodology.stages.validation.title',
    eyebrowKey: 'methodology.stages.validation.eyebrow',
    descriptionKey: 'methodology.stages.validation.description',
    sensationKey: 'methodology.stages.validation.sensation',
    visual: 'validation',
    visualTermKeys: [
      'methodology.stages.validation.visualTerms.testing',
      'methodology.stages.validation.visualTerms.qa',
      'methodology.stages.validation.visualTerms.checks',
      'methodology.stages.validation.visualTerms.dashboards',
    ],
  },
  {
    id: 'launch',
    index: '06',
    titleKey: 'methodology.stages.launch.title',
    eyebrowKey: 'methodology.stages.launch.eyebrow',
    descriptionKey: 'methodology.stages.launch.description',
    sensationKey: 'methodology.stages.launch.sensation',
    visual: 'launch',
    visualTermKeys: [
      'methodology.stages.launch.visualTerms.cloud',
      'methodology.stages.launch.visualTerms.deploy',
      'methodology.stages.launch.visualTerms.infrastructure',
      'methodology.stages.launch.visualTerms.globalNetwork',
    ],
  },
  {
    id: 'evolution',
    index: '07',
    titleKey: 'methodology.stages.evolution.title',
    eyebrowKey: 'methodology.stages.evolution.eyebrow',
    descriptionKey: 'methodology.stages.evolution.description',
    sensationKey: 'methodology.stages.evolution.sensation',
    visual: 'evolution',
    visualTermKeys: [
      'methodology.stages.evolution.visualTerms.analytics',
      'methodology.stages.evolution.visualTerms.ai',
      'methodology.stages.evolution.visualTerms.optimization',
      'methodology.stages.evolution.visualTerms.expansion',
    ],
  },
];
