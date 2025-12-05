"use client";

import * as React from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Utensils,
  CheckCircle2,
  Plus,
  Calendar,
  Target,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Types
interface Meal {
  time: string;
  activity: string;
  food: string;
  macros?: string;
}

interface Exercise {
  name: string;
  sets?: string;
  reps?: string;
  notes?: string;
}

interface WorkoutSession {
  time: string;
  type: string;
  exercises: Exercise[];
}

interface DayPlan {
  day: string;
  date: string;
  training: string;
  nutrition: string;
  meals: Meal[];
  workouts: WorkoutSession[];
  supplements: string[];
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  isCompleted: boolean;
}

// Sample Data
const weekPlan: DayPlan[] = [
  {
    day: "Monday",
    date: "2025-01-20",
    training: "AM Cardio / PM Kickboxing",
    nutrition: "High Carb / Hydration",
    meals: [
      { time: "Wake Up", activity: "Fat Loss Stack", food: "Albuterol/Yohimbine + Taurine", macros: "" },
      { time: "AM Cardio", activity: "Zone 2", food: "Sip EAAs", macros: "" },
      { time: "Post-Cardio", activity: "Brain Fuel", food: "80g Oats + Whey + MCT Oil", macros: "~400 cal" },
      { time: "Lunch", activity: "Performance", food: "200g Chicken + 250g Rice + Beets", macros: "~600 cal" },
      { time: "Pre-Workout", activity: "Fuel", food: "1 Banana + 3 Rice Cakes", macros: "~200 cal" },
      { time: "Dinner", activity: "Digestion", food: "200g White Fish + 250g Potatoes + Kimchi", macros: "~500 cal" },
      { time: "Night", activity: "Sleep Anchor", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "AM",
        type: "Zone 2 Cardio",
        exercises: [{ name: "Steady State Cardio", sets: "1", reps: "60 min", notes: "Keep HR in Zone 2" }]
      },
      {
        time: "PM",
        type: "Kickboxing Class",
        exercises: [{ name: "Kickboxing Training", sets: "", reps: "60-90 min", notes: "Focus on technique" }]
      }
    ],
    supplements: ["Beets (Lunch)", "Taurine", "EAAs", "Magnesium"],
    completed: false
  },
  {
    day: "Tuesday",
    date: "2025-01-21",
    training: "Power & Rotation (Push)",
    nutrition: "Moderate Carb / High Protein",
    meals: [
      { time: "Wake Up", activity: "Stim Stack", food: "Albuterol/Yohimbine/Caff + 3g Taurine", macros: "" },
      { time: "Breakfast", activity: "Fuel", food: "100g Oats + Whey + Collagen", macros: "~450 cal" },
      { time: "Lunch", activity: "Performance", food: "200g Chicken + 200g Rice + Veggies", macros: "~550 cal" },
      { time: "Pre-Workout", activity: "Energy", food: "1 Banana + Rice Cakes", macros: "~150 cal" },
      { time: "Dinner", activity: "Recovery", food: "200g Beef + 200g Rice + Spinach", macros: "~600 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "Evening",
        type: "Power & Rotation",
        exercises: [
          { name: "Landmine Power Rotation w/ Bands", sets: "4", reps: "6-8", notes: "Speed focus" },
          { name: "Weighted Dips", sets: "4", reps: "8-10", notes: "Stop at parallel" },
          { name: "Kneeling Single-Arm DB Press", sets: "3", reps: "10-12", notes: "" },
          { name: "Landmine Flys", sets: "3", reps: "12-15", notes: "" },
          { name: "Pallof Press", sets: "3", reps: "10 sec hold/side", notes: "" },
          { name: "Hanging Knee Raises", sets: "3", reps: "15", notes: "Decompress spine" },
          { name: "Weighted Russian Twists", sets: "3", reps: "20 total", notes: "" },
          { name: "Neck Flexion/Extension", sets: "2", reps: "15", notes: "Light weight" },
        ]
      }
    ],
    supplements: ["Collagen (AM)", "Taurine", "Magnesium"],
    completed: false
  },
  {
    day: "Wednesday",
    date: "2025-01-22",
    training: "FULL REST",
    nutrition: "Low Carb / High Fat",
    meals: [
      { time: "Wake Up", activity: "System Flush", food: "Lemon Water + Collagen", macros: "" },
      { time: "Breakfast", activity: "Meat & Nut", food: "170g Steak/Salmon + Avocado + Berries", macros: "~500 cal" },
      { time: "Lunch", activity: "Maintenance", food: "200g Chicken + 150g Rice + Veggies", macros: "~450 cal" },
      { time: "Snack", activity: "Protein", food: "1 Scoop Whey/Beef Protein", macros: "~120 cal" },
      { time: "Dinner", activity: "Health", food: "200g White Fish + Large Salad + Olive Oil", macros: "~400 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [],
    supplements: ["Collagen", "Magnesium (High Dose)", "Dandelion Tea"],
    completed: false
  },
  {
    day: "Thursday",
    date: "2025-01-23",
    training: "AM Lift / PM Kickboxing (DOUBLE DRAGON)",
    nutrition: "SUPER HIGH CARB",
    meals: [
      { time: "Wake Up", activity: "Stim Stack", food: "Albuterol/Yohimbine/Caff + 3g Taurine", macros: "" },
      { time: "7:00 AM", activity: "AM Pre-Lift", food: "1 Banana + 1 Scoop Whey", macros: "~200 cal" },
      { time: "8:30 AM", activity: "Post-Lift (Refuel)", food: "1 Bagel + Jam + 1 Scoop Whey", macros: "~400 cal" },
      { time: "12:30 PM", activity: "Lunch", food: "200g Chicken + 350g Rice + Asparagus", macros: "~700 cal" },
      { time: "4:30 PM", activity: "PM Pre-Fight", food: "80g Oats + Honey + 1/2 Scoop Whey", macros: "~350 cal" },
      { time: "6:30 PM", activity: "KICKBOXING", food: "Sip 25g Cluster Dextrin + Electrolytes", macros: "~100 cal" },
      { time: "8:30 PM", activity: "Dinner", food: "200g White Fish + 300g Potatoes", macros: "~550 cal" },
      { time: "10:00 PM", activity: "Sleep Anchor", food: "1 Tbsp Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "AM (7:30)",
        type: "Athletic Primer",
        exercises: [
          { name: "Push Press", sets: "3", reps: "6", notes: "Explosive drive, RPE 7-8" },
          { name: "Chest-Supported Seal Row", sets: "3", reps: "10", notes: "Save lower back" },
          { name: "Banded KB Swings", sets: "3", reps: "15", notes: "Fast hips" },
          { name: "Explosive Cable Woodchops", sets: "3", reps: "10/side", notes: "" },
          { name: "Face Pulls", sets: "3", reps: "15", notes: "Squeeze rear delts" },
          { name: "Ab Wheel Rollouts", sets: "3", reps: "10", notes: "" },
          { name: "Side Plank Hip Dips", sets: "3", reps: "12/side", notes: "" },
        ]
      },
      {
        time: "PM (6:30)",
        type: "Kickboxing Class",
        exercises: [{ name: "Kickboxing Training", sets: "", reps: "60-90 min", notes: "Sip intra-carbs" }]
      }
    ],
    supplements: ["Taurine (Mandatory)", "Intra-Carbs (Cluster Dextrin)", "Electrolytes"],
    completed: false
  },
  {
    day: "Friday",
    date: "2025-01-24",
    training: "Unilateral / Tendon Focus",
    nutrition: "Moderate Carb",
    meals: [
      { time: "Wake Up", activity: "Stim Stack", food: "Albuterol/Yohimbine + Taurine", macros: "" },
      { time: "Breakfast", activity: "Fuel", food: "80g Oats + Whey + Berries", macros: "~400 cal" },
      { time: "Lunch", activity: "Performance", food: "200g Chicken + 200g Rice + Veggies", macros: "~550 cal" },
      { time: "Pre-Workout", activity: "Energy", food: "1 Banana + Rice Cakes", macros: "~150 cal" },
      { time: "Dinner", activity: "Recovery", food: "200g White Fish + 250g Potatoes", macros: "~500 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "Evening",
        type: "Functional Unilateral",
        exercises: [
          { name: "Bulgarian Split Squats", sets: "3", reps: "8-10", notes: "Deep stretch, 3-sec negative" },
          { name: "Single-Arm Lat Pulldown", sets: "4", reps: "12-15", notes: "Stretch lats, 3-sec negative" },
          { name: "Standing Single-Arm Cable Press", sets: "3", reps: "12-15", notes: "Anti-rotation" },
          { name: "Single-Leg RDL", sets: "3", reps: "10", notes: "Hamstring/Ankle stability" },
          { name: "Suitcase Carries", sets: "3", reps: "40 steps", notes: "Heavy grip" },
          { name: "Reverse Crunches", sets: "3", reps: "15", notes: "" },
          { name: "Copenhagen Planks", sets: "3", reps: "20-30 sec", notes: "Groin health" },
        ]
      }
    ],
    supplements: ["Vitamin C + Collagen (Tendons)", "Taurine", "Magnesium"],
    completed: false
  },
  {
    day: "Saturday",
    date: "2025-01-25",
    training: "Heavy Hypertrophy (Legs)",
    nutrition: "High Carb / Potassium Load",
    meals: [
      { time: "Wake Up", activity: "No Stims", food: "Coffee Only + 4g Taurine", macros: "" },
      { time: "AM Cardio", activity: "Zone 2", food: "Sip Electrolytes", macros: "" },
      { time: "9:30 AM", activity: "Breakfast", food: "100g Oats + 1 Banana + Whey + Collagen", macros: "~500 cal" },
      { time: "12:30 PM", activity: "Lunch", food: "200g Beef + 300g Rice + Spinach", macros: "~700 cal" },
      { time: "Pre-Workout", activity: "Pump Fuel", food: "3 Rice Cakes + Honey + Pink Salt", macros: "~200 cal" },
      { time: "Post-Workout", activity: "Immediate", food: "1 Scoop Whey + 1 MadeGood Bar", macros: "~250 cal" },
      { time: "Dinner", activity: "Recovery", food: "250g Salmon + Sweet Potato", macros: "~600 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "Afternoon",
        type: "Heavy Hypertrophy",
        exercises: [
          { name: "Barbell Squats", sets: "4", reps: "6-8", notes: "Heavy - Wear belt. If back pumps, swap to Leg Press" },
          { name: "Incline DB Press", sets: "4", reps: "8-10", notes: "Upper Chest" },
          { name: "Lying Leg Curls", sets: "4", reps: "12-15", notes: "Hamstrings" },
          { name: "Gorilla Rows", sets: "3", reps: "12-16 total", notes: "" },
          { name: "DB Lateral Raises", sets: "4", reps: "15-20", notes: "Side Delts" },
          { name: "Arm Superset (Bi/Tri)", sets: "3", reps: "Failure", notes: "" },
          { name: "Weighted Cable Rope Crunches", sets: "4", reps: "15", notes: "Heavy" },
          { name: "Lying Leg Flutters", sets: "3", reps: "45 sec", notes: "" },
          { name: "Neck Side Lateral Isometrics", sets: "2", reps: "15 sec/side", notes: "" },
        ]
      }
    ],
    supplements: ["Taurine (4g)", "Collagen (Knee health)", "Potassium Load", "Omega 3s"],
    completed: false
  },
  {
    day: "Sunday",
    date: "2025-01-26",
    training: "FULL REST",
    nutrition: "Detox / Digestion",
    meals: [
      { time: "Wake Up", activity: "System Flush", food: "Lemon Water + Collagen", macros: "" },
      { time: "Breakfast", activity: "Meat & Nut", food: "170g Steak/Salmon + Avocado + Berries", macros: "~500 cal" },
      { time: "Lunch", activity: "Maintenance", food: "200g Chicken + 150g Rice + Veggies", macros: "~450 cal" },
      { time: "Snack", activity: "Protein", food: "1 Scoop Whey/Beef Protein", macros: "~120 cal" },
      { time: "Dinner", activity: "Health", food: "200g White Fish + Large Salad + Olive Oil", macros: "~400 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [],
    supplements: ["Collagen", "Dandelion Tea", "No Stimulants"],
    completed: false
  }
];

// Main Component
export function WorkoutDietTracker() {
  // Get the current day index based on today's day
  const getCurrentDayIndex = () => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    // Map Sunday (0) to index 6, Monday (1) to index 0, etc.
    return today === 0 ? 6 : today - 1;
  };

  const [currentDayIndex, setCurrentDayIndex] = React.useState(getCurrentDayIndex());
  const [goals, setGoals] = React.useState<Goal[]>([
    { id: "1", title: "Complete all meals on time", isCompleted: false },
    { id: "2", title: "Finish workout session", isCompleted: false },
    { id: "3", title: "Take all supplements", isCompleted: false },
    { id: "4", title: "Drink 3L water", isCompleted: false },
  ]);
  const [expandedMeals, setExpandedMeals] = React.useState(true);
  const [expandedWorkouts, setExpandedWorkouts] = React.useState(true);

  const currentDay = weekPlan[currentDayIndex];

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : weekPlan.length - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < weekPlan.length - 1 ? prev + 1 : 0));
  };

  const handleToggleGoal = (goalId: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, isCompleted: !goal.isCompleted } : goal
      )
    );
  };

  const handleAddGoal = () => {
    const newGoal: Goal = {
      id: `goal-${goals.length + 1}`,
      title: `New Goal ${goals.length + 1}`,
      isCompleted: false,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const completedGoals = goals.filter((g) => g.isCompleted).length;
  const progressPercentage = (completedGoals / goals.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Day Navigation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between gap-4 bg-card border rounded-2xl p-4 shadow-lg"
        >
          <Button variant="ghost" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold">{currentDay.day}</h2>
            <p className="text-sm text-muted-foreground">{currentDay.date}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextDay}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 space-y-2 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Training</h3>
              </div>
              <p className="text-sm text-muted-foreground">{currentDay.training}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 space-y-2 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Nutrition</h3>
              </div>
              <p className="text-sm text-muted-foreground">{currentDay.nutrition}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 space-y-2 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Progress</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Goals</span>
                  <span className="font-medium">{completedGoals}/{goals.length}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Meals & Workouts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meals Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 space-y-4">
                <button
                  onClick={() => setExpandedMeals(!expandedMeals)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Utensils className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Daily Meals</h3>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-5 h-5 transition-transform",
                      expandedMeals && "rotate-90"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {expandedMeals && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3"
                    >
                      {currentDay.meals.map((meal, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{meal.time}</span>
                                <Badge variant="outline" className="text-xs">
                                  {meal.activity}
                                </Badge>
                              </div>
                              <p className="text-sm">{meal.food}</p>
                              {meal.macros && (
                                <p className="text-xs text-muted-foreground">{meal.macros}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Workouts Section */}
            {currentDay.workouts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-6 space-y-4">
                  <button
                    onClick={() => setExpandedWorkouts(!expandedWorkouts)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Dumbbell className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Workouts</h3>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 transition-transform",
                        expandedWorkouts && "rotate-90"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedWorkouts && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4"
                      >
                        {currentDay.workouts.map((workout, wIndex) => (
                          <div key={wIndex} className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-primary/20 text-primary">
                                {workout.time}
                              </Badge>
                              <span className="font-medium">{workout.type}</span>
                            </div>
                            <div className="space-y-2">
                              {workout.exercises.map((exercise, eIndex) => (
                                <motion.div
                                  key={eIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: eIndex * 0.05 }}
                                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{exercise.name}</p>
                                      {(exercise.sets || exercise.reps) && (
                                        <p className="text-xs text-muted-foreground">
                                          {exercise.sets && `${exercise.sets} sets`}
                                          {exercise.sets && exercise.reps && " × "}
                                          {exercise.reps && `${exercise.reps} reps`}
                                        </p>
                                      )}
                                      {exercise.notes && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {exercise.notes}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column - Goals & Supplements */}
          <div className="space-y-6">
            {/* Daily Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Daily Goals</h3>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleAddGoal}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {goals.map((goal, index) => (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleToggleGoal(goal.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl",
                        "bg-muted/50 hover:bg-muted",
                        "border border-border/50 hover:border-border",
                        "transition-all"
                      )}
                    >
                      <Checkbox checked={goal.isCompleted} />
                      <span
                        className={cn(
                          "text-sm text-left flex-1",
                          goal.isCompleted && "line-through text-muted-foreground"
                        )}
                      >
                        {goal.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Supplements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Flame className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Supplements</h3>
                </div>

                <div className="space-y-2">
                  {currentDay.supplements.map((supplement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{supplement}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Week Overview</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {weekPlan.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDayIndex(index)}
                      className={cn(
                        "p-3 rounded-lg text-left transition-all",
                        index === currentDayIndex
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <p className="text-xs font-medium">{day.day}</p>
                      <p className="text-xs opacity-80">{day.training.split(" ")[0]}</p>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Demo() {
  return <WorkoutDietTracker />;
}