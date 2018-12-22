function projectTemplate(db, target)
{
  return MakeSidebar(db, target) + $try(() => `<div id="presentation">${new Runic(db[target].LONG, Curlic)}</div>`);
}