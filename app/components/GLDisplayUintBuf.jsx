import React from 'react';
import GL from 'gl-react';

const shaders = GL.Shaders.create({
    justDisplay: {
        frag: `
        precision highp float;
        varying vec2 uv;
        uniform sampler2D image;
        void main () {
            vec4 c = texture2D(image, uv);
            gl_FragColor = c;
        }
        `
    }
});


let GLDisplayUintBuf = GL.createComponent(
    ({ width, height, image }) => {
        return (
            <GL.View width={width} height={height} shader={shaders.justDisplay} uniforms={{ image }} />
        );
    },
    { displayName: "Raw Buffer" }
);

module.exports = { GLDisplayUintBuf }
