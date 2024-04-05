import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import web from './reducer/web';
import auth from './reducer/auth';
import cart from './reducer/cart';

const reducer = combineReducers({ web, auth, cart });
const store = configureStore({ reducer });
export default store;
