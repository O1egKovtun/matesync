import { Fragment } from "react";

const technologies = ["Python", "Meta Business SDK", "Figma", "OpenAI", "Next.js", "Pandas", "React"];

export default function TechMarquee() {
  return (
    <div className="w-full bg-[#030014] border-y border-white/5 py-10 overflow-hidden relative z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-transparent to-[#030014] z-10 pointer-events-none w-full"></div>
      
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            {technologies.map((tech, j) => (
              <Fragment key={`${i}-${j}`}>
                <span className="text-gray-400/40 hover:text-gray-300 transition-colors cursor-default text-label px-8 lg:px-14">
                  {tech}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(0,224,255,0.8)]"></span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
