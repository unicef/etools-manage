import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload, selectCurrentActiveSection } from 'selectors';
import { ModuleEntities, TPMActivityEntity, Normalized } from 'entities/types';
import { Store } from 'slices/root-store';
import { prop, reject, propEq, reduce, keys } from 'ramda';
import { normDefault } from 'lib/sections';


export const selectTPMFromPayload = createSelector<Store, ModuleEntities>(
    [selectCloseSectionPayload],
    prop('tpmActivities')
);

// TODO: type these
export const tpmActivitiesWithoutCurrentSection = createSelector(
    [selectTPMFromPayload, selectCurrentActiveSection],
    (root: Normalized<TPMActivityEntity>, id: number) => {
        const { data } = root;
        const ids: number[] = keys(data);

        return reduce(
            (entity: Normalized<TPMActivityEntity>, entityId: number) => {

                const withoutSection = reject(propEq('id', id), data[entityId].sections);
                return {
                    ...entity,
                    [entityId]: {
                        ...data[entityId],
                        sections: withoutSection
                    }
                };

            }, root, ids
        );
    }
);

export const getNumResolvedTPMActivities = createSelector(
    [selectTPMFromPayload],
    (root: Normalized<TPMActivityEntity> = normDefault): number[] => {
        const { data } = root;
        const ids = keys(data);

        let numResolved = reduce(
            (sum: number, id: number) => {
                const entity = data[id];
                if (entity.sections.length) {
                    numResolved++;
                }
                return sum;
            },
            0,
            ids
        );

        return [numResolved, ids.length];
    }
);

