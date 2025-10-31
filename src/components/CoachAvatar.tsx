import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";
import coachAvatar from "@/assets/ai-coach-avatar.png";

const motivationalTips = [
  "Great job staying consistent! Remember, small changes lead to big results.",
  "Hydration is key! Don't forget to drink 8 glasses of water today.",
  "You're making excellent progress. Keep up the amazing work!",
  "Consistency beats perfection. You're doing wonderfully!",
  "Remember: Food is fuel. Choose wisely and your body will thank you!",
];

const CoachAvatar = () => {
  const randomTip = motivationalTips[Math.floor(Math.random() * motivationalTips.length)];

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-medium border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-32 w-32 border-4 border-primary shadow-soft">
                <AvatarImage src={coachAvatar} alt="AI Coach" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h3 className="text-2xl font-bold">Your AI Coach Says:</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  "{randomTip}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CoachAvatar;
