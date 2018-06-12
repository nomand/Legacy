let DATABASE = {};

function Weaver()
{
    let log = new Scribe(DATABASE.daily).parse();
    
    html = document.body;

    for(i in log)
    {
        html.innerHTML += `${log[i].date}\n`;
    }

    return html;
}