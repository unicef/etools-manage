import React from 'react';
import MergeIcon from '@material-ui/icons/MergeType';
import { History } from 'history';
import { makeStyles, Theme, createStyles, Typography,  Input, FormControl, FormHelperText, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BaseModal, { ModalContentProps } from '..';
import { setValueFromEvent } from 'utils';
import { useAddSection } from 'entities/section-entity';
import { useModalStyles } from '../styles';
import Box from 'components/box';
import { useMergeState } from '.';
import { SectionBox, ReviewBox } from 'components/section-box';
import { onToggleMergeModal } from 'reducers/modals';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 440
        }
    }),
);


const MergeModalContent: React.FC<ModalContentProps> = ({ onClose }) => {

    const formStyles = useModalStyles({});

    const {
        selectedSectionsFromCollection,
        selectedForMerge
    } = useMergeState();

    const {
        errorOnName,
        setNameError,
        handleValidateSection,
        name,
        setName
    } = useAddSection();

    const [first, second] = selectedSectionsFromCollection;

    const mergeConfirmUrl = `/merge/?sections=${selectedForMerge.join(',')}&newName=${name}`;

    const handleSubmit = (history: History) => () => {
        onClose();
        history.push(mergeConfirmUrl);
    };

    const SubmitButton = withRouter(({ history }) => (
        <Button
            onClick={handleSubmit(history)}
            className={formStyles.confirmBtn}
            color="secondary"
            variant="contained"
            disabled={!name.length || Boolean(errorOnName.length)}
        >Continue</Button>
    ));

    return (
        <>
            <Box className={formStyles.header} align="center">
                <MergeIcon color="inherit"/>
                <Typography
                    className={formStyles.subtitle}
                    color="inherit"
                    variant="subtitle1">Merge Sections</Typography>
            </Box>

            <ReviewBox>
                <SectionBox name={first.name} />
                <SectionBox name={second.name} />
            </ReviewBox>

            <FormControl
                error={Boolean(errorOnName.length)}>


                <Input
                    className={formStyles.input}
                    classes={{
                        input: formStyles.input,
                        focused: formStyles.inputFocused
                    }}
                    disableUnderline
                    id="new-section-name"
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
    );
};


const MergeModal = () => {
    const { mergeModalOpen, dispatch } = useMergeState();
    const handleClose = () => dispatch(onToggleMergeModal);

    const styles = useStyles({});
    return (
        <BaseModal open={mergeModalOpen} onClose={handleClose} className={styles.root}>
            <MergeModalContent onClose={handleClose} />
        </BaseModal>
    );
};

export default MergeModal;
