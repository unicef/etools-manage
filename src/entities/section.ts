
export interface SectionEntity {
    id? : number;
    name: string;
}

export default class Section implements SectionEntity {
    public id: number;
    public name: string;
    private _validName: boolean | undefined;

    public constructor({ name }) {
        this.name = name;
    }

    public async isValidName(validator: (name: string) => boolean): Promise<boolean> {
        this._validName = await validator(this.name);
        return this._validName;
    }

}
