this.DB = new Scribe(DATABASE.daily).parse();
let stats = {num_posts: 0, num_media: 0, num_topics: 0, num_tags: 0, latestpic: null};
let post = 0;
let page = 0;
let lastpost = -1;
let postsatatmie = 10;

function Weaver()
{
    let view = ``;
    let html = document.body;
    
    getStats(DB);
    view += doHeader(stats.latestpic);
    view += `<div id="content">${doStats(DB)}${doJournal(DB)}</div>`;
    view += doFooter();

    html.innerHTML = view;
    location.hash = "journal";
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
        <a id="stat" class="round" href="#journal">${stats.num_posts + String(stats.num_posts>1?" updates":" update")}</a>
        <a id="stat" class="round" href="#visuals">${stats.num_media + String(stats.num_media>1?" visuals":" visual")}</a>
        <a id="stat" class="round" href="#topics">${stats.num_topics + String(stats.num_topics>1?" topics":" topic")}</a>
        <a id="stat" class="round" href="#">${stats.num_tags + String(stats.num_tags>1?" tags":" tag")}</a>
    </div>`;
}

function doHeader(img)
{
    if(img == null){ img = `0000`; }
    return `
    <div id="header" style="background-image: url('assets/img/noise.png'), url('content/images/${img}.jpg');">
        <a id="logo" class="logo" href="#journal"></a>
    </div>`;
}

function doFooter()
{
    return `
    <div id="footer">
        <div id="footerwrap">
            <a class="icon twitter" href="http://twitter.com/nomand"></a>
            <a class="icon github" href="http://github.com/nomand"></a>
            <a class="logo round" href="#journal"></a>
            <div class="credit">nomand © <span class="grey">${DB[DB.length-1].date} - ${DB[0].date}</span></div>
        </div>
    </div>`;
}

function doJournal(db)
{
    let posts = ``;
    page += postsatatmie;

    for(var i = lastpost + 1; i < db.length; i++)
    {
        if(db[i].term != "" && post < page)
        {
            posts += `
            <div id="entry">
                <a href="#${String(db[i].term).to_url()}" id="project">${db[i].term}</a><span id="date">${db[i].date}</span>
                <div id="note">${db[i].note}</div>
                ${ db[i].pict != "" ? `<div id="pict" class="round" style="background-image: url('content/images/${db[i].pict}.jpg');" onClick="showImage(${i})"></div>` : `` }
            </div>`;
            post++
            lastpost = i;
        }
    }
    posts += doPagination();
    return posts;
}

function doPagination()
{
    return `
    <div id="pagination">
        <a id="loadmore" onClick="loadMore();">${post < stats.num_posts ? `Load Older ▼` : `At the end.`}</a>
    </div>
    `
}

function loadMore()
{
    pagination.remove();
    document.getElementById("content").innerHTML += doJournal(DB);
}

function doVisuals()
{
    let posts =``;
    posts += doStats(DB);

    for(i in DB)
    {
        if(DB[i].term != "")
        {
            if(DB[i].pict != "")
            {
                posts += `<div id="gallerypic" class="round" style="background-image: url('content/images/${DB[i].pict}.jpg');"></div>`
            }
        }
    }
    return posts;
}

function doTopics()
{
    let posts = ``;
    posts += doStats(DB);
    let alphabet = [["A"], ["B"], ["C"], ["D"], ["E"], ["F"], ["G"], ["H"], ["I"], ["J"], ["K"], ["L"], ["M"], ["N"], ["O"], ["P"], ["Q"], ["R"], ["S"], ["T"], ["U"], ["V"], ["W"], ["X"], ["Y"], ["Z"]];

    for(i in DB)
    {
        if(DB[i].term != "")
        {
            let alpha = DB[i].term.substr(0,1).toUpperCase();
            
            for(letter in alphabet)
            {
                if(alphabet[letter][0] == alpha && !alphabet[letter].includes(DB[i].term))
                {
                    alphabet[letter].push(DB[i].term);
                }
            }
        }
    }
    console.log(alphabet)

    alphabet.sort()

    for(i in alphabet)
    {
        if(alphabet[i].length > 1)
        {
            posts += `<div id="topicblock"><span id="topicalphabet">${alphabet[i][0]}</span>`
            for(j=1; j<alphabet[i].length; j++)
            {
                posts += `<a href="#${alphabet[i][j].to_url()}" id="topic">${alphabet[i][j]}</a>`
            }
            posts += `</div>`
        }
    }
    posts+= `<hr>`
    return posts;
}

function showImage(entry)
{
    document.body.innerHTML +=
    `<div id="lightbox" onClick="this.remove()">
        <div id="showcase" class="round">
            <img id="img" src="content/images/${DB[entry].pict}.jpg" >
            <div id="post">
                <a href="#${String(DB[entry].term).to_url()}" id="project">${DB[entry].term}</a><a href="#${String(DB[entry].date).to_url()}" id="date">${DB[entry].date}</a>
                <div id="note">${DB[entry].note}</div>
            </div>
        </div>
    </div>`;
}

function navigate()
{
    let content = document.getElementById("content");
    reset(content);

    if(window.location.hash == "#visuals")
        content.innerHTML += doVisuals();

    if(window.location.hash == "#journal")
    {
        post = 0; lastpost = -1; page = 0;
        content.innerHTML += doStats(DB);
        content.innerHTML += doJournal(DB);
    }

    if(window.location.hash == "#topics")
        content.innerHTML += doTopics();
}

function lateUpdate()
{
    console.log("loaded");
}

function reset(el)
{
    el.innerHTML = "";
}

String.prototype.to_url = function()
{
  return this.toLowerCase().replace(/ /g,"+").replace(/[^0-9a-z\+]/gi,"").trim();
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