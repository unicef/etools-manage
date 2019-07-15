import { useState, useEffect } from 'react';
import {
    prop,
    compose,
    find,
    equals,
    toLower,
    trim
} from 'ramda';
import { useAppState } from 'contexts/app';

export interface SectionEntity {
    id: number ;
    name: string;
}

export interface SectionPayload {
    new_section_name: string;
}

export class NewSection implements SectionPayload {
    public new_section_name: string;
    private _validName: boolean | undefined;

    public constructor(name: string = '') {
        /* eslint-disable-next-line */
        this.new_section_name = name;
    }

    public get payload(): SectionPayload {
        return {
            /* eslint-disable-next-line */
            new_section_name: this.new_section_name
        };
    }

    private sectionValidator (name: string, sections: SectionEntity[]): Promise<boolean> {
        const findSameName = find(compose(equals(trim(name)), toLower, prop('name')));
        const nameExists = findSameName(sections) !== undefined;
        return new Promise(resolve => resolve(!nameExists));
    }

    public async isValidName(sectionsCollection: SectionEntity[], validator?: (name: string) => Promise<boolean>): Promise<boolean> {

        this._validName = validator ? await validator(this.new_section_name) :
            await this.sectionValidator(this.new_section_name, sectionsCollection);

        return this._validName;
    }
}

// export default class Section implements SectionEntity {
//     public id: number;
//     private _name: string;

//     public constructor(name: string = '') {
//         this._name = name;
//     }

//     public set name(name) {
//         this._name = name;
//     }

//     public get name() {
//         return this._name;
//     }


// }

export const useAddSection = () => {
    const [errorOnName, setNameError] = useState<string>('');
    const { sections } = useAppState();
    const [name, setName] = useState<string>('');
    const [sectionInstance] = useState<NewSection>(new NewSection());

    useEffect(() => {
        /* eslint-disable-next-line */
        sectionInstance.new_section_name = name;
    }, [name]);

    const handleValidateSection = async () => {
        const isValid = await sectionInstance.isValidName(sections);
        if (!isValid) {
            setNameError('Section name already exists');
        }
    };


    return {
        errorOnName,
        handleValidateSection,
        name,
        setName,
        setNameError,
        sectionInstance
    };

};
