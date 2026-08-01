'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseLight() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const [enabled, setEnabled] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[600px] w-[600px] rounded-full opacity-50 blur-[100px]"
      style={{
        x: springX,
        y: springY,
        background:
          'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)',
      }}
    />
  );
}
