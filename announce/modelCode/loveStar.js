const LoveStar = {
    Materials: null,
    Mesh: null,
    now: Date.now(),
    lastTime: Date.now(),
    animateState: null,
    state: 'beat',
    breathSpeed: 0,
    countNum: 0,
    imgWH: 200,
    animate() {
        this.now = Date.now();
        if (!this.Mesh || this.animateState !== 'play') {
            this.lastTime = this.now;
            return;
        }
        this.animateCb();
    },
    animateCb() {
        switch (this.state) {
            case 'beat':
                this.beateAnimation();
                break;
            case 'beatRotate':
                this.beateAnimation();
                this.rotateAnimation();
                break;
            default:
                break;
        }
        this.lastTime = this.now;
    },
    beateAnimation() {
        this.countNum += (this.now - this.lastTime) / 200;

        if (this.countNum >= 2 * Math.PI) {
            this.countNum = 0;
        }

        this.breathSpeed += Math.sin(this.countNum) * 0.1;
        if (Math.abs(this.countNum - Math.PI / 2) < 0.5) {
            const breathSpeed = this.breathSpeed + Math.random() + 0.5;
            this.Mesh.scale.set(breathSpeed, breathSpeed, breathSpeed);
        } else {
            // this.Mesh.scale.set(this.breathSpeed, this.breathSpeed, this.breathSpeed);
        }
    },
    rotateAnimation() {
        this.Mesh && this.Mesh.rotateZ(0.01);
    },
    changeAnimateState(state) {
        this.animateState = state;
    },
    playAndType(type) {
        this.state = type;
        switch (type) {
            case 'beatRotate':
                break;
            case 'beat':
                break;
            case 'run':
                break;
            default:
                break;
        }
        this.changeAnimateState('play');
    },
    async init() {
        const gltf = await loadModel('../models/heart.gltf');
        console.log(gltf, 'gltf-------');

        const originMesh = gltf.scene.children[0];
        // 创建缓冲几何体
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(originMesh.geometry.attributes.position.array, 3)
        );
        const material = new THREE.PointsMaterial({
            size: 2.5, // 粒子大小
            color: 0xf45662 // 使用顶点颜色
        });
        // const mesh = new THREE.Points(geometry, material);
        const wireMaterial = new THREE.MeshBasicMaterial({
            // wireframe: true,
            transparent: true,
            opacity: 0.5,
            alphaTest: 0.5,
            color: 0xf45662 // 使用顶点颜色
        });
        const mesh = new THREE.Points(geometry, material);
        // const mesh = new THREE.Mesh(originMesh.geometry, wireMaterial);
        mesh.scale.set(this.breathSpeed, this.breathSpeed, this.breathSpeed);
        mesh.name = 'love_star';
        mesh.rotateX(-Math.PI / 2);
        // mesh.layers.set(0);
        mesh.layers.enable(1);
        this.Mesh = mesh;
    },
    async addTo(parent) {
        if (!this.Mesh) {
            await this.init();
        }
        this.now = Date.now();
        parent.add(this.Mesh);
    }
}

window.LoveStar = LoveStar;
