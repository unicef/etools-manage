import React from 'react';
import SplitIcon from '@material-ui/icons/CallSplit';
import { Typography, FormControl, Input, FormHelperText, Button, Theme } from '@material-ui/core';
import BaseModal, { ModalContentProps } from '..';
import { useModalStyles } from '../styles';
import Box from 'components/box';
import { History } from 'history';

import { withRouter } from 'react-router';
import { useAddSection } from 'entities/section-entity';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentActiveSection, selectCurrentActiveSectionName } from 'selectors';
import { setValueFromEvent } from 'utils';
import { useModalsDispatch, useModalsState } from 'contexts/page-modals';
import { onToggleSplitModal } from 'slices/modals';
import { makeStyles, createStyles } from '@material-ui/styles';
import { SectionBox } from 'components/section-box';
import clsx from 'clsx';
import { persistToStorage } from 'pages/split-section/actions';
import { getSplitSectionUrl } from 'lib/sections';

const useSplitStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 600
        },
        input: {
            height: theme.spacing(3),
            paddingLeft: 0,
            fontSize: '1.2rem',
            color: '#3c4043',
            fontWeight: 400
        },
        flipIcon: {
            transform: 'rotate(180deg)',
            color: theme.palette.text.hint
        },
        formRoot: {
            alignItems: 'center',
            '&:first-child': {
                marginRight: theme.spacing(4)
            }
        }
    })
);

export default function SplitModal() {
    const { splitModalOpen } = useModalsState();
    const dispatch = useModalsDispatch();

    const styles = useSplitStyles();

    const handleClose = () => dispatch(onToggleSplitModal);

    return (
        <BaseModal open={splitModalOpen} onClose={handleClose} className={styles.root}>
            <SplitModalContent onClose={handleClose} />
        </BaseModal>
    );
}

const SplitModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
    const styles = useModalStyles();
    const splitStyles = useSplitStyles();
    const currentSectionName = useSelector(selectCurrentActiveSectionName);
    const currentActiveSectionId = useSelector(selectCurrentActiveSection);
    const dispatch = useDispatch();
    const { errorOnName, setNameError, handleValidateSection, name, setName } = useAddSection();

    const {
        errorOnName: errorOnNameTwo,
        setNameError: setNameErrorTwo,
        handleValidateSection: handleValidateSectionTwo,
        name: nameTwo,
        setName: setNameTwo
    } = useAddSection();

    const handleSubmit = (history: History) => () => {
        const splitUrl = getSplitSectionUrl(currentActiveSectionId);

        const payload = [{ name, active: true }, { name: nameTwo, active: true }];
        dispatch(persistToStorage(payload));

        history.push(splitUrl);
        onClose();
    };

    const SubmitButton = withRouter(({ history }) => {
        const isDisabled =
            !name.length ||
            !nameTwo.length ||
            Boolean(errorOnName.length) ||
            Boolean(errorOnNameTwo.length);
        return (
            <Button
                onClick={handleSubmit(history)}
                className={styles.confirmBtn}
                color="secondary"
                variant="contained"
                disabled={isDisabled}
            >
                Continue
            </Button>
        );
    });

    return (
        <Box column>
            <Box className={clsx(styles.header, styles.modalSection)} align="center">
                <Typography className={styles.subtitle} color="inherit" variant="subtitle1">
                    Split Section
                </Typography>
            </Box>

            <Box column align="center">
                <SectionBox name={currentSectionName} className={styles.modalSection} />
                <SplitIcon fontSize="large" className={splitStyles.flipIcon} />
            </Box>
            <Box className={styles.modalSection} justify="center">
                <FormControl className={splitStyles.formRoot} error={Boolean(errorOnName.length)}>
                    <Input
                        classes={{
                            input: splitStyles.input
                        }}
                        id="new-section-name"
                        placeholder="Enter first section"
                        value={name}
                        onChange={setValueFromEvent(setName)}
                        onBlur={handleValidateSection}
                        onFocus={() => setNameError('')}
                    />
                    <FormHelperText id="component-error-text">{errorOnName}</FormHelperText>
                </FormControl>

                <FormControl
                    className={splitStyles.formRoot}
                    error={Boolean(errorOnNameTwo.length)}
                >
                    <Input
                        classes={{
                            input: splitStyles.input
                        }}
                        id="new-section-nametwo"
                        placeholder="Enter second section"
                        value={nameTwo}
                        onChange={setValueFromEvent(setNameTwo)}
                        onBlur={handleValidateSectionTwo}
                        onFocus={() => setNameErrorTwo('')}
                    />
                    <FormHelperText id="component-error-text">{errorOnNameTwo}</FormHelperText>
                </FormControl>
            </Box>

            <Box align="center" justify="end">
                <Button onClick={onClose}>Cancel</Button>
                <SubmitButton />
            </Box>
        </Box>
    );
};
