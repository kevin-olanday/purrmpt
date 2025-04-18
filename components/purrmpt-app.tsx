"use client";

import { useState, useEffect } from "react";
import { Cat, Moon, Sun, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { SparkleGroup } from "./sparkle";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";

export default function PurrmptApp() {
  const [promptType, setPromptType] = useState("image");
  const [idea, setIdea] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [maxTokens, setMaxTokens] = useState(300); // Default to "Medium"
  const [temperature, setTemperature] = useState(0.8); // Default to "Creative"
  const [showEmojis, setShowEmojis] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!theme) setTheme("light"); // Default to light theme
  }, [theme, setTheme]);

  const handleGeneratePrompt = async () => {
    if (!idea.trim()) return;

    setIsGenerating(true);
    setErrorMessage(""); // Clear previous errors

    try {
      console.log("Selected promptType:", promptType); // Debugging
      console.log("Max Tokens:", maxTokens); // Debugging
      console.log("Temperature:", temperature); // Debugging

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: idea, promptType, maxTokens, temperature }),
      });

      const data = await response.json();

      // Log the full API response to the console
      console.log("API Response:", data);

      if (response.ok) {
        setGeneratedPrompt(data.result || "Error generating response");
      } else {
        setErrorMessage(data.error || "An error occurred while generating the prompt.");
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyWithAnimation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setShowEmojis(true); // Trigger the animation
    setTimeout(() => {
      setCopied(false);
      setShowEmojis(false); // Reset the animation
    }, 2000); // Match the animation duration
  };

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
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
            <div className="p-6 rounded-2xl border shadow-md bg-card">
              <div className="space-y-6">
                <div>
                  <label htmlFor="prompt-type" className="block text-sm font-medium mb-2">
                    Prompt Type
                  </label>
                  <Select
                    value={promptType}
                    onValueChange={(value) => {
                      console.log("Selected Prompt Type:", value); // Debugging
                      setPromptType(value);
                    }}
                    aria-label="Select the type of prompt"
                  >
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

                {/* Desired Length Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="desired-length" className="block text-sm font-medium">
                      Desired Length
                    </label>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-muted-foreground cursor-pointer">?</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Controls the length of the output: Short or Extra Long.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Slider
                      id="desired-length"
                      value={[maxTokens]} // Wrap in an array
                      onValueChange={(value) => setMaxTokens(value[0])} // Extract the first value
                      min={100}
                      max={900}
                      step={200}
                      className="rounded-xl"
                    />
                    {/* Custom Marks */}
                    <div className="flex justify-between text-xs mt-2">
                      <span>Short</span>
                      <span>Long</span>
                    </div>
                  </div>
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="temperature" className="block text-sm font-medium">
                      Creativity Slider
                    </label>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-muted-foreground cursor-pointer">?</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Controls the randomness of the output: Lower values are more focused, higher values are more creative.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Slider
                      id="temperature"
                      value={[temperature]} // Wrap in an array
                      onValueChange={(value) => setTemperature(value[0])} // Extract the first value
                      min={0.2}
                      max={1.0}
                      step={0.2}
                      className="rounded-xl"
                    />
                    {/* Custom Marks */}
                    <div className="flex justify-between text-xs mt-2">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full font-medium py-6 text-base transition-all rounded-xl button-hover-effect bg-primary text-primary-foreground flex items-center justify-center gap-2"
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
                    <>
                      <span role="img" aria-label="paw">🐾</span> {/* Single cute paw icon */}
                      Generate Prompt
                    </>
                  )}
                </Button>
                {errorMessage && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}
              </div>
            </div>

            {/* Output Section */}
            {generatedPrompt ? (
              <div className="p-6 rounded-2xl border shadow-md bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-medium">Enhanced Prompt</h3>
                  <Sparkles className="h-4 w-4 text-secondary" />
                </div>
                <div className="rounded-xl p-5 mb-4 bg-muted whitespace-pre-wrap">
                  {generatedPrompt}
                </div>
                <div className="flex flex-col gap-4">
                  {/* Copy to Clipboard Button with Animation */}
                  <div className="relative">
                    {/* Rising Emojis */}
                    {showEmojis && (
                      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <div className="emoji-animation">
                          <span>😺</span>
                          <span>🐾</span>
                          <span>✨</span>
                        </div>
                      </div>
                    )}

                    {/* Copy to Clipboard Button */}
                    <Button
                      className={`w-full py-5 transition-all duration-300 text-base rounded-xl button-hover-effect flex items-center justify-center gap-2 ${
                        copied
                          ? "bg-secondary text-secondary-foreground font-medium"
                          : "bg-primary/10 hover:bg-primary/20 text-foreground font-medium border"
                      }`}
                      onClick={() => handleCopyWithAnimation(generatedPrompt)}
                      disabled={copied}
                    >
                      {copied ? (
                        <>
                          <span role="img" aria-label="check">✅</span> {/* Checkmark icon */}
                          Copied!
                        </>
                      ) : (
                        <>
                          <span role="img" aria-label="clipboard">📋</span> {/* Clipboard icon */}
                          Copy to Clipboard
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Send to ChatGPT Button */}
                  <Button
                    className="w-full py-5 transition-all duration-300 text-base rounded-xl button-hover-effect flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-foreground font-medium border"
                    onClick={() => {
                      const chatGPTUrl = `https://chat.openai.com/?prompt=${encodeURIComponent(generatedPrompt)}`;
                      window.open(chatGPTUrl, "_blank"); // Open ChatGPT in a new tab
                    }}
                    disabled={!generatedPrompt.trim()} // Disable if no prompt is generated
                  >
                    <span role="img" aria-label="chat">💬</span> {/* Chat icon */}
                    Send to ChatGPT
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Your enhanced prompt will appear here.</p>
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
    </TooltipProvider>
  );
}
