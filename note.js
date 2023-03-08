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
        document.getElementById('switch').style.display = '';
    },
});

function show_editor () {
    document.getElementById('editor').style.display = '';
    document.getElementById('switch').style.display = 'none';
    editor.focus();
}
show_editor ();

document.body.style.background = 'lightgray';
// editor.setTheme("ace/theme/monokai");
