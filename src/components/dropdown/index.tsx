import React, { HTMLAttributes, CSSProperties, memo } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { Omit } from '@material-ui/types';
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Typography, MenuItem, Paper, Chip } from '@material-ui/core';
import { ValueType } from 'react-select/src/types';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import CancelIcon from '@material-ui/icons/Cancel';
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
                0.08,
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
            fontSize: 16,
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
        }
    }),
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
        selectProps: { classes, TextFieldProps }
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
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
        <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
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

function MultiValue(props: MultiValueProps<OptionType>) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
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
    MultiValue,
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
        })
    };

    return {
        selectStyles,
        handleChangeSingle,
        single
    };
};

type ProvidedValue = string[] | number[] | string | number

export interface DropdownProps {
    options?: OptionType[];
    divider?: boolean;
    value?: OptionType | OptionType[];
    onChange: ((value: ValueType<OptionType>) => void);
}


export const DropdownMulti: React.FC<DropdownProps> = memo(({ options, value, divider = false, onChange }) => {
    const {
        selectStyles
    } = useDropdown();

    const styles = useStyles();
    return (
        <div className={styles.root}>
            <Select
                classes={styles}
                styles={selectStyles}
                inputId="react-select-multi"
                TextFieldProps={{
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
            />
            {divider && <div className={styles.divider} />}
        </div>);
});

export const Dropdown: React.FC<DropdownProps> = memo(({ options, value, onChange, divider = false }) => {
    console.log('TCL: value', value);
    const {
        selectStyles
    } = useDropdown();

    const styles = useStyles();
    return (
        <div className={styles.root}>
            <Select
                classes={styles}
                styles={selectStyles}
                inputId="react-select-multi"
                TextFieldProps={{
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
            />
            {divider && <div className={styles.divider} />}
        </div>);
});
