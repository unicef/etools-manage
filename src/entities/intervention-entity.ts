

export interface InterventionEntity {
    id: number;
    number: string;
    title: string;
    sections: number[];
}

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
