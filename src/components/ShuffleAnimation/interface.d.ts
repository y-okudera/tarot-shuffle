interface Card {
  id: number;
  image: string;
}

interface ShuffleAnimationProps {
  cards: Card[];
  onAnimationEnd: () => void;
  onCardClick: (id: number) => void;
  animationState: "initial" | "shuffling" | "piled";
}
