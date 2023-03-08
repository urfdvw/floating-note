let editor = ace.edit('editor');
editor.setOptions({
    maxLines: Infinity,
    placeholder: "Markdown here",
});

editor.session.setMode("ace/mode/markdown")

editor.session.on('change', () => {
    document.getElementById('disp').innerHTML = editor.session.getValue();
})

function on_switch_clicked () {
    if (document.getElementById('editor').style.display === '') {
        document.getElementById('editor').style.display = 'none';
        document.getElementById('switch').innerText = 'Edit'
    } else {
        document.getElementById('editor').style.display = '';
        document.getElementById('switch').innerText = 'Hide'
    }
}
