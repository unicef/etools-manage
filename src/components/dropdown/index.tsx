import React, { HTMLAttributes, CSSProperties, memo } from 'react';
import Select from 'react-select';
import { Omit } from '@material-ui/types';
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Typography, MenuItem, Paper } from '@material-ui/core';
import { ValueType } from 'react-select/src/types';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';

export interface OptionType {
    label: string;
    value: string | number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            minWidth: 290
        },
        input: {
            display: 'flex',
            padding: 0,
            height: 'auto'
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center',
            overflow: 'hidden'
        },
        chip: {
            margin: theme.spacing(0.5, 0.25)
        },
        chipFocused: {
            backgroundColor: emphasize(
                theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
                0.08
            )
        },
        noOptionsMessage: {
            padding: theme.spacing(1, 2)
        },
        singleValue: {
            fontSize: 14
        },
        placeholder: {
            position: 'absolute',
            left: 2,
            bottom: 6,
            color: theme.palette.text.primary
        },
        paper: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0
        },
        divider: {
            height: theme.spacing(2)
        },
        indicatorSeparator: {
            width: 0
        }
    })
);

function NoOptionsMessage(props: NoticeProps<OptionType>) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
    return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<OptionType>) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps, disableUnderline }
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                disableUnderline,
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps
                }
            }}
            {...TextFieldProps}
        />
    );
}

function Option(props: OptionProps<OptionType>) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, 'innerProps'> &
    Partial<Pick<PlaceholderProps<OptionType>, 'innerProps'>>;
function Placeholder(props: MuiPlaceholderProps) {
    const { selectProps, innerProps = {}, children } = props;
    return (
        <Typography
            color="textSecondary"
            className={selectProps.classes.placeholder}
            {...innerProps}
        >
            {children}
        </Typography>
    );
}

function SingleValue(props: SingleValueProps<OptionType>) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props: ValueContainerProps<OptionType>) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props: MenuProps<OptionType>) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

const useDropdown = () => {
    const [single, setSingle] = React.useState<ValueType<OptionType>>(null);
    const theme = useTheme();

    function handleChangeSingle(value: ValueType<OptionType>) {
        setSingle(value);
    }

    const selectStyles = {
        input: (base: CSSProperties) => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit'
            }
        }),
        // eslint-disable-next-line
        container: (base: CSSProperties, state: any) => ({
            ...base,
            opacity: state.isDisabled ? 0.5 : 1
        }),

        multiValue: (styles: CSSProperties) => {
            return {
                ...styles,
                backgroundColor: theme.palette.secondary.light
            };
        },

        multiValueRemove: (styles: CSSProperties) => ({
            ...styles,
            ':hover': {
                backgroundColor: theme.palette.secondary.main,
                color: 'white'
            },
            cursor: 'pointer'
        })
    };

    const noSeparatorStyles = {
        ...selectStyles,
        indicatorSeparator: (provided: CSSProperties) => ({
            ...provided,
            width: 0
        })
    };

    const smallIndicatorStyles = {
        ...selectStyles,
        dropdownIndicator: (provided: CSSProperties) => ({
            ...provided,
            padding: 4
        })
    };

    return {
        selectStyles,
        noSeparatorStyles,
        handleChangeSingle,
        smallIndicatorStyles,
        single
    };
};

export interface DropdownProps {
    options?: OptionType[];
    label?: string | null;
    value?: OptionType | OptionType[] | null;
    onChange: (value: ValueType<OptionType>) => void;
    // eslint-disable-next-line
    [prop: string]: any;
}

export const DropdownMulti: React.FC<DropdownProps> = memo(
    ({ options, value, onChange, ...props }) => {
        const { selectStyles } = useDropdown();

        const styles = useStyles();
        return (
            <div className={styles.root} data-testid="dropdown-multi">
                <Select
                    classes={styles}
                    styles={selectStyles}
                    inputId="react-select-multi"
                    TextFieldProps={{
                        label: 'Section',
                        InputLabelProps: {
                            htmlFor: 'react-select-multi',
                            shrink: true
                        }
                    }}
                    placeholder="Select section..."
                    options={options}
                    components={components}
                    value={value}
                    onChange={onChange}
                    isMulti
                    {...props}
                />
            </div>
        );
    }
);

export const Dropdown: React.FC<DropdownProps> = ({
    options,
    value,
    onChange,
    label = 'Section',
    ...otherProps
}) => {
    const { noSeparatorStyles, smallIndicatorStyles } = useDropdown();

    const dropdownStyles = { ...noSeparatorStyles, ...smallIndicatorStyles };

    const styles = useStyles();
    return (
        <div className={styles.root}>
            <Select
                classes={styles}
                styles={dropdownStyles}
                inputId="react-select-multi"
                TextFieldProps={{
                    label,
                    InputLabelProps: {
                        htmlFor: 'react-select-multi',
                        shrink: true
                    }
                }}
                placeholder="Select section..."
                options={options}
                components={components}
                value={value}
                onChange={onChange}
                {...otherProps}
            />
        </div>
    );
};
