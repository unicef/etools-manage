import IndicatorConfig from './indicator-entity';
import TPMActivityConfig from './tpmactivity-entity';
import ActionPointConfig from './actionpoint-entity';
import { InterventionConfig } from './intervention-entity';
import TravelsConfig from './travel-entity';
import EngagementsConfig from './engagement-entity';
import FMActivityConfig from './fmactivity-entity';
import FMQuestionConfig from './fmquestion-entity';
import PartnersConfig from './partner-entity';

// tells us which config instance to use for each entity type,
// EntityMap ensures only the listed types in AllConfigs can be used in the map

const EntityConfigMapping = {
    interventions: new InterventionConfig(),
    indicators: new IndicatorConfig(),
    tpmActivities: new TPMActivityConfig(),
    actionPoints: new ActionPointConfig(),
    fmActivities: new FMActivityConfig(),
    fmQuestions: new FMQuestionConfig(),
    travels: new TravelsConfig(),
    engagements: new EngagementsConfig(),
    partners: new PartnersConfig()
};

export default EntityConfigMapping;
