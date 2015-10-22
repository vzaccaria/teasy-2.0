import React from 'react';


import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/systemWindowListItem');

debug('lodaded');

export default class SystemWindowListItem extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <div> {this.props.item.name} </div>
                <div> {this.props.item.owner} </div>
                <div> {this.props.item.layer} </div>
                <div> {this.props.item.wid} </div>
            </div>
        );
    }
}
