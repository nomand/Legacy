function Wrap()
{
  this.database = null;
  this.keys = null;

  this.install = function()
  {
    this.database = new Indental(DATABASE).parse();
    this.keys = Object.keys(this.database);
    this.process();
  }

  this.process = function()
  {
    for (i = 0; i < this.keys.length; i++) 
    { 
      let value = this.database[this.keys[i]];

      if (typeof value.TAGS !== 'undefined')
      {
        let tags = value.TAGS.split(",");
        for (let t = 0; t < tags.length; t++)
        {
          tags[t] = tags[t].trim().toLowerCase();
        }

        this.database[this.keys[i]].TAGS = tags;
      }
    }
  }

  this.getTemplate = function(target)
  {
    let keys = Object.keys(this.database);
    let splitTarget = target.split(" ");

    if (splitTarget[0].trim() === 'TAG')
    {
      document.getElementById("content").innerHTML = window['tagTemplate'](this.database, target);
    }
    else
    {
      let template = this.database[Object.keys(this.database)[keys.indexOf(target)]].VIEW;
      if(template !== 'undefined')
        document.getElementById("content").innerHTML = window[template + 'Template'](this.database, target);
    }
  }
}