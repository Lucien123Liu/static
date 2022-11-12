function initScene() {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath( '' );

    const textureCube = loader.load( [
        'px.png', 'nx.png',
        'py.png', 'ny.png',
        'pz.png', 'nz.png'
    ] );
}