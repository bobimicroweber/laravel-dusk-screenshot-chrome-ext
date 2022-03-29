let canvas, img1, imgWidth, element, webUrl, urlTimeGroup, body1 = document.getElementById("target1"), currentvh = 0,
    imgCount = 1, totalWidth = 0, totalHeight = 0, leftOver = 0, finalurl = "", left = 0, selectedTop = 0, width = 0,
    height = 0, emojiPicker = "";
var defaultOptions = {
    format: "image/png",
    quality: .92,
    width: void 0,
    height: void 0,
    Canvas: void 0,
    crossOrigin: void 0
}, mergeImages = function (e, t) {
    return void 0 === e && (e = []), void 0 === t && (t = {}), new Promise(function (a) {
        var n = (t = Object.assign({}, defaultOptions, t)).Canvas ? new t.Canvas : window.document.createElement("canvas"),
            o = t.Image || window.Image, c = e.map(function (e) {
                return new Promise(function (a, n) {
                    "Object" !== e.constructor.name && (e = {src: e});
                    var c = new o;
                    c.crossOrigin = t.crossOrigin, c.onerror = function () {
                        return n(new Error("Couldn't load image"))
                    }, c.onload = function () {
                        return a(Object.assign({}, e, {img: c}))
                    }, c.src = e.src
                })
            }), i = n.getContext("2d");
        a(Promise.all(c).then(function (e) {
            var a = function (a) {
                return t[a] || Math.max.apply(Math, e.map(function (e) {
                    return e.img[a]
                }))
            };
            n.width = a("width");
            let o = a("height") / e[0].vh;
            return e[0].lastFrameHeight ? n.height = imgCount * a("height") - (a("height") - e[0].lastFrameHeight * o) : n.height = imgCount * a("height"), totalWidth = a("width"), e.forEach(function (e, t, n) {
                return i.globalAlpha = e.opacity ? e.opacity : 1, e.lastFrame ? i.drawImage(e.img, e.x, a("height") - e.lastFrameHeight * o, totalWidth, e.lastFrameHeight * o, 0, t * a("height"), totalWidth, e.lastFrameHeight * o) : i.drawImage(e.img, e.x || 0, t * a("height") || 0)
            }), t.Canvas && "image/jpeg" === t.format ? new Promise(function (e, a) {
                n.toDataURL(t.format, {quality: t.quality, progressive: !1}, function (t, n) {
                    t ? a(t) : e(n)
                })
            }) : n.toDataURL(t.format, t.quality)
        }))
    })
};

function setScreenshotUrl(e, t, a, n, o, c = "none") {
    imgCount = e.length;
    let i, s = [];
    leftOver = 0, e.forEach((t, c) => {
        i = {
            src: t,
            x: 0,
            y: currentvh,
            leftOver: n,
            lastFrame: !1,
            lastFrameHeight: o,
            vh: a
        }, c === e.length - 1 && 0 != c && (i.lastFrame = !0), s.push(i), currentvh += a
    }), mergeImages(s).then(e => {
        finalurl = e, n && (body1.style.width = `${n}px`, body1.style.height = `${a}px`), body1.src = e, webUrl = t, "none" === c && (document.querySelector(".container-center").style.width = "90%", body1.style.width = "100%")
    })
}

const fetchFunction = e => {
    fetch(`https://ssbackend.goscreenshotting.com/api/${e}`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(e => e.json()).then(e => {
    })
}, setBackgroundImage = (e, t) => {
    fabric.Image.fromURL(body1.src, function (e) {
        t.setDimensions({
            width: e.width,
            height: e.height
        }), document.querySelector(".canvas-container").style.width = "100%", document.querySelector(".container-center").style.background = "#dfdfdf", img1 = e.set({
            left: 0,
            top: 0,
            id: "backgroundimg",
            selectable: !1,
            evented: !1
        }), t.add(img1), imgWidth = img1.width, t.setZoom(.8), t.setWidth(img1.width * t.getZoom()), t.setHeight(img1.height * t.getZoom()), t.renderAll()
    })
};

function downloadPdf(e = body1.src) {
    const t = new Image;
    t.src = e;
    let a = .5, n = 589, o = 835, c = "p";
    t.onload = function () {
        t.width * a > n - 40 && (c = "l", o = 589, a = ((n = 835) - 40) / t.width);
        var e = document.createElement("canvas");
        const i = new jsPDF(c, "pt");
        for (var s = 0; s < t.height;) {
            0 !== s && i.addPage();
            const n = e.getContext("2d");
            e.width = t.width, e.height = (o - 20) / a, n.rect(0, 0, e.width, e.height), n.fillStyle = "white", n.fill(), n.drawImage(t, 0, s, t.width, t.height - s, 0, 0, t.width, t.height - s);
            const c = e.toDataURL("image/jpeg", 1);
            i.addImage(c, "JPEG", 10, 10, e.width * a, e.height * a), s += e.height
        }
        chrome.downloads.download({url: i.output("datauristring"), filename: Date.now() + ".pdf", saveAs: !0})
    }
}

function downloadImg(e = body1.src) {
    chrome.downloads.download({url: e, filename: "screenshot.png", saveAs: !0})
}

function editFunc() {
    body1.style.display = "none", document.getElementById("canvas").style.display = "unset", canvas = initCanvas("canvas"), setBackgroundImage(body1, canvas), canvas.preserveObjectStacking = !0, document.getElementById("downloadEditedImage").style.display = "unset", document.getElementById("copyEditedImage").style.display = "unset", document.getElementById("downloadEditedpdf").style.display = "unset", document.getElementById("downloadButtonImg").style.display = "none", document.getElementById("downloadButtonPdf").style.display = "none", document.getElementById("editButton").style.display = "none", document.querySelector(".container-left").style.display = "flex", document.querySelector(".container-right").style.display = "unset", document.querySelector(".header-center").style.display = "flex", document.querySelector(".container-center").style.height = "87vh", document.querySelector(".container-center").style.width = "74%", element = document.querySelector(".container-center"), fetchFunction("edit"), emojiPicker = new FgEmojiPicker({
        trigger: ["#emoji"],
        removeOnSelection: !1,
        closeButton: !0,
        position: ["bottom"],
        preFetch: !0,
        emit(e, t) {
            removeFunction(), !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0), canvas.add(new fabric.Text(e.emoji, {
                left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 15 : 300,
                top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 15 : 200
            }))
        }
    })
}

document.addEventListener("contextmenu", e => {
    e.preventDefault()
}, !1), document.getElementById("circleCrop") && document.getElementById("circleCrop").addEventListener("click", () => {
    var e, t, a, n, o;
    canvas.defaultCursor = "crosshair", canvas.hoverCursor = "crosshair", Object.keys(canvas.__eventListeners).forEach(e => {
        "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
    }), canvas.on("mouse:down", function (o) {
        t = !0;
        var c = canvas.getPointer(o.e);
        a = c.x, n = c.y, e = new fabric.Circle({
            id: "crop",
            left: a,
            top: n,
            radius: c.x - a,
            angle: 0,
            fill: "",
            stroke: "red",
            strokeWidth: 3,
            selectable: !1,
            evented: !1,
            absolutePositioned: !0,
            hoverCursor: "pointer"
        }), canvas.add(e)
    }), canvas.on("mouse:move", function (c) {
        if (canvas.selection = !1, t) {
            var i = canvas.getPointer(c.e);
            (o = Math.max(Math.abs(n - i.y), Math.abs(a - i.x)) / 2) > e.strokeWidth && (o -= e.strokeWidth / 2), e.set({radius: o}), canvas.renderAll()
        }
    }), canvas.on("mouse:up", function (a) {
        t = !1, canvas.defaultCursor = "default", canvas.hoverCursor = "default", canvas.clipPath = new fabric.Circle({
            left: e.left,
            top: e.top,
            radius: e.radius,
            absolutePositioned: !0
        }), left = e.left, selectedTop = e.top, width = e.width + 2, height = e.height + 2, canvas.remove(e), canvas.renderAll(), Object.keys(canvas.__eventListeners).forEach(e => {
            "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
        })
    })
}), document.getElementById("rectangleCrop") && document.getElementById("rectangleCrop").addEventListener("click", () => {
    canvas.defaultCursor = "crosshair", canvas.hoverCursor = "crosshair", Object.keys(canvas.__eventListeners).forEach(e => {
        "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
    });
    var e = !1, t = 0, a = 0, n = 0, o = 0;
    canvas.on("mouse:down", function (n) {
        var o = canvas.getPointer(n.e);
        e = !0, t = o.x, a = o.y;
        var c = new fabric.Rect({
            width: 0,
            height: 0,
            left: t,
            top: a,
            fill: "",
            stroke: "red",
            strokeWidth: 3,
            selectable: !1,
            evented: !1,
            absolutePositioned: !0,
            hoverCursor: "pointer"
        });
        canvas.add(c), canvas.renderAll(), canvas.setActiveObject(c)
    }), canvas.on("mouse:move", function (c) {
        if (!e) return !1;
        var i = canvas.getPointer(c.e);
        if (n = Math.abs(i.x - t), o = Math.abs(i.y - a), !n || !o) return !1;
        canvas.getActiveObject().set("width", n).set("height", o), canvas.renderAll()
    }), canvas.on("mouse:up", function (c) {
        e && (e = !1);
        var i = canvas.getActiveObject();
        canvas.defaultCursor = "default", canvas.hoverCursor = "default", canvas.clipPath = new fabric.Rect({
            left: t,
            top: a,
            width: n,
            height: o,
            absolutePositioned: !0
        }), left = t, selectedTop = a, width = n, height = o, canvas.remove(i), canvas.renderAll(), Object.keys(canvas.__eventListeners).forEach(e => {
            "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
        })
    })
}), document.getElementById("diamondCrop") && document.getElementById("diamondCrop").addEventListener("click", () => {
    canvas.defaultCursor = "crosshair", canvas.hoverCursor = "crosshair", Object.keys(canvas.__eventListeners).forEach(e => {
        "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
    });
    var e = !1, t = 0, a = 0, n = 0, o = 0;
    canvas.on("mouse:down", function (n) {
        var o = canvas.getPointer(n.e);
        e = !0, t = o.x, a = o.y;
        var c = new fabric.Rect({
            width: 0,
            height: 0,
            left: t,
            top: a,
            fill: "",
            stroke: "red",
            strokeWidth: 3,
            selectable: !1,
            evented: !1,
            absolutePositioned: !0,
            hoverCursor: "pointer",
            angle: 45
        });
        canvas.add(c), canvas.renderAll(), canvas.setActiveObject(c)
    }), canvas.on("mouse:move", function (c) {
        if (!e) return !1;
        var i = canvas.getPointer(c.e);
        if (n = Math.abs(i.x - t), o = Math.abs(i.y - a), !n || !o) return !1;
        canvas.getActiveObject().set("width", n).set("height", n), canvas.renderAll()
    }), canvas.on("mouse:up", function (o) {
        e && (e = !1);
        var c = canvas.getActiveObject();
        canvas.defaultCursor = "default", canvas.hoverCursor = "default", canvas.clipPath = new fabric.Rect({
            left: t,
            top: a,
            width: n,
            height: n,
            angle: 45,
            absolutePositioned: !0
        }), canvas.remove(c), canvas.renderAll(), Object.keys(canvas.__eventListeners).forEach(e => {
            "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
        })
    })
}), document.getElementById("triangleCrop") && document.getElementById("triangleCrop").addEventListener("click", () => {
    canvas.defaultCursor = "crosshair", canvas.hoverCursor = "crosshair", Object.keys(canvas.__eventListeners).forEach(e => {
        "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
    });
    var e = !1, t = 0, a = 0, n = 0, o = 0;
    canvas.on("mouse:down", function (n) {
        var o = canvas.getPointer(n.e);
        e = !0, t = o.x, a = o.y;
        var c = new fabric.Triangle({
            width: 0,
            height: 0,
            left: t,
            top: a,
            fill: "",
            stroke: "red",
            strokeWidth: 3,
            selectable: !1,
            evented: !1,
            absolutePositioned: !0,
            hoverCursor: "pointer"
        });
        canvas.add(c), canvas.renderAll(), canvas.setActiveObject(c)
    }), canvas.on("mouse:move", function (c) {
        if (!e) return !1;
        var i = canvas.getPointer(c.e);
        if (n = Math.abs(i.x - t), o = Math.abs(i.y - a), !n || !o) return !1;
        canvas.getActiveObject().set("width", n).set("height", o), canvas.renderAll()
    }), canvas.on("mouse:up", function (c) {
        e && (e = !1);
        var i = canvas.getActiveObject();
        canvas.defaultCursor = "default", canvas.hoverCursor = "default", canvas.clipPath = new fabric.Triangle({
            left: t,
            top: a,
            width: n,
            height: o,
            absolutePositioned: !0
        }), left = i.left, selectedTop = i.top, width = i.width + 2, height = i.height + 5, canvas.remove(i), canvas.renderAll(), Object.keys(canvas.__eventListeners).forEach(e => {
            "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
        })
    })
});
var el = document.getElementById("downloadButtonImg");
el && el.addEventListener("click", () => {
    downloadImg(body1.src)
});
var pdf = document.getElementById("downloadButtonPdf");
pdf && pdf.addEventListener("click", () => {
    downloadPdf(body1.src)
});
var edit = document.getElementById("editButton");
edit && edit.addEventListener("click", editFunc);
var editDownloadImg = document.getElementById("downloadEditedImage");
editDownloadImg && editDownloadImg.addEventListener("click", () => {
    var e;
    if (fetchFunction("downloadEditedImage"), canvas.clipPath) e = 45 == canvas.clipPath.angle ? canvas.toDataURL({
        left: canvas.clipPath.left * canvas.getZoom() - (canvas.clipPath.width + 2) * canvas.getZoom(),
        top: canvas.clipPath.top * canvas.getZoom() - (canvas.clipPath.width + 2) * canvas.getZoom() / 4,
        width: (canvas.clipPath.width + 2) * canvas.getZoom() + (canvas.clipPath.width + 2) * canvas.getZoom(),
        height: (canvas.clipPath.height + 2) * canvas.getZoom() + (canvas.clipPath.width + 2) * canvas.getZoom()
    }) : canvas.toDataURL({
        left: canvas.clipPath.left * canvas.getZoom(),
        top: canvas.clipPath.top * canvas.getZoom(),
        width: (canvas.clipPath.width + 2) * canvas.getZoom(),
        height: (canvas.clipPath.height + 2) * canvas.getZoom()
    }); else {
        let t = canvas.getZoom();
        canvas.setZoom(1), canvas.setWidth(img1.width * canvas.getZoom()), canvas.setHeight(img1.height * canvas.getZoom()), e = canvas.toDataURL(), canvas.setZoom(t), canvas.setWidth(img1.width * canvas.getZoom()), canvas.setHeight(img1.height * canvas.getZoom())
    }
    downloadImg(e)
});
var editDownloadPdf = document.getElementById("downloadEditedpdf");
editDownloadPdf && editDownloadPdf.addEventListener("click", () => {
    var e;
    if (fetchFunction("downloadEditedPdf"), canvas.clipPath) e = canvas.toDataURL({
        left: canvas.clipPath.left * canvas.getZoom(),
        top: canvas.clipPath.top * canvas.getZoom(),
        width: (canvas.clipPath.width + 2) * canvas.getZoom(),
        height: (canvas.clipPath.height + 2) * canvas.getZoom()
    }); else {
        let t = canvas.getZoom();
        canvas.setZoom(1), canvas.setWidth(img1.width * canvas.getZoom()), canvas.setHeight(img1.height * canvas.getZoom()), e = canvas.toDataURL(), canvas.setZoom(t), canvas.setWidth(img1.width * canvas.getZoom()), canvas.setHeight(img1.height * canvas.getZoom())
    }
    downloadPdf(e)
});
var copyEdited = document.getElementById("copyEditedImage");
copyEdited && copyEdited.addEventListener("click", () => {
    canvas.getElement().toBlob(function (e) {
        navigator.clipboard.write([new ClipboardItem({"image/png": e})])
    }), swal("Copied!", "You can paste it anywhere!", "success")
});
let urlCheckBox = document.getElementById("urlTime");
urlCheckBox && urlCheckBox.addEventListener("change", function () {
    if (this.checked) {
        var e = canvas.getObjects().map(function (e) {
            return e.set("active", !0)
        }), t = new fabric.Group(e, {left: 0, top: 30, originX: "left", originY: "top"});
        canvas.offHistory(), setTimeout(() => {
            canvas.add(t), canvas.setActiveObject(t);
            var e = canvas.getActiveObject();
            if ("group" == e.type) {
                e._objects;
                e._restoreObjectsState(), canvas.remove(e), canvas.renderAll()
            }
            canvas.onHistory()
        }, 1e3);
        var a, n = new fabric.Rect({width: imgWidth, height: 30, fill: "black", stroke: "", strokeWidth: 3}),
            o = (a = new Date).getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate(),
            c = (a = new Date).getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
        webUrl = webUrl + " / " + o + " / " + c;
        e = [n, new fabric.Text(webUrl, {fontFamily: "Delicious_500", fill: "white", fontSize: 18, top: 5, left: 10})];
        var i = new fabric.Group(e, {left: 0, top: 0, id: "urlTimeGroup"});
        canvas.add(i)
    } else {
        let e = !1, t = canvas.getObjects();
        t.forEach(function (t, a) {
            "urlTimeGroup" == t.id && (canvas.remove(t), e = !0)
        }), e || t.forEach(function (e, t) {
            "group" == e.type && 2 === e._objects.length && "rect" == e._objects[0].type && "black" == e._objects[0].fill && "text" == e._objects[1].type && "Delicious_500" == e._objects[1].fontFamily && canvas.remove(e)
        }), canvas.offHistory(), setTimeout(() => {
            var e = canvas.getObjects().map(function (e) {
                return e.set("active", !0)
            }), t = new fabric.Group(e, {left: 0, top: 0});
            canvas.add(t), canvas.setActiveObject(t);
            var a = canvas.getActiveObject();
            if ("group" == a.type) {
                a._objects;
                a._restoreObjectsState(), canvas.remove(a), canvas.renderAll()
            }
            canvas.onHistory()
        }, 500)
    }
});
var submitButton = document.getElementById("submitButton");
submitButton && submitButton.addEventListener("click", e => {
    if (document.getElementById("suggestionInput").value) return e.preventDefault(), fetch("https://ssbackend.goscreenshotting.com/api/suggestions", {
        method: "POST",
        body: JSON.stringify({suggestion: document.getElementById("suggestionInput").value}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(e => e.json()).then(e => {
        alert("Thanks for your suggestion"), document.getElementById("suggestionInput").value = ""
    }), !1;
    alert("Please enter the suggestion")
});
const initCanvas = e => new fabric.Canvas(e, {selection: !1});

function removeFunction() {
    canvas && (Object.keys(canvas.__eventListeners).forEach(e => {
        "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
    }), canvas.defaultCursor = "default", canvas.hoverCursor = "default")
}

document.querySelector(".add-text") && document.querySelector(".add-text").addEventListener("click", () => {
    removeFunction(), !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0), canvas.add(new fabric.Text(document.querySelector(".input-text").value, {
        fontFamily: "Delicious_500",
        left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 10 : 100,
        top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 10 : 100
    }))
}), document.getElementById("file") && document.getElementById("file").addEventListener("change", function (e) {
    var t = new FileReader;
    t.onload = function (e) {
        var t = new Image;
        t.src = e.target.result, t.onload = function () {
            var e = new fabric.Image(t);
            !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0), e.set({
                angle: 0,
                padding: 10,
                cornersize: 10,
                height: t.height,
                width: t.width,
                left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 10 : 200,
                top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 10 : 200
            }), canvas.add(e), canvas.renderAll()
        }
    }, t.readAsDataURL(e.target.files[0])
}), document.querySelector("#circleAdd") && document.querySelector("#circleAdd").addEventListener("click", () => {
    removeFunction(), !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0), canvas.add(new fabric.Circle({
        left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 10 : 200,
        top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 10 : 200,
        radius: 100,
        angle: 0,
        fill: "",
        stroke: "red",
        strokeWidth: 3
    }))
}), document.querySelector("#rectangleAdd") && document.querySelector("#rectangleAdd").addEventListener("click", () => {
    removeFunction(), !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0), canvas.add(new fabric.Rect({
        left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 10 : 100,
        top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 10 : 100,
        fill: "",
        width: 200,
        height: 100,
        stroke: "red",
        strokeWidth: 3
    }))
}), document.querySelector("#triangleAdd") && document.querySelector("#triangleAdd").addEventListener("click", () => {
    removeFunction(), !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0), canvas.add(new fabric.Triangle({
        left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 10 : 100,
        top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 10 : 100,
        fill: "",
        width: 200,
        height: 100,
        stroke: "red",
        strokeWidth: 3
    }))
}), document.querySelector("#diamondAdd") && document.querySelector("#diamondAdd").addEventListener("click", () => {
    removeFunction(), !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0), canvas.add(new fabric.Rect({
        left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 10 : 100,
        top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 10 : 100,
        fill: "",
        width: 100,
        height: 100,
        stroke: "red",
        strokeWidth: 3,
        angle: 45
    }))
}), document.querySelector("#arrowAdd") && document.querySelector("#arrowAdd").addEventListener("click", () => {
    removeFunction(), !canvas.clipPath && document.querySelector(".container-center").scrollTo(0, 0);
    var e = new fabric.Triangle({
        width: 10,
        height: 15,
        fill: "red",
        left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 170 : 235,
        top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 15 : 65,
        angle: 90,
        strokeWidth: 3
    }), t = [new fabric.Line([50, 100, 200, 100], {
        left: canvas.clipPath ? canvas.clipPath.left * canvas.getZoom() + 10 : 75,
        top: canvas.clipPath ? canvas.clipPath.top * canvas.getZoom() + 20 : 70,
        stroke: "red",
        strokeWidth: 3
    }), e], a = new fabric.Group(t);
    canvas.add(a)
}), document.querySelector(".delete-button") && document.querySelector(".delete-button").addEventListener("click", e => {
    removeFunction(), canvas.remove(canvas.getActiveObject())
});
const urlCheckboxFunc = () => {
    let e = canvas.getObjects(), t = !1;
    e.forEach(function (e, a) {
        if ("group" == e.type && 2 === e._objects.length && "rect" == e._objects[0].type && "black" == e._objects[0].fill && "text" == e._objects[1].type && "Delicious_500" == e._objects[1].fontFamily) {
            let e = document.getElementById("urlTime");
            e && (e.checked = !0, t = !0)
        }
    }), t || (urlTime.checked = !1)
};
var undo = document.getElementById("undo");
undo && undo.addEventListener("click", () => {
    canvas.undo(function (e) {
        JSON.parse(e);
        Object.keys(canvas.__eventListeners).forEach(e => {
            "mouse:up" !== e && "mouse:down" !== e && "mouse:move" !== e || delete canvas.__eventListeners[e]
        }), "u" === e[e.length - 5] && '" ' === e[e.length - 5] || (canvas.clipPath = null), setTimeout(() => {
            urlCheckboxFunc()
        }, 500)
    })
});
var redo = document.getElementById("redo");
redo && (removeFunction(), redo.addEventListener("click", () => {
    canvas.redo(), setTimeout(() => {
        urlCheckboxFunc()
    }, 500)
}));
var reset = document.getElementById("reset");
reset && reset.addEventListener("click", () => {
    removeFunction(), canvas.clear(), setBackgroundImage(body1, canvas)
});
var filpFlop = document.getElementById("filpFlop");
filpFlop && filpFlop.addEventListener("click", () => {
    removeFunction();
    new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2), fabric.util.degreesToRadians(90);
    canvas.getObjects().forEach(e => {
        "backgroundimg" != e.id && "image" != e.type || e.rotate(e.angle + 180)
    }), canvas.fire("object:modified"), canvas.renderAll()
}), document.querySelector("#rotateRight") && document.querySelector("#rotateRight").addEventListener("click", e => {
    canvas.getObjects().forEach(e => {
        "backgroundimg" != e.id && "image" != e.type || e.rotate(e.angle + 90)
    }), canvas.fire("object:modified"), canvas.renderAll()
}), document.querySelector("#favcolor") && document.querySelector("#favcolor").addEventListener("input", function (e) {
    this.value.includes("#") && (removeFunction(), canvas.getActiveObject() && canvas.getActiveObject().set("fill", this.value), canvas.freeDrawingBrush.color = this.value, canvas.requestRenderAll(), canvas.fire("object:modified"))
}), document.querySelector("#outlinecolor") && document.querySelector("#outlinecolor").addEventListener("input", function (e) {
    this.value.includes("#") && (removeFunction(), canvas.getActiveObject() && canvas.getActiveObject().set("stroke", this.value), canvas.freeDrawingBrush.color = this.value, canvas.requestRenderAll(), canvas.fire("object:modified"))
}), document.querySelector("#opacity") && document.querySelector("#opacity").addEventListener("input", function (e) {
    removeFunction(), canvas.getActiveObject().set("opacity", this.value / 100), canvas.requestRenderAll(), canvas.fire("object:modified")
});
let freedraw = !1;
document.querySelector("#freedraw") && document.querySelector("#freedraw").addEventListener("click", () => {
    removeFunction(), 0 == freedraw ? (canvas.freeDrawingCursor = "url(https://i.stack.imgur.com/fp7eL.png) 4 64, auto", document.querySelector("#freedraw").style.border = "solid white", freedraw = !0, canvas.isDrawingMode = !0, canvas.freeDrawingBrush.width = 5, canvas.freeDrawingBrush.color = document.querySelector("#favcolor").value) : (document.querySelector("#freedraw").style.border = "none", freedraw = !1, canvas.isDrawingMode = !1, canvas.freeDrawingBrush.width = 5, canvas.freeDrawingBrush.color = document.querySelector("#favcolor").value)
});
let zoom = 1;
document.querySelector(".zoomin") && document.querySelector(".zoomin").addEventListener("click", () => {
    removeFunction(), zoom < 2 && (zoom = canvas.getZoom() + .1, canvas.setZoom(zoom), canvas.setWidth(img1.width * canvas.getZoom()), canvas.setHeight(img1.height * canvas.getZoom()), canvas.renderAll())
}), document.querySelector(".zoomout") && document.querySelector(".zoomout").addEventListener("click", () => {
    removeFunction(), zoom > .2 && (zoom = canvas.getZoom() - .1, canvas.setZoom(zoom), canvas.setWidth(img1.width * canvas.getZoom()), canvas.setHeight(img1.height * canvas.getZoom()))
});
var i, acc = document.getElementsByClassName("accordion-title"),
    downimg = chrome.extension.getURL("../public/SVG/Polygon 10.svg"),
    rightimg = chrome.extension.getURL("../public/SVG/Polygon 30.svg");
for (i = 0; i < acc.length; i++) acc[i].addEventListener("click", function (e, t) {
    this.parentElement.classList.toggle("active"), this.parentElement.classList.contains("active") ? this.parentElement.getElementsByClassName("accordion-img")[0].src = downimg : (this.parentElement.getElementsByClassName("accordion-img")[0].src = rightimg, this.parentElement.classList.contains("emojis") && setTimeout(() => {
        document.querySelectorAll(".fg-emoji-picker-close-button")[0].click()
    }, 10))
});
let emojiElement = document.getElementById("emoji");

async function hello(e, t) {
    if (!e || e.length <= 0) return;
    webUrl = t;
    let a = await InnerScrollMerge(e);
    body1.src = a, document.querySelector(".container-center").style.width = "90%", body1.style.width = "100%"
}

emojiElement && emojiElement.addEventListener("click", () => {
    if (emojiElement.offsetTop > 300) {
        emojiPicker.variable.position[0] = "right", function e() {
            if (document.querySelector(".fg-emoji-picker")) return document.querySelector(".fg-emoji-picker").style.top = `${emojiElement.offsetTop - 360}px`;
            setTimeout(() => {
                e()
            }, 100)
        }()
    }
}), document.addEventListener("keydown", function (e) {
    "Delete" === e.key && canvas && canvas.getActiveObject() && canvas.remove(canvas.getActiveObject())
});
const InnerScrollMerge = async e => new Promise(async (t, a) => {
    let n = new Image;
    n.src = e[0].url;
    let o;
    await n.decode();
    var c = document.createElement("canvas");
    c.setAttribute("id", "c");
    const i = c.getContext("2d");
    e[0];
    let s = window.innerHeight;
    c.width = window.innerWidth, c.height = s * e.length;
    let r = 0, l = 0, d = 0;
    for (let t = 0; t < e.length; t++) {
        let a = e[t];
        const n = new Image;
        n.crossOrigin = "", n.src = a.url, await n.decode(), a.lastFrame ? d += a.lastFrameHeight : a.offsetHeight < s ? d += a.offsetHeight : (d += n.naturalHeight, n.naturalHeight > l && (l = n.naturalHeight))
    }
    c.height = d + 20;
    for (let t = 0; t < e.length; t++) {
        let a = e[t];
        const n = new Image;
        if (n.crossOrigin = "", n.src = a.url, await n.decode(), a.offsetHeight && a.offsetHeight < s) {
            if (a.lastFrame) {
                i.drawImage(n, 0, n.naturalHeight - a.lastFrameHeight, 1906, a.lastFrameHeight, 0, r, 1906, a.lastFrameHeight), o = c.toDataURL();
                continue
            }
            i.drawImage(n, 0, n.naturalHeight - a.offsetHeight, 1906, a.offsetHeight, 0, r, 1906, a.offsetHeight), r += a.offsetHeight, o = c.toDataURL()
        } else {
            if (a.platform && "facebook" == a.platform && a.lastFrame) break;
            a.lastFrame ? (i.drawImage(n, 0, r - a.lastFrameHeight), r += n.naturalHeight) : (i.drawImage(n, 0, r), r += n.naturalHeight), o = c.toDataURL()
        }
    }
    t(o)
});