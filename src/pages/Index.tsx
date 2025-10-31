import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import AIChat from "@/components/AIChat";
import MealPlanner from "@/components/MealPlanner";
import RecipeLibrary from "@/components/RecipeLibrary";
import CoachAvatar from "@/components/CoachAvatar";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleGetStarted = () => {
    setCurrentSection("dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={handleNavigate} />
      
      {currentSection === "home" && (
        <>
          <Hero onGetStarted={handleGetStarted} />
          <CoachAvatar />
          <Dashboard />
        </>
      )}
      
      {currentSection === "dashboard" && <Dashboard />}
      
      {currentSection === "chat" && <AIChat />}
      
      {currentSection === "plans" && <MealPlanner />}
      
      {currentSection === "recipes" && <RecipeLibrary />}
      
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 My AI Diet Coach. Your personal nutrition companion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
