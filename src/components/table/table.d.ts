export type Order = 'asc' | 'desc';

export interface HeadRow<T> {
    disablePadding: boolean;
    numeric: boolean;
    id: keyof T;
    label: string;
}

export type EntityRow<T> = HeadRow<T>;
export type SectionHeadRow = {
    id: number;
    name: string;
    actions: string;
}


export interface EnhancedTableHeadProps<T> {
    headRows: HeadRow<T>[];
    order: Order;
    orderBy: keyof T;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}

export interface TableToolbarProps {
    title: string;
    children?: React.ReactNode;
    className?: string | undefined;
}

