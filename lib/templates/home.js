function homeTemplate(dbKeys, TYPE)
{
    let html = "";
    
    console.log(TYPE + " generating:")

    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.PRNT !== 'undefined')
      {
        if(value.PRNT === 'home')
        {
            console.log(key)
            html += `<div>${key}</div>`
        }
      }
    }

    return html;
}