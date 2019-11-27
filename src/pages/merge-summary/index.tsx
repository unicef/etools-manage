import React, { useEffect, useState, useCallback } from 'react';
import { Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import Box from 'components/box';
import { useAppService } from 'contexts/app';
import { onFetchMergeSummary, onSubmitMergeSections } from 'actions';
import { keys, isEmpty, prop, filter, compose, find, propEq, map, includes } from 'ramda';
import EntityConfigMapping from 'entities/config-map';
import { MergeSectionsPayload, ZippedEntityResults, Section } from 'entities/types';
import { ConfirmButton } from 'components/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { selectSections, selectMergedSection } from 'selectors';
import EntityChangesTable from 'components/entity-changes';
import { isArrayOfObjects } from 'utils';
import SuccessBox from 'components/success-box';

// TODO: lazy load on route
const MergeSummaryPage: React.FC = () => {
    const { sections: selected, newName } = queryString.parse(location.search);

    const { backendService: service, sectionsService } = useAppService();

    const dispatch = useDispatch();
    const mergedSection = useSelector(selectMergedSection) as Section;

    const [summary, setSummary] = useState();

    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await onFetchMergeSummary(service, selected as string, dispatch);
            setSummary(summary);
        };
        fetchSummary();
    }, []);

    const showSummaryList = summary && !mergedSection;

    const selectedSectionsIds = (selected as string).split(',').map(Number);
    const sections = useSelector(selectSections);

    const selectedSectionsNames = sections
        .filter(s => includes(s.id, selectedSectionsIds))
        .map(prop('name'))
        .join(', ');

    const onConfirm = async () => {
        const payload: MergeSectionsPayload = {
            /* eslint-disable-next-line */
            new_section_name: newName as string,
            /* eslint-disable-next-line */
            sections_to_merge: selectedSectionsIds
        };

        onSubmitMergeSections(sectionsService, payload, dispatch);
    };

    const getSuccessProps = () => ({
        title: 'Merge successful',
        message: `${selectedSectionsNames} are now ${mergedSection.name}`
    });

    const getOldSections = useCallback(
        (item, sectionsProp): string => {
            const sectionsOfEntity = prop(sectionsProp, item);

            if (Array.isArray(sectionsOfEntity) && isArrayOfObjects(sectionsOfEntity)) {
                return map(
                    prop('name'),
                    sectionsOfEntity.filter(({ id }) => selectedSectionsIds.includes(id))
                );
            } else if (Array.isArray(sectionsOfEntity)) {
                const idsOfSectionsChanging = filter(
                    (id: number) => selectedSectionsIds.includes(id),
                    sectionsOfEntity
                );
                return sections
                    .filter(({ id }: { id: number }) => idsOfSectionsChanging.includes(id))
                    .map(prop('name'))
                    .join(',');
            } else if (typeof sectionsOfEntity === 'object') {
                return prop('name', sectionsOfEntity);
            }
            const sectionChangingName = compose(
                prop('name'),
                find(propEq('id', sectionsOfEntity))
            )(sections);

            return sectionChangingName;
        },
        [sections]
    );

    const ConfirmBox = () => (
        <Box justify="between" align="center">
            <Typography variant="h6">
                {isEmpty(summary)
                    ? 'Merge does not affect other entities. Confirm to complete merge.'
                    : 'Confirm summary of changes'}
            </Typography>
            <Box align="center">
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Cancel</Button>
                </NavLink>
                <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
            </Box>
        </Box>
    );

    return (
        <Box column>
            {mergedSection ? <SuccessBox {...getSuccessProps()} /> : <ConfirmBox />}
            {showSummaryList &&
                keys(summary).map((entity: keyof ZippedEntityResults) => {
                    return (
                        <EntityChangesTable
                            key={entity as string}
                            // @ts-ignore
                            config={EntityConfigMapping[entity]} //TODO: fix this typing
                            getOldSections={getOldSections}
                            getNewSections={() => newName as string}
                            entity={summary[entity]}
                        />
                    );
                })}
        </Box>
    );
};

export default MergeSummaryPage;
