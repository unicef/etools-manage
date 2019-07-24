import { EntityConfig } from 'entities';
import Intervention from './intervention-entity';
import { Wrapper } from 'helpers';


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


export type NonEmptyEntityResults = Partial<ZippedEntityResults>


export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
    section: SectionEntity[];
}

// export type ActionPointsPayloadFields = Pick<ActionPointEntity, 'id', 'section'>

export interface IndicatorEntity {
    title: string;
    section: number;
}

export interface InterventionEntity {
    id: number;
    number: string;
    title: string;
    sections: number[];
    indicators?: IndicatorEntity[];
}

// export type InterventionPayloadFields = Pick<InterventionEntity, 'id', 'sections', 'indicators'>


export interface TPMActivityEntity {
    id: number;
    reference_number: string;
    status: string;
    sections: SectionEntity[];
}
// export type TPMActivityPayloadFields = Pick<TPMActivityEntity, 'id', 'sections'>
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

// export type TravelPayloadFields = Pick<TravelEntity, 'id', 'section'>


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
export type AllEntities = IndicatorEntity | Intervention | TPMActivityEntity | ActionPointEntity | TravelEntity

export type WrapWithConfig<T> = T extends T ? EntityConfig<T> : never;

export type EntityMap = {[K in keyof ZippedEntityResults]?: WrapWithConfig<AllEntities> | Partial<EntityConfig<IndicatorEntity>>}

