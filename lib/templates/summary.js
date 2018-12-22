function summaryTemplate(db, target)
{
  let html = "", sidebar = "", content = "";
  let keys = Object.keys(db);

  sidebar += MakeSidebar(db, target);

  $try(() => content += `${new Runic(db[target].LONG, Curlic)}`);

  let tree = new Array();
  let list = "";
  for(let i = 0; i < keys.length; i++)
  {
    let key = keys[i];
    let value = db[key];
    list += `<li><a href="#${String(key).to_url()}">${key.toLowerCase()}</a></li>`;

    if(value.FROM == null)
    {
      tree[key.toLowerCase()] = new Array();
    }
    else
    {
    }
  }

  let summary = `<ul>${list}</ul>`;
  return html += sidebar + `<div id="presentation">${content + summary}</div>`;
}