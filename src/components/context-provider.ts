import { Component } from 'react';
import autoBind from 'auto-bind';

export default class ContextProvider extends Component {
    constructor() {
        super();
        autoBind(this);

        this.listeners = [];
        this.shared = {};
    }

    addSharedEntry(key, value) {
        this.shared[key] = value;
        this.notifyListeners();
    }

    addEntryListener(listener) {
        this.listeners.push(listener);
        listener(this.shared);
        // Return the unsubscribe function
        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.shared));
    }

    getChildContext() {
        return {
            shared: this.shared,
            addSharedEntry: this.addSharedEntry,
            addEntryListener: this.addEntryListener
        };
    }

    render() {
        return this.props.children;
    }
}

ContextProvider.childContextTypes = {
    shared: PropTypes.object,
    addSharedEntry: PropTypes.func,
    addEntryListener: PropTypes.func
};


