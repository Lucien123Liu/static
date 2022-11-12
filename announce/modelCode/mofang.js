import * as THREE from "three";
const MofangPhoto = {
    Materials: null,
    Mesh: null,
    imgWH: 200,
    init() {
        // 材质列表
        this.Materials = (new Array(6).fill(1)).map((path, index) => {
            return new THREE.MeshBasicMaterial({
                name: "material_" + indexMap[index].label,
                map: getTexture(imagesPath + imgNames[index])
            });
        });

        this.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(this.imgWH, this.imgWH, this.imgWH),
            this.Materials
        );
    },
    addTo(parent) {
        if (!this.Mesh) {
            this.init();
        }
        console.log(this.Mesh, 'this.Mesh------');
        parent.add(this.Mesh);
    }
}

const MofangPhotoPlan = {
    Materials: null,
    Meshs: null,
    now: null,
    translateNum: 0,
    direction: 1,
    animateState: null,
    frameTime: 0,
    state: 'close',
    imgWH: 150,
    animate() {
        if (this.animateState !== 'play' || !this.Meshs) {
            return;
        }
        this.animateCb();
    },
    animateCb() {
        switch (this.state) {
            case 'open':
            case 'close':
                this.openCloseAnimation();
                break;
            case 'rotate':
                this.rotateAnimation();
                break;
            case 'openCloseRotate':
                this.openCloseAnimation(false);
                this.rotateAnimation();
                break;
            default:
                break;
        }
    },
    // 卡片围转动画
    planRotateAnimation() {

    },
    // 打开关闭立方体盒子的动作逻辑
    openCloseAnimation(stopFlag = true) {
        this.translateNum += this.direction;
        if (this.translateNum <= 0) {
            this.translateNum = 0;
            stopFlag && this.changeAnimateState('stop');
        }
        if (this.translateNum >= 1.5) {
            this.translateNum = 1.5;
            stopFlag && this.changeAnimateState('stop');
        }
        this.Meshs.children.forEach((mesh, index) => {
            switch (index) {
                case 0:
                case 1:
                    mesh.position.setX(this.imgWH * (indexMap[index].z + indexMap[index].direction * this.translateNum));
                    break;
                case 2:
                case 3:
                    mesh.position.setY(this.imgWH * (indexMap[index].z + indexMap[index].direction * this.translateNum));
                    break;
                case 4:
                case 5:
                    mesh.position.setZ(this.imgWH * (indexMap[index].z + indexMap[index].direction * this.translateNum));
                    break;
                default:
                    break;
            }
        })
    },
    rotateAnimation() {
        if (!this.Meshs || this.animateState !== 'play') {
            return;
        }
        this.Meshs.rotateY(0.01);
        this.Meshs.rotateX(0.005);
    },
    changeAnimateState(state) {
        this.animateState = state;
    },
    rotate(type = 'cube') {
        switch (type) {
            case 'cube':
                this.state = 'rotate';
                break;
            case 'plan':
                this.state = 'rotatePlan';
                break;
            default:
                break;
        }
        this.changeAnimateState('play');
    },
    open() {
        this.state = ['rotate', 'openCloseRotate', 'open'].includes(this.state) ? 'openCloseRotate' : 'open';
        this.direction = 1 * randomNumBoth(1, 1.5, true);
        this.changeAnimateState('play');
    },
    close() {
        this.state = ['rotate', 'openCloseRotate', 'close'].includes(this.state) ? 'openCloseRotate' : 'close';
        this.direction = -1 * randomNumBoth(1, 1.5, true);
        this.changeAnimateState('play');
    },
    init() {
        const geometry = new THREE.BoxGeometry(this.imgWH, this.imgWH, 1);
        // 材质列表
        this.Materials = (new Array(6).fill(1)).map((path, index) => {
            return new THREE.MeshBasicMaterial({
                name: "material_" + indexMap[index].label,
                side: THREE.DoubleSide,
                map: getTexture(imagesPath + imgNames[index]),
            });
        });

        this.Meshs = new THREE.Group();
        this.Materials.forEach((material, index) => {
            // const geometry = new THREE.PlaneGeometry( this.imgWH, this.imgWH );
            let plane = new THREE.Mesh( geometry, material );
            const groupHelper = new THREE.Group();
            groupHelper.layers.set(0);
            plane.name = indexMap[index].label;
            plane.rotateX(Math.PI * indexMap[index].x);
            plane.rotateY(Math.PI * indexMap[index].y);
            switch (index) {
                case 0:
                case 1:
                    plane.position.setX(this.imgWH * indexMap[index].z);
                    break;
                case 2:
                    groupHelper.add(plane);
                    plane.position.setX(-this.imgWH / 2);
                    groupHelper.position.setX(this.imgWH / 2);
                    groupHelper.name = 'mofang_planGroup';
                    plane = groupHelper;
                    plane.position.setY(this.imgWH * indexMap[index].z);
                    break;
                case 3:
                    plane.position.setY(this.imgWH * indexMap[index].z);
                    break;
                case 4:
                case 5:
                    plane.position.setZ(this.imgWH * indexMap[index].z);
                    break;
                default:
                    break;
            }
            plane.layers.set(0);
            this.Meshs.add(plane);
        });
        this.Meshs.name = 'mofang_bb';
        this.Meshs.layers.enable(1);
        console.log(this.Meshs, 'mofang.Meshs-----');
    },
    addTo(parent) {
        if (!this.Meshs) {
            this.init();
        }
        this.now = Date.now();
        parent.add(this.Meshs);
        // this.rotate();
    }
}

window.MofangPhoto = MofangPhoto;
window.MofangPhotoPlan = MofangPhotoPlan;