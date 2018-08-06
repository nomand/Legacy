function homeTemplate(dbKeys, TYPE)
{
    let html = "";
    
    this.db = new Indental(DATABASE).parse();
    var keys = Object.keys(db);

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.UNDE !== 'undefined' && value.UNDE === 'home')
      {
        html += `<div class="list">${key}`

        html += `</div>`
      }
    }

    return html;
}