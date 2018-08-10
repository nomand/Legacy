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
      html += `<div id="description">${new Runic(db[target].DESC).parse()}</div>`;
    }

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.FROM !== 'undefined' && String(value.FROM).toLowerCase() === String(target).toLowerCase())
      {
        html += `<div><span id="topichead"><a href="#${key.toLowerCase()}">${key}</a></span>`

        for(let j = 0; j < keys.length; j++)
        {
          let subkey = keys[j];
          let subvalue = db[subkey];
          
          if(subvalue.FROM === key.toLowerCase())
          {
            html += `<span id="topic"><a href="#${subkey.toLowerCase()}">${subkey.toLowerCase()}</a></span>`;
          }
        }

        html += `</div>`
      }
    }
    return html;
}