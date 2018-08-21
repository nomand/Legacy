function tagTemplate(db, target)
{
    let html = "";
    let keys = Object.keys(db);

    let tempDatabase = db;
    // if(typeof db[target].HEAD !== 'undefined')
    // {
    //   let style = document.getElementById("header").style.backgroundImage;
    //   document.getElementById("header").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
    // }

    // if(typeof db[target].DESC !== 'undefined')
    // {
    //   html += `<div class="collection">${new Runic(db[target].DESC).parse()}</div>`;
    // }

    html += `<p>Entries tagged: <i>${target.slice(4).toProperCase()}</i></p>`;

    var splitTarget = target.split(" ");

    for (i = 0; i < keys.length; i++) 
    { 
      let value = db[keys[i]];

      if (typeof value.TAGS !== 'undefined')
      {
        for (var t = 0; t < value.TAGS.length; t++)
        {
          if (value.TAGS[t] == splitTarget[1])
          {
            tempDatabase[keys[i]] = db[keys[i]];
          }
        }
      }
    }

    for(i in tempDatabase)
    {
      html += `${tempDatabase[i]}`;
    }

    console.log(tempDatabase);

    return html;
}