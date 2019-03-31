import { connect } from 'react-redux';
import { selectMenuItems } from '../selectors/app-frame-selectors';

const mapStateToProps = state => ({
    menuItems: selectMenuItems(state)
});

const mapDispatchToProps = {

};
