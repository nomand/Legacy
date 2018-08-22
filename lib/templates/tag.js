function tagTemplate(db, target)
{
    let html = "";
    let keys = Object.keys(db);

    html += `<h2>Entries tagged: <i>${target.slice(4).toProperCase()}</h2></p>`;

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