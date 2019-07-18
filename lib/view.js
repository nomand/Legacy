function View()
{
  this.make = function(db, target)
  {
    let header =  MakeHeader(db, target);
    let content = MakeContent(db, target);
    let footer =  MakeFooter(target);

    document.body.innerHTML += `<div id="view">` + header + content + footer + `</div>`;
    progressiveImageLoad();
  }
  
  this.reset = () => document.body.innerHTML = "";

  progressiveImageLoad = function()
  {
    let frame = document.getElementById("photo");
    let image;

    if(frame != null)
    {
      image = frame.dataset.img;

      let imageCode = image.split('.')[0];

      let bitmap = new Image();
      bitmap.src = `content/micro/${imageCode + ".png"}`;
      bitmap.onload = () => onLoaded(`content/micro/${imageCode + ".png"}`);

      bitmap = new Image();
      bitmap.src = `content/images/${image}`;
      bitmap.onload = () => onLoaded(`content/images/${image}`);

      onLoaded = (src) => frame.style.backgroundImage = `url(${src})`;
    }
  }
}