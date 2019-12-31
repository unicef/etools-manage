import { EntityConfig } from 'entities';
import { ZippedEntities } from 'services/backend';

interface EntitiesAffected {
    tpmActivities: Normalized<TPMActivity>;
    actionPoints: Normalized<ActionPoint>;
    interventions: Normalized<Intervention>;
    travels: Normalized<Travel>;
    engagements: Normalized<Engagement>;
}

interface KeyToEntityMap {
    interventions: Intervention;
    tpmActivities: TPMActivity;
    actionPoints: ActionPoint;
    travels: Travel;
    engagements: Engagement;
}

type EntitySummary = ZippedEntities & { indicators: Indicator[] };

type ModuleKeys = keyof KeyToEntityMap;

type EditComponentMappings = { [key in ModuleKeys]: React.FC };
type EditComponentKeys = keyof EditComponentMappings | '';

type EntityWithSingleSection = Normalized<
    ActionPoint | Travel | Indicator | TPMActivity | { section: null }
>;

interface Normalized<T> {
    [id: string]: T;
}

interface CloseSectionPayload {
    [id: string]: EntitiesAffected;
}

interface SectionToEntity {
    [name: string]: {
        [key in BackendEntityNames]?: number[];
    };
}

type BackendEntityNames =
    | 'interventions'
    | 'applied_indicators'
    | 'travels'
    | 'tpm_activities'
    | 'engagements'
    | 'action_points';

interface CloseSectionBackendPayload {
    old_section: number;
    new_sections: SectionToEntity;
}

interface NewSectionFromSplitPayload {
    name: string;
    active: boolean;
}

type SectionAction = 'close' | 'split';

interface ActionPointAsignee {
    id: number;
    name: string;
    email: string;
}

interface ActionPoint extends SingleSectionEntity {
    id: number;
    reference_number: string;
    description: string;
    status: string;
    assigned_to: ActionPointAsignee;
}

interface Indicator extends SingleSectionEntity {
    title: string;
    pk: number;
}

type EngagementType = 'ma' | 'sa' | 'sc' | 'audit';

interface Engagement extends MultiSectionEntity {
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

interface MultiSectionEntity {
    sections: string[];
    existingSections: string[]; // since some entities like interventions can have multiple sections
    //we display all sections not being closed/split by storing at this property
}
interface SingleSectionEntity {
    section: string;
}

type Entity = SingleSectionEntity | MultiSectionEntity;

type SectionsProp<T> = T extends SingleSectionEntity ? 'section' : 'sections';

interface Intervention extends MultiSectionEntity {
    id: number;
    number: string;
    title: string;
    indicators: Indicator[];
}

interface TPMActivity extends SingleSectionEntity {
    id: number;
    reference_number: string;
    status: string;
    tpm_partner_name: string;
}

type FormattedTPMActivityEntity = Omit<TPMActivity, 'section'> & {
    section: string[];
};

interface Section {
    id: number;
    name: string;
    active: boolean;
}

interface CreateSectionPayload {
    new_section_name: string;
}

interface MergeSectionsPayload {
    new_section_name: string;
    sections_to_merge: number[];
}
interface Travel extends SingleSectionEntity {
    id: number;
    reference_number: string;
    purpose: string;
    traveler: string;
}

interface NewSectionFromMerged {
    pk: number;
    name: string;
}

type SectionServicePayload =
    | CreateSectionPayload
    | MergeSectionsPayload
    | CloseSectionBackendPayload;

interface EditItemProps {
    id: string;
}

interface GenericMultiSectionPayload {
    id: string;
    sections: string[];
}

interface GenericSectionPayload {
    id: string;
    section: string | number | null;
}

interface InProgressItem {
    action: SectionAction;
    name: string;
    id: string;
    storageKey: string;
}

interface IndicatorsPayload {
    id: string;
    indicators: Indicator[];
}

interface FetchStoragePayload {
    id: string;
    countryName: string;
}

interface EntityDisplay<T> {
    label: string;
    display(prop: T): string;
}

interface ResolvedRatio {
    resolved: number;
    total: number;
}

type AllEntities = Intervention | TPMActivity | ActionPoint | Travel | Engagement;

type WrapWithConfig<T> = T extends T ? EntityConfig<T> : never;

interface EditProps<T> {
    closeSectionPayloadKey: string;
}

interface EntityConfig<T> {
    displayProperties: EntityDisplay<T>[];
    title: string;
    sectionsProp: string;
    moduleName: string;
}
