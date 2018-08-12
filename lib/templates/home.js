function homeTemplate(target)
{
  let html = "";
  
  this.db = new Indental(DATABASE).parse();
  var keys = Object.keys(db);

  document.getElementById("header").style.backgroundImage = "url('content/images/0000.jpg')";
  
  if(typeof db[target].DESC !== 'undefined')
  {
    html += `${new Runic(db[target].DESC).parse()}`;
  }

  for(let i = 0; i < keys.length; i++)
  {
    let key = keys[i];
    let value = db[key];

    if(value.FROM !== 'undefined' && value.FROM === 'home')
    {
      html += `<div id="topicblock"><span id="topichead"><a href="#${key.toLowerCase()}">${key}</a></span>`

      for(let j = 0; j < keys.length; j++)
      {
        let subkey = keys[j];
        let subvalue = db[subkey];
        
        if(subvalue.FROM === key.toLowerCase())
        {
          html += `<span id="topic"><a href="#${String(subkey).to_url()}">${subkey.toLowerCase()}</a></span>`;
        }
      }

      html += `</div>`
    }
  }
  return html;
}