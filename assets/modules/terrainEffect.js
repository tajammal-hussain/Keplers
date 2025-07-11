import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
gsap.registerPlugin(ScrollTrigger);

export default class TerrainEffect {
    constructor(options) {
        this.time = 0;
        this.dom = options.dom || document.body;
        this.scroller = options.scroller;
        this.body = document.querySelector("body"),
        this.scene = new THREE.Scene();
        this.width = this.dom.offsetWidth;
        this.height = this.dom.offsetHeight;
        this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.01, 10);
        this.camera.position.z = 1.5;
        this.camera.position.y = -0.225;
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor(0x000000, 0); // transparent
        this.dom.appendChild(this.renderer.domElement);
        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
        if (this.scroller) {
            this.scrollAnims();
        }
    }
    resize() {
        this.width = this.dom.offsetWidth;
        this.height = this.dom.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
      
      
    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }
  scrollAnims() {
                  this.theme = "dark",
                  this.state = "terrain";
                  let t = 0;
                  const e = this.dom.offsetTop;
                  this.rotating = 1,
                  this.scroller.on("scroll", ( () => {
                      this.manageTheme(),
                      this.manageState(),
                      t = this.scroller.scroll.instance.scroll.y,
                      t > e ? (this.dom.style.top = t + "px",
                      "sphere" != this.state ? (this.rotating = 1 + 5e-4 * (t - e),
                      this.dom.style.opacity = .2) : "true" == !this.dom.getAttribute("fixed") && (this.dom.style.opacity = .4)) : "true" == !this.dom.getAttribute("fixed") && (this.dom.style.opacity = .4)
                  }
                  ))
              }
       
       manageTheme() {
                  this.body.classList.contains("--is-light") ? this.theme = "light" : this.theme = "dark",
                  "light" == this.theme ? this.particleMaterial.uniforms.uColor.value = new THREE.Vector3(0,0,0) : this.particleMaterial.uniforms.uColor.value = new THREE.Vector3(1,1,1)
              }
              manageState() {
                  this.body.classList.contains("--is-sphere") ? this.state = "sphere" : this.state = "terrain",
                  "sphere" == this.state ? this.planeToSphere() : this.sphereToPlane()
              }
              planeToSphere() {
                gsap.to(this.particleMaterial.uniforms.sphering, {
                    duration: 1.2,
                    value: 1
                }),
               gsap.to(this.camera.position, {
                    duration: 1.2,
                    z: 3
                }),
                gsap.to(this.particles.position, {
                    duration: 1.2,
                    x: 1.5
                }),
                gsap.to(this.particles.rotation, {
                    duration: 1.2,
                    y: .2,
                    z: 1.5
                })
            }
              sphereToPlane() {
                  gsap.to(this.particleMaterial.uniforms.sphering, {
                      duration: 1.2,
                      value: 0
                  }),
                  gsap.to(this.camera.position, {
                      duration: 1.2,
                      z: 1.5
                  }),
                  gsap.to(this.particles.position, {
                      duration: 1.2,
                      x: 0
                  }),
                  gsap.to(this.particles.rotation, {
                      duration: 1.2,
                      y: 0,
                      z: this.rotating
                  })
              }
      
      
    addObjects() {
        this.planeGeometry = new THREE.PlaneGeometry(1.5, 1.5, 80, 80);
        this.particleGeometry = new THREE.BufferGeometry();
        // 💡 Add a simple material for the plane
        this.planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.02,
            depthWrite: false 
        });
      
        this.particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                sphering: { value: 0 },
                uColor: { value: new THREE.Vector3(1, 1, 1) }
            },
            fragmentShader: `
                uniform vec3 uColor;
                void main() {
                    gl_FragColor = vec4(uColor, 1.);
                }
            `,
            vertexShader: `
                vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
                vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
                vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
                float cnoise(vec3 P){
                    vec3 Pi0 = floor(P);
                    vec3 Pi1 = Pi0 + vec3(1.0);
                    Pi0 = mod(Pi0, 289.0);
                    Pi1 = mod(Pi1, 289.0);
                    vec3 Pf0 = fract(P);
                    vec3 Pf1 = Pf0 - vec3(1.0);
                    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                    vec4 iy = vec4(Pi0.yy, Pi1.yy);
                    vec4 iz0 = Pi0.zzzz;
                    vec4 iz1 = Pi1.zzzz;
                    vec4 ixy = permute(permute(ix) + iy);
                    vec4 ixy0 = permute(ixy + iz0);
                    vec4 ixy1 = permute(ixy + iz1);
                    vec4 gx0 = ixy0 / 7.0;
                    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
                    gx0 = fract(gx0);
                    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                    vec4 sz0 = step(gz0, vec4(0.0));
                    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
                    vec4 gx1 = ixy1 / 7.0;
                    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
                    gx1 = fract(gx1);
                    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                    vec4 sz1 = step(gz1, vec4(0.0));
                    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
                    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
                    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
                    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
                    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
                    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
                    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
                    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
                    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
                    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                    g000 *= norm0.x;
                    g010 *= norm0.y;
                    g100 *= norm0.z;
                    g110 *= norm0.w;
                    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                    g001 *= norm1.x;
                    g011 *= norm1.y;
                    g101 *= norm1.z;
                    g111 *= norm1.w;
                    float n000 = dot(g000, Pf0);
                    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                    float n111 = dot(g111, Pf1);
                    vec3 fade_xyz = fade(Pf0);
                    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                    return 2.2 * n_xyz;
                }
                uniform float time;
                uniform float sphering;
                varying float vNoise;
                varying vec2 vUv;
                vec3 anglesToSphereCoord(vec2 a, float r) {
                    return vec3(
                        r * sin(a.y) * sin(a.x),
                        r * cos(a.y),
                        r * sin(a.y) * cos(a.x)  
                    );
                }
                void main() {
                    vec3 newposition = position;
                    float PI = 3.1415925;
                    newposition.z += 0.1*cnoise(vec3(position.x*4., position.y*4., time/10.));
                    newposition.y += sphering*(0.05*cnoise(vec3(position.x*4., position.z*4., time/10.)));
                    newposition.x += sphering*(0.05*cnoise(vec3(position.x*4., position.z*4., time/10.)));
                    gl_PointSize = 2.;
                    vec2 angles = PI * vec2(1.9 * newposition.x, uv.y + 0.8);
                    vec3 sphPos = anglesToSphereCoord(angles, .8);
                    vec3 wrapPos = mix(position, sphPos, 1.) * sphering;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4((newposition+wrapPos)-(newposition*wrapPos), 1.0);
                }
            `
        });
        this.mesh = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial);
        this.calculateParticlePosition();
        this.scene.add(this.mesh);
        this.scene.add(this.particles);
        this.scene.background = null;
        this.mesh.rotation.x = Math.PI / 2;
        this.mesh.position.y = -3;
        this.particles.rotation.x = -Math.PI / 180 * 80;
        this.particles.rotation.z = 1;
        this.particles.position.y = -0.15;
    }
    calculateParticlePosition() {
        const planePos = this.planeGeometry.attributes.position.array;
        const particleArray = new Float32Array(planePos.length);
        for (let i = 0; i < planePos.length; i++) {
            particleArray[i] = planePos[i];
        }
        this.particleGeometry.setAttribute("position", new THREE.BufferAttribute(particleArray, 3));
    }
    render() {
        this.time += 0.02;
        this.particleMaterial.uniforms.time.value = this.time;
        this.renderer.render(this.scene, this.camera);
        this.raf = window.requestAnimationFrame(this.render.bind(this));
    }
  }