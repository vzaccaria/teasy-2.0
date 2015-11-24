import React from 'react';
import moment from 'moment'
import _ from 'lodash'

moment.locale('it');

export default class Time extends React.Component {

    render()  {
        let curtime = moment()
            let message =curtime.format('HH:mm:ss');

        let showBreakTime = _.get(this.props, "state.liveView.breakTime", false);
        let nmessage = ""
        if(showBreakTime !== false) {
            let diff = moment(showBreakTime, "HH:mm").diff(curtime);
            let duration = moment.duration(diff);
            if(diff > 0) {
                nmessage = `- ${duration.humanize()}`;
            } else {
                nmessage = '- tempo scaduto';
            }
        } else {
            nmessage= "";
        }

        if(_.get(this.props, 'asDimmer', false)) {
            let cn = "ui active dimmer";

            return (
                <div className={cn} >
                    <div style={{fontSize: 40}} className="ui text loader">
                        {message}{nmessage}
                    </div>
                </div>
            )
        } else {
            let cstyle = {
                fontSize: 40,
                width: this.props.width,
                height: this.props.height,
                paddingTop: this.props.height/3,
                background: "black",
                color: "white"
            };
            return (
                <div style={cstyle} className="ui equal width center aligned padded grid">
                    <div className="row">
                        <div className="column">
                            {message}{nmessage}
                        </div>
                    </div>
                </div>);

        }
    }
}
