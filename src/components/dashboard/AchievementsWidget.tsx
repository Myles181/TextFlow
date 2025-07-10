import React, { useState } from 'react';
import { Trophy, Star, Calendar, Globe, Phone, MessageSquare, Zap, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  progress?: number; // 0-100 for partially completed
  unlockedDate?: Date;
  isNew?: boolean;
}

interface AchievementsWidgetProps {
  achievements: Achievement[];
}

export const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({ achievements }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    if (achievement.isNew) {
      // Trigger celebration animation
      setTimeout(() => {
        setSelectedAchievement(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
          <p className="text-sm text-gray-500 mt-1">Track your progress and unlock badges</p>
        </div>
        <div className="w-8 h-8 bg-energy-50 rounded-lg flex items-center justify-center">
          <Trophy className="w-4 h-4 text-energy-600" />
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-gradient-to-r from-energy-50 to-ocean-50 rounded-xl border border-energy-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-energy-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-energy-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Progress</h4>
              <p className="text-sm text-gray-600">{unlockedCount} of {totalCount} unlocked</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-energy-600">{Math.round(progressPercentage)}%</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-energy-500 to-ocean-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <button
              key={achievement.id}
              onClick={() => handleAchievementClick(achievement)}
              className={`
                group relative p-4 rounded-xl border-2 transition-all duration-300 text-left achievement-badge
                ${achievement.unlocked 
                  ? 'bg-gradient-to-br from-energy-50 to-ocean-50 border-energy-200 hover:border-energy-300 hover:shadow-md' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }
                ${achievement.isNew ? 'new' : ''}
              `}
            >
              {/* New indicator */}
              {achievement.isNew && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${achievement.unlocked 
                    ? 'bg-gradient-to-br from-energy-500 to-ocean-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm mb-1 ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs ${
                    achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  
                                     {/* Progress bar for incomplete achievements */}
                   {!achievement.unlocked && achievement.progress !== undefined && (
                     <div className="mt-2">
                       <div className="w-full bg-gray-200 rounded-full h-1">
                         <div 
                           className="bg-energy-500 h-1 rounded-full transition-all duration-500 progress-animate"
                           style={{ width: `${achievement.progress}%` }}
                         ></div>
                       </div>
                       <p className="text-xs text-gray-400 mt-1">{achievement.progress}% complete</p>
                     </div>
                   )}

                  {/* Unlock date for completed achievements */}
                  {achievement.unlocked && achievement.unlockedDate && (
                    <p className="text-xs text-energy-600 mt-1">
                      Unlocked {achievement.unlockedDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
            </button>
          );
        })}
      </div>

      {/* View all achievements link */}
      <div className="text-center">
        <button className="text-sm text-ocean-600 hover:text-ocean-700 font-medium transition-colors duration-200">
          View all achievements →
        </button>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-backdrop">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 relative modal-enter">
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                ${selectedAchievement.unlocked 
                  ? 'bg-gradient-to-br from-energy-500 to-ocean-500' 
                  : 'bg-gray-200'
                }
              `}>
                <selectedAchievement.icon className={`w-8 h-8 ${
                  selectedAchievement.unlocked ? 'text-white' : 'text-gray-400'
                }`} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedAchievement.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {selectedAchievement.description}
              </p>
              
              {selectedAchievement.unlocked ? (
                <div className="bg-success-50 border border-success-200 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-2 text-success-700">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">Achievement Unlocked!</span>
                  </div>
                  {selectedAchievement.unlockedDate && (
                    <p className="text-sm text-success-600 mt-1">
                      Unlocked on {selectedAchievement.unlockedDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-gray-600 text-sm">
                    Keep using TextFlow to unlock this achievement!
                  </p>
                  {selectedAchievement.progress !== undefined && (
                    <div className="mt-2">
                                               <div className="w-full bg-gray-200 rounded-full h-2">
                           <div 
                             className="bg-energy-500 h-2 rounded-full transition-all duration-500 progress-animate"
                             style={{ width: `${selectedAchievement.progress}%` }}
                           ></div>
                         </div>
                      <p className="text-xs text-gray-500 mt-1">{selectedAchievement.progress}% complete</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 