function projectTemplate(db, target)
{
  let html = "";
  let sidebar = "";
  let content = "";

  var keys = Object.keys(db);
  let key = keys[target];

  if(typeof db[target].HEAD !== 'undefined')
  {
    document.getElementById("photo").style.display = "block";
    document.getElementById("photo").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
  }
  else
  {
    document.getElementById("photo").style.display = "none";
  }

  function generateUrl(tag)
  {
    return `<a href="#tag+${tag}">${tag.toProperCase()}</a>`
  }

  let tags = "";

  if(typeof db[target].DESC !== 'undefined')
  {
    sidebar += `
      <div id="sidebar">
        <div class="intro">${new Runic(db[target].DESC).parse()}</div>`
    if(typeof db[target].TAGS !== 'undefined')
    {
      let t = db[target].TAGS;
      for(i = 0; i < t.length; i++)
      {
        if(t.length == 1) tags =  generateUrl(t[i]); else if(i == t.length-1) tags += generateUrl(t[i]); else tags += generateUrl(t[i]) + ", ";
      }
      sidebar += `<div id="tags">Tagged: ${tags}</div>`;
    }
        
    sidebar += `</div>`;
  }

  if(typeof db[target].LONG !== 'undefined')
  {
    content += `<div id="presentation">${new Runic(db[target].LONG).parse()}</div>`;
  }

  return html += sidebar + content;
}