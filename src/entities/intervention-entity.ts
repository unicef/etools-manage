import { InterventionEntity, EntityDisplay } from './types';
import { EntityConfig } from 'entities';
import { PmpBuilder } from './pmp-builder';
import { without } from 'ramda';


// export default class Intervention implements InterventionEntity {
//     public id: number;
//     public number: string;
//     public title: string;;
//     public sections: number[];
//     indicators: IndicatorEntity[]

//     public constructor({ id, number, title, sections }: InterventionEntity) {
//         this.id = id;
//         this.number = number;
//         this.title = title;
//         this.sections = sections;
//     }
// }


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

    public get builder() {
        return new PmpBuilder();
    }


}


export const interventionRemoveSection = (list: InterventionEntity[], id: number) => list.map(
    (item: InterventionEntity) => {
        const removedSectionIndicators = item.indicators.map(
            indicator => ({
                ...indicator,
                section: undefined
            })
        );
        const res: InterventionEntity = ({
            ...item,
            indicators: removedSectionIndicators as IndicatorEntity[],
            sections: without([id], item.sections) as number[]
        });

        return res;
    }
);
