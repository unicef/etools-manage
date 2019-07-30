import React from 'react';
import { EntityDisplay, NonEmptyEntityResults, KeyToEntityMap, ZippedEntityResults, IndicatorEntity } from './types';
import ConfigMap from './config-map';
import { keys, zipObj, isEmpty } from 'ramda';
import { interventionRemoveSection } from './intervention-entity';
import { travelsRemoveSection } from './travel-entity';
import { tpmRemoveSection } from './tpmactivity-entity';
import { actionPointsRemoveSection } from './actionpoint-entity';

export interface EditProps<T> {
    list: T[] | undefined;
    closeSectionPayloadKey: string;
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

// TODO: map the types manually here
export type Builders = {
    [K in keyof KeyToEntityMap]: any
};
export interface DisplayDirector {
    entityBuilders: Builders;
    entitiesData: NonEmptyEntityResults | [];
    initialize(entitiesData: NonEmptyEntityResults): void;
}

export type ValueOf<T> = T[keyof T];
export type EntityUnion = ValueOf<ZippedEntityResults>

type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U

type Handlers<T> = {
    [K in keyof T]: (list: T[K], id: number) => T[K]
}

export type SomeMapping<T> = {
    [P in keyof T]: (list: T[P], id: number) => T[P]
}


export const getEntityHandlers: () => SomeMapping<ZippedEntityResults> = () => ({
    interventions: interventionRemoveSection,
    travels: travelsRemoveSection,
    tpmActivities: tpmRemoveSection,
    actionPoints: actionPointsRemoveSection,
    indicators: (list: IndicatorEntity[], id: number) => list // temp
});

// export const getHandler: <T>(data: T, key: keyof ZippedEntityResults) => Function = (data, key) => {
//     switch (key) {
//         case 'indicators':
//             return interventionRemoveSection;
//         case 'actionPoints':
//             return actionPointsRemoveSection;
//         case 'interventions':
//             return interventionRemoveSection;
//         case 'travels':
//             return travelsRemoveSection;
//         case 'tpmActivities':
//             return tpmRemoveSection;
//         default:
//             throw Error('Bad Key provided');
//     }
// };


export class ModuleEntitiesManager implements DisplayDirector {

    public entitiesData: NonEmptyEntityResults | [] = [];

    public initialize(entitiesData: NonEmptyEntityResults) {
        this.entitiesData = entitiesData;
    }

    public get entityBuilders() {

        const entitiesNames = !isEmpty(this.entitiesData) && keys(this.entitiesData) || [];
        const zip = zipObj(entitiesNames);

        const builders = entitiesNames.map(
            (key: keyof ZippedEntityResults) => {
                if (ConfigMap[key]) {
                    return ConfigMap[key].builder;
                }
                return key;
            });

        return zip(builders);

    }
}


