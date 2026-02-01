import React from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { formatDate, getDaysUntilExam, isExamPast } from '../utils/dateUtils';

const ExamDateInput = ({ examDate, onSetExamDate, onDeleteExamDate }) => {
  const daysUntil = getDaysUntilExam(examDate);
  const past = isExamPast(examDate);

  const getCountdownMessage = () => {
    if (!examDate) return { text: 'Set your exam date to get started', color: 'text-secondary-500' };
    if (past) return { text: 'Exam date has passed! Great job! 🎉', color: 'text-green-600 dark:text-green-400' };
    if (daysUntil === 0) return { text: 'Today is your exam! Good luck! 🍀', color: 'text-green-600 dark:text-green-400' };
    if (daysUntil === 1) return { text: '1 day until your exam!', color: 'text-amber-600 dark:text-amber-400' };
    return { text: `${daysUntil} days until your exam`, color: 'text-primary-600 dark:text-primary-400' };
  };

  const message = getCountdownMessage();

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Exam Date</h2>
            <p className="text-xs text-white/80">Set your target exam date</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={examDate || ''}
            onChange={(e) => onSetExamDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="input-field"
          />
        </div>

        {examDate && (
          <div className={`relative overflow-hidden rounded-xl ${
            past 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700' 
              : 'bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 border border-primary-200 dark:border-primary-700'
          } border p-1`}>
            <div className="flex items-center gap-3 p-3">
              {past ? (
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="flex-1">
                <p className={`text-sm font-bold ${message.color}`}>
                  {message.text}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                  Exam: {formatDate(examDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <button
                onClick={onDeleteExamDate}
                className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                title="Delete exam date"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {!examDate && (
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-200">
                  Set your exam date
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  This helps the AI create a personalized study schedule based on your available time.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDateInput;

