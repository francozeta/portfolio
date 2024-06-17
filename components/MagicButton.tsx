import React, { FC } from 'react'
interface MagicButtonProps {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}
const MagicButton: FC<MagicButtonProps> = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}) => {
  return (
    <button className="
      inline-flex 
      w-full
      h-12 
      animate-shimmer 
      items-center 
      justify-center 
      rounded-full
      border 
      border-slate-800 
      bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
      bg-[length:200%_100%] 
      px-6 font-medium 
      transition-colors 
      focus:outline-none 
      md:w-60
      md:mt-10
      "
      onClick={handleClick}

    >
      <span className={` 
        inline-flex 
        h-full 
        w-full 
        cursor-pointer 
        items-center 
        justify-center
        px-7 
        text-sm 
        font-medium 
         text-slate-400 
        gap-2
        ${otherClasses}`}
      >
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </span>
    </button>
  )
}

export default MagicButton;