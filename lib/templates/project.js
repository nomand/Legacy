function projectTemplate(target)
{
    let html = "";

    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);
    let key = keys[target];

    if(typeof db[target].HEAD !== 'undefined')
    {
      let style = document.getElementById("header").style.backgroundImage;
      document.getElementById("header").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
    }

    if(typeof db[target].DESC !== 'undefined')
    {
      html += `<div class="intro">${new Runic(db[target].DESC).parse()}</div>`;
    }

    if(typeof db[target].LONG !== 'undefined')
    {
      html += `${new Runic(db[target].LONG).parse()}`;
    }

    return html;
}