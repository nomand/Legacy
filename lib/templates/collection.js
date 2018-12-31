function collectionTemplate(db, target)
{
  let html = "", sidebar = "", content = "";
  let keys = Object.keys(db);
 
  sidebar = MakeSidebar(db, target);

  for(let i = 0; i < keys.length; i++)
  {
    let key = keys[i];
    let value = db[key];
    if(value.FROM !== 'undefined' && value.FROM === target.toLowerCase())
    {
      content += `<div class="collection">`;
      content += `<h2><a href="#${String(keys[i]).to_url()}">${keys[i].toProperCase()}</a></h2>`;
      content += `<img src='content/images/${db[key].HEAD}' class='inline'/>`;
      content += `${new Runic(db[key].LONG, Curlic)}`;
      content += `</div>`;
      // let imageCode = String(db[key].HEAD).split('.')[0];
      // let img = imageCode == 'undefined' ? `` : `<img src="content/micro/` + imageCode + `.png" />`;

      // content += `
      //   <div class="collection">
      //     <div class="thumbbg">
      //       ${img}
      //     </div>
      //     <h2><a href="#${String(key).to_url()}">${key.toProperCase()}</a></h2>
      //     <p>${db[key].DESC.to_curlic()}</p>
      //   </div>`
    }
  }
  return html += sidebar + `<div id="presentation">${content}</div>`;
}