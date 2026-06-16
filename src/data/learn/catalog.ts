export type LearningStage = 'core' | 'builder' | 'systems' | 'enterprise';

export type LearningDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type LessonFormat = 'Lesson' | 'Lab' | 'Project' | 'System Design';

export type ResourceKind = 'Guide' | 'Docs' | 'Tool' | 'Paper';

export type LearningProjectLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';

export interface LessonResource {
  label: string;
  href: string;
  kind: ResourceKind;
}

export interface LearningKeyTerm {
  term: string;
  misconception: string;
  meaning: string;
}

export interface LearningLessonOutput {
  kind: 'Decision memo' | 'Experiment log' | 'Execution brief' | 'Architecture review';
  title: string;
  summary: string;
  template: string;
}

export interface LearningLesson {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  format: LessonFormat;
  difficulty: LearningDifficulty;
  challenge: string;
  motto: string;
  problem: string[];
  objectives: string[];
  concepts: string[];
  conceptNotes: string[];
  keyTerms: LearningKeyTerm[];
  examples: string[];
  buildIt: string[];
  useIt: string[];
  shipIt: string[];
  qualityChecks: string[];
  exercises: string[];
  interviewQuestions: string[];
  nextSteps: string[];
  keywords: string[];
  resources: LessonResource[];
  output: LearningLessonOutput;
  contentEntryId?: string;
}

export interface LearningModule {
  slug: string;
  title: string;
  summary: string;
  signal: string;
  lessons: LearningLesson[];
}

export interface LearningProject {
  slug: string;
  title: string;
  level: LearningProjectLevel;
  summary: string;
  duration: string;
  difficulty: LearningDifficulty;
  skills: string[];
  technologies: string[];
  outcomes: string[];
  deliverables: string[];
}

export interface LearningCapstone {
  title: string;
  summary: string;
  deliverables: string[];
}

export interface LearningTrack {
  slug: string;
  title: string;
  strapline: string;
  summary: string;
  stage: LearningStage;
  difficulty: LearningDifficulty;
  estimatedWeeks: string;
  weeklyRhythm: string;
  prerequisites: string[];
  nextTracks: string[];
  tooling: string[];
  outcomes: string[];
  modules: LearningModule[];
  projects: LearningProject[];
  capstone: LearningCapstone;
}

export interface LearningLessonMatch {
  track: LearningTrack;
  module: LearningModule;
  lesson: LearningLesson;
}

export interface LearningProjectMatch {
  track: LearningTrack;
  project: LearningProject;
}

export interface LearnSearchItem {
  kind: 'track' | 'module' | 'lesson' | 'project' | 'resource' | 'glossary';
  title: string;
  href: string;
  excerpt: string;
  stage: LearningStage | 'cross-track';
  trackSlug: string;
  trackTitle: string;
  moduleTitle?: string;
  duration?: string;
  projectLevel?: LearningProjectLevel;
  resourceKind?: ResourceKind;
  trackCount?: number;
  keywords: string[];
}

type LessonSeed = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  format: LessonFormat;
  concepts: string[];
  keywords: string[];
  contentEntryId?: string;
};

type ModuleSeed = {
  slug: string;
  title: string;
  summary: string;
  signal: string;
  lessons: LessonSeed[];
};

type TrackSeed = Omit<LearningTrack, 'modules' | 'projects'> & {
  resources: LessonResource[];
  modules: ModuleSeed[];
};

const trackSeeds: TrackSeed[] = [
  {
    slug: 'ai-foundations',
    title: 'AI Foundations',
    strapline: 'Learn how modern AI systems are framed before you start choosing tools.',
    summary:
      'Build the mental models behind AI products: problem framing, system boundaries, evaluation loops, and delivery habits.',
    stage: 'core',
    difficulty: 'Beginner',
    estimatedWeeks: '2 weeks',
    weeklyRhythm: '4 sessions x 45 minutes',
    prerequisites: [],
    nextTracks: ['python-for-ai', 'mathematics-for-ai', 'machine-learning'],
    tooling: ['Notebook', 'Whiteboard', 'Spreadsheets'],
    outcomes: [
      'Frame an AI problem as data, workflow, and human feedback loops.',
      'Choose success metrics before choosing a model.',
      'Translate learning goals into a weekly practice system.',
    ],
    resources: [
      {
        label: 'Google ML Glossary',
        href: 'https://developers.google.com/machine-learning/glossary',
        kind: 'Guide',
      },
      {
        label: 'NIST AI RMF',
        href: 'https://www.nist.gov/itl/ai-risk-management-framework',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'AI Opportunity Brief',
      summary:
        'Create a concise document that frames an AI use case, the workflow, the evaluation loop, and the first thin slice.',
      deliverables: ['problem frame', 'evaluation scorecard', 'two-week sprint plan'],
    },
    modules: [
      {
        slug: 'systems-thinking',
        title: 'Systems Thinking',
        summary: 'Define the problem, the actors, and the boundaries of an AI workflow.',
        signal: 'You can explain an AI system in plain language before touching a framework.',
        lessons: [
          {
            slug: 'what-counts-as-ai',
            title: 'What Counts as AI?',
            summary: 'Separate rules, statistics, prediction, generation, and agents without hype.',
            duration: '35 min',
            format: 'Lesson',
            concepts: ['prediction vs generation', 'deterministic workflows', 'feedback loops'],
            keywords: ['ai basics', 'system thinking'],
          },
          {
            slug: 'data-model-evaluation-loop',
            title: 'The Data, Model, Evaluation Loop',
            summary: 'Understand how data quality and evaluation strategy shape model outcomes.',
            duration: '40 min',
            format: 'Lesson',
            concepts: ['ground truth', 'offline vs online evals', 'data drift'],
            keywords: ['evaluation', 'labels', 'data quality'],
          },
        ],
      },
      {
        slug: 'delivery-cadence',
        title: 'Delivery Cadence',
        summary: 'Move from interesting ideas to repeatable learning sprints.',
        signal: 'You can sequence experiments so the team learns quickly without overbuilding.',
        lessons: [
          {
            slug: 'problem-framing-for-ai-teams',
            title: 'Problem Framing for AI Teams',
            summary: 'Turn a broad goal into user pain, constraints, risks, and success criteria.',
            duration: '45 min',
            format: 'Project',
            concepts: ['problem statements', 'constraints mapping', 'success criteria'],
            keywords: ['problem framing', 'scoping', 'ai product'],
          },
          {
            slug: 'learning-sprint-rhythm',
            title: 'Run an AI Learning Sprint',
            summary: 'Structure weekly progress around hypotheses, artifacts, and review loops.',
            duration: '30 min',
            format: 'Project',
            concepts: ['weekly cadence', 'artifact-driven learning', 'retrospectives'],
            keywords: ['learning plan', 'sprint', 'artifacts'],
          },
        ],
      },
    ],
  },
  {
    slug: 'python-for-ai',
    title: 'Python for AI',
    strapline: 'Move from syntax familiarity to practical data and tooling fluency.',
    summary:
      'Learn the Python workflow used across notebooks, scripts, pipelines, and small AI services.',
    stage: 'core',
    difficulty: 'Beginner',
    estimatedWeeks: '3 weeks',
    weeklyRhythm: '4 sessions x 50 minutes',
    prerequisites: ['ai-foundations'],
    nextTracks: ['mathematics-for-ai', 'machine-learning', 'llm-engineering'],
    tooling: ['Python', 'Jupyter', 'VS Code', 'uv'],
    outcomes: [
      'Write readable Python for experiments and utilities.',
      'Work comfortably with arrays, tables, files, and environments.',
      'Turn notebook work into scripts that other people can run.',
    ],
    resources: [
      {
        label: 'Python Tutorial',
        href: 'https://docs.python.org/3/tutorial/',
        kind: 'Docs',
      },
      {
        label: 'NumPy User Guide',
        href: 'https://numpy.org/doc/stable/user/',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'Reproducible Starter Kit',
      summary:
        'Package a small AI-ready Python project with a clean environment, a CLI script, and a documented data preparation flow.',
      deliverables: ['project scaffold', 'CLI script', 'dataset preparation notes'],
    },
    modules: [
      {
        slug: 'python-core',
        title: 'Python Core',
        summary: 'Learn the language features you will use every week in AI work.',
        signal: 'You can read, write, and refactor Python without hesitation.',
        lessons: [
          {
            slug: 'python-basics',
            title: 'Python Basics for AI',
            summary:
              'Cover variables, control flow, functions, and data structures through an AI lens.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['lists and dicts', 'functions', 'control flow'],
            keywords: ['python', 'functions', 'data structures'],
            contentEntryId: 'foundations/python-basics',
          },
          {
            slug: 'numerical-python',
            title: 'Numerical Python with NumPy',
            summary:
              'Use arrays, broadcasting, and vectorized operations for model-friendly computation.',
            duration: '50 min',
            format: 'Lab',
            concepts: ['ndarray', 'broadcasting', 'matrix multiplication'],
            keywords: ['numpy', 'arrays', 'vectorization'],
          },
        ],
      },
      {
        slug: 'workflow-tooling',
        title: 'Workflow and Tooling',
        summary: 'Move from one-off notebooks to reproducible code and small pipelines.',
        signal: 'You can package your work so teammates can rerun it without guessing.',
        lessons: [
          {
            slug: 'data-workflows-with-pandas',
            title: 'Data Workflows with Pandas',
            summary: 'Read, clean, transform, and inspect tabular data before modeling.',
            duration: '55 min',
            format: 'Lab',
            concepts: ['dataframes', 'groupby', 'feature columns'],
            keywords: ['pandas', 'etl', 'feature prep'],
          },
          {
            slug: 'python-environments-and-cli',
            title: 'Python Environments and CLI Workflows',
            summary:
              'Use virtual environments, dependency files, and commands that make AI work reproducible.',
            duration: '35 min',
            format: 'Project',
            concepts: ['virtual environments', 'cli arguments', 'project layout'],
            keywords: ['virtualenv', 'cli', 'reproducibility'],
          },
        ],
      },
    ],
  },
  {
    slug: 'mathematics-for-ai',
    title: 'Mathematics for AI',
    strapline: 'Build intuition for the math that shows up inside every modern model.',
    summary:
      'Focus on the pieces of linear algebra, optimization, probability, and statistics that repeatedly appear in AI practice.',
    stage: 'core',
    difficulty: 'Beginner',
    estimatedWeeks: '3 weeks',
    weeklyRhythm: '4 sessions x 50 minutes',
    prerequisites: ['ai-foundations', 'python-for-ai'],
    nextTracks: ['machine-learning', 'deep-learning', 'transformers'],
    tooling: ['NumPy', 'SciPy', 'Jupyter'],
    outcomes: [
      'Reason about vectors, matrices, and gradients with practical intuition.',
      'Explain how probability and statistics show up in model behavior.',
      'Read equations in papers without freezing at the notation.',
    ],
    resources: [
      {
        label: '3Blue1Brown Linear Algebra',
        href: 'https://www.3blue1brown.com/topics/linear-algebra',
        kind: 'Guide',
      },
      {
        label: 'Dive into Deep Learning Optimization',
        href: 'https://d2l.ai/chapter_optimization/index.html',
        kind: 'Guide',
      },
    ],
    capstone: {
      title: 'AI Math Cheatbook',
      summary:
        'Build a personal reference that maps equations, shapes, and statistical ideas to concrete AI workflows.',
      deliverables: ['notation glossary', 'worked examples', 'training intuition notes'],
    },
    modules: [
      {
        slug: 'math-core',
        title: 'Core Math Intuition',
        summary: 'Anchor the building blocks used in ML and deep learning.',
        signal: 'You can connect formulas to concrete model behavior.',
        lessons: [
          {
            slug: 'math-for-ai',
            title: 'Essential Math for AI',
            summary:
              'Survey the four pillars of AI math and understand where each shows up in practice.',
            duration: '60 min',
            format: 'Lesson',
            concepts: ['vectors and matrices', 'gradients', 'probability distributions'],
            keywords: ['linear algebra', 'gradients', 'probability'],
            contentEntryId: 'foundations/math-for-ai',
          },
          {
            slug: 'linear-algebra-for-models',
            title: 'Linear Algebra for Models',
            summary: 'Build intuition for vectors, matrices, similarity, and dimensionality.',
            duration: '50 min',
            format: 'Lab',
            concepts: ['dot product', 'cosine similarity', 'eigen intuition'],
            keywords: ['embeddings', 'matrices', 'cosine similarity'],
          },
        ],
      },
      {
        slug: 'uncertainty-and-optimization',
        title: 'Uncertainty and Optimization',
        summary: 'Use probability, statistics, and gradients to reason about learning.',
        signal: 'You can explain why a model updates, converges, and still fails.',
        lessons: [
          {
            slug: 'probability-and-statistics-for-ai',
            title: 'Probability and Statistics for AI',
            summary:
              'Connect uncertainty, distributions, sampling, and evaluation to real model choices.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['sampling', 'bias variance', 'confidence intervals'],
            keywords: ['statistics', 'sampling', 'confidence'],
          },
          {
            slug: 'optimization-and-gradients',
            title: 'Optimization and Gradients',
            summary: 'See how derivatives and loss landscapes shape learning behavior.',
            duration: '45 min',
            format: 'Lab',
            concepts: ['loss surface', 'gradient descent', 'learning rate'],
            keywords: ['optimization', 'gradients', 'loss'],
          },
        ],
      },
    ],
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning',
    strapline: 'Learn the supervised learning workflow from features to evaluation and ensembles.',
    summary:
      'Move from prepared data to trained predictive models, with a focus on workflow clarity and defensible evaluation.',
    stage: 'core',
    difficulty: 'Beginner',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 55 minutes',
    prerequisites: ['python-for-ai', 'mathematics-for-ai'],
    nextTracks: ['deep-learning', 'mlops', 'production-ai-systems'],
    tooling: ['scikit-learn', 'pandas', 'NumPy'],
    outcomes: [
      'Train and compare baseline supervised models responsibly.',
      'Design feature pipelines that avoid leakage and confusion.',
      'Explain evaluation metrics, tradeoffs, and model selection choices.',
    ],
    resources: [
      {
        label: 'scikit-learn Supervised Learning',
        href: 'https://scikit-learn.org/stable/supervised_learning.html',
        kind: 'Docs',
      },
      {
        label: 'Google Machine Learning Crash Course',
        href: 'https://developers.google.com/machine-learning/crash-course',
        kind: 'Guide',
      },
    ],
    capstone: {
      title: 'Supervised ML Playbook',
      summary:
        'Ship a baseline-to-ensemble workflow with data prep, evaluation slices, and a model selection memo.',
      deliverables: ['training notebook', 'evaluation report', 'model recommendation memo'],
    },
    modules: [
      {
        slug: 'supervised-basics',
        title: 'Supervised Learning Workflow',
        summary: 'Start with baselines, data splits, and metrics before chasing complexity.',
        signal: 'You can build a clean first-pass supervised learning pipeline end to end.',
        lessons: [
          {
            slug: 'supervised-learning-baselines',
            title: 'Supervised Learning Baselines',
            summary: 'Train simple classifiers and regressors before reaching for complex models.',
            duration: '50 min',
            format: 'Lesson',
            concepts: ['classification', 'regression', 'baselines'],
            keywords: ['baseline model', 'supervised learning'],
          },
          {
            slug: 'feature-engineering-and-leakage',
            title: 'Feature Engineering and Leakage',
            summary: 'Create useful features while protecting evaluation integrity.',
            duration: '55 min',
            format: 'Lab',
            concepts: ['feature pipelines', 'target leakage', 'time-aware splits'],
            keywords: ['feature engineering', 'leakage', 'pipeline'],
          },
        ],
      },
      {
        slug: 'evaluation-and-ensembles',
        title: 'Evaluation and Ensembles',
        summary: 'Choose metrics, compare models, and understand when tree-based methods win.',
        signal: 'You can defend why one model is better for a given constraint set.',
        lessons: [
          {
            slug: 'model-evaluation-and-error-analysis',
            title: 'Model Evaluation and Error Analysis',
            summary: 'Look past one score to understand where a model succeeds and fails.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['precision recall', 'residual analysis', 'cohort slicing'],
            keywords: ['evaluation', 'confusion matrix', 'error analysis'],
          },
          {
            slug: 'trees-and-ensemble-models',
            title: 'Trees and Ensemble Models',
            summary:
              'Use tree-based models, random forests, and boosting when tabular structure matters.',
            duration: '50 min',
            format: 'Lab',
            concepts: ['decision trees', 'random forest', 'gradient boosting'],
            keywords: ['decision trees', 'tabular data', 'boosting'],
          },
        ],
      },
    ],
  },
  {
    slug: 'deep-learning',
    title: 'Deep Learning',
    strapline: 'Go from matrix operations to trainable neural systems with stable workflows.',
    summary:
      'Learn how neural networks are built, trained, regularized, and debugged through small practical exercises.',
    stage: 'builder',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 60 minutes',
    prerequisites: ['machine-learning', 'mathematics-for-ai'],
    nextTracks: ['computer-vision', 'nlp', 'transformers'],
    tooling: ['PyTorch', 'Weights and Biases'],
    outcomes: [
      'Build feedforward and convolutional models in PyTorch.',
      'Interpret training curves and debug unstable runs.',
      'Apply regularization and optimization strategies with intent.',
    ],
    resources: [
      {
        label: 'PyTorch Quickstart',
        href: 'https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html',
        kind: 'Docs',
      },
      {
        label: 'Dive into Deep Learning MLPs',
        href: 'https://d2l.ai/chapter_multilayer-perceptrons/index.html',
        kind: 'Guide',
      },
    ],
    capstone: {
      title: 'Deep Learning Training Report',
      summary:
        'Run a controlled neural network experiment and document the architecture, metrics, and debugging decisions.',
      deliverables: ['training script', 'experiment dashboard', 'decision memo'],
    },
    modules: [
      {
        slug: 'network-foundations',
        title: 'Network Foundations',
        summary: 'Understand layers, activations, losses, and backprop as a working system.',
        signal: 'You can trace the path from input tensors to loss and gradient updates.',
        lessons: [
          {
            slug: 'neural-network-foundations',
            title: 'Neural Network Foundations',
            summary: 'Connect tensors, layers, activations, and losses inside a trainable model.',
            duration: '50 min',
            format: 'Lesson',
            concepts: ['layers', 'activations', 'loss functions'],
            keywords: ['pytorch', 'layers', 'backprop'],
          },
          {
            slug: 'training-dynamics',
            title: 'Training Dynamics and Debugging',
            summary:
              'Read loss curves, gradients, and validation gaps as signals instead of mysteries.',
            duration: '55 min',
            format: 'Lab',
            concepts: ['loss curves', 'gradient norms', 'validation gap'],
            keywords: ['training curves', 'debugging', 'gradients'],
          },
        ],
      },
      {
        slug: 'stability-and-practice',
        title: 'Stability and Practice',
        summary: 'Regularize, optimize, and package deep learning experiments more responsibly.',
        signal: 'You can turn a rough training script into a repeatable experiment.',
        lessons: [
          {
            slug: 'regularization-and-optimizers',
            title: 'Regularization and Optimizers',
            summary:
              'Choose dropout, weight decay, schedulers, and optimizers with a clear reason.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['dropout', 'weight decay', 'learning rate schedules'],
            keywords: ['regularization', 'adam', 'dropout'],
          },
          {
            slug: 'deep-learning-experiment-lab',
            title: 'Deep Learning Experiment Lab',
            summary:
              'Package a small experiment with configs, logs, checkpoints, and a summary report.',
            duration: '60 min',
            format: 'Project',
            concepts: ['checkpointing', 'experiment tracking', 'run reports'],
            keywords: ['experiments', 'checkpoints', 'tracking'],
          },
        ],
      },
    ],
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision',
    strapline:
      'Learn how models interpret images, localize objects, and survive real deployment conditions.',
    summary:
      'Study the workflows behind image classification, detection, segmentation, augmentation, and operational tradeoffs.',
    stage: 'builder',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 60 minutes',
    prerequisites: ['deep-learning'],
    nextTracks: ['production-ai-systems', 'ai-security'],
    tooling: ['PyTorch', 'OpenCV', 'Roboflow'],
    outcomes: [
      'Understand image tensors, augmentation, and transfer learning workflows.',
      'Differentiate classification, detection, and segmentation tasks.',
      'Plan for edge cases like lighting, drift, and annotation quality.',
    ],
    resources: [
      {
        label: 'OpenCV Tutorials',
        href: 'https://docs.opencv.org/master/d9/df8/tutorial_root.html',
        kind: 'Docs',
      },
      {
        label: 'Torchvision Models',
        href: 'https://pytorch.org/vision/stable/models.html',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'Vision Solution Brief',
      summary:
        'Design a small vision product with task choice, annotation plan, augmentation policy, and deployment checklist.',
      deliverables: ['task comparison sheet', 'data plan', 'deployment checklist'],
    },
    modules: [
      {
        slug: 'vision-basics',
        title: 'Vision Basics',
        summary: 'Understand how images become tensors and why spatial structure matters.',
        signal: 'You can describe a vision pipeline from raw image to prediction.',
        lessons: [
          {
            slug: 'image-representation-and-augmentation',
            title: 'Image Representation and Augmentation',
            summary: 'Learn how images are encoded and how augmentation improves robustness.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['image tensors', 'augmentation', 'distribution shift'],
            keywords: ['augmentation', 'image tensors', 'vision preprocessing'],
          },
          {
            slug: 'cnn-transfer-learning',
            title: 'CNNs and Transfer Learning',
            summary:
              'Use pretrained backbones and understand why convolution works on spatial patterns.',
            duration: '55 min',
            format: 'Lab',
            concepts: ['convolution', 'feature maps', 'transfer learning'],
            keywords: ['cnn', 'transfer learning', 'feature maps'],
          },
        ],
      },
      {
        slug: 'vision-products',
        title: 'Vision Products',
        summary:
          'Move from image labels to deployed workflows with spatial reasoning and operational guardrails.',
        signal:
          'You can scope a vision solution with realistic annotation and deployment constraints.',
        lessons: [
          {
            slug: 'detection-and-segmentation',
            title: 'Detection and Segmentation Workflows',
            summary: 'Understand how localization tasks differ from simple classification.',
            duration: '50 min',
            format: 'Lesson',
            concepts: ['bounding boxes', 'masks', 'IoU'],
            keywords: ['object detection', 'segmentation', 'iou'],
          },
          {
            slug: 'vision-deployment-and-monitoring',
            title: 'Vision Deployment and Monitoring',
            summary:
              'Prepare for drift, input quality problems, and latency constraints in the real world.',
            duration: '45 min',
            format: 'Project',
            concepts: ['input quality', 'edge deployment', 'vision monitoring'],
            keywords: ['vision deployment', 'drift', 'edge inference'],
          },
        ],
      },
    ],
  },
  {
    slug: 'nlp',
    title: 'NLP',
    strapline:
      'Understand text pipelines from tokenization and features to task-specific evaluation.',
    summary:
      'Build the practical intuition behind language preprocessing, embeddings, sequence tasks, and traditional NLP workflows.',
    stage: 'builder',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 55 minutes',
    prerequisites: ['machine-learning', 'python-for-ai'],
    nextTracks: ['transformers', 'llm-engineering', 'rag-engineering'],
    tooling: ['spaCy', 'NLTK', 'Hugging Face'],
    outcomes: [
      'Preprocess and represent text for downstream models.',
      'Understand sequence tasks such as classification, tagging, and summarization.',
      'Choose evaluation strategies that reflect language quality and business use.',
    ],
    resources: [
      {
        label: 'spaCy Usage Guides',
        href: 'https://spacy.io/usage',
        kind: 'Docs',
      },
      {
        label: 'Hugging Face NLP Course',
        href: 'https://huggingface.co/learn/nlp-course/chapter1/1',
        kind: 'Guide',
      },
    ],
    capstone: {
      title: 'Language Workflow Review Kit',
      summary:
        'Build an NLP task pipeline with preprocessing, a baseline model, and a human review rubric.',
      deliverables: ['task pipeline', 'review rubric', 'error taxonomy'],
    },
    modules: [
      {
        slug: 'text-foundations',
        title: 'Text Foundations',
        summary: 'Learn how text becomes tokens, features, and embeddings.',
        signal: 'You can explain the preprocessing choices behind an NLP pipeline.',
        lessons: [
          {
            slug: 'text-representation',
            title: 'Text Representation and Tokenization',
            summary:
              'Turn messy language into tokens, features, and embeddings that models can use.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['tokenization', 'tf-idf', 'embeddings'],
            keywords: ['tokenization', 'tf-idf', 'embeddings'],
          },
          {
            slug: 'classical-nlp-pipelines',
            title: 'Classical NLP Pipelines',
            summary:
              'Build text classification and tagging workflows before jumping to large models.',
            duration: '50 min',
            format: 'Lab',
            concepts: ['text classification', 'named entities', 'pipeline components'],
            keywords: ['text classification', 'spacy', 'baseline nlp'],
          },
        ],
      },
      {
        slug: 'sequence-and-quality',
        title: 'Sequence Tasks and Quality',
        summary: 'Handle sequential dependencies and judge language outputs more carefully.',
        signal: 'You can connect language task type to an appropriate evaluation plan.',
        lessons: [
          {
            slug: 'sequence-modeling-intuition',
            title: 'Sequence Modeling Intuition',
            summary:
              'Understand why order matters and how sequence tasks differ from simple text classification.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['context windows', 'sequence tasks', 'autoregression'],
            keywords: ['sequence modeling', 'context', 'language tasks'],
          },
          {
            slug: 'nlp-evaluation',
            title: 'NLP Evaluation and Error Review',
            summary: 'Go beyond aggregate metrics and inspect actual language behavior.',
            duration: '40 min',
            format: 'Project',
            concepts: ['qualitative review', 'annotation rubrics', 'task-specific metrics'],
            keywords: ['nlp evals', 'rubrics', 'qualitative review'],
          },
        ],
      },
    ],
  },
  {
    slug: 'transformers',
    title: 'Transformers',
    strapline:
      "Understand attention, scale, and adaptation patterns behind today's model families.",
    summary:
      'Study how transformer models process context, why they scale well, and how practitioners adapt them for downstream work.',
    stage: 'builder',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 60 minutes',
    prerequisites: ['nlp', 'deep-learning'],
    nextTracks: ['generative-ai', 'llm-engineering', 'rag-engineering'],
    tooling: ['Hugging Face Transformers', 'PyTorch'],
    outcomes: [
      'Explain self-attention and the transformer stack at a systems level.',
      'Choose adaptation patterns like prompting, fine-tuning, and parameter-efficient updates.',
      'Reason about context windows, memory, and scaling tradeoffs.',
    ],
    resources: [
      {
        label: 'The Illustrated Transformer',
        href: 'https://jalammar.github.io/illustrated-transformer/',
        kind: 'Guide',
      },
      {
        label: 'Transformers Documentation',
        href: 'https://huggingface.co/docs/transformers/index',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'Transformer Decision Sheet',
      summary:
        'Document an architecture, adaptation, and context strategy for a realistic language product scenario.',
      deliverables: [
        'model family comparison',
        'adaptation decision tree',
        'context strategy brief',
      ],
    },
    modules: [
      {
        slug: 'attention-core',
        title: 'Attention Core',
        summary: 'See how transformers encode relationships across tokens and layers.',
        signal: 'You can describe what attention is doing without hand-waving.',
        lessons: [
          {
            slug: 'attention-mechanics',
            title: 'Attention Mechanics',
            summary:
              'Build a working intuition for queries, keys, values, and token relationships.',
            duration: '50 min',
            format: 'Lesson',
            concepts: ['self-attention', 'qkv', 'context mixing'],
            keywords: ['attention', 'qkv', 'transformer basics'],
          },
          {
            slug: 'transformer-architecture',
            title: 'Transformer Architecture Patterns',
            summary:
              'Learn the stack around attention: embeddings, residuals, normalization, and decoding.',
            duration: '55 min',
            format: 'Lesson',
            concepts: ['residual connections', 'layer norm', 'decoder-only'],
            keywords: ['decoder-only', 'residuals', 'transformer block'],
          },
        ],
      },
      {
        slug: 'adaptation-and-scale',
        title: 'Adaptation and Scale',
        summary: 'Adapt large models responsibly for new tasks and constraints.',
        signal: 'You can explain when to prompt, fine-tune, or compress a transformer workflow.',
        lessons: [
          {
            slug: 'fine-tuning-patterns',
            title: 'Fine-Tuning Patterns',
            summary: 'Compare prompting, full fine-tuning, and parameter-efficient approaches.',
            duration: '45 min',
            format: 'Lab',
            concepts: ['prompting', 'LoRA', 'supervised fine-tuning'],
            keywords: ['lora', 'fine-tuning', 'prompting'],
          },
          {
            slug: 'long-context-and-inference',
            title: 'Long Context and Inference Tradeoffs',
            summary:
              'Reason about memory, latency, retrieval, and context packing when working with larger models.',
            duration: '40 min',
            format: 'System Design',
            concepts: ['context window', 'memory pressure', 'context packing'],
            keywords: ['long context', 'token budget', 'inference'],
          },
        ],
      },
    ],
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    strapline:
      'Turn model capability into reliable generation workflows across text, image, and multimodal tasks.',
    summary:
      'Focus on prompt systems, structured outputs, quality review, and multimodal composition rather than model hype alone.',
    stage: 'builder',
    difficulty: 'Intermediate',
    estimatedWeeks: '3 weeks',
    weeklyRhythm: '4 sessions x 50 minutes',
    prerequisites: ['transformers'],
    nextTracks: ['llm-engineering', 'rag-engineering', 'agent-engineering'],
    tooling: ['OpenAI API', 'Anthropic API', 'JSON Schema'],
    outcomes: [
      'Design prompt systems with clear goals, structure, and guardrails.',
      'Evaluate generated outputs using rubrics and structured checks.',
      'Plan multimodal experiences without losing product clarity.',
    ],
    resources: [
      {
        label: 'OpenAI Models',
        href: 'https://platform.openai.com/docs/models',
        kind: 'Docs',
      },
      {
        label: 'JSON Schema',
        href: 'https://json-schema.org/',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'Generative Workflow Spec',
      summary:
        'Design a prompt and review system for a structured generation workflow, including a multimodal extension.',
      deliverables: ['prompt system', 'output schema', 'quality rubric'],
    },
    modules: [
      {
        slug: 'prompt-and-output',
        title: 'Prompt and Output Design',
        summary: 'Treat prompting as interface design, not as scattered trial and error.',
        signal: 'You can describe why a prompt works and how to stabilize it.',
        lessons: [
          {
            slug: 'generative-model-families',
            title: 'Generative Model Families and Tradeoffs',
            summary:
              'Understand how chat models, image generators, and multimodal systems differ in capability and cost.',
            duration: '35 min',
            format: 'Lesson',
            concepts: ['chat models', 'image generation', 'multimodal systems'],
            keywords: ['generative ai', 'model selection', 'multimodal'],
          },
          {
            slug: 'prompt-systems-and-structured-outputs',
            title: 'Prompt Systems and Structured Outputs',
            summary:
              'Design prompts, role instructions, and schemas that keep generation usable downstream.',
            duration: '50 min',
            format: 'Lab',
            concepts: ['prompt structure', 'json schema', 'output contracts'],
            keywords: ['structured outputs', 'prompting', 'schema'],
          },
        ],
      },
      {
        slug: 'quality-and-multimodal',
        title: 'Quality and Multimodal Experience',
        summary: 'Judge generation quality and design across more than one modality.',
        signal: 'You can convert creative generation into a repeatable product workflow.',
        lessons: [
          {
            slug: 'generation-evaluation-rubrics',
            title: 'Evaluation Rubrics for Generation',
            summary:
              'Review generated outputs using criteria that reflect usefulness, safety, and style.',
            duration: '40 min',
            format: 'Project',
            concepts: ['rubrics', 'human review', 'quality criteria'],
            keywords: ['rubrics', 'quality review', 'evals'],
          },
          {
            slug: 'multimodal-experience-design',
            title: 'Multimodal Experience Design',
            summary:
              'Combine text, image, audio, or tool outputs into one user workflow without losing coherence.',
            duration: '45 min',
            format: 'System Design',
            concepts: ['modality roles', 'fallback flows', 'interaction design'],
            keywords: ['multimodal', 'ux', 'workflow design'],
          },
        ],
      },
    ],
  },
  {
    slug: 'llm-engineering',
    title: 'LLM Engineering',
    strapline:
      'Turn language models into dependable software systems with contracts, guardrails, and evaluation loops.',
    summary:
      'Move past prompting demos and learn how to structure application flows, memory, evaluation, and failure handling around LLMs.',
    stage: 'systems',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 60 minutes',
    prerequisites: ['generative-ai', 'python-for-ai'],
    nextTracks: ['rag-engineering', 'agent-engineering', 'production-ai-systems'],
    tooling: ['OpenAI API', 'LangChain', 'Observability tools'],
    outcomes: [
      'Design LLM application layers, context strategies, and output contracts.',
      'Evaluate LLM workflows with grounded test cases and review rubrics.',
      'Handle retries, fallbacks, and guardrails like any other production dependency.',
    ],
    resources: [
      {
        label: 'OpenAI Platform Overview',
        href: 'https://platform.openai.com/docs/overview',
        kind: 'Docs',
      },
      {
        label: 'LangChain Concepts',
        href: 'https://python.langchain.com/docs/concepts/',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'LLM Feature Architecture Pack',
      summary:
        'Design an end-to-end LLM application workflow with context strategy, evals, and runtime guardrails.',
      deliverables: ['component diagram', 'eval set', 'guardrail flow'],
    },
    modules: [
      {
        slug: 'application-architecture',
        title: 'Application Architecture',
        summary: 'Define the layers around an LLM before code complexity spreads everywhere.',
        signal: 'You can diagram an LLM system as components and contracts, not just prompts.',
        lessons: [
          {
            slug: 'llm-app-architecture',
            title: 'LLM Application Architecture',
            summary:
              'Break an LLM product into orchestration, context, generation, and post-processing layers.',
            duration: '50 min',
            format: 'System Design',
            concepts: ['orchestration layer', 'post-processing', 'contracts'],
            keywords: ['llm architecture', 'orchestration', 'contracts'],
          },
          {
            slug: 'context-management-patterns',
            title: 'Context Management Patterns',
            summary:
              'Choose what the model should see, what it should remember, and what it should retrieve fresh.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['prompt assembly', 'memory', 'token budgets'],
            keywords: ['context management', 'token budgets', 'memory'],
          },
        ],
      },
      {
        slug: 'quality-and-guardrails',
        title: 'Quality and Guardrails',
        summary:
          'Treat output quality, policy, and failure handling as first-class engineering concerns.',
        signal: 'You can build an evaluation and fallback layer around a language workflow.',
        lessons: [
          {
            slug: 'llm-evals-for-products',
            title: 'LLM Evals for Products',
            summary:
              'Create targeted test cases and rubrics that reflect product reality rather than generic benchmarks.',
            duration: '45 min',
            format: 'Project',
            concepts: ['test cases', 'rubric review', 'regression'],
            keywords: ['llm evals', 'regression', 'rubrics'],
          },
          {
            slug: 'guardrails-and-retries',
            title: 'Guardrails, Validation, and Retries',
            summary:
              'Handle malformed outputs, unsafe content, and uncertain results with explicit control flow.',
            duration: '40 min',
            format: 'System Design',
            concepts: ['validation', 'fallbacks', 'escalation paths'],
            keywords: ['guardrails', 'validation', 'fallbacks'],
          },
        ],
      },
    ],
  },
  {
    slug: 'rag-engineering',
    title: 'RAG Engineering',
    strapline:
      'Build retrieval systems that improve grounding instead of simply adding more context.',
    summary:
      'Learn the mechanics of chunking, indexing, ranking, retrieval evaluation, and production behavior in retrieval-augmented systems.',
    stage: 'systems',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 60 minutes',
    prerequisites: ['llm-engineering', 'transformers'],
    nextTracks: ['agent-engineering', 'production-ai-systems', 'ai-security'],
    tooling: ['Vector DB', 'Embeddings', 'Rerankers'],
    outcomes: [
      'Design retrieval pipelines that balance recall, precision, cost, and latency.',
      'Evaluate retrieval quality separately from answer quality.',
      'Ship grounded Q&A systems with observable failure modes.',
    ],
    resources: [
      {
        label: 'Qdrant Essentials Course',
        href: 'https://qdrant.tech/course/essentials/',
        kind: 'Guide',
      },
      {
        label: 'LangChain RAG Concepts',
        href: 'https://python.langchain.com/docs/concepts/rag/',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'Grounded Q&A System Plan',
      summary:
        'Design a RAG workflow with ingestion policy, retrieval evals, and a production fallback path.',
      deliverables: ['ingestion recipe', 'retrieval eval set', 'production flow diagram'],
    },
    modules: [
      {
        slug: 'retrieval-core',
        title: 'Retrieval Core',
        summary: 'Learn how content is transformed into searchable chunks and ranked results.',
        signal: 'You can explain why a RAG system retrieved what it did.',
        lessons: [
          {
            slug: 'retrieval-design-principles',
            title: 'Retrieval Design Principles',
            summary:
              'Scope the retrieval problem before choosing embeddings, vector stores, or chunk sizes.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['retrieval task framing', 'corpus design', 'ranking stages'],
            keywords: ['rag design', 'retrieval', 'relevance'],
          },
          {
            slug: 'chunking-and-indexing',
            title: 'Chunking, Metadata, and Indexing',
            summary:
              'Choose chunk boundaries, metadata fields, and indexing strategies that preserve meaning.',
            duration: '55 min',
            format: 'Lab',
            concepts: ['chunk size', 'metadata filters', 'hybrid search'],
            keywords: ['chunking', 'metadata', 'hybrid search'],
          },
        ],
      },
      {
        slug: 'evaluation-and-production',
        title: 'Evaluation and Production',
        summary: 'Measure retrieval honestly and design a reliable answer path around it.',
        signal: 'You can diagnose whether bad answers came from retrieval, reasoning, or both.',
        lessons: [
          {
            slug: 'retrieval-evals',
            title: 'Retrieval Evaluation and Diagnostics',
            summary:
              'Measure recall, ranking quality, and context usefulness with targeted test cases.',
            duration: '45 min',
            format: 'Project',
            concepts: ['relevance labels', 'top-k recall', 'retrieval diagnostics'],
            keywords: ['retrieval evals', 'top-k recall', 'diagnostics'],
          },
          {
            slug: 'rag-production-pipeline',
            title: 'Production RAG Pipeline',
            summary:
              'Design caching, freshness, fallback, and observability around retrieval-augmented generation.',
            duration: '45 min',
            format: 'System Design',
            concepts: ['freshness', 'abstention', 'observability'],
            keywords: ['production rag', 'freshness', 'abstention'],
          },
        ],
      },
    ],
  },
  {
    slug: 'agent-engineering',
    title: 'Agent Engineering',
    strapline:
      'Build tool-using systems that plan, act, and recover under clear operational constraints.',
    summary:
      'Learn how agent loops, tool contracts, and human oversight fit together in systems that can take actions instead of only generating text.',
    stage: 'systems',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 60 minutes',
    prerequisites: ['llm-engineering', 'rag-engineering'],
    nextTracks: ['production-ai-systems', 'ai-security', 'enterprise-ai'],
    tooling: ['OpenAI tools', 'workflow orchestrators', 'tracing'],
    outcomes: [
      'Design safe tool-use contracts and action loops.',
      'Separate planning, execution, memory, and oversight clearly.',
      'Know when an agent is justified versus when a deterministic workflow is better.',
    ],
    resources: [
      {
        label: 'OpenAI Tools Guide',
        href: 'https://platform.openai.com/docs/guides/tools',
        kind: 'Docs',
      },
      {
        label: 'Anthropic Building Effective Agents',
        href: 'https://www.anthropic.com/engineering/building-effective-agents',
        kind: 'Guide',
      },
    ],
    capstone: {
      title: 'Agent Workflow Blueprint',
      summary:
        'Design a bounded agent system with tool contracts, review steps, and traceable execution states.',
      deliverables: ['state machine diagram', 'tool contract pack', 'human review flow'],
    },
    modules: [
      {
        slug: 'agent-core',
        title: 'Agent Core',
        summary: 'Understand when autonomy helps and when it creates unnecessary risk.',
        signal: 'You can justify the amount of agency a workflow actually needs.',
        lessons: [
          {
            slug: 'agent-loops-and-planning',
            title: 'Agent Loops and Planning',
            summary:
              'Model how an agent observes, plans, acts, and reflects across multiple steps.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['agent loop', 'planning', 'termination'],
            keywords: ['agent loop', 'planning', 'workflow'],
          },
          {
            slug: 'tool-use-contracts',
            title: 'Tool Use Contracts',
            summary:
              'Design tools as reliable APIs with schemas, permissions, and response expectations.',
            duration: '50 min',
            format: 'Lab',
            concepts: ['tool schemas', 'permissions', 'side effects'],
            keywords: ['tools', 'schemas', 'permissions'],
          },
        ],
      },
      {
        slug: 'oversight-and-coordination',
        title: 'Oversight and Coordination',
        summary: 'Scale from single agents to supervised systems and coordinated roles.',
        signal: 'You can keep autonomy useful without surrendering control.',
        lessons: [
          {
            slug: 'multi-agent-coordination',
            title: 'Multi-Agent Coordination Patterns',
            summary: 'Decide when multiple roles help and when they only add complexity.',
            duration: '40 min',
            format: 'System Design',
            concepts: ['router patterns', 'specialized roles', 'handoffs'],
            keywords: ['multi-agent', 'handoffs', 'coordination'],
          },
          {
            slug: 'human-in-the-loop-agents',
            title: 'Human-in-the-Loop Agent Systems',
            summary: 'Insert approvals, reviews, and operator interfaces where agent risk rises.',
            duration: '45 min',
            format: 'Project',
            concepts: ['approvals', 'review queues', 'operator tooling'],
            keywords: ['human in the loop', 'approvals', 'operator review'],
          },
        ],
      },
    ],
  },
  {
    slug: 'ai-governance',
    title: 'AI Governance',
    strapline:
      'Translate policy, accountability, and risk into operational controls around AI systems.',
    summary:
      'Understand how governance becomes real through risk taxonomies, review workflows, documentation, and control mapping.',
    stage: 'enterprise',
    difficulty: 'Intermediate',
    estimatedWeeks: '3 weeks',
    weeklyRhythm: '3 sessions x 50 minutes',
    prerequisites: ['ai-foundations', 'llm-engineering'],
    nextTracks: ['enterprise-ai', 'ai-security', 'production-ai-systems'],
    tooling: ['Risk registers', 'Model cards', 'Control libraries'],
    outcomes: [
      'Create a governance operating model around AI products.',
      'Translate policy into checkpoints, approvals, and documentation.',
      'Support audits and stakeholder trust with structured evidence.',
    ],
    resources: [
      {
        label: 'NIST AI RMF Playbook',
        href: 'https://airc.nist.gov/airmf-resources/playbook/',
        kind: 'Docs',
      },
      {
        label: 'Model Cards for Model Reporting',
        href: 'https://arxiv.org/abs/1810.03993',
        kind: 'Paper',
      },
    ],
    capstone: {
      title: 'AI Governance Pack',
      summary:
        'Prepare a risk register, control map, governance cadence, and model card for a sample AI product.',
      deliverables: ['risk register', 'control mapping', 'model or system card'],
    },
    modules: [
      {
        slug: 'risk-and-policy',
        title: 'Risk and Policy',
        summary: 'Define what types of AI risk matter and how policy should respond.',
        signal: 'You can map abstract risk principles to actual product decisions.',
        lessons: [
          {
            slug: 'risk-taxonomy',
            title: 'AI Risk Taxonomy',
            summary:
              'Classify privacy, fairness, safety, reliability, legal, and reputational risks in one operating language.',
            duration: '40 min',
            format: 'Lesson',
            concepts: ['risk taxonomy', 'severity', 'ownership'],
            keywords: ['risk taxonomy', 'governance', 'controls'],
          },
          {
            slug: 'policy-to-controls',
            title: 'From Policy to Controls',
            summary:
              'Turn governance principles into design reviews, approvals, tests, and deployment checks.',
            duration: '45 min',
            format: 'Project',
            concepts: ['control mapping', 'review checkpoints', 'evidence'],
            keywords: ['policy', 'controls', 'evidence'],
          },
        ],
      },
      {
        slug: 'operations-and-audits',
        title: 'Operations and Audits',
        summary: 'Create the documents and rhythms that make governance sustainable.',
        signal:
          'You can support internal reviews and external audits with calm, reusable evidence.',
        lessons: [
          {
            slug: 'governance-ops',
            title: 'Governance Operating Rhythm',
            summary:
              'Set up review cadences, escalation paths, and issue management for ongoing AI oversight.',
            duration: '35 min',
            format: 'Project',
            concepts: ['review cadence', 'exceptions', 'issue management'],
            keywords: ['operating model', 'governance review', 'exceptions'],
          },
          {
            slug: 'model-cards-and-audit-readiness',
            title: 'Model Cards and Audit Readiness',
            summary:
              'Document model purpose, limits, evaluations, and known risks in a reviewable format.',
            duration: '40 min',
            format: 'Project',
            concepts: ['model cards', 'system cards', 'audit evidence'],
            keywords: ['model cards', 'audit', 'documentation'],
          },
        ],
      },
    ],
  },
  {
    slug: 'ai-security',
    title: 'AI Security',
    strapline:
      'Threat-model AI systems so prompt abuse, data leakage, and tool misuse do not surprise you in production.',
    summary:
      'Learn the security mindset needed for LLMs, retrieval systems, agents, and model-serving pipelines.',
    stage: 'systems',
    difficulty: 'Intermediate',
    estimatedWeeks: '3 weeks',
    weeklyRhythm: '3 sessions x 55 minutes',
    prerequisites: ['llm-engineering', 'rag-engineering'],
    nextTracks: ['production-ai-systems', 'enterprise-ai'],
    tooling: ['Threat models', 'Secrets managers', 'Red-team playbooks'],
    outcomes: [
      'Threat-model AI systems across prompt, data, and tool surfaces.',
      'Mitigate prompt injection, secret leakage, and unsafe action chains.',
      'Create security review patterns specific to AI features.',
    ],
    resources: [
      {
        label: 'OWASP LLM Top 10',
        href: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
        kind: 'Guide',
      },
      {
        label: 'MITRE ATLAS',
        href: 'https://atlas.mitre.org/',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'AI Threat Model and Red-Team Pack',
      summary:
        'Create a threat model, defense plan, least-privilege matrix, and adversarial test set for an AI workflow.',
      deliverables: ['threat model', 'access matrix', 'red-team test pack'],
    },
    modules: [
      {
        slug: 'attack-surfaces',
        title: 'Attack Surfaces',
        summary: 'See how AI products expand the normal application threat landscape.',
        signal: 'You can describe the new attack paths created by prompts, retrieval, and tools.',
        lessons: [
          {
            slug: 'threat-modeling-ai-systems',
            title: 'Threat Modeling AI Systems',
            summary:
              'Identify assets, trust boundaries, and abuse paths in model-driven applications.',
            duration: '40 min',
            format: 'Lesson',
            concepts: ['trust boundaries', 'assets', 'abuse cases'],
            keywords: ['threat modeling', 'trust boundaries', 'ai security'],
          },
          {
            slug: 'prompt-injection-defense',
            title: 'Prompt Injection and Instruction Defense',
            summary: 'Understand how untrusted content can override or manipulate model behavior.',
            duration: '45 min',
            format: 'Lab',
            concepts: ['prompt injection', 'instruction hierarchy', 'sandboxing'],
            keywords: ['prompt injection', 'untrusted input', 'defense'],
          },
        ],
      },
      {
        slug: 'defensive-operations',
        title: 'Defensive Operations',
        summary:
          'Protect secrets, tools, and runtime behavior while testing the system aggressively.',
        signal: 'You can create a realistic security review path before launch.',
        lessons: [
          {
            slug: 'data-secrets-and-tool-safety',
            title: 'Data, Secrets, and Tool Safety',
            summary: 'Limit what the model can access and what actions it can take on its own.',
            duration: '40 min',
            format: 'System Design',
            concepts: ['least privilege', 'secrets management', 'action safety'],
            keywords: ['least privilege', 'secrets', 'tool safety'],
          },
          {
            slug: 'ai-red-teaming',
            title: 'AI Red Teaming and Abuse Testing',
            summary:
              'Probe the system the way attackers, curious users, and edge-case inputs will.',
            duration: '45 min',
            format: 'Project',
            concepts: ['adversarial tests', 'abuse cases', 'regression suites'],
            keywords: ['red teaming', 'abuse testing', 'security review'],
          },
        ],
      },
    ],
  },
  {
    slug: 'mlops',
    title: 'MLOps',
    strapline:
      'Build the delivery pipeline that turns experiments into repeatable, monitorable ML services.',
    summary:
      'Learn the practices behind experiment tracking, packaging, deployment, monitoring, and release management for machine learning systems.',
    stage: 'systems',
    difficulty: 'Intermediate',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 55 minutes',
    prerequisites: ['machine-learning', 'deep-learning', 'python-for-ai'],
    nextTracks: ['production-ai-systems', 'enterprise-ai'],
    tooling: ['MLflow', 'Docker', 'CI/CD'],
    outcomes: [
      'Track experiments and model versions cleanly.',
      'Package models and dependencies for repeatable deployment.',
      'Monitor model health after launch and coordinate safer releases.',
    ],
    resources: [
      {
        label: 'MLflow Tracking',
        href: 'https://mlflow.org/docs/latest/tracking.html',
        kind: 'Docs',
      },
      {
        label: 'Docker Docs',
        href: 'https://docs.docker.com/',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'MLOps Delivery Blueprint',
      summary:
        'Package a model release workflow with experiment lineage, serving contract, monitoring, and promotion gates.',
      deliverables: ['tracking schema', 'serving contract', 'release and monitoring plan'],
    },
    modules: [
      {
        slug: 'tracking-and-packaging',
        title: 'Tracking and Packaging',
        summary: 'Create the backbone that connects experiments to deployable artifacts.',
        signal:
          'You can answer what model is running, how it was trained, and how to reproduce it.',
        lessons: [
          {
            slug: 'experiment-tracking',
            title: 'Experiment Tracking and Lineage',
            summary:
              'Record data, parameters, metrics, and artifacts so results stay comparable over time.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['experiment tracking', 'lineage', 'artifacts'],
            keywords: ['mlflow', 'tracking', 'lineage'],
          },
          {
            slug: 'packaging-and-serving',
            title: 'Packaging and Serving Models',
            summary:
              'Wrap models, preprocessing, and dependencies into a predictable serving artifact.',
            duration: '50 min',
            format: 'Lab',
            concepts: ['serving contract', 'containers', 'inference artifacts'],
            keywords: ['serving', 'docker', 'model packaging'],
          },
        ],
      },
      {
        slug: 'monitoring-and-releases',
        title: 'Monitoring and Releases',
        summary: 'Keep models healthy after launch and evolve them without chaos.',
        signal: 'You can design a release loop instead of one-off deployments.',
        lessons: [
          {
            slug: 'monitoring-and-drift',
            title: 'Monitoring, Drift, and Data Quality',
            summary:
              'Watch the health of inputs, predictions, and downstream outcomes after deployment.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['drift', 'prediction monitoring', 'quality alerts'],
            keywords: ['drift', 'monitoring', 'data quality'],
          },
          {
            slug: 'mlops-release-train',
            title: 'Release Trains for ML Systems',
            summary:
              'Plan validation, rollout, rollback, and retraining as one coordinated release process.',
            duration: '40 min',
            format: 'System Design',
            concepts: ['promotion gates', 'canary', 'champion challenger'],
            keywords: ['release train', 'canary', 'rollback'],
          },
        ],
      },
    ],
  },
  {
    slug: 'production-ai-systems',
    title: 'Production AI Systems',
    strapline:
      'Engineer for reliability, latency, observability, and incident response once AI is customer-facing.',
    summary:
      'Tie together runtime architecture, cost control, monitoring, and operational response for AI services at production scale.',
    stage: 'systems',
    difficulty: 'Advanced',
    estimatedWeeks: '4 weeks',
    weeklyRhythm: '4 sessions x 60 minutes',
    prerequisites: ['llm-engineering', 'rag-engineering', 'mlops'],
    nextTracks: ['enterprise-ai'],
    tooling: ['Tracing', 'APM', 'Queues', 'Caching'],
    outcomes: [
      'Design AI runtime flows with reliability and latency budgets in mind.',
      'Observe and debug distributed AI behavior in production.',
      'Respond to incidents with clear evidence and rollback options.',
    ],
    resources: [
      {
        label: 'Google SRE Handbook',
        href: 'https://sre.google/books/',
        kind: 'Guide',
      },
      {
        label: 'OpenTelemetry Docs',
        href: 'https://opentelemetry.io/docs/',
        kind: 'Docs',
      },
    ],
    capstone: {
      title: 'Production Readiness Review',
      summary:
        'Prepare a production architecture, trace schema, latency budget, and incident playbook for an AI service.',
      deliverables: ['runtime architecture', 'observability plan', 'incident playbook'],
    },
    modules: [
      {
        slug: 'runtime-engineering',
        title: 'Runtime Engineering',
        summary:
          'Treat AI services as distributed systems with budgets, queues, and failure modes.',
        signal: 'You can draw the runtime path of a production AI request end to end.',
        lessons: [
          {
            slug: 'reliability-patterns',
            title: 'Reliability Patterns for AI Services',
            summary: 'Add retries, timeouts, queues, and fallbacks without hiding deeper failures.',
            duration: '45 min',
            format: 'System Design',
            concepts: ['timeouts', 'queues', 'graceful degradation'],
            keywords: ['reliability', 'timeouts', 'fallbacks'],
          },
          {
            slug: 'latency-and-cost-engineering',
            title: 'Latency and Cost Engineering',
            summary:
              'Control token budgets, caching, parallelism, and model selection to keep systems fast and affordable.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['latency budget', 'caching', 'token economics'],
            keywords: ['latency', 'cost', 'caching'],
          },
        ],
      },
      {
        slug: 'observability-and-response',
        title: 'Observability and Response',
        summary:
          'See what happened, why it happened, and what to do next when production behavior goes sideways.',
        signal:
          'You can debug a live AI incident with structured evidence instead of intuition alone.',
        lessons: [
          {
            slug: 'observability-for-ai',
            title: 'Observability for AI Systems',
            summary:
              'Trace prompts, retrieval, tool calls, and outputs so debugging is possible after the fact.',
            duration: '45 min',
            format: 'Lesson',
            concepts: ['tracing', 'span metadata', 'redaction'],
            keywords: ['observability', 'tracing', 'redaction'],
          },
          {
            slug: 'incident-response-for-ai',
            title: 'Incident Response for AI Products',
            summary:
              'Prepare for accuracy failures, unsafe outputs, provider outages, and operational drift with a real response plan.',
            duration: '40 min',
            format: 'Project',
            concepts: ['incident classes', 'rollback', 'postmortems'],
            keywords: ['incident response', 'playbooks', 'rollback'],
          },
        ],
      },
    ],
  },
  {
    slug: 'enterprise-ai',
    title: 'Enterprise AI',
    strapline:
      'Scale AI across functions by linking use-case selection, platform choices, governance, and change management.',
    summary:
      'Focus on portfolio strategy, stakeholder alignment, rollout planning, and the practical operating model needed to make AI adoption stick.',
    stage: 'enterprise',
    difficulty: 'Advanced',
    estimatedWeeks: '3 weeks',
    weeklyRhythm: '3 sessions x 55 minutes',
    prerequisites: ['ai-governance', 'production-ai-systems', 'agent-engineering'],
    nextTracks: [],
    tooling: ['Portfolio scorecards', 'Operating models', 'Training plans'],
    outcomes: [
      'Prioritize enterprise AI opportunities with delivery and risk realism.',
      'Align platform, process, and people decisions across functions.',
      'Plan adoption and change management instead of stopping at prototypes.',
    ],
    resources: [
      {
        label: 'McKinsey State of AI',
        href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
        kind: 'Guide',
      },
      {
        label: 'Nielsen Norman Group AI Topic',
        href: 'https://www.nngroup.com/topic/ai/',
        kind: 'Guide',
      },
    ],
    capstone: {
      title: 'Enterprise AI Operating Plan',
      summary:
        'Assemble a portfolio strategy, platform architecture, rollout plan, and impact scorecard for an enterprise AI program.',
      deliverables: ['portfolio matrix', 'platform ownership map', 'rollout scorecard'],
    },
    modules: [
      {
        slug: 'strategy-and-architecture',
        title: 'Strategy and Architecture',
        summary:
          'Choose where enterprise AI should go first and how the platform should support it.',
        signal: 'You can distinguish meaningful enterprise adoption from scattered pilots.',
        lessons: [
          {
            slug: 'use-case-portfolio',
            title: 'AI Use-Case Portfolio Strategy',
            summary:
              'Prioritize enterprise use cases by value, feasibility, data readiness, and risk.',
            duration: '40 min',
            format: 'Lesson',
            concepts: ['portfolio scoring', 'readiness', 'sequencing'],
            keywords: ['portfolio strategy', 'use cases', 'prioritization'],
          },
          {
            slug: 'stakeholder-and-platform-architecture',
            title: 'Stakeholder and Platform Architecture',
            summary:
              'Align product, engineering, legal, security, and operations around a shared enterprise AI platform model.',
            duration: '45 min',
            format: 'System Design',
            concepts: ['shared platform', 'stakeholder map', 'domain ownership'],
            keywords: ['platform strategy', 'stakeholders', 'operating model'],
          },
        ],
      },
      {
        slug: 'adoption-and-change',
        title: 'Adoption and Change',
        summary:
          'Make AI usable in real teams through training, rollout planning, and behavioral support.',
        signal:
          'You can plan adoption as an organizational change effort rather than a launch event.',
        lessons: [
          {
            slug: 'change-management-for-ai',
            title: 'Change Management for AI Adoption',
            summary:
              'Prepare users, managers, and operators for new workflows, responsibilities, and trust patterns.',
            duration: '40 min',
            format: 'Project',
            concepts: ['adoption plans', 'enablement', 'behavior change'],
            keywords: ['change management', 'adoption', 'enablement'],
          },
          {
            slug: 'enterprise-rollout-and-value-tracking',
            title: 'Enterprise Rollout and Value Tracking',
            summary:
              'Scale from launch to durable business impact with scorecards and portfolio reviews.',
            duration: '45 min',
            format: 'System Design',
            concepts: ['value scorecards', 'portfolio reviews', 'impact tracking'],
            keywords: ['value tracking', 'rollout', 'portfolio reviews'],
          },
        ],
      },
    ],
  },
];

export const learningStageMeta: Record<
  LearningStage,
  { title: string; eyebrow: string; summary: string }
> = {
  core: {
    title: 'Core Foundations',
    eyebrow: 'Stage 01',
    summary: 'Build mental models, coding fluency, and mathematical intuition before scaling up.',
  },
  builder: {
    title: 'Model Builder',
    eyebrow: 'Stage 02',
    summary:
      'Move from theory into deep nets, vision, language, transformers, and generative workflows.',
  },
  systems: {
    title: 'Systems Engineering',
    eyebrow: 'Stage 03',
    summary:
      'Turn models into reliable products with retrieval, agents, MLOps, security, and operations.',
  },
  enterprise: {
    title: 'Enterprise Leadership',
    eyebrow: 'Stage 04',
    summary:
      'Scale governance, adoption, and portfolio strategy across teams, risk, and business outcomes.',
  },
};

function dedupe(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

const baseUrl = import.meta.env.BASE_URL ?? '/';

function withBase(path: string): string {
  return baseUrl + path.replace(/^\/+/, '');
}

function buildProjectDifficulty(
  level: LearningProjectLevel,
  trackDifficulty: LearningDifficulty,
): LearningDifficulty {
  if (level === 'Beginner') return 'Beginner';
  if (level === 'Intermediate') return 'Intermediate';
  if (level === 'Advanced') return 'Advanced';
  return trackDifficulty === 'Beginner' ? 'Intermediate' : 'Advanced';
}

function lessonOutputKind(format: LessonFormat): LearningLessonOutput['kind'] {
  switch (format) {
    case 'Lab':
      return 'Experiment log';
    case 'Project':
      return 'Execution brief';
    case 'System Design':
      return 'Architecture review';
    default:
      return 'Decision memo';
  }
}

function buildKeyTerms(
  trackSeed: TrackSeed,
  moduleSeed: ModuleSeed,
  lessonSeed: LessonSeed,
): LearningKeyTerm[] {
  const terms = dedupe([...lessonSeed.concepts, ...lessonSeed.keywords, lessonSeed.title])
    .filter(Boolean)
    .slice(0, 3);

  return terms.map((term) => ({
    term,
    misconception: 'Treating ' + term + ' like a buzzword instead of a decision-making tool.',
    meaning:
      term +
      ' matters in ' +
      moduleSeed.title +
      ' because it changes how you frame inputs, outputs, and review loops inside ' +
      trackSeed.title +
      '.',
  }));
}

function buildLessonOutput(
  trackSeed: TrackSeed,
  lessonSeed: LessonSeed,
  primaryConcept: string,
  secondaryConcept: string,
): LearningLessonOutput {
  const kind = lessonOutputKind(lessonSeed.format);
  const title = lessonSeed.title + ' ' + kind;
  const summary =
    'Use this ' +
    kind.toLowerCase() +
    ' to capture the exact decision path, evidence, and next move from the lesson before you continue.';
  const template = [
    '# ' + title,
    '',
    'Goal:',
    '- Explain the problem in one sentence using ' + trackSeed.title + ' language.',
    '',
    'Core concepts:',
    '- ' + primaryConcept,
    '- ' + secondaryConcept,
    '',
    'Workflow:',
    '- Inputs:',
    '- Steps:',
    '- Output:',
    '',
    'Quality bar:',
    '- What must be true before this is ready?',
    '- Which failure mode is most likely?',
    '',
    'Next iteration:',
    '- What would you test or improve next?',
  ].join('\n');

  return {
    kind,
    title,
    summary,
    template,
  };
}

function buildLesson(
  trackSeed: TrackSeed,
  moduleSeed: ModuleSeed,
  lessonSeed: LessonSeed,
): LearningLesson {
  const trackLabel = trackSeed.title.toLowerCase();
  const moduleLabel = moduleSeed.title.toLowerCase();
  const primaryConcept = lessonSeed.concepts[0] || lessonSeed.title.toLowerCase();
  const secondaryConcept = lessonSeed.concepts[1] || moduleLabel;
  const nextTrack = trackSeed.nextTracks[0]?.replace(/-/g, ' ');
  const primaryTool = trackSeed.tooling[0] || 'your core toolchain';
  const supportingTool = trackSeed.tooling[1] || secondaryConcept;
  const leadingOutcome = trackSeed.outcomes[0] || 'a reliable workflow';
  const capstoneDeliverable = trackSeed.capstone.deliverables[0] || 'final artifact';
  const stageLabel = learningStageMeta[trackSeed.stage].title.toLowerCase();
  const practiceArtifact =
    lessonSeed.format === 'Lab'
      ? 'prototype'
      : lessonSeed.format === 'Project'
        ? 'delivery brief'
        : lessonSeed.format === 'System Design'
          ? 'design review'
          : 'working note';
  const output = buildLessonOutput(trackSeed, lessonSeed, primaryConcept, secondaryConcept);

  return {
    ...lessonSeed,
    difficulty: trackSeed.difficulty,
    challenge:
      lessonSeed.summary +
      ' This lesson keeps the work grounded in ' +
      trackLabel +
      ' and the ' +
      moduleLabel +
      ' module.',
    motto:
      primaryConcept +
      ' becomes useful when you can explain it, build with it, and review it inside ' +
      trackSeed.title +
      '.',
    problem: [
      'Teams get stuck when ' +
        lessonSeed.title.toLowerCase() +
        ' stays abstract instead of becoming a repeatable workflow in ' +
        trackSeed.title +
        '.',
      'This lesson narrows the scope to ' +
        moduleSeed.title +
        ' so you can connect ' +
        primaryConcept +
        ' and ' +
        secondaryConcept +
        ' to a concrete build, review loop, and next decision.',
    ],
    objectives: [
      'Explain ' + lessonSeed.title.toLowerCase() + ' in the context of ' + trackSeed.title + '.',
      'Apply ' +
        primaryConcept +
        ' and ' +
        secondaryConcept +
        ' to a focused artifact inside ' +
        moduleSeed.title +
        '.',
      'Document the tradeoffs, limits, and follow-up signals before shipping.',
    ],
    conceptNotes: [
      primaryConcept +
        ' is the operating idea that tells you what signal to watch inside ' +
        moduleSeed.title +
        '.',
      secondaryConcept +
        ' gives the second constraint, so you can distinguish a good workflow from a fragile shortcut.',
      'Use both concepts together to decide what to measure, what to ship, and what to revise next.',
    ],
    keyTerms: buildKeyTerms(trackSeed, moduleSeed, lessonSeed),
    examples: [
      'Walk through a compact ' + trackLabel + ' scenario that highlights ' + primaryConcept + '.',
      'Use ' +
        primaryTool +
        (supportingTool !== primaryTool ? ' with ' + supportingTool : '') +
        ' to model the workflow before you automate it.',
      'Compare a reliable implementation path with a weaker shortcut inside ' +
        moduleSeed.title +
        '.',
      'Annotate the exact points where quality checks, review, or measurement should happen before the work reaches the ' +
        capstoneDeliverable +
        '.',
    ],
    buildIt: [
      'Create a compact ' + practiceArtifact + ' that demonstrates ' + primaryConcept + '.',
      'Annotate the inputs, outputs, and assumptions that shape the workflow.',
      'Capture the first success signal that tells you whether the work is moving toward ' +
        leadingOutcome.toLowerCase() +
        '.',
    ],
    useIt: [
      'Use the artifact to explain the workflow to a teammate or stakeholder.',
      'Compare one stronger and one weaker implementation choice using evidence from the lesson.',
      'Point to where this lesson will show up again inside the ' + capstoneDeliverable + '.',
    ],
    shipIt: [
      'Write the quality checks that should run before this pattern is used in a real product.',
      'Capture the limits, fallback plan, and next experiment in your notes.',
      'Decide what handoff note, demo, or review evidence belongs in the ' +
        stageLabel +
        ' roadmap after this lesson.',
    ],
    qualityChecks: [
      'The workflow clearly names the input, output, and review signal before implementation grows.',
      'The reasoning around ' +
        primaryConcept +
        ' is documented well enough for another teammate to follow.',
      'A likely failure mode and the first fallback or retry path are written down before shipping.',
      'The artifact uses ' +
        primaryTool +
        ' intentionally instead of treating tooling choices as an afterthought.',
    ],
    exercises: [
      'Rebuild the lesson artifact from scratch without looking at the notes.',
      'Write one failure case that would change your implementation choice.',
      'Turn the lesson into a ten-minute walkthrough for a teammate using ' + primaryTool + '.',
    ],
    interviewQuestions: [
      'How would you explain ' +
        lessonSeed.title.toLowerCase() +
        ' to a teammate new to ' +
        trackSeed.title +
        '?',
      'What tradeoffs matter most when using this pattern in production?',
      'How would you prove this lesson is ready to support the ' + capstoneDeliverable + '?',
    ],
    nextSteps: dedupe([
      'Review the next lesson in ' + moduleSeed.title + ' to reinforce the workflow.',
      nextTrack ? 'Move toward ' + nextTrack + ' once the current concepts feel stable.' : '',
      'Add the artifact, review notes, or failure case to your own ' +
        trackSeed.title +
        ' working library.',
      'Add one measurable checkpoint to your own practice notes before continuing.',
    ]),
    keywords: dedupe([
      trackSeed.slug,
      moduleSeed.slug,
      lessonSeed.format,
      ...lessonSeed.keywords,
      ...lessonSeed.concepts,
    ]),
    resources: trackSeed.resources.slice(0, 3),
    output,
  };
}

function buildExtensionModules(trackSeed: TrackSeed): ModuleSeed[] {
  const firstModule = trackSeed.modules[0];
  const secondModule = trackSeed.modules[1] || firstModule;
  const firstLesson = firstModule.lessons[0];
  const secondLesson = secondModule.lessons[0] || firstLesson;
  const firstConcept =
    firstLesson?.concepts[0] || firstLesson?.title.toLowerCase() || trackSeed.title.toLowerCase();
  const secondConcept =
    secondLesson?.concepts[0] || secondLesson?.title.toLowerCase() || firstConcept;
  const firstOutcome = trackSeed.outcomes[0] || 'reliable delivery';
  const secondOutcome = trackSeed.outcomes[1] || firstOutcome;
  const primaryTool = trackSeed.tooling[0] || trackSeed.title;
  const secondaryTool = trackSeed.tooling[1] || secondConcept;

  switch (trackSeed.stage) {
    case 'core':
      return [
        {
          slug: 'practice-studio',
          title: 'Practice Studio',
          summary:
            'Turn the early ' +
            trackSeed.title +
            ' concepts into repeatable drills, worked examples, and small builds.',
          signal:
            'You can recreate the core workflow from memory and connect it to ' +
            firstOutcome.toLowerCase() +
            '.',
          lessons: [
            {
              slug: 'worked-examples',
              title: trackSeed.title + ' Worked Examples',
              summary:
                'Break ' +
                firstConcept +
                ' into smaller practice drills you can solve quickly before moving to larger systems.',
              duration: '35 min',
              format: 'Lab',
              concepts: [firstConcept, primaryTool, 'worked examples'],
              keywords: ['practice drills', 'worked examples', trackSeed.slug],
            },
            {
              slug: 'mini-build-review',
              title: trackSeed.title + ' Mini Build Review',
              summary:
                'Use ' +
                primaryTool +
                ' to turn ' +
                secondConcept +
                ' into a compact build with a clear reflection loop.',
              duration: '40 min',
              format: 'Project',
              concepts: [secondConcept, secondaryTool, 'reflection loop'],
              keywords: ['mini build', 'review loop', trackSeed.slug],
            },
          ],
        },
        {
          slug: 'readiness-checks',
          title: 'Readiness Checks',
          summary:
            'Pressure-test understanding with common mistakes, checkpoint reviews, and short explanations.',
          signal:
            'You can explain what usually breaks and what makes the next lesson easier to absorb.',
          lessons: [
            {
              slug: 'common-mistakes',
              title: 'Common ' + trackSeed.title + ' Mistakes',
              summary:
                'Study the shortcuts that make ' +
                firstConcept +
                ' look right while quietly weakening the actual workflow.',
              duration: '30 min',
              format: 'Lesson',
              concepts: [firstConcept, 'failure patterns', secondOutcome],
              keywords: ['mistakes', 'failure patterns', trackSeed.slug],
            },
            {
              slug: 'readiness-checkpoint',
              title: trackSeed.title + ' Readiness Checkpoint',
              summary:
                'Wrap the track into a short readiness review before you move on to the next major capability.',
              duration: '35 min',
              format: 'System Design',
              concepts: [secondConcept, 'readiness review', firstOutcome],
              keywords: ['checkpoint', 'study plan', trackSeed.slug],
            },
          ],
        },
      ];
    case 'builder':
      return [
        {
          slug: 'experiment-studio',
          title: 'Experiment Studio',
          summary:
            'Build sharper experiments, baselines, and evaluation loops around the core builder concepts.',
          signal:
            'You can scope a clean experiment and explain what signal would justify the next iteration.',
          lessons: [
            {
              slug: 'experiment-scoping',
              title: trackSeed.title + ' Experiment Scoping',
              summary:
                'Use ' +
                primaryTool +
                ' to frame a compact experiment around ' +
                firstConcept +
                ' before you scale the build.',
              duration: '45 min',
              format: 'Lab',
              concepts: [firstConcept, 'baseline design', primaryTool],
              keywords: ['experiment scoping', 'baselines', trackSeed.slug],
            },
            {
              slug: 'failure-analysis',
              title: trackSeed.title + ' Failure Analysis',
              summary:
                'Review where ' +
                secondConcept +
                ' breaks down and how better evaluation tightens the next model or workflow choice.',
              duration: '45 min',
              format: 'Lesson',
              concepts: [secondConcept, 'failure analysis', secondOutcome],
              keywords: ['error analysis', 'evaluation loop', trackSeed.slug],
            },
          ],
        },
        {
          slug: 'builder-portfolio',
          title: 'Builder Portfolio',
          summary:
            'Turn the track into demo-ready artifacts, stretch milestones, and reusable explanations.',
          signal:
            'You can demo the work, defend the tradeoffs, and name the next stretch milestone clearly.',
          lessons: [
            {
              slug: 'demo-walkthrough',
              title: trackSeed.title + ' Demo Walkthrough',
              summary:
                'Package the strongest lesson artifacts into a short walkthrough another builder can understand quickly.',
              duration: '35 min',
              format: 'Project',
              concepts: [firstOutcome, 'demo narrative', primaryTool],
              keywords: ['demo', 'artifact review', trackSeed.slug],
            },
            {
              slug: 'stretch-milestones',
              title: trackSeed.title + ' Stretch Milestones',
              summary:
                'Plan the next capability leap using stronger datasets, tougher evals, or more realistic system constraints.',
              duration: '40 min',
              format: 'System Design',
              concepts: [secondOutcome, 'roadmap planning', secondaryTool],
              keywords: ['stretch goals', 'roadmap', trackSeed.slug],
            },
          ],
        },
      ];
    case 'systems':
      return [
        {
          slug: 'reliability-studio',
          title: 'Reliability Studio',
          summary:
            'Focus on failure modes, fallback behavior, and review loops before scaling the system.',
          signal:
            'You can explain what breaks first, how you would detect it, and what the first fallback should be.',
          lessons: [
            {
              slug: 'failure-modes-and-fallbacks',
              title: trackSeed.title + ' Failure Modes and Fallbacks',
              summary:
                'Map the fragile edges around ' +
                firstConcept +
                ' and design the first fallback path before a customer finds the bug.',
              duration: '45 min',
              format: 'System Design',
              concepts: [firstConcept, 'fallback paths', firstOutcome],
              keywords: ['failure modes', 'fallbacks', trackSeed.slug],
            },
            {
              slug: 'telemetry-review-loops',
              title: trackSeed.title + ' Telemetry and Review Loops',
              summary:
                'Use ' +
                primaryTool +
                ' and ' +
                secondaryTool +
                ' to define the signals, dashboards, or logs that keep the workflow honest.',
              duration: '40 min',
              format: 'Lab',
              concepts: [secondConcept, 'telemetry', 'review loops'],
              keywords: ['monitoring', 'telemetry', trackSeed.slug],
            },
          ],
        },
        {
          slug: 'launch-readiness',
          title: 'Launch Readiness',
          summary:
            'Turn the track into rollout checklists, handoff notes, and operational improvement loops.',
          signal:
            'You can ship the workflow with a clear handoff, a launch checklist, and the next operational backlog.',
          lessons: [
            {
              slug: 'launch-checklists',
              title: trackSeed.title + ' Launch Checklists',
              summary:
                'Convert the strongest lessons in the track into a launch checklist that another team could follow.',
              duration: '35 min',
              format: 'Project',
              concepts: [firstOutcome, 'launch checklist', secondOutcome],
              keywords: ['launch', 'handoff', trackSeed.slug],
            },
            {
              slug: 'operational-iteration-backlog',
              title: trackSeed.title + ' Operational Iteration Backlog',
              summary:
                'Prioritize the first post-launch improvements so the system keeps getting stronger under real usage.',
              duration: '35 min',
              format: 'Lesson',
              concepts: [secondOutcome, 'iteration backlog', 'operational review'],
              keywords: ['backlog', 'iteration', trackSeed.slug],
            },
          ],
        },
      ];
    case 'enterprise':
      return [
        {
          slug: 'operating-model-studio',
          title: 'Operating Model Studio',
          summary:
            'Translate the track into decision forums, stakeholder alignment, and portfolio-level tradeoffs.',
          signal:
            'You can explain who decides, what gets reviewed, and how value or risk is surfaced across teams.',
          lessons: [
            {
              slug: 'stakeholder-alignment',
              title: trackSeed.title + ' Stakeholder Alignment',
              summary:
                'Use ' +
                firstConcept +
                ' and ' +
                firstOutcome.toLowerCase() +
                ' to build alignment across leaders, operators, and delivery teams.',
              duration: '35 min',
              format: 'Lesson',
              concepts: [firstConcept, 'stakeholder alignment', firstOutcome],
              keywords: ['stakeholders', 'alignment', trackSeed.slug],
            },
            {
              slug: 'portfolio-tradeoffs',
              title: trackSeed.title + ' Portfolio Tradeoffs',
              summary:
                'Frame the tradeoffs between speed, control, adoption, and measurement before the portfolio expands.',
              duration: '40 min',
              format: 'System Design',
              concepts: [secondConcept, 'portfolio review', secondOutcome],
              keywords: ['portfolio', 'tradeoffs', trackSeed.slug],
            },
          ],
        },
        {
          slug: 'rollout-governance',
          title: 'Rollout and Governance',
          summary:
            'Prepare the rollout path with enablement, controls, and scaling reviews that survive real operations.',
          signal:
            'You can name the adoption plan, the governance checkpoints, and the conditions for safe scale-up.',
          lessons: [
            {
              slug: 'adoption-readiness',
              title: trackSeed.title + ' Adoption Readiness',
              summary:
                'Design the enablement plan, communication rhythm, and learning loop that helps the operating model stick.',
              duration: '35 min',
              format: 'Project',
              concepts: [firstOutcome, 'adoption readiness', primaryTool],
              keywords: ['adoption', 'enablement', trackSeed.slug],
            },
            {
              slug: 'scaling-risk-review',
              title: trackSeed.title + ' Scaling Risk Review',
              summary:
                'Run the risk review that decides whether the portfolio is ready to scale without losing trust or control.',
              duration: '40 min',
              format: 'System Design',
              concepts: [secondOutcome, 'risk review', secondaryTool],
              keywords: ['scaling', 'risk review', trackSeed.slug],
            },
          ],
        },
      ];
    default:
      return [];
  }
}

function buildProjects(trackSeed: TrackSeed, moduleSeeds = trackSeed.modules): LearningProject[] {
  const firstModule = moduleSeeds[0];
  const secondModule = moduleSeeds[1] || firstModule;
  const firstLesson = firstModule.lessons[0];
  const secondLesson = secondModule.lessons[0] || firstLesson;
  const titleBase = trackSeed.title;
  const sharedTech = dedupe(trackSeed.tooling).slice(0, 4);
  const sharedOutcomes = dedupe(trackSeed.outcomes).slice(0, 3);

  const beginnerSkills = dedupe([
    ...firstLesson.concepts.slice(0, 3),
    ...firstLesson.keywords.slice(0, 2),
  ]).slice(0, 4);

  const intermediateSkills = dedupe([
    ...secondLesson.concepts.slice(0, 3),
    ...secondLesson.keywords.slice(0, 2),
  ]).slice(0, 4);

  const advancedSkills = dedupe([
    ...moduleSeeds
      .flatMap((moduleEntry) => moduleEntry.lessons.flatMap((lessonEntry) => lessonEntry.concepts))
      .slice(0, 5),
    trackSeed.stage,
  ]).slice(0, 6);

  return [
    {
      slug: 'starter-sprint',
      title: firstModule.title + ' Starter Sprint',
      level: 'Beginner',
      summary:
        'Build a compact practice artifact that turns the first concepts in ' +
        titleBase +
        ' into a repeatable workflow.',
      duration: '2 to 3 hours',
      difficulty: buildProjectDifficulty('Beginner', trackSeed.difficulty),
      skills: beginnerSkills,
      technologies: sharedTech,
      outcomes: sharedOutcomes,
      deliverables: ['starter artifact', 'implementation notes', 'quality checklist'],
    },
    {
      slug: 'applied-build',
      title: secondModule.title + ' Applied Build',
      level: 'Intermediate',
      summary:
        'Combine the first two modules into a more complete workflow with measurable checkpoints and clearer tradeoffs.',
      duration: '4 to 6 hours',
      difficulty: buildProjectDifficulty('Intermediate', trackSeed.difficulty),
      skills: intermediateSkills,
      technologies: sharedTech,
      outcomes: sharedOutcomes,
      deliverables: ['working workflow', 'evaluation notes', 'iteration backlog'],
    },
    {
      slug: 'system-design-drill',
      title: titleBase + ' System Design Drill',
      level: 'Advanced',
      summary:
        'Turn the track into a production-shaped design exercise with architecture decisions, risk controls, and rollout thinking.',
      duration: '1 day',
      difficulty: buildProjectDifficulty('Advanced', trackSeed.difficulty),
      skills: advancedSkills,
      technologies: sharedTech,
      outcomes: sharedOutcomes,
      deliverables: ['architecture diagram', 'risk and tradeoff memo', 'operations checklist'],
    },
    {
      slug: 'capstone-project',
      title: trackSeed.capstone.title,
      level: 'Capstone',
      summary: trackSeed.capstone.summary,
      duration: '2 to 5 days',
      difficulty: buildProjectDifficulty('Capstone', trackSeed.difficulty),
      skills: dedupe([...beginnerSkills, ...intermediateSkills, ...advancedSkills]).slice(0, 6),
      technologies: sharedTech,
      outcomes: sharedOutcomes,
      deliverables: trackSeed.capstone.deliverables,
    },
  ];
}

export const learningTracks: LearningTrack[] = trackSeeds.map((trackSeed) => {
  const moduleSeeds = [...trackSeed.modules, ...buildExtensionModules(trackSeed)];

  return {
    ...trackSeed,
    modules: moduleSeeds.map((moduleSeed) => ({
      ...moduleSeed,
      lessons: moduleSeed.lessons.map((lessonSeed) =>
        buildLesson(trackSeed, moduleSeed, lessonSeed),
      ),
    })),
    projects: buildProjects(trackSeed, moduleSeeds),
  };
});

export const learningTrackMap = new Map(learningTracks.map((entry) => [entry.slug, entry]));

export const learningStageGroups = (Object.keys(learningStageMeta) as LearningStage[]).map(
  (stage) => ({
    stage,
    ...learningStageMeta[stage],
    tracks: learningTracks.filter((trackEntry) => trackEntry.stage === stage),
  }),
);

export function getTrackHref(trackSlug: string): string {
  return withBase('/learn/' + trackSlug + '/');
}

export function getLessonHref(trackSlug: string, lessonSlug: string): string {
  return withBase('/learn/' + trackSlug + '/' + lessonSlug + '/');
}

export function getProjectHref(trackSlug: string, projectSlug: string): string {
  return withBase('/learn/' + trackSlug + '/projects/' + projectSlug + '/');
}

export function getLearningTrack(trackSlug: string): LearningTrack | undefined {
  return learningTrackMap.get(trackSlug);
}

export function getLearningLesson(
  trackSlug: string,
  lessonSlug: string,
): LearningLessonMatch | undefined {
  const currentTrack = getLearningTrack(trackSlug);
  if (!currentTrack) return undefined;

  for (const currentModule of currentTrack.modules) {
    const currentLesson = currentModule.lessons.find((entry) => entry.slug === lessonSlug);
    if (currentLesson) {
      return {
        track: currentTrack,
        module: currentModule,
        lesson: currentLesson,
      };
    }
  }

  return undefined;
}

export function getLearningProject(
  trackSlug: string,
  projectSlug: string,
): LearningProjectMatch | undefined {
  const currentTrack = getLearningTrack(trackSlug);
  if (!currentTrack) return undefined;
  const currentProject = currentTrack.projects.find((entry) => entry.slug === projectSlug);
  return currentProject ? { track: currentTrack, project: currentProject } : undefined;
}

export function getTrackLessonCount(trackEntry: LearningTrack): number {
  return trackEntry.modules.reduce((total, moduleEntry) => total + moduleEntry.lessons.length, 0);
}

export function getTrackProjectCount(trackEntry: LearningTrack): number {
  return trackEntry.projects.length;
}

export function getTrackMinutes(trackEntry: LearningTrack): number {
  return trackEntry.modules.reduce(
    (total, moduleEntry) =>
      total +
      moduleEntry.lessons.reduce((moduleTotal, lessonEntry) => {
        const minutes = Number.parseInt(lessonEntry.duration, 10);
        return moduleTotal + (Number.isNaN(minutes) ? 0 : minutes);
      }, 0),
    0,
  );
}

export function getTrackModuleCount(trackEntry: LearningTrack): number {
  return trackEntry.modules.length;
}

export function getAllLearningLessons(): LearningLessonMatch[] {
  return learningTracks.flatMap((trackEntry) =>
    trackEntry.modules.flatMap((moduleEntry) =>
      moduleEntry.lessons.map((lessonEntry) => ({
        track: trackEntry,
        module: moduleEntry,
        lesson: lessonEntry,
      })),
    ),
  );
}

export function getAllLearningProjects(): LearningProjectMatch[] {
  return learningTracks.flatMap((trackEntry) =>
    trackEntry.projects.map((projectEntry) => ({
      track: trackEntry,
      project: projectEntry,
    })),
  );
}

export function getDependentTracks(trackSlug: string): LearningTrack[] {
  return learningTracks.filter((trackEntry) => trackEntry.prerequisites.includes(trackSlug));
}

export const learnTotals = learningTracks.reduce(
  (totals, trackEntry) => {
    totals.tracks += 1;
    totals.modules += getTrackModuleCount(trackEntry);
    totals.lessons += getTrackLessonCount(trackEntry);
    totals.projects += getTrackProjectCount(trackEntry);
    totals.minutes += getTrackMinutes(trackEntry);
    return totals;
  },
  { tracks: 0, modules: 0, lessons: 0, projects: 0, minutes: 0 },
);

export const learnSearchIndex: LearnSearchItem[] = learningTracks.flatMap((trackEntry) => {
  const trackItem: LearnSearchItem = {
    kind: 'track',
    title: trackEntry.title,
    href: getTrackHref(trackEntry.slug),
    excerpt: trackEntry.summary,
    stage: trackEntry.stage,
    trackSlug: trackEntry.slug,
    trackTitle: trackEntry.title,
    keywords: dedupe([
      trackEntry.slug,
      trackEntry.stage,
      ...trackEntry.tooling,
      ...trackEntry.outcomes,
      ...trackEntry.prerequisites,
    ]),
  };

  const moduleItems = trackEntry.modules.flatMap((moduleEntry) => {
    const currentModuleItem: LearnSearchItem = {
      kind: 'module',
      title: moduleEntry.title,
      href: getTrackHref(trackEntry.slug),
      excerpt: moduleEntry.summary,
      stage: trackEntry.stage,
      trackSlug: trackEntry.slug,
      trackTitle: trackEntry.title,
      moduleTitle: moduleEntry.title,
      keywords: dedupe([
        moduleEntry.slug,
        moduleEntry.signal,
        ...moduleEntry.lessons.flatMap((item) => item.keywords),
      ]),
    };

    const lessonItems = moduleEntry.lessons.map<LearnSearchItem>((lessonEntry) => ({
      kind: 'lesson',
      title: lessonEntry.title,
      href: getLessonHref(trackEntry.slug, lessonEntry.slug),
      excerpt: lessonEntry.summary,
      stage: trackEntry.stage,
      trackSlug: trackEntry.slug,
      trackTitle: trackEntry.title,
      moduleTitle: moduleEntry.title,
      duration: lessonEntry.duration,
      keywords: dedupe([
        lessonEntry.slug,
        lessonEntry.format,
        ...lessonEntry.keywords,
        ...lessonEntry.concepts,
      ]),
    }));

    return [currentModuleItem, ...lessonItems];
  });

  const projectItems = trackEntry.projects.map<LearnSearchItem>((projectEntry) => ({
    kind: 'project',
    title: projectEntry.title,
    href: getProjectHref(trackEntry.slug, projectEntry.slug),
    excerpt: projectEntry.summary,
    stage: trackEntry.stage,
    trackSlug: trackEntry.slug,
    trackTitle: trackEntry.title,
    duration: projectEntry.duration,
    projectLevel: projectEntry.level,
    keywords: dedupe([
      projectEntry.slug,
      projectEntry.level,
      ...projectEntry.skills,
      ...projectEntry.technologies,
      ...projectEntry.outcomes,
    ]),
  }));

  return [trackItem, ...moduleItems, ...projectItems];
});
