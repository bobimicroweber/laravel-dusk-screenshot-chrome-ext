var webpageHeight = $(document).height(),
    getBodyBackground = () => window.getComputedStyle(document.body).getPropertyValue("background-color"),
    ytApp = document.getElementsByTagName("ytd-app") && document.getElementsByTagName("ytd-app")[0];

function getHeightestElement() {
    const e = function (e) {
        let t = window.getComputedStyle(e)["overflow-y"];
        return ("scroll" === t || "auto" === t) && e.scrollHeight > e.clientHeight
    };
    let t = document.body.getElementsByTagName("*"), i = document.getElementsByTagName("body")[0],
        n = document.body.scrollHeight > window.innerHeight ? i : null;
    for (let i = 0; i < t.length; i++) {
        let l = t[i];
        if (l.scrollHeight > l.clientHeight && e(l)) {
            if (!n) {
                n = l;
                continue
            }
            l.scrollHeight > n.scrollHeight && (n = l)
        }
    }
    return n || i
}

var getFixedStickyElements = () => {
    return $("*").filter(function () {
        return $(this).css("position").toLowerCase().indexOf("fixed") > -1
    })
}, getStickyElements = () => {
    return $("*").filter(function () {
        return $(this).css("position").toLowerCase().indexOf("sticky") > -1
    })
}, getStickyAndFixedElements = () => {
    return $("*").filter(function () {
        return $(this).css("position").toLowerCase().indexOf("fixed") > -1 || $(this).css("position").toLowerCase().indexOf("sticky") > -1
    })
}, isInViewport = e => {
    const t = e.getBoundingClientRect();
    return t.y > 0 && t.y < window.innerHeight && t.y < e.clientHeight || t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
};

function sleep(e) {
    return new Promise(t => setTimeout(t, e))
}

var scrollView = async e => new Promise((e, t) => {
    window.innerHeight;
    window.scrollBy(0, 100), e()
}), capture = async (e = !1, t = 0, i = 948, n = 1905, l) => new Promise((o, s) => {
    chrome.runtime.sendMessage({
        captureScreen: !0,
        lastFrame: e,
        lastFrameHeight: t,
        offsetHeight: i,
        offsetWidth: n,
        platform: l
    }, function (e) {
        o()
    })
}), checkedElements = [], checkForFixedElements = async () => new Promise((e, t) => {
    let i = getFixedStickyElements() || [];
    for (let e = 0; e < i.length; e++) {
        let t = i[e];
        if (t == document.body) continue;
        let n = t.getAttribute("class") && t.getAttribute("class").split(" ").join(".") ? "." + t.getAttribute("class").split(" ").join(".") : null,
            l = t.getAttribute("id") && t.getAttribute("id") ? "#" + t.getAttribute("id") : null;
        checkedElements.includes(t) || isInViewport(t) && (l ? (l = l.split("#")[1], document.getElementById(l).style.position = "absolute", checkedElements.push(t)) : n && (n = n.split(".")[1], document.getElementsByClassName(n)[0].style.position = "absolute", checkedElements.push(t)))
    }
    e()
}), hideFixed = async () => new Promise((e, t) => {
    let i = getFixedStickyElements() || [];
    for (let e = 0; e < i.length; e++) {
        let t = i[e];
        if (t == document.body) continue;
        t.getAttribute("class") && t.getAttribute("class").split(" ").join(".") && t.getAttribute("class").split(" ").join("."), t.getAttribute("id") && t.getAttribute("id") && t.getAttribute("id");
        checkedElements.includes(t) || isInViewport(t) && (t.style.visibility = "hidden", checkedElements.push(t))
    }
    e()
}), checkForStickyElems = () => new Promise((e, t) => {
    let i = getStickyElements() || [];
    for (let t = 0; t < i.length; t++) {
        let n = i[t],
            l = n.getAttribute("class") && n.getAttribute("class").split(" ").join(".") ? "." + n.getAttribute("class").split(" ").join(".") : null,
            o = n.getAttribute("id") && n.getAttribute("id") ? "#" + n.getAttribute("id") : null;
        checkedElements.includes(n) && e();
        let {top: s} = n.getBoundingClientRect();
        isInViewport(n) && (o ? (document.querySelector(o).style.visibility = "hidden", checkedElements.push(n)) : l && (document.querySelector(l).style.visibility = "hidden", checkedElements.push(n)))
    }
    e()
}), removeAllExceptHeightest = async (e, t) => new Promise((t, i) => {
    e == ytApp && ($("#guide-content").css({
        visibility: "hidden",
        opacity: 0
    }), $("#page-manager").parents().siblings().each(function () {
        $(this).css({visibility: "hidden", opacity: 0})
    }), t()), $(e).parents().siblings().each(function () {
        $(this).css({visibility: "hidden", opacity: 0})
    }), t()
}), checkHeightestPlusFixed = async (e, t) => new Promise((i, n) => {
    let l = {yes: !1, ele: null};
    for (let i = 0; i < e.length; i++) {
        let n = e[i];
        t == n ? l = {yes: !0, ele: t} : t.parentElement == n && (l = {yes: !0, ele: t.parentElement})
    }
    i(l)
}), recalculateFrames = async (e, t, i, n, l) => new Promise((o, s) => {
    let c = Math.ceil(e.scrollHeight / window.innerHeight);
    if (t == c) {
        let e = Math.ceil((i - n) / l);
        0 == !e && (c = c + e - 1)
    }
    o(c)
});

async function main(e) {
    let t, i, n, l, o, s = 0, c = window.innerHeight, r = window.innerWidth, d = 0, a = 1, u = !1,
        g = t == document.body, h = !1, m = document.querySelector("div[role='feed']");
    switch (m && (o = m.childElementCount / 5), e) {
        case"facebook":
            t = document.body, i = c, n = m.scrollHeight, window.scrollBy(0, -2e3);
            break;
        case"youtube":
            i = c, n = (t = document.getElementsByTagName("ytd-app")[0]).scrollHeight, t.scrollBy(0, -t.scrollTop);
            break;
        default:
            i = (t = getHeightestElement()) == document.body ? window.innerHeight : t.offsetHeight, n = t.scrollHeight, t.scrollBy(0, -t.scrollTop)
    }
    d = Math.ceil(t.scrollHeight / c), l = t.getBoundingClientRect();
    let y = Math.abs(n - d * c), f = c, w = r;
    for (document.body.style.overflowX = "hidden", t.style.overflowX = "hidden", document.body.style.overflowY = "hidden", t.style.overflowY = "hidden"; s < n;) {
        if (a >= d || s > 1e4 ? (u = !0, y = n - s) : u = !1, h) switch (e) {
            case"facebook":
                document.querySelector("div[role='banner']").style.visibility = "hidden"
        }
        await sleep(500), await capture(u, y, f, w, g, e), await checkForStickyElems(), t && (t == document.body ? window.scrollBy(0, i) : t == ytApp ? window.scrollBy(0, i) : t.scrollBy(0, i));
        let c = !0;
        switch (e) {
            case"facebook":
                await hideFixed(), a == o && (c = !1), n = m.scrollHeight, f = m.offsetHeight, w = m.offsetWidt;
                break;
            case"youtube":
                n = t.scrollHeight, f = t.offsetHeight, w = t.offsetWidth;
                break;
            default:
                await checkForFixedElements(), n = t.scrollHeight, f = t.offsetHeight, w = t.offsetWidth
        }
        if (!c) break;
        if (a++, (s += i) > 2e4) break;
        if (1 == w) break;
        h = !0, d = await recalculateFrames(t, a, n, s, f), await removeAllExceptHeightest(t, l)
    }
    chrome.runtime.sendMessage({takeScreenshot: !0, websiteUrl: window.location.href}), window.location.reload()
}

chrome.runtime.onMessage.addListener(async function (e, t, i) {
    if ("start" == e.message) {
        let t = null, {url: i} = e;
        i.includes("facebook.com") ? t = "facebook" : i.includes("youtube.com") && (t = "youtube"), await main(t)
    } else e.message
});