import { schema } from 'normalizr';

export const section = new schema.Entity('section');

export const indicatorSchema = new schema.Entity(
    'indicators',
    {},
    {
        idAttribute: 'pk'
    }
);

export const interventionSchema = new schema.Entity('interventions', {
    sections: [section]
});

export const travelsSchema = new schema.Entity('travels');
export const tpmActivitiesSchema = new schema.Entity('tpmActivities');
export const fmActivitiesSchema = new schema.Entity('fmActivities');
export const fmQuestionsSchema = new schema.Entity('fmQuestions');
export const actionPointsSchema = new schema.Entity('actionPoints');
export const engagementsSchema = new schema.Entity('engagements');
export const partnersSchema = new schema.Entity('partners');
