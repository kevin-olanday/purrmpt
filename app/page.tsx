import PurrmptApp from "@/components/purrmpt-app";

// This is the *new* way in Next.js App Router
export const metadata = {
  title: "Purrmpt - Supercharge Your Prompts",
  description: "Enhance your prompts into purrfectly crafted, high-impact prompts. 🐱",
};

export default function Home() {
  return <PurrmptApp />;
}
