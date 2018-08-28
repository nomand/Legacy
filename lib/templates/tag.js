function tagTemplate(db, target)
{
  let html = "";
  let sidebar = "";
  let content = "";

  let keys = Object.keys(db);
  let tags = target.split(" ");

  document.getElementById("photo").style.display = "none";

  let list = "";

  for(i = 1; i < tags.length; i++)
  {
    if(tags.length == 2) list = tags[i]; else if(i == tags.length-1) list += tags[i]; else list += tags[i] + ", ";
  }

  sidebar += `
    <div id="sidebar">
      <div class="collection">
        <h2>Entries tagged: <i>${list.toProperCase()}</i></h2>
      </div>
    </div>`;

  content += `<div id="presentation">`

  for (i = 0; i < keys.length; i++) 
  { 
    let value = db[keys[i]];
    if (typeof value.TAGS !== 'undefined')
    {
      for (let t = 0; t < value.TAGS.length; t++){
        for(b in tags){
          if (value.TAGS[t] == tags[b].toLowerCase()){
            content += `
            <div class="collection">
              <h2><a href="#${String(keys[i]).to_url()}">${keys[i].toProperCase()}</a></h2>
              <p>${db[keys[i]].DESC.to_curlic()}</p>
            </div>`
  }}}}}

  content += `</div>`;

  return html += sidebar + content;
}