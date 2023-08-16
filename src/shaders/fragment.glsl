// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;
#define PI 3.1415926535897932384626433832795
// Based on Morgan
// https://www.shadertoy.com/view/4dS3Wd



void main() {
    vec2 uv = vUv;
    uv -= vec2(0.5);
    float index = sin(u_time) * 0.5 + 0.5;
    vec3 color = vec3(vec3(length(uv)));
    color = texture2D(u_tex0, vec2(length(uv)*(index))).rgb;

    gl_FragColor = vec4(color , 1.0);
}