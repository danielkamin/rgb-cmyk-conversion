var RGB = /** @class */ (function () {
    function RGB(initialR, initialG, initialB) {
        this.R = initialR;
        this.G = initialG;
        this.B = initialB;
    }
    RGB.prototype.setNewValues = function (newR, newG, newB) {
        this.R = newR;
        this.G = newG;
        this.B = newB;
    };
    RGB.prototype.convertFromCMYK = function (C, M, Y, K) {
        console.log(C, M, Y, K);
        this.R = 255 * (1 - C) * (1 - K);
        this.G = 255 * (1 - M) * (1 - K);
        this.B = 255 * (1 - Y) * (1 - K);
    };
    RGB.prototype.updateInputs = function () {
        Rgbnumbers[0].value = this.R.toFixed(0).toString();
        Rgbsliders[0].value = this.R.toFixed(0).toString();
        Rgbnumbers[1].value = this.G.toFixed(0).toString();
        Rgbsliders[1].value = this.G.toFixed(0).toString();
        Rgbnumbers[2].value = this.B.toFixed(0).toString();
        Rgbsliders[2].value = this.B.toFixed(0).toString();
    };
    return RGB;
}());
var CMYK = /** @class */ (function () {
    function CMYK(initialC, initialM, initialY, initialK) {
        this.C = initialC;
        this.M = initialM;
        this.Y = initialY;
        this.K = initialK;
    }
    CMYK.prototype.setNewValues = function (newC, newM, newY, newK) {
        this.C = newC;
        this.M = newM;
        this.Y = newY;
        this.K = newK;
    };
    CMYK.prototype.convertFromRGB = function (R, G, B) {
        console.log(R, G, B);
        var k = 1 - Math.max(R, G, B);
        console.log(k);
        var c, m, y;
        if (k !== 1) {
            c = (1 - R - k) / (1 - k);
            m = (1 - G - k) / (1 - k);
            y = (1 - B - k) / (1 - k);
            this.setNewValues(c, m, y, k);
        }
        else {
            c = (1 - R - k);
            m = (1 - G - k);
            y = (1 - B - k);
            this.setNewValues(c, m, y, k);
        }
    };
    CMYK.prototype.updateInputs = function () {
        Cmyksliders[0].value = (this.C * 100).toFixed(0).toString();
        Cmyksliders[1].value = (this.M * 100).toFixed(0).toString();
        Cmyksliders[2].value = (this.Y * 100).toFixed(0).toString();
        Cmyksliders[3].value = (this.K * 100).toFixed(0).toString();
        Cmyknumbers[0].value = (this.C * 100).toFixed(0).toString();
        Cmyknumbers[1].value = (this.M * 100).toFixed(0).toString();
        Cmyknumbers[2].value = (this.Y * 100).toFixed(0).toString();
        Cmyknumbers[3].value = (this.K * 100).toFixed(0).toString();
    };
    return CMYK;
}());
var RGBObject = new RGB(0, 0, 0);
var CMYKObject = new CMYK(0, 0, 0, 1);
var canvas = document.querySelector('#color');
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
var Rgbsliders = document.querySelectorAll('.RGBslider');
var Rgbnumbers = document.querySelectorAll('.RGBnumber');
var Cmyksliders = document.querySelectorAll('.CMYKslider');
var Cmyknumbers = document.querySelectorAll('.CMYKnumber');
function changeRGBValue() {
    var index = this.getAttribute("index");
    var value = +this.value;
    Rgbnumbers[+index].value = value.toString();
    Rgbsliders[+index].value = value.toString();
    RGBObject.setNewValues(+Rgbsliders[0].value, +Rgbsliders[1].value, +Rgbsliders[2].value);
    CMYKObject.convertFromRGB(RGBObject.R / 255, RGBObject.G / 255, RGBObject.B / 255);
    CMYKObject.updateInputs();
    paintCanvas();
}
function changeCMYKValue() {
    var index = this.getAttribute("index");
    var value = +this.value;
    Cmyksliders[+index].value = value.toString();
    Cmyknumbers[+index].value = value.toString();
    CMYKObject.setNewValues(+Cmyksliders[0].value / 100, +Cmyksliders[1].value / 100, +Cmyksliders[2].value / 100, +Cmyksliders[3].value / 100);
    RGBObject.convertFromCMYK(CMYKObject.C, CMYKObject.M, CMYKObject.Y, CMYKObject.K);
    RGBObject.updateInputs();
    paintCanvas();
}
var paintCanvas = function () {
    ctx.fillStyle = "rgb(" + RGBObject.R + "," + RGBObject.G + "," + RGBObject.B + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
Rgbsliders.forEach(function (elem, index) {
    elem.addEventListener("input", changeRGBValue);
    elem.setAttribute("index", index.toString());
});
Rgbnumbers.forEach(function (elem, index) {
    elem.addEventListener("change", changeRGBValue);
    elem.setAttribute("index", index.toString());
});
Cmyknumbers.forEach(function (elem, index) {
    elem.addEventListener("change", changeCMYKValue);
    elem.setAttribute("index", index.toString());
});
Cmyksliders.forEach(function (elem, index) {
    elem.addEventListener("input", changeCMYKValue);
    elem.setAttribute("index", index.toString());
});
