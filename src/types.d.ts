
import { AppState } from './lib/reducer';
import { ReactNode } from 'react';
import { Store } from 'redux';

export interface ProviderStore {
    children: ReactNode;
    store: Store<AppState>;
}

export type AppStore = Store<AppState>;
