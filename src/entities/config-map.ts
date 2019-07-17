import { EntityMap } from 'entities';
import IndicatorConfig from './indicator-entity';
import TPMActivityConfig from './tpmactivity-entity';
import ActionPointConfig from './actionpoint-entity';

// tells us which config instance to use for each entity type,
// EntityMap ensures only the listed types in AllConfigs can be used in the map

export const EntityPropMapping: EntityMap = {
    indicators: new IndicatorConfig(),
    tpmActivities: new TPMActivityConfig(),
    actionPoints: new ActionPointConfig()
};
