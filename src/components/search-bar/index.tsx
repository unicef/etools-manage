import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, InputBase, Paper, createStyles, Theme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: '#f1f3f4',
            width: 400,
            display: 'flex',
            alignItems: 'center',
            paddingRight: theme.spacing(1)
        },
        input: {
            padding: theme.spacing(1),
            marginLeft: theme.spacing(3),
            borderRadius: 4,
            flex: 1
        },
        iconButton: {
            padding: theme.spacing(1)
        },
        inputActive: {
            backgroundColor: theme.palette.primary.main
        }
    }));


export interface SearchBarProps {
    onChange: (str: string) => void;
}

export default function SearchBar ({ onChange }: SearchBarProps) {
    const classes = useStyles({});
    const [active, setActive] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = ({ target: { value } }) => {
        setSearchTerm(value);
        onChange(value);
    };
    return (
        <Paper className={clsx(classes.root, active && classes.inputActive)} elevation={active ? 1 : 0 }>
            <InputBase
                className={classes.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
            />
            <SearchIcon />
        </Paper>
    );
}
