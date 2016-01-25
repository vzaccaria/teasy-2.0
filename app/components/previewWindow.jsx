import React from 'react';
import _ from 'lodash'
import color from 'color'

import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions'
import { getPreviewSize } from '../styles/Layout'
import { asPopup } from '../components/popup'
import TimeChooser from '../components/TimeChooser'
import Time from '../components/time'
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';

import { Icon } from '../components/icon';

const showingTime = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.liveView.time.showTime)
}

const previewCanvasSize = (state) => {
    let s = getPreviewSize(state.window.size);
    let width = s.width;
    let height = s.height*2/3;
    return { width, height }
}

let {IconPopup, IconPopupContent} = asPopup("spinner", <TimeChooser />);

export default class PreviewWindow extends React.Component {

    render()  {
        var state = this.props.state
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

        let toggleShowTopBar = () => {
            AppActions.toggleShowTopBar();
        }

        let windowTitle = (
            <h2 className="ui header">
                {own}
                <div className="sub header">
                    {nam}
                </div>
            </h2>);

        let overlayMenu = (
            <div style={{ position: "absolute", background: color("#000000").clearer(0.4).rgbaString(), width: width }} >
                <div className="ui small floated right secondary menu inverted">
                    <Icon type="maximize" onClick={toggleShowTopBar} />
                    <IconPopup />
                    <IconPopupContent />
                    <Icon type="time" onClick={toggleTimeHandler} />
                    <Icon type="remove" onClick={closeHandler} />
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

}
