"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/actions/submit-contact-form";


export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <div className="@container/form bg-background/50 backdrop-blur-xl border border-primary/10 rounded-[2rem] p-6 @md/form:p-10 shadow-2xl transition-all duration-300 hover:border-primary/20">
      <div className="mb-8">
        <h3 className="text-2xl @md/form:text-3xl font-bold mb-2">
          Send a Message
        </h3>
        <p className="text-muted-foreground">
          I'll get back to you within 24 hours.
        </p>
      </div>

      {status.type && (
        <div
          className={`mb-6 p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === "success"
              ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
            }`}
        >
          {status.message}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 @md/form:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold ml-1 text-muted-foreground"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-5 py-3 rounded-xl border border-primary/10 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
              placeholder="John Doe"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold ml-1 text-muted-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-5 py-3 rounded-xl border border-primary/10 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
              placeholder="john@example.com"
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-semibold ml-1 text-muted-foreground"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-5 py-3 rounded-xl border border-primary/10 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
            placeholder="Project Inquiry"
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-semibold ml-1 text-muted-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-5 py-4 rounded-2xl border border-primary/10 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-base"
            placeholder="Tell me about your project dreams..."
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full group cursor-pointer relative overflow-hidden px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/10 to-primary-foreground/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </form>
    </div>
  );
}