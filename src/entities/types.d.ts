import { EntityConfig } from 'entities';

export interface EntitiesDataResponse<T, U>{
    [field: string]: T | U;
}

export interface ZippedEntityResults {
    indicators: Normalized<IndicatorEntity>;
    tpmActivities: Normalized<TPMActivityEntity>;
    actionPoints: Normalized<ActionPointEntity>;
    interventions: Normalized<InterventionEntity>;
    travels: Normalized<TravelEntity>;
}

export type ModuleEntities = Omit<ZippedEntityResults, 'indicators'>

export interface KeyToEntityMap {
    interventions: InterventionEntity;
    tpmActivities: TPMActivityEntity;
    actionPoints: ActionPointEntity;
    travels: TravelEntity;
    indicators: IndicatorEntity;
}

export type EntityWithSingleSection = Normalized<ActionPointEntity | TravelEntity | IndicatorEntity>

export interface Normalized<T> {
    data: {[id: number]: T};
    result: number[];
}

export interface NormalizedEntity<T> {
    [id: number]: T;
}

export type NonEmptyEntityResults = Partial<ZippedEntityResults>
export interface CloseSectionPayload {
    [id: string]: ModuleEntities;
}

export type StorageKey = 'close' | 'split'


export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
    section: SectionEntity;
}


export interface IndicatorEntity {
    title: string;
    section?: number;
}

export interface InterventionEntity {
    id: number;
    number: string;
    title: string;
    sections: number[];
    indicators: IndicatorEntity[];
}


export interface TPMActivityEntity {
    id: number;
    reference_number: string;
    status: string;
    sections: SectionEntity[];
}
export interface SectionEntity {
    id: number ;
    name: string;
}

export interface CreateSectionPayload {
    new_section_name: string;
}

export interface MergeSectionsPayload {
    new_section_name: string;
    sections_to_merge: number[];
}
export interface TravelEntity {
    id: number;
    section: number;
    reference_number: string;
    purpose: string;
}


export interface NewSectionFromMerged {
    pk: number;
    name: string;
}

export type SectionServicePayload = CreateSectionPayload | MergeSectionsPayload
export interface InterventionSectionPayload {
    id: number;
    sections: number[];
}

export interface EntityDisplay<T> {
    label: string;
    propName: keyof T;
}


export type AllEntities = InterventionEntity | TPMActivityEntity | ActionPointEntity | TravelEntity | IndicatorEntity

export type WrapWithConfig<T> = T extends T ? EntityConfig<T> : never;

export type EntityMap = {[K in keyof ZippedEntityResults]: WrapWithConfig<AllEntities>}
