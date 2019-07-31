import { EntityConfig } from 'entities';
import { ActionPointEntity, EntityDisplay } from './types';
import { map, reject, propEq } from 'ramda';


export default class ActionPointConfig implements EntityConfig<ActionPointEntity> {
    public get displayProperties(): EntityDisplay<ActionPointEntity>[] {
        return [
            { label: 'Reference Number', propName: 'reference_number' },
            { label: 'Description', propName: 'description' }
        ];
    }
    public get title() {
        return 'Action Points';
    }
    public get sectionsProp() {
        return 'section';
    }

    public get moduleName() {
        return 'Action Points';
    }
}


export const actionPointsRemoveSection = (list: ActionPointEntity[], id: number) => map(
    (actionPoint: ActionPointEntity) => {
        const withoutSection = reject(propEq('id', id), actionPoint.section);
        return ({
            ...actionPoint,
            section: withoutSection
        });
    }, list
);
