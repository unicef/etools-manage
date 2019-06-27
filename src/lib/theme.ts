// import { createMuiTheme } from '@material-ui/core/styles';

// export const defaultTheme = createMuiTheme();


import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff'
        },
        text: {
            secondary: '#5f6368'
        }
    }
});

export default theme;
