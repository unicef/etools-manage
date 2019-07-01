import { SectionEntity } from 'entities/section';
import wrappedFetch from 'lib/fetch';

interface SectionsService {
    getSections(): Promise<SectionEntity[]>;
    createSection(data: SectionEntity): Promise<SectionEntity>;
    closeSection(data: SectionEntity): Promise<SectionEntity>;
}

export default class SectionsAPI implements SectionsService {

    public constructor(httpClient)
    public async getSections(): Promise<SectionEntity[]> {
        const response = await wrappedFetch(process.env.SECTIONS_ENDPOINT);
        return response;
    }
    public async createSection(data: SectionEntity): Promise<SectionEntity> {

    }
}
