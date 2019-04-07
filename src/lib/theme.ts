import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        h3: {
            fontSize: '2em',
            margin: '0.8em 0'
        }
    }
});
