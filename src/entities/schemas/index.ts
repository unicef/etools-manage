// import { schema } from 'normalizr';


// export const indicatorSchema = new schema.Entity('indicators', undefined, {
//     idAttribute: 'pk'
// });

// export const interventionSchema = new schema.Entity('interventions', {
// });

// export const travelsSchema = new schema.Entity('travels');
// export const tpmActivitiesSchema = new schema.Entity('tpmActivities');
// export const actionPointsSchema = new schema.Entity('actionPoints');


import { schema } from 'normalizr';

export const section = new schema.Entity('section');

export const indicatorSchema = new schema.Entity('indicators', {
}, {
    idAttribute: 'pk'
});

export const interventionSchema = new schema.Entity('interventions', {
    sections: [section],
    indicators: [indicatorSchema]
});

export const travelsSchema = new schema.Entity('travels');
export const tpmActivitiesSchema = new schema.Entity('tpmActivities');
export const actionPointsSchema = new schema.Entity('actionPoints');


