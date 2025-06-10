"use client"

import { ArrowRight, MapPin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { BsInstagram } from "react-icons/bs"

export function AboutSection() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">About Me</h2>

              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  I'm a passionate{" "}
                  <span className="text-black font-medium">software developer and design enthusiast</span> from Peru. My
                  journey began in 2022 with a simple HTML course — and quickly turned into a deep love for building
                  things with code.
                </p>

                <p>
                  Currently studying at <span className="text-black font-medium">CERTUS</span>, I work on personal and
                  academic projects that blend functionality and good design. I also create flyers for events and enjoy
                  translating ideas into visuals that connect.
                </p>

                <p>
                  Beyond coding, <span className="text-black font-medium">music is a big part of who I am</span>. Soon,
                  I'll be adding a playlist section to this site — maybe you'll discover something new there.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center gap-2 text-black hover:gap-3 transition-all duration-300">
                <span className="text-lg font-medium">View full profile</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
              <div>
                <div className="text-3xl font-bold text-black mb-1">2+</div>
                <div className="text-sm text-neutral-500 uppercase tracking-wide">Years Coding</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-1">15+</div>
                <div className="text-sm text-neutral-500 uppercase tracking-wide">Projects Built</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-1">∞</div>
                <div className="text-sm text-neutral-500 uppercase tracking-wide">Learning</div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile and Contact */}
          <div className="lg:sticky lg:top-20 space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-full max-w-sm mx-auto lg:max-w-none aspect-square bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200">
                <img
                  src="https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//profile-photo.jpg"
                  alt="Franco Zeta"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = "none"
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                        <div class="text-6xl font-bold text-neutral-400">FZ</div>
                      </div>
                    `
                  }}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Get in touch</h3>
                <div className="space-y-3">
                  <a
                    href="https://www.google.com.pe/maps/@-12.0881152,-77.0244608,12z?hl=es-419&entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D"
                    className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors group"
                    target="_blank"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Lima, Peru</span>
                  </a>
                  <a
                    href="mailto:francozeta2011@gmail.com"
                    className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors group"
                    target="_blank"
                  >
                    <Mail className="w-5 h-5" />
                    <span>franco2011@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Follow me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/francozeta/"
                    className="flex items-center justify-center w-10 h-10 border border-neutral-300 rounded-lg text-neutral-600 hover:text-black hover:border-black transition-all duration-200"
                    target="_blank"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/franco-zeta-496330267"
                    className="flex items-center justify-center w-10 h-10 border border-neutral-300 rounded-lg text-neutral-600 hover:text-black hover:border-black transition-all duration-200"
                    target="_blank"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/frxnco.zeta/"
                    className="flex items-center justify-center w-10 h-10 border border-neutral-300 rounded-lg text-neutral-600 hover:text-black hover:border-black transition-all duration-200"
                    target="_blank"
                  >
                    <BsInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Download CV - TODO: Functionality */}
              <Button
                variant="outline"
                className="w-full border-black text-black hover:bg-black hover:text-white transition-all duration-200"
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
