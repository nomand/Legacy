function collectionTemplate(target)
{
    let html = "";
    
    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);

    if(typeof db[target].HEAD !== 'undefined')
    {
      let style = document.getElementById("header").style.backgroundImage;
      document.getElementById("header").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
    }

    if(typeof db[target].DESC !== 'undefined')
    {
      html += `${new Runic(db[target].DESC).parse()}`;
    }

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.FROM !== 'undefined' && String(value.FROM).toLowerCase() === String(target).toLowerCase())
      {
        html += `
        <div>
          <a href="#${key.toLowerCase()}">${key}</a>
          ${db[key].DESC}
        </div>`
      }
    }
    return html;
}