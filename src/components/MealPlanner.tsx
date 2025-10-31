import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

const MealPlanner = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activity: "moderate",
    goal: "maintain",
  });
  const [plan, setPlan] = useState<string | null>(null);

  const calculatePlan = () => {
    const calories = formData.goal === "lose" ? "1800" : formData.goal === "gain" ? "2400" : "2000";
    
    const mealPlan = `
Based on your profile:
• Age: ${formData.age} years
• Weight: ${formData.weight} kg
• Activity: ${formData.activity}
• Goal: ${formData.goal} weight

**Daily Target: ${calories} calories**

**Recommended Meals:**

🌅 Breakfast (400 cal):
- Oatmeal with berries and almonds
- Greek yogurt
- Green tea

🌞 Lunch (600 cal):
- Grilled chicken salad
- Quinoa
- Olive oil dressing

🌙 Dinner (700 cal):
- Salmon with vegetables
- Brown rice
- Side salad

🍎 Snacks (300 cal):
- Mixed nuts
- Fresh fruits
- Protein shake
    `.trim();

    setPlan(mealPlan);
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-2">Personalized Meal Plan</h2>
            <p className="text-muted-foreground">Get a custom nutrition plan based on your goals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="Enter your weight"
                  />
                </div>

                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="Enter your height"
                  />
                </div>

                <div>
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select value={formData.activity} onValueChange={(value) => setFormData({ ...formData, activity: value })}>
                    <SelectTrigger id="activity">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very-active">Very Active (intense daily exercise)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="goal">Goal</Label>
                  <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                    <SelectTrigger id="goal">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Muscle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full bg-gradient-healthy hover:opacity-90"
                  onClick={calculatePlan}
                >
                  Generate Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Your Personalized Plan</CardTitle>
              </CardHeader>
              <CardContent>
                {plan ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {plan}
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center text-muted-foreground p-8">
                    <p>Fill in your information and click "Generate Plan" to see your personalized meal plan</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlanner;
