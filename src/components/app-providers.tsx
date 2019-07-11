import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import ErrorBoundary from 'react-error-boundary';
import { ProviderStore } from 'global-types';
import UserProvider from '../contexts/user';
import { AppStoreProvider } from 'contexts/app';
import { LoadingProvider } from 'contexts/loading';
import theme from '../lib/theme';
import { Paper, Card, CardActionArea, CardMedia, CardContent, makeStyles, Typography, CardActions, Button, Container } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: 345
    },
    media: {
        height: 140
    }
});

export function ErrorCard({ error: { message } }: FallbackProps) {
    const classes = useStyles({});

    return (
        <Container ><Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
        // image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
        An error occured
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {message}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Go Back
                </Button>

            </CardActions>
        </Card></Container>
    );
}
interface FallbackProps {
    error?: Error;
    message?: string;
}


function CustomFallbackComponent({ error, message }: FallbackProps) {
    return (
        <Paper>
            {`An error was thrown: "${error}". ${message}`}
        </Paper>
    );
}

const AppProviders: React.FC<ProviderStore> = ({ children }) => {
    console.log(theme);
    return (
        <ErrorBoundary FallbackComponent={ErrorCard}>
            <ThemeProvider theme={theme}>
                <LoadingProvider>
                    <UserProvider >
                        <AppStoreProvider >
                        <>{children}</>
                        </AppStoreProvider>
                    </UserProvider>
                </LoadingProvider>
            </ThemeProvider>
        </ErrorBoundary>);
};

export default AppProviders;

