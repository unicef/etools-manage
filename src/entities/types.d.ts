

export interface ZippedEntityResults {
    indicators: IndicatorEntity[];
    tpmActivities: TPMActivityEntity[];
    actionPoints: ActionPointEntity[];
    // travels: TravelEntity[]
}

export interface ActionPointEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
}

export interface IndicatorEntity {
    id: number;
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
}


export interface SectionEntity {
    id: number ;
    name: string;
}

export interface SectionPayload {
    new_section_name: string;
}


export type AllConfigs = EntityConfig<IndicatorEntity> | EntityConfig<TPMActivityEntity> | EntityConfig<ActionPointEntity>
export type EntityMap = {[K in PropertyNames<ZippedEntityResults>]?: AllConfigs}
