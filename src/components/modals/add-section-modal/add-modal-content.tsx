import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Typography,
    Input,
    FormControl,
    FormHelperText,
    Button,
    CircularProgress
} from '@material-ui/core';
import Box from 'components/box';
import { useModalsState, useModalsDispatch } from 'contexts/page-modals';
import BaseModal, { ModalContentProps } from '..';
import { onSubmitCreateSection } from 'actions';
import { useModalStyles } from '../styles';
import { setValueFromEvent } from 'utils';
import { useAppService } from 'contexts/app';
import { useAddSection } from 'entities/section-entity';
import { Section } from 'entities/types';
import { onToggleAddModal } from 'slices/modals';
import { selectLoading, selectCreatedSection } from 'selectors';
import { onResetCreatedSection } from 'slices/created-section';
import clsx from 'clsx';

const AddSectionModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
    const styles = useModalStyles({});
    const { sectionsService: service } = useAppService();
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const {
        errorOnName,
        setNameError,
        handleValidateSection,
        name,
        setName,
        sectionInstance
    } = useAddSection();

    const createdSection = useSelector(selectCreatedSection);

    const handleSubmit = async () => {
        const error = await dispatch(onSubmitCreateSection(service, sectionInstance.payload));
        if (error !== undefined) {
            setNameError('Section name already exists');
        }
    };

    const SubmitButton = () => {
        const btnContent = (loading && <CircularProgress size={24} />) || 'Submit';
        return (
            <Button
                className={styles.confirmBtn}
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
                disabled={!name.length || Boolean(errorOnName.length) || loading}
            >
                {btnContent}
            </Button>
        );
    };

    return (
        <>
            <Box className={clsx(styles.header, styles.modalSection)} align="center" />
            {createdSection ? (
                <SuccessModalContent section={createdSection} onClose={onClose} />
            ) : (
                <Box column>
                    <FormControl error={Boolean(errorOnName.length)}>
                        <Input
                            id="new-section-name"
                            classes={{
                                input: styles.input
                            }}
                            placeholder="Add new section"
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
                </Box>
            )}
        </>
    );
};

interface SuccessContentProps {
    section: Section;
    onClose(): void;
}

const SuccessModalContent: React.FC<SuccessContentProps> = ({ section, onClose }) => {
    const styles = useModalStyles({});

    return (
        <Box column>
            <Typography variant="h6">Section successfully added.</Typography>
            <Box className={styles.summaryContainer}>
                <Box column>
                    <Typography className={styles.subHeading} variant="body2">
                        Name
                    </Typography>
                    <Typography className={styles.entity} variant="body1">
                        {section.name}
                    </Typography>
                </Box>
            </Box>
            <Button className={styles.closeBtn} onClick={onClose}>
                Close
            </Button>
        </Box>
    );
};

export default function AddSectionModal() {
    const { addModalOpen } = useModalsState();
    const modalDispatch = useModalsDispatch();
    const dispatch = useDispatch();

    const handleClose = () => {
        modalDispatch(onToggleAddModal());
        dispatch(onResetCreatedSection());
    };

    return (
        <BaseModal open={addModalOpen} onClose={handleClose}>
            <AddSectionModalContent onClose={handleClose} />
        </BaseModal>
    );
}
