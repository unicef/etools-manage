import { Intervention, EntityDisplay } from './types';
import { EntityConfig } from 'entities';

export class InterventionConfig implements EntityConfig<Intervention> {
    public get displayProperties(): EntityDisplay<Intervention>[] {
        return [{ label: 'Number', propName: 'number' }, { label: 'Title', propName: 'title' }];
    }

    public get title() {
        return 'PD/SSFAs';
    }
    public get sectionsProp(): keyof Intervention {
        return 'sections';
    }

    public get moduleName() {
        return 'PMP';
    }
}
