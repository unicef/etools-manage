import { InterventionEntity, EntityDisplay } from './types';
import { EntityConfig } from 'entities';
import { without, map } from 'ramda';

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


export const interventionRemoveSection = (list: InterventionEntity[], id: number) => map(
    (item: InterventionEntity) => {
        const removedSectionIndicators = item.indicators.map(
            indicator => ({
                ...indicator,
                section: undefined
            })
        );
        const res: InterventionEntity = ({
            ...item,
            indicators: removedSectionIndicators,
            sections: without([id], item.sections) as number[]
        });

        return res;
    },
    list
);
