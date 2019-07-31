import { createSelector } from 'redux-starter-kit';
import { selectCloseSectionPayload } from 'selectors';
import { ModuleEntities, TravelEntity } from 'entities/types';
import { Store } from 'slices/root-store';
import { prop} from 'ramda';
import { clearCurrentSection, getNumResolved } from 'lib/sections';


export const selectTravelsFromPayload = createSelector<Store, ModuleEntities>(
    [selectCloseSectionPayload],
    prop('travels')
);

export const getNumResolvedTravels = createSelector(
    [selectTravelsFromPayload],
    getNumResolved
);

export const travelsWithoutCurrentSection = createSelector(
    [selectTravelsFromPayload],
    clearCurrentSection
);
