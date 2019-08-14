import React, { memo, useEffect, useState, lazy, Suspense, useCallback, useRef } from 'react';
import Box from 'components/box';
import { Typography, Paper, Container, Button } from '@material-ui/core';
import clsx from 'clsx';
import { buildResolvedProgressString } from 'lib/sections';
import { useAppService } from 'contexts/app';
import { selectCloseSectionPayload, selectSections } from 'selectors';
import { onFetchDataCloseSection, onEditModuleSections, onResetCloseSectionPayload, onSetActionBar } from './actions';
import { ModuleEntities, ResolvedRatio } from 'entities/types';
import EntityConfigMapping from 'entities/config-map';
import { selectNumItemsResolved, selectTotalProgress } from 'selectors/num-items-resolved';
import { keys, propEq, find, prop } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'components/loader';
import { useSummaryStyles } from './summary-styles';
import { BackIconButton, ConfirmButton } from 'components/buttons';
import ResolvedProgress from 'components/resolved-progress-bar';
import CloseSectionSummary from './close-section-summary';
import LoadingFallback from 'components/loading-fallback';
import { ACTION_BAR_DISABLED_ACTIONS, ACTION_BAR_CONNECTED, ACTION_BAR_REVIEW } from './constants';
import ActionBarDisabled from './action-bar/disabled-actions';
import ActionBarConnectedConfirm from './action-bar/connected-confirm';
import ActionBarReviewReady from './action-bar/review-ready';
import { selectCloseSectionActionBar, selectViewCloseSummary, deriveCloseSectionActionBar } from 'selectors/ui';
import { CloseSectionActionsMap } from './types';

const ConnectedConfirmButton = lazy(() => import('components/connected-submit-payload-button'));


export interface CloseSummaryProps {
    sectionId: string;
}

export interface SummaryItemProps {
    name: string;
    itemsResolved: ResolvedRatio;
    onEdit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const useModulesSummary = () => {
    const dispatch = useDispatch();

    const numResolvedByModule = useSelector(selectNumItemsResolved);

    const sections = useSelector(selectSections);

    const closeSectionPayload = useSelector(selectCloseSectionPayload);

    const [modulesData, setModulesData] = useState<SummaryItemProps[]| undefined>();

    const setActionBarPayload = useSelector(deriveCloseSectionActionBar);

    useEffect(() => {
        onSetActionBar(dispatch, setActionBarPayload);
    }, [setActionBarPayload]);

    useEffect(() => {
        if (closeSectionPayload) {
            console.log('closesecitonpayload');
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


const ActionBarMapping: CloseSectionActionsMap = {
    [ACTION_BAR_DISABLED_ACTIONS]: ActionBarDisabled,
    [ACTION_BAR_CONNECTED]: ActionBarConnectedConfirm,
    [ACTION_BAR_REVIEW]: ActionBarReviewReady
};

export const CloseSectionsPage: React.FC<CloseSummaryProps> = ({ sectionId }) => {

    const {
        modulesData,
        sections
    } = useModulesSummary();


    const closingSection = prop('name', find(propEq('id', Number(sectionId)), sections));

    const actionBar = useSelector(selectCloseSectionActionBar);

    const viewCloseSummary = useSelector(selectViewCloseSummary);

    const ActionBar = ActionBarMapping[actionBar];

    return (
        <Container maxWidth="md">
            {ActionBar ? <ActionBar/> : null}
            {
                viewCloseSummary ?
                    <CloseSectionSummary/> :
                    <ModulesSummary modulesData={modulesData} closingSection={closingSection}/>
            }

        </Container>
    );
};

// @ts-ignore
CloseSectionsPage.whyDidYouRender = true;

export interface ModulesSummaryProps {
    modulesData: SummaryItemProps[] | undefined;
    closingSection: string;
}

export const ModulesSummary: React.FC<ModulesSummaryProps> = ({ closingSection, modulesData }) => {
    const progress = useSelector(selectTotalProgress);

    const styles = useSummaryStyles();
    const hasData = Boolean(modulesData && modulesData.length);

    return (
        <Box column>
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

            {hasData && <ResolvedProgress progress={progress} />}
        </Box>);
};


export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(({ name, itemsResolved, onEdit }) => {
    const styles = useSummaryStyles();

    return <Box className={clsx(styles.itemRoot, styles.itemSpacing)} align="center" justify="between">

        <Typography color="inherit" className={styles.moduleCell} variant="body2">{name}</Typography>

        <Typography color="inherit" className={styles.flex2} variant="body2">Resolved items: {buildResolvedProgressString(itemsResolved)}</Typography>

        <Button variant="outlined" onClick={onEdit}>Edit</Button>
    </Box>;
});

