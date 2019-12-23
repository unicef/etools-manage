import React, { memo } from 'react';
import EditWrapper from 'pages/close-section/edit-wrapper';
import { useSelector } from 'react-redux';
import EngagementEditItem from './engagement-edit-item';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { usePagination } from 'components/table/use-paginator';
import { buildResolvedProgressString } from 'lib/sections';
import { EDIT_ITEMS_ROWS_PER_PAGE } from 'global-constants';
import { TablePagination } from '@material-ui/core';
import { customLabel } from 'components/table/table-utils';
import { selectEngagementIds } from 'selectors/engagements';
import EngagementEditTableHeading from './engagement-table-head';

const EngagementEdit: React.FC = memo(() => {
    const ids = useSelector(selectEngagementIds);

    const { engagements: numResolved } = useSelector(selectNumItemsResolved);

    const { page, handleChangePage, handleChangeRowsPerPage } = usePagination();

    return (
        <EditWrapper
            title="Financial Assurance"
            resolved={buildResolvedProgressString(numResolved)}
            maxWidth="xl"
        >
            <EngagementEditTableHeading></EngagementEditTableHeading>
            {ids
                .slice(
                    page * EDIT_ITEMS_ROWS_PER_PAGE,
                    page * EDIT_ITEMS_ROWS_PER_PAGE + EDIT_ITEMS_ROWS_PER_PAGE
                )
                .map((id: string) => (
                    <EngagementEditItem id={id} key={id} />
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

export default EngagementEdit;
