// import React, { useState, useContext, ReactNode } from 'react';
// import classNames from 'classnames';
// import Link from 'redux-first-router-link';
// import { Theme, makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import MessageIcon from '@material-ui/icons/Message';
// import { MenuItem, GithubUser } from 'global-types';
// import { UserContext } from '../contexts/user';

// const drawerWidth = 240;

// const IconMapping = {
//     inbox: <InboxIcon/>,
//     starred: <MailIcon/>,
//     sent: <MessageIcon/>
// };

// // const useStyles = makeStyles((theme: Theme) => ({

// //     root: {
// //         display: 'flex'
// //     },
// //     appBar: {
// //         transition: theme.transitions.create(['margin', 'width'], {
// //             easing: theme.transitions.easing.sharp,
// //             duration: theme.transitions.duration.leavingScreen
// //         }),
// //         paddingRight: 16
// //     },
// //     appBarShift: {
// //         width: `calc(100% - ${drawerWidth}px)`,
// //         marginLeft: drawerWidth,
// //         transition: theme.transitions.create(['margin', 'width'], {
// //             easing: theme.transitions.easing.easeOut,
// //             duration: theme.transitions.duration.enteringScreen
// //         })
// //     },
// //     menuButton: {
// //         marginLeft: 12,
// //         marginRight: 20
// //     },
// //     hide: {
// //         display: 'none'
// //     },
// //     drawer: {
// //         width: drawerWidth,
// //         flexShrink: 0
// //     },
// //     drawerPaper: {
// //         width: drawerWidth
// //     },
// //     drawerHeader: {
// //         display: 'flex',
// //         alignItems: 'center',
// //         padding: '0 8px',
// //         ...theme.mixins.toolbar,
// //         justifyContent: 'flex-end'
// //     },
// //     content: {
// //         flexGrow: 1,
// //         padding: theme.spacing(8),
// //         transition: theme.transitions.create('margin', {
// //             easing: theme.transitions.easing.sharp,
// //             duration: theme.transitions.duration.leavingScreen
// //         }),
// //         marginLeft: -drawerWidth
// //     },
// //     contentShift: {
// //         transition: theme.transitions.create('margin', {
// //             easing: theme.transitions.easing.easeOut,
// //             duration: theme.transitions.duration.enteringScreen
// //         }),
// //         marginLeft: 0
// //     },
// //     grow: {
// //         flexGrow: 1
// //     }
// // }));

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex'
//     },
//     drawer: {
//         [theme.breakpoints.up('sm')]: {
//             width: drawerWidth,
//             flexShrink: 0
//         }
//     },
//     appBar: {
//         marginLeft: drawerWidth,
//         [theme.breakpoints.up('sm')]: {
//             width: `calc(100% - ${drawerWidth}px)`
//         }
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('sm')]: {
//             display: 'none'
//         }
//     },
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3)
//     }
// }));
// export interface AppFrameProps{
//     menuItems: MenuItem[];
//     children: ReactNode;
// }


// const AppFrame: React.FunctionComponent<AppFrameProps> = ({ menuItems, children }) => {
//     const [open, setOpen] = useState<boolean>(false);
//     const userData: GithubUser = useContext(UserContext);

//     const toggleDrawer = () => setOpen(!open);
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <CssBaseline />
//             <AppBar
//                 position="fixed"
//                 className={classNames(classes.appBar, {
//                     [classes.appBar]: open
//                 })}
//             >
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="Open drawer"
//                         onClick={toggleDrawer}
//                         className={classes.menuButton}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" color="inherit" noWrap>
//                         App One
//                     </Typography>
//                     <Typography variant="h6" color="inherit">
//                         {userData && `Welcome ${userData.name}`}
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 className={classes.drawer}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//                 classes={{
//                     paper: classes.drawerPaper
//                 }}
//                 onClose={toggleDrawer}
//             >
//                 <div className={classes.toolbar}>
//                     <IconButton onClick={toggleDrawer}>
//                         <ChevronLeftIcon />
//                     </IconButton>
//                 </div>
//                 <Divider />
//                 <List>
//                     {menuItems.map(({ text, icon, url }) => (
//                         <Link key={text} to={url}>
//                             <ListItem button>
//                                 <ListItemIcon>{IconMapping[icon]}</ListItemIcon>
//                                 <ListItemText primary={text} />
//                             </ListItem>
//                         </Link>
//                     ))}
//                 </List>
//             </Drawer>
//             <main className={classes.content}>
//                 <div className={classes.toolbar} />
//                 {children}
//             </main>
//         </div>
//     );
// };

// export default AppFrame;

import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

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

function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }
    console.log('theme', theme);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
            Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
}

export default PersistentDrawerLeft;
