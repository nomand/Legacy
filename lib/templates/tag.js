function tagTemplate(db, target)
{
    let html = "";
    let keys = Object.keys(db);

    html += `<div class="collection"><h2>Entries tagged: <i>${target.slice(4).toProperCase()}</i></h2></div>`;

    var splitTarget = target.split(" ");
    
    for (i = 0; i < keys.length; i++) 
    { 
      let value = db[keys[i]];

      if (typeof value.TAGS !== 'undefined')
      {
        for (var t = 0; t < value.TAGS.length; t++)
        {
          if (value.TAGS[t] == splitTarget[1].toLowerCase())
          {
            html += `
            <div class="collection">
              <h2><a href="#${String(keys[i]).to_url()}">${keys[i].toProperCase()}</a></h2>
              ${new Runic(db[keys[i]].DESC).parse()}
            </div>`
          }
        }
      }
    }

    return html;
}