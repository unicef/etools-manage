import React from 'react';
import MergeIcon from '@material-ui/icons/MergeType';
import { makeStyles, Theme, createStyles, Typography, InputLabel, Input, FormControl, FormHelperText, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BaseModal, { ModalContentProps } from '..';
import { Aux } from 'components/aux';
import { setValueFromEvent } from 'utils';
import { SectionEntity, useAddSection } from 'entities/section-entity';
import { useModalStyles } from '../styles';
import Box from 'components/box';
import { useMergeState } from '.';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 440
        },
        reviewBox: {
            background: 'rgba(236,239,241,.38)',
            marginBottom: theme.spacing(2)
        },

        section: {
            padding: theme.spacing(1),

            lineHeight: 'inherit',
            flex: 1,
            '&:nth-child(1)': {
                paddingBottom: 0
            }
        },
        sectionTitle: {
            fontSize: 13,
            lineHeight: 'inherit',
            color: theme.palette.action.active,
            paddingBottom: theme.spacing(1)
        },
        name: {
            fontSize: 12,
            color: theme.palette.text.hint
        },
        sectionName: {
            color: theme.palette.primary.contrastText
        }

    }),
);

interface SectionBoxProps {
    section: SectionEntity;
}

const SectionBox: React.FC<SectionBoxProps> = ({ section }) => {
    const styles = useStyles({});
    return (
        <Box column className={styles.section}>
            <Typography className={styles.sectionName} variant="h6">{section.name}</Typography>
        </Box>
    );
};


const MergeModalContent: React.FC<ModalContentProps> = ({ onClose }) => {

    const styles = useStyles({});
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

    const mergeConfirmUrl = `/merge/sections=${selectedForMerge.join(',')}&newName=${name}`;
    const handleSubmit = history => () => {
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
                <MergeIcon color="inherit" className={formStyles.icon}/>
                <Typography
                    className={formStyles.subtitle}
                    color="inherit"
                    variant="subtitle1">Merge Sections</Typography>
            </Box>

            <Box column className={styles.reviewBox}>
                <SectionBox section={first} />
                <SectionBox section={second} />
            </Box>

            <FormControl
                classes={{
                    root: formStyles.formRoot
                }}
                error={Boolean(errorOnName.length)}>

                <InputLabel
                    className={formStyles.formLabel}
                    shrink htmlFor="new-section-name">New section</InputLabel>
                <Input
                    className={formStyles.input}
                    classes={{
                        input: formStyles.inputHeight,
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

const MergeModal = ({ open, onClose }) => {
    const styles = useStyles({});
    return (
        <BaseModal open={open} onClose={onClose} className={styles.root}>
            <MergeModalContent onClose={onClose} />
        </BaseModal>
    );
};

export default MergeModal;
