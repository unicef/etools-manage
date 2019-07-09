
export interface SectionEntity {
    id: number | null ;
    name: string;
}

export default class Section implements SectionEntity {
    public id: number;
    public name: string;
    private _validName: boolean | undefined;

    public constructor(name: string) {
        this.name = name;
    }


    public async isValidName(validator: (name: string) => Promise<boolean>): Promise<boolean> {
        this._validName = await validator(this.name);
        return this._validName;
    }

}
