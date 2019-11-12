import { AppState } from './lib/reducer';
import { ReactNode } from 'react';
import { Dispatch } from 'redux';
// import { DispatchAction } from 'global-types';

import { PayloadAction, PayloadActionCreator } from 'redux-starter-kit';
import { FullStoreShape } from 'contexts/app';
// Store
export type BaseStoreShape = Store<AppState>;

export interface ProviderStore {
    children: ReactNode;
}

export interface UIState {
    selectedMenuIdx: number;
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
    user: number;
}

export interface ChildrenProps {
    children: React.ReactNode;
}

export interface SuccessResponse {
    success: string;
}

export type StateSetter = React.Dispatch<React.SetStateAction<any>>;
export type ClickHandler = () => void;

export type DispatchAction =
    | PayloadAction<unknown, string>
    | PayloadActionCreator<void, string>
    | PayloadActionCreator<unknown, string>
    | PayloadAction<void, string>;

export type ContextDispatch = (action: DispatchAction) => void;

export type AppMiddleware = ({
    getState
}: {
    getState: () => FullStoreShape;
}) => (dispatch: Dispatch) => (action: PayloadAction) => void;

export interface MatchParams {
    id: string;
}
