import React, { memo } from 'react';
import EditWrapper from 'pages/close-section/edit-wrapper';
import { useSelector } from 'react-redux';
import { selectNumItemsResolved } from 'selectors/num-items-resolved';
import { usePagination } from 'components/table/use-paginator';
import { buildResolvedProgressString } from 'lib/sections';
import { EDIT_ITEMS_ROWS_PER_PAGE } from 'global-constants';
import { TablePagination } from '@material-ui/core';
import { selectFMQuestionsIds } from 'selectors/fm-questions';
import FMQuestionEditItem from './fm-question-edit-item';
import { customLabel } from 'components/table/table-utils';
import { onSelectAllFMQuestionSections } from 'pages/close-section/actions';

const FMQuestionEdit: React.FC = memo(() => {
    const ids = useSelector(selectFMQuestionsIds);
    const { fmQuestions: numResolved } = useSelector(selectNumItemsResolved);
    const { page, handleChangePage, handleChangeRowsPerPage } = usePagination();

    const rowsPerPage = EDIT_ITEMS_ROWS_PER_PAGE;
    return (
        <EditWrapper
            title="Field Monitoring Question"
            resolved={buildResolvedProgressString(numResolved)}
            onMultiSectionChange={onSelectAllFMQuestionSections}
        >
            {ids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id: string) => (
                <FMQuestionEditItem id={id} key={id} />
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

export default FMQuestionEdit;
