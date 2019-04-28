import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from "./reducers";

import Base from "./pages/base";
import Login from "./pages/login";
import OAuthRedirect from "./pages/oauth/redirect";
import Posts from "./pages/posts";
import Page404 from "./pages/404";

const store = applyMiddleware(ReduxThunk)(createStore)(reducers);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/main" exact component={Base} />

				<Route path="/main/login" exact component={Login} />
				<Route path="/main/oauth/redirect" exact component={OAuthRedirect} />
                <Route path="/main/posts" exact component={Posts} />

				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.querySelector("#root")
);
