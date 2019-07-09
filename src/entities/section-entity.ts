import React, { useState } from 'react';

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


    public async isValidName(sectionsCollection: SectionEntity[], validator?: (name: string) => Promise<boolean>): Promise<boolean> {

        this._validName = validator ? await validator(this.name) :
            await this.sectionValidator(this.name, sectionsCollection);

        return this._validName;
    }

    private sectionValidator (name: string, sections: SectionEntity[]): Promise<boolean> {
        const findSameName = find(compose(equals(trim(name)), toLower, prop('name')));
        const nameExists = findSameName(sections) !== undefined;
        return new Promise(resolve => resolve(!nameExists));
    }

}

export const useAddSection = () => {
    const [errorOnName, setNameError] = useState<string>('');
    const { sections } = useAppState();
    const [name, setName] = useState<string>('');

    const handleValidateSection = async () => {
        const sectionInstance = new Section(name);
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
        setNameError
    };

};
