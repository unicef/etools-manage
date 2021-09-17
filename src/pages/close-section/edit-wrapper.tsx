import React, { Dispatch, useEffect } from 'react';
import BackIcon from '@material-ui/icons/ArrowBack';
import Box from 'components/box';
import {
    IconButton,
    makeStyles,
    createStyles,
    Theme,
    Paper,
    Typography,
    Container
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useIconButtonStyles } from 'components/table/styles';
import { onSetModuleEditingName } from 'slices/module-editing-name';
import { OptionType, DropdownMulti, Dropdown } from 'components/dropdown';
import { ValueType } from 'react-select/src/types';
import { prop } from 'ramda';
import { valueOrDefault } from 'lib/sections';
import {GenericSectionPayload} from 'entities/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            padding: theme.spacing(2)
        },
        title: {
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1rem'
        },
        section: {
            marginBottom: theme.spacing(2)
        }
    })
);

interface WrapperProps {
    children: React.ReactNode;
    title: string;
    resolved: string;
    options: OptionType[];
    onSectionChange?: (payload: string, dispatch: Dispatch) => void;
    onMultiSectionChange?: (payload: GenericSectionPayload, dispatch: Dispatch) => void;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const DEFAULT_WRAPPER_MAX_WIDTH = 'md';

const EditWrapper: React.FC<WrapperProps> = ({
    children,
    title,
    resolved,
    options,
    onSectionChange,
    onMultiSectionChange,
    maxWidth = DEFAULT_WRAPPER_MAX_WIDTH
}) => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const iconStyles = useIconButtonStyles();
    const onClick = () => dispatch(onSetModuleEditingName(null));

    // reset the module editing name on unmount
    useEffect(
        () => () => {
            dispatch(onSetModuleEditingName(null));
        },
        []
    );

    const renderSelectAllElement = () => {
        return onMultiSectionChange ? <DropdownMulti  onChange={onMultiChange}  options={options} /> :
        <Dropdown onChange={onChange} options={options} />;
    }

    const onChange = (value: ValueType<OptionType>) => {
        let selectedSectionName = prop('value', value);

        // if (section === selectedSectionName) {
        //     selectedSectionName = null;
        // }
        if(onSectionChange) {
            onSectionChange(selectedSectionName, dispatch);
        }
    };

    const onMultiChange = (value: ValueType<OptionType>) => {
        const selectedSections = valueOrDefault(value);
        if (onMultiSectionChange) {
         onMultiSectionChange({ section: selectedSections, id: '' }, dispatch);
        }
    };

    return (
        <Container maxWidth={maxWidth}>
            <Box className={styles.section}>
                <IconButton className={iconStyles.icon} size="medium" onClick={onClick}>
                    <BackIcon fontSize="large" />
                </IconButton>
            </Box>
            <Paper>
                <Box className={styles.content} justify="between">
                    <Typography className={styles.title} variant="subtitle1">
                        {title}{' '}
                    </Typography>

                    <Box>
                       {renderSelectAllElement()}
                    </Box>

                    <Typography color="textPrimary" variant="body2">
                        Items resolved: {resolved}
                    </Typography>
                </Box>

                <Box column className={styles.content}>
                    {children}
                </Box>
            </Paper>
        </Container>
    );
};

export default EditWrapper;
