import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    space: {
      xxs: string;
      xs: string;
      s: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontSize: {
      xs: string;
      s: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      s: number;
      md: number;
      lg: number;
      xl: number;
    };
    borderRadius: string;

    color: {
      surface1: string;
      surface2: string;
      surface3: string;
      surface4: string;
      surface5: string;
      text1: string;
      text2: string;
    };
  }
}
