import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame } from "lucide-react";
import breakfastImg from "@/assets/recipe-breakfast.jpg";
import lunchImg from "@/assets/recipe-lunch.jpg";
import dinnerImg from "@/assets/recipe-dinner.jpg";
import snackImg from "@/assets/recipe-snack.jpg";

const recipes = [
  {
    id: 1,
    title: "Berry Granola Bowl",
    category: "Breakfast",
    calories: 380,
    time: "10 min",
    image: breakfastImg,
  },
  {
    id: 2,
    title: "Mediterranean Chicken Salad",
    category: "Lunch",
    calories: 520,
    time: "25 min",
    image: lunchImg,
  },
  {
    id: 3,
    title: "Grilled Salmon & Quinoa",
    category: "Dinner",
    calories: 650,
    time: "35 min",
    image: dinnerImg,
  },
  {
    id: 4,
    title: "Tropical Smoothie Bowl",
    category: "Snack",
    calories: 280,
    time: "5 min",
    image: snackImg,
  },
];

const RecipeLibrary = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Recipe Library</h2>
          <p className="text-muted-foreground">Discover delicious and healthy meal ideas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="overflow-hidden shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-primary">
                  {recipe.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-accent" />
                    <span>{recipe.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeLibrary;
