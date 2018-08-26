function collectionTemplate(db, target)
{
  let html = "";
  let sidebar = "";
  let content = "";

  var keys = Object.keys(db);

  if(typeof db[target].HEAD !== 'undefined')
  {
    document.getElementById("photo").style.display = "block";
    document.getElementById("photo").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
  }
  else
  {
    document.getElementById("photo").style.display = "none";
  }
  
  if(typeof db[target].DESC !== 'undefined')
  {
    sidebar += `
      <div id="sidebar">
        <div class="intro"><p>${db[target].DESC.to_curlic()}</p></div>
      </div>`
  }

  for(let i = 0; i < keys.length; i++)
  {
    let key = keys[i];
    let value = db[key];

    if(value.FROM !== 'undefined' && value.FROM === target.toLowerCase())
    {
      content += `
      <div id="presentation">
        <div class="collection">
          <h2><a href="#${String(key).to_url()}">${key.toProperCase()}</a></h2>
          <p>${db[key].DESC.to_curlic()}</p>
        </div>
      </div>`
    }
  }
  return html += sidebar + content;
}