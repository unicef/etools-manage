import React, { memo, useMemo } from 'react';
import EditWrapper from 'pages/close-summary/edit-wrapper';
import { useSelector } from 'react-redux';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { usePagination, customLabel } from 'components/table';
import { buildResolvedProgressString } from 'lib/sections';
import { EDIT_ITEMS_ROWS_PER_PAGE } from 'global-constants';
import { TablePagination, Typography } from '@material-ui/core';
import { selectTPMActivitiesIds } from 'selectors/tpm-activities';
import { useEditItemStyles } from './styles';
import TPMActivityEditItem from './tpm-activity-edit-item';


const TPMEdit: React.FC = memo(() => {
    const styles = useEditItemStyles();
    const ids = useSelector(selectTPMActivitiesIds);
    const { tpmActivities: numResolved } = useSelector(selectNumItemsResolved);
    const {
        page,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePagination();

    const rowsPerPage = EDIT_ITEMS_ROWS_PER_PAGE;
    console.log('Edit Parent');
    return (
        <EditWrapper title="Third Party Monitoring" resolved={buildResolvedProgressString(numResolved)}>
            <Typography className={styles.editItemHeading} variant="body2">(reference number, tpm partner)</Typography>

            {ids
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                    (id: string) => {
                        const Component = useMemo(
                            () => (
                                <TPMActivityEditItem
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


export default TPMEdit;

