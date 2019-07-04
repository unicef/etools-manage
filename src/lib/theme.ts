

import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import { createMuiTheme } from '@material-ui/core/styles';


// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        secondary: {
            main: amber[700]
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff'
        },
        text: {
            primary: '#5f6368',
            secondary: '#202124'
        }
    }
});

export default theme;
