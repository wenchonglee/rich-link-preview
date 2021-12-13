const themeHSL = {
  hue: 200,
  saturation: "100%",
  lightness: "50%",
};

const baseTheme = {
  space: {
    xxs: ".25rem",
    xs: "0.5rem",
    s: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    xxl: "3rem",
  },
  fontSize: {
    xs: "0.75rem",
    s: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
  borderRadius: "8px",
};

export const darkTheme = {
  ...baseTheme,
  color: {
    surface1: `hsl(${themeHSL.hue} 10% 10%)`,
    surface2: `hsl(${themeHSL.hue} 10% 15%)`,
    surface3: `hsl(${themeHSL.hue} 5% 20%)`,
    surface4: `hsl(${themeHSL.hue} 5% 25%)`,
    surface5: `hsl(${themeHSL.hue} 5% 40%)`,
    text1: `hsl(${themeHSL.hue} 15% 85%)`,
    text2: `hsl(${themeHSL.hue} 15% 65%)`,
  },
};

export const lightTheme = {
  ...baseTheme,
  color: {
    surface1: `hsl(${themeHSL.hue} 20% 90%)`,
    surface2: `hsl(${themeHSL.hue} 10% 99%)`,
    surface3: `hsl(${themeHSL.hue} 10% 96%)`,
    surface4: `hsl(${themeHSL.hue} 10% 85%)`,
    surface5: `hsl(${themeHSL.hue} 10% 65%)`,
    text1: `hsl(${themeHSL.hue} ${themeHSL.saturation} 10%)`,
    text2: `hsl(${themeHSL.hue} calc(${themeHSL.saturation} / 2) 30%)`,
  },
};
