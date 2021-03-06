let idsub, SCREENSHOTS = [], ID = 100, targetId = null, currentUrl = "";

function sleep(e) {
    return new Promise(t => setTimeout(t, e))
}

chrome.runtime.onMessage.addListener(async function (e, t, r) {
    const {
        captureScreen: s,
        takeScreenshot: a,
        lastFrameHeight: n,
        lastFrame: i,
        offsetHeight: o,
        offsetWidth: l,
        platform: c,
        websiteUrl: m
    } = e;
    if (s) {
        let e = {
            url: await (async () => new Promise((e, t) => {
                chrome.tabs.captureVisibleTab(null, {format: "png"}, t => {
                    e(t)
                })
            }))(), lastFrame: i, lastFrameHeight: n, offsetHeight: o, offsetWidth: l, platform: c
        };
        SCREENSHOTS.push(e), r({lastFrame: i})
    }
    if (a) {
        const e = chrome.extension.getURL("../public/samp.html?id=" + ID++);
        currentUrl = "/public/samp.html?id=" + (idsub = ID - 1), chrome.tabs.onUpdated.addListener(function e(t, r) {
            if (t != targetId || "complete" != r.status) return;
            chrome.tabs.onUpdated.removeListener(e);
            const s = chrome.extension.getViews();
            for (let e = 0; e < s.length; e++) {
                let t = s[e];
                if (t.location.href.includes(currentUrl)) {
                    t.hello(SCREENSHOTS, m), SCREENSHOTS = [];
                    break
                }
            }
        }), chrome.tabs.create({url: e}, e => {
            targetId = e.id
        })
    }
});