import { EntityConfig } from 'entities';
import { Indicator, EntityDisplay } from './types';

export default class IndicatorConfig implements Partial<EntityConfig<Indicator>> {
    public get displayProperties(): EntityDisplay<Indicator>[] {
        return [
            {
                label: 'Title',
                propName: 'title'
            }
        ];
    }
    public get title() {
        return 'PD/SSFA Indicators';
    }
    public get sectionsProp() {
        return 'section';
    }

    public get moduleName() {
        return 'PMP';
    }
}
