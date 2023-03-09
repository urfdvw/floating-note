let editor = ace.edit('editor');
editor.setOptions({
    maxLines: Infinity,
    placeholder: "Markdown here",
});

editor.session.setMode("ace/mode/markdown")
editor.session.on('change', () => {
    document.getElementById('disp').innerHTML = editor.session.getValue();
})

editor.commands.addCommand({
    name: 'hide',
    bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
    exec: function () {
        document.getElementById('editor').style.display = 'none';
        document.getElementById('tools').style.display = '';
    },
});

function show_editor () {
    document.getElementById('editor').style.display = '';
    document.getElementById('tools').style.display = 'none';
    editor.focus();
}

document.body.style.background = 'lightgray';
// editor.setTheme("ace/theme/monokai");

function change_color (elem) {
    document.body.style.background = elem.style.backgroundColor;
} 