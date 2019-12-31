import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Paper } from '@material-ui/core';
import {
    selectCurrentActiveSectionName,
    selectSections,
    selectCloseSectionPayload
} from 'selectors';
import { selectTotalProgress, selectNumItemsResolved } from 'selectors/num-items-resolved';
import ResolvedProgress from 'components/resolved-progress-bar';
import { useSummaryStyles } from './summary-styles';
import { selectNamesFromsplit } from 'selectors/split-section';
import { deriveCloseSectionFetched } from 'selectors/close-section-payload';
import Box from 'components/box';
import clsx from 'clsx';
import { deriveCloseSectionActionBar } from 'selectors/ui';
import { EntitiesAffected } from 'entities/types';
import { onSetActionBar, onEditModuleSections } from './actions';
import { isEmpty, keys } from 'ramda';
import EntityConfigMapping from 'entities/config-map';
import { ModuleSummaryItem, SummaryItemProps } from './modules-summary-item';

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
                    ? modulesData.map(module => (
                          <ModuleSummaryItem
                              data-testid={module.name}
                              key={module.name}
                              {...module}
                          />
                      ))
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

export const useModulesSummary = () => {
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
                    .filter((key: keyof EntitiesAffected) => !isEmpty(closeSectionPayload[key]))
                    .map(
                        (entityName: keyof EntitiesAffected): SummaryItemProps => ({
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
