import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
	form /*
	FYI - ES6-Trick (Above):
	combineReducers({ form: form }) 
	is the same as ==> combineReducers({ form }) because of the {curly braces} */
});

export default rootReducer;