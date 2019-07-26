function Main()
{
  this.db = null;
  this.view = null;

  this.install = function()
  {
    this.db = new Wrap(DATABASE);
    this.db.install();
    this.view = new View();
  }

  this.init = function(init)
  {
    if(window.document.location.hash === "")
      window.document.location.hash = "#home";
    else
      this.load(window.document.location.hash);
  }

  this.load = function(target)
  {
    this.view.reset();
    target = target.substr(0,1) == "#" ? target.substr(1, target.length-1) : target;
    target = target.replace(/\+/g, " ").trim().toUpperCase();

    this.db.render(target);
    
    let title = `Legacy: ${target.toProperCase()}`;
    document.title = title;
    document.getElementsByName('og:title')[0].content = title;
    window.scrollTo(0,0);
  }
}

function on_scroll()
{
  let logo = document.getElementById("logo");
  
    if(window.scrollY > document.getElementById("header").offsetHeight - 120){
      if(!logo.classList.contains("sticky")) logo.classList.add("sticky");}
    else {
      if(logo.classList.contains("sticky")) logo.classList.remove("sticky");}
}

function $try(func){try{return func()}catch(e){return null}}

window.addEventListener("hashchange", () => main.load(window.document.location.hash));
window.addEventListener("scroll", on_scroll);