import React, { useState, useContext, ReactNode } from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { User } from 'global-types';
import { UserContext } from '../contexts/user';
import { name } from '../../package.json';
const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        borderBottom: `solid 1px ${theme.palette.divider}`
    },
    appName: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));


export interface AppFrameProps{
    children: ReactNode;
}


const AppFrame: React.FunctionComponent<AppFrameProps> = ({ children }) => {
    const userData: User = useContext(UserContext);
    const styles = useStyles({});

    return (
        <div className={styles.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                elevation={0}
                className={styles.appBar}
            >
                <Toolbar >
                    <Typography
                        className={styles.appName}
                        color="textSecondary"
                        variant="h6" noWrap>
                        {name}
                    </Typography>
                    <Typography color="textSecondary">
                        {userData && `Welcome, ${userData.name}`}
                    </Typography>
                </Toolbar>
            </AppBar>

            <main
                className={clsx(styles.content)}
            >
                <div className={styles.drawerHeader} />
                {children}
            </main>
        </div>
    );
};

export default AppFrame;

