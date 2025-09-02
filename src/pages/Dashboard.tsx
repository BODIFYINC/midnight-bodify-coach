import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Settings, Utensils, TrendingUp, BookOpen, Dumbbell, Target, Clock, Award, Zap, Heart, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AIChatTab } from '@/components/dashboard/AIChatTab';
import { SettingsTab } from '@/components/dashboard/SettingsTab';
import { MealsTab } from '@/components/dashboard/MealsTab';
import { ProgressTab } from '@/components/dashboard/ProgressTab';
import { RecipesTab } from '@/components/dashboard/RecipesTab';
import { CreativeTab } from '@/components/dashboard/CreativeTab';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('welcome');
  const [userStats, setUserStats] = useState({
    name: 'Abdullah',
    dailyCalories: 2200,
    currentCalories: 1420,
    protein: { current: 78, target: 150 },
    carbs: { current: 145, target: 275 },
    fats: { current: 42, target: 73 },
    streak: 5,
    completedMeals: 2,
    totalMeals: 4
  });

  useEffect(() => {
    // Load user stats from localStorage
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    if (settings.name) {
      setUserStats(prev => ({ ...prev, name: settings.name }));
    }
  }, []);

  const tabs = [
    { id: 'welcome', label: 'Dashboard', icon: Target, component: null },
    { id: 'chat', label: 'AI Coach', icon: MessageSquare, component: AIChatTab },
    { id: 'meals', label: 'Meals', icon: Utensils, component: MealsTab },
    { id: 'progress', label: 'Progress', icon: TrendingUp, component: ProgressTab },
    { id: 'recipes', label: 'Recipes', icon: BookOpen, component: RecipesTab },
    { id: 'creative', label: 'Workouts', icon: Dumbbell, component: CreativeTab },
  ];

  const calculateProgress = (current: number, target: number) => (current / target) * 100;
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Immersive Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 kinetic-typography">
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Bodify Dashboard
            </span>
          </h1>
          <p className="text-white/70 text-lg">Your AI-powered fitness companion</p>
        </motion.div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glassmorphism-card w-full justify-start mb-8 p-2 rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 hover-scale data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-glow"
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Welcome Dashboard */}
          <TabsContent value="welcome" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Personalized Greeting */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <h1 className="text-4xl md:text-6xl font-bold kinetic-typography">
                    <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                      {getGreeting()}, {userStats.name}! 👋
                    </span>
                  </h1>
                  <p className="text-white/70 text-xl">Ready to crush today's goals?</p>
                </motion.div>

                {/* Streak Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="flex justify-center"
                >
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-lg animate-pulse-glow">
                    🔥 {userStats.streak} Day Streak!
                  </Badge>
                </motion.div>
              </div>

              {/* Today's Snapshot */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="glassmorphism-card border border-white/10 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-500/20 to-green-500/20">
                    <CardTitle className="text-white text-center text-2xl">Today's Progress Ring</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Progress Ring */}
                      <div className="relative flex items-center justify-center">
                        <div className="relative w-64 h-64">
                          <svg className="transform -rotate-90 w-64 h-64">
                            <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                            <circle 
                              cx="128" cy="128" r="110" 
                              stroke="url(#gradient)" 
                              strokeWidth="8" 
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 110}`}
                              strokeDashoffset={`${2 * Math.PI * 110 * (1 - calculateProgress(userStats.currentCalories, userStats.dailyCalories) / 100)}`}
                              className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#22d3ee" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white">{Math.round(calculateProgress(userStats.currentCalories, userStats.dailyCalories))}%</span>
                            <span className="text-white/70">Calories</span>
                            <span className="text-white/60 text-sm">{userStats.currentCalories}/{userStats.dailyCalories}</span>
                          </div>
                        </div>
                      </div>

                      {/* Macro Breakdown */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium flex items-center">
                              <Heart className="w-5 h-5 mr-2 text-red-400" />
                              Protein
                            </span>
                            <span className="text-white/70">{userStats.protein.current}g / {userStats.protein.target}g</span>
                          </div>
                          <Progress value={calculateProgress(userStats.protein.current, userStats.protein.target)} className="h-3 bg-white/10" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium flex items-center">
                              <Zap className="w-5 h-5 mr-2 text-blue-400" />
                              Carbs
                            </span>
                            <span className="text-white/70">{userStats.carbs.current}g / {userStats.carbs.target}g</span>
                          </div>
                          <Progress value={calculateProgress(userStats.carbs.current, userStats.carbs.target)} className="h-3 bg-white/10" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium flex items-center">
                              <Star className="w-5 h-5 mr-2 text-yellow-400" />
                              Fats
                            </span>
                            <span className="text-white/70">{userStats.fats.current}g / {userStats.fats.target}g</span>
                          </div>
                          <Progress value={calculateProgress(userStats.fats.current, userStats.fats.target)} className="h-3 bg-white/10" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <AnimatedButton
                  onClick={() => setActiveTab('meals')}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-20 text-lg font-semibold"
                  glowEffect={true}
                >
                  <Utensils className="w-6 h-6 mr-3" />
                  Check Today's Meals 🍽️
                </AnimatedButton>

                <AnimatedButton
                  onClick={() => setActiveTab('creative')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-20 text-lg font-semibold"
                  glowEffect={true}
                >
                  <Dumbbell className="w-6 h-6 mr-3" />
                  Start a Workout 🏋️
                </AnimatedButton>

                <AnimatedButton
                  onClick={() => setActiveTab('chat')}
                  className="bg-gradient-to-r from-pink-500 to-red-500 h-20 text-lg font-semibold"
                  glowEffect={true}
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Chat with Coach 💬
                </AnimatedButton>
              </motion.div>

              {/* Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="glassmorphism-card border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-center flex items-center justify-center">
                      <Award className="w-6 h-6 mr-2 text-yellow-400" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <motion.div 
                        className="text-center p-4 bg-white/5 rounded-xl hover-scale cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-3xl mb-2">🔥</div>
                        <div className="text-white font-semibold">Streak Master</div>
                        <div className="text-white/60 text-sm">5 days strong!</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-white/5 rounded-xl hover-scale cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-3xl mb-2">💪</div>
                        <div className="text-white font-semibold">Protein Pro</div>
                        <div className="text-white/60 text-sm">Hit protein 3x</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-white/5 rounded-xl hover-scale cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-3xl mb-2">🎯</div>
                        <div className="text-white font-semibold">Goal Crusher</div>
                        <div className="text-white/60 text-sm">Perfect day!</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-white/5 rounded-xl hover-scale cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="text-white font-semibold">Early Bird</div>
                        <div className="text-white/60 text-sm">Morning warrior</div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Other Tab Content */}
          {tabs.filter(tab => tab.component).map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <tab.component />
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;