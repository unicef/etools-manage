import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';

const useStyles = makeStyles({
    box: { display: 'flex' },
    auto: {
        flex: '1 1 auto',
        minWidth: 0,
        minHeight: 0
    },
    row: { flexDirection: 'row' },
    column: { flexDirection: 'column' },
    alignStart: { alignItems: 'start' },
    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    flexWrap: { flexWrap: 'wrap' },
    justifyStart: { justifyContent: 'flex-start' },
    justifyBetween: { justifyContent: 'space-between' }
});

interface BoxProps {
    children: React.ReactNode;
    column?: boolean;
    row?: boolean;
    align?: 'center' | 'start' | 'end' ;
    justify?: 'center'| 'start'| 'end'| 'between';
    tagName?: string;
    auto?: boolean;
    wrap?: boolean;
    onRef?: () => any;
    className?: string;
}

export default function Box({ children, column, row, align, justify, tagName, auto, className, wrap, onRef, ...props }: BoxProps) {
    const styles = useStyles();
    const classes = classnames({
        [styles.auto]: auto,
        [styles.column]: column,
        [styles.alignCenter]: align === 'center',
        [styles.alignStart]: align === 'start',
        [styles.justifyCenter]: justify === 'center',
        [styles.justifyEnd]: justify === 'end',
        [styles.justifyStart]: justify === 'start',
        [styles.alignEnd]: align === 'end',
        [styles.justifyBetween]: justify === 'between',
        [className]: true,
        [styles.box]: true,
        [styles.flexWrap]: wrap,
        [styles.row]: row
    });

    return React.createElement(tagName, { className: classes, ref: onRef, ...props }, children);
}

Box.defaultProps = {
    tagName: 'div',
    className: ''
};

