'use client';

import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE: typeof import('three') | null = null;
    let renderer: import('three').WebGLRenderer | null = null;
    let scene: import('three').Scene | null = null;
    let camera: import('three').PerspectiveCamera | null = null;
    let particles: import('three').Points | null = null;
    let geometryGroup: import('three').Group | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const init = async () => {
      try {
        THREE = await import('three');

        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0d0d0d, 0.035);

        // Camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Renderer
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0d0d0d, 1);

        // Particle system
        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const cyanColor = new THREE.Color(0x50e5ea);
        const whiteColor = new THREE.Color(0xffffff);
        const dimColor = new THREE.Color(0x1a3a3b);

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 200;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

          const rand = Math.random();
          let color;
          if (rand < 0.3) color = cyanColor;
          else if (rand < 0.5) color = whiteColor;
          else color = dimColor;

          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;

          sizes[i] = Math.random() * 2 + 0.5;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMat = new THREE.PointsMaterial({
          size: 0.3,
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true,
        });

        particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Geometric shapes group
        geometryGroup = new THREE.Group();
        scene.add(geometryGroup);

        // Wireframe torus
        const torusGeo = new THREE.TorusGeometry(8, 2, 16, 60);
        const torusMat = new THREE.MeshBasicMaterial({
          color: 0x50e5ea,
          wireframe: true,
          transparent: true,
          opacity: 0.08,
        });
        const torus = new THREE.Mesh(torusGeo, torusMat);
        torus.position.set(20, 5, -20);
        geometryGroup.add(torus);

        // Wireframe icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(5, 1);
        const icoMat = new THREE.MeshBasicMaterial({
          color: 0x50e5ea,
          wireframe: true,
          transparent: true,
          opacity: 0.1,
        });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        ico.position.set(-20, -5, -15);
        geometryGroup.add(ico);

        // Wireframe octahedron
        const octGeo = new THREE.OctahedronGeometry(4, 0);
        const octMat = new THREE.MeshBasicMaterial({
          color: 0x50e5ea,
          wireframe: true,
          transparent: true,
          opacity: 0.12,
        });
        const oct = new THREE.Mesh(octGeo, octMat);
        oct.position.set(0, 15, -25);
        geometryGroup.add(oct);

        // Small floating spheres
        for (let i = 0; i < 8; i++) {
          const sphereGeo = new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 8, 8);
          const sphereMat = new THREE.MeshBasicMaterial({
            color: 0x50e5ea,
            transparent: true,
            opacity: 0.4 + Math.random() * 0.4,
          });
          const sphere = new THREE.Mesh(sphereGeo, sphereMat);
          sphere.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20 - 5
          );
          geometryGroup.add(sphere);
        }

        // Grid plane
        const gridHelper = new THREE.GridHelper(100, 30, 0x50e5ea, 0x1a2a2a);
        gridHelper.position.y = -15;
        gridHelper.material.transparent = true;
        (gridHelper.material as import('three').Material).opacity = 0.15;
        scene.add(gridHelper);

        // Mouse move
        const handleMouseMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Resize
        const handleResize = () => {
          if (!camera || !renderer) return;
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        let time = 0;
        const animate = () => {
          animFrameRef.current = requestAnimationFrame(animate);
          time += 0.005;

          if (particles) {
            particles.rotation.y = time * 0.05;
            particles.rotation.x = time * 0.02;
          }

          if (geometryGroup) {
            geometryGroup.children.forEach((child, i) => {
              child.rotation.x = time * (0.1 + i * 0.05);
              child.rotation.y = time * (0.15 + i * 0.03);
              child.position.y += Math.sin(time + i) * 0.005;
            });
          }

          if (camera) {
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
            camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);
          }

          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        };

        animate();

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
        };
      } catch (err) {
        console.warn('Three.js not available:', err);
      }
    };

    const cleanup = init();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (renderer) {
        renderer.dispose();
      }
      cleanup.then(fn => fn && fn());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
