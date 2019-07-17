import EntityConfig from 'entities';
import { PropertyNames } from 'helpers';

export interface IndicatorEntity {
    id: number;
    title: string;
    section: number;
}


export default class IndicatorConfig extends EntityConfig<IndicatorEntity> {
    public get displayProperties(): PropertyNames<IndicatorEntity>[] {
        return ['title', 'id'];
    }
}

