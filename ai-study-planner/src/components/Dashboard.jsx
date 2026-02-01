import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, RefreshCw, Sun, Moon } from 'lucide-react';
import Header from './Header';
import SubjectInput from './SubjectInput';
import ExamDateInput from './ExamDateInput';
import TimetableCard from './TimetableCard';
import ProgressTracker from './ProgressTracker';
import PomodoroTimer from './PomodoroTimer';
import Stats from './Stats';
import SettingsModal from './Settings';
import { generateStudyPlan } from '../utils/aiPlanner';
import { loadData, saveData } from '../utils/storage';
import { getDaysUntilExam } from '../utils/dateUtils';

const Dashboard = () => {
  const [data, setData] = useState(loadData());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadData();
    setData(savedData);
  }, []);

  // Apply dark mode class to html
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Save data whenever it changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleAddSubject = (subject) => {
    setData(prev => ({
      ...prev,
      subjects: [...prev.subjects, subject]
    }));
  };

  const handleRemoveSubject = (subjectId) => {
    setData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.id !== subjectId)
    }));
  };

  const handleSetExamDate = (date) => {
    setData(prev => ({
      ...prev,
      examDate: date,
      timetable: [] // Reset timetable when exam date changes
    }));
  };

  const handleDeleteExamDate = () => {
    setData(prev => ({
      ...prev,
      examDate: null,
      timetable: [] // Reset timetable when exam date is deleted
    }));
  };

  const handleGeneratePlan = useCallback(() => {
    if (!data.subjects.length || !data.examDate) return;
    
    setIsGenerating(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const timetable = generateStudyPlan(data.subjects, data.examDate, data.settings);
      setData(prev => ({
        ...prev,
        timetable,
        completedTasks: [] // Reset progress when generating new plan
      }));
      setIsGenerating(false);
    }, 1500);
  }, [data.subjects, data.examDate, data.settings]);

  const handleToggleTask = (taskId) => {
    setData(prev => ({
      ...prev,
      completedTasks: prev.completedTasks.includes(taskId)
        ? prev.completedTasks.filter(id => id !== taskId)
        : [...prev.completedTasks, taskId]
    }));
  };

  const handlePomodoroComplete = (type) => {
    const duration = type === 'work' ? data.settings.pomodoroDuration : data.settings.breakDuration;
    
    setData(prev => ({
      ...prev,
      pomodoroSessions: {
        ...prev.pomodoroSessions,
        todayCompleted: type === 'work' ? prev.pomodoroSessions.todayCompleted + 1 : prev.pomodoroSessions.todayCompleted,
        todayMinutes: type === 'work' ? prev.pomodoroSessions.todayMinutes + duration : prev.pomodoroSessions.todayMinutes,
        totalCompleted: type === 'work' ? prev.pomodoroSessions.totalCompleted + 1 : prev.pomodoroSessions.totalCompleted,
        totalMinutes: type === 'work' ? prev.pomodoroSessions.totalMinutes + duration : prev.pomodoroSessions.totalMinutes,
        lastResetDate: new Date().toDateString()
      }
    }));
  };

  const handleUpdatePomodoroSessions = (newSessions) => {
    setData(prev => ({
      ...prev,
      pomodoroSessions: newSessions
    }));
  };

  const handleSaveSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      settings: newSettings
    }));
    localStorage.setItem('pomodoro-settings', JSON.stringify({
      workDuration: newSettings.pomodoroDuration,
      breakDuration: newSettings.breakDuration
    }));
  };

  const canGeneratePlan = data.subjects.length > 0 && data.examDate;
  const daysUntilExam = getDaysUntilExam(data.examDate);
  const completedToday = data.timetable.filter(t => 
    data.completedTasks.includes(t.id)
  ).length;

  return (
    <div className="min-h-screen pb-12 transition-colors duration-300">
      {/* Header */}
      <Header 
        stats={{
          daysUntilExam,
          totalSubjects: data.subjects.length,
          completedToday
        }}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-gradient bg-clip-text animate-gradient bg-300% mb-4">
            Welcome to AI Study Planner
          </h1>
          <p className="text-lg text-secondary-500 dark:text-secondary-400 max-w-2xl mx-auto">
            Your personal AI-powered study companion. Let's plan your success with smart scheduling, 
            Pomodoro timer, and progress tracking!
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <Stats 
            subjects={data.subjects}
            timetable={data.timetable}
            completedTasks={data.completedTasks}
            pomodoroSessions={data.pomodoroSessions}
            examDate={data.examDate}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <SubjectInput
              subjects={data.subjects}
              onAddSubject={handleAddSubject}
              onRemoveSubject={handleRemoveSubject}
            />
            <ExamDateInput
              examDate={data.examDate}
              onSetExamDate={handleSetExamDate}
              onDeleteExamDate={handleDeleteExamDate}
            />
          </div>

          {/* Center Column - Timetable */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generate Plan Button */}
            {canGeneratePlan && (
              <div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 animate-float">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-800 dark:text-white">
                        AI Study Plan Ready
                      </h3>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">
                        {data.timetable.length > 0 
                          ? `${data.timetable.length} study sessions planned across ${Math.max(1, daysUntilExam)} days`
                          : 'Click to generate your personalized schedule'
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleGeneratePlan}
                    disabled={isGenerating}
                    className={`btn-primary flex items-center gap-2 ${
                      isGenerating ? 'opacity-75 cursor-wait' : ''
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {data.timetable.length > 0 ? 'Regenerate Plan' : 'Generate Plan'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Timetable */}
            <TimetableCard
              tasks={data.timetable}
              onToggleComplete={handleToggleTask}
              completedTasks={data.completedTasks}
            />
          </div>
        </div>

        {/* Bottom Section - Progress & Pomodoro */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ProgressTracker
              timetable={data.timetable}
              completedTasks={data.completedTasks}
              daysUntilExam={daysUntilExam}
            />
          </div>
          <div>
            <PomodoroTimer
              onSessionComplete={handlePomodoroComplete}
              sessions={data.pomodoroSessions}
              onUpdateSessions={handleUpdatePomodoroSessions}
            />
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={data.settings}
        onSave={handleSaveSettings}
      />

      {/* Settings FAB */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white rounded-2xl shadow-xl shadow-primary-500/25 flex items-center justify-center transition-all hover:scale-110 hover:shadow-2xl z-40"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Dashboard;

