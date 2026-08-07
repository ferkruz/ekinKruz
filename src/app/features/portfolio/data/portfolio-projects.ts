export type PortfolioFilterId =
  | 'all'
  | 'software'
  | 'health'
  | 'logistics'
  | 'fintech'
  | 'government'
  | 'threeD';

export type PortfolioCategoryId =
  | 'software'
  | 'health'
  | 'logistics'
  | 'fintech'
  | 'government'
  | 'threeD'
  | 'industry-3d';

export type PortfolioProjectStatus = 'published' | 'draft';
export type PortfolioProjectLayout = 'feature' | 'split' | 'dense' | 'dual';
export type PortfolioAccent = 'signal' | 'trust';

export interface PortfolioFilter {
  id: PortfolioFilterId;
  labelKey: string;
}

export interface PortfolioProject {
  id: string;
  categories: PortfolioCategoryId[];
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  imageAltKey: string;
  technologies: readonly string[];
  featureKeys: readonly string[];
  problemKey: string;
  solutionKey: string;
  resolvesKeys: readonly string[];
  status: PortfolioProjectStatus;
  layout: PortfolioProjectLayout;
  accent: PortfolioAccent;
}

export const PORTFOLIO_FILTERS: readonly PortfolioFilter[] = [
  { id: 'all', labelKey: 'portfolio.filters.all' },
  { id: 'software', labelKey: 'portfolio.filters.software' },
  { id: 'health', labelKey: 'portfolio.filters.health' },
  { id: 'logistics', labelKey: 'portfolio.filters.logistics' },
  { id: 'fintech', labelKey: 'portfolio.filters.fintech' },
  { id: 'government', labelKey: 'portfolio.filters.government' },
  { id: 'threeD', labelKey: 'portfolio.filters.threeD' },
];

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    id: 'logistica',
    categories: ['software', 'logistics'],
    categoryKey: 'portfolio.projects.logistica.category',
    titleKey: 'portfolio.projects.logistica.title',
    descriptionKey: 'portfolio.projects.logistica.description',
    image: 'assets/portfolio/logistica.webp',
    imageAltKey: 'portfolio.projects.logistica.imageAlt',
    technologies: [
      'portfolio.technologies.angular',
      'portfolio.technologies.typescript',
      'portfolio.technologies.maps',
      'portfolio.technologies.apis',
      'portfolio.technologies.realTimeData',
    ],
    featureKeys: [
      'portfolio.projects.logistica.features.map',
      'portfolio.projects.logistica.features.routes',
      'portfolio.projects.logistica.features.status',
      'portfolio.projects.logistica.features.controlPanel',
    ],
    problemKey: 'portfolio.projects.logistica.problem',
    solutionKey: 'portfolio.projects.logistica.solution',
    resolvesKeys: [
      'portfolio.projects.logistica.resolves.visibility',
      'portfolio.projects.logistica.resolves.followUp',
      'portfolio.projects.logistica.resolves.operation',
    ],
    status: 'published',
    layout: 'feature',
    accent: 'signal',
  },
  {
    id: 'salud',
    categories: ['software', 'health'],
    categoryKey: 'portfolio.projects.salud.category',
    titleKey: 'portfolio.projects.salud.title',
    descriptionKey: 'portfolio.projects.salud.description',
    image: 'assets/portfolio/salud.webp',
    imageAltKey: 'portfolio.projects.salud.imageAlt',
    technologies: [
      'portfolio.technologies.mobileExperience',
      'portfolio.technologies.responsiveUi',
      'portfolio.technologies.accessibility',
      'portfolio.technologies.searchExperience',
    ],
    featureKeys: [
      'portfolio.projects.salud.features.credential',
      'portfolio.projects.salud.features.search',
      'portfolio.projects.salud.features.filters',
      'portfolio.projects.salud.features.map',
    ],
    problemKey: 'portfolio.projects.salud.problem',
    solutionKey: 'portfolio.projects.salud.solution',
    resolvesKeys: [
      'portfolio.projects.salud.resolves.access',
      'portfolio.projects.salud.resolves.clarity',
      'portfolio.projects.salud.resolves.selfService',
    ],
    status: 'published',
    layout: 'split',
    accent: 'trust',
  },
  {
    id: 'justicia',
    categories: ['software', 'government'],
    categoryKey: 'portfolio.projects.justicia.category',
    titleKey: 'portfolio.projects.justicia.title',
    descriptionKey: 'portfolio.projects.justicia.description',
    image: 'assets/portfolio/justicia.webp',
    imageAltKey: 'portfolio.projects.justicia.imageAlt',
    technologies: [
      'portfolio.technologies.enterpriseWebApp',
      'portfolio.technologies.advancedSearch',
      'portfolio.technologies.dataVisualization',
      'portfolio.technologies.informationArchitecture',
    ],
    featureKeys: [
      'portfolio.projects.justicia.features.dashboard',
      'portfolio.projects.justicia.features.search',
      'portfolio.projects.justicia.features.records',
      'portfolio.projects.justicia.features.relations',
    ],
    problemKey: 'portfolio.projects.justicia.problem',
    solutionKey: 'portfolio.projects.justicia.solution',
    resolvesKeys: [
      'portfolio.projects.justicia.resolves.centralization',
      'portfolio.projects.justicia.resolves.traceability',
      'portfolio.projects.justicia.resolves.consultation',
    ],
    status: 'published',
    layout: 'dense',
    accent: 'trust',
  },
  {
    id: 'fintech',
    categories: ['software', 'fintech'],
    categoryKey: 'portfolio.projects.fintech.category',
    titleKey: 'portfolio.projects.fintech.title',
    descriptionKey: 'portfolio.projects.fintech.description',
    image: 'assets/portfolio/fintech.webp',
    imageAltKey: 'portfolio.projects.fintech.imageAlt',
    technologies: [
      'portfolio.technologies.secureUi',
      'portfolio.technologies.responsiveUi',
      'portfolio.technologies.dataVisualization',
      'portfolio.technologies.apis',
    ],
    featureKeys: [
      'portfolio.projects.fintech.features.accounts',
      'portfolio.projects.fintech.features.movements',
      'portfolio.projects.fintech.features.transfers',
      'portfolio.projects.fintech.features.cards',
    ],
    problemKey: 'portfolio.projects.fintech.problem',
    solutionKey: 'portfolio.projects.fintech.solution',
    resolvesKeys: [
      'portfolio.projects.fintech.resolves.control',
      'portfolio.projects.fintech.resolves.security',
      'portfolio.projects.fintech.resolves.clarity',
    ],
    status: 'published',
    layout: 'dual',
    accent: 'signal',
  },
  {
    id: 'real-estate-explorer',
    categories: ['threeD'],
    categoryKey: 'portfolio.projects.realEstateExplorer.category',
    titleKey: 'portfolio.projects.realEstateExplorer.title',
    descriptionKey: 'portfolio.projects.realEstateExplorer.description',
    image: 'assets/portfolio/real-estate-explorer.webp',
    imageAltKey: 'portfolio.projects.realEstateExplorer.imageAlt',
    technologies: [
      'portfolio.threeD.technologies.threejs',
      'portfolio.threeD.technologies.angular',
      'portfolio.threeD.technologies.webgl',
      'portfolio.threeD.technologies.visualization',
      'portfolio.threeD.technologies.responsive',
    ],
    featureKeys: [
      'portfolio.projects.realEstateExplorer.features.building',
      'portfolio.projects.realEstateExplorer.features.floor',
      'portfolio.projects.realEstateExplorer.features.unit',
      'portfolio.projects.realEstateExplorer.features.lead',
    ],
    problemKey: 'portfolio.projects.realEstateExplorer.problem',
    solutionKey: 'portfolio.projects.realEstateExplorer.solution',
    resolvesKeys: [
      'portfolio.projects.realEstateExplorer.resolves.explore',
      'portfolio.projects.realEstateExplorer.resolves.decide',
      'portfolio.projects.realEstateExplorer.resolves.convert',
    ],
    status: 'published',
    layout: 'feature',
    accent: 'signal',
  },
  {
    id: 'anatomy-explorer',
    categories: ['threeD'],
    categoryKey: 'portfolio.projects.anatomyExplorer.category',
    titleKey: 'portfolio.projects.anatomyExplorer.title',
    descriptionKey: 'portfolio.projects.anatomyExplorer.description',
    image: 'assets/portfolio/anatomy-explorer.webp',
    imageAltKey: 'portfolio.projects.anatomyExplorer.imageAlt',
    technologies: [
      'portfolio.threeD.technologies.threejs',
      'portfolio.threeD.technologies.angular',
      'portfolio.threeD.technologies.webgl',
      'portfolio.threeD.technologies.visualization',
      'portfolio.threeD.technologies.learning',
    ],
    featureKeys: [
      'portfolio.projects.anatomyExplorer.features.model',
      'portfolio.projects.anatomyExplorer.features.layers',
      'portfolio.projects.anatomyExplorer.features.labels',
      'portfolio.projects.anatomyExplorer.features.learning',
    ],
    problemKey: 'portfolio.projects.anatomyExplorer.problem',
    solutionKey: 'portfolio.projects.anatomyExplorer.solution',
    resolvesKeys: [
      'portfolio.projects.anatomyExplorer.resolves.understand',
      'portfolio.projects.anatomyExplorer.resolves.interact',
      'portfolio.projects.anatomyExplorer.resolves.learn',
    ],
    status: 'published',
    layout: 'split',
    accent: 'trust',
  },
  {
    id: 'industrial-explorer',
    categories: ['threeD', 'industry-3d'],
    categoryKey: 'portfolio.projects.industrialExplorer.category',
    titleKey: 'portfolio.projects.industrialExplorer.title',
    descriptionKey: 'portfolio.projects.industrialExplorer.description',
    image: 'assets/portfolio/industrial-explorer.webp',
    imageAltKey: 'portfolio.projects.industrialExplorer.imageAlt',
    technologies: [
      'portfolio.technologies.threeD',
      'portfolio.technologies.webgl',
      'portfolio.technologies.digitalTwins',
      'portfolio.technologies.telemetry',
    ],
    featureKeys: [],
    problemKey: 'portfolio.projects.industrialExplorer.problem',
    solutionKey: 'portfolio.projects.industrialExplorer.solution',
    resolvesKeys: [],
    status: 'draft',
    layout: 'feature',
    accent: 'signal',
  },
];
