function projectTemplate(db, target)
{
  let html = "", sidebar = "", content = "";

  if(typeof db[target].HEAD !== 'undefined')
  {
    if(db[target].HEAD.split("https").length > 1)
    {
      document.getElementById("photo").innerHTML += `<iframe frameborder="0" src="${db[target].HEAD}"></iframe>`
    }
    else {
      document.getElementById("photo").style.display = "block";
      document.getElementById("photo").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
      document.getElementsByName('og:image')[0].content = "content/images/"+ db[target].HEAD;
      document.getElementsByName('twitter:image')[0].content = "content/images/"+ db[target].HEAD;
    }
  }
  else {
    document.getElementById("photo").style.display = "none";
  }

  let tags = "";

  $try(function(){
    sidebar += `<div id="sidebar"><div class="desc"><p>${db[target].DESC.to_curlic()}</p></div>`
    document.getElementsByName('og:description')[0].content = db[target].DESC;

    $try(function(){
      let t = db[target].TAGS;
      for(i = 0; i < t.length; i++)
      {
        if(t.length == 1) tags =  t[i].tagToUrl(); else if(i == t.length-1) tags += t[i].tagToUrl(); else tags += t[i].tagToUrl() + ", ";
      }
      sidebar += `<div id="tags">Tagged: ${tags}</div>`;
    })
    sidebar += `</div>`;
  });

  $try(function(){content += `<div id="presentation">${new Runic(db[target].LONG, Curlic)}</div>`;});

  return html += sidebar + content;
}