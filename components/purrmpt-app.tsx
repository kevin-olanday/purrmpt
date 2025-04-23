"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, Moon, Sun, Sparkles, Settings, SlidersHorizontal, Text, Brain, Wand2, User, Palette, Clipboard, Send, Paintbrush, Film, Cpu, Droplet, Layers, Rocket, Cloud, Code, Shield, Zap, FileText, Star, BookOpen, PenTool, Smile, Share2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { SparkleGroup } from "@/components/sparkle";

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
    { label: "Default", icon: <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Formal", icon: <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Conversational", icon: <Smile className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Persuasive", icon: <PenTool className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Informative", icon: <Text className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Humorous", icon: <Smile className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Narrative", icon: <Star className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Inspirational", icon: <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
  image: [
    { label: "Default", icon: <Paintbrush className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Dreamy", icon: <Paintbrush className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Cinematic", icon: <Film className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Cyberpunk", icon: <Cpu className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Watercolor", icon: <Droplet className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Gritty", icon: <Layers className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Futuristic", icon: <Rocket className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Surreal", icon: <Cloud className="w-4 h-4 mr-2" aria-hidden="true" /> },
  ],
  code: [
    { label: "Default", icon: <Code className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Concise", icon: <Code className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Beginner-Friendly", icon: <Smile className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Expert-Level", icon: <Brain className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Verbose with Comments", icon: <FileText className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Optimized", icon: <Zap className="w-4 h-4 mr-2" aria-hidden="true" /> },
    { label: "Secure", icon: <Shield className="w-4 h-4 mr-2" aria-hidden="true" /> },
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
    const emojiPool = ["🐱", "😺", "😻", "🐾", "✨", "🧶", "😹", "🎀", "💫"];
    const randomEmojis = Array.from({ length: 2 }, () =>
      emojiPool[Math.floor(Math.random() * emojiPool.length)]
    );
    setEmojis(randomEmojis);

    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative inline-block">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="relative z-10 flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all overflow-hidden"
      >
        <Clipboard className="w-4 h-4" />
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Emoji Burst Animation Layer */}
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
  const [copied, setCopied] = useState(false);
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

  const handleSendToGemini = () => {
    if (generatedPrompt) {
      const encodedPrompt = encodeURIComponent(generatedPrompt);
      const bardUrl = `https://bard.google.com/?prompt=${encodedPrompt}`; // Google Bard's web URL with the prompt
  
      // Open Bard in a new tab
      window.open(bardUrl, "_blank");
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

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        {/* Header */}
        <header className="w-full py-4 px-6 flex items-center justify-between border-b shadow-sm">
          <div className="flex items-center gap-2">
            <Cat className="h-8 w-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">Purrmpt 🐾</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-primary/10"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          
          <div className="text-center mb-8 relative">
            <div className="relative inline-block">
              <h2 className="text-xl md:text-2xl font-medium mb-2 relative z-10">
                Turn your ideas into purrfect prompts
                <Sparkles className="h-5 w-5 text-secondary absolute -right-6 -top-2" />
              </h2>
              <div className="absolute inset-0 z-0">
                <SparkleGroup count={3} colors={["#6EE7B7", "#A78BFA", "#FBBF24"]} />
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Enter your idea below and we'll enhance it into a detailed, effective prompt
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
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
                  placeholder="e.g., A cyberpunk cat exploring Tokyo"
                  className="min-h-[150px] resize-none rounded-xl focus:ring-primary"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                />
              </div>

              {/* Advanced Prompt Options */}
              <div className="p-6 rounded-2xl border shadow-md bg-card">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                  <span className="flex items-center">
                    <Settings className="w-4 h-4 text-muted-foreground mr-2" aria-hidden="true" />
                    Show Advanced Prompt Options (Optional)
                  </span>
                  <Settings className="h-5 w-5" />
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
                className="w-full font-medium py-6 text-base transition-all rounded-xl bg-primary text-white hover:bg-primary/90 hover:text-white flex items-center justify-center gap-2"
                onClick={handleGeneratePrompt}
                disabled={!idea.trim() || isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Prompt"}
              </Button>
            </div>

            {/* Right Column */}
            <div className="space-y-6 lg:sticky lg:top-8">
              {/* Enhanced Output */}
              {generatedPrompt ? (
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

              {/* Copy and Send Buttons */}
              {generatedPrompt && (
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

        {/* Footer */}
        <footer className="w-full py-6 px-4 border-t text-center shadow-inner">
  <p className="text-sm text-muted-foreground">
    Designed and developed by{" "}
    <a
      href="https://kevinolanday.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary hover:underline transition-all"
    >
      Kevin Olanday
    </a>
    . View the project on{" "}
    <a
      href="https://github.com/kevin-olanday/purrmpt"
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary hover:underline transition-all"
    >
      GitHub
    </a>
    .
  </p>
</footer>
      </div>
    </TooltipProvider>
  );
}
