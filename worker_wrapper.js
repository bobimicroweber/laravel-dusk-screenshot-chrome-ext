try {
    importScripts( "background/innerScreenshot.js","background/background.js");
} catch (e) {
    // console.log(e);
}



/* MV2 to MV3
"content_security_policy": "script-src 'self' 'sha256-1kri9uKG6Gd9VbixGzyFE/kaQIHihYFdxFKKhgz3b80'; object-src 'self'",
"web_accessible_resources": [{
    "resources": [ "public/*"],
    "matches": ["<urls>"]
    }]
"libs/fabric.min.js", "libs/fabricHistory.js","background/jspdf.min.js"
*/