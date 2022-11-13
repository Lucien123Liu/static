import * as THREE from "three";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js"; // 轨道控制

function pathResolve(path) {
    if (location.host !== 'localhost') {
        path = path.replace(/^\.\.?\//, './');
    }
    return path;
}


const imgNames = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "love_forever.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
]
const imagesPath = pathResolve('../images/');
// const imgNames = [
//     "mmexport1667360132074.jpg",
//     "mmexport1667660783544.jpg",
//     "mmexport1665499656402.jpg",
//     "mmexport1663431919648.jpg",
//     "mmexport1664979992740.jpg",
//     "mmexport1664549518756.jpg",
//     "IMG_20220914_204446.jpg",
//     "IMG_20220917_120217.jpg",
//     "IMG_20220917_120257.jpg",
// ]

// const imagesPath = 'https://lucien123liu.github.io/static/announce/images/';

const indexMap = [
    {
        label: 'right',
        x: 0,
        y: 1 / 2,
        z: 1 / 2,
        direction: 1,
    },
    {
        label: 'left',
        x: 0,
        y: 1 / 2,
        z: -1 / 2,
        direction: -1,
    },
    {
        label: 'top',
        x: 1 / 2,
        y: 0,
        z: 1 / 2,
        direction: 1,
    },
    {
        label: 'bottom',
        x: 1 / 2,
        y: 0,
        z: -1 / 2,
        direction: -1,
    },
    {
        label: 'front',
        x: 0,
        y: 0,
        z: -1 / 2,
        direction: -1,
    },
    {
        label: 'back',
        x: 0,
        y: 0,
        z: 1 / 2,
        direction: 1,
    },
];

// 点击交互函数
function onDocumentMouseDown(event, param) {
    const {
        camera,
        scene,
        cb,
    } = param;
    let mouseVector = new THREE.Vector3();
    let x, y;
    if (event.touches) { // 判断是否是客户端的touch事件
        x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
        y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
    } else {
        x = (event.layerX / window.innerWidth) * 2 - 1;
        y = -(event.layerY / window.innerHeight) * 2 + 1;
    }
    mouseVector.set(x, y, 0.5);
	const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseVector, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        console.log(intersects[0], '选中的模型~');
        // intersects[0].object.traverse(child => {
        //     if (child.isMesh) {
        //         child.material.color.set(0x00aa00);
        //     }
        // });
        cb && cb(intersects[0].object);
    }
}

function onWindowResize(event, param) {
    const {
        camera,
        renderer,
    } = param;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function randomNumBoth(Min, Max, fl) {
    const Range = Max - Min;
    const Rand = Math.random();
    const num = Min + (fl ? Rand * Range : Math.round(Rand * Range)); //四舍五入
    return num;
}

// 获取贴图
function getTexture(path) {
    return new THREE.TextureLoader().load(path);
}

function loadModel(path, loader = GLTFLoader) {
    path = pathResolve(path);
    var loader = new loader();
    return new Promise((resolve, reject) => {
        loader.load(path, function (gltf) {
            resolve(gltf);
        }, () => { }, e => {
            reject(e);
        });
    });
}

window.THREE = THREE;
window.imgNames = imgNames;
window.imagesPath = imagesPath;
window.pathResolve = pathResolve;
window.indexMap = indexMap;
window.randomNumBoth = randomNumBoth;
window.getTexture = getTexture;
window.loadModel = loadModel;
window.onDocumentMouseDown = onDocumentMouseDown;
window.onWindowResize = onWindowResize;