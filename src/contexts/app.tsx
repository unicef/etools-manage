import React, { useReducer, useContext } from 'react';
import { SectionEntity } from 'entities/section-entity';
import { onGetSectionsSuccess, onRequestStarted, onToggleLoading, onCreateSectionSuccess, onResetCreatedSection } from 'actions';
import { ChildrenProps } from 'global-types';
import { appStoreReducer } from 'reducers/app-store';
import SectionsApiService, { SectionsService } from 'services/section';
import { ApiClient } from 'lib/http';
import { useLoadingDispatch } from './loading';

interface Store {
    sections: SectionEntity[];
    createdSection: SectionEntity;
}

type Action = typeof onGetSectionsSuccess
| typeof onRequestStarted
| typeof onCreateSectionSuccess
| typeof onResetCreatedSection

export type StoreDispatch = (action: Action) => void;

const AppStoreContext = React.createContext<Store | undefined>(undefined);
const AppDispatchContext = React.createContext<StoreDispatch | undefined>(undefined);
const AppServiceContext = React.createContext<SectionsService>(undefined);

const initialState: Store = {
    sections: [],
    createdSection: null

};


export function AppStoreProvider({ children }: ChildrenProps) {
    const [state, dispatch] = useReducer(appStoreReducer, initialState);
    const dispatchLoading = useLoadingDispatch();
    const service = new SectionsApiService(new ApiClient());

    const loaderMiddleware = dispatch => action => {
        if (action.type === onRequestStarted.type) {
            dispatchLoading(onToggleLoading(true));
        } else {
            dispatchLoading(onToggleLoading(false));
        }
        dispatch(action);
    };

    const appDispatch = loaderMiddleware(dispatch);

    return (
        <AppStoreContext.Provider value={state}>
            <AppDispatchContext.Provider value={appDispatch}>
                <AppServiceContext.Provider value={service}>
                    {children}
                </AppServiceContext.Provider>
            </AppDispatchContext.Provider>
        </AppStoreContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppStoreContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within AppStoreContextProvider');
    }
    return context;
}

export function useAppDispatch() {
    const context = useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within AppDispatchContextProvider');
    }
    return context;
}

export function useAppService() {
    const context = useContext(AppServiceContext);
    if (context === undefined) {
        throw new Error('useAppService must be used within AppServiceContextProvider');
    }
    return context;
}
