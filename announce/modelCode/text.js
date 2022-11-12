const LoveText = {
    Materials: null,
    Mesh: null,
    countNum: 0,
    text: ['我爱你'],
    async init() {
        const json = await loadModel('../fonts/xianruwomenderelianziti.ttf', THREE.TTFLoader);
        console.log(json, 'json------');
        const font = new THREE.Font( json );
        const textGroup = new THREE.Group();
        const height = 20,
				size = 70,
				hover = 30,
				curveSegments = 4,
				bevelThickness = 2,
				bevelSize = 1.5;
        const textGeo = new THREE.TextGeometry( this.text[0], {

            font: font,

            size: size,
            height: height,
            curveSegments: curveSegments,

            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: true

        } );

        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();

        const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
        const material = new THREE.MeshNormalMaterial({
            flatShading: THREE.FlatShading,
            transparent: true,
            opacity: 0.9
        });

        textMesh1 = new THREE.Mesh( textGeo, material );

        textMesh1.position.x = centerOffset;
        textMesh1.position.y = hover;
        textMesh1.position.z = 0;

        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;

        textGroup.add( textMesh1 );

        // 反射效果
        // if ( mirror ) {

        //     textMesh2 = new THREE.Mesh( textGeo, material );

        //     textMesh2.position.x = centerOffset;
        //     textMesh2.position.y = - hover;
        //     textMesh2.position.z = height;

        //     textMesh2.rotation.x = Math.PI;
        //     textMesh2.rotation.y = Math.PI * 2;

        //     textGroup.add( textMesh2 );

        // }
        textGroup.name = 'love_text';
        textGroup.rotateY(-Math.PI);
        textGroup.position.setY(-300);
        this.Mesh = textGroup;
    },
    async addTo(parent) {
        if (!this.Mesh) {
            await this.init();
        }
        this.Mesh.layers.set(1);
        parent.add(this.Mesh);
    },

}
