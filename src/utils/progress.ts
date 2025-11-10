export interface UserProgress {
  [moduleId: string]: {
    [lessonId: string]: 'not_started' | 'in_progress' | 'done';
  };
}

export const getUserProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem('userProgress');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const setLessonProgress = (moduleId: string, lessonId: string, status: 'not_started' | 'in_progress' | 'done') => {
  const progress = getUserProgress();
  if (!progress[moduleId]) {
    progress[moduleId] = {};
  }
  progress[moduleId][lessonId] = status;
  localStorage.setItem('userProgress', JSON.stringify(progress));
};

export const getLessonStatus = (moduleId: string, lessonId: string): 'not_started' | 'in_progress' | 'done' => {
  const progress = getUserProgress();
  return progress[moduleId]?.[lessonId] || 'not_started';
};

export const clearAllProgress = () => {
  localStorage.removeItem('userProgress');
};

export const getInProgressLessons = () => {
  const progress = getUserProgress();
  const inProgress: Array<{
    moduleId: string;
    lessonId: string;
    status: string;
  }> = [];

  Object.entries(progress).forEach(([moduleId, lessons]) => {
    Object.entries(lessons).forEach(([lessonId, status]) => {
      if (status === 'in_progress') {
        inProgress.push({ moduleId, lessonId, status });
      }
    });
  });

  return inProgress;
};