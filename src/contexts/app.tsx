import React, { useReducer, useContext } from 'react';
import { SectionEntity } from 'entities/section-entity';
import { onGetSectionsSuccess } from 'actions';
import { ChildrenProps } from 'global-types';
import { appStoreReducer } from 'reducers/app-store';
import SectionsApiService, { SectionsService } from 'services/section';
import { ApiClient } from 'lib/http';

interface Store {
    sections: SectionEntity[];
}

type Action = typeof onGetSectionsSuccess;
export type StoreDispatch = (action: Action) => void;

const AppStoreContext = React.createContext<Store | undefined>({ sections: [] });
const AppDispatchContext = React.createContext<StoreDispatch | undefined>(undefined);
const AppServiceContext = React.createContext<SectionsService>(undefined);

const initialState: Store = {
    sections: []
};

export function AppStoreProvider({ children }: ChildrenProps) {
    const [state, dispatch] = useReducer(appStoreReducer, initialState);
    const service = new SectionsApiService(new ApiClient());

    return (
        <AppStoreContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
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
