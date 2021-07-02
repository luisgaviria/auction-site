import React, { Component } from "react";
import * as dat from "dat.gui";
import * as THREE from "three";
import jupiter from "./photos/jupiter.jpeg";

class Shape extends Component {
  componentDidMount() {
    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load(jupiter);
    const gui = new dat.GUI();
    const canvas = document.querySelector("canvas.webgl");
    const scene = new THREE.Scene();
    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.7;
    material.roughness = 0.2;
    material.normalMap = normalTexture;

    material.color = new THREE.Color(0x292929);
    const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
    // Mesh
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
    pointLight1.position.x = -0.39;
    pointLight1.position.y = 0.73;
    pointLight1.position.z = -1.05;
    pointLight1.intensity = 0.71;
    scene.add(pointLight1);

    const lightOne = gui.addFolder("light one");

    lightOne.add(pointLight1.position, "y").min(-3).max(3).step(0.01);
    lightOne.add(pointLight1.position, "x").min(-6).max(6).step(0.01);
    lightOne.add(pointLight1.position, "z").min(-3).max(3).step(0.01);
    lightOne.add(pointLight1, "intensity").min(0).max(10).step(0.01);

    // light 2

    const pointLight2 = new THREE.PointLight(0xafc1f0, 1);
    // pointLight2.position.x = 2;
    // pointLight2.position.y = 3;
    // pointLight2.position.z = 4;
    pointLight2.position.set(1.9, -3.03, -2.05);
    pointLight2.intensity = 9.97;

    const lightTwo = gui.addFolder("light two");

    lightTwo.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
    lightTwo.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
    lightTwo.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
    lightTwo.add(pointLight2, "intensity").min(0).max(10).step(0.01);
    scene.add(pointLight2);

    const light2Color = {
      color: 0xff0000,
    };

    lightTwo.addColor(light2Color, "color").onChange(() => {
      pointLight3.color.set(light2Color.color);
    });

    //light 3

    const pointLight3 = new THREE.PointLight(0x82768e, 2);
    // pointLight2.position.x = 2;
    // pointLight2.position.y = 3;
    // pointLight2.position.z = 4;
    pointLight3.position.set(-2.25, 1.6, -2.58);
    pointLight3.intensity = 10;
    scene.add(pointLight3);

    const lightThree = gui.addFolder("light three");

    lightThree.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
    lightThree.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
    lightThree.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
    lightThree.add(pointLight3, "intensity").min(0).max(10).step(0.01);

    const light3Color = {
      color: 0xff0000,
    };

    lightThree.addColor(light3Color, "color").onChange(() => {
      pointLight2.color.set(light3Color.color);
    });

    const pointHelper2 = new THREE.PointLightHelper(pointLight3, 1);
    scene.add(pointHelper2);

    const pointHelper3 = new THREE.PointLightHelper(pointLight2, 1);
    scene.add(pointHelper3);
    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const onDocumentMouseMove = (event) => {
      mouseX = event.clientX - windowHalfx;
      mouseY = event.clientY - windowHalfY;
    };
    document.addEventListener("mousemove", onDocumentMouseMove);

    const updateSphere = (event) => {
      sphere.position.y = window.scrollY * 0.001;
    };

    window.addEventListener("scroll", updateSphere);

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, 500);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowHalfx = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    const clock = new THREE.Clock();

    const tick = () => {
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.5 * elapsedTime;

      sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
      sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
      sphere.position.z += 0.05 * (targetY - sphere.rotation.x);

      // Update Orbital Controls
      // controls.update()

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };
    tick();
  }

  render() {
    return (
      <>
        <div class="container">
          {/* <h1>hello world!</h1> */}

          <div ref={(ref) => (this.mount = ref)} />
        </div>
      </>
    );
  }
}

export default Shape;
