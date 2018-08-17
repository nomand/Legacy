function View()
{
  this.grid = null;
  this.menu = null;
  this.head = null;
  let parent = this;
  
  this.install = function()
  {
    let header = `
      <div id="header" class="headerimage">
        <a id="logo" class="logo" href="#home"></a>
      </div>`;
    let content = `<div id="content"></div>`;
    
    let footer = `
      <div id="footer">
        <div id="footerwrap">
          <a class="icon twitter" href="http://twitter.com/nomand"></a>
          <a class="icon github" href="http://github.com/nomand"></a>
          <a class="icon webring" href="https://webring.xxiivv.com/#random" target="_blank"></a>
          <a class="logo round" href="#home"></a>
          <div class="credit">nomand © <span class="grey">${new Date().getFullYear()}</span></div>
        </div>
      </div>`;
    
    document.body.innerHTML += header + content + footer;

    this.grid = document.getElementById("content");
    this.head = document.getElementById("header");
  }

  this.getTemplate = function(db)
  {
    let dbKeys = Object.keys(db);
    let template = db[Object.keys(db)[0]].VIEW;

    if(template !== 'undefined')
    {
      this.grid.innerHTML = window[template + 'Template'](dbKeys);
    }
  }

  // Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  this.extractRootDomain = function(url)
  {
    var domain = this.extractHostname(url),
    splitArr = domain.split('.'),
    arrLen = splitArr.length;

    // extracting the root domain here
    // if there is a subdomain 
    if (arrLen > 2) 
    {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2)
      {
        // this is using a ccTLD
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  }

  // Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  this.extractHostname = function(url)
  {
    var hostname;
    // find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }

    // find & remove port number
    hostname = hostname.split(':')[0];
    // find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }

  function on_scroll()
  {
    var scroll = window.scrollY;
    var logo = document.getElementById("logo");
    var header = document.getElementById("header")

    if(scroll > header.offsetHeight - 120)
    {
        if(!logo.classList.contains("sticky"))
            logo.classList.add("sticky");
    }
    else
    {
        if(logo.classList.contains("sticky"))
            logo.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", on_scroll);
}