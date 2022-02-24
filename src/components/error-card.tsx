import { FallbackProps } from 'react-error-boundary';
import React from 'react';
import { Link, Button, Container, Paper, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { getHeaderBackground, getHeaderTitle } from 'utils';
import { ETOOLS_ROOT_PATH } from 'global-constants';
import logo from '../../public/etools-logo-color-white.svg';
import { useSummaryStyles } from '../pages/close-section/summary-styles';
import Box from './box';
import clsx from 'clsx';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        container: {
            marginTop: '100px',
        },
        boxItem: {
            marginBottom: theme.spacing(4)
        },
        link: {
            color: '#fff'
        },
        error: {
            backgroundColor: theme.palette.error.dark,
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.primary.contrastText
        },
        etoolsLogo: {
        height: 32,
        marginRight: theme.spacing(2)
        }
    })
);

export default function ErrorCard(errorProps: FallbackProps) {
    const styles = useStyles();
    const summarySyles = useSummaryStyles();
    const { error } = errorProps;

    const getMessage = (error: Error | string) => {
        if(error) {
            if (typeof (error) === 'string') {
                try {
                    const errObj = JSON.parse(error);
                    return errObj && errObj.message ? errObj.message : error;
                } catch (err) {
                    return error;
                }
            }
            return error && error.message ? error.message : error.toString();
        }
        return '';
    };

    return (
         <div className={styles.root}>
              <AppBar
                    position="fixed"
                    elevation={0}
                    className={clsx(styles.appBar)}
                >
                <Toolbar>

                    <a href={ETOOLS_ROOT_PATH}>
                        <img className={styles.etoolsLogo} src={logo} alt="UNICEF logo" />
                    </a>

                    <Typography
                        className={styles.appName}
                        color="primary"
                        variant="h6"
                        noWrap
                    >
                        <Link className={styles.link} href="/manage/">
                            {getHeaderTitle()}
                        </Link>
                    </Typography>
                </Toolbar>
              </AppBar>
              <Container maxWidth="sm" className={styles.container}>
                <Box column>
                    <Paper>
                        <Box className={clsx(summarySyles.heading, styles.error)} align="center">
                            <Typography className={clsx(summarySyles.titleSize, styles.link)} variant="body1">
                            An error occured
                            </Typography>
                        </Box>
                        <Typography className={summarySyles.infoMsg}>
                            {error && getMessage(error)}
                        </Typography>
                    <Box className={clsx(styles.boxItem)}justify="center">
                        <Link color="inherit" href="/manage/">
                                <Button size="medium" color="primary">Go Back</Button>
                            </Link>
                        </Box>
                    </Paper>
                </Box>
              </Container>
        </div>
    );
}
