function View()
{
  this.head = null;
  this.body = null;

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
          <div class="credit"><a href="#nomand">nomand</a> © <span class="grey">${new Date().getFullYear()}</span></div>
        </div>
      </div>`;
    
    document.body.innerHTML += header + content + footer;

    this.body = document.getElementById("content");
    this.head = document.getElementById("header");
  }

  this.getTemplate = function(target)
  {
    let db = new Indental(DATABASE).parse();
    let dbKeys = Object.keys(db);
    let template = db[Object.keys(db)[dbKeys.indexOf(target.toUpperCase())]].VIEW;

    if(template !== 'undefined')
    {
      this.body.innerHTML = window[template + 'Template'](db, target);
    }
  }

  function on_scroll()
  {
    var logo = document.getElementById("logo");

    if(window.scrollY > document.getElementById("header").offsetHeight - 120)
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