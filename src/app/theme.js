import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    ":root": {
      "--background": props.colorMode === "dark"
        ? "linear-gradient(to bottom right, #1f2937, #000000, #1f2937)"
        : "linear-gradient(to bottom right, #f5deb3, #dfc28e, #f5deb3)",
      "--foreground": props.colorMode === "dark" ? "#f5f5f5" : "#333333",
      "--navbar-background": props.colorMode === "dark" ? "#1a1a1a" : "#ededed",
      "--navbar-text": props.colorMode === "dark" ? "#f5f5f5" : "#121212",
      "--title-text": props.colorMode === "dark" ? "#f5f5f5" : "#121212",
    },
    body: {
      bg: "transparent", // vai usar o --background no CSS
      color: "var(--foreground)",
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
