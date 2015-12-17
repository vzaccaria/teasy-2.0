let _ = require('lodash')
let Polyglot = require('node-polyglot')
let moment = require('moment')

let _phrases = {
    it: {
        waitingForConnection: "In attesa del contenuto",
        noWindowSelected: "Nessuna finestra scelta",
        chooseAWindowFromTheLeft: "Scegli una finestra sulla sinistra",
        timeFinished: "tempo scaduto",
        initializing: "Inizializzazione",
        longTimeFormat: "dddd Do MMMM YYYY, HH:mm:ss",
        showingTopWindow: "Mostra sempre finestra top"
    },

    en: {
        waitingForConnection: "Waiting for connection",
        chooseAWindowFromTheLeft: "Please, choose a window from the left",
        noWindowSelected: "No window selected!",
        timeFinished: "time is up",
        initializing: "Initializing",
        longTimeFormat: "dddd MMMM, Do YYYY, h:mm:ss a",
        showingTopWindow: "Showing top window"
    }
}

function entry(language) {

    if (_.isUndefined(_phrases[language])) {
        language = 'en';
    }
    let phrases = _phrases[language]
    let _poly = new Polyglot({
        phrases
    })
    moment.locale(language);

    return function(datum, props) {
        if (_.isString(datum)) {
            return _poly.t.apply(_poly, arguments)
        } else {
            let isDuration = _.get(props, 'duration', false);
            if (moment.isMoment(datum) || isDuration) {
                let isShort = _.get(props, 'short', false);
                if (isDuration) {
                    return datum.humanize();
                } else {
                    if (isShort) {
                        return datum.format("HH:mm");
                    } else {
                        return datum.format(_phrases[language].longTimeFormat);
                    }
                }
            }
        }
    }
}

module.exports = entry
