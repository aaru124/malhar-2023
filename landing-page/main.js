import * as THREE from "https://cdn.skypack.dev/three@0.152.2";

let scene,
  camera,
  cloudParticles = [];
let renderer = new THREE.WebGLRenderer();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = -3;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  let ambient = new THREE.AmbientLight(0x8f84ad);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight(0xfb8500);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  let lightPurpleLight = new THREE.PointLight(0xd48fd4, 25, 700, 2);
  lightPurpleLight.position.set(-100, 300, 100);
  scene.add(lightPurpleLight);

  let redLight = new THREE.PointLight(0xdc2f02, 75, 700, 2);
  redLight.position.set(200, 300, 100);
  scene.add(redLight);

  let blueLight = new THREE.PointLight(0xa9abdc, 50, 700, 2);
  blueLight.position.set(300, 300, 200);
  scene.add(blueLight);

  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.fog = new THREE.FogExp2(0x201b24, 0.001);
  renderer.setClearColor(scene.fog.color);
  document.body.appendChild(renderer.domElement);

  let loader = new THREE.TextureLoader();
  loader.load("./assets/smoke.png", function (texture) {
    let cloudGeo = new THREE.PlaneGeometry(500, 500);
    let cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
    });

    for (let p = 0; p < 30; p++) {
      var cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 400 - 200,
        300,
        Math.random() * 500 - 500
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });

  window.addEventListener("resize", onWindowResize, false);

  render();
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  cloudParticles.forEach((p) => {
    p.rotation.z -= 0.01;
  });
  camera.rotation.z += 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

init();
