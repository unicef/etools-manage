import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection } from 'selectors';
import { TPMActivityEntity, SectionEntity, Normalized, ResolvedRatio, FormattedTPMActivityEntity } from 'entities/types';
import { Store } from 'store/root-store';
import { prop, map, reject, propEq, reduce, keys } from 'ramda';


export const selectTPMFromPayload = createSelector<Store, Normalized<FormattedTPMActivityEntity>>(
    [selectCloseSectionPayload],
    prop('tpmActivities')
);

export const selectTPMActivitiesIds = createSelector(
    [selectTPMFromPayload],
    keys
);

export const tpmActivitiesWithoutCurrentSection = createSelector(
    [selectTPMFromPayload, selectCurrentActiveSection],
    (list: TPMActivityEntity[] = [], id: number) => {
        return map(
            (tpmActivity: TPMActivityEntity) => {
                const withoutSection = reject(propEq('id', id), tpmActivity.sections).map(prop('id'));
                return ({
                    ...tpmActivity,
                    sections: [],
                    existingSections: withoutSection
                });
            }, list
        );
    }
);

export const getNumResolvedTPMActivities = createSelector(
    [selectTPMFromPayload],
    (tpmActivities: Normalized<TPMActivityEntity> = {}): ResolvedRatio => {

        const resolved = reduce(
            (sum: number, key: string) => {
                const { sections }: {sections: number[]} = tpmActivities[key];
                if (sections.length) {
                    sum++;
                }
                return sum;
            },
            0,
            keys(tpmActivities)
        );

        return { resolved, total: keys(tpmActivities).length };
    }
);

