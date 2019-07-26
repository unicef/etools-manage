import { EntityConfig } from 'entities';

export interface EntitiesDataResponse<T, U>{
    [field: string]: T | U;
}

export interface ZippedEntityResults {
    indicators: IndicatorEntity[];
    tpmActivities: TPMActivityEntity[];
    actionPoints: ActionPointEntity[];
    interventions: InterventionEntity[];
    travels: TravelEntity[];
}

export interface KeyToEntityMap {
    interventions: InterventionEntity;
    tpmActivities: TPMActivityEntity;
    actionPoints: ActionPointEntity;
    travels: TravelEntity;
    indicators: IndicatorEntity;
}


export type NonEmptyEntityResults = ZippedEntityResults


export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
    section: SectionEntity[];
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

export interface EntityDisplay<T> {
    label: string;
    propName: keyof T;
}

export type EntityCollectionUnion = IndicatorEntity[] | InterventionEntity[] | TPMActivityEntity[] | ActionPointEntity[] |TravelEntity[]
export type AllEntities = InterventionEntity | TPMActivityEntity | ActionPointEntity | TravelEntity | IndicatorEntity

export type WrapWithConfig<T> = T extends T ? EntityConfig<T> : never;

export type EntityMap = {[K in keyof ZippedEntityResults]: WrapWithConfig<AllEntities>}
