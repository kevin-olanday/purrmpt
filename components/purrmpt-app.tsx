"use client";

import { useState, useEffect } from "react";
import { Cat, Moon, Sun, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { SparkleGroup } from "./sparkle";

export default function PurrmptApp() {
  const [promptType, setPromptType] = useState("image");
  const [idea, setIdea] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleGeneratePrompt = async () => {
    if (!idea.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: idea }),
      });

      const data = await response.json();
      setGeneratedPrompt(data.result || "Error generating response");
    } catch (error) {
      console.error("Error generating response:", error);
      setGeneratedPrompt("Error generating response");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between border-b shadow-sm">
        <div className="flex items-center gap-2">
          <Cat className="h-8 w-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Purrmpt</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full hover:bg-primary/10 button-hover-effect"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
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

        <div className="space-y-8">
          {/* Input Section */}
          <div className="p-6 rounded-2xl border shadow-md card-hover-effect bg-card">
            <div className="space-y-6">
              <div>
                <label htmlFor="prompt-type" className="block text-sm font-medium mb-2">
                  Prompt Type
                </label>
                <Select value={promptType} onValueChange={setPromptType}>
                  <SelectTrigger id="prompt-type" className="rounded-xl focus:ring-primary">
                    <SelectValue placeholder="Select prompt type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="code">Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="idea" className="block text-sm font-medium mb-2">
                  Your Idea
                </label>
                <Textarea
                  id="idea"
                  placeholder="e.g. A cyberpunk cat exploring Tokyo"
                  className="min-h-[150px] resize-none rounded-xl focus:ring-primary"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                />
              </div>

              <Button
                className="w-full font-medium py-6 text-base transition-all rounded-xl button-hover-effect bg-primary text-primary-foreground"
                onClick={handleGeneratePrompt}
                disabled={!idea.trim() || isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Prompt"
                )}
              </Button>
            </div>
          </div>

          {/* Output Section */}
          {generatedPrompt && (
            <div className="p-6 rounded-2xl border shadow-md card-hover-effect bg-card">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-medium">Enhanced Prompt</h3>
                <Sparkles className="h-4 w-4 text-secondary" />
              </div>
              <div className="rounded-xl p-5 mb-4 bg-muted">{generatedPrompt}</div>
              <Button
                className={`w-full py-5 transition-all duration-300 text-base rounded-xl button-hover-effect ${
                  copied
                    ? "bg-secondary text-secondary-foreground font-medium"
                    : "bg-primary/10 hover:bg-primary/20 text-foreground font-medium border"
                }`}
                onClick={copyToClipboard}
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t text-center shadow-inner">
        <p className="text-sm text-muted-foreground">
          Created by{" "}
          <a
            href="https://kevinolanday.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline transition-all"
          >
            Kevin Olanday
          </a>
        </p>
      </footer>
    </div>
  );
}
