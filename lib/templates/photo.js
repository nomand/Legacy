function photoTemplate(db, target)
{
  let content = "", related = "";
  $try(() => content += `<div id="presentation">${new Runic(db[target].LONG, Curlic) + related}</div>`);

  return MakeSidebar(db, target) + content;
}