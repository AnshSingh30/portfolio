'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatDisplayProps {
  value: string;
  unit?: string;
  label: string;
}

export default function StatDisplay({ value, unit, label }: StatDisplayProps) {
  const statRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  
  // Extract numbers and non-numbers
  const isNumeric = /^-?\d+/.test(value.replace(/,/g, ''));
  const targetNumber = isNumeric ? parseFloat(value.replace(/,/g, '').replace(/[^\d.-]/g, '')) : 0;
  // Wait, better to just let the user provide string value and we just animate if it's a pure number or starts with a number.
  // Actually, the spec says "Animates count-up from 0 to value via GSAP when section enters viewport".
  // If the value is e.g. "-40" or "50,000", we should extract the number, animate it, and append the symbols.

  useEffect(() => {
    if (!statRef.current || !numberRef.current) return;

    // For values like "↓Latency", we just don't animate the number, we just show it.
    if (!isNumeric) {
      setDisplayValue(value);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: targetNumber,
            duration: 1.5,
            ease: 'power3.out',
            onUpdate: function () {
              // format back with commas if target had commas
              let currentStr = Math.floor(this.targets()[0].val).toString();
              if (value.includes(',')) {
                currentStr = parseInt(currentStr).toLocaleString();
              }
              // If target had a minus, and we are animating a negative number
              if (targetNumber < 0) {
                 // handle minus sign manually if we extracted it 
                 // but Math.floor handles negative numbers too.
              }
              
              // Just a basic implementation
              setDisplayValue(
                (value.startsWith('-') && parseInt(currentStr) > 0 ? '-' : '') + 
                (value.startsWith('+') ? '+' : '') +
                currentStr + 
                (value.endsWith('+') && !currentStr.endsWith('+') ? '+' : '')
              );
            }
          });
        },
        once: true
      });
    }, statRef);

    return () => ctx.revert();
  }, [value, targetNumber, isNumeric]);

  return (
    <div ref={statRef} className="flex flex-col items-center">
      <div className="flex items-start">
        <span ref={numberRef} className="font-display font-bold text-[clamp(3rem,6vw,5rem)] leading-none text-[#ffffff]">
          {isNumeric ? displayValue : value}
        </span>
        {unit && (
          <span className="font-mono text-[1rem] text-[#ffffff] mt-2 ml-1">
            {unit}
          </span>
        )}
      </div>
      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#6e6e6e] uppercase mt-2">
        {label}
      </span>
    </div>
  );
}
