import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import shortid from 'shortid';
import breakpoints, { MD_BREAKPOINT, SM_BREAKPOINT } from '../lib/media-queries';

const resolveBreakpoints = {
    md: MD_BREAKPOINT,
    sm: SM_BREAKPOINT
};

export interface MediaProps {
    children: ReactNode;
}

export default class MatchMediaProvider extends Component<MediaProps> {
    public constructor(props: MediaProps) {
        super(props);
        autoBind(this);
    }

    public static childContextTypes = {
        addChildListener: PropTypes.func
    }

    private listeners = []
    private childListeners = []


    public componentDidMount(): void {
        const initialState = {};

        breakpoints.forEach(breakpoint => {
            const mediaQuery = matchMedia(`(max-width: ${breakpoint}px)`);
            // Set the media query value initially.
            initialState[breakpoint] = mediaQuery.matches;
            // Attach listeners
            mediaQuery.addListener(mql => this.handleChange(breakpoint, mql));
        });

        this.setState(initialState);
    }

    public handleChange(breakpoint, mql): void{
        if (this.state[breakpoint] !== mql.matches) {
            this.setState({ [`${breakpoint}`]: mql.matches });
        }

        // Notify all the listeners.
        this.childListeners
            .filter(listener => resolveBreakpoints[listener.breakpoint] === breakpoint)
            .forEach(({ listener, isInverse }) => {
                listener(isInverse ? !mql.matches : mql.matches);
            });
    }

    public getChildContext() {
        return {
            addChildListener: this.addChildListener
        };
    }

    public addChildListener(listener, breakpoint, isInverse): ({matches: string; unsubscribe: () => void}) {
        const listenerId = shortid.generate();

        this.childListeners.push({
            listener,
            breakpoint,
            isInverse,
            id: listenerId
        });

        // Return the unsubscribe method.
        return {
            matches: isInverse ? !this.state[resolveBreakpoints[breakpoint]] : this.state[resolveBreakpoints[breakpoint]],
            unsubscribe: () => {
                this.childListeners = this.childListeners.filter(listener => listener.id !== listenerId);
            }
        };
    }

    public render(): ReactNode {
        return this.props.children;
    }
}
