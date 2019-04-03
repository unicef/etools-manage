import { connect } from 'react-redux';
import asyncPageMap from 'lib/async-page-map';
import injectReducers from 'lib/inject-reducers';
import injectSagas from 'lib/inject-sagas';
import LoadingFallback from 'components/page-loader';
import asyncImport from 'react-universal-component';
import { AppState } from 'lib/reducer';

interface CompState {
    page: string;
}
const mapStateToProps = ({ page }: (AppState)): CompState => {
    return ({
        page
    });
};


export default connect(mapStateToProps)(asyncImport<CompState>(({ page }) => asyncPageMap[page](),
    {
    // @ts-ignore
        onLoad({ reducer, rootSaga }, info, props, { store }) {
            injectReducers(store, reducer());
            injectSagas(store, rootSaga);
        },
        loading: LoadingFallback
    }
));


