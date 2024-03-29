import React from 'react';
import { EDIT_ITEMS_ROWS_PER_PAGE } from 'global-constants';
import { useSelector } from 'react-redux';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { selectTravelsIds } from 'selectors/travels';
import EditWrapper from 'pages/close-section/edit-wrapper';
import { buildResolvedProgressString } from 'lib/sections';
import { usePagination } from 'components/table/use-paginator';
import { TablePagination, Typography } from '@material-ui/core';
import TravelEditItem from './travel-edit-item';
import { useEditItemStyles } from './styles';
import { customLabel } from 'components/table/table-utils';
import { onSelectAllTravelSection } from 'pages/close-section/actions';

const TravelsEdit: React.FC = () => {
    const ids = useSelector(selectTravelsIds);
    const styles = useEditItemStyles();
    const { travels: numResolved } = useSelector(selectNumItemsResolved);
    const {
        page,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePagination();

    const rowsPerPage = EDIT_ITEMS_ROWS_PER_PAGE;

    return (<EditWrapper title="Trip Management" resolved={buildResolvedProgressString(numResolved)}
                onSectionChange={onSelectAllTravelSection}>
        <Typography className={styles.editItemHeading} variant="body2">(traveler, reference number, purpose)</Typography>
        {ids
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(
                (id: string) => (
                    <TravelEditItem
                        id={id}
                        key={id} />
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

export default TravelsEdit;
