var first = 1, leftOver = 0, ScrollArray = [], weburl = window.location.href;

function changeOverflowContent() {
    [...document.body.getElementsByTagName("*")].filter(e => "scroll" === getComputedStyle(e, null).getPropertyValue("overflow-y") || "scroll !important" === getComputedStyle(e, null).getPropertyValue("overflow-y") || "auto" === getComputedStyle(e, null).getPropertyValue("overflow-y")).forEach(e => {
        "hidden!important" !== getComputedStyle(document.getElementsByTagName("html")[0], null).getPropertyValue("overflow") && "hidden" !== getComputedStyle(document.getElementsByTagName("html")[0], null).getPropertyValue("overflow") || document.getElementsByTagName("html")[0].style.setProperty("overflow", "unset", "important"), "hidden!important" !== getComputedStyle(document.getElementsByTagName("body")[0], null).getPropertyValue("overflow") && "hidden" !== getComputedStyle(document.getElementsByTagName("body")[0], null).getPropertyValue("overflow") || document.getElementsByTagName("body")[0].style.setProperty("overflow", "unset", "important"), "hidden" !== getComputedStyle(document.getElementsByTagName("html")[0], null).getPropertyValue("overflow-y") && "hidden !important" !== getComputedStyle(document.getElementsByTagName("html")[0], null).getPropertyValue("overflow-y") && "hidden!important" !== getComputedStyle(document.getElementsByTagName("html")[0], null).getPropertyValue("overflow-y") || document.getElementsByTagName("html")[0].style.setProperty("overflow-y", "unset", "important"), "hidden" !== getComputedStyle(document.getElementsByTagName("body")[0], null).getPropertyValue("overflow-y") && "hidden !important" !== getComputedStyle(document.getElementsByTagName("body")[0], null).getPropertyValue("overflow-y") && "hidden!important" !== getComputedStyle(document.getElementsByTagName("body")[0], null).getPropertyValue("overflow-y") || document.getElementsByTagName("body")[0].style.setProperty("overflow-y", "scroll", "important");
        let t = e.scrollHeight;
        e.style.setProperty("height", t + "px", "important")
    })
}

function changeFixedElement() {
    let e = [...document.body.getElementsByTagName("*")].filter(e => "fixed" === getComputedStyle(e, null).getPropertyValue("position") || "sticky" === getComputedStyle(e, null).getPropertyValue("position"));
    window.location.href.includes("www.facebook.com") || window.location.href.includes("twitter.com") ? window.location.href.includes("www.facebook.com") ? e.forEach(e => {
        e.style.display = "none"
    }) : window.location.href.includes("twitter.com") && e.forEach(e => {
        e.style.display = "none"
    }) : e.forEach(e => {
        0 == e.offsetTop || 0 == e.offsetBottom ? e.style.display = "none" : e.style.position = "absolute"
    })
}

function hideScrollbar() {
    weburl.includes("www.instagram.com") || (document.querySelector("html").style.overflow = "hidden")
}

function showScroll() {
    weburl.includes("www.instagram.com") || (document.querySelector("html").style.overflow = "unset")
}

function captureVisibleScreen(e) {
    document.querySelector("body").classList.add("mystyle"), setTimeout(() => {
        chrome.runtime.sendMessage({ms: "visible_area", vh: e, websiteUrl: window.location.href}), setInterval(() => {
            document.querySelector("body").classList.remove("mystyle")
        }, 1e3)
    }, 300)
}

function uniqueIdFetch() {
    chrome.storage.sync.get("userid", function (e) {
        var t = e.userid;
        t || (t = getRandomToken(), chrome.storage.sync.set({userid: t}))
    })
}

chrome.runtime.onMessage.addListener(function (e, t, o) {

    let l = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0), n = "";
    document.getElementsByTagName("body")[0];
    var r = document.body;
    html = document.documentElement;
    var i = Math.max(r.scrollHeight, r.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    let s;
    if ("are_you_there_content_script?" === e.text && o({status: "yes"}), "check for frameset?" === e.text && (document.querySelector("frameset") ? o({status: "yes"}) : o({status: "no"})), "newtab" === e.src) {
        if (n = e.vh || l, (i = Math.max(r.scrollHeight, r.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)) == n) return chrome.runtime.sendMessage({
            ms: "full_page",
            capture: "no",
            vh: l,
            leftOver: leftOver,
            websiteUrl: window.location.href
        }), void window.location.reload();
        if (window.scroll({left: 0, top: n, behavior: "smooth"}), 2 == first) setTimeout(() => {
            var e = Math.max(r.scrollHeight, r.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            changeFixedElement(), s = n + l, n < e && n < 2e4 ? e - n > l ? setTimeout(() => {
                chrome.runtime.sendMessage({ms: "full_page", capture: "yes", vh: n + l})
            }, 1e3) : setTimeout(() => {
                chrome.runtime.sendMessage({
                    ms: "full_page",
                    capture: "no",
                    lastFrame: !0,
                    lastFrameHeight: e - n,
                    vh: n + l + 1,
                    leftOver: 0,
                    websiteUrl: window.location.href
                }), window.location.reload()
            }, 1e3) : setTimeout(() => {
                chrome.runtime.sendMessage({
                    ms: "full_page",
                    capture: "no",
                    vh: l,
                    websiteUrl: window.location.href
                }), window.location.reload()
            }, 1e3), first++
        }, 500); else {
            i = Math.max(r.scrollHeight, r.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            s = n + l, n < i && n < 2e4 ? i - n > l ? setTimeout(() => {
                chrome.runtime.sendMessage({ms: "full_page", capture: "yes", vh: n + l})
            }, 1e3) : setTimeout(() => {
                l = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0), chrome.runtime.sendMessage({
                    ms: "full_page",
                    capture: "no",
                    lastFrame: !0,
                    lastFrameHeight: i - n,
                    vh: l,
                    leftOver: 0,
                    websiteUrl: window.location.href
                }), window.location.reload()
            }, 1e3) : setTimeout(() => {
                chrome.runtime.sendMessage({
                    ms: "full_page",
                    capture: "no",
                    vh: l,
                    leftOver: leftOver,
                    websiteUrl: window.location.href
                }), window.location.reload()
            }, 1e3)
        }
    } else if ("visible_area" === e.from) captureVisibleScreen(l), chrome.runtime.sendMessage({
        ms: "given",
        url: window.location.href,
        type: "VisibleScreen"
    }); else if ("print_image" === e.from) chrome.runtime.sendMessage({
        ms: "specific_area",
        url: e.url,
        vh: e.vh,
        vw: e.vw
    }); else if ("show_selection_area" === e.from) chrome.runtime.sendMessage({ms: "show_selection_area"}), chrome.runtime.sendMessage({
        ms: "given",
        url: window.location.href,
        type: "SelectedRegion"
    }); else if ("full_page" === e.from) {
        chrome.runtime.sendMessage({ms: "given", url: window.location.href, type: "Fullpage"});
        let e = getHeightestElement();
        if (window.innerWidth > document.documentElement.clientWidth || e == document.body) window.scroll({
            left: 0,
            top: 0,
            behavior: "smooth"
        }), document.querySelector("body").classList.add("mystyle"), setTimeout(() => {
            chrome.runtime.sendMessage({ms: "full_page", capture: "first", vh: l}), first++
        }, 1e3); else {
            main(null)
        }
    }
}), uniqueIdFetch();
