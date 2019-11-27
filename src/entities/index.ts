import { EntityDisplay } from './types';

export interface EditProps<T> {
    closeSectionPayloadKey: string;
}

export interface EntityConfig<T> {
    displayProperties: EntityDisplay<T>[];
    title: string;
    sectionsProp: string;
    moduleName: string;
}

export type ValueOf<T> = T[keyof T];

type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U
