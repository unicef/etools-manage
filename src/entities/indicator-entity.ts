import { EntityConfig } from 'entities';
import { IndicatorEntity, EntityDisplay } from './types';


export default class IndicatorConfig implements Partial<EntityConfig<IndicatorEntity>> {
    public get displayProperties(): EntityDisplay<IndicatorEntity>[] {
        return [{
            label: 'Title',
            propName: 'title'
        }];
    }
    public get title() {
        return 'Applied Indicators';
    }
    public get sectionsProp() {
        return 'section';
    }

    public get moduleName() {
        return 'PMP';
    }

}


