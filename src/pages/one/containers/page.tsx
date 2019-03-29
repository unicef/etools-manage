import { connect } from 'react-redux';
import { onBack } from '../actions';
import Page from '../components/page';

const mapStateToProps = state => ({
    hasBack: true,
    prop2: state.pageOne.items
});

const mapDispatchToProps = {
    onBack
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
