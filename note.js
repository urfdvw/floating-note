/* Editor */

let editor = ace.edit('editor');
editor.setOptions({
    maxLines: Infinity,
    placeholder: "Markdown here",
});
editor.setOptions({fontSize: '12pt'});
editor.session.setUseWrapMode(true);
editor.session.setMode("ace/mode/markdown")

// update contents for rendering
editor.session.on('change', () => {
    document.getElementById('disp').innerHTML = editor.session.getValue();
    let name = trim(editor.session.getValue().trim().split('\n')[0], '#').trim();
    if (name.length > 0) {
        document.title = name;
    } else {
        document.title = "Floating Notes";
    }

    save_to_local_storage();
})

editor.commands.addCommand({
    name: 'hide',
    bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
    exec: function () {
        document.getElementById('editor').style.display = 'none';
        document.getElementById('tools').style.display = '';
    },
});

const stored_text = window.localStorage.getItem("floating_notes")
if (stored_text != null) {
    editor.setValue(stored_text, 1)
}
editor.focus();

/* UI */

function on_pencil_clicked () {
    if (document.getElementById('editor').style.display === '') {
        document.getElementById('editor').style.display = 'none';
    } else {
        document.getElementById('editor').style.display = '';
        editor.focus();
    }
}

document.body.style.background = 'lightgray';

function change_color (elem) {
    document.body.style.background = elem.style.backgroundColor;
}

// conformation brfore leave
window.addEventListener("beforeunload", function (e) {
    // https://stackoverflow.com/a/7317311/7037749
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});

/* Save */
function save_to_local_storage() {
    window.localStorage.setItem("floating_notes", editor.getValue());
}

function download(data, filename, type) {
    // Function to download data to a file
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
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

function trim(str, ch) {
    // https://stackoverflow.com/a/55292366/7037749
    var start = 0,
        end = str.length;

    while(start < end && str[start] === ch)
        ++start;

    while(end > start && str[end - 1] === ch)
        --end;

    return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}

function save_note() {
    if (editor.getValue().length > 0) {
        download(editor.getValue(), document.title + '.md', 'text')
    }
}
