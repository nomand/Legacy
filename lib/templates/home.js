function homeTemplate(dbKeys, TMPL)
{
    let html = "";
    
    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);

    document.getElementById("header").style.backgroundImage = "url('content/images/0000.jpg')";
    
    html += `<div id="description">${db[dbKeys].DESC}</div>`;

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.UNDE !== 'undefined' && value.UNDE === 'home')
      {
        html += `<div id="topicblock"><span id="topichead"><a href="#${key.toLowerCase()}">${key}</a></span>`

        for(let j = 0; j < keys.length; j++)
        {
          let subkey = keys[j];
          let subvalue = db[subkey];
          
          if(subvalue.UNDE === key.toLowerCase())
          {
            html += `<span id="topic"><a href="#${subkey.toLowerCase()}">${subkey.toLowerCase()}</a></span>`;
          }
        }

        html += `</div>`
      }
    }
    return html;
}