function photoTemplate(db, target)
{
  let html = "", sidebar = "", content = "";

  // document.getElementById("photo").style.display = "none";
  // document.getElementById("sense").dataset.img = db[target].HEAD;
  document.getElementById("photo").dataset.img = db[target].HEAD;

  let tags = "";

  $try(function(){
    sidebar += `<div id="sidebar"><div class="desc"><p>${db[target].DESC.to_curlic()}</p></div>`
    
    $try(function(){
      let t = db[target].TAGS;
      for(i = 0; i < t.length; i++)
      {
        if(t.length == 1) tags =  t[i].tagToUrl(); else if(i == t.length-1) tags += t[i].tagToUrl(); else tags += t[i].tagToUrl() + ", ";
      }
      sidebar += `<div id="tags">Tagged: ${tags}</div>`;
    })
    sidebar += `</div>`
  });

  $try(function(){content += `<div id="presentation">${new Runic(db[target].LONG, Curlic)}</div>`;});

  return html += sidebar + content;
}