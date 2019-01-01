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
    }

    if(image != null)
    {
      let small = new Image();
      let imageCode = image.split('.')[0];
      small.onload = () => frame.style.backgroundImage = `url('content/micro/${imageCode + ".png"}')`;
      small.src = `content/micro/${imageCode + ".png"}`;
      
      let largeimg = new Image();
      largeimg.onload = () => frame.style.backgroundImage = `url('content/images/${image}')`;
      largeimg.src = `content/images/${image}`;
    }
  }
}