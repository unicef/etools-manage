import { FMQuestion, EntityDisplay, EntityConfig } from './types';
import { prop } from 'ramda';

export default class FMQuestionConfig implements EntityConfig<FMQuestion> {
    public get displayProperties(): EntityDisplay<FMQuestion>[] {
        return [{ label: 'Text', display: prop('text') }];
    }

    public get title() {
        return 'FM Questions';
    }
    public get sectionsProp() {
        return 'sections';
    }

    public get moduleName() {
        return 'Field Monitoring Questions';
    }
}
