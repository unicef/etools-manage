
import { AppState } from './lib/reducer';
import { ReactNode } from 'react';
import { Store } from 'redux';

export interface ProviderStore {
    children: ReactNode;
    store: Store<AppState>;
}

export type StoreShape = Store<AppState>;

export interface MenuItem {
    text: string;
    icon: string;
    url: string;
}


// TODO: Create function that returns
// types for all reducers and generates full store shape
