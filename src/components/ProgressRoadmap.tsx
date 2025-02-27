import { Check, Circle, ChevronRight, ChevronDown, SidebarClose, SidebarOpen } from 'lucide-react';
import { useState } from 'react';

interface Milestone {
  title: string;
  completed: boolean;
  description?: string;
}

interface Phase {
  name: string;
  emoji: string;
  description: string;
  progress: number;
  milestones: Milestone[];
  current: boolean;
}

const phases: Phase[] = [
  {
    name: 'Crawl',
    emoji: '🐛',
    description: 'Building core functionality and establishing baseline performance',
    progress: 30,
    current: true,
    milestones: [
      {
        title: 'Page Scanner implementation',
        completed: true,
        description: 'Automated identification of page components and events'
      },
      {
        title: 'Basic NL2SQL functionality',
        completed: true,
        description: 'Initial version for simple queries (e.g., CTR analysis)'
      },
      {
        title: 'User interface foundation',
        completed: true,
        description: 'Minimal UI for data analysts and stakeholders'
      },
      {
        title: 'Enhance NL2SQL for complex query handling',
        completed: false,
        description: 'Early exploration of advanced queries for future-proofing'
      },
      {
        title: 'Connect Page Scanner with NL2SQL for GA4 event detection',
        completed: false,
        description: 'Integration of scanner outputs with query logic'
      },
      {
        title: 'Conduct performance testing & define baseline metrics',
        completed: false,
        description: 'Test speed, accuracy, and establish baseline metrics'
      },
      {
        title: 'Pilot concurrency & parallelization',
        completed: false,
        description: 'Test handling of multiple simple queries simultaneously'
      },
      {
        title: 'Gather internal feedback',
        completed: false,
        description: 'Collect user input to refine prompts and UI'
      }
    ],
  },
  {
    name: 'Walk',
    emoji: '🚶',
    description: 'Internal testing and refinement phase',
    progress: 0,
    current: false,
    milestones: [
      { title: 'Internal deployment and testing', completed: false },
      { title: 'User feedback collection', completed: false },
      { title: 'System refinement', completed: false },
    ],
  },
  {
    name: 'Run',
    emoji: '🏃',
    description: 'Production deployment and user onboarding',
    progress: 0,
    current: false,
    milestones: [
      { title: 'External deployment', completed: false },
      { title: 'Production environment setup', completed: false },
      { title: 'User onboarding', completed: false },
    ],
  },
];

export function ProgressRoadmap() {
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    Crawl: true,
    Walk: true,
    Run: true,
  });
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const togglePhase = (phaseName: string) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseName]: !prev[phaseName],
    }));
  };

  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  if (!sidebarExpanded) {
    return (
      <div className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Expand sidebar"
        >
          <SidebarOpen className="w-5 h-5 text-gray-600" />
        </button>
        <div className="mt-4 space-y-4">
          {phases.map((phase) => (
            <div
              key={phase.name}
              className="flex flex-col items-center"
              title={`${phase.name} Phase`}
            >
              <span className="text-xl">{phase.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center justify-between border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Project Progress</h2>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Collapse sidebar"
        >
          <SidebarClose className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="overflow-y-auto flex-1 p-6 space-y-8">
        {phases.map((phase, index) => (
          <div key={phase.name} className="relative">
            {index < phases.length - 1 && (
              <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-gray-200" />
            )}
            <div className="relative">
              <button
                onClick={() => togglePhase(phase.name)}
                className="w-full flex items-start gap-4 group"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  phase.current ? 'bg-pink-100 text-pink-600' : 
                  phase.progress > 0 ? 'bg-green-100 text-green-600' : 
                  'bg-gray-100 text-gray-400'
                }`}>
                  {phase.progress === 100 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">{phase.emoji}</span>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {phase.name}
                    </h3>
                    {phase.current && (
                      <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                        Current
                      </span>
                    )}
                    {expandedPhases[phase.name] ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{phase.description}</p>
                </div>
              </button>

              {expandedPhases[phase.name] && (
                <>
                  {phase.progress > 0 && (
                    <div className="mt-2 ml-10">
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-600 rounded-full transition-all duration-500"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Progress: {phase.progress}%</p>
                    </div>
                  )}
                  <ul className="mt-3 ml-10 space-y-3">
                    {phase.milestones.map((milestone, mIndex) => (
                      <li 
                        key={mIndex}
                        className="group"
                      >
                        <div className="flex items-start gap-2">
                          <span className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {milestone.completed ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Circle className="w-3 h-3" />
                            )}
                          </span>
                          <div className="flex-1">
                            <span className={`text-sm ${milestone.completed ? 'text-gray-600' : 'text-gray-500'}`}>
                              {milestone.title}
                            </span>
                            {milestone.description && (
                              <p className="mt-0.5 text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                                {milestone.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}