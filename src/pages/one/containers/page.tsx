import { connect } from 'react-redux';
import { onBack } from '../actions';
import Page from '../components/page';
import { PageOneProps } from '../types';


const mapStateToProps = (state): PageOneProps => ({
    hasBack: true,
    prop2: state.pageOne.prop2
});

const mapDispatchToProps = {
    onBack
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

