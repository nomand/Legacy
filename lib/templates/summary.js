function summaryTemplate(db, target)
{
  let html = "", sidebar = "", content = "";
  let keys = Object.keys(db);

  if(typeof db[target].HEAD !== 'undefined')
  {
    document.getElementById("photo").style.display = "block";
    document.getElementById("photo").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
  }
  else
  {
    document.getElementById("photo").style.display = "none";
  }
  
  if(typeof db[target].DESC !== 'undefined')
  {
    sidebar += `
      <div id="sidebar">
        <div class="desc"><p>${db[target].DESC.to_curlic()}</p></div>
      </div>`
  }

  $try(function(){content += `${new Runic(db[target].LONG, Curlic)}`;});

  let tree = {};

  //for each key
  //for each child
  //if key doesn't match
  //add key, otherwise
  //add to the match

  let list = "";
  for(let i = 0; i < keys.length; i++)
  {
    let key = keys[i];
    let value = db[key];
    list += `<li><a href="#${String(key).to_url()}">${key.toLowerCase()}</a></li>`//${db[key].DESC.to_curlic()}

    if(value.FROM == null)
    {
      if(!tree.hasOwnProperty(key))
      {
        Object.defineProperty(tree, String(key).toLowerCase(), {value: key});
      }
    }
    else
    {
      if(tree.hasOwnProperty(value.FROM))
      {
        Object.defineProperty(tree, String(key).toLowerCase(), {value: key});
      }
    }
  }

  let summary = `<ul>${list}</ul>`;
  console.log(tree);
  return html += sidebar + `<div id="presentation">${content + summary}</div>`;
}