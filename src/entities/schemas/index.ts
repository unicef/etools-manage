import { schema } from 'normalizr';


export const indicatorSchema = new schema.Entity('indicators', undefined, {
    idAttribute: 'pk'
});

export const interventionSchema = new schema.Entity('interventions', {
});

export const travelsSchema = new schema.Entity('travels');
export const tpmActivitiesSchema = new schema.Entity('tpmActivities');
export const actionPointsSchema = new schema.Entity('actionPoints');
