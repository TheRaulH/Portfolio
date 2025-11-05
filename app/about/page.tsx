import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4">
      <div className="w-full max-w-lg">
        <Terminal className="w-full">
          {/* Comando inicial */}
          <TypingAnimation>
            &gt; fetch --user raul-herrera --profile
          </TypingAnimation>

          {/* Proceso */}
          <AnimatedSpan className="text-green-500">
            ✔ Loading personal info
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">
            ✔ Parsing skills and tech stack
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">
            ✔ Languages detected
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">
            ✔ Generating summary
          </AnimatedSpan>

          {/* Datos resumidos */}
          <AnimatedSpan className="block mt-4 text-blue-400">
            Name: <span className="text-purple-300">Raul Herrera</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-blue-400">
            Role: <span className="text-purple-300">Systems Engineer</span>
          </AnimatedSpan>
          <AnimatedSpan className="text-blue-400">
            Skills:{" "}
            <span className="text-purple-300">
              React, Next.js, Node.js, Flutter, Python, Git
            </span>
          </AnimatedSpan>
          <AnimatedSpan className="text-blue-400">
            Languages: <span className="text-purple-300">Spanish, English</span>
          </AnimatedSpan>

          {/* Mensaje final */}
          <TypingAnimation className="block mt-6 text-muted-foreground">
            &gt; Profile successfully loaded.
          </TypingAnimation>
        </Terminal>
      </div>
    </div>
  );
}
