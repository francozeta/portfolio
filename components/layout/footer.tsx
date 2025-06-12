import { FaGithub } from "react-icons/fa"
import { FaLinkedin, FaThreads } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

export default function Footer() {
  return (
    <footer className="bg-black py-6 px-6 sm:px-12 lg:px-24 xl:px-56 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-neutral-400">
              © {new Date().getFullYear()} <span className="font-medium text-white">Franco Zeta</span>. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.github.com/francozeta"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/franco-zeta-496330267"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.threads.net/@frxnco.zeta"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
            >
              <FaThreads className="w-5 h-5" />
            </a>
            <a
              href="mailto:francozeta2011@gmail.com"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <MdEmail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
