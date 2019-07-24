import React from 'react';
import { EntityDisplay, NonEmptyEntityResults, KeyToEntityMap, ZippedEntityResults } from './types';
import EntityConfigMapping from './config-map';
import { keys, zipObj } from 'ramda';

export interface EditProps<T> {
    list: T[] | undefined;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

export interface Builder<T> {
    Component: React.FC<EditProps<T>>;
}

export interface EntityConfig<T> {
    displayProperties: EntityDisplay<T>[];
    title: string;
    sectionsProp: string;
    builder?: Builder<T>;
}

export type Builders = {
    [K in keyof KeyToEntityMap]: any
};
export interface DisplayDirector {
    entityBuilders: Builders;
    initialize(entitiesData: NonEmptyEntityResults): void;
}


export class ModuleEntitiesManager implements DisplayDirector {

    // public get closeRequestPayload(){
    //     //
    // }

    private entitiesData: NonEmptyEntityResults | [] = [];

    public initialize(entitiesData: NonEmptyEntityResults) {
        this.entitiesData = entitiesData;
    }

    public get entityBuilders() {
        const entitiesNames = keys(this.entitiesData);
        const zip = zipObj(entitiesNames);

        const builders = entitiesNames.map(
            (key: keyof ZippedEntityResults) => EntityConfigMapping[key].builder);

        return zip(builders);

    }


}


