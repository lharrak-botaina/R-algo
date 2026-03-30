import React from 'react';
import { Module, LessonStatus } from '../types/student';
import { calculateModuleProgress } from '../utils/calculations';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  Trash2Icon,
  Edit2Icon
} from
  'lucide-react';

interface ModuleProgressProps {
  modules: Module[];
  isEditMode: boolean;
  actions: {
    updateLessonStatus: (
      moduleId: string,
      lessonId: string,
      status: LessonStatus)
      => void;
    toggleModuleExpanded: (moduleId: string) => void;
    addModule: () => void;
    deleteModule: (moduleId: string) => void;
    addLesson: (moduleId: string) => void;
    updateLessonName: (moduleId: string, lessonId: string, name: string) => void;
    deleteLesson: (moduleId: string, lessonId: string) => void;
    updateModuleTitle: (moduleId: string, name: string) => void;
  };
}

export function ModuleProgress({
  modules,
  isEditMode,
  actions
}: ModuleProgressProps) {
  const getStatusColor = (status: LessonStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  const cycleStatus = (current: LessonStatus): LessonStatus => {
    if (current === 'completed') return 'absent';
    if (current === 'absent') return 'unknown';
    return 'completed';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-bold text-purple-700 uppercase tracking-widest">
          Module Progress
        </h3>
        {isEditMode &&
          <button
            onClick={actions.addModule}
            className="flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:bg-purple-50 px-2 py-0.5 rounded">
            <PlusIcon className="w-3 h-3" /> Add Module
          </button>
        }
      </div>

      {/* Status Legend */}
      <div className="flex items-center gap-4 mb-3 text-[9px] font-medium text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span>Not started yet</span>
        </div>
      </div>

      <div className="space-y-2">
        {modules.map((module) => {
          const progress = calculateModuleProgress(module);
          return (
            <div
              key={module.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden print-no-break">

              <div
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => actions.toggleModuleExpanded(module.id)}>

                <div className="flex-1">
                  {isEditMode ?
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}>

                      <input
                        value={module.name}
                        onChange={(e) =>
                          actions.updateModuleTitle(module.id, e.target.value)
                        }
                        className="font-bold text-gray-900 bg-white border border-gray-300 rounded px-2 py-0.5 w-full max-w-md focus:ring-2 focus:ring-purple-500 text-xs" />

                      <button
                        onClick={() => actions.deleteModule(module.id)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                        title="Delete Module">
                        <Trash2Icon className="w-3 h-3" />
                      </button>
                    </div> :

                    <h4 className="font-bold text-gray-900 text-xs">{module.name}</h4>
                  }
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {
                      module.lessons.filter((l) => l.status === 'completed').
                        length
                    }{' '}
                    of {module.lessons.length} lessons completed
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-lg font-bold text-purple-700">
                      {progress}%
                    </span>
                  </div>
                  {module.expanded ?
                    <ChevronUpIcon className="w-4 h-4 text-gray-400" /> :

                    <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                  }
                </div>
              </div>

              {module.expanded &&
                <div className="px-3 pb-4 pt-1 border-t border-gray-100">
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`
                      }}>
                    </div>
                  </div>

                  {/* Lessons Grid */}
                  <div className="flex flex-wrap gap-1.5">
                    {module.lessons.map((lesson) =>
                      <div
                        key={lesson.id}
                        className={`
                          relative group px-2 py-1 rounded-md text-[10px] font-medium border transition-all select-none
                          ${getStatusColor(lesson.status)}
                          ${isEditMode ? 'cursor-pointer hover:scale-105' : ''}
                        `}
                        onClick={() =>
                          isEditMode &&
                          actions.updateLessonStatus(
                            module.id,
                            lesson.id,
                            cycleStatus(lesson.status)
                          )
                        }>

                        {isEditMode ?
                          <div className="flex items-center gap-1">
                            <input
                              value={lesson.name}
                              onChange={(e) =>
                                actions.updateLessonName(
                                  module.id,
                                  lesson.id,
                                  e.target.value
                                )
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="bg-transparent border-b border-transparent hover:border-current focus:border-current focus:outline-none w-14" />

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                actions.deleteLesson(module.id, lesson.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 hover:text-red-600 text-xs">
                              &times;
                            </button>
                          </div> :

                          lesson.name
                        }
                      </div>
                    )}

                    {isEditMode &&
                      <button
                        onClick={() => actions.addLesson(module.id)}
                        className="px-2 py-1 rounded-md text-[10px] font-medium border border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 transition-colors">
                        + Add Lesson
                      </button>
                    }
                  </div>
                </div>
              }
            </div>);

        })}
      </div>
    </div>);
}