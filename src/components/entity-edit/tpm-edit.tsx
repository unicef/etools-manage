import React, { memo } from 'react';
import EditWrapper from 'pages/close-section/edit-wrapper';
import { useSelector } from 'react-redux';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { usePagination } from 'components/table/use-paginator';
import { buildResolvedProgressString } from 'lib/sections';
import { EDIT_ITEMS_ROWS_PER_PAGE } from 'global-constants';
import { TablePagination, Typography } from '@material-ui/core';
import { selectTPMActivitiesIds } from 'selectors/tpm-activities';
import { useEditItemStyles } from './styles';
import TPMActivityEditItem from './tpm-activity-edit-item';
import { customLabel } from 'components/table/table-utils';
import { onSelectAllTPMSections } from 'pages/close-section/actions';

const TPMEdit: React.FC = memo(() => {
    const styles = useEditItemStyles();
    const ids = useSelector(selectTPMActivitiesIds);
    const { tpmActivities: numResolved } = useSelector(selectNumItemsResolved);
    const { page, handleChangePage, handleChangeRowsPerPage } = usePagination();

    const rowsPerPage = EDIT_ITEMS_ROWS_PER_PAGE;
    return (
        <EditWrapper
            title="Third Party Monitoring"
            resolved={buildResolvedProgressString(numResolved)}
            onSectionChange={onSelectAllTPMSections}
        >
            <Typography className={styles.editItemHeading} variant="body2">
                (reference number, tpm partner)
            </Typography>

            {ids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id: string) => (
                <TPMActivityEditItem id={id} key={id} />
            ))}

            {ids.length > 10 && (
                <TablePagination
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
                />
            )}
        </EditWrapper>
    );
});

export default TPMEdit;
