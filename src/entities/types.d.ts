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
    [id: string]: T;
}

export type NonEmptyEntityResults = Partial<ZippedEntityResults>

export interface CloseSectionPayload {
    [id: string]: ModuleEntities;
}

export interface SectionToEntity {
    [name: string] : {
        [key in BackendEntityNames]: number[]
    }
}

export type BackendEntityNames = 'interventions' | 'applied_indicators' | 'travels' | 'tpm_activities' | 'action_points'

export interface CloseSectionBackendPayload {
    old_section: number;
    new_sections: SectionToEntity
}

export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
    section: number;
}


export interface IndicatorEntity {
    title: string;
    section?: number;
    pk: number;
}

export interface MultiSectionEntity {
    sections: number[];
    sections: number[];
    existingSections: number[]; // we store sections that exist on the entity but cannot be removed at this property
}
export interface InterventionEntity extends MultiSectionEntity {
    id: number;
    number: string;
    title: string;
    indicators: IndicatorEntity[];
}

export interface TPMActivityEntity extends MultiSectionEntity {
    id: number;
    reference_number: string;
    status: string;
    tpm_partner: {
        name: string;
    };
}

export type FormattedTPMActivityEntity = Omit<TPMActivityEntity, 'sections'> & {sections: number[]}
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
    traveler: string;
}


export interface NewSectionFromMerged {
    pk: number;
    name: string;
}

export type SectionServicePayload = CreateSectionPayload | MergeSectionsPayload | CloseSectionBackendPayload


export interface EditItemProps {
    id: string;
}

export interface GenericMultiSectionPayload {
    id: string;
    sections: number[];
}
export interface GenericSectionPayload {
    id: string;
    section: number | null;
}

export const

export interface IndicatorsPayload {
    id: string;
    indicators: IndicatorEntity[];
}

export interface EntityDisplay<T> {
    label: string;
    propName: keyof T;
}

export interface ResolvedRatio {
    resolved: number;
    total: number;
}

export type AllEntities = InterventionEntity | TPMActivityEntity | ActionPointEntity | TravelEntity | IndicatorEntity

export type KeysOfUnion<T> = T extends any ? keyof T: never;

export type WrapWithConfig<T> = T extends T ? EntityConfig<T> : never;

export type EntityMap = {[K in keyof ZippedEntityResults]: WrapWithConfig<AllEntities>}

