function projectTemplate(dbKeys, TMPL)
{
    let html = "";

    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);
    let key = keys[dbKeys];
    let value = db[key];

    if(db[dbKeys].HEAD !== 'undefined')
    {
      let style = document.getElementById("header").style.backgroundImage;
      document.getElementById("header").style.backgroundImage = String(style) + ", url('content/images/"+ db[dbKeys].HEAD + "')";
    }

    return html;
}