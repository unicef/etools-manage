import { connect } from 'react-redux';
import { onInitFetch } from '../actions';
import { selectUserData, selectUserRepos } from '../selectors/user';
import Page from '../components/page';


// TODO: add type to props
const mapStateToProps = state => ({
    userData: selectUserData(state),
    userRepos: selectUserRepos(state)
});

const mapDispatchToProps = {
    onInitFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
