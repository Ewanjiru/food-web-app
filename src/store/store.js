import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/rootReducer';

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
  const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  composeEnhancers = devToolsCompose || composeEnhancers;
}

const AppStore = () => (
  createStore(
    RootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
)

export default AppStore;
