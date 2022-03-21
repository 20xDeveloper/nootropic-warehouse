import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { toast } from 'react-toastify';

import {Elements, StripeProvider} from 'react-stripe-elements';

//redux
import { Provider } from "react-redux"; //Wrap this with your root component which is <app /> Gives access to central state
import { createStore } from "redux"; //creates the central store
import reducer from "./store/reducer"; //Where all your reducers are

//fireabase
import * as firebase from "firebase"

var config = {
    apiKey: "AIzaSyAtFbdAeBB46wwQPUI3kH5RamnIMGGYnvQ",
    authDomain: "nootropic-warehouse.firebaseapp.com",
    databaseURL: "https://nootropic-warehouse.firebaseio.com",
    projectId: "nootropic-warehouse",
    storageBucket: "nootropic-warehouse.appspot.com",
    messagingSenderId: "869012939109",
    appId: "1:869012939109:web:29087933235cfe1752c18c"
  };

firebase.initializeApp(config);

const store = createStore(reducer); //link the reducer to the central store so it can change it
toast.configure()


ReactDOM.render(

	<Provider store={store}>
  <StripeProvider apiKey="pk_test_XFOhxgIGMjeRs6zmCJ0sHxrm000gfufxd7">

		<BrowserRouter>
			<App />
		</BrowserRouter>
    </StripeProvider>

	</Provider>,

	document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
