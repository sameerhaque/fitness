"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Utensils,
  Calendar,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

// Sample Data
const weekPlan: DayPlan[] = [
  {
    day: "MONDAY",
    date: "2025-01-20",
    training: "Zone 2 Cardio + Sauna",
    nutrition: "High Carb / Hydration",
    meals: [
      { time: "Pre-Cardio", activity: "pre-cardio", food: "Powder fat burner", macros: "0 cal" },
      { time: "Post-Cardio", activity: "Brain Fuel", food: "80g Oats + Egg or Beef Protein Powder + Berries", macros: "~400 cal" },
      { time: "Lunch", activity: "Performance", food: "200g Chicken + 180g Rice + Veg", macros: "~500 cal" },
      { time: "Afternoon", activity: "Fuel", food: "Beef Protein Shake 25-30g", macros: "~200 cal" },
      { time: "Dinner", activity: "Digestion", food: "180-220g White Fish + 120-150g Potatoes + Vegetables", macros: "~500 cal" },
      { time: "Night", activity: "Sleep Anchor", food: "Almond Butter + Magnesium", macros: "~150 cal" },
    ],
    workouts: [
      {
        time: "AM",
        type: "Zone 2 Run (Stationary Bike) + Sauna",
        exercises: [{ name: "Stationary Bike", sets: "1", reps: "40-45 mins", notes: "Keep it easy" }]
      }
    ],
    supplements: ["Fat Burner (Pre-Cardio)", "Collagen (Post-Cardio)", "Taurine", "Magnesium"],
    completed: false
  },
  {
    day: "TUESDAY",
    date: "2025-01-21",
    training: "Power & Rotation (Push)",
    nutrition: "Moderate Carb / High Protein",
    meals: [ 
      { time: "Pre-Cardio", activity: "pre-cardio", food: "Powder fat burner", macros: "0 cal" },
      { time: "Post-Cardio", activity: "Brain Fuel", food: "80g Oats + Egg or Beef Protein Powder + Berries", macros: "~400 cal" },
      { time: "Lunch", activity: "Performance", food: "200g Chicken + 200g Rice + Veg", macros: "~550 cal" },
      { time: "Pre-Workout Meal", activity: "Performance", food: "40g Beef Protein, 2-3 Rice Cakes + honey", macros: "~250 cal" },
      { time: "Post-Workout Meal", activity: "Performance", food: "45g Beef Protein + 2 rice bars", macros: "~250 cal" },
      { time: "Dinner", activity: "Recovery", food: "200g Lean Beef or White Fish + 250–300g Potatoes or Rice + Veg", macros: "~550 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "AM",
        type: "Zone 2 Run (Stationary Bike)",
        exercises: [
          { name: "Stationary Bike", sets: "1", reps: "40 min", notes: "Zone 2 pace" }
        ]
      }, 
      {
        time: "PM",
        type: "Power & Rotation",
        exercises: [{ name: "Power & Rotation", sets: "", reps: "60-90 min", notes: "" }]
      }
    ],
    supplements: ["Collagen (AM)", "Taurine", "Magnesium"],
    completed: false
  },
  {
    day: "WEDNESDAY",
    date: "2025-01-22",
    training: "No Zone 2 / Flow and speed",
    nutrition: "support recovery, joint health, and CNS freshness",
    meals: [
      { time: "Wake Up", activity: "System Flush", food: "Lemon Water + Collagen"},
      { time: "Breakfast", activity: "Nervous System Support", food: "60-70g Oats + Egg Protein + Berries", macros: "~350 cal" },
      { time: "Lunch", activity: "Performance / Recovery", food: "200g Lean Beef or Chicken + 150g Rice + Veggies", macros: "~450 cal" },
      { time: "Pre-Workout", activity: "Energy", food: "2 Rice Cakes + honey", macros: "~120 cal" },
      { time: "Dinner", activity: "Health", food: "200g White Fish or Lean Beef + 200-220g Potatoes + Vegetables", macros: "~450 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "PM",
        type: "Flow and speed",
        exercises: [
          { name: "Flow and speed", sets: "", reps: "", notes: "" }
        ]
      }
    ],
    supplements: ["Collagen", "Magnesium (High Dose)", "Dandelion Tea"],
    completed: false
  },
  {
    day: "THURSDAY",
    date: "2025-01-23",
    training: "AM Cardio only",
    nutrition: "fat loss + leg freshness",
    meals: [
      { time: "Pre-Cardio", activity: "pre-cardio", food: "Powder fat burner", macros: "0 cal" },
      { time: "Breakfast", activity: "Fuel", food: "70-80g Oats + Protein Powder + Berries", macros: "~420 cal" },
      { time: "Lunch", activity: "Recovery / Satiety", food: "200g Chicken + 160g Rice + 200g Beets", macros: "~520 cal" },
      { time: "Snack", activity: "Protein / Digestion-Friendly", food: "Protein Shake (30-40g protein) + 1-2 Rice Cakes or Berries", macros: "~220 cal" },
      { time: "Dinner", activity: "Recovery / Anti-Inflammatory", food: "200g White Fish + 220-250g Potatoes + Vegetables", macros: "~450 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "AM",
        type: "Zone 2 Cardio (Incline Treadmill Walk)",
        exercises: [
          { name: "Dynamic Stretching", sets: "1", reps: "10 min", notes: "Full body mobility work" },
          { name: "Zone 2 Cardio", sets: "1", reps: "45 min", notes: "Incline Treadmill Walk" },
          { name: "Hip Flexor Stretches", sets: "3", reps: "30 sec/side", notes: "Open hips for kicks" },
          { name: "Foam Rolling", sets: "1", reps: "5 min", notes: "Focus on shins, calves, IT band" },
        ]
      }
    ],
    supplements: ["Collagen (Pre-cardio)", "Taurine 6g total", "Beets 200g", "Potassium", "Magnesium 500mg",],
    completed: false
  },
  {
    day: "FRIDAY",
    date: "2025-01-24",
    training: "Fasted AM Zone 2 | PM Unilateral Lift",
    nutrition: "Moderate Carb",
    meals: [
      { time: "Pre-Cardio", activity: "pre-cardio", food: "Powder fat burner", macros: "0 cal" },
      { time: "Breakfast", activity: "Fuel", food: "80g Oats + Egg or Beef Protein Powder + Berries", macros: "~400 cal" },
      { time: "Lunch", activity: "Performance", food: "200g Chicken + 200g Rice + Veggies", macros: "~550 cal" },
      { time: "Pre-Workout", activity: "Energy", food: "30-40g Beef Protein + 2 Rice Cakes + honey", macros: "~150 cal" },
      { time: "Post-Workout", activity: "Recovery", food: "30-40g Beef Protein + 2 crispy square", macros: "~400 cal" },
      { time: "Dinner", activity: "Recovery", food: "200g Lean Beef or White Fish + 250-300g Potatoes or Rice + Veg", macros: "~500 cal" },
      { time: "Night", activity: "Sleep", food: "Almond Butter + Magnesium", macros: "" },
    ],
    workouts: [
      {
        time: "AM",
        type: "Stationary Bike",
        exercises: [
          { name: "Stationary Bike", sets: "1", reps: "30-45 min", notes: "Harder intensity, 130 bpm" }
        ]
      },
      {
        time: "Evening",
        type: "Functional Unilateral - Leg Prep",
        exercises: [
          { name: "Bulgarian Split Squats", sets: "3", reps: "8-10", notes: "Deep stretch, 3-sec negative" },
        ]
      }
    ],
    supplements: ["Vitamin C + Collagen (Tendons)", "Taurine", "Magnesium"],
    completed: false
  },
  {
    day: "SATURDAY",
    date: "2025-01-25",
    training: "Heavy Legs (Hypertrophy)",
    nutrition: "PM Heavy Hypertrophy Lift",
    meals: [
      { time: "Wake Up", activity: "Peptides", food: "Wait 30 mins", macros: "" },
      { time: "Breakfast", activity: "Foundation", food: "90g oats + Beef Protein + Berries", macros: "~500 cal" },
      { time: "Lunch", activity: "Performance Anchor", food: "200g Lean Beef or Chicken + 250-300g Cooked Rice + Veg", macros: "~700 cal" },
      { time: "Pre-Workout", activity: "Energy", food: "30-40g Beef Protein + 2 Rice Cakes + honey", macros: "~150 cal" },      
      { time: "Post-Workout", activity: "Recovery", food: "30-40g Beef Protein + 2 crispy square", macros: "~400 cal" },
      { time: "Dinner", activity: "Mineral Restore", food: "200g White Fish or Lean Beef + 250-300g Potatoes or Rice + Spinach", macros: "~700 cal" },
      { time: "Bedtime", activity: "Sleep Stack", food: "20g Walnuts + Magnesium 500mg + Vit C 1000mg", macros: "~130 cal" },
    ],
    workouts: [
      {        
        time: "AM",
        type: "Stationary Bike",
        exercises: [{ name: "Stationary Bike", sets: "", reps: "", notes: "" }]
      },
      {
        time: "Afternoon",
        type: "Heavy Legs (Hypertrophy)",
        exercises: [
          { name: "Front Squats", sets: "4", reps: "6-8", notes: "Heavy, control eccentric. Wear belt" },
        ]
      }
    ],
    supplements: ["Magnesium 500mg", "Electrolytes"],
    completed: false
  },
  {
    day: "SUNDAY",
    date: "2025-01-26",
    training: "FULL REST 8-10k casual walk only",
    nutrition: "Detox / Digestion",
    meals: [
      { time: "Wake Up", activity: "System Flush", food: "Lemon Water + Collagen", macros: "" },
      { time: "Breakfast", activity: "Calm Fuel", food: "60-70g Oats + Egg Protein Powder + Berries", macros: "~500 cal" },
      { time: "Lunch", activity: "Recovery", food: "200g Lean Beef or Chicken + 150-170g Cooked Rice or Potatoes + Veggies", macros: "~450 cal" },
      { time: "Snack", activity: "Protein", food: "1 Scoop Whey/Beef Protein + 1 Rice Cake", macros: "~120 cal" },
      { time: "Dinner", activity: "Health", food: "200g White Fish + 200-220g Potatoes + Veg", macros: "~400 cal" },
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
  const [expandedMeals, setExpandedMeals] = React.useState(true);
  const [expandedWorkouts, setExpandedWorkouts] = React.useState(true);

  const currentDay = weekPlan[currentDayIndex];

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : weekPlan.length - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < weekPlan.length - 1 ? prev + 1 : 0));
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Right Column - Supplements & Week Overview */}
          <div className="space-y-6">
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