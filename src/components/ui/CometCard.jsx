import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

/**
 * CometCard - A 3D tilt card with glare effect
 *
 * Creates a premium interactive card that responds to mouse movement
 * with realistic 3D rotation, translation, and light reflection.
 *
 * @param {number} rotateDepth - Max rotation angle in degrees (default: 17.5)
 * @param {number} translateDepth - Max translation in pixels (default: 20)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Card content
 */
export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className = '',
  children,
}) => {
  const ref = useRef(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth interpolation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform mouse position to rotation
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );

  // Transform mouse position to translation (parallax effect)
  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );

  // Glare effect position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  // Dynamic glare gradient
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0) 60%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5 range
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset to center position
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={`[perspective:1000px] [transform-style:preserve-3d] ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="relative rounded-3xl"
      >
        {children}

        {/* Glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-3xl mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: 0.7,
          }}
        />
      </motion.div>
    </div>
  );
};

export default CometCard;
