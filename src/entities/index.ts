import React from 'react';
import { EntityDisplay, NonEmptyEntityResults, KeyToEntityMap, ZippedEntityResults, IndicatorEntity } from './types';
import EntityConfigMapping from './config-map';
import { keys, zipObj } from 'ramda';
import { interventionRemoveSection } from './intervention-entity';
import { travelsRemoveSection } from './travel-entity';
import { tpmRemoveSection } from './tpmactivity-entity';
import { actionPointsRemoveSection } from './actionpoint-entity';

export interface EditProps<T> {
    list: T[] | undefined;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

export interface Builder<T> {
    Component: React.FC<EditProps<T>>;
    numItemsResolved(items: T[]): string;
}

export interface EntityConfig<T> {
    displayProperties: EntityDisplay<T>[];
    title: string;
    sectionsProp: string;
    builder?: Builder<T>;
    moduleName: string;
}

export type Builders = {
    [K in keyof KeyToEntityMap]: any
};
export interface DisplayDirector {
    entityBuilders: Builders;
    initialize(entitiesData: NonEmptyEntityResults): void;
}

type ValueOf<T> = T[keyof T];

export const entityHandlers = {
    interventions: interventionRemoveSection,
    travels: travelsRemoveSection,
    tpmActivities: tpmRemoveSection,
    actionPoints: actionPointsRemoveSection,
    indicators: (list: IndicatorEntity[], id: number) => list
};


export class ModuleEntitiesManager implements DisplayDirector {

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


