import React from 'react';
import { Typography, InputLabel, Input, FormControl, FormHelperText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Box from 'components/box';

import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import BaseModal, { ModalContentProps, useAddSection } from '..';
import { onToggleAddModal, onSubmitAddSection } from 'actions';
import { Aux } from 'components/aux';
import { useFormStyles } from '../styles';
import { setValueFromEvent } from 'utils';
import { SectionsService } from 'services/section';
import { useAppService } from 'contexts/app';


const AddSectionModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
    const styles = useFormStyles({});
    const service: SectionsService = useAppService();
    const dispatch = useModalsDispatch(); // TODO: do we need this here ?
    const {
        errorOnName,
        setNameError,
        handleValidateSection,
        name,
        setName
    } = useAddSection();

    const handleSubmit = () => onSubmitAddSection(service, name, dispatch);
    return (
        <Aux>
            <Box className={styles.header} align="center">
                <AddIcon color="inherit" className={styles.icon}/>
                <Typography
                    className={styles.subtitle}
                    color="inherit"
                    variant="subtitle1">Add new section</Typography>
            </Box>

            <FormControl
                classes={{
                    root: styles.formRoot
                }}
                error={Boolean(errorOnName.length)}>

                <InputLabel
                    className={styles.formLabel}
                    shrink htmlFor="new-section-name">New section</InputLabel>
                <Input
                    id="new-section-name"
                    className={styles.input}
                    classes={{
                        input: styles.inputHeight,
                        focused: styles.inputFocused
                    }}
                    disableUnderline
                    placeholder="Enter new section name"
                    value={name}
                    onChange={setValueFromEvent(setName)}
                    onBlur={handleValidateSection}
                    onFocus={() => setNameError('')}
                />
                <FormHelperText id="component-error-text">{errorOnName}</FormHelperText>
            </FormControl>
            <Box align="center" justify="end">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    className={styles.confirmBtn}
                    color="secondary"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!name.length || Boolean(errorOnName.length)}
                >Submit</Button>
            </Box>
        </Aux>
    );
};

const AddSectionModal: React.FC = () => {
    const { addModalOpen } = useModalsState();
    const dispatch = useModalsDispatch();
    const handleClose = () => dispatch(onToggleAddModal);

    return (
        <BaseModal open={addModalOpen} onClose={handleClose} >
            <AddSectionModalContent onClose={handleClose} />
        </BaseModal>
    );
};


export default AddSectionModal;
