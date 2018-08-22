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
        var tags = value.TAGS.split(",");
        for (var t = 0; t < tags.length; t++)
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
    var splitTarget = target.split(" ");

    if (splitTarget[0].trim() === 'TAG')
      document.getElementById("content").innerHTML = window['tagTemplate'](this.database, target);
    else
    {
      let template = this.database[Object.keys(this.database)[keys.indexOf(target)]].VIEW;
      if(template !== 'undefined')
        document.getElementById("content").innerHTML = window[template + 'Template'](this.database, target);
    }
  }

  this.stats = function(db = this.database)
  {
    // CALCULATE
    let dbKeys = Object.keys(db);
    
    var stats = 
    {
      total: this.keys.length,
      types: {},
      tags: {}
    };

    for (var i = 0; i < dbKeys.length; i++)
    {
      // TYPE
      if (typeof db[dbKeys[i]].TYPE !== 'undefined')
      {
        if (typeof stats.types[db[dbKeys[i]].TYPE] !== 'undefined')
        {
          stats.types[db[dbKeys[i]].TYPE] ++;
        }
        else
        {
          stats.types[db[dbKeys[i]].TYPE] = 1;
        }
      }

      // TAGS
      if (typeof db[dbKeys[i]].TAGS !== 'undefined')
      {
        for (var t = 0; t < db[dbKeys[i]].TAGS.length; t++) 
        {
          if (typeof stats.tags[db[dbKeys[i]].TAGS[t]] !== 'undefined')
          {
            stats.tags[db[dbKeys[i]].TAGS[t]] ++;
          }
          else
          {
            stats.tags[db[dbKeys[i]].TAGS[t]] = 1;
          }
        }
      }
    } 

    // SORT TYPES, TAKE TOP X
    // Create items array
    var typeItems = Object.keys(stats.types).map(function(key) 
    {
      return [key, stats.types[key]];
    });
    // Sort the array based on the second element
    typeItems.sort(function(first, second) 
    {
      return second[1] - first[1];
    });
    stats.types = typeItems;

    // SORT TAGS, TAKE TOP X
    // Create items array
    var tagItems = Object.keys(stats.tags).map(function(key) 
    {
      return [key, stats.tags[key]];
    });
    // Sort the array based on the second element
    tagItems.sort(function(first, second) 
    {
      return second[1] - first[1];
    });
    stats.tags = tagItems;

    return stats;
  }
}