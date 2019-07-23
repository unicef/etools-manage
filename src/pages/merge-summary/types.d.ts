import EntityConfig from 'entities';

export interface MergeProps {
    sections: string;
    newName: string;
}

interface EntityTableHeadProps<T> {
    entity: EntityConfig<T>;
}

export interface EntityTableProps<T> {
    config: EntityConfig<T>;
    list: T[];
    selectedSections: number[];
    newSectionName: string;
}
