// 测试数据
var rawTextArr = [
  ['input {', '    outline: none;', '}'].join('\n'),
  ['.search-slogan {', '    outline: none;', '}'].join('\n'),
];

function render(el, str) {
  var list = '';
  str.split('\n').forEach(function(line) {
    list += '<li  contenteditable="true">' + line + '</li>';
  });
  el.innerHTML = list;
}

document.querySelectorAll('ol').forEach(function(ol, i) {
  render(ol, rawTextArr[i]);
});
document.onkeydown = function(e) {
  if (e.target.tagName === 'LI') {
    switch (e.key) {
      // 处理enter事件
      case 'Enter':
        var li = document.createElement('li');
        li.contentEditable = true;
        insertAfter(li, e.target);
        li.focus();
        e.preventDefault();
        break;
      default:
        console.log('render');
        break;
    }
  }
};

function insertAfter(newEl, targetEl) {
  var parent = targetEl.parentNode;
  if (parent.lastChild == targetEl) {
    parent.append(newEl);
  } else {
    parent.insertBefore(newEl, targetEl.nextSibling);
  }
}
