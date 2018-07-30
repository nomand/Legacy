function View()
{
  this.grid = null;
  this.menu = null;
  var parent = this;
  
  const SETTINGS = {
    STATSNUMTAGS: 5,
    STATSNUMTYPE: 10,
    WIDEGRIDITEM: false,
    GRIDITEMIDBASE: 'item',
    SHOWUPPER: true,
    SHOWTITLE: true,
    SHOWTYPE: true,
    SHOWLINK: true,
    SHOWLOWER: true,
    SHOWTAGS: true,
    SHOWNOTE: true,
    SHOWQOTE: true,
    SHOWTERM: true,
    SHOWPROG: true,
    SHOWIMAG: true,
    SHOWOVERLAY: false
  }

  this.install = function()
  {
    let header = `
      <div id="header" style="background-image: url('assets/img/noise.png'), url('content/images/0000.jpg');">
        <a id="logo" class="logo" href="#journal"></a>
      </div>`;
    let stats = `<div id="stats"></div>`;
    let content = `<div id="content"></div>`;
    
    let footer = `
      <div id="footer">
        <div id="footerwrap">
          <a class="icon twitter" href="http://twitter.com/nomand"></a>
          <a class="icon github" href="http://github.com/nomand"></a>
          <a class="logo round" href="#"></a>
          <div class="credit">nomand © <span class="grey">2018</span></div>
        </div>
      </div>`;
    
    document.body.innerHTML += header + stats + content + footer;

    this.grid = document.getElementById("content");
    this.menu = document.getElementById("stats");
  }

  this.display = function(db)
  {
    // BUILD
    this.grid.innerHTML = '';
    var dbKeys = Object.keys(db);
    var i = 0;
    while (i < dbKeys.length) 
    {
      this.buildEntry(db, dbKeys[i]);
      i++;
    }
  }

  this.buildEntry = function(db, key)
  {
    let value = db[key];
    let itemClass = "entry";

    if (SETTINGS.WIDEGRIDITEM)
    {
      if (typeof value.WIDE !== 'undefined' && value.WIDE)
      {
        itemClass += " grid-item--width2";
      }
      else if (typeof value.QOTE !== 'undefined')
      {
        if (Array.isArray(value.QOTE) && value.QOTE.length > 4)
        {
          itemClass += " grid-item--width2";
        } 
      }
    }

    if (SETTINGS.SHOWIMAG)
    {
      if (typeof value.TYPE !== 'undefined' && value.TYPE == 'image')
      {
        itemClass += " grid-item-image";
      }
    }

    let entry = ``;

    // ITEM DIV
    entry += `<div class="${itemClass}" id="${SETTINGS.GRIDITEMIDBASE + value.DIID}">`;

    if (typeof value.LINK !== 'undefined')
    {
      var idUrl = "url";
      if (typeof value.SEEN !== 'undefined')
      {
        if (value.SEEN == "true")
        {
          idUrl = "urlseen";
        }
      }
    }

    // UPPER CONTENT START
    if (SETTINGS.SHOWUPPER)
    {
      entry += `<div class="entry-upper-content">`;

      // TITLE
      if (SETTINGS.SHOWTITLE)
      {
        entry += `<a class="title" href="${String(value.LINK)}">${key.to_properCase()}</a>`;
      }

      if (SETTINGS.SHOWLINK)
      {
        if (typeof value.LINK !== 'undefined')
        {
          entry += `<div class="link-line"><div class="link-title">${this.extractRootDomain(value.LINK)}</div></div>`;
        }
      }

      // TYPE
      if (SETTINGS.SHOWTYPE)
      {
        if (typeof value.TYPE !== 'undefined')
        {
          entry += `
          <a href='#type-${String(value.TYPE)}'>
            <div class="type">Type: ${value.TYPE}</div>
          </a>`;
        }
      }

      // UPPER CONTENT END
      entry += `</div>`;
    }

    // LOWER CONTENT START
    if (SETTINGS.SHOWLOWER)
    {
      entry += `<div class="entry-lower-content">`;

      // TAGS
      if (SETTINGS.SHOWTAGS)
      {
        if (typeof value.TAGS !== 'undefined')
        {
          entry += `<div class="tags">Tags: `;
          for (var i = 0; i < value.TAGS.length; i++)
          {
            entry += `<a href=#tag-${value.TAGS[i]}>${value.TAGS[i]}</a>`;
            if (i+1 != value.TAGS.length)
            {
              entry += `, `;
            }
          };
          entry += `</div>`;
        }
      }

      // NOTE
      if (SETTINGS.SHOWNOTE)
      {
        if (typeof value.NOTE !== 'undefined')
        {
          entry += `<div class="note">Notes: ${value.NOTE}</div>`;
        }
      }

      // QUOTE
      if (SETTINGS.SHOWQOTE)
      {
        if (typeof value.QOTE !== 'undefined')
        {
          entry += `<div class="quote">Quote: ${value.QOTE}</div>`;
        }
      }

      // TERM
      if (SETTINGS.SHOWTERM)
      {
        if (typeof value.TERM !== 'undefined')
        {
          for (var i = 0; i < value.TERM.length; i++) 
          {
            entry += `<div class="term">Term: <b>${value.TERM[i][0]}</b>: ${value.TERM[i][1]}</div>`;
          }
        }
      }

      // PROGRESS
      if (SETTINGS.SHOWPROG)
      {
        if (typeof value.PROG !== 'undefined')
        {
          entry += `<div class="prog">${value.PROG}</div>`;
        }
      }

      // LOWER CONTENT END
      entry += `</div>`;
    }

    // IMAGE
    if (SETTINGS.SHOWIMAG)
    {
      if (typeof value.TYPE !== 'undefined' && value.TYPE == 'image')
      {
        if (typeof value.FILE !== 'undefined')
        {
          entry += `<div class="pict" style="background-image: url('content/images/${value.FILE}');">`;
        }
      }
    }

    entry += `</div>`;

    this.grid.innerHTML += entry;
  }

  this.stats = function(value)
  {
    let menuContent = ``;
    
    // TYPE
    menuContent += `
      <a id="stat" class="round" href="#">${value.total} Home</div></a>`;

    for (var ty = 0; ty < Math.min(value.types.length, SETTINGS.STATSNUMTYPE); ty++) 
    {
      menuContent += `
        <a id="stat" class="round" href="#type-${value.types[ty][0]}">
          ${value.types[ty][1]} ${value.types[ty][0]}
        </a>
      `;
    }

    // TERM
    if (value.terms > 0)
    {
      menuContent += `<a id="stat" class="round" href="#term">${value.terms} terms</a>`;
    }

    // TAGS
    if (value.tags.length > 0)
    {
      menuContent += `<div style="display:inline-block;">Tags:`;
      for (var t = 0; t < Math.min(value.types.length, SETTINGS.STATSNUMTAGS); t++) 
      {
        menuContent += `
          <a href='#tag-${value.tags[t][0]}'>
            ${value.tags[t][0]} ( ${value.tags[t][1]} )
          </a>`;
      }
      menuContent += `</div>`;
    }

    this.menu.innerHTML = ``;
    this.menu.innerHTML += menuContent;
  }

  // HELPER
  String.prototype.to_properCase = function()
  {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

  window.addEventListener("scroll", on_scroll );

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
}