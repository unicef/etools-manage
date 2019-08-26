import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import ErrorBoundary, { FallbackProps } from 'react-error-boundary';
import { ProviderStore } from 'global-types';
// import UserProvider from '../contexts/user';
import { AppStoreProvider } from 'contexts/app';
import theme from '../lib/theme';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    makeStyles,
    Typography,
    CardActions,
    Button,
    Container
} from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: 345
    },
    media: {
        height: 140
    }
});
export function ErrorCard(errorProps: FallbackProps) {
    const classes = useStyles({});
    const { error } = errorProps;
    return (
        <Container>
            <Card className={classes.card}>
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
                            {error && error.toString()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Go Back
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
}

const AppProviders: React.FC<ProviderStore> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorCard}>
            <ThemeProvider theme={theme}>
                <AppStoreProvider>
                    <>{children}</>
                </AppStoreProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default AppProviders;
