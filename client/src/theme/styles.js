import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#CFD6E8",
      200: "#B0BCD8",
      300: "#91A1C9",
      400: "#7387BA",
      500: "#435789",
      600: "#435789",
      700: "#324167",
      800: "#222B44",
      900: "#111622",
    },
    brandScheme: {
      100: "#E9E3FF",
      200: "#7551FF",
      300: "#7551FF",
      400: "#7551FF",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    brandTabs: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#CFD6E8",
      100: "#CFD6E8",
      200: "#B0BCD8",
      300: "#91A1C9",
      400: "#7387BA",
      500: "#435789",
      600: "#435789",
      700: "#324167",
      800: "#222B44",
      900: "#111622",
    },
    gray: {
      100: "#FAFCFE",
      200: "#F5F5F5",
      300: "#EBEBEB",
      400: "#E0E0E0",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: mode("navy.900", "secondaryGray.300")(props),
      },
      select: {
        color: mode("navy.900", "secondaryGray.300")(props),
      },
      option: {
        color: mode("navy.900", "secondaryGray.300")(props),
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
