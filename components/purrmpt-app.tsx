"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Text, Brain, Wand2, User, Palette, Clipboard, Send, Share2, Sparkles, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "@/components/sparkle";

const SPARKLE_COLORS = ["#A78BFA", "#6EE7B7", "#FBBF24", "#c28af9", "#70e6b7"];

type SparkleData = {
  left: number;
  top: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function AnimatedSparkleGroup({ count = 12 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    // Only generate sparkles on the client to avoid hydration mismatch
    const generated: SparkleData[] = Array.from({ length: count }).map((_, i) => ({
      size: randomBetween(12, 24),
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
      left: randomBetween(5, 95), // percent
      top: randomBetween(5, 60), // percent
      duration: randomBetween(2.5, 5),
      delay: randomBetween(0, 2),
    }));
    setSparkles(generated);
  }, [count]);

  // Don't render sparkles until after mount
  if (sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            pointerEvents: "none",
            opacity: 0.5,
          }}
          initial={{ y: 0, opacity: 0.3 }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            repeatType: "loop",
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkle color={sparkle.color} size={sparkle.size} />
        </motion.div>
      ))}
    </div>
  );
}

const ROLE_OPTIONS = {
  text: [
    { label: "Default", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Copywriter", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Novelist", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Academic Researcher", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "SEO Specialist", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Customer Support Agent", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Philosopher", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Educator", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
  image: [
    { label: "Default", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Concept Artist", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Graphic Designer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Photographer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Fantasy Illustrator", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "UI/UX Designer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Fashion Designer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Architect", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
  code: [
    { label: "Default", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Software Engineer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Data Scientist", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Frontend Developer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "DevOps Engineer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Security Analyst", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Technical Writer", icon: <User className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
};

const STYLE_OPTIONS = {
  text: [
    { label: "Default", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Formal", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Conversational", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Persuasive", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Informative", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Humorous", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Narrative", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Inspirational", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
  image: [
    { label: "Default", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Dreamy", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Cinematic", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Cyberpunk", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Watercolor", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Gritty", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Futuristic", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Surreal", icon: <Palette className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
  code: [
    { label: "Default", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Concise", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Beginner-Friendly", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Expert-Level", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Verbose with Comments", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Optimized", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Secure", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
};

const DEFAULT_OPTIONS = {
  text: { role: "Default", style: "Default", length: 300, creativity: 0.6 },
  image: { role: "Default", style: "Default", length: 300, creativity: 0.6 },
  code: { role: "Default", style: "Default", length: 300, creativity: 0.6 },
};

function getRoleTooltip(label: string): string {
  const tooltips: Record<string, string> = {
    "Copywriter": "Crafts persuasive, engaging copy for marketing or branding.",
    "Novelist": "Writes compelling stories and narratives.",
    "Academic Researcher": "Conducts in-depth research and produces scholarly content.",
    "SEO Specialist": "Optimizes content for search engines to improve visibility.",
    "Customer Support Agent": "Provides helpful responses to customer inquiries.",
    "Philosopher": "Explores abstract ideas and deep questions.",
    "Educator": "Creates educational content for teaching and learning.",
    "Concept Artist": "Designs creative visual concepts for projects.",
    "Graphic Designer": "Creates visually appealing designs for branding or media.",
    "Photographer": "Captures stunning images for various purposes.",
    "Fantasy Illustrator": "Creates imaginative and fantastical illustrations.",
    "UI/UX Designer": "Designs user-friendly and visually appealing interfaces.",
    "Fashion Designer": "Creates stylish and innovative clothing designs.",
    "Architect": "Designs functional and aesthetic building structures.",
    "Software Engineer": "Develops efficient and scalable software solutions.",
    "Data Scientist": "Analyzes data to extract insights and build models.",
    "Frontend Developer": "Builds interactive and responsive user interfaces.",
    "DevOps Engineer": "Manages infrastructure and deployment pipelines.",
    "Security Analyst": "Ensures systems and data are secure from threats.",
    "Technical Writer": "Produces clear and concise technical documentation.",
  };

  return tooltips[label] || "No description available.";
}

const CopyButton = ({ generatedPrompt }: { generatedPrompt: string }) => {
  const [copied, setCopied] = useState(false);
  const [emojis, setEmojis] = useState<string[]>([]);

  const handleCopy = () => {
    if (!generatedPrompt) return;

    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);

    // Generate random emojis
    const emojiPool = ["🐱", "😺", "😻", "🐾", "✨", "😹", "💫"];
    const randomEmojis = Array.from({ length: 2 }, () =>
      emojiPool[Math.floor(Math.random() * emojiPool.length)]
    );
    setEmojis(randomEmojis);

    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        className="inline-flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
        onClick={handleCopy}
      >
        <Clipboard className="w-4 h-4" />
        {copied ? "Copied!" : "Copy"}
      </Button>
      <AnimatePresence>
        {copied &&
          emojis.map((emoji, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{
                opacity: 0,
                y: -50 - Math.random() * 30,
                x: (Math.random() - 0.5) * 60,
                scale: 1.5,
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute text-2xl pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {emoji}
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default function PurrmptApp() {
  const [promptType, setPromptType] = useState<keyof typeof ROLE_OPTIONS>("text");
  const [idea, setIdea] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(DEFAULT_OPTIONS.text.role);
  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_OPTIONS.text.style);
  const [length, setLength] = useState(DEFAULT_OPTIONS.text.length);
  const [creativity, setCreativity] = useState(DEFAULT_OPTIONS.text.creativity);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!theme) setTheme("light"); // Default to light theme
  }, [theme, setTheme]);

  useEffect(() => {
    // Update default options when promptType changes
    const defaults = DEFAULT_OPTIONS[promptType];
    setSelectedRole(defaults.role);
    setSelectedStyle(defaults.style);
    setLength(defaults.length);
    setCreativity(defaults.creativity);
  }, [promptType]);

  const handleGeneratePrompt = async () => {
    if (!idea.trim() || !selectedRole || !selectedStyle) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: idea,
          promptType,
          role: selectedRole,
          style: selectedStyle,
          maxTokens: length,
          temperature: creativity
        })
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedPrompt(data.result || "Error generating response");
      } else {
        console.error(data.error || "An error occurred while generating the prompt.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendToChatGPT = () => {
    if (generatedPrompt) {
      const encodedPrompt = encodeURIComponent(generatedPrompt);
      const appUrl = `chat.openai://chat?prompt=${encodedPrompt}`;
      const webUrl = `https://chat.openai.com/?prompt=${encodedPrompt}`;

      // Check if the user is on a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // Attempt to open the ChatGPT app on mobile
        window.location.href = appUrl;

        // Fallback to the web version after a short delay
        setTimeout(() => {
          window.open(webUrl, "_blank");
        }, 1000);
      } else {
        // Open the web version on desktop
        window.open(webUrl, "_blank");
      }
    }
  };


  const handleSharePrompt = () => {
    if (generatedPrompt) {
      if (navigator.share) {
        // Use the Web Share API
        navigator
          .share({
            title: "Check out this prompt!",
            text: generatedPrompt,
            url: window.location.href, // Optional: Include the current page URL
          })
          .then(() => console.log("Prompt shared successfully!"))
          .catch((error) => console.error("Error sharing prompt:", error));
      } else {
        // Fallback for browsers that don't support the Web Share API
        alert("Sharing is not supported on this browser.");
      }
    }
  };

  function getIdeaPlaceholder(promptType: string, role: string) {
    // Text
    if (promptType === "text") {
      switch (role) {
        case "Copywriter":
          return "e.g., Write a catchy headline for a new eco-friendly water bottle";
        case "Novelist":
          return "e.g., A detective haunted by a mysterious past in 1920s Paris";
        case "Academic Researcher":
          return "e.g., Summarize the impact of climate change on polar bear populations";
        case "SEO Specialist":
          return "e.g., Blog post outline for 'Best laptops for remote work in 2025'";
        case "Customer Support Agent":
          return "e.g., Respond to a customer asking for a refund due to late delivery";
        case "Philosopher":
          return "e.g., Explore the meaning of happiness in modern society";
        case "Educator":
          return "e.g., Explain photosynthesis to 8th grade students";
        default:
          return "e.g., A cyberpunk cat exploring Tokyo";
      }
    }
    // Image
    if (promptType === "image") {
      switch (role) {
        case "Concept Artist":
          return "e.g., Futuristic city skyline at sunset with flying cars";
        case "Graphic Designer":
          return "e.g., Minimalist poster for a jazz music festival";
        case "Photographer":
          return "e.g., Misty forest at dawn with sunbeams through the trees";
        case "Fantasy Illustrator":
          return "e.g., Dragon perched atop a snowy mountain under northern lights";
        case "UI/UX Designer":
          return "e.g., Mobile app splash screen with playful animal mascots";
        case "Fashion Designer":
          return "e.g., Avant-garde evening gown inspired by ocean waves";
        case "Architect":
          return "e.g., Modern eco-friendly cabin in the woods";
        default:
          return "e.g., A cyberpunk cat exploring Tokyo, neon lights, rainy night";
      }
    }
    // Code
    if (promptType === "code") {
      switch (role) {
        case "Software Engineer":
          return "e.g., REST API endpoint for user authentication in Node.js";
        case "Data Scientist":
          return "e.g., Python script to analyze sales data and plot monthly trends";
        case "Frontend Developer":
          return "e.g., Responsive navbar with dropdown menus in React";
        case "DevOps Engineer":
          return "e.g., GitHub Actions workflow for CI/CD deployment";
        case "Security Analyst":
          return "e.g., Script to scan for open ports and report vulnerabilities";
        case "Technical Writer":
          return "e.g., Step-by-step guide for installing Docker on Windows";
        default:
          return "e.g., Function to reverse a string in JavaScript";
      }
    }
    // Fallback
    return "e.g., Describe your idea here";
  }
  

  return (
    <TooltipProvider>
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-7xl xl:max-w-8xl w-full flex flex-col">
        {/* Hero Section */}
        <div className="relative mb-12">
          {/* Radial gradients for depth */}
          <div className="hero-radial-bg" aria-hidden="true" />

          {/* Animated sparkles */}
          <AnimatedSparkleGroup count={6} />

          {/* Main hero content */}
          <div className="relative z-10 text-center ">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 flex items-center justify-center gap-2">
              Turn your ideas into purrfect prompts
              <Sparkles className="h-5 w-5 text-secondary relative animate-bounce" />
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Enter your idea below and we'll enhance it into a detailed, effective prompt
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          {/* Left Column */}
          <form className="flex flex-col gap-y-6">
            {/* Prompt Type */}
            <div className="p-6 rounded-2xl border shadow-md bg-card">
              <label htmlFor="prompt-type" className="block text-sm font-medium mb-2 flex items-center">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                Prompt Type
              </label>
              <Select
                value={promptType}
                onValueChange={(value) => setPromptType(value as keyof typeof ROLE_OPTIONS)}
              >
                <SelectTrigger id="prompt-type" className="rounded-xl focus:ring-primary">
                  <SelectValue placeholder="Select prompt type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Idea Input */}
            <div className="p-6 rounded-2xl border shadow-md bg-card">
              <label htmlFor="idea" className="block text-sm font-medium mb-2 flex items-center">
                <Sparkles className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                Your Prompt
              </label>
              <Textarea
                id="idea"
                placeholder={getIdeaPlaceholder(promptType, selectedRole)}
                className="min-h-[150px] resize-none rounded-xl focus:ring-primary"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
            </div>

            {/* Advanced Prompt Options */}
            <div className="p-6 rounded-2xl border shadow-md bg-card">
              <Button
                type="button" 
                variant="outline"
                className="w-full flex items-center justify-between"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <span className="flex items-center">
                  <span className="mr-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.5"/><path d="M19.5 12c0-.563.06-1.11.175-1.635a1.5 1.5 0 0 0-.326-1.47l-1.1-1.1a1.5 1.5 0 0 1 0-2.12l.78-.78a1.5 1.5 0 0 0 0-2.12l-1.06-1.06a1.5 1.5 0 0 0-2.12 0l-.78.78a1.5 1.5 0 0 1-2.12 0l-1.1-1.1a1.5 1.5 0 0 0-1.47-.326A7.5 7.5 0 0 0 6 4.5c-.563 0-1.11.06-1.635.175a1.5 1.5 0 0 0-1.47.326l-1.1 1.1a1.5 1.5 0 0 1-2.12 0l-.78-.78a1.5 1.5 0 0 0-2.12 0l-1.06 1.06a1.5 1.5 0 0 0 0 2.12l.78.78a1.5 1.5 0 0 1 0 2.12l-1.1 1.1a1.5 1.5 0 0 0-.326 1.47A7.5 7.5 0 0 0 4.5 12c0 .563-.06 1.11-.175 1.635a1.5 1.5 0 0 0 .326 1.47l1.1 1.1a1.5 1.5 0 0 1 0 2.12l-.78.78a1.5 1.5 0 0 0 0 2.12l1.06 1.06a1.5 1.5 0 0 0 2.12 0l.78-.78a1.5 1.5 0 0 1 2.12 0l1.1 1.1a1.5 1.5 0 0 0 1.47.326A7.5 7.5 0 0 0 12 19.5c.563 0 1.11-.06 1.635-.175a1.5 1.5 0 0 0 1.47-.326l1.1-1.1a1.5 1.5 0 0 1 2.12 0l.78.78a1.5 1.5 0 0 0 2.12 0l1.06-1.06a1.5 1.5 0 0 0 0-2.12l-.78-.78a1.5 1.5 0 0 1 0-2.12l1.1-1.1a1.5 1.5 0 0 0 .326-1.47A7.5 7.5 0 0 0 19.5 12Z" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </span>
                  Show Advanced Prompt Options
                </span>
                <span>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </span>
              </Button>
              {isSettingsOpen && (
                <div className="mt-4 space-y-6">
                  {/* Role Dropdown */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-2 flex items-center">
                      <User className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                      Role
                    </label>
                    <Select
                      value={selectedRole}
                      onValueChange={(value) => setSelectedRole(value)}
                    >
                      <SelectTrigger id="role" className="rounded-xl focus:ring-primary">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl overflow-visible z-40">
                        {ROLE_OPTIONS[promptType]?.map(({ label, icon }) => (
                          <SelectItem key={label} value={label}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="flex items-center">
                                  {icon}
                                  {label}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                className="z-50"
                                side="right"
                                align="start"
                                sideOffset={8}
                              >
                                {getRoleTooltip(label)}
                              </TooltipContent>
                            </Tooltip>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Style Dropdown */}
                  <div>
                    <label htmlFor="style" className="block text-sm font-medium mb-2 flex items-center">
                      <Palette className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                      Style
                    </label>
                    <Select
                      value={selectedStyle}
                      onValueChange={(value) => setSelectedStyle(value)}
                    >
                      <SelectTrigger id="style" className="rounded-xl focus:ring-primary">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {STYLE_OPTIONS[promptType]?.map(({ label, icon }) => (
                          <SelectItem key={label} value={label}>
                            <span className="flex items-center">
                              {icon}
                              {label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Length Slider */}
                  <div>
                    <label htmlFor="length" className="block text-sm font-medium mb-2 flex items-center">
                      <Text className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                      Max Length
                    </label>
                    <Slider
                      id="length"
                      value={[length]}
                      onValueChange={(value) => setLength(value[0])}
                      min={100}
                      max={900}
                      step={200}
                      className="rounded-xl"
                    />
                    <div className="flex justify-between text-xs mt-2">
                      <span>Short</span>
                      <span>Long</span>
                    </div>
                  </div>

                  {/* Creativity Slider */}
                  <div>
                    <label htmlFor="creativity" className="block text-sm font-medium mb-2 flex items-center">
                      <Brain className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                      Creativity
                    </label>
                    <Slider
                      id="creativity"
                      value={[creativity]}
                      onValueChange={(value) => setCreativity(value[0])}
                      min={0.2}
                      max={1.0}
                      step={0.2}
                      className="rounded-xl"
                    />
                    <div className="flex justify-between text-xs mt-2">
                      <span>Focused</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <Button
              className="
                w-full font-medium py-6 text-base transition-all rounded-xl
                bg-primary text-gray-900 dark:text-gray-900
                hover:bg-primary/90 hover:brightness-110 hover:shadow-2xl
                focus-visible:ring-2 focus-visible:ring-primary/60
                flex items-center justify-center gap-2
              "
              onClick={handleGeneratePrompt}
              disabled={!idea.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Generating...
                </>
              ) : (
                "Generate Prompt"
              )}
            </Button>
          </form>

          {/* Right Column */}
          <div className="space-y-6 lg:sticky lg:top-8">
            {/* Enhanced Output */}
            <motion.div
              key={isGenerating ? "loading" : generatedPrompt || "empty"}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {isGenerating ? (
                <div className="p-6 rounded-2xl border shadow-md bg-card flex items-center justify-center min-h-[120px]">
                  <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
                  <span className="ml-3 text-muted-foreground">Enhancing your prompt...</span>
                </div>
              ) : generatedPrompt ? (
                <div className="p-6 rounded-2xl border shadow-md bg-card">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Wand2 className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                    Enhanced Prompt
                  </h3>
                  <div className="rounded-xl p-5 bg-muted whitespace-pre-wrap">{generatedPrompt}</div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border shadow-md bg-card">
                  <p className="text-muted-foreground">Your enhanced prompt will appear here.</p>
                </div>
              )}
            </motion.div>

            {/* Copy and Send Buttons */}
            {generatedPrompt && !isGenerating && (
              <div className="flex flex-wrap gap-4">
                {/* Copy Button */}
                <CopyButton generatedPrompt={generatedPrompt} />

                {/* Send to ChatGPT Button */}
                <Button                
                  variant="outline"
                  className="inline-flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                  onClick={handleSendToChatGPT}
                >
                  <Send className="w-4 h-4" />
                  Send to ChatGPT
                </Button>

                {/* Share Button */}
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                  onClick={handleSharePrompt}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}
