"use client";

import ShuffleAnimation from "@/components/ShuffleAnimation";
import { useState } from "react";

const Component = () => {
  const [animationState, setAnimationState] = useState<
    "initial" | "shuffling" | "piled"
  >("initial");
  const cardCount = 78;
  const [cards] = useState<Card[]>(
    Array.from({ length: cardCount }, (_, i) => ({
      id: i + 1,
      image: "/images/card_back.png",
    }))
  );

  /**
   * アニメーションが終わったら呼ばれる関数
   */
  const handleAnimationEnd = () => {
    setAnimationState("piled");
  };

  /**
   * カードがクリックされたときに呼ばれる関数
   */
  const handleCardClick = (id: number) => {
    // 'initial' なら 'shuffling' に、'piled' なら 'initial' に戻す
    animationState === "initial"
      ? setAnimationState("shuffling")
      : animationState === "piled"
      ? setAnimationState("initial")
      : undefined;
  };

  return (
    <ShuffleAnimation
      cards={cards}
      onAnimationEnd={handleAnimationEnd}
      onCardClick={handleCardClick}
      animationState={animationState}
    />
  );
};

export default Component;
