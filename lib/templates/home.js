function homeTemplate(db)
{
  let html = "";
  let keys = Object.keys(db);

  for(i in keys)
  {
    let key = keys[i];
    let value = db[key];

    if(value.FROM !== 'undefined' && value.FROM === 'home')
    {
      html += `<div class="topicblock"><a class="topichead" href="#${key.toLowerCase()}">${key}</a>`

      for(j in keys)
      {
        let subkey = keys[j];
        let subvalue = db[subkey];
        
        if(subvalue.FROM === key.toLowerCase())
        {
          html += `<a class="topic" href="#${String(subkey).to_url()}">${subkey.toLowerCase()}</a>`;
        }
      }

      html += `</div>`
    }
  }
  return `<div id="home">${html}</div>`;
}