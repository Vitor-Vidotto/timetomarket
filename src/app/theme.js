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
    "html, body, #__next": {
      height: "100%",
      margin: 0,
      padding: 0,
      background: "var(--background)",
      color: "var(--foreground)",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
