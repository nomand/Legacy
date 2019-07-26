function summaryTemplate(db, target)
{
  let html = "", sidebar = "", content = "";
  let keys = Object.keys(db);

  sidebar += MakeSidebar(db, target);

  $try(() => content += `${new Runic(db[target].LONG, Curlic)}`);

  function plantTree(db)
  {
    let map = {}
    let tree = {}
    let node

    for (let item in db)
    {
      map[item] = item
      db[item].CHILDREN = {}
    }

    for (let item in db)
    {
      node = db[item]
      if(node.FROM === undefined) {
        tree[item] = node
      } else {
        db[map[node.FROM.toUpperCase()]].CHILDREN[item] = node
      }
    }

    return tree;
  }
  
  function spacer(x)
  {
    let s = '';
    for (let i = 0; i <= x; i++) s += '\t';
    return s;
  }

  function printTree(tree, x = 0)
  {
    let output = ``
    const space = spacer(x)
    for (let item in tree)
    {
      output += `<a href="#${String(item).to_url()}">${space}${String(item).toLowerCase()} \n ${printTree(tree[item].CHILDREN, x + 1)}</a>`
    }
    return output
  }

  let list = plantTree(db);

  let summary = `<code>${printTree(list)}</code>`;
  return html += sidebar + `<div id="presentation">${content + summary}</div>`;
}