/** Shared cat assets — frame advances after each squish completes. */
export const catAssets = [
  "/assets/cat_1.svg",
  "/assets/cat_2.svg",
  "/assets/cat_3.svg",
  "/assets/cat_4.svg",
] as const;

export const botReplies = [
  "Mrow. It is so nice to make your acquaintance. It is not often I get pets here. How are you today?",
  "If you're wondering about the vibe coding... yes, I help. Are you curious about Next.js or Cursor workflows?",
  "Thank you for the pets. I am a very efficient conversationalist, but I am even better at reducing cognitive load. Do you have a project in mind?",
  'If you type "Arlo" or "e23"... well, you can\'t type, but I can still tell you about those systems. They are contextual, like us right now.',
] as const;

export const INITIAL_TYPING_MS = 780;

export const SQUISH_TRANSITION = {
  duration: 0.52,
  times: [0, 0.38, 1],
  ease: "easeOut" as const,
};

export const CROSSFADE_TRANSITION = {
  duration: 0.36,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const BUBBLE_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 26,
  mass: 0.82,
};

export const TEXT_SWAP_SPRING = {
  type: "spring" as const,
  stiffness: 480,
  damping: 32,
  mass: 0.65,
};
