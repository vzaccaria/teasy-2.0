const xWidth = 300;
const yFromTop = '50px'

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
        position: 'relative',
        top: yFromTop,
        minHeight: window.size.height,
        height: '100%',
        borderRight: '1px solid gray',
        cursor: 'pointer'
    }
}

const PreviewStyle = {
    bxSizing: 'border-box',
    position: 'fixed',
    top: yFromTop,
    left: xWidth,
    height: '100%'
}

const MenuStyle = {

}

module.exports = {
    WindowListStyle, PreviewStyle, getPreviewSize, MenuStyle
}
