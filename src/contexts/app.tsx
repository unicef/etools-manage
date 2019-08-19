import React, { useContext } from 'react';
import { ChildrenProps } from 'global-types';
import { ApiClient } from 'lib/http';
import BackendApiService from 'services/backend';
import SectionsApiService from 'services/section';
import { AppServices } from 'services';
import StorageService from 'services/storage';
import configureAppStore from 'lib/create-store';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';

const AppServiceContext = React.createContext<AppServices | undefined>(undefined);

const store = configureAppStore();

export type FullStoreShape = ReturnType<typeof rootReducer>;

export function AppStoreProvider({ children }: ChildrenProps) {
    return (
        <Provider store={store}>
            <AppServicesProvider>
                {children}
            </AppServicesProvider>
        </Provider>
    );

}

export const AppServicesProvider = ({ children }: ChildrenProps): JSX.Element => {
    const appServices: AppServices = {
        sectionsService: new SectionsApiService(new ApiClient()),
        backendService: new BackendApiService(new ApiClient()),
        storageService: new StorageService(localStorage)
    };
    return (
        <AppServiceContext.Provider value={appServices}>
            {children}
        </AppServiceContext.Provider>
    );
};


export function useAppService() {
    const context = useContext(AppServiceContext);
    if (context === undefined) {
        throw new Error('useAppService must be used within AppServiceContextProvider');
    }
    return context;
}
