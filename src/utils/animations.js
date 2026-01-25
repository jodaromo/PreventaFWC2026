/**
 * Shared animation configurations for consistent UI feel
 * Based on iOS 26 liquid glass design principles
 *
 * CHANGELOG:
 * - Created: Applied FAB menu's snappy spring animation to all buttons
 * - quickSpring: Main button interaction spring (stiffness: 500, damping: 30)
 * - buttonHover: Subtle scale up on hover
 * - buttonTap: Satisfying press-down effect
 */

// Quick, snappy spring for button interactions - matches FAB menu feel
export const quickSpring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.8,
};

// Liquid spring for morphing/expanding elements
export const liquidSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

// Button hover animation - subtle lift
export const buttonHover = {
  scale: 1.02,
  transition: quickSpring,
};

// Button tap animation - satisfying press
export const buttonTap = {
  scale: 0.97,
  transition: quickSpring,
};

// Primary CTA button animations (larger buttons)
export const ctaButtonHover = {
  scale: 1.02,
  y: -2,
  transition: quickSpring,
};

export const ctaButtonTap = {
  scale: 0.98,
  transition: quickSpring,
};

// Icon button animations (small circular buttons)
export const iconButtonHover = {
  scale: 1.1,
  transition: quickSpring,
};

export const iconButtonTap = {
  scale: 0.9,
  transition: quickSpring,
};

// Card hover animation
export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
};

// Subtle button hover (for inline/text buttons)
export const subtleButtonHover = {
  scale: 1.01,
  transition: quickSpring,
};

export const subtleButtonTap = {
  scale: 0.99,
  transition: quickSpring,
};
