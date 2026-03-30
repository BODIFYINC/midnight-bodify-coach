import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calculator, Target, Save, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { AccurateNutritionTracker, UserProfile } from '@/services/accurateNutritionTracker';

interface UserSettings {
  name: string;
  email: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  daysPerWeek: number;
  dislikedFoods: string;
  allergies: string;
  dietaryRestrictions: string;
  bodyFat?: number;
}

export const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    age: 25,
    height: 175,
    weight: 70,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'weight_loss',
    fitnessLevel: 'intermediate',
    daysPerWeek: 4,
    dislikedFoods: '',
    allergies: '',
    dietaryRestrictions: '',
    bodyFat: undefined
  });

  const [calculatedTargets, setCalculatedTargets] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    calculateTargets();
  }, []);

  const calculateTargets = () => {
    try {
      const profile: UserProfile = {
        weight: settings.weight,
        height: settings.height,
        age: settings.age,
        gender: settings.gender,
        activityLevel: settings.activityLevel,
        goal: settings.goal,
        bodyFat: settings.bodyFat
      };

      const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);
      setCalculatedTargets(targets);
    } catch (error) {
      console.error('Error calculating targets:', error);
    }
  };

  useEffect(() => {
    calculateTargets();
  }, [settings.weight, settings.height, settings.age, settings.gender, settings.activityLevel, settings.goal, settings.bodyFat]);

  const handleInputChange = (field: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));

      // Build and save userPreferences for downstream features
      const profile: UserProfile = {
        weight: settings.weight,
        height: settings.height,
        age: settings.age,
        gender: settings.gender,
        activityLevel: settings.activityLevel,
        goal: settings.goal,
        bodyFat: settings.bodyFat
      };
      const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);
      const dislikedFoodsArr = settings.dislikedFoods
        .split(',')
        .map(f => f.trim().toLowerCase())
        .filter(Boolean);
      const allergiesArr = settings.allergies
        .split(',')
        .map(a => a.trim().toLowerCase())
        .filter(Boolean);
      const restrictionsArr = settings.dietaryRestrictions
        .split(',')
        .map(d => d.trim().toLowerCase())
        .filter(Boolean);

      const userPrefs = {
        goal: settings.goal,
        daysPerWeek: settings.daysPerWeek,
        fitnessLevel: settings.fitnessLevel,
        dislikedFoods: dislikedFoodsArr,
        allergies: allergiesArr,
        dietaryRestrictions: restrictionsArr,
        weight: settings.weight,
        height: settings.height,
        age: settings.age,
        activityLevel: settings.activityLevel,
        targetCalories: targets.calories,
        targetProtein: targets.protein,
        targetCarbs: targets.carbs,
        targetFat: targets.fat,
      };
      localStorage.setItem('userPreferences', JSON.stringify(userPrefs));

      // Try to persist to Supabase profile if authenticated
      try {
        const { data: authData } = await supabase.auth.getUser();
        const user = authData?.user;
        if (user) {
          const activityMap: Record<string, string> = {
            sedentary: 'sedentary',
            light: 'lightly_active',
            moderate: 'moderately_active',
            active: 'very_active',
            very_active: 'extremely_active'
          };
          const goalMap: Record<string, string> = {
            muscle_gain: 'build_muscle',
            weight_loss: 'lose_weight',
            maintenance: 'maintenance'
          };
          const { error: upsertError } = await (supabase as any)
            .from('profiles')
            .upsert({
              user_id: user.id,
              email: settings.email || user.email,
              name: settings.name,
              age: settings.age,
              height_cm: settings.height,
              weight_kg: settings.weight,
              gender: settings.gender,
              activity_level: activityMap[settings.activityLevel] || 'moderately_active',
              goal: goalMap[settings.goal] || 'maintenance',
              dietary_restrictions: restrictionsArr,
              disliked_foods: dislikedFoodsArr,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' });
          if (upsertError) {
            console.warn('Profile sync failed (non-blocking):', upsertError.message);
          }
        }
      } catch (e) {
        console.warn('Auth/profile update skipped:', (e as Error).message);
      }

      // Notify app to refresh plans based on new prefs
      window.dispatchEvent(new CustomEvent('userPreferencesUpdated', { detail: { settings, preferences: userPrefs } }));

      toast({
        title: "Settings saved! ✅",
        description: "Your profile and targets were updated."
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "Please try again in a moment."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (Desk job, no exercise)' },
    { value: 'light', label: 'Light (Light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (Exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (Heavy exercise 6-7 days/week)' },
    { value: 'very_active', label: 'Very Active (Physical job + exercise)' }
  ];

  const goals = [
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3+ years)' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
          Personal Settings
        </h2>
        <p className="text-white/70">Customize your profile for personalized nutrition and training</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="glassmorphism-card border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <User className="w-5 h-5 mr-2 text-emerald-400" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">Full Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email (Locked)</Label>
              <Input
                id="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/5 border-white/10 text-white/50"
                placeholder="your@email.com"
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-white/80">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={settings.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white/80">Gender</Label>
                <Select
                  value={settings.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-white/80">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={settings.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-white/80">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={settings.weight}
                  onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyFat" className="text-white/80">Body Fat % (Optional)</Label>
              <Input
                id="bodyFat"
                type="number"
                value={settings.bodyFat || ''}
                onChange={(e) => handleInputChange('bodyFat', e.target.value ? parseInt(e.target.value) : undefined)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter if known"
              />
            </div>
          </CardContent>
        </Card>

        {/* Fitness Goals */}
        <Card className="glassmorphism-card border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Target className="w-5 h-5 mr-2 text-emerald-400" />
              Fitness Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal" className="text-white/80">Primary Goal</Label>
              <Select
                value={settings.goal}
                onValueChange={(value) => handleInputChange('goal', value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {goals.map(goal => (
                    <SelectItem key={goal.value} value={goal.value}>
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel" className="text-white/80">Activity Level</Label>
              <Select
                value={settings.activityLevel}
                onValueChange={(value) => handleInputChange('activityLevel', value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fitnessLevel" className="text-white/80">Fitness Level</Label>
              <Select
                value={settings.fitnessLevel}
                onValueChange={(value) => handleInputChange('fitnessLevel', value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fitnessLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="daysPerWeek" className="text-white/80">Workout Days/Week</Label>
              <Input
                id="daysPerWeek"
                type="number"
                min="1"
                max="7"
                value={settings.daysPerWeek}
                onChange={(e) => handleInputChange('daysPerWeek', parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dislikedFoods" className="text-white/80">Foods You Hate</Label>
              <Textarea
                id="dislikedFoods"
                value={settings.dislikedFoods}
                onChange={(e) => handleInputChange('dislikedFoods', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="e.g., broccoli, spinach, fish..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies" className="text-white/80">Allergies</Label>
              <Textarea
                id="allergies"
                value={settings.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="e.g., nuts, dairy, shellfish..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions" className="text-white/80">Dietary Restrictions</Label>
              <Textarea
                id="dietaryRestrictions"
                value={settings.dietaryRestrictions}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="e.g., vegetarian, vegan, keto..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Calculated Targets */}
        <Card className="glassmorphism-card border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Calculator className="w-5 h-5 mr-2 text-emerald-400" />
              Calculated Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {calculatedTargets ? (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-white/80">Daily Calories</span>
                    <Badge className="bg-emerald-500">
                      {calculatedTargets.calories} kcal
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <span className="text-white/80">Protein</span>
                    <Badge className="bg-green-500">
                      {calculatedTargets.protein}g
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <span className="text-white/80">Carbohydrates</span>
                    <Badge className="bg-blue-500">
                      {calculatedTargets.carbs}g
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <span className="text-white/80">Fats</span>
                    <Badge className="bg-yellow-500">
                      {calculatedTargets.fat}g
                    </Badge>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Macro Distribution</h4>
                  <div className="space-y-2 text-sm text-white/70">
                    <p>• Protein: {Math.round((calculatedTargets.protein * 4 / calculatedTargets.calories) * 100)}%</p>
                    <p>• Carbs: {Math.round((calculatedTargets.carbs * 4 / calculatedTargets.calories) * 100)}%</p>
                    <p>• Fats: {Math.round((calculatedTargets.fat * 9 / calculatedTargets.calories) * 100)}%</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 text-white/50 animate-spin" />
                <p className="text-white/70">Calculating targets...</p>
              </div>
            )}

            <AnimatedButton
              onClick={handleSave}
              loading={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
              glowEffect={true}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </AnimatedButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};