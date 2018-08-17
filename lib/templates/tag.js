function tagTemplate(target)
{
    let html = "";
    
    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);

    // if(typeof db[target].HEAD !== 'undefined')
    // {
    //   let style = document.getElementById("header").style.backgroundImage;
    //   document.getElementById("header").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
    // }

    // if(typeof db[target].DESC !== 'undefined')
    // {
    //   html += `<div class="collection">${new Runic(db[target].DESC).parse()}</div>`;
    // }

    html += `<p>Posts tagged under ${target}</p>`

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.FROM !== 'undefined' && String(value.FROM).toLowerCase() === String(target).toLowerCase())
      {
        html += `
        <div class="collection">
          <h2><a href="#${String(key).to_url()}">${key.toProperCase()}</a></h2>
          ${new Runic(db[key].DESC).parse()}
        </div>`
      }
    }
    return html;
}