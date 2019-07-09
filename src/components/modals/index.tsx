import React, { useState, useEffect } from 'react';
import { Modal, makeStyles, Theme, createStyles, Paper, FormControl } from '@material-ui/core';
import clsx from 'clsx';
import {
    prop,
    compose,
    find,
    equals,
    toLower,
    trim
} from 'ramda';
import { useAppState } from 'contexts/app';
import Section from 'entities/section-entity';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2),
            outline: 'none'
        },
        modal: {
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -25%)'
        }
    }),
);

export interface BaseModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className? : string;
}

export interface ModalContentProps {
    onClose(): void;
}

const BaseModal: React.FC<BaseModalProps> = ({ open, onClose, children, className }) => {
    const styles = useStyles({});
    return (
        <Modal open={open} onClose={onClose}>
            <Paper className={clsx(styles.paper, styles.modal, className)}>
                {children}
            </Paper>
        </Modal>
    );
};

export default BaseModal;

export const useAddSection = () => {
    const [errorOnName, setNameError] = useState<string>('');
    const { sections } = useAppState();
    const [name, setName] = useState<string>('');


    const sectionValidator = (name: string): Promise<boolean> => {
        const checkUniqueName = find(compose(equals(trim(name)), toLower, prop('name')));
        const nameExists = checkUniqueName(sections) !== undefined;
        return new Promise(resolve => resolve(!nameExists));
    };

    const handleValidateSection = async () => {
        const sectionInstance = new Section(name);
        const isValid = await sectionInstance.isValidName(sectionValidator);
        if (!isValid) {
            setNameError('Section name already exists');
        }
    };

    return {
        errorOnName,
        handleValidateSection,
        name,
        setName,
        setNameError
    };

};
