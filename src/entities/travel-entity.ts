import { EntityConfig } from 'entities';
import { TravelEntity, EntityDisplay } from './types';
import { TravelsBuilder } from './travels-builder';


export default class TravelsConfig implements EntityConfig<TravelEntity> {
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

    public get builder() {
        return new TravelsBuilder();
    }
}


