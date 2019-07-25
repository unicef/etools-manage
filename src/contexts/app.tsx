import React, { useReducer, useContext } from 'react';
import { onGetSectionsSuccess, onSetLoading, onCreateSectionSuccess, onResetCreatedSection, onThrowError, onSetMergedSection } from 'actions';
import { ChildrenProps } from 'global-types';
import { appStoreReducer } from 'reducers/app-store';
import { ApiClient } from 'lib/http';
import BackendApiService from 'services/backend';
import SectionsApiService from 'services/section';
import { AppServices } from 'services';
import { SectionEntity, NewSectionFromMerged, NonEmptyEntityResults } from 'entities/types';
import StorageService from 'services/storage';
import { onModuleEntitiesDataSuccess } from 'pages/close-summary/actions';

export interface Store {
    sections: SectionEntity[];
    createdSection: SectionEntity | null;
    mergedSection: NewSectionFromMerged | null;
    error: string | null;
    loading: boolean;
    currentInProgressEntitiesData: NonEmptyEntityResults | null;
}

// TODO: move unions to respective folders
type Action = ReturnType<
    typeof onGetSectionsSuccess |
    typeof onSetLoading |
    typeof onCreateSectionSuccess |
    typeof onSetMergedSection |
    typeof onModuleEntitiesDataSuccess |
    typeof onThrowError > | typeof onResetCreatedSection


export type StoreDispatch = (action: Action) => void;

export const initialState: Store = {
    sections: [],
    createdSection: null,
    mergedSection: null,
    error: null,
    loading: false,
    currentInProgressEntitiesData: null
};


const AppStoreContext = React.createContext<Store | undefined>(initialState);
const AppDispatchContext = React.createContext<StoreDispatch | undefined>(undefined);
const AppServiceContext = React.createContext<AppServices | undefined>(undefined);

export function AppStoreProvider({ children }: ChildrenProps) {
    const [state, dispatch] = useReducer(appStoreReducer, initialState);

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
