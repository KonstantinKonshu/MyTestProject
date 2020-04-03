import React from "react";
import {render} from "react-dom";
import App from './components/app/app';
import {Provider} from "react-redux";
import {createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/root_reducer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { browserHistory} from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import ErrorHandle from "./components/error_handle/error_handle";
import {useSelector} from "react-redux";
import "./style.scss";

const store = createStore(reducers, composeWithDevTools());
const history = syncHistoryWithStore(browserHistory, store);

const StartPage = () =>{
    const handleError = useSelector(state => state.errorsReducer.handleError);
    return (handleError) ?  <ErrorHandle/> :  <Route path="/" component={App} />;
}


render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <StartPage/>
            </div>
        </Router>
    </Provider>
    ,document.getElementById('root')
);