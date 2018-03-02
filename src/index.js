import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";
import ToastrContainer from 'react-toastr-basic'

import './index.css';

// components
import Home from './components/Home';
import Question from './components/Question';

const app = document.getElementById('root');

class App extends React.Component {
    render() {
        return (
            <div id="test-content">
                <ToastrContainer />
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/question/:id" component={Question} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, app);