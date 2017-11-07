// Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Route
import { BrowserRouter, Route } from "react-router-dom";

// Include Main Component
import Main from "./components/Main";

// Render main route
ReactDOM.render(
	(
		<BrowserRouter>
			<Route path="/" component={Main} />
		</BrowserRouter>
	),
	document.getElementById("app")
);