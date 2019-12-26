import { Engagement, EntityDisplay, EntityConfig } from './types';
import { ENGAGEMENT_TYPES } from 'components/entity-edit/engagement-edit-item';

export default class EngagementsConfig implements EntityConfig<Engagement> {
    public get displayProperties(): EntityDisplay<Engagement>[] {
        return [
            { label: 'Reference Number', display: item => item.unique_id },
            {
                label: 'Engagement Type',
                display: (item: Engagement) => ENGAGEMENT_TYPES[item.engagement_type]
            }
        ];
    }
    public get title() {
        return 'Engagements';
    }
    public get sectionsProp() {
        return 'sections';
    }

    public get moduleName() {
        return 'Financial Assurance';
    }
}
