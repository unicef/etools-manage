import { Indicator, EntityDisplay, EntityConfig } from './types';
import { prop } from 'ramda';

export default class IndicatorConfig implements Partial<EntityConfig<Indicator>> {
    public get displayProperties(): EntityDisplay<Indicator>[] {
        return [
            {
                label: 'Title',
                display: prop('title')
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
