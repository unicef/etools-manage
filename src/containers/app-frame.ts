import { connect } from 'react-redux';
import { selectMenuItems } from '../selectors/app-frame-selectors';
import { pageTwo } from '../actions';
import AppFrame from 'components/app-frame';

const mapStateToProps = state => ({
    menuItems: selectMenuItems(state)
});

const mapDispatchToProps = {
    onGoToPage: pageTwo
};


export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);
