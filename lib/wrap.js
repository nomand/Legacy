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

  this.render = function(target)
  {
    new View().make(this.database, target);
  }
}