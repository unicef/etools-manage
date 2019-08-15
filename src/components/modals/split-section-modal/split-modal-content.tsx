import React from 'react';
import SplitIcon from '@material-ui/icons/CallSplit';
import { Typography, FormControl, Input, FormHelperText, Button } from '@material-ui/core';
import BaseModal, { ModalContentProps } from '..';
import { useModalStyles } from '../styles';
import Box from 'components/box';
import { History } from 'history';

import { withRouter } from 'react-router';
import { useAddSection } from 'entities/section-entity';
import { useSelector } from 'react-redux';
import { selectCurrentActiveSection } from 'selectors';
import { setValueFromEvent } from 'utils';
import { useModalsDispatch, useModalsState } from 'contexts/page-modals';
import { onToggleSplitModal } from 'reducers/modals';


export default function SplitModal() {
    const { splitModalOpen } = useModalsState();
    const dispatch = useModalsDispatch();

    const handleClose = () => dispatch(onToggleSplitModal);

    return (
        <BaseModal open={splitModalOpen} onClose={handleClose}>
            <SplitModalContent onClose={handleClose}/>
        </BaseModal>
    );
}

const SplitModalContent: React.FC<ModalContentProps> = ({ onClose }) => {

    const formStyles = useModalStyles();
    const currentActiveSection = useSelector(selectCurrentActiveSection);
    // const [state, dispatch] = useReducer(splitModalReducer, splitSectionInitialState);
    // const { nameOne, nameTwo } = state;
    const {
        errorOnName,
        setNameError,
        handleValidateSection,
        name,
        setName
    } = useAddSection();

    const {
        errorOnName: errorOnNameTwo,
        setNameError: setNameErrorTwo,
        handleValidateSection: handleValidateSectionTwo,
        name: nameTwo,
        setName: setNameTwo
    } = useAddSection();


    // const handleChange = (setter: PayloadActionCreator<unknown, string>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value }: {value: string} = event.target;
    //     dispatch(setter(value));

    // };

    // Temp
    const handleSubmit = (history: History) => () => {
        const closeSectionUrl = `/close/${currentActiveSection}`;
        onClose();
        // dispatch to add new sections from state
        history.push(closeSectionUrl);
    };

    const SubmitButton = withRouter(({ history }) => (
        <Button
            onClick={handleSubmit(history)}
            className={formStyles.confirmBtn}
            color="secondary"
            variant="contained"
            disabled={!name.length && !nameTwo.length || Boolean(errorOnName.length) || Boolean(errorOnNameTwo.length) }
        >Continue</Button>
    ));

    return (
        <Box column>
            <Box className={formStyles.header} align="center">
                <SplitIcon color="inherit"/>
                <Typography
                    className={formStyles.subtitle}
                    color="inherit"
                    variant="subtitle1">Split Section</Typography>
            </Box>

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
        </Box>
    );
};

