import React, { useContext, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { User } from 'global-types';
import { UserContext } from '../contexts/user';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { onGetSections } from 'actions';
import { Modals } from 'contexts/page-modals';
import { AppServices } from 'services';
import Loader from './loader';
import { Link } from '@material-ui/core';

const PAGE_TITLE = process.env.REACT_APP_PAGE_TITLE;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
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
        maxWidth: 1200,
        marginTop: theme.spacing(14),
        padding: `0 ${theme.spacing(10)}px`
    }
}));

export interface AppFrameProps{
    children: ReactNode;
}

const AppFrame: React.FunctionComponent<AppFrameProps> = ({ children }) => {
    const userData: User = useContext(UserContext);
    const { sectionsService: service }: AppServices = useAppService();
    const dispatch = useAppDispatch();
    const { loading } = useAppState();
    const { error } = useAppState();

    if (error) {
        throw error;
    }
    // TODO: move this to sections list page
    useEffect(() => {
        onGetSections(service, dispatch);
    }, []);

    const styles = useStyles({});

    return (
        <Modals>
            {loading && <Loader />}

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
                            <Link color="inherit" href="./">{PAGE_TITLE}</Link>
                        </Typography>
                        <Typography color="textPrimary">
                            {userData && userData.country.name}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <main
                    className={clsx(styles.content)}
                >
                    <div className={styles.mainHeader} />
                    {children}
                </main>
            </div>
        </Modals>
    );
};

export default AppFrame;

