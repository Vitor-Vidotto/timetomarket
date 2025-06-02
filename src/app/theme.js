import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    html: {
      minHeight: "100%",
    },

    body: {
      minHeight: "100%",
      margin: 0,
      // Usa as variáveis CSS definidas no CSS externo, sem sobrescrever
      backgroundImage: "var(--background)",
      color: "var(--foreground)",
      transition: "background-image 1s ease, color 1s ease",
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
