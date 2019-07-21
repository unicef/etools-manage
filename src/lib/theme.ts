

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
    },
    overrides: {
        MuiInputBase: {
            root: {
                lineHeight: '20px'
            },
            input: {
                padding: 8
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 8
            },
            elevation1: {
                boxShadow: '0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)'
            }
        },
        MuiTypography: {
            body1: {
                fontSize: 14
            }
        }
    }

});

export default theme;
