import * as THREE from 'three'
import { addPass, useCamera, useGui, useRenderSize, useScene, useTick } from './render/init.js'
// import postprocessing passes
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const startApp = () => {
  const scene = useScene()
  const camera = useCamera()
  const gui = useGui()
  const { width, height } = useRenderSize()

  // settings
  const MOTION_BLUR_AMOUNT = 0.725

  // lighting
  const dirLight = new THREE.DirectionalLight('#ffffff', 0.75)
  dirLight.position.set(5, 5, 5)

  const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
  scene.add(dirLight, ambientLight)

  // meshes
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const u_tex0 = new THREE.TextureLoader().load(
    'https://threejsfundamentals.org/threejs/resources/images/wall.jpg'
  )
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    wireframe: false,
    uniforms: {
      u_time: { value: 1 },
      u_resolution: new THREE.Uniform(new THREE.Vector2()),
      u_mouse: new THREE.Uniform(new THREE.Vector2()),
      u_tex0: { value: u_tex0 },
    },
  })

  const ico = new THREE.Mesh(geometry, material)

  console.log(geometry.attributes)
  scene.add(ico)

  // GUI
  const cameraFolder = gui.addFolder('Camera')
  cameraFolder.add(camera.position, 'z', 0, 10)
  cameraFolder.open()

  let canvasElement = document.querySelector('canvas')
  canvasElement.addEventListener('mousemove', (e) => {
    ico.material.uniforms.u_mouse.value.x = e.clientX / canvasElement.width
    ico.material.uniforms.u_mouse.value.y = e.clientY / canvasElement.height

    console.log(e.clientX / canvasElement.width)
  })

  useTick(({ timestamp, timeDiff }) => {
    ico.material.uniforms.u_time.value = timestamp / 1000
    ico.material.uniforms.u_resolution.value.x = window.innerWidth
    ico.material.uniforms.u_resolution.value.y = window.innerHeight
  })
}

export default startApp
