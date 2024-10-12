import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import { ChevronRight } from '@geist-ui/icons';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <footer className="w-full pt-20 pb-10 mb-[100px] md:mb-5" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
          fill
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=francozeta1911@gmail.com" passHref rel="noopener noreferrer" legacyBehavior>
          <a target='_blank'>
            <MagicButton
              title="Let's get in touch"
              icon={<ChevronRight />}
              position="right"
            />
          </a>
        </Link>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light mb-4">
          {`Copyright © ${year} Franco Zeta`}
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <Link
              href={info.link}
              key={info.id}
              passHref
              rel='noopener noreferrer'
              legacyBehavior
            >
              <a target='_blank' className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
                <Image src={info.img} alt="icons" width={20} height={20} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;