import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection } from 'selectors';
import { ModuleEntities, TPMActivityEntity, SectionEntity } from 'entities/types';
import { Store } from 'slices/root-store';
import { prop, map, reject, propEq, reduce } from 'ramda';


export const selectTPMFromPayload = createSelector<Store, ModuleEntities>(
    [selectCloseSectionPayload],
    prop('tpmActivities')
);

export const tpmActivitiesWithoutCurrentSection = createSelector(
    [selectTPMFromPayload, selectCurrentActiveSection],
    (list: TPMActivityEntity[] = [], id: number) => {
        return map(
            (tpmActivity: TPMActivityEntity) => {
                const withoutSection = reject(propEq('id', id), tpmActivity.sections);
                return ({
                    ...tpmActivity,
                    sections: withoutSection
                });
            }, list
        );
    }
);

export const getNumResolvedTPMActivities = createSelector(
    [selectTPMFromPayload],
    (tpmActivities: TPMActivityEntity[] = []): number[] => {
        let numResolved = reduce(
            (sum: number, { sections }: {sections: SectionEntity[]}) => {
                if (sections.length) {
                    numResolved++;
                }
                return sum;
            },
            0,
            tpmActivities
        );

        return [numResolved, tpmActivities.length];
    }
);

