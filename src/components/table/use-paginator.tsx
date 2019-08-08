import React, { useState, Dispatch } from 'react';

export interface Paginator {
    page: number;
    setPage: Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: Dispatch<React.SetStateAction<number>>;
    rowsPerPageOptions: number[];
    setRowsPerPageOptions: Dispatch<React.SetStateAction<number[]>>;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
    handleChangeRowsPerPage: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}


export const usePagination = (rowsPerPageDefault = 5, rowsPerPageOptionsDefault = [5, 10, 20]): Paginator => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDefault);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState(rowsPerPageOptionsDefault);

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(Number(event.target.value));
    }


    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        rowsPerPageOptions,
        setRowsPerPageOptions
    };
};

