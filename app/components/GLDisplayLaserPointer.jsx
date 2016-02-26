import React from 'react';
import GL from 'gl-react';

const shaders = GL.Shaders.create({
    justDisplay: {
        frag: `
        precision mediump float;
        varying vec2 uv;

        uniform float width;
        uniform float size;
        uniform float height;
        uniform float intensity;
        uniform vec2 position;

        void main () {
            vec3 color = vec3(0.2, 0.2, 0.2);
            vec2 uvp   = uv       * vec2(width, height);
            vec2 posp  = position * vec2(width, height);
            posp.y = height - posp.y;
            float sizep = size * width;
            float a = step(sizep, distance(uvp, posp)) * intensity ;
            gl_FragColor = vec4(color, a);
            }`
    }
});


let GLDisplayLaserPointer = GL.createComponent(
    (uniforms) => {
        return (
            <GL.Node shader={shaders.justDisplay} uniforms={uniforms} />
        );
    },
    { displayName: "Laser Pointer Buffer" }
);

module.exports = { GLDisplayLaserPointer }
