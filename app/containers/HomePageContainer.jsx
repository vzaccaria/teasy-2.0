import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash'


function areWeRender() {
    return window.require('is-electron-renderer');
}

function getWindowListAsJson() {
    return window.require('native-sgrab-helper').windowListAsJson();
}

export default class HomePageContainer extends React.Component {

    render() {

        function renderWindowItem(i) {
            return (
                <div> {i.owner} </div>
                );
        }

        return (
            <div>
                <h2>Home Page</h2>
                <p>This is the homepage.</p>
                <Link to="about">to About</Link>
                <div> {_.map(getWindowListAsJson(), renderWindowItem)} </div>
            </div>
        );
    }

}
