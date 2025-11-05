"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Globe } from "@/components/magicui/globe";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Linkedin,
  Phone,
  FormInputIcon,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [clicked, setClicked] = useState({
    modal: false,
    mailto: false,
    linkedin: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Enhanced UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleClick = (key: keyof typeof clicked) => {
    setClicked((prev) => ({ ...prev, [key]: true }));
  };

  const allClicked = Object.values(clicked).every(Boolean);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        alert(`Error: ${result.error?.message || "Failed to send message"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background">
      {/* Globe as main background, shifted down */}
      <Globe
        className="absolute top-[95%] left-1/2 -translate-x-1/2 -translate-y-1/2
                   scale-[1.6] sm:scale-[1.4] md:scale-[1.2] lg:scale-100"
      />

      {/* Overlay content */}
      <div className="absolute top-[25%] z-10 flex flex-col items-center text-center px-2 pb-4">
        {/* Title */}
        <h1 className="mb-4 uppercase text-7xl font-bold leading-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10 md:text-8xl lg:text-9xl animate-in fade-in duration-1000">
          contacts
        </h1>

        {/* Enhanced subtitle */}
        <p className="mb-8 text-muted-foreground text-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          Let&apos;s connect and create something amazing together
        </p>

        {/* Buttons with enhanced UX */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {/* Modal Form Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() => handleClick("modal")}
                className={`gap-2 rounded-full px-6 py-5 text-base hover:scale-105 transition-all animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 ${
                  clicked.modal ? "ring-2 ring-primary/50" : ""
                }`}
              >
                {clicked.modal ? (
                  <CheckCircle className="h-5 w-5 animate-in zoom-in duration-300" />
                ) : (
                  <FormInputIcon className="h-5 w-5" />
                )}
                <span>Contact Form</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="animate-in fade-in zoom-in duration-300">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send me a message
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    className="transition-all duration-200 focus:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    className="transition-all duration-200 focus:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                    className="transition-all duration-200 focus:scale-105 resize-none"
                  />
                </div>
                <Button
                  onClick={handleFormSubmit}
                  className="w-full transition-all duration-300 hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
              <BorderBeam duration={8} size={100} />
            </DialogContent>
          </Dialog>

          {/* Mailto Button */}
          <Button
            asChild
            variant="outline"
            className={`gap-2 rounded-full px-6 py-5 text-base hover:scale-105 transition-all animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 ${
              clicked.mailto ? "ring-2 ring-primary/50" : ""
            }`}
            onClick={() => handleClick("mailto")}
          >
            <a href="mailto:raulisraelherreracruz@gmail.com">
              {clicked.mailto ? (
                <CheckCircle className="h-5 w-5 animate-in zoom-in duration-300" />
              ) : (
                <Mail className="h-5 w-5" />
              )}
              <span>Open Mail App</span>
            </a>
          </Button>

          {/* LinkedIn Button */}
          <Button
            asChild
            variant="outline"
            className={`gap-2 rounded-full px-6 py-5 text-base hover:scale-105 transition-all animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-900 ${
              clicked.linkedin ? "ring-2 ring-primary/50" : ""
            }`}
            onClick={() => handleClick("linkedin")}
          >
            <a
              href="https://linkedin.com/in/raulisraelherreracruz"
              target="_blank"
              rel="noopener noreferrer"
            >
              {clicked.linkedin ? (
                <CheckCircle className="h-5 w-5 animate-in zoom-in duration-300" />
              ) : (
                <Linkedin className="h-5 w-5" />
              )}
              <span>LinkedIn</span>
            </a>
          </Button>

          {/* Secret Button */}
          {allClicked && (
            <Button
              asChild
              variant="outline"
              className="gap-2 rounded-full px-6 py-5 text-base hover:scale-105 transition-all animate-in fade-in zoom-in duration-500"
            >
              <a
                href="https://wa.me/59168841698"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </Button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 animate-in fade-in duration-1000 delay-1100">
          {Object.entries(clicked).map(([key, isClicked]) => (
            <div
              key={key}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                isClicked ? "bg-primary scale-125" : "bg-muted-foreground/30"
              }`}
            />
          ))}
          {allClicked && (
            <span className="ml-3 text-sm text-muted-foreground animate-in fade-in slide-in-from-left duration-500">
              🎉 Secret unlocked!
            </span>
          )}
        </div>

        {/* Interactive hint */}
        {!allClicked && (
          <p className="mt-4 text-xs text-muted-foreground/60 animate-pulse">
            Try clicking all the buttons...
          </p>
        )}
      </div>

      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0 h-full 
                   bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))] 
                   dark:bg-[radial-gradient(circle_at_50%_200%,rgba(255,255,255,0.1),rgba(0,0,0,0))]"
      />
      <div className="pointer-events-none absolute inset-0 h-full bg-gradient-to-t from-background/50 via-transparent to-background/30" />
    </div>
  );
}
