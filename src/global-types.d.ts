
import { AppState } from './lib/reducer';
import { ReactNode } from 'react';
import { Store, Reducer } from 'redux';
import { LocationState } from 'redux-first-router';
import { ROUTE_MAPPING } from 'lib/create-router';
import { PAGE_ONE_NAMESPACE, PAGE_TWO_NAMESPACE } from 'global-constants';
import { PageOneNamespaceShape } from 'pages/one/types';
import { PageTwoNamespaceShape } from 'pages/two/types';


// Store
export type BaseStoreShape = Store<AppState>

export interface AppStore {
    location: LocationState<typeof ROUTE_MAPPING>;
    page: string;
    ui: UiNamespaceShape;
    // TODO: create object spread that imports all dynamically imported pages here
    [PAGE_ONE_NAMESPACE]: PageOneNamespaceShape;
    [PAGE_TWO_NAMESPACE]: PageTwoNamespaceShape;
}

export interface ProviderStore {
    children: ReactNode;
    store: BaseStoreShape;
}


export type StoreShape = Partial<AppStore>;
export type NamespaceKey = keyof StoreShape;
export type ReducerMap = Partial<
    { [k in NamespaceKey]: Reducer<AppStore[k]> }
  >;


// Non-page specific
interface UiNamespaceShape {
    isSidebarOpen: boolean;
}

export interface MenuItem {
    text: string;
    icon: string;
    url: string;
}

export interface GithubUser {
    id: number;
    name: string;
    location: string;
    bio: string;
}
