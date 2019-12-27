import { EntityConfig } from 'entities/types';

export interface MergeProps {
    sections: string;
    newName: string;
}

interface EntityTableHeadProps<T> {
    entityConfig: EntityConfig<T>;
}

type UtilGetSections<T> = (item: T, sectionsProp: string) => string;

export interface EntityChangesTableProps<T> {
    config: EntityConfig<T>;
    entity: Normalized<T>;
    getOldSections: UtilGetSections<T>;
    getNewSections: UtilGetSections<T>;
}
