import { EntityConfig } from 'entities';

export interface ZippedEntityResults {
    indicators: Normalized<Indicator>;
    tpmActivities: Normalized<TPMActivity>;
    actionPoints: Normalized<ActionPoint>;
    interventions: Normalized<Intervention>;
    travels: Normalized<Travel>;
    engagements: Normalized<Engagement>;
}

export type ModuleEntities = Omit<ZippedEntityResults, 'indicators'>;

export interface KeyToEntityMap {
    interventions: Intervention;
    tpmActivities: TPMActivity;
    actionPoints: ActionPoint;
    travels: Travel;
    indicators: Indicator;
    engagements: Engagement;
}

export type EntityWithSingleSection = Normalized<ActionPoint | Travel | Indicator | TPMActivity>;

export interface Normalized<T> {
    [id: string]: T;
}

export type NonEmptyEntityResults = Partial<ZippedEntityResults>;

export interface CloseSectionPayload {
    [id: string]: ModuleEntities;
}

export interface SectionToEntity {
    [name: string]: {
        [key in BackendEntityNames]?: number[];
    };
}

export type BackendEntityNames =
    | 'interventions'
    | 'applied_indicators'
    | 'travels'
    | 'tpm_activities'
    | 'engagements'
    | 'action_points';

export interface CloseSectionBackendPayload {
    old_section: number;
    new_sections: SectionToEntity;
}

export interface NewSectionFromSplitPayload {
    name: string;
    active: boolean;
}

export type SectionAction = 'close' | 'split';
export interface ActionPointAsignee {
    id: number;
    name: string;
    email: string;
}
export interface ActionPoint {
    id: number;
    reference_number: string;
    description: string;
    status: string;
    section: string;
    assigned_to: ActionPointAsignee;
}

export interface Indicator {
    title: string;
    section: string;
    pk: number;
}
export type EngagementType = 'ma' | 'sa' | 'sc' | 'audit';
export interface Engagement extends MultiSectionEntity {
    id: number;
    unique_id: string;
    status: 'partner_contacted' | 'report_submitted';
    agreement: {
        auditor_firm: {
            name: string;
        };
    };
    partner: {
        name: string;
    };
    engagement_type: EngagementType;
}

export interface MultiSectionEntity {
    sections: string[];
    existingSections: string[]; // we store sections that exist on the entity but cannot be removed at this property
}
export interface Intervention extends MultiSectionEntity {
    id: number;
    number: string;
    title: string;
    indicators: Indicator[];
}

export interface TPMActivity {
    id: number;
    reference_number: string;
    status: string;
    section: string;
    tpm_partner_name: string;
}

export type FormattedTPMActivityEntity = Omit<TPMActivity, 'section'> & {
    section: string[];
};

export interface Section {
    id: number;
    name: string;
    active: boolean;
}

export interface CreateSectionPayload {
    new_section_name: string;
}

export interface MergeSectionsPayload {
    new_section_name: string;
    sections_to_merge: number[];
}
export interface Travel {
    id: number;
    section: string;
    reference_number: string;
    purpose: string;
    traveler: string;
}

export interface NewSectionFromMerged {
    pk: number;
    name: string;
}

export type SectionServicePayload =
    | CreateSectionPayload
    | MergeSectionsPayload
    | CloseSectionBackendPayload;

export interface EditItemProps {
    id: string;
}

export interface GenericMultiSectionPayload {
    id: string;
    sections: string[];
}
export interface GenericSectionPayload {
    id: string;
    section: number | null;
}

export interface InProgressItem {
    action: SectionAction;
    name: string;
    id: string;
    storageKey: string;
}

export interface IndicatorsPayload {
    id: string;
    indicators: Indicator[];
}

export interface FetchStoragePayload {
    id: string;
    countryName: string;
}
export interface EntityDisplay<T> {
    label: string;
    display(T): string;
}

export interface ResolvedRatio {
    resolved: number;
    total: number;
}

export type AllEntities =
    | Intervention
    | TPMActivity
    | ActionPoint
    | Travel
    | Indicator
    | Engagement;

export type WrapWithConfig<T> = T extends T ? EntityConfig<T> : never;

export type EntityMap = { [K in keyof ZippedEntityResults]: WrapWithConfig<AllEntities> };
