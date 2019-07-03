export type Order = 'asc' | 'desc';

export interface HeadRow<T> {
    disablePadding: boolean;
    numeric: boolean;
    id: keyof T;
    label: string;
}

export interface EnhancedTableProps<T> {
    order: Order;
    orderBy: string;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}
