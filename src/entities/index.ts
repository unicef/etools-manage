import IndicatorConfig, { IndicatorEntity } from './indicator-entity';
import TPMActivityConfig, { TPMActivityEntity } from './tpmactivity-entity';
import ActionPointConfig, { ActionPointEntity } from './actionpoint-entity';
import { PropertyNames } from 'helpers';

abstract class EntityConfig<T> {
    public abstract get displayProperties(): (keyof T)[]
}

export default EntityConfig;

export interface ZippedEntityResults {
    indicators: IndicatorEntity[];
    tpmActivities: TPMActivityEntity[];
    actionPoints: ActionPointEntity[];
    // travels: TravelEntity[]
}

// tells us which config instance to use for each entity type,
// EntityMap ensures only the listed types in AllConfigs can be used in the map

export const EntityPropMapping: EntityMap = {
    indicators: new IndicatorConfig(),
    tpmActivities: new TPMActivityConfig(),
    actionPoints: new ActionPointConfig()
};


export type AllConfigs = EntityConfig<IndicatorEntity> | EntityConfig<TPMActivityEntity> | EntityConfig<ActionPointEntity>
export type EntityMap = {[K in PropertyNames<ZippedEntityResults>]?: AllConfigs}
