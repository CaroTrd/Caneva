import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import idUser from '../reducers/saveIdAdmin';
import saveCV from '../reducers/saveCV';
import saveSkillLevel  from '../reducers/skillLevel';
import saveLanguageLevel from '../reducers/languageLevel';
import saveEducationLevel from '../reducers/educationLevel';
import saveCssPath from '../reducers/cssPath';

const rootReducer = combineReducers({
    idUser,
    form: formReducer,
    saveCV,
    saveSkillLevel,
    saveLanguageLevel,
    saveEducationLevel,
    saveCssPath
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

export const store = createStore(rootReducer, enhancer)