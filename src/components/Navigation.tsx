import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Apple } from "lucide-react";

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", section: "home" },
    { label: "Dashboard", section: "dashboard" },
    { label: "AI Coach", section: "chat" },
    { label: "Meal Plans", section: "plans" },
    { label: "Recipes", section: "recipes" },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate("home")}>
            <div className="h-10 w-10 rounded-full bg-gradient-healthy flex items-center justify-center">
              <Apple className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">AI Diet Coach</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                onClick={() => handleNavigate(item.section)}
                className="hover:bg-secondary"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.section}
                  variant="ghost"
                  onClick={() => handleNavigate(item.section)}
                  className="justify-start hover:bg-secondary"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
