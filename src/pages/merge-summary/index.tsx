import React, { useEffect, useState, useCallback } from 'react';
import { Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import Box from 'components/box';
import { useAppService } from 'contexts/app';
import { onFetchMergeSummary, onSubmitMergeSections } from 'actions';
import { keys, isEmpty, prop, filter, compose, find, propEq, map } from 'ramda';
import EntityConfigMapping from 'entities/config-map';
import { MergeSectionsPayload, ZippedEntityResults } from 'entities/types';
import { ConfirmButton, BackToMainButton } from 'components/buttons';
import { SectionBox } from 'components/section-box';
import { useSelector, useDispatch } from 'react-redux';
import { selectMergeSection, selectSections } from 'selectors';
import { useReviewTableStyles } from 'components/modals/styles';
import EntityChangesTable from 'components/entity-changes';
import { isArrayOfObjects } from 'utils/helpers';


// TODO: lazy load on route
const MergeSummaryPage: React.FC = () => {
    const {
        sections: selected,
        newName
    } = queryString.parse(location.search);

    const {
        backendService: service,
        sectionsService
    } = useAppService();

    const dispatch = useDispatch();
    const mergedSection = useSelector(selectMergeSection);
    const [summary, setSummary] = useState();
    console.log('TCL: MergeSummaryPage:React.FC -> summary', summary);

    const styles = useReviewTableStyles();

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

    const onConfirm = async () => {

        const payload: MergeSectionsPayload = {
            /* eslint-disable-next-line */
            new_section_name: newName as string,
            /* eslint-disable-next-line */
            sections_to_merge: selectedSectionsIds
        };

        onSubmitMergeSections(sectionsService, payload, dispatch);

    };

    const getOldSections = useCallback(
        (item, sectionsProp): string => {
            const sectionsOfEntity = prop(sectionsProp, item);
            if (Array.isArray(sectionsOfEntity) && isArrayOfObjects(sectionsOfEntity)) {
                return map(prop('name'), sectionsOfEntity.filter(({ id }) => selectedSectionsIds.includes(id)));
            } else if (Array.isArray(sectionsOfEntity)) {
                const idsOfSectionsChanging = filter((id: number) => selectedSectionsIds.includes(id), sectionsOfEntity);
                return sections.filter(({ id }: {id: string}) => idsOfSectionsChanging.includes(id)).map(prop('name')).join(',');
            } else if (typeof sectionsOfEntity === 'object') {
                return prop('name', sectionsOfEntity);
            }
            const sectionChangingName = compose(prop('name'), find(propEq('id', sectionsOfEntity)))(sections);

            return sectionChangingName;
        },
        [sections],
    );

    // TODO: Aesthetic on these boxes
    const ConfirmBox = () => (
        <Box justify="between" align="center">
            <Typography variant="h6">
                {isEmpty(summary) ? 'Merge does not affect other entities. Confirm to complete merge.' : 'Confirm summary of changes'}
            </Typography>
            <Box align="center">
                <NavLink to="/" style={{ textDecoration: 'none' }}><Button variant="contained">Cancel</Button></NavLink>
                <ConfirmButton onClick={onConfirm} >Confirm</ConfirmButton>
            </Box>
        </Box>);

    const SuccessBox = () => (
        <Box column>
            <Typography variant="h6" gutterBottom>
                     Merge successful.
            </Typography>
            <Box className={styles.container} column >
                <Typography variant="body1" className={styles.subtitle}>Created section name:</Typography> {mergedSection && <SectionBox name={mergedSection.name} />}
            </Box>
            <Box className={styles.backBtn}>
                <BackToMainButton>Back to Home</BackToMainButton>
            </Box>
        </Box>
    );

    return (
        <Box column>
            { mergedSection ?
                <SuccessBox /> :
                <ConfirmBox />
            }
            {showSummaryList && keys(summary).map(
                (entity: keyof ZippedEntityResults) => {
                    return (
                        <EntityChangesTable
                            key={entity as string}
                            // @ts-ignore
                            config={EntityConfigMapping[entity]} //TODO: fix this typing
                            getOldSections={getOldSections}
                            getNewSections={() => newName as string}
                            entity={summary[entity]} />
                    );
                }
            )}
        </Box>
    );
};


export default MergeSummaryPage;
