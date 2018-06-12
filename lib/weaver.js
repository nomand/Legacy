let DATABASE = {};

function Weaver()
{
    let log = new Scribe(DATABASE.daily).parse();
    html = document.body;

    for(i in log)
    {
        if(log[i].term != "")
            html.innerHTML += `<span>${log[i].date}</span>\n`;
    }
    return html;
}