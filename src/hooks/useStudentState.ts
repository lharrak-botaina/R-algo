import { useState, useEffect } from 'react';
import { Student, LessonStatus } from '../types/student';
import { calculateStats } from '../utils/calculations';

const DEFAULT_STUDENT: Student = {
  id: 'student-1',
  name: 'Alaoui Amrani Assil',
  className: 'Monday',
  instructorName: 'Issam Bikrouin',
  instructorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStu0atlMhXVh0PyLQxLvhC4xFNpZr1kptooA&s', // Placeholder image
  academicYear: '2025-2026',
  course: 'VISUAL PROGRAMING',
  participation: 5,
  teamwork: 4,
  creativity: 4,
  modules: [
    {
      id: 'm1',
      name: 'Module 1: Introduction',
      expanded: true,
      lessons: [
        { id: 'l1-1', name: 'Lesson 1', status: 'completed' },
        { id: 'l1-2', name: 'Lesson 2', status: 'completed' },
        { id: 'l1-3', name: 'Lesson 3', status: 'completed' },
        { id: 'l1-4', name: 'Lesson 4', status: 'completed' },
        { id: 'l1-5', name: 'Lesson 5', status: 'completed' }]

    },
    {
      id: 'm2',
      name: 'Module 2: Space',
      expanded: true,
      lessons: [
        { id: 'l2-1', name: 'Lesson 1', status: 'completed' },
        { id: 'l2-2', name: 'Lesson 2', status: 'completed' },
        { id: 'l2-3', name: 'Lesson 3', status: 'completed' },
        { id: 'l2-4', name: 'Lesson 4', status: 'completed' },
        { id: 'l2-5', name: 'Lesson 5', status: 'completed' }]

    },
    {
      id: 'm3',
      name: 'Module 3: Game',
      expanded: true,
      lessons: [
        { id: 'l3-1', name: 'Lesson 1', status: 'completed' },
        { id: 'l3-2', name: 'Lesson 2', status: 'completed' },
        { id: 'l3-3', name: 'Lesson 3', status: 'completed' },
        { id: 'l3-4', name: 'Lesson 4', status: 'absent' },
        { id: 'l3-5', name: 'Lesson 5', status: 'absent' },
        { id: 'l3-6', name: 'Lesson 6', status: 'completed' }]

    },
    {
      id: 'm4',
      name: 'Module 4: Logic',
      expanded: false,
      lessons: [
        { id: 'l4-1', name: 'Lesson 1', status: 'completed' },
        { id: 'l4-2', name: 'Lesson 2', status: 'completed' },
        { id: 'l4-3', name: 'Lesson 3', status: 'completed' },
        { id: 'l4-4', name: 'Lesson 4', status: 'completed' },
        { id: 'l4-5', name: 'Lesson 5', status: 'completed' },
        { id: 'l4-6', name: 'Lesson 6', status: 'unknown' }]

    },
    {
      id: 'm5',
      name: 'Module 5: Variables',
      expanded: false,
      lessons: [
        { id: 'l5-1', name: 'Lesson 1', status: 'unknown' },
        { id: 'l5-2', name: 'Lesson 2', status: 'unknown' },
        { id: 'l5-3', name: 'Lesson 3', status: 'unknown' },
        { id: 'l5-4', name: 'Lesson 4', status: 'unknown' },
        { id: 'l5-5', name: 'Lesson 5', status: 'unknown' },
        { id: 'l5-6', name: 'Lesson 6', status: 'unknown' }
      ]
    },
    {
      id: 'm6',
      name: 'Module 6: Clones',
      expanded: false,
      lessons: [
        { id: 'l6-1', name: 'Lesson 1', status: 'unknown' },
        { id: 'l6-2', name: 'Lesson 2', status: 'unknown' }
      ]
    },
    {
      id: 'm7',
      name: 'Module 7: Final Project',
      expanded: true,
      lessons: [
        { id: 'l7-1', name: 'Preparation', status: 'unknown' },
        { id: 'l7-2', name: 'Presentation', status: 'unknown' }
      ]
    }],

  skills: [
    { id: 's1', name: 'Visual programming', level: 5, maxLevel: 5 },
    { id: 's2', name: 'Game development', level: 4, maxLevel: 5 },
    { id: 's3', name: 'Logic', level: 5, maxLevel: 5 },
    { id: 's4', name: 'Variables', level: 4, maxLevel: 5 }],

  feedback:
    "Alaoui has delivered a developing performance this term, achieving a 59% module completion rate across all course content. Alaoui demonstrates outstanding technical aptitude and maintains excellent attendance, which speaks well of their dedication to the programme.\n\nAlaoui's creativity is a notable strength, reflecting an inventive approach to problem-solving. With a participation score of 100% and a teamwork rating of 80%, Alaoui is clearly an engaged learner. We encourage Alaoui to continue building on these strong foundations, exploring extension challenges, and applying these skills in creative projects. We look forward to seeing continued growth next term.",
  generatedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
};

export function useStudentState() {
  const [student, setStudent] = useState<Student>(DEFAULT_STUDENT);
  const [isEditMode, setIsEditMode] = useState(false);
  const [stats, setStats] = useState(calculateStats(DEFAULT_STUDENT));

  useEffect(() => {
    setStats(calculateStats(student));
  }, [student]);

  const updateStudentField = (field: keyof Student, value: any) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const updateLessonStatus = (
    moduleId: string,
    lessonId: string,
    status: LessonStatus) => {
    setStudent((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === lessonId ? { ...l, status } : l
          )
        };
      })
    }));
  };

  const toggleModuleExpanded = (moduleId: string) => {
    setStudent((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId ? { ...m, expanded: !m.expanded } : m
      )
    }));
  };

  const addModule = () => {
    const newModule = {
      id: `m-${Date.now()}`,
      name: 'New Module',
      expanded: true,
      lessons: []
    };
    setStudent((prev) => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const deleteModule = (moduleId: string) => {
    setStudent((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.id !== moduleId)
    }));
  };

  const addLesson = (moduleId: string) => {
    setStudent((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          lessons: [
            ...m.lessons,
            {
              id: `l-${Date.now()}`,
              name: `Lesson ${m.lessons.length + 1}`,
              status: 'unknown'
            }]

        };
      })
    }));
  };

  const updateLessonName = (
    moduleId: string,
    lessonId: string,
    name: string) => {
    setStudent((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === lessonId ? { ...l, name } : l
          )
        };
      })
    }));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setStudent((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          lessons: m.lessons.filter((l) => l.id !== lessonId)
        };
      })
    }));
  };

  const updateSkill = (skillId: string, level: number) => {
    setStudent((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => s.id === skillId ? { ...s, level } : s)
    }));
  };

  const updateModuleTitle = (moduleId: string, name: string) => {
    setStudent((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId ? { ...m, name } : m
      )
    }));
  };

  return {
    student,
    setStudent,
    isEditMode,
    setIsEditMode,
    stats,
    actions: {
      updateStudentField,
      updateLessonStatus,
      toggleModuleExpanded,
      addModule,
      deleteModule,
      addLesson,
      updateLessonName,
      deleteLesson,
      updateSkill,
      updateModuleTitle
    }
  };
}