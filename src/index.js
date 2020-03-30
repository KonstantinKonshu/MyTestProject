import React from "react";
import {render} from "react-dom";
import App from './Components/App';
import {Provider} from "react-redux";
import {createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./Reducers";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { browserHistory} from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import ErrorHandle from "./Components/ErrorHandle";
import {useSelector} from "react-redux";

const store = createStore(reducers, composeWithDevTools());
const history = syncHistoryWithStore(browserHistory, store);

const StartPage = () =>{
    const handleError = useSelector(state => state.errors.handleError);
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