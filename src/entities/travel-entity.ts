import EntityConfig from 'entities';
import { TravelEntity, EntityDisplay } from './types';


export default class TravelsConfig extends EntityConfig<TravelEntity> {
    public get displayProperties(): EntityDisplay<TravelEntity>[] {
        return [
            {
                label: 'Reference number',
                propName: 'reference_number'
            },
            {
                label: 'Purpose',
                propName: 'purpose'
            }
        ];
    }
    public get title() {
        return 'Travels';
    }
    public get sectionsProp() {
        return 'section';
    }
}


