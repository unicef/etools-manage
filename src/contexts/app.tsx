import React, { useContext, useReducer } from 'react';
import { ChildrenProps, Dispatch } from 'global-types';
import { ApiClient } from 'lib/http';
import BackendApiService from 'services/backend';
import SectionsApiService from 'services/section';
import { AppServices } from 'services';
import StorageService from 'services/storage';
import { rootReducer, initialState, Store } from 'slices/root-store';
import configureAppStore from 'lib/create-store';
import { configureStore } from 'redux-starter-kit';
import { Provider } from 'react-redux';


// const AppStoreContext = React.createContext<Store | undefined>(initialState);
// const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);
const AppServiceContext = React.createContext<AppServices | undefined>(undefined);

const store = configureAppStore(initialState);

// export function AppStoreProvider({ children }: ChildrenProps) {
//     const [state, dispatch] = createStore(rootReducer, initialState);
//     // const [state, dispatch] = useReducer(rootReducer, initialState);
//     const appServices: AppServices = {
//         sectionsService: new SectionsApiService(new ApiClient()),
//         backendService: new BackendApiService(new ApiClient()),
//         storageService: new StorageService(localStorage)
//     };

//     return (
//         <AppStoreContext.Provider value={state}>
//             <AppDispatchContext.Provider value={dispatch}>
//             </AppDispatchContext.Provider>
//         </AppStoreContext.Provider>
//     );
// }

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

// export function useAppState() {
//     const context = useContext(AppStoreContext);
//     if (context === undefined) {
//         throw new Error('useAppState must be used within AppStoreContextProvider');
//     }
//     return context;
// }

// export function useDispatch() {
//     const context = useContext(AppDispatchContext);
//     if (context === undefined) {
//         throw new Error('useDispatch must be used within AppDispatchContextProvider');
//     }
//     return context;
// }

export function useAppService() {
    const context = useContext(AppServiceContext);
    if (context === undefined) {
        throw new Error('useAppService must be used within AppServiceContextProvider');
    }
    return context;
}
