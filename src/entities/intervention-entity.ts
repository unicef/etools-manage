import { InterventionEntity } from './types';
import EntityConfig from 'entities';
import { PropertyNames } from 'helpers';


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

    public get displayProperties(): PropertyNames<InterventionEntity>[] {
        return ['number', 'title'];
    }

    public get title() {
        return 'PD/SSFAs';
    }
}
