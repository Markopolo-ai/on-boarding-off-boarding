import React, {Component} from 'react';
import { Route } from 'react-router';

import Logout from './Logout';
import Nav from './Nav';

class Dashboard extends Component {
    render() {
        return(
            <div>
                <Nav/>
                <Route path="/logout" exact component={Logout} />
            </div>
        )
    }
}

export default Dashboard;