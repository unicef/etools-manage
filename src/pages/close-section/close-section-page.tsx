import React, { memo, useEffect, useState } from 'react';
import Box from 'components/box';
import { Typography, Paper, Container, Button } from '@material-ui/core';
import clsx from 'clsx';
import { buildResolvedProgressString } from 'lib/sections';
import {
    selectCloseSectionPayload,
    selectSections,
    selectCurrentActiveSectionName
} from 'selectors';
import { onEditModuleSections, onSetActionBar } from './actions';
import { ModuleEntities, ResolvedRatio } from 'entities/types';
import EntityConfigMapping from 'entities/config-map';
import { selectNumItemsResolved, selectTotalProgress } from 'selectors/num-items-resolved';
import { keys, isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useSummaryStyles } from './summary-styles';
import ResolvedProgress from 'components/resolved-progress-bar';
import CloseSectionSummary from './close-section-summary';
import { ACTION_BAR_DISABLED_ACTIONS, ACTION_BAR_CONNECTED, ACTION_BAR_REVIEW } from './constants';
import ActionBarDisabled from './action-bar/disabled-actions';
import ActionBarConnectedConfirm from './action-bar/connected-confirm';
import ActionBarReviewReady from './action-bar/review-ready';
import {
    selectCloseSectionActionBar,
    selectViewCloseSummary,
    deriveCloseSectionActionBar
} from 'selectors/ui';
import { CloseSectionActionsMap } from './types';
import { selectNamesFromsplit } from 'selectors/split-section';
import { deriveCloseSectionFetched } from 'selectors/close-section-payload';

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

    const [modulesData, setModulesData] = useState<SummaryItemProps[] | undefined>();

    const setActionBarPayload = useSelector(deriveCloseSectionActionBar);

    useEffect(() => {
        onSetActionBar(dispatch, setActionBarPayload);
    }, [setActionBarPayload]);

    useEffect(() => {
        if (closeSectionPayload) {
            setModulesData(
                keys(closeSectionPayload)
                    .filter((key: keyof ModuleEntities) => !isEmpty(closeSectionPayload[key]))
                    .map(
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

export const CloseSectionsPage: React.FC = () => {
    const { modulesData } = useModulesSummary();

    const actionBar = useSelector(selectCloseSectionActionBar);

    const viewCloseSummary = useSelector(selectViewCloseSummary);

    const ActionBar = ActionBarMapping[actionBar];

    return (
        <Container maxWidth="md">
            {ActionBar ? <ActionBar /> : null}
            {viewCloseSummary ? (
                <CloseSectionSummary />
            ) : (
                <ModulesSummary modulesData={modulesData} />
            )}
        </Container>
    );
};

export interface ModulesSummaryProps {
    modulesData: SummaryItemProps[] | undefined;
}

export const ModulesSummary: React.FC<ModulesSummaryProps> = ({ modulesData }) => {
    const progress = useSelector(selectTotalProgress);
    const closingSection = useSelector(selectCurrentActiveSectionName);
    const styles = useSummaryStyles();
    const namesFromSplit = useSelector(selectNamesFromsplit);

    const hasData = Boolean(modulesData && modulesData.length);
    const dataFetched = useSelector(deriveCloseSectionFetched);
    const isSplitSection = Boolean(namesFromSplit.length);

    const titleText = isSplitSection ? 'Split Section' : 'Close Section';

    return (
        <Box column>
            <Box align="center" className={styles.section}>
                <Typography
                    color="inherit"
                    className={clsx(
                        styles.subtitle,
                        styles.headingItem,
                        styles.titleAction,
                        styles.titleSize
                    )}
                    variant="body1"
                >
                    {titleText}
                </Typography>
                <Typography
                    className={clsx(styles.headingItem, styles.titleSize)}
                    variant="body1"
                    color="inherit"
                >
                    <code>{closingSection}</code>
                </Typography>

                {isSplitSection ? (
                    <Box align="center">
                        <Typography
                            className={clsx(
                                styles.headingItem,
                                styles.titleAction,
                                styles.titleSize
                            )}
                            color="inherit"
                            variant="body1"
                        >
                            into
                        </Typography>

                        <Typography className={styles.titleSize} variant="body1" color="inherit">
                            <code>{namesFromSplit.join(' & ')}</code>
                        </Typography>
                    </Box>
                ) : null}
            </Box>

            <Paper>
                <Box className={clsx(styles.heading, styles.lightSecondary)} align="center">
                    <Typography color="inherit" className={clsx(styles.titleSize)} variant="body1">
                        Modules Items Affected
                    </Typography>
                </Box>
                {modulesData
                    ? modulesData.map(module => <ModuleSummaryItem key={module.name} {...module} />)
                    : null}
                {dataFetched && !hasData && (
                    <Typography className={styles.infoMsg}>
                        No entities are affected by closing this section.
                    </Typography>
                )}
            </Paper>

            {hasData && <ResolvedProgress progress={progress} />}
        </Box>
    );
};

export const ModuleSummaryItem: React.FC<SummaryItemProps> = memo(
    ({ name, itemsResolved, onEdit }) => {
        const styles = useSummaryStyles();

        return (
            <Box
                className={clsx(styles.itemRoot, styles.itemSpacing)}
                align="center"
                justify="between"
            >
                <Typography color="inherit" className={styles.moduleCell} variant="body2">
                    {name}
                </Typography>

                <Typography color="inherit" className={styles.flex2} variant="body2">
                    Resolved items: {buildResolvedProgressString(itemsResolved)}
                </Typography>

                <Button variant="outlined" onClick={onEdit}>
                    Edit
                </Button>
            </Box>
        );
    }
);
