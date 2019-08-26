import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection } from 'selectors';
import {
    TPMActivityEntity,
    Normalized,
    ResolvedRatio,
    FormattedTPMActivityEntity
} from 'entities/types';
import { prop, map, reject, propEq, reduce, keys } from 'ramda';
import { FullStoreShape } from 'contexts/app';

export const selectTPMFromPayload = createSelector<
    FullStoreShape,
    Normalized<FormattedTPMActivityEntity>
>(
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
        return map((tpmActivity: TPMActivityEntity) => {
            const withoutCurrentSection = reject(propEq('id', id), tpmActivity.sections).map(
                prop('name')
            );
            return {
                ...tpmActivity,
                sections: [],
                existingSections: withoutCurrentSection
            };
        }, list);
    }
);

export const getNumResolvedTPMActivities = createSelector(
    [selectTPMFromPayload],
    (tpmActivities: Normalized<TPMActivityEntity> = {}): ResolvedRatio => {
        const resolved = reduce(
            (sum: number, key: string) => {
                const { sections }: { sections: string[] } = tpmActivities[key];
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
