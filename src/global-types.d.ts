
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

export interface UserProfile {

    countries_available: {
        business_area_code: string;
        id: number;
        name: string;
    }[];

    country: {
        id: number;
        initial_zoom: number;
        latitude: string;
        local_currency: string;
        longitude: string;
        name: string;
    };

    email: string | null;
    first_name: string;
    last_name: string;
    job_title: string | null;
    name: string;
    user: number;
    username: string;
}

export type User = UserProfile | null;

export interface ChildrenProps {
    children: React.ReactNode;
}
