

export interface ZippedEntityResults {
    indicators: InterventionEntity[];
    tpmActivities: TPMActivityEntity[];
    actionPoints: ActionPointEntity[];
    interventions: InterventionEntity[];
    // travels: TravelEntity[]
}

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

export interface SectionPayload {
    new_section_name: string;
}


export type AllConfigs = EntityConfig<InterventionEntity> | EntityConfig<TPMActivityEntity> | EntityConfig<ActionPointEntity>
export type EntityMap = {[K in PropertyNames<ZippedEntityResults>]?: AllConfigs}
