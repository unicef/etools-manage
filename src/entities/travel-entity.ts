import { EntityConfig } from 'entities';
import { TravelEntity, EntityDisplay } from './types';
import { TravelsBuilder } from './travels-builder';
import { set, lensProp, map } from 'ramda';


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
    public get moduleName() {
        return 'Trip Management';
    }
}

const setSectionToUndefined = set(lensProp('section'), undefined);
export const travelsRemoveSection = (list: TravelEntity[]) => map(setSectionToUndefined, list);


// list.map(
//     (travel: TravelEntity) => ({
//         ...travel,
//         section: undefined
//     })
// );
