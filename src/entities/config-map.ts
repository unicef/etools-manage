import IndicatorConfig from './indicator-entity';
import TPMActivityConfig from './tpmactivity-entity';
import ActionPointConfig from './actionpoint-entity';
import { EntityMap } from './types';
import { InterventionConfig } from './intervention-entity';

// tells us which config instance to use for each entity type,
// EntityMap ensures only the listed types in AllConfigs can be used in the map

const EntityPropMapping: EntityMap = {
    interventions: new InterventionConfig(),
    indicators: new IndicatorConfig(),
    tpmActivities: new TPMActivityConfig(),
    actionPoints: new ActionPointConfig()
};

export default EntityPropMapping;
