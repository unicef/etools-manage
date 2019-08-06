import React, { memo, useEffect, useState } from 'react';
import Box from 'components/box';
import { createStyles, Theme, Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ConfirmButton } from 'components/buttons';
import clsx from 'clsx';
import { buildResolvedProgressString } from 'lib/sections';
import { useAppService } from 'contexts/app';
import { selectCloseSectionPayload, selectSections } from 'selectors';
import { onFetchDataCloseSection, onEditModuleSections, onResetCloseSectionPayload } from './actions';
import { ModuleEntities } from 'entities/types';
import EntityConfigMapping from 'entities/config-map';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { keys, propEq, find, prop } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'components/loader';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemRoot: {
            minHeight: 32,
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.primary.contrastText

        },
        heading: {
            borderRadius: '8px 8px 0 0',
            padding: `14px ${theme.spacing(3)}px ${theme.spacing(1)}px`,
            color: theme.palette.primary.contrastText

        },
        lightSecondary: {
            backgroundColor: theme.palette.secondary.light
        },
        subtitle: {
            marginRight: theme.spacing(2)
        },
        moduleName: {
            width: '25%'
        }
    }));


export interface CloseSummaryProps {
    sectionId: string;
}

export interface SummaryItemProps {
    name: string;
    itemsResolved: number[];
    onEdit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const useModulesSummary = (id: string) => {
    const dispatch = useDispatch();

    const {
        backendService,
        storageService
    } = useAppService();

    const numResolvedByModule = useSelector(selectNumItemsResolved);
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
        sections
    };
};

export const CloseSectionsSummary: React.FC<CloseSummaryProps> = memo(({ sectionId }) => {
    const {
        modulesData,
        sections
    } = useModulesSummary(sectionId);


    const closingSection = prop('name', find(propEq('id', Number(sectionId)), sections));
    const styles = useStyles();
    return (
        <Container maxWidth="sm" id="cont">
            <Paper >
                <Box className={clsx(styles.heading, styles.lightSecondary)} align="center">
                    <Typography color="inherit" className={styles.subtitle} variant="subtitle1">Closing section </Typography>
                    <Typography color="inherit">
                        <code>{closingSection}</code>
                    </Typography>
                </Box>
                {
                    modulesData ? modulesData.map(
                        module => (
                            <ModuleSummaryItem key={module.name} {...module} />
                        )
                    ) :
                        <Spinner/>
                }
            </Paper>
        </Container>
    );
});


export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(({ name, itemsResolved, onEdit }) => {
    const styles = useStyles();

    return <Box className={styles.itemRoot} align="center" justify="between">

        <Typography color="inherit" className={styles.moduleName} variant="body2">{name}</Typography>

        <Typography color="inherit" variant="body2">Resolved items: {buildResolvedProgressString(itemsResolved)}</Typography>

        <ConfirmButton onClick={onEdit}>Edit</ConfirmButton>
    </Box>;
});

