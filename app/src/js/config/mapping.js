// Redux dependencies
import { bindActionCreators } from 'redux';

// Redux action creators
import * as actionCreators from '../config/actions';

// map the state to the react props
export function mapStateToProps(state) {
    return {
        data: state.data
    };
}

// map the dispatch and action creators to the react props
export function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}