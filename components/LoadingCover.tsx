import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import { LoadingDots } from "./LoadingDots";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

const variants = {
  initial: { backgroundColor: "#000", opacity: 1 },
  reveal: {
    opacity: 0,
    transition: {
      duration: 0.75,
    },
  },
};

export const LoadingCover: React.FC<{ isLoading: boolean }> = ({ children, isLoading }) => {
  const controls = useAnimation();
  useEffect(() => {
    const runAnimation = async () => {
      if (!isLoading) {
        await controls.start("reveal");
      }
    };

    runAnimation();
  }, [controls, isLoading]);

  return (
    <motion.div
      animate={controls}
      variants={variants}
      initial="initial"
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        borderRadius: "6px",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingDots />
      {children}
    </motion.div>
  );
};
