import React, { useReducer, useContext, useEffect } from 'react';
import { ChildrenProps, Dispatch } from 'global-types';
import { ApiClient } from 'lib/http';
import BackendApiService from 'services/backend';
import SectionsApiService from 'services/section';
import { AppServices } from 'services';
import StorageService from 'services/storage';
import { rootReducer, initialState, Store } from 'slices/root-store';

const AppStoreContext = React.createContext<Store | undefined>(initialState);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);
const AppServiceContext = React.createContext<AppServices | undefined>(undefined);

export function AppStoreProvider({ children }: ChildrenProps) {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    console.log('TCL: AppStoreProvider -> state', state);

    const appServices: AppServices = {
        sectionsService: new SectionsApiService(new ApiClient()),
        backendService: new BackendApiService(new ApiClient()),
        storageService: new StorageService(localStorage)
    };

    return (
        <AppStoreContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                <AppServiceContext.Provider value={appServices}>
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
