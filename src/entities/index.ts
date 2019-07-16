import { IndicatorEntity } from './indicator-entity';
import { TPMActivityEntity } from './tpmactivity-entity';
import { ActionPointEntity } from './actionpoint-entity';
import { PropertyNames } from 'helpers';

abstract class Entity<T> {
    public abstract get displayProperties(): (keyof T)[]
}

export default Entity;

export interface ZippedEntityResults {
    indicators: IndicatorEntity[];
    tpmActivities: TPMActivityEntity[];
    actionPoints: ActionPointEntity[];
    // travels: TravelEntity[]
}

export type EntityMap = {[K in PropertyNames<ZippedEntityResults>]: Entity<any>}
