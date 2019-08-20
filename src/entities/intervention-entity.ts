import { InterventionEntity, EntityDisplay } from './types';
import { EntityConfig } from 'entities';

export class InterventionConfig implements EntityConfig<InterventionEntity> {

    public get displayProperties(): EntityDisplay<InterventionEntity>[] {
        return [
            { label: 'Number', propName: 'number' },
            { label: 'Title', propName: 'title' }
        ];
    }

    public get title() {
        return 'PD/SSFAs';
    }
    public get sectionsProp(): keyof InterventionEntity {
        return 'sections';
    }

    public get moduleName() {
        return 'PMP';
    }

}


