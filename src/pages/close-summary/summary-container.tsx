import React, { memo, useEffect, useState } from 'react';
import Box from 'components/box';
import { createStyles, Theme, Typography, Paper, Container, LinearProgress, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BackIcon from '@material-ui/icons/ArrowBack';

import { ConfirmButton } from 'components/buttons';
import clsx from 'clsx';
import { buildResolvedProgressString } from 'lib/sections';
import { useAppService } from 'contexts/app';
import { selectCloseSectionPayload, selectSections } from 'selectors';
import { onFetchDataCloseSection, onEditModuleSections, onResetCloseSectionPayload } from './actions';
import { ModuleEntities, ResolvedRatio } from 'entities/types';
import EntityConfigMapping from 'entities/config-map';
import { selectNumItemsResolved, selectTotalProgress } from 'selectors/num-items-resolved';
import { keys, propEq, find, prop } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'components/loader';
import { lighten } from '@material-ui/core/styles';
import { onSetModuleEditingName } from 'slices/root-store';
import { useIconButtonStyles } from 'components/table/styles';
import { withRouter } from 'react-router';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemRoot: {
            minHeight: 32,
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.primary.contrastText

        },
        titleSize: {
            fontSize: 16
        },
        heading: {
            borderRadius: '8px 8px 0 0',
            padding: `14px ${theme.spacing(3)}px ${theme.spacing(1)}px`,
            color: theme.palette.primary.contrastText
        },
        lightSecondary: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'rgb(255, 207, 127)'
        },
        subtitle: {
            marginRight: theme.spacing(2)
        },
        progressBar: {
            margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px`
        },
        moduleName: {
            width: '25%'
        },
        infoMsg: {
            padding: theme.spacing(3)
        },
        section: {
            marginBottom: theme.spacing(3)
        }
    }));

const useProgressStyles = makeStyles((theme: Theme) => createStyles(
    {
        root: {
            height: 10,
            borderRadius: 8,
            backgroundColor: lighten(theme.palette.secondary.main, 0.5)
        },
        bar: {
            borderRadius: 20,
            backgroundColor: theme.palette.secondary.main
        }
    }
));

export interface CloseSummaryProps {
    sectionId: string;
}

export interface SummaryItemProps {
    name: string;
    itemsResolved: ResolvedRatio;
    onEdit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const useModulesSummary = (id: string) => {
    const dispatch = useDispatch();

    const {
        backendService,
        storageService
    } = useAppService();

    const numResolvedByModule = useSelector(selectNumItemsResolved);
    const progress = useSelector(selectTotalProgress);
    const sections = useSelector(selectSections);
    const closeSectionPayload = useSelector(selectCloseSectionPayload);
    const [modulesData, setModulesData] = useState<SummaryItemProps[]| undefined>();

    useEffect(() => {
        onResetCloseSectionPayload(dispatch);
        onFetchDataCloseSection({ backendService, storageService }, id, dispatch);
    }, [id]);


    useEffect(() => {
        if (closeSectionPayload) {
            setModulesData(
                keys(closeSectionPayload).map(
                    (entityName: keyof ModuleEntities): SummaryItemProps => ({
                        name: EntityConfigMapping[entityName].moduleName,
                        itemsResolved: numResolvedByModule[entityName],
                        onEdit: () => onEditModuleSections(entityName, dispatch)
                    })
                )
            );
        }
    }, [closeSectionPayload]);

    return {
        modulesData,
        progress,
        sections
    };
};


export const CloseSectionsSummary: React.FC<CloseSummaryProps> = memo(({ sectionId }) => {
    const {
        modulesData,
        sections,
        progress
    } = useModulesSummary(sectionId);

    const dispatch = useDispatch();
    const styles = useStyles();
    const iconStyles = useIconButtonStyles();
    console.log('TCL: modules', modulesData);

    const closingSection = prop('name', find(propEq('id', Number(sectionId)), sections));
    const progressStyles = useProgressStyles();
    const hasData = modulesData && modulesData.length;

    const BackButton = withRouter(({ history }) => (
        <IconButton
            className={iconStyles.icon}
            size="medium"
            onClick={() => history.push('/')}>
            <BackIcon fontSize="large"/>
        </IconButton>
    ));

    return (
        <Container maxWidth="sm" id="cont">
            <Box className={styles.section} justify="between" align="center">
                <BackButton />
                <ConfirmButton onClick={() => {}}>Confirm</ConfirmButton>
            </Box>
            <Paper>
                <Box className={clsx(styles.heading, styles.lightSecondary)} align="center">
                    <Typography
                        color="inherit"
                        className={clsx(styles.subtitle, styles.titleSize)}
                        variant="body1">Closing section </Typography>
                    <Typography
                        variant="body1"
                        color="inherit">
                        <code>{closingSection}</code>
                    </Typography>
                </Box>
                {
                    modulesData ?
                        modulesData.map(
                            module => (
                                <ModuleSummaryItem key={module.name} {...module} />
                            )
                        )
                        :
                        <Spinner/>
                }

            </Paper>
            {hasData ? <Box column >
                <LinearProgress
                    classes={{ ...progressStyles }}
                    className={styles.progressBar}
                    variant="determinate"
                    color="secondary"
                    value={progress}
                />
                <Typography align="center">Resolved items progress</Typography>
            </Box>
                :
                <Typography className={styles.infoMsg} >No entities are affected by closing this section.</Typography>

            }
        </Container>
    );
});


export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(({ name, itemsResolved, onEdit }) => {
    const styles = useStyles();

    return <Box className={styles.itemRoot} align="center" justify="between">

        <Typography color="inherit" className={styles.moduleName} variant="body2">{name}</Typography>

        <Typography color="inherit" variant="body2">Resolved items: {buildResolvedProgressString(itemsResolved)}</Typography>

        <Button variant="outlined" onClick={onEdit}>Edit</Button>
    </Box>;
});

