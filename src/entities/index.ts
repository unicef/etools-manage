import React from 'react';
import { EntityDisplay, NonEmptyEntityResults } from './types';
import EntityConfigMapping from './config-map';
import { keys, zipObj } from 'ramda';

export interface EditProps<T> {
    list: T[];
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;

}

export interface Builder<T> {
    Component: React.FC<EditProps<T>>;
}

export interface EntityConfig<T> {
    displayProperties: EntityDisplay<T>[];
    title: string;
    sectionsProp: string;
    builder: Builder<T>;
}


export class ModuleEntitiesManager {

    // public get closeRequestPayload(){
    //     //
    // }

    private entitiesData: NonEmptyEntityResults;

    public constructor(entitiesData: NonEmptyEntityResults) {
        this.entitiesData = entitiesData;
    }

    public get entityBuilders() {
        const entitiesNames = keys(this.entitiesData);
        const zip = zipObj(entitiesNames);

        const builders = entitiesNames.map(
            (key: string) => EntityConfigMapping[key].builder
        );

        return zip(builders);

    }


}


