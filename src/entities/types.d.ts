

export interface ZippedEntityResults {
    indicators: InterventionEntity[];
    tpmActivities: TPMActivityEntity[];
    actionPoints: ActionPointEntity[];
    interventions: InterventionEntity[];
    // travels: TravelEntity[]
}

export type ZippedByModuleResults = Omit<ZippedEntityResults, 'indicators'>

export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
}

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

export interface NewSectionFromMerged {
    pk: number;
    name: string;
}

export type SectionServicePayload = CreateSectionPayload | MergeSectionsPayload


export interface EntityDisplay<T> {
    label: string;
    propName: keyof T;
}


export type AllConfigs = EntityConfig<InterventionEntity> | EntityConfig<TPMActivityEntity> | EntityConfig<ActionPointEntity>
export type EntityMap = {[K in PropertyNames<ZippedEntityResults>]?: AllConfigs}
