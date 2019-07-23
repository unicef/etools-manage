import { EntityDisplay, ModuleEntities, ModuleDisplay, InterventionPayloadFields, TravelPayloadFields, ActionPointsPayloadFields, TPMActivityPayloadFields, FilteredModuleEntities } from './types';
import { NonEmptyModuleResults } from 'services/backend';
import EntityPropMapping from './config-map';
import { keys, zipObj } from 'ramda';

abstract class EntityConfig<T> {
    public abstract get displayProperties(): EntityDisplay<T>[]
    public abstract get title(): string
    public abstract get sectionsProp(): string;
}


export class ModuleEntitiesManager {

       // public get closeRequestPayload(){
    //     //
    // }

    public get entityBuilders() {
        const zip = zipObj(keys(this.entitiesSummary));
        const builders =
    }


}


export default EntityConfig;

