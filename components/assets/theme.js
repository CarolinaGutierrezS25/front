import { color } from "@rneui/base";
import { createTheme } from "@rneui/themed";

const theme = createTheme({
  components: {
    Card: {
      containerStyle: {
        margin: 8,
        marginBottom: 8,
        height: 200,
        maxHeight: 200,
        borderRadius: 15,
        shadowOffset: { width: -2, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: .2,
      },
    },
    Dialog: {
      backdropStyle: {
        backgroundColor: "rgba(100,100,100,.9)",
      },
      overlayStyle: {
        borderRadius: 15,
      },
      animationType:"fade"
    },
  },
  darkColors: {
    background: "#141414",
    primary: "#C967E0",
  },
  lightColors: {
    background: "#E0E0E0",
    primary: "#001d35",
  },
  mode: "light",
});

export default theme;
