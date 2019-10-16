import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UserProfile } from 'global-types';
import { useAppService } from 'contexts/app';
import { onGetSections, fetchUserProfile, getInProgressItems } from 'actions';
import { Modals } from 'contexts/page-modals';
import Loader from './loader';
import { Link, IconButton, Drawer, useTheme, Divider, List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectError } from 'selectors';
import { DRAWER_WIDTH, ETOOLS_ROOT_PATH } from 'global-constants';
import { selectMenuItem } from 'selectors/ui';
import { selectUserProfile, selectCountryName } from 'selectors/user';
import { getHeaderBackground, getHeaderTitle } from 'utils';
import logo from '../../public/etools-logo-color-white.svg';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    appBar: {
        borderBottom: `solid 1px ${theme.palette.divider}`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        backgroundColor: getHeaderBackground()
    },
    appName: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(0.75)
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
        padding: `${theme.spacing(14)}px ${theme.spacing(10)}px ${theme.spacing(5)}px`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -DRAWER_WIDTH
    },
    appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0
    },
    drawerPaper: {
        width: DRAWER_WIDTH
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-end',
        height: 64
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    etoolsLogo: {
        height: 32,
        marginRight: theme.spacing(2)
    }
}));

export interface AppFrameProps {
    children: ReactNode;
}

const AppFrame: React.FunctionComponent<AppFrameProps> = ({ children }) => {
    const userData: UserProfile = useSelector(selectUserProfile);
    const [open, setOpen] = React.useState<boolean>(false);

    const selectedIndex = useSelector(selectMenuItem);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const { storageService, sectionsService: service } = useAppService();
    const dispatch = useDispatch();
    const countryName = useSelector(selectCountryName);

    if (error) {
        throw error;
    }

    useEffect(() => {
        onGetSections(service, dispatch);
        fetchUserProfile(dispatch);
    }, []);

    useEffect(() => {
        getInProgressItems(storageService, countryName, dispatch);
    }, [countryName]);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    const styles = useStyles();
    const theme = useTheme();
    const isLoggedIn = Boolean(userData);
    return (
        <Modals>
            {loading ? <Loader /> : null}

            {isLoggedIn ? (
                <div className={styles.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        elevation={0}
                        className={clsx(styles.appBar, {
                            [styles.appBarShift]: open
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(styles.menuButton, open && styles.hide)}
                            >
                                <MenuIcon />
                            </IconButton>

                            <a href={ETOOLS_ROOT_PATH}>
                                <img className={styles.etoolsLogo} src={logo} alt="UNICEF logo" />
                            </a>

                            <Typography
                                className={styles.appName}
                                color="primary"
                                variant="h6"
                                noWrap
                            >
                                <Link color="inherit" href="/manage/">
                                    {getHeaderTitle()}
                                </Link>
                            </Typography>
                            <Typography color="primary">
                                {userData && userData.country.name}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={styles.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: styles.drawerPaper
                        }}
                    >
                        <div className={styles.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? (
                                    <ChevronLeftIcon />
                                ) : (
                                    <ChevronRightIcon />
                                )}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            {['Sections'].map((text, idx) => (
                                <ListItem selected={selectedIndex === idx} button key={text}>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <main
                        className={clsx(styles.content, {
                            [styles.contentShift]: open
                        })}
                    >
                        {children}
                    </main>
                </div>
            ) : (
                <Loader />
            )}
        </Modals>
    );
};

export default AppFrame;
