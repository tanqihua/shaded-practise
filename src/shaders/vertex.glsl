
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vmodelViewMatrix;

void main(){
    vPosition = position;
    vNormal = normal;
    vUv = uv;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
   	gl_Position = projectedPosition;
}