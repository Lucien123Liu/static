/* 整场樱花雨为你而下 */

let stop;
let begin;
let canvas;
let img = new Image();
img.src = "./images/rose_patal.png";
const patalNums = 150; // 花瓣数量
// img.src = "./images/sakura.png";
const imgPosition = [
  {
    x: 107,
    y: 201,
    width: 42,
    height: 42,
  },
  {
    x: 474,
    y: 153,
    width: 30,
    height: 50,
  },
  {
    x: 11,
    y: 542,
    width: 57,
    height: 34,
  },
]

/* Sakura 类 实例化一个sakura对象 开始 */
function Sakura(x, y, s, r, fn, imgObj) {
  this.x = x; // x轴坐标
  this.y = y; // y轴坐标
  this.s = s; // sakura大小
  this.r = r; // sakura旋转角度
  this.fn = fn; // sakura随机函数
  this.imgPosition = imgPosition[getRandom('imgobj')]
}
Sakura.prototype.draw = function (cxt) {
  cxt.save();
  let xc = (40 * this.s) / 4;
  cxt.translate(this.x, this.y);
  cxt.rotate(this.r);
  // cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
  cxt.drawImage(img, ...Object.values(this.imgPosition), 0, 0, 40 * this.s, 40 * this.s);
  cxt.restore();
};
Sakura.prototype.update = function () {
  this.x = this.fn.x(this.x, this.y);
  this.y = this.fn.y(this.y, this.y);
  this.r = this.fn.r(this.r);
  if (
    // 判断是否超出边界
    this.x > window.innerWidth ||
    this.x < 0 ||
    this.y > window.innerHeight ||
    this.y < 0
  ) {
    // 如果超出边界 则重新生成随机坐标
    this.r = getRandom("fnr");
    if (Math.random() > 0.4) {
      // 如果随机值大于0.4 则重新生成x轴随机坐标
      this.x = getRandom("x");
      this.y = 0;
      this.s = getRandom("s");
      this.r = getRandom("r");
    } else {
      // 如果随机值小于0.4 则重新生成y轴随机坐标
      this.x = window.innerWidth;
      this.y = getRandom("y");
      this.s = getRandom("s");
      this.r = getRandom("r");
    }
  }
};
/* Sakura 类 实例化一个sakura对象 结束 */

/* SakuraList 类 实例化一个sakuraList对象 开始 */
SakuraList = function () {
  this.list = [];
};
SakuraList.prototype.push = function (sakura) {
  this.list.push(sakura);
};
SakuraList.prototype.update = function () {
  const list = this.list.slice();
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].update();
  }
};
SakuraList.prototype.draw = function (cxt) {
  const list = this.list.slice();
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].draw(cxt);
  }
};
SakuraList.prototype.get = function (i) {
  return this.list[i];
};
SakuraList.prototype.size = function () {
  return this.list.length;
};
/* SakuraList 类 实例化一个sakuraList对象 结束 */

function getRandom(option) {
  let ret, random;
  switch (option) {
    case "x":
      // x轴随机坐标
      ret = Math.random() * window.innerWidth;
      break;
    case "y":
      // y轴随机坐标
      ret = Math.random() * window.innerHeight;
      break;
    case "s":
      // sakura大小
      ret = Math.random();
      break;
    case "r":
      // sakura旋转角度
      ret = Math.random() * 6;
      break;
    case "fnx":
      // x轴随机函数
      random = -0.5 + Math.random() * 1;
      ret = function (x, y) {
        return x + 0.5 * random - 1.7;
      };
      break;
    case "fny":
      // y轴随机函数
      random = 1.5 + Math.random() * 0.7;
      ret = function (x, y) {
        return y + random;
      };
      break;
    case "fnr":
      // r轴随机函数
      random = Math.random() * 0.03;
      ret = function (r) {
        return r + random;
      };
      break;
    case "imgobj":
      ret = Math.floor(Math.random() * imgPosition.length);
      break;
  }
  return ret;
}

function startSakura() {
  //兼容性 不同浏览器的动画控制函数 告诉浏览器希望执行动画
  let requestAnimationFrame =
    window.requestAnimationFrame || //chrome
    window.mozRequestAnimationFrame || // Firefox
    window.webkitRequestAnimationFrame || // Chrome
    window.msRequestAnimationFrame || // IE
    window.oRequestAnimationFrame; // Opera

  // 定义canvas画布
  canvas = document.createElement("canvas")
  let cxt;

  // 初始化canvas画布
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.setAttribute(
    "style",
    "position: fixed;left: 0;top: 0;pointer-events: none;"
  );
  canvas.style.background = 'linear-gradient(213deg, #ffdfea, transparent)';
  canvas.setAttribute("id", "canvas_sakura");
  document.getElementsByTagName("body")[0].appendChild(canvas);

  // 获取canvas画布上下文 提供在画布上绘图的方法和属性
  cxt = canvas.getContext("2d");

  let sakuraList = new SakuraList();
  for (let i = 0; i < patalNums; i++) {
    let sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
    randomX = getRandom("x");
    randomY = getRandom("y");
    randomR = getRandom("r");
    randomS = getRandom("s");
    randomFnx = getRandom("fnx");
    randomFny = getRandom("fny");
    randomFnR = getRandom("fnr");
    sakura = new Sakura(randomX, randomY, randomS, randomR, {
      x: randomFnx,
      y: randomFny,
      r: randomFnR,
    });
    sakuraList.push(sakura);
  }
  begin = function() {
    return requestAnimationFrame(function () {
      cxt.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
      sakuraList.update(); // 更新
      sakuraList.draw(cxt); // 绘制
      stop = requestAnimationFrame(arguments.callee); // 递归重绘
    })
  }
  stop = begin();
}
window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

img.onload = function () {
  startSakura();
};
