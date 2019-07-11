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
            height: theme.spacing(6),
            paddingRight: theme.spacing(1)
        },
        input: {
            marginLeft: theme.spacing(3),
            flex: 1
        },
        iconButton: {
            padding: theme.spacing(1)
        },
        inputActive: {
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.4)'
        }
    }));


export interface SearchBarProps {
    onChange: (str: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onChange }) => {
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
                inputProps={{ 'data-testid': 'search' }}
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
            />
            <SearchIcon />
        </Paper>
    );
});

export default SearchBar;
