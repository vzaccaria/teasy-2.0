import color from 'color'
const xWidth = 300;
const yFromTop = 40;

const getPreviewSize = (window) => {
    return {
        width: (window.width - xWidth) > 0 ? (window.width - xWidth) : 0,
        height: window.height
    }
}

const dividerGray = color('#FFFFFF').darken(0.1).hexString()

const WindowListStyle = (window) => {
    return {
        boxSizing: 'border-box',
        width: xWidth,
        position: 'relative',
        top: yFromTop,
        minHeight: window.size.height - yFromTop,
        height: '100%',
        borderRight: `1px solid ${dividerGray}`,
        cursor: 'pointer',
        background: color('#FFFFFF').darken(0.05).hslString()
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
    WindowListStyle, PreviewStyle, getPreviewSize, MenuStyle, dividerGray
}
