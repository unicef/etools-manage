import React from 'react';
import { EDIT_ITEMS_ROWS_PER_PAGE } from 'global-constants';
import { useSelector } from 'react-redux';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { selectPartnerIds } from 'selectors/partners';
import EditWrapper from 'pages/close-section/edit-wrapper';
import { buildResolvedProgressString } from 'lib/sections';
import { usePagination } from 'components/table/use-paginator';
import { TablePagination, Typography } from '@material-ui/core';
import { useEditItemStyles } from './styles';
import PartnerEditItem from './partner-edit-item';
import { customLabel } from 'components/table/table-utils';
import { onSelectAllPartnerSection } from 'pages/close-section/actions';

const PartnerEdit: React.FC = () => {
    const ids = useSelector(selectPartnerIds);
    const styles = useEditItemStyles();
    const { partners: numResolved } = useSelector(selectNumItemsResolved);
    const {
        page,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePagination();

    const rowsPerPage = EDIT_ITEMS_ROWS_PER_PAGE;

    return (<EditWrapper title="PMP Partners" resolved={buildResolvedProgressString(numResolved)}
                onSectionChange={onSelectAllPartnerSection}>
        <Typography className={styles.editItemHeading} variant="body2">(vendor number, partner)</Typography>
        {ids
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(
                (id: string) => (
                    <PartnerEditItem
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

export default PartnerEdit;
