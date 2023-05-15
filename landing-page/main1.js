import * as THREE from "https://cdn.skypack.dev/three@0.152.2";

var scene,
  sceneLight,
  portalLight,
  cam,
  renderer,
  // clock,
  portalParticles = [],
  smokeParticles = [],
  FOV,
  FAR;

function initScene() {
  scene = new THREE.Scene();

  sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
  sceneLight.position.set(0, 0, 1);
  scene.add(sceneLight);

  // portalLight = new THREE.PointLight(0x1d2f51, 50, 600, 1.7);
  // portalLight.position.set(0, 0, 250);
  // scene.add(portalLight);

  // Mobile camera
  if (window.innerWidth <= 768) {
    FOV = 90;
    FAR = 1000;
    // 769px - 1080px screen width camera
  } else {
    FOV = 70;
    FAR = 800;
  }

  cam = new THREE.PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    1,
    FAR
  );
  cam.position.z = 700;
  scene.add(cam);

  renderer = new THREE.WebGLRenderer({
    antialias: false
  });
  renderer.setClearColor(0x201b24, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let lightPurpleLight = new THREE.PointLight(0xd48fd4, 30, 700, 2);
  // let lightPurpleLight = new THREE.HemisphereLight(0xd48fd4, 0x201b24, 10);
  lightPurpleLight.position.set(-100, 100, 100);
  scene.add(lightPurpleLight);

  // let blueLight = new THREE.HemisphereLight(0xa9abdc, 0x201b24, 12);
  let blueLight = new THREE.PointLight(0xa9abdc, 50, 700, 2);
  blueLight.position.set(300, 300, 200);
  scene.add(blueLight);

  window.addEventListener("resize", onWindowResize, false);

  let loader = new THREE.TextureLoader();

  loader.load("./assets/smoke.png", function (texture) {
    let portalGeo = new THREE.PlaneGeometry(350, 350);
    let portalMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
    });
    let smokeGeo = new THREE.PlaneGeometry(900, 600);
    let smokeMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
    });

    for (let p = 325; p > 50; p--) {
      let particle = new THREE.Mesh(portalGeo, portalMaterial);
      particle.position.set(
        0.5 * p * Math.cos((4 * p * Math.PI) / 180),
        0.5 * p * Math.sin((4 * p * Math.PI) / 180),
        0.1 * p
      );
      particle.rotation.z = Math.random() * 360;
      portalParticles.push(particle);
      scene.add(particle);
    }

    for (let p = 0; p < 50; p++) {
      let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
      particle.position.set(
        Math.random() * 400 - 200,
        Math.random() * 400 - 200,
        25
      );
      particle.rotation.z = Math.random()* 360;
      particle.material.opacity = 0.6;
      portalParticles.push(particle);
      scene.add(particle);
    }
    // clock = new THREE.Clock();

    update();
  });
}

// function particleSetup() {}

function onWindowResize() {
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // let delta = clock.getDelta();
  // portalParticles.forEach((p) => {
  //   p.rotation.z -= 0.01 * 0.9;
  // });
  // smokeParticles.forEach((p) => {
  //   p.rotation.z -= 0.01 * 0.8;
  // });
  // renderer.render(scene, cam);
  // requestAnimationFrame(animate);
}

let clock = new THREE.Clock();
let delta = 0;
// 30 fps
let interval = 1 / 10;

function update() {
  requestAnimationFrame(update);
  delta += clock.getDelta();

  if (delta > interval) {
    // The draw or time dependent code are here
    portalParticles.forEach((p) => {
      p.rotation.z -= 0.9 * 0.1;
    });
    smokeParticles.forEach((p) => {
      p.rotation.z -= 0.00000000001;
    });

    renderer.render(scene, cam);

    delta = delta % interval;
  }
}

initScene();
