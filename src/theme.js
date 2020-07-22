import { createMuiTheme } from "@material-ui/core/styles";
import yellow from '@material-ui/core/colors/yellow';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: yellow['600'],
    },
    background: {
      default: "#fff",
    },
    text: {
      main: '#fff'
    }
  },
});

export default theme;
