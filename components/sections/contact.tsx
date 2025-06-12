"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Add scroll reveal hooks
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLElement>()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLSpanElement>({ delay: 100 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>({ delay: 200 })
  const { ref: descRef, isVisible: descVisible } = useScrollReveal<HTMLParagraphElement>({ delay: 300 })
  const { ref: formRef, isVisible: formVisible } = useScrollReveal<HTMLDivElement>({ delay: 400 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch (error) {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section ref={sectionRef} className="bg-neutral-950 py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-24 xl:px-56">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-8">
            <div>
              <span
                ref={badgeRef}
                className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap border-transparent bg-neutral-800 text-neutral-200 mb-4 transition-all duration-700 ${
                  badgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="mr-1">✦</span>
                Get In Touch
              </span>

              <h2
                ref={titleRef}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight transition-all duration-700 ${
                  titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Let's work together
              </h2>
              <p
                ref={descRef}
                className={`text-base md:text-lg text-neutral-300 leading-relaxed max-w-md transition-all duration-700 ${
                  descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing
                together.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <div
              ref={formRef}
              className={`bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 transition-all duration-1000 ${
                formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-white focus:ring-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-white focus:ring-white/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    rows={5}
                    className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-white focus:ring-white/20 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">Something went wrong. Please try again.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading" || !formData.name || !formData.email || !formData.message}
                  className="w-full bg-white text-black hover:bg-neutral-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
