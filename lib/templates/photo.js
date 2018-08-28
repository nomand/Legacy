function photoTemplate(db, target)
{
  let html = "";
  let sidebar = "";
  let content = "";

  document.getElementById("photo").style.display = "none";
  document.getElementById("sense").style.backgroundImage = "url('content/images/"+ db[target].HEAD +"')";

  function generateUrl(tag)
  {
    return `<a href="#tag+${tag}">${tag.toProperCase()}</a>`
  }

  let tags = "";

  if(typeof db[target].DESC !== 'undefined')
  {
    sidebar += `<div id="sidebar"><div class="intro"><p>${db[target].DESC.to_curlic()}</p></div>`
    
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
    content += `<div id="presentation">${new Runic(db[target].LONG, Curlic)}</div>`;
  }

  return html += sidebar + content;
}