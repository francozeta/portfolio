"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

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
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-24 xl:px-56">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Let's work together
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-md">
                Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing
                together.
              </p>
            </div>

            {/* Contact Info */}
{/*             <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Quick contact</h3>
                <div className="space-y-3">
                  <div className="text-neutral-600">
                    <span className="text-neutral-500">Email:</span> franco@example.com
                  </div>
                  <div className="text-neutral-600">
                    <span className="text-neutral-500">Location:</span> Lima, Peru
                  </div>
                  <div className="text-neutral-600">
                    <span className="text-neutral-500">Response time:</span> Usually within 24 hours
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
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
                      className="bg-white border-neutral-300 text-black placeholder:text-neutral-400 focus:border-black focus:ring-black/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
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
                      className="bg-white border-neutral-300 text-black placeholder:text-neutral-400 focus:border-black focus:ring-black/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
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
                    className="bg-white border-neutral-300 text-black placeholder:text-neutral-400 focus:border-black focus:ring-black/20 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">Something went wrong. Please try again.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading" || !formData.name || !formData.email || !formData.message}
                  className="w-full bg-black text-white hover:bg-neutral-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
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
