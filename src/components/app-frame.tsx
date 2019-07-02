import React, { useState, useContext, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { User } from 'global-types';
import { UserContext } from '../contexts/user';
import { SectionsService } from 'services/section';
import { useAppService, useAppDispatch } from 'contexts/app';
import { onGetSections } from 'actions';


const PAGE_TITLE = process.env.REACT_APP_PAGE_TITLE;

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
    mainHeader: {
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
    const service: SectionsService = useAppService();
    const dispatch = useAppDispatch();
    useEffect(() => {
        onGetSections(service, dispatch);
    }, []);
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
                        color="textPrimary"
                        variant="h6" noWrap>
                        {PAGE_TITLE}
                    </Typography>
                    <Typography color="textSecondary">
                        {userData && `Welcome, ${userData.name}`}
                    </Typography>
                </Toolbar>
            </AppBar>

            <main
                className={clsx(styles.content)}
            >
                <h2>CHECK</h2>
                <div className={styles.mainHeader} />
                {children}
            </main>
        </div>
    );
};

export default AppFrame;

