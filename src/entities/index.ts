import React from 'react';
import { EntityDisplay, KeyToEntityMap, ZippedEntityResults,
    CloseSectionPayload } from './types';

export interface EditProps {
    list: ValueOf<CloseSectionPayload> | undefined;
    closeSectionPayloadKey: string;
}

export interface Builder<T> {
    Component: React.FC<EditProps>;
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

export type ValueOf<T> = T[keyof T];
export type EntityUnion = ValueOf<ZippedEntityResults>

type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U


