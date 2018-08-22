function collectionTemplate(db, target)
{
    let html = "";
    let sidebar = "";
    let content = "";

    var keys = Object.keys(db);

    if(typeof db[target].HEAD !== 'undefined')
    {
      let style = document.getElementById("header").style.backgroundImage;
      document.getElementById("header").style.backgroundImage = "url('content/images/"+ db[target].HEAD + "')";
    }

    function generateUrl(tag)
    {
      return `<a href="#tag+${tag}">${tag.toProperCase()}</a>`
    }

    if(typeof db[target].DESC !== 'undefined')
    {
      sidebar += `
        <div id="sidebar">
          <div class="intro">${new Runic(db[target].DESC).parse()}</div>
        </div>`
    }

    for(let i = 0; i < keys.length; i++)
    {
      let key = keys[i];
      let value = db[key];

      if(value.FROM !== 'undefined' && value.FROM === target.toLowerCase())
      {
        content += `
        <div class="presentation">
          <div class="collection">
            <h2><a href="#${String(key).to_url()}">${key.toProperCase()}</a></h2>
            ${new Runic(db[key].DESC).parse()}
          </div>
        </div>`
      }
    }
    return html += sidebar + content;
}