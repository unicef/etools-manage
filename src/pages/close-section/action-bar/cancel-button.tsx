import React, { useState } from 'react';
import Box from 'components/box';
import ConfirmDeleteDialog from 'components/modals/confirm-dialog';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getStorageKeyFromCurrentActive } from 'selectors/in-progress-items';
import { withRouter } from 'react-router';
import { History } from 'history';


const CancelSectionAction = ({ history }: {history: History}) => {
    const [open, setOpen] = useState<boolean>(false);
    const inProgressRow = useSelector(getStorageKeyFromCurrentActive);

    const handleClose = () => {
        setOpen(false);
        history.push('/');
    };

    return (
        <Box>
            <Button variant="outlined" onClick={() => setOpen(true)}>Cancel</Button>

            <ConfirmDeleteDialog
                open={open}
                handleConfirm={handleClose}
                handleClose={() => setOpen(false)}
                rowToDelete={inProgressRow}
            />
        </Box>);
};


export default withRouter(CancelSectionAction);
