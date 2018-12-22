function tagTemplate(db, target)
{
  let html = "", sidebar = "", content = "";
  let keys = Object.keys(db);
  let tags = target.split(" ");

  let list = "";

  for(i = 1; i < tags.length; i++)
  {
    if(tags.length == 2) list = tags[i]; else if(i == tags.length-1) list += tags[i]; else list += tags[i] + ", ";
  }

  sidebar += `
    <div id="sidebar">
      <div class="desc">
        <h2>Entries tagged: <i>${list.toProperCase()}</i></h2>
      </div>
    </div>`;

  for (i = 0; i < keys.length; i++) 
  { 
    let value = db[keys[i]];
    if (typeof value.TAGS !== 'undefined')
    {
      for (let t = 0; t < value.TAGS.length; t++){
        for(b in tags){
          if (value.TAGS[t] == tags[b].toLowerCase()){
            
            let imageCode = String(db[keys[i]].HEAD).split('.')[0];
            let img = imageCode == 'undefined' ? `` : `<img src="content/micro/` + imageCode + `.png" />`;

            content += `
            <div class="collection">
              <div class="thumbbg">
              ${img}
              </div>
              <h2><a href="#${String(keys[i]).to_url()}">${keys[i].toProperCase()}</a></h2>
              <p>${db[keys[i]].DESC.to_curlic()}</p>
            </div>`
  }}}}}

  return html += sidebar + `<div id="presentation">${content}</div>`;
}