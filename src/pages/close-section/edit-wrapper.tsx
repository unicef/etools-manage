import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useIconButtonStyles } from 'components/table/styles';
import { onSetModuleEditingName } from 'slices/module-editing-name';
import { OptionType, DropdownMulti, Dropdown } from 'components/dropdown';
import { ValueType } from 'react-select/src/types';
import { prop } from 'ramda';
import { valueOrDefault } from 'lib/sections';
import { getSelectedSection } from 'lib/sections';
import { GenericMultiSectionPayload, GenericSectionPayload } from 'entities/types';
import { selectSectionsAsDropdownOptions } from 'selectors';
import { useEditItemStyles } from '../../components/entity-edit/styles';

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
    onSectionChange?: (payload: string, dispatch: Dispatch) => void;
    onMultiSectionChange?: (payload: GenericMultiSectionPayload, dispatch: Dispatch) => void;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const DEFAULT_WRAPPER_MAX_WIDTH = 'md';
let selectedSection: OptionType | null = null;

const EditWrapper: React.FC<WrapperProps> = ({
    children,
    title,
    resolved,
    onSectionChange,
    onMultiSectionChange,
    maxWidth = DEFAULT_WRAPPER_MAX_WIDTH
}) => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const dropdownStyles = useEditItemStyles();
    const iconStyles = useIconButtonStyles();
    const onClick = () => dispatch(onSetModuleEditingName(null));
    const sectionOptions = useSelector(selectSectionsAsDropdownOptions);

    // reset the module editing name on unmount
    useEffect(
        () => () => {
            dispatch(onSetModuleEditingName(null));
        },
        []
    );

    const renderSelectAllElement = () => {
        return onMultiSectionChange ? <DropdownMulti className={dropdownStyles.headerDropdown} onChange={onMultiChange} options={sectionOptions} /> :
        <Dropdown  className={dropdownStyles.headerDropdown} value={selectedSection} onChange={onChange} options={sectionOptions} />;
    }

    const onChange = (value: ValueType<OptionType>) => {
        let selectedSectionValue = prop('value', value);

        if (selectedSection && selectedSection.value === selectedSectionValue) {
            selectedSectionValue = null;
        }
        if(onSectionChange) {
            selectedSection = getSelectedSection(sectionOptions, selectedSectionValue);
            onSectionChange(selectedSectionValue, dispatch);
        }
    };

    const onMultiChange = (value: ValueType<OptionType>) => {
        const selectedSections = valueOrDefault(value);
        if (onMultiSectionChange) {
            onMultiSectionChange({ sections: selectedSections, id: '' }, dispatch);
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

                    <Typography color="textPrimary" variant="body2">
                        Items resolved: {resolved}
                    </Typography>
                </Box>
                <Box className={styles.content} justify="between">
                    <Typography color="textPrimary" variant="subtitle1">
                        Use the following field if you want to set Section for all the records below or use the Section field from each record if you want to set individually
                    </Typography>
                    <Box>
                        {renderSelectAllElement()}
                    </Box>
                </Box>
                <Box column className={styles.content}>
                    {children}
                </Box>
            </Paper>
        </Container>
    );
};

export default EditWrapper;
