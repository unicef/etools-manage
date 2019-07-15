import React from 'react';
import { Typography, InputLabel, Input, FormControl, FormHelperText, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Box from 'components/box';

import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import BaseModal, { ModalContentProps } from '..';
import { onToggleAddModal, onSubmitCreateSection, onResetCreatedSection } from 'actions';

import { useModalStyles } from '../styles';
import { setValueFromEvent } from 'utils';
import { useAppService, useAppDispatch, useAppState } from 'contexts/app';
import { useAddSection, SectionEntity } from 'entities/section-entity';

const AddSectionModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
    const styles = useModalStyles({});
    const { sectionsService: service } = useAppService();
    const { loading } = useAppState();
    const dispatch = useAppDispatch();
    console.log('RENDER AGAIN');
    const {
        errorOnName,
        setNameError,
        handleValidateSection,
        name,
        setName,
        sectionInstance
    } = useAddSection();

    const { createdSection } = useAppState();

    const handleSubmit = () => onSubmitCreateSection(service, sectionInstance.payload, dispatch);

    const SubmitButton = () => {
        const btnContent = loading && <CircularProgress size={24} /> || 'Submit';
        return (<Button
            className={styles.confirmBtn}
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
            disabled={!name.length || Boolean(errorOnName.length) || loading}
        >{btnContent}</Button>);
    };

    return (
        <>
            <Box className={styles.header} align="center">
                <AddIcon color="inherit" className={styles.icon}/>
                <Box><Typography
                    className={styles.subtitle}
                    color="inherit"
                    variant="subtitle1">Add new section</Typography></Box>
            </Box>
            {
                createdSection ?
                    <SuccessModalContent section={createdSection} onClose={onClose} />

                    : <>
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
                            <SubmitButton />
                        </Box>
                    </>
            }
        </>
    );
};

interface SuccessContentProps {
    section: SectionEntity;
    onClose(): void;
}


const SuccessModalContent: React.FC<SuccessContentProps> = ({ section, onClose }) => {
    const styles = useModalStyles({});

    return (
        <Box column>
            <Typography variant="h6">Section successfully added.</Typography>
            <Box className={styles.summaryContainer} justify="between">
                <Box column>
                    <Typography className={styles.subHeading} variant="subtitle1">Name</Typography>
                    <Typography className={styles.entity} variant="body1">{section.name}</Typography>
                </Box>

                <Box column>
                    <Typography className={styles.subHeading} variant="subtitle1">Id</Typography>
                    <Typography className={styles.entity} variant="body1">{section.id}</Typography>
                </Box>

            </Box>
            <Button className={styles.closeBtn} onClick={onClose}>Close</Button>
        </Box>
    );
};


export default function AddSectionModal() {
    const { addModalOpen } = useModalsState();
    const dispatch = useModalsDispatch();
    const appDispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(onToggleAddModal);
        appDispatch(onResetCreatedSection);
    };

    return (
        <BaseModal open={addModalOpen} onClose={handleClose} >
            <AddSectionModalContent onClose={handleClose} />
        </BaseModal>
    );
}
