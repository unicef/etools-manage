import { FallbackProps } from 'react-error-boundary';
import React from 'react';
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

export default function ErrorCard(errorProps: FallbackProps) {
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
