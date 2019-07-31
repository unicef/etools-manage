import { EntityDisplay, KeyToEntityMap, ZippedEntityResults
} from './types';

export interface EditProps<T> {
    list: T[] | undefined;
    closeSectionPayloadKey: string;
}


export interface EntityConfig<T> {
    displayProperties: EntityDisplay<T>[];
    title: string;
    sectionsProp: string;
    moduleName: string;
}

// TODO: map the types manually here
export type Builders = {
    [K in keyof KeyToEntityMap]: any
};

export type ValueOf<T> = T[keyof T];
export type EntityUnion = ValueOf<ZippedEntityResults>

type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U


