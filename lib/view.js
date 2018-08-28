function View()
{
  this.install = function()
  {
    let header = `
      <div id="header">
        <a id="logo" class="logo" href="#home"></a>
        <div id="photo"></div>
      </div>`;
    let content = `<div id="content"></div>`;
    
    let footer = `
      <div id="footer">
        <div id="footerwrap">
          <a class="icon twitter" href="http://twitter.com/nomand"></a>
          <a class="icon github" href="http://github.com/nomand"></a>
          <a class="icon webring" href="https://webring.xxiivv.com/#random" target="_blank"></a>
          <a class="logo round" href="#home"></a>
          <div class="credit"><a href="#nomand">nomand</a> © <a class="grey" href="#letnice">${new Date().getFullYear()}</a></div>
        </div>
      </div>`;
    
    let sense = `<div id="sense"></div>`

    document.body.innerHTML += `<div id="view">` + sense + header + content + footer + `</div>`;
  }

  this.reset = function()
  {
    document.body.innerHTML = ""; 
    this.install();
  }

  function on_scroll()
  {
    let logo = document.getElementById("logo");

    if(window.scrollY > document.getElementById("photo").offsetHeight - 120)
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