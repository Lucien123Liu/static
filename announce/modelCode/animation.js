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
    step: 0,
    instance: null,

};
function openRotate(step, meshObj, {
    goon = true,
    translateNum = 1.5
}) {
    const mesh = meshObj.Mesh || meshObj.Meshs;
    posHelper.translateNum = 0;
    if (posHelper.step === step &&
        posHelper.instance === meshObj
    ) {
        step = 2;
    }
    posHelper.instance = meshObj;
    posHelper.step = step || 0;
    switch (step) {
        case 1:
            posHelper.breathSpeed = 0;
            controlWrapper.tween.one =
                new TWEEN.Tween(posHelper)
                    .to({
                        translateNum,
                        breathSpeed: 6,
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
                        if (goon) {
                            models.LoveStar.Mesh.scale.set(posHelper.breathSpeed, posHelper.breathSpeed, posHelper.breathSpeed);
                        }
                    })
                    .onComplete(() => {
                        console.log('打开盒子完毕，转起来了，请注意！');
                        meshObj.rotate();
                        if (goon) {
                            models.LoveStar.breathSpeed = posHelper.breathSpeed;
                            models.LoveStar.playAndType('beatRotate');
                            // models.THREEMofang &&
                            //     models.THREEMofang.forEach(mofang => mofang.rotate());
                        }
                    })
                    .start();
            break;
        case 2:
            // 关上盒子
            posHelper.translateNum = translateNum;
            posHelper.breathSpeed = 6;
            models.LoveStar.changeAnimateState();
            controlWrapper.tween.one =
                new TWEEN.Tween(posHelper)
                    .to({
                        translateNum: 0,
                        breathSpeed: 0,
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


async function moreMofangOpenRotate(step, instances) {
    switch (step) {
        case 1:
            for (let index = instances.length - 1; index >= 0; index--) {
                const instance = instances[index];
                instance.Meshs.rotateY(index * 45);
                instance.Meshs.rotateZ(index * 45);
                instance.Meshs.rotateX(index * 45);
                await new Promise((resolve) => {
                    openRotate(step, instance, {
                        goon: index === 0,
                        translateNum: 1.5 + (index + 1) * 0.2
                    })
                    setTimeout(() => {
                        resolve();
                    }, 200);
                });
            }
            break;

        default:
            break;
    }
}


window.openUpClose = openUpClose;
window.openRotate = openRotate;
window.moreMofangOpenRotate = moreMofangOpenRotate;