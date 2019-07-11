

export interface InterventionEntity {
    id: number;
    number: string;
    title: string;
    sections: number[];
}

export default class Intervention implements InterventionEntity {
    public id;
    public number;
    public title;
    public sections;
    // TODO: is it needed yet ?
}
