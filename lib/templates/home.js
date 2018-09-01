function homeTemplate(db, target)
{
  let html = "";
  let keys = Object.keys(db);

  $try (function(){
    document.getElementById("photo").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
  })

  for(i in keys)
  {
    let key = keys[i];
    let value = db[key];

    if(value.FROM !== 'undefined' && value.FROM === 'home')
    {
      html += `<div id="topicblock"><span id="topichead"><a href="#${key.toLowerCase()}">${key}</a></span>`

      for(j in keys)
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