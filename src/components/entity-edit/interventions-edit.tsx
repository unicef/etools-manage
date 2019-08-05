import React, { memo, useMemo } from 'react';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import { InterventionEditItem } from './intervention-edit-item';
import { selectInterventionIds } from 'selectors/interventions';
import { useSelector } from 'react-redux';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { usePagination, customLabel } from 'components/table';
import { buildResolvedProgressString } from 'lib/sections';
import { EDIT_INTERVENTIONS_ROWS_PER_PAGE } from 'global-constants';
import { TablePagination } from '@material-ui/core';


const InterventionsEdit: React.FC = memo(() => {
    const ids = useSelector(selectInterventionIds);
    const { interventions: numResolved } = useSelector(selectNumItemsResolved);
    const {
        page,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePagination();

    const rowsPerPage = EDIT_INTERVENTIONS_ROWS_PER_PAGE;
    console.log('Edit Parent');
    return (
        <EditWrapper title="Partnership Management Portal" resolved={buildResolvedProgressString(numResolved)}>

            {ids
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                    (id: string) => {
                        const Component = useMemo(
                            () => (
                                <InterventionEditItem
                                    id={id}
                                    key={id} />
                            ), [id]
                        );
                        return Component;
                    }
                )}

            {ids.length > 10 && <TablePagination
                rowsPerPageOptions={[]}
                labelDisplayedRows={customLabel}
                component="div"
                count={ids.length}
                rowsPerPage={10}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
        </EditWrapper>

    );
});


export default (InterventionsEdit);

