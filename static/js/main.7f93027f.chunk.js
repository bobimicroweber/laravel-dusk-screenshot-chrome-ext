(this.webpackJsonpfrontend = this.webpackJsonpfrontend || []).push([[0], {
    34: function (e, n, t) {
        e.exports = t(51)
    }, 39: function (e, n, t) {
    }, 40: function (e, n, t) {
    }, 51: function (e, n, t) {
        "use strict";
        t.r(n);
        var a = t(0), r = t.n(a), o = t(12), c = t.n(o), i = (t(39), t(11)), s = t(9), l = (t(40), t(10)),
            m = (t(41), t(24)), d = t.n(m), u = t(19), h = t(20), g = t(67), f = t(66);

        function w() {
            var e = Object(s.a)(["\n    width: 100%;\n    height: 1px;\n    border-top: 1px solid #ccc;\n    margin: 1rem 0;\n\n    h2 {\n        font-family: 'MetropolisRegular';\n        font-size: 1.25rem;\n        margin-top:-0.8rem;\n        margin-left: 5rem;\n        width: 3rem;\n\n        text-align: center;\n        color: ", ";\n        background: ", ";\n    }\n"]);
            return w = function () {
                return e
            }, e
        }

        function p() {
            var e = Object(s.a)(["\n  width: 1rem;\n  height: 1rem;\n\n  border: none;\n\n  background: ", ";\n  cursor: pointer;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);
            return p = function () {
                return e
            }, e
        }

        function b() {
            var e = Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n    width: 100%;\n"]);
            return b = function () {
                return e
            }, e
        }

        function y() {
            var e = Object(s.a)(["\n  width : 100%;\n  display: flex;\n  align-items: center;\n  justify-content : space-between;\n  .custom-classname.react-toggle--checked .react-toggle-track {\n   background-color: #fff;\n  }\n\n  margin: ", ";\n"]);
            return y = function () {
                return e
            }, e
        }

        function x() {
            var e = Object(s.a)(["\n  border-bottom: 1px solid #ccc;\n  height: 1px;\n  width: 100%;\n\n  margin: 1rem 0;\n"]);
            return x = function () {
                return e
            }, e
        }

        function E() {
            var e = Object(s.a)(["\n  // width: 10rem;\n  box-shadow: 0 0 1rem #ccc;\n\n  min-height: 14rem;\n  /* max-height: 16rem; */\n\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-start;\n\n  background: ", ";\n  color: ", ";\n\n  h1 {\n    font-family: 'MetropolisRegular';\n    font-weight: 700;\n    font-size: 1.5rem;\n  }\n\n  h2 {\n    font-family: 'MetropolisRegular';\n    font-weight: 500;\n    font-size: 1rem;\n    margin: 0;\n  }  \n\n  form {\n    display: flex;\n    align-items: center;\n  }\n\n  input {\n    margin: 0;\n    height: 1.5rem;\n    border-radius: 0.5rem;\n    max-width: 80%;\n    margin-left: 0.5rem;\n    border: 1px solid #333;\n  }\n\n  p {\n    text-align: left;\n    margin: 0;\n  }\n"]);
            return E = function () {
                return e
            }, e
        }

        var v = l.a.div(E(), (function (e) {
            return e.mode ? "#222" : "#FFF"
        }), (function (e) {
            return e.mode ? "#FFF" : "#000"
        })), k = l.a.div(x()), j = l.a.div(y(), (function (e) {
            return e.spaced ? "1rem 0 0 0" : "0"
        }));
        l.a.div(b()), l.a.button(p(), (function (e) {
            return e.checked ? "#E50914" : "#ccc"
        })), l.a.div(w(), (function (e) {
            return e.mode ? "#FFF" : "#222"
        }), (function (e) {
            return e.mode ? "#222" : "#FFF"
        }));
        var F = function () {
            Object(a.useEffect)((function () {
                window.chrome.storage.sync.get(null, (function (e) {
                    e.darkmode && o(!0)
                })), window.chrome.tabs.query({currentWindow: !0, active: !0}, (function (e) {
                    var n = e[0].url;
                    window.chrome.tabs.sendMessage(e[0].id, {text: "check for frameset?"}, (function (e) {
                        "yes" == (e = e || {}).status && (m(!0), A(!0))
                    })), n.includes("file://") && window.chrome.extension.isAllowedFileSchemeAccess((function (n) {
                        if (n) try {
                            window.chrome.tabs.sendMessage(e[0].id, {text: "are_you_there_content_script?"}, (function (n) {
                                if ("yes" != (n = n || {}).status) for (var t = 0; t < window.chrome.runtime.getManifest().content_scripts[0].js.length; t++) {
                                    var a = window.chrome.runtime.getManifest().content_scripts[0].js[t];
                                    e[0].id && window.chrome.tabs.executeScript(e[0].id, {file: a}, (function (e) {
                                        var n = window.chrome.runtime.lastError;
                                        n && console.error(JSON.stringify(n))
                                    }))
                                }
                            }))
                        } catch (t) {
                        } else y(!0), m(!0)
                    })), (n.includes("chrome://") || n.includes("chrome-extension:") || n.includes("https://chrome.google.com")) && m(!0)
                }))
            }), []);
            var e = Object(a.useState)(!1), n = Object(i.a)(e, 2), t = n[0], o = n[1], c = Object(a.useState)(!1),
                s = Object(i.a)(c, 2), l = s[0], m = s[1], w = Object(a.useState)(!1), p = Object(i.a)(w, 2), b = p[0],
                y = p[1], x = Object(a.useState)(!1), E = Object(i.a)(x, 2), F = E[0], M = E[1],
                O = Object(a.useState)(!1), S = Object(i.a)(O, 2), N = S[0], C = S[1], T = Object(a.useState)(!1),
                _ = Object(i.a)(T, 2), z = _[0], A = _[1];
            return r.a.createElement("div", {className: "App"}, l ? r.a.createElement(v, {mode: t}, z ? r.a.createElement("h1", {
                style: {
                    color: "red",
                    fontWeight: 70
                }
            }, "Screenshotting does not work on website containing frameset due to security reasons.") : b ? r.a.createElement("div", {style: {width: "170px"}}, r.a.createElement("h2", null, "File access needed "), r.a.createElement("h4", null, "Please go to your browser\u2019s extension settings and enable \u201cAllow access to file URLs\u201d, so the extension can access this page."), r.a.createElement(g.a, {
                variant: "contained",
                size: "small",
                color: "secondary",
                onClick: function (e) {
                    window.chrome.tabs.create({url: "chrome://extensions/?id=" + window.chrome.runtime.id})
                }
            }, "Extension Settings")) : r.a.createElement("h1", {
                style: {
                    color: "red",
                    fontWeight: 70
                }
            }, "Screenshotting does not work on chrome internal pages and extensions gallery"), r.a.createElement(j, null, r.a.createElement(d.a, {
                id: "cheese-status",
                defaultChecked: t,
                className: "custom-classname",
                icons: {
                    unchecked: r.a.createElement(u.a, {size: "xs", color: "#FFFF00", icon: h.b}),
                    checked: r.a.createElement(u.a, {size: "xs", color: "#222", icon: h.a})
                },
                onChange: function () {
                    o(!t), window.chrome.storage.sync.set({darkmode: !t})
                }
            }), r.a.createElement("label", {htmlFor: "cheese-status"}, "Theme: Dark/Light"))) : r.a.createElement(v, {mode: t}, r.a.createElement("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    width: "550px"
                }
            }, N ? r.a.createElement(g.a, {
                variant: "contained",
                color: "secondary"
            }, r.a.createElement("span", {className: "buttonloading"}, r.a.createElement(f.a, {
                color: "white",
                style: {width: "30px", height: "30px"}
            }))) : r.a.createElement(g.a, {
                variant: "contained", color: "secondary", onClick: function (e) {
                    C(!0), window.chrome.tabs.query({currentWindow: !0, active: !0}, (function (e) {
                        var n = e[0];
                        window.chrome.tabs.sendMessage(n.id, {from: "visible_area"})
                    }))
                }
            }, r.a.createElement("span", {className: "icon1"}), r.a.createElement("span", null, window.chrome.i18n.getMessage("visibleButtonTitle"))), F ? r.a.createElement(g.a, {
                variant: "contained",
                color: "secondary"
            }, r.a.createElement("span", {className: "buttonloading"}, r.a.createElement(f.a, {
                color: "white",
                style: {width: "30px", height: "30px"}
            }))) : r.a.createElement(g.a, {
                variant: "contained", color: "secondary", onClick: function (e) {
                    M(!0), window.chrome.tabs.query({currentWindow: !0, active: !0}, (function (e) {
                        var n = e[0];
                        window.chrome.tabs.sendMessage(n.id, {from: "full_page"})
                    }))
                }
            }, r.a.createElement("span", {className: "icon2"}), r.a.createElement("span", null, window.chrome.i18n.getMessage("fullButtonTitle"), " ")), r.a.createElement(g.a, {
                variant: "contained",
                color: "secondary",
                onClick: function (e) {
                    window.chrome.tabs.query({currentWindow: !0, active: !0}, (function (e) {
                        var n = e[0];
                        window.chrome.tabs.sendMessage(n.id, {from: "show_selection_area"})
                    })), setTimeout((function () {
                        window.close()
                    }), 300)
                }
            }, r.a.createElement("span", {className: "icon3"}), r.a.createElement("span", null, window.chrome.i18n.getMessage("specificButtonTitle")))), r.a.createElement("div", {
                style: {
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "550px"
                }
            }, r.a.createElement("div", {
                className: "description",
                style: {padding: "0px 5px"}
            }, r.a.createElement("h2", {
                style: {
                    marginBottom: "0px",
                    color: "dimgrey"
                }
            }, window.chrome.i18n.getMessage("visibleAreaTitle")), r.a.createElement("p", {style: {margin: "10px"}}, window.chrome.i18n.getMessage("visibleAreaDesc"))), r.a.createElement("div", {
                className: "description",
                style: {padding: "0px 5px"}
            }, r.a.createElement("h2", {
                style: {
                    marginBottom: "0px",
                    color: "dimgrey"
                }
            }, window.chrome.i18n.getMessage("fullpageTitle")), r.a.createElement("p", {style: {margin: "10px"}}, window.chrome.i18n.getMessage("fullpageDesc"))), r.a.createElement("div", {
                className: "description",
                style: {padding: "0px 5px"}
            }, r.a.createElement("h2", {
                style: {
                    marginBottom: "0px",
                    color: "dimgrey"
                }
            }, window.chrome.i18n.getMessage("specificAreaTitle")), r.a.createElement("p", {style: {margin: "10px"}}, window.chrome.i18n.getMessage("specificAreaDesc")))), r.a.createElement(k, null), r.a.createElement(j, null, r.a.createElement("div", {
                style: {
                    display: "flex",
                    alignItems: "center"
                }
            }, r.a.createElement(d.a, {
                id: "cheese-status",
                defaultChecked: t,
                className: "custom-classname",
                icons: {
                    unchecked: r.a.createElement(u.a, {size: "xs", color: "#FFFF00", icon: h.b}),
                    checked: r.a.createElement(u.a, {size: "xs", color: "#222", icon: h.a})
                },
                onChange: function () {
                    o(!t), window.chrome.storage.sync.set({darkmode: !t})
                }
            }), r.a.createElement("label", {htmlFor: "cheese-status"}, "Theme: Dark/Light")))))
        };
        Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
        c.a.render(r.a.createElement(r.a.StrictMode, null, r.a.createElement(F, null)), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then((function (e) {
            e.unregister()
        })).catch((function (e) {
            console.error(e.message)
        }))
    }
}, [[34, 1, 2]]]);
//# sourceMappingURL=main.7f93027f.chunk.js.map
