import React, { useState, useContext, ReactNode } from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MessageIcon from '@material-ui/icons/Message';
import { MenuItem, GithubUser } from 'global-types';
import { UserContext } from '../contexts/user';
import { name } from '../../package.json';
const drawerWidth = 240;

const IconMapping = {
    inbox: <InboxIcon/>,
    starred: <MailIcon/>,
    sent: <MessageIcon/>
};


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
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
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}));


export interface AppFrameProps{
    children: ReactNode;
}


const AppFrame: React.FunctionComponent<AppFrameProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const userData: GithubUser = useContext(UserContext);
    const toggleDrawer = () => setOpen(!open);
    const styles = useStyles({});

    return (
        <div className={styles.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(styles.appBar, {
                    [styles.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        className={clsx(styles.menuButton, open && styles.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={styles.appName} variant="h6" color="inherit" noWrap>
                        {name}
                    </Typography>
                    <Typography>
                        {userData && `Welcome, ${userData.name}`}
                    </Typography>
                </Toolbar>
            </AppBar>

            <main
                className={clsx(styles.content, {
                    [styles.contentShift]: open
                })}
            >
                <div className={styles.drawerHeader} />
                {children}
            </main>
        </div>
    );
};

export default AppFrame;

