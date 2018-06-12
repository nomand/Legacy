let DATABASE = {};

function Weaver()
{
    let log = new Scribe(DATABASE.daily).parse();
    html = document.body;

    let view =`
    <div class="fullscreen">
        <div class="header"></div>
    `;

    for(i in log)
    {
        if(log[i].term != "")
            view += 
            `<div class="entry"><div class="date">${log[i].date}</div>
                <div class="project">${log[i].term}</div>
                <div class="note">${log[i].note}</div>
             </div>`;
    }
    view += `</div>`;

    html.innerHTML = view;

    return html;
}