function homeTemplate(dbKeys, TMPL)
{
    let html = "";
    
    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.UNDE !== 'undefined' && value.UNDE === 'home')
      {
        html += `<div id="topicblock"><span id="topicahead"><a href="#${key.toLowerCase()}">${key}</a></span>`

        for(let j = 0; j < keys.length; j++)
        {
          let subkey = keys[j];
          let subvalue = db[subkey];
          
          if(subvalue.UNDE === key.toLowerCase())
          {
            html += `<a id="topic" href="#${subkey.toLowerCase()}">${subkey.toLowerCase()}</a>`;
          }
        }

        html += `
        </div>`
      }
    }

    return html;
}