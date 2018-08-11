function projectTemplate(target)
{
    let html = "";

    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);
    let key = keys[target];
    let value = db[key];

    if(typeof db[target].DESC !== 'undefined')
    {
      html += `${new Runic(db[target].DESC).parse()}`;
    }

    if(typeof db[target].HEAD !== 'undefined')
    {
      let style = document.getElementById("header").style.backgroundImage;
      document.getElementById("header").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
    }

    return html;
}