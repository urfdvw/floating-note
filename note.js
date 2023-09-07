/* Editor */

let editor = ace.edit("editor");
editor.setOptions({
    maxLines: Infinity,
    placeholder: "Markdown here",
});
editor.setOptions({ fontSize: "12pt" });
editor.session.setUseWrapMode(true);
editor.session.setMode("ace/mode/markdown");

// update contents for rendering
editor.session.on("change", () => {
    document.getElementById("disp").innerHTML = editor.session.getValue();
    let name = trim(editor.session.getValue().trim().split("\n")[0], "#").trim();
    if (name.length > 0) {
        document.title = name;
    } else {
        document.title = "Floating Notes";
    }

    save_text();
});

editor.commands.addCommand({
    name: "hide",
    bindKey: { win: "Ctrl-Enter", mac: "Cmd-Enter" },
    exec: function () {
        document.getElementById("editor").style.display = "none";
        document.getElementById("tools").style.display = "";
    },
});

editor.commands.addCommand({
    name: "Save",
    bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
    exec: function () {
        console.log("auto saved");
    },
});

editor.focus();

/* Local Storage */

function save_text() {
    window.localStorage.setItem("floating_notes_text", editor.getValue());
}

const stored_text = window.localStorage.getItem("floating_notes_text");
if (stored_text != null) {
    editor.setValue(stored_text, 1);
}

function save_theme() {
    console.log("dark_theme", dark_theme);
    window.localStorage.setItem("floating_notes_dark_theme", dark_theme);
}

var dark_theme = window.localStorage.getItem("floating_notes_dark_theme") === "true";
console.log("dark_theme", dark_theme);
if (typeof dark_theme === "undefined" || typeof dark_theme === "null") {
    // if not defined
    dark_theme = false;
}

/* UI */

const bg_color = "lightgray";
const body = document.getElementsByTagName("BODY")[0];
const html = document.getElementsByTagName("HTML")[0];
html.style.backgroundColor = bg_color;
body.style.backgroundColor = bg_color;

function on_pencil_clicked() {
    if (document.getElementById("editor").style.display === "") {
        document.getElementById("editor").style.display = "none";
    } else {
        document.getElementById("editor").style.display = "";
        editor.focus();
    }
}

function change_color(elem) {
    document.body.style.background = elem.style.backgroundColor;
}

// conformation brfore leave
window.addEventListener("beforeunload", function (e) {
    // https://stackoverflow.com/a/7317311/7037749
    var confirmationMessage = "It looks like you have been editing something. " + "If you leave before saving, your changes will be lost.";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});

/* Save */

function download(data, filename, type) {
    // Function to download data to a file
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function save_note() {
    if (editor.getValue().length > 0) {
        download(editor.getValue(), document.title + ".md", "text");
    }
}

/* dark mode */

function dark_mode() {
    if (!dark_theme) {
        var css = "html {-webkit-filter: invert(0%); -moz-filter: invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }";
        document.getElementById("dark_mode").innerText = "🌑";
    } else {
        var css =
            "html {-webkit-filter: invert(87%) hue-rotate(180deg);" +
            "-moz-filter: invert(87%) hue-rotate(180deg);" +
            "-o-filter: invert(87%) hue-rotate(180deg);" +
            "-ms-filter: invert(87%) hue-rotate(180deg); }";
        document.getElementById("dark_mode").innerText = "🌞";
    }
    var style = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}

dark_mode();

function toggle_dark_theme() {
    dark_theme = !dark_theme;
    dark_mode();
    save_theme(); // save theme on toggle
}

/* util */

function trim(str, ch) {
    // https://stackoverflow.com/a/55292366/7037749
    var start = 0,
        end = str.length;
    while (start < end && str[start] === ch) ++start;
    while (end > start && str[end - 1] === ch) --end;
    return start > 0 || end < str.length ? str.substring(start, end) : str;
}
