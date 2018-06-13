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
            `<div class="entry">
                <a href="" class="project">${log[i].term}</a>
                <a href="" class="date">${log[i].date}</a>
                
                <div class="note">${log[i].note}
                ${log[i].pict != "" ? `<image class="pict" src="content/images/${log[i].pict}.jpg" />` : ``}
                </div>
             </div>`;
    }
    view += `</div>`;

    html.innerHTML = view;

    return html;
}