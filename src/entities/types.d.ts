

export interface ZippedEntityResults {
    indicators: IndicatorEntity[];
    tpmActivities: TPMActivityEntity[];
    actionPoints: ActionPointEntity[];
    interventions: InterventionEntity[];
    travels: TravelEntity[];
}

export type ZippedByModuleResults = Omit<ZippedEntityResults, 'indicators'>

export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
    section: SectionEntity[];
}

export type ActionPointsPayloadFields = Pick<ActionPointEntity, 'id', 'section'>

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

export type InterventionPayloadFields = Pick<InterventionEntity, 'id', 'sections', 'indicators'>


export interface TPMActivityEntity {
    id: number;
    reference_number: string;
    status: string;
    sections: SectionEntity[];
}
export type TPMActivityPayloadFields = Pick<TPMActivityEntity, 'id', 'sections'>
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

export type TravelPayloadFields = Pick<TravelEntity, 'id', 'section'>


export interface NewSectionFromMerged {
    pk: number;
    name: string;
}

export type SectionServicePayload = CreateSectionPayload | MergeSectionsPayload


export interface EntityDisplay<T> {
    label: string;
    propName: keyof T;
}

export interface ModuleEntities {
    pmp: InterventionPayloadFields[];
    travels: TravelPayloadFields[];
    actionPoints: ActionPointsPayloadFields[];
    tpmActivities: TPMActivityPayloadFields[];
}
export type FilteredModuleEntities = Partial<ModuleEntities>

// export interface <T> {
//     title: string;
//     items: T[];
// }

export type AllConfigs = EntityConfig<InterventionEntity> | EntityConfig<TPMActivityEntity> | EntityConfig<ActionPointEntity>
export type EntityMap = {[K in PropertyNames<ZippedEntityResults>]?: AllConfigs}
