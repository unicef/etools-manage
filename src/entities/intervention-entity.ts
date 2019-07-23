import { pick } from 'ramda';
import { InterventionEntity, EntityDisplay, InterventionPayloadFields } from './types';
import EntityConfig from 'entities';
import { PmpBuilder } from './pmp-builder';


export default class Intervention implements InterventionEntity {
    public id: number;
    public number: string;
    public title: string;;
    public sections: number[];

    public constructor({ id, number, title, sections }: InterventionEntity) {
        this.id = id;
        this.number = number;
        this.title = title;
        this.sections = sections;
    }
}

export class InterventionConfig extends EntityConfig<InterventionEntity> {

    public get displayProperties(): EntityDisplay<InterventionEntity>[] {
        return [
            { label: 'Number', propName: 'number' },
            { label: 'Title', propName: 'title' }
        ];
    }

    public get title() {
        return 'PD/SSFAs';
    }
    public get sectionsProp() {
        return 'sections';
    }


    public get moduleName() {
        return 'PMP';
    }

    public get builder() {
        return PmpBuilder;
    }

}


