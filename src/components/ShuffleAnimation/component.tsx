import { motion, Variants } from "framer-motion";
import styles from "./styles.module.css";

const Component = ({
  cards,
  onAnimationEnd,
  onCardClick,
  animationState,
}: ShuffleAnimationProps) => {
  const totalCards = cards.length;
  const piles = [0, 1, 2]; // 最終的に3つの束に分ける

  const handleAnimationComplete = (index: number) => {
    if (animationState !== "shuffling") return;

    // 最後のカードのアニメーションが終わったら `onAnimationEnd` を呼び出す
    if (index === totalCards - 1) {
      onAnimationEnd();
    }
  };

  const variants = (index: number): Variants => ({
    initial: {
      x: 0,
      y: 0,
      rotate: 0,
    },
    shuffling: {
      x: [
        Math.random() * 200 - 100, // -100px～100px
        Math.random() * 300 - 150, // -150px～150px
        Math.random() * 200 - 100, // -100px～100px
        piles[index % 3] * 150 - 150, // 最終的に -150px, 0px, 150pxの3つに収束
      ],
      y: [
        Math.random() * 100 - 50, // -50px～50px
        Math.random() * 150 - 75, // -75px～75px
        Math.random() * 100 - 50, // -50px～50px
        0, // 最終的に0に収束
      ],
      rotate: [
        Math.random() * 30 - 15, // -15度～15度
        Math.random() * 45 - 20, // -20度～25度
        Math.random() * 30 - 15, // -15度～15度
        0, // 最終的に0に収束
      ],
    },
    piled: {
      x: piles[index % 3] * 150 - 150,
      y: 0,
      rotate: 0,
    },
  });

  const isShuffling = animationState === "shuffling";
  const isClickable = !isShuffling;

  const transition = (index: number) => ({
    duration: isShuffling ? 3 : 0.5, // シャッフルアニメーションは3秒
    delay: isShuffling ? index * 0.05 * Math.exp(-index / 20) : 0, // シャッフルアニメーション時は遅延を指数関数的に調整
    ease: "easeInOut",
  });

  return (
    <div className={styles.shuffleContainer}>
      {cards.map((card, index) => (
        <motion.div
          animate={animationState}
          className={`${styles.card} ${isClickable ? styles.clickable : ""}`}
          initial="initial"
          key={card.id}
          onClick={() => isClickable && onCardClick(card.id)}
          onAnimationComplete={() => handleAnimationComplete(index)}
          transition={transition(index)}
          variants={variants(index)}
        >
          <div
            className={styles.cardImage}
            style={{ backgroundImage: `url(${card.image})` }}
          ></div>
        </motion.div>
      ))}
    </div>
  );
};

export default Component;
