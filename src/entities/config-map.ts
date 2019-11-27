import IndicatorConfig from './indicator-entity';
import TPMActivityConfig from './tpmactivity-entity';
import ActionPointConfig from './actionpoint-entity';
import { InterventionConfig } from './intervention-entity';
import TravelsConfig from './travel-entity';

// tells us which config instance to use for each entity type,
// EntityMap ensures only the listed types in AllConfigs can be used in the map

// TODO: find way to make indicators optional and type this as EntityMap

const EntityConfigMapping = {
    interventions: new InterventionConfig(),
    indicators: new IndicatorConfig(),
    tpmActivities: new TPMActivityConfig(),
    actionPoints: new ActionPointConfig(),
    travels: new TravelsConfig()
};

export default EntityConfigMapping;
