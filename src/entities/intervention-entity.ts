import { Intervention, EntityDisplay, EntityConfig } from './types';
import { prop } from 'ramda';

export class InterventionConfig implements EntityConfig<Intervention> {
    public get displayProperties(): EntityDisplay<Intervention>[] {
        return [
            { label: 'Number', display: prop('number') },
            { label: 'Title', display: prop('title') }
        ];
    }

    public get title() {
        return 'PD/SSFAs';
    }
    public get sectionsProp(): keyof Intervention {
        return 'sections';
    }

    public get moduleName() {
        return 'PMP PDs';
    }
}
