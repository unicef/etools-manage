import { EntityConfig } from 'entities';

export interface MergeProps {
    sections: string;
    newName: string;
}

interface EntityTableHeadProps<T> {
    entityConfig: EntityConfig<T>;
}

export interface EntityChangesTableProps<T> {
    config: EntityConfig<T>;
    entity: Normalized<T>;
    getOldSections: (item: T, sectionsProp: string) => string;
    getNewSections: (item: T, sectionsProp: string) => string;
}
