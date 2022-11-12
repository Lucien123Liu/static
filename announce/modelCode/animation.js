import TWEEN from "helper/tween.esm.js"; // 抗锯齿着色器

function openUpClose(step, meshObj) {
    const posHelper = {
        y: 0,
        open: 0,
        close: -3 * Math.PI / 4,
        breathSpeed: meshObj.breathSpeed || 0,
    };
    const mesh = meshObj.Mesh || meshObj.Meshs;

    switch (step) {
        case 1:
            controlWrapper.tween.one =
                new TWEEN.Tween(posHelper)
                    .to({
                        open: -3 * Math.PI / 4,
                    }, 1000)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .onUpdate(() => {
                        mesh.children[2].rotation.z = posHelper.open;
                    })
                    .onComplete(() => {
                        console.log('打开盒子完毕，上升小心心，请注意！');
                        openUpClose(2, models.LoveStar);
                    })
                    .start();
            break;
        case 2:
            controlWrapper.tween.two =
                new TWEEN.Tween(posHelper)
                    .to({
                        y: 200,
                        breathSpeed: 6,
                    }, 500)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .onUpdate(() => {
                        mesh.position.setY(posHelper.y);
                        mesh.scale.set(posHelper.breathSpeed, posHelper.breathSpeed, posHelper.breathSpeed);
                    })
                    .onComplete(() => {
                        meshObj.playAndType('beatRotate');
                        console.log('上升完毕，请关闭盒子');
                        openUpClose(3, models.MofangPhotoPlan);
                    })
                    .start();
            break;
        case 3:
            controlWrapper.tween.two =
                new TWEEN.Tween(posHelper)
                    .to({
                        close: 0,
                    }, 1000)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .onUpdate(() => {
                        mesh.children[2].rotation.z = posHelper.close;
                    })
                    .onComplete(() => {
                        console.log('已关闭盒子，开始旋转咯~');
                        meshObj.rotate();
                    })
                    .start();
            break;

        default:
            break;
    }
}

const posHelper = {
    translateNum: 0,
    step: 0
};
function openRotate(step, meshObj) {
    const mesh = meshObj.Mesh || meshObj.Meshs;

    if (posHelper.step === step) {
        step = 2;
    }
    posHelper.step = step || 0;
    switch (step) {
        case 1:
            posHelper.breathSpeed = 0;
            controlWrapper.tween.one =
                new TWEEN.Tween(posHelper)
                    .to({
                        translateNum: 1.5,
                        breathSpeed: 6
                    }, 500)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .onUpdate(() => {
                        mesh.children.forEach((child, index) => {
                            switch (index) {
                                case 0:
                                case 1:
                                    child.position.setX(meshObj.imgWH * (indexMap[index].z + indexMap[index].direction * posHelper.translateNum));
                                    break;
                                case 2:
                                case 3:
                                    child.position.setY(meshObj.imgWH * (indexMap[index].z + indexMap[index].direction * posHelper.translateNum));
                                    break;
                                case 4:
                                case 5:
                                    child.position.setZ(meshObj.imgWH * (indexMap[index].z + indexMap[index].direction * posHelper.translateNum));
                                    break;
                                default:
                                    break;
                            }
                        });
                        models.LoveStar.Mesh.scale.set(posHelper.breathSpeed, posHelper.breathSpeed, posHelper.breathSpeed);
                    })
                    .onComplete(() => {
                        console.log('打开盒子完毕，转起来了，请注意！');
                        models.LoveStar.breathSpeed = posHelper.breathSpeed;
                        models.LoveStar.playAndType('beatRotate');
                        models.MofangPhotoPlan.rotate();
                    })
                    .start();
            break;
        case 2:
            // 关上盒子
            posHelper.translateNum = 1.5;
            posHelper.breathSpeed = 6;
            models.LoveStar.changeAnimateState();
            controlWrapper.tween.one =
                new TWEEN.Tween(posHelper)
                    .to({
                        translateNum: 0,
                        breathSpeed: 0
                    }, 500)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .onUpdate(() => {
                        mesh.children.forEach((child, index) => {
                            switch (index) {
                                case 0:
                                case 1:
                                    child.position.setX(meshObj.imgWH * (indexMap[index].z + indexMap[index].direction * posHelper.translateNum));
                                    break;
                                case 2:
                                case 3:
                                    child.position.setY(meshObj.imgWH * (indexMap[index].z + indexMap[index].direction * posHelper.translateNum));
                                    break;
                                case 4:
                                case 5:
                                    child.position.setZ(meshObj.imgWH * (indexMap[index].z + indexMap[index].direction * posHelper.translateNum));
                                    break;
                                default:
                                    break;
                            }
                        });
                        models.LoveStar.Mesh.scale.set(posHelper.breathSpeed, posHelper.breathSpeed, posHelper.breathSpeed);
                    })
                    .onComplete(() => {
                        console.log('打开关上了，请注意！');
                    })
                    .start();
            break;
        default:
            break;
    }
}
window.openUpClose = openUpClose;
window.openRotate = openRotate;