import { connect, InferableComponentEnhancerWithProps, DispatchProp } from 'react-redux';
import asyncPageMap from 'lib/async-page-map';
import injectReducers from 'lib/inject-reducers';
import injectSagas from 'lib/inject-sagas';
import PageLoader from 'components/page-loader';
import asyncImport from 'react-universal-component';
import { AppState } from 'lib/reducer';
import { AnyAction } from 'redux';

type x = AnyAction
interface CompState {
    page: string;
}
const mapStateToProps = ({ page }: (AppState)): CompState => ({
    page
});


export default connect(mapStateToProps)(asyncImport<CompState>(props => asyncPageMap[props.page](),
    {
        onLoad({ reducer, rootSaga }, info, props, { store }) {
            injectReducers(store, reducer());
            injectSagas(store, rootSaga);
        },
        loading: PageLoader
    }
));

