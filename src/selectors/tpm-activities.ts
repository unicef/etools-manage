import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection } from 'selectors';
import {
    TPMActivityEntity,
    Normalized,
    ResolvedRatio
    // FormattedTPMActivityEntity
} from 'entities/types';
import { prop, map, reduce, keys } from 'ramda';
import { FullStoreShape } from 'contexts/app';

export const selectTPMFromPayload = createSelector<FullStoreShape, Normalized<TPMActivityEntity>>(
    [selectCloseSectionPayload],
    prop('tpmActivities')
);

export const selectTPMActivitiesIds = createSelector(
    [selectTPMFromPayload],
    keys
);

export const tpmActivitiesWithoutCurrentSection = createSelector(
    [selectTPMFromPayload, selectCurrentActiveSection],
    (list: TPMActivityEntity[] = []) => {
        return map(
            (tpm: TPMActivityEntity) => ({
                ...tpm,
                section: undefined
            }),
            //     (tpmActivity: TPMActivityEntity) => {
            //     const withoutCurrentSection = reject(propEq('id', id), tpmActivity.sections).map(
            //         prop('name')
            //     );
            //     return {
            //         ...tpmActivity,
            //         sections: [],
            //         existingSections: withoutCurrentSection
            //     };
            // },
            list
        );
    }
);

export const getNumResolvedTPMActivities = createSelector(
    [selectTPMFromPayload],
    (tpmActivities: Normalized<TPMActivityEntity> = {}): ResolvedRatio => {
        const resolved = reduce(
            (sum: number, key: string) => {
                const { section }: { section: string } = tpmActivities[key];
                if (section) {
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
