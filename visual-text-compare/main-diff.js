// 测试数据
var rawTextArr = [
  ['---start of file---', 'input {', '.search-slogan {', '    outline: none;', '}', 'hello', 'world', 'come on', 'boy', '---end of file---'].join('\n'),
  ['---start of file---', '.search-slogan {', '    outline: none;', '}', '.b {', 'position: relative;', '}', 'hello', 'web', 'come on', '---end of file---'].join('\n'),
];

var ols = document.querySelectorAll('ol');
var leftOl = ols[0];
var rightOl = ols[1];

function updateAndRender(fromUpdate) {
  var str = getCurrentStr(fromUpdate);
  console.log(str)
  var renderData = {left: [], right: []};
  var leftStr = str[0];
  var rightStr = str[1];
  var diff = JsDiff.diffLines(rightStr, leftStr);

  diff.forEach(function(d) {
    if (d.added) {
      // 左边有内容，右边没有内容
      d.value.split('\n').forEach(function(line, i) {
        if (d.count <= i) return;
        var showArrow = i == 0;
        renderData.left.push({
          type: 'edit',
          text: line,
          showArrow: showArrow,
        });
        renderData.right.push({
          type: 'empty',
          text: '',
          showArrow: showArrow,
        });
      });
    } else if (d.removed) {
      // 左边没有内容，右边有内容
      d.value.split('\n').forEach(function(line, i) {
        if (d.count <= i) return;
        var showArrow = i == 0;
        renderData.left.push({
          type: 'empty',
          text: '',
          showArrow: showArrow,
        });
        renderData.right.push({
          type: 'edit',
          text: line,
          showArrow: showArrow,
        });
      });
    } else {
      // 没有变化
      d.value.split('\n').forEach(function(line, i) {
        if (d.count <= i) return;
        renderData.left.push({
          type: 'same',
          text: line,
        });
        renderData.right.push({
          type: 'same',
          text: line,
        });
      });
    }
  });
  ols.forEach(function(ol) {
    render(ol, renderData, ol.dataset.type);
  });
}

function render(el, renderData, type) {
  var list = '';
  var typeContentMap = {'left': '>>', 'right': '<<'};
  renderData[type].forEach(function(line) {
    var arrow = line.type != 'same' && line.showArrow ? '<button data-type=' + type + '>' + typeContentMap[type] + '</button>' : '';
    list += '<li data-type="' + line.type + '">' + arrow + '<span>' + line.text + '</span></li>';
  });
  el.innerHTML = list;
}

function getCurrentStr(fromUpdate) {
  if (fromUpdate) {
    var leftStr = [];
    var rightStr = [];
    // 遍历DOM
    for (var i=0; i<leftOl.children.length; i++) {
      var li = leftOl.children[i];
      if (li.lastChild.innerText !== '') leftStr.push(li.lastChild.innerText);
    }
    for (var i=0; i<rightOl.children.length; i++) {
      var li = rightOl.children[i];
      if (li.lastChild.innerText !== '') rightStr.push(li.lastChild.innerText);
    }
    return [leftStr.join('\n'), rightStr.join('\n')];
  } else {
    return rawTextArr;
  }
}

document.querySelector('article').addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    var type = e.target.dataset.type; // left or right
    // 找到需要覆盖的位置节点
    var curLi = e.target.parentNode;
    var ol = curLi.parentNode;
    var start = [].indexOf.call(ol.children, curLi);
    var end = start;
    for (var i=start+1; i < ol.children.length; i++) {
      if (ol.children[i].dataset.type != curLi.dataset.type) {
        end = i - 1;
        break;
      }
    }
    // 覆盖
    var target = type == 'left' ? rightOl : leftOl;
    var source = type == 'left' ? leftOl : rightOl;
    for (var i=start; i<=end; i++) {
      target.children[i].lastChild.innerText = source.children[i].lastChild.innerText;
    }
    updateAndRender(true);
  }
});

updateAndRender();
