import EntityConfig from 'entities';
import { PropertyNames } from 'helpers';
import { IndicatorEntity } from './types';


export default class IndicatorConfig extends EntityConfig<IndicatorEntity> {
    public get displayProperties(): PropertyNames<IndicatorEntity>[] {
        return ['title'];
    }
    public get title() {
        return 'Applied Indicators';
    }
}


