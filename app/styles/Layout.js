const xWidth = 300;

const getPreviewSize = (window) => {
    return {
        width: (window.width - xWidth) > 0 ? (window.width - xWidth) : 0,
        height: window.height
    }
}

const WindowListStyle = (window) => {
    return {
        boxSizing: 'border-box',
        width: xWidth,
        height: window.size.height,
        borderRight: '1px solid gray'
    }
}

const PreviewStyle = {
    bxSizing: 'border-box',
    position: 'fixed',
    top: '0',
    left: xWidth,
    height: '100%'
}

module.exports = {
    WindowListStyle, PreviewStyle, getPreviewSize
}
