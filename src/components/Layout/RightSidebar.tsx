import React from 'react'

export const RightSidebar = () => {
  return (
    <div className="fixed right-0 top-0 z-40 hidden lg:flex flex-col items-center h-screen w-20 xl:w-24 py-8">
      {/* Push email + line to the bottom */}
      <div className="mt-auto flex flex-col items-center">
        <a
          href="mailto:contactaditya013@gmail.com"
          className="font-mono text-xs tracking-[0.12em] text-foreground/50 hover:text-primary transition-colors duration-300 [writing-mode:vertical-rl] rotate-180 mb-5 whitespace-nowrap"
          aria-label="Send email"
        >
          contactaditya013@gmail.com
        </a>

        {/* Vertical line running to the bottom edge */}
        <div className="w-[1px] h-20 bg-foreground/20" />
      </div>
    </div>
  )
}
