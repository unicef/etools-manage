import React, { memo, useEffect, useState, lazy, Suspense } from 'react';
import Box from 'components/box';
import { Typography, Paper, Container, Button } from '@material-ui/core';
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
import LoadingFallback from 'components/loading-fallback';
import { useSummaryStyles } from './summary-styles';
import { BackIconButton } from 'components/buttons';
import ResolvedProgress from 'components/resolved-progress-bar';

const ConnectedConfirmButton = lazy(() => import('components/connected-submit-payload-button'));

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

    const styles = useSummaryStyles();

    const closingSection = prop('name', find(propEq('id', Number(sectionId)), sections));
    const hasData = Boolean(modulesData && modulesData.length);


    return (
        <Container maxWidth="sm" id="cont">
            <Box className={styles.section} justify="between" align="center">
                <BackIconButton />
                {progress < 100 ?
                    <Button variant="outlined" disabled>Confirm</Button> :
                    <Suspense fallback={<LoadingFallback/>}>
                        <ConnectedConfirmButton />
                    </Suspense>
                }
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
                {!hasData && <Typography className={styles.infoMsg} >No entities are affected by closing this section.</Typography>}

            </Paper>
            {hasData && <ResolvedProgress progress={progress} />
            }
        </Container>
    );
});


export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(({ name, itemsResolved, onEdit }) => {
    const styles = useSummaryStyles();

    return <Box className={clsx(styles.itemRoot, styles.itemSpacing)} align="center" justify="between">

        <Typography color="inherit" className={styles.moduleCell} variant="body2">{name}</Typography>

        <Typography color="inherit" className={styles.flex2} variant="body2">Resolved items: {buildResolvedProgressString(itemsResolved)}</Typography>

        <Button variant="outlined" onClick={onEdit}>Edit</Button>
    </Box>;
});

