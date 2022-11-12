function createPointCloud(scene, path) {
    let canvasDom = document.createElement("canvas");
    document.body.appendChild(canvasDom);
    canvasDom.setAttribute('width', 250);
    canvasDom.setAttribute('height', 250);
    canvasDom.style.position = 'absolute';
    const ctx = canvasDom.getContext("2d");
    const img = new Image();
    img.src = path;
    img.onload = function () {
        imgDate = ctx.getImageData(0, 0, canvasDom.width, canvasDom.height);
        img2PotCloud(scene, imgDate, canvasDom);   //创建点云
    };
}

function img2PotCloud(scene, imgDate, canvasDom) {    //创建点云
    console.log(imgDate);
    let particles = canvasDom.width * canvasDom.height;
    let geometry = new THREE.BufferGeometry();

    let positions = new Float32Array(particles * 3);
    let colors = new Float32Array(particles * 3);
    for (let i = 0; i < positions.length; i++) {
        // positions
        positions[3 * i] = parseInt(i % canvasDom.width);
        positions[3 * i + 1] = 200 + parseInt((canvasDom.height - i) / canvasDom.width);
        positions[3 * i + 2] = 0;
        // colors

        colors[3 * i] = imgDate.data[4 * i] / 255.0;
        colors[3 * i + 1] = imgDate.data[4 * i + 1] / 255.0;
        colors[3 * i + 2] = imgDate.data[4 * i + 2] / 255.0;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    //    geometry.computeBoundingSphere();
    console.log("geometry", geometry);
    let material = new THREE.PointsMaterial({ size: 1, vertexColors: THREE.VertexColors });
    let points = new THREE.Points(geometry, material);
    scene && scene.add(points);
}