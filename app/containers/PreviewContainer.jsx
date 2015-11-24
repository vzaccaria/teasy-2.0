import React from 'react';
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';
import AppStore from '../stores/AppStore'
import _ from 'lodash'
import { getPreviewSize } from '../styles/Layout'
import AppActions from '../actions/AppActions'
import Loader from '../components/loader'
import Time from '../components/time'
import color from 'color'
import moment from 'moment'
import { asPopup } from '../components/popup'
import TimeChooser from '../components/TimeChooser'

// Debug..

import _debug from 'debug';
const debug = _debug('app:containers/PreviewContainer');

const shouldShowWindow = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.currentLiveWindow !== 0)
}

const windowNotSet = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.currentLiveWindow === 0)
}

const showingTime = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.liveView.time.showTime)
}

const previewCanvasSize = (state) => {
    let s = getPreviewSize(state.window.size);
    let width = s.width;
    let height = s.height*2/3;
    return { width, height }
}


const selectWindowMessage = (state) => {
    let { width, height } = getPreviewSize(state.window.size);
    let cstyle = {
        width: width,
        height: height,
        paddingTop: height/3
    };
    return (
        <div style={cstyle} className="ui equal width center aligned padded grid">
            <div className="row">
                <div className="column">
                    <div> No window selected! </div>
                    <p> Please choose a window from the left</p>
                </div>
            </div>
        </div>);
}

let icon = function(itype, handler) {
    return (
        <a className="ui basic icon item" onClick={handler} >
            <i className={`${itype} icon`} />
        </a>
    );
}

// Use an external component as a timer manager..
let {IconPopup, IconPopupContent} = asPopup("spinner", <TimeChooser />);
//

const previewWindow = (state) => {
    let { width, height } = previewCanvasSize(state);
    let own = state.currentLiveWindowData.owner;
    let nam = state.currentLiveWindowData.name;
    let clw = state.currentLiveWindow;

    let closeHandler = () => {
        AppActions.updateCurrentLiveWindow(0);
    }

    let toggleTimeHandler = () => {
        AppActions.updateLiveViewTime({showTime: !state.liveView.time.showTime})
    }

    let windowTitle = (
        <h2 className="ui header">
            {own}
            <div className="sub header">
                {nam}
            </div>
        </h2>);

    let overlayMenu = (
        <div style={{ position: "absolute", background: color("#000000").clearer(0.6).rgbaString(), width: width }} >
            <div className="ui small floated right secondary menu inverted">
                <IconPopup />
                <IconPopupContent />
                {icon("time", toggleTimeHandler)}
                {icon("remove", closeHandler)}
            </div>
        </div>);


    let windowCapture = <WindowCapture width={width} height={height} wid={clw} dynamic="1" />;

    let timeMessage = <Time width={width} height={height} state={state}/>;

    let whatToShow = (showingTime(state) ? timeMessage  : windowCapture );

    return (
        <div>
            <div style={{ padding: '20px'}} className="ui">
                <div className="sixteen wide column"> {windowTitle} </div>
            </div>
            <div style={{ position: "relative"}} >
                <div style={{ position: "absolute" }} >
                    {whatToShow}
                </div> {overlayMenu} </div>
        </div>
    );

}


export default class PreviewContainer extends React.Component {

    constructor() {
        super();
        AppStore.getState();
    }

    onStoreChange(state) {
        this.setState(state)
    }

    componentDidMount() {
        AppStore.listen(this.onStoreChange.bind(this))
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onStoreChange.bind(this))
    }


    render() {
        debug('rendering container');
        if(shouldShowWindow(this.state)) {
            return previewWindow(this.state)
        } else {
            if(windowNotSet(this.state)) {
                return selectWindowMessage(this.state)
            } else {
                return <Loader message="Initializing" />
            }
        }
    }
}
