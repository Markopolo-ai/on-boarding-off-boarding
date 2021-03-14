import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import githubpng from '../assets/images/github.png';
import drivepng from '../assets/images/drive.png';
import slackpng from '../assets/images/slack.png';
import trellopng from '../assets/images/trello.png';

import '../assets/css/Welcome.css';

class Welcome extends Component {
    state = {
        'github': false,
        'drive': false,
        'slack': false,
        'trello': false
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        this.setState({[name]: value});
    }

    handleSelectionSubmit = () => {

    }

    render() {
        return (
            <div id="platform-selection">
                <ul>
                    <li>
                        <input type="checkbox" id="github-checkbox" name="github" onChange={this.handleChange} checked={this.state.github}/>
                        <label for="github-checkbox"><img src={githubpng}/></label>
                    </li>
                    <li>
                        <input type="checkbox" id="drive-checkbox" name="drive" onChange={this.handleChange} checked={this.state.drive}/>
                        <label for="drive-checkbox"><img src={drivepng}/></label>
                    </li>
                    <li>
                        <input type="checkbox" id="slack-checkbox" name="slack" onChange={this.handleChange} checked={this.state.slack}/>
                        <label for="slack-checkbox"><img src={slackpng} /></label>
                    </li>
                    <li>
                        <input type="checkbox" id="trello-checkbox" name="trello" onChange={this.handleChange} checked={this.state.trello}/>
                        <label for="trello-checkbox"><img src={trellopng}/></label>
                    </li>
                </ul>
                <Link  to="/authentication" className="submit-btn">Ready to go</Link>
            </div>
        );
    }
}

export default Welcome;