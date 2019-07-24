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
import { EntityConfig } from 'entities';
import { CreateSectionPayload, SectionEntity, EntityDisplay } from './types';


export class NewSection implements CreateSectionPayload {
    public new_section_name: string;
    private _validName: boolean | undefined;

    public constructor(name: string = '') {
        /* eslint-disable-next-line */
        this.new_section_name = name;
    }

    public get payload(): CreateSectionPayload {
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

export default class Section implements Partial<EntityConfig<SectionEntity>> {

    public get displayProperties(): EntityDisplay<SectionEntity>[] {
        return [
            { label: 'Name', propName: 'name' },
            { label: 'Id', propName: 'id' }
        ];
    }

    public get title() {
        return 'Sections';
    }

    public get sectionsProp() {
        return 'id';
    }

}

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
