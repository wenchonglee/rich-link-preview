import { Variants, motion, useAnimation } from "framer-motion";

/** @jsxImportSource @emotion/react */

const parentVariant: Variants = {
  initial: { opacity: 1 },
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariant: Variants = {
  initial: { opacity: 1 },
  animate: {
    y: 12,
    // height: "24px",
    // borderRadius: "8px",
    transition: {
      duration: 0.45,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const LoadingDots = () => {
  const controls = useAnimation();

  return (
    <motion.div
      css={{
        color: "white",
        display: "flex",
        gap: "8px",
      }}
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      <motion.div
        css={{
          height: "12px",
          width: "12px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
        variants={childVariant}
      />
      <motion.div
        css={{
          height: "12px",
          width: "12px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
        variants={childVariant}
      />
      <motion.div
        css={{
          height: "12px",
          width: "12px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
        variants={childVariant}
      />
    </motion.div>
  );
};
