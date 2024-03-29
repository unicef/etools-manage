import { EntityConfig } from 'entities';
import FMActivityConfig from './fmactivity-entity';

export interface EntitiesAffected {
    tpmActivities: Normalized<TPMActivity>;
    actionPoints: Normalized<ActionPoint>;
    fmActivities: Normalized<FMActivity>;
    fmQuestions: Normalized<FMQuestion>;
    interventions: Normalized<Intervention>;
    travels: Normalized<Travel>;
    engagements: Normalized<Engagement>;
    partners: Normalized<Partner>;
}

export interface KeyToEntityMap {
    interventions: Intervention;
    tpmActivities: TPMActivity;
    fmActivities: FMActivity;
    fmQuestions: FMQuestion;
    actionPoints: ActionPoint;
    travels: Travel;
    engagements: Engagement;
    partners: Partner;
}

export type ModuleKeys = keyof KeyToEntityMap;

export type EditComponentMappings = { [key in ModuleKeys]: React.FC };
export type EditComponentKeys = keyof EditComponentMappings | '';

export type EntityWithSingleSection = Normalized<ActionPoint | Travel | Indicator | TPMActivity | Partner>;

export interface Normalized<T> {
    [id: string]: T;
}

export interface CloseSectionPayload {
    [id: string]: EntitiesAffected;
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
    | 'fm_activities'
    | 'fm_questions'
    | 'engagements'
    | 'action_points'
    | 'partners';

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
    existingSections: string[]; // since some entities like interventions can have multiple sections
    //we display all sections not being closed/split by storing at this property
}

export interface Intervention extends MultiSectionEntity {
    id: number;
    number: string;
    title: string;
    indicators: Indicator[];
}

export interface TPMActivity {
    id: number;
    status: string;
    section: string;
    tpm_partner_name: string;
    visit_reference: string;
}

export interface FMActivity extends MultiSectionEntity {
    id: number;
    reference_number: string;
    status: string;
    tpm_partner: any;
}

export interface FMQuestion extends MultiSectionEntity {
    id: number;
    text: string;
    options: any[];
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
export interface Partner {
    id: number;
    name: string;
    lead_section: string;
    partner_type: string;
    vendor_number: string;
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
    display(prop: T): string;
}

export interface ResolvedRatio {
    resolved: number;
    total: number;
}

export type AllEntities =
    | Intervention
    | TPMActivity
    | FMActivity
    | FMQuestion
    | ActionPoint
    | Travel
    | Indicator
    | Engagement
    | Partner;

export type WrapWithConfig<T> = T extends T ? EntityConfig<T> : never;

export type EntityMap = { [K in keyof EntitiesAffected]: WrapWithConfig<AllEntities> };

export interface EditProps<T> {
    closeSectionPayloadKey: string;
}

export interface EntityConfig<T> {
    displayProperties: EntityDisplay<T>[];
    title: string;
    sectionsProp: string;
    moduleName: string;
}
