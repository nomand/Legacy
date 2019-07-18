function MakeHeader(db, target)
{
    imageCode = db[target] == null ? null : String(db[target].HEAD);
    let visual = ""

    if(imageCode == null || imageCode == 'undefined')
      visual = "";

    else if(imageCode.split("https").length > 1)
      visual = `<div id="photo"><iframe frameborder="0" src="${imageCode}"></iframe></div>`;
      
    else if(imageCode.split('.')[imageCode.split.length-1] == "webm")
      visual = `<video src="content/images/${imageCode}" poster="content/images/${imageCode.split('.')[0]}.jpg" loop autoplay />`;
    else if(db[target].VIEW == "photo")
    {
      return visual = `
      <div id="sense" style="background-image: url('content/images/${db[target].HEAD}')"></div>
      <div id="header">
        <a id="logo" class="logo" href="#home"></a>
      </div>
      `
    }
    else
    {
      visual = `<div id="photo" data-img="${imageCode}" ></div>`;
      document.getElementsByName('og:image')[0].content = "http://nomand.co/content/images/"+ imageCode;
    }

    return header = `
    <div id="header">
      <a id="logo" class="logo" href="#home"></a>
      ${visual}
    </div>`;
}

function MakeSidebar(db, target)
{
  let sidebar = "", tags = "";

  if(db[target].DESC != null)
    sidebar += `<div class="desc"><p>${db[target].DESC.to_curlic()}</p></div>`;

  if(db[target].TAGS != null)
  {
    let t = db[target].TAGS;

    for(i = 0; i < t.length; i++)
    {
      if(t.length == 1) tags =  t[i].tagToUrl(); else if(i == t.length-1) tags += t[i].tagToUrl(); else tags += t[i].tagToUrl() + ", ";
    }

    sidebar += `<div id="tags">Tagged: ${tags}</div>`;
  }

  return `<div id="sidebar">${sidebar}</div>`;
}

function MakeContent(db, target)
{
  if(db[target] == null && target.split(" ")[0].trim() == "TAG")
    return `<div id="content">${tagTemplate(db, target)}</div>`

  else if(target == "HOME")
    return `<div id="content">${homeTemplate(db)}</div>`;

  else if(db[target].VIEW == "index")
    return `<div id="content">${indexTemplate(db, target)}</div>`

  else if(db[target].VIEW == "project" || db[target].VIEW == "photo")
    return `<div id="content">${projectTemplate(db, target)}</div>`

  else if(db[target].VIEW == "collection")
    return `<div id="content">${collectionTemplate(db, target)}</div>`

  else if(db[target].VIEW == "summary")
    return `<div id="content">${summaryTemplate(db, target)}</div>`
    
  else
    return ``;
}

function MakeFooter()
{
    return footer = `
    <div id="footer">
      <div id="footerwrap">
        <a class="icon merveilles" href="https://merveilles.town/@nomand" target="_blank"></a>
        <a class="icon webring" href="https://webring.xxiivv.com/#random" target="_blank"></a>
        <a class="icon twitter" href="http://twitter.com/nomand"></a>
        <a class="icon github" href="http://github.com/nomand"></a>
        <a class="logo round" href="#home"></a>
        <div class="credit"><a href="#nomand">nomand</a> © <a href="#letnice">${new Date().getFullYear()}</a></div>
      </div>
    </div>`;
}