import IndicatorConfig from './indicator-entity';
import TPMActivityConfig from './tpmactivity-entity';
import ActionPointConfig from './actionpoint-entity';
import { InterventionConfig } from './intervention-entity';
import TravelsConfig from './travel-entity';
import EngagementsConfig from './engagement-entity';

// tells us which config instance to use for each entity type,

const EntityConfigMapping = {
    interventions: new InterventionConfig(),
    indicators: new IndicatorConfig(),
    tpmActivities: new TPMActivityConfig(),
    actionPoints: new ActionPointConfig(),
    travels: new TravelsConfig(),
    engagements: new EngagementsConfig()
};

export default EntityConfigMapping;
