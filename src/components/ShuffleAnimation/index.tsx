import Component from "./component";

const ShuffleAnimation = ({
  cards,
  onAnimationEnd,
  onCardClick,
  animationState,
}: ShuffleAnimationProps) => {
  return (
    <Component
      cards={cards}
      onAnimationEnd={onAnimationEnd}
      onCardClick={onCardClick}
      animationState={animationState}
    />
  );
};

export default ShuffleAnimation;
