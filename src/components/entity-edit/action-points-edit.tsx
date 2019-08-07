import React, { useMemo } from 'react';
import { EDIT_ITEMS_ROWS_PER_PAGE } from 'global-constants';
import { useSelector } from 'react-redux';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { selectActionPointsIds } from 'selectors/action-points';
import EditWrapper from 'pages/close-section/edit-wrapper';
import { buildResolvedProgressString } from 'lib/sections';
import { usePagination, customLabel } from 'components/table';
import { TablePagination, Typography } from '@material-ui/core';
import { useEditItemStyles } from './styles';
import ActionPointEditItem from './action-point-edit-item';

const ActionPointsEdit: React.FC = () => {
    const ids = useSelector(selectActionPointsIds);
    const styles = useEditItemStyles();
    const { actionPoints: numResolved } = useSelector(selectNumItemsResolved);
    const {
        page,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePagination();

    const rowsPerPage = EDIT_ITEMS_ROWS_PER_PAGE;

    return (<EditWrapper title="Action Points" resolved={buildResolvedProgressString(numResolved)}>
        <Typography className={styles.editItemHeading} variant="body2">(reference number, description)</Typography>
        {ids
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(
                (id: string) => useMemo(
                    () => (
                        <ActionPointEditItem
                            id={id}
                            key={id} />
                    ), [id]
                )
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
    </EditWrapper>);
};

export default ActionPointsEdit;
