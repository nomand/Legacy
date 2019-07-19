function makeTree (db) {
  let map = {};
  let tree = {};
  let node;

  for (let item in db) {
    map[item] = item;
    db[item].CHILDREN = {};
  }

  for (let item in db) {
    node = db[item];
    if (node.FROM === undefined) {
      tree[item] = node;
    } else {
      db[map[node.FROM.toUpperCase()]].CHILDREN[item] = node;
    }
  }

  return tree;
}

function makeList (tree) {
  let list = '';
  for (let item in tree) {
    list += `<li>${item}${makeList(tree[item].CHILDREN)}</li>`;
  }
  return `<ul>${list}</ul>`;
}

function summaryTemplate(db, target)
{
  let html = "", sidebar = "", content = "";
  let tree = makeTree(db);

  sidebar += MakeSidebar(db, target);

  $try(() => content += `${new Runic(db[target].LONG, Curlic)}`);

  let list = makeList(tree);

  let summary = `<ul>${list}</ul>`;
  return html += sidebar + `<div id="presentation">${content + summary}</div>`;
}
