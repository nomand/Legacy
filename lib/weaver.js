this.DB = new Scribe(DATABASE.daily).parse();
let stats = {num_posts: 0, num_media: 0, num_topics: 0, num_tags: 0, latestpic: null};
let view = ``;
let posts = ``;

function Weaver()
{
    html = document.body;

    getStats(DB);
    view += doHeader(stats.latestpic);
    view += `<div id="content">${doJournal(DB)}</div>`;
    view += doFooter();

    html.innerHTML = view;
    location.hash = "home";
}

function doJournal(log)
{
    posts += doStats(log);
    for(i in log)
    {
        if(log[i].term != "")
        {
            posts += `
            <div id="entry">
                <a href="#${String(log[i].term).to_url()}" id="project">${log[i].term}</a><a href="#${String(log[i].date).to_url()}" id="date">${log[i].date}</a>
                <div id="note">${log[i].note}</div>
                ${ log[i].pict != "" ? `<div id="pict" class="round" style="background-image: url('content/images/${log[i].pict}.jpg');" onClick="showImage(${i})"></div>` : `` }
            </div>`;
        }
    }
    return posts;
}

function getStats(log)
{
    let topics = [];
    for(i in log)
    {
        if(log[i].term != "")
        {
            stats.num_posts++;
            if(topics.indexOf(log[i].term) == -1)
            {
                topics.push(log[i].term);
            }
        }
        if( log[i].pict != "")
        {
            stats.num_media++;
            if( stats.latestpic == null)
                stats.latestpic = `${log[i].pict}`;
        }
    }
    stats.num_topics = topics.length;
}

function doStats(log)
{
    return `<div id="stats">
        <a id="stat" class="round" href="#">${stats.num_posts + String(stats.num_posts>1?" updates":" update")}</a>
        <a id="stat" class="round" href="#visuals">${stats.num_media + String(stats.num_media>1?" visuals":" visual")}</a>
        <a id="stat" class="round" href="#">${stats.num_topics + String(stats.num_topics>1?" topics":" topic")}</a>
        <a id="stat" class="round" href="#">${stats.num_tags + String(stats.num_tags>1?" tags":" tag")}</a>
    </div>`;
}

function doHeader(img)
{
    if(img == null){ img = `0000`; }
    return `
    <div id="header" style="background-image: url('assets/img/noise.png'), url('content/images/${img}.jpg');">
        <a id="logo" class="logo" href="#home"></a>
    </div>`;
}

function doFooter()
{
    return `
    <div id="footer">
        <div id="footerwrap">
            <a class="icon twitter" href="http://twitter.com/nomand"></a>
            <a class="icon github" href="http://github.com/nomand"></a>
            <a class="logo round" href="#home"></a>
            <div class="credit">nomand © <span class="grey">${DB[DB.length-1].date} - ${DB[0].date}</span></div>
        </div>
    </div>`;
}

function showImage(entry)
{
    document.body.innerHTML +=
    `<div id="lightbox" onClick="hideImage()">
        <div id="showcase" class="round">
            <img id="img" src="content/images/${DB[entry].pict}.jpg" >
            <div id="post">
                <a href="#${String(DB[entry].term).to_url()}" id="project">${DB[entry].term}</a><a href="#${String(DB[entry].date).to_url()}" id="date">${DB[entry].date}</a>
                <div id="note">${DB[entry].note}</div>
            </div>
        </div>
    </div>`;
}

function doVisuals()
{
    let content = document.getElementById("content");
    reset(content);
    doStats(DB)
    
    for(i in DB)
    {
        if(DB[i].term != "")
        {
            if(DB[i].pict != "")
            {
                content.innerHTML += `<div id="pict" class="round" style="background-image: url('content/images/${DB[i].pict}.jpg');"></div>`
            } 
        }
    }
}

function hideImage()
{
    document.getElementById("lightbox").remove();
}

String.prototype.to_url = function()
{
  return this.toLowerCase().replace(/ /g,"+").replace(/[^0-9a-z\+]/gi,"").trim();
}

function navigate()
{
    if(window.location.hash == "#visuals")
        doVisuals();

    console.log(`navigating to ${window.location.hash}`);
}

function lateUpdate()
{
    console.log("loaded");
}

function reset(el)
{
    el.innerHTML = "";
}

function on_scroll()
{
    var scroll = window.scrollY;
    var logo = document.getElementById("logo");
    var header = document.getElementById("header")

    if(scroll > header.offsetHeight - 120)
    {
        if(!logo.classList.contains("sticky"))
            logo.classList.add("sticky");
    }
    else
    {
        if(logo.classList.contains("sticky"))
            logo.classList.remove("sticky");
    }
}

window.addEventListener("load", lateUpdate );
window.addEventListener("scroll", on_scroll );
window.addEventListener("hashchange", navigate );