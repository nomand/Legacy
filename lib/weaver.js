let DATABASE = {};

function Weaver()
{
    html = document.body;
    let j = new Scribe(DATABASE.daily).parse();
    let view = ``;
    let num_posts = 0;
    let num_media = 0;
    let latestpic = null;
    let posts = ``

    view += doHeader(latestpic);
    view += `<div id="content">${doJournal(j)}</div>`;
    view += doFooter();

    html.innerHTML = view;

    function doJournal(log)
    {
        posts += doStats(log);

        for(i in log)
        {
            if(log[i].term != "")
            {
                posts += `
                <div id="entry">
                    <a href="#${String(log[i].term).to_url()}" id="project">${log[i].term}</a>
                    <a href="" id="date">${log[i].date}</a>
                    <div id="note">${log[i].note}</div>
                    ${ log[i].pict != "" ? `<div id="pict" class="round" style="background-image: url('content/images/${log[i].pict}.jpg');" ></div>` : `` }
                </div>`;
            }
        }
        return posts;
    }

    function doStats(log)
    {
        for(i in log)
        {
            if(log[i].term != "")
                num_posts++;
            if( log[i].pict != "")
            {
                num_media++;
                if( latestpic == null)
                    latestpic = `${log[i].pict}`;
            }
        }
        return `<div id="stats">
                    <div id="stat" class="round">${num_posts + String(num_posts>1?" updates":" update")}</div>
                    <div id="stat" class="round">${num_media + String(num_media>1?" visuals":" visual")}</div>
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
            <div id="fwrap">
                <a class="icon twitter" href="twitter.com/nomand"></a>
                <a class="icon github" href="github.com/nomand"></a>
                <a class="logo round" href="#home"></a>
            </div>
        </div>`;
    }
    location.hash = "home";
}

function getProject(project)
{
    window.location.hash = project;
}

function showImage(img)
{
    document.body.innerHTML +=
    `<div class="lightbox">
        <div style="background-image: url('content/images/${img}.jpg');"></div>
    </div>`;
}

String.prototype.to_url = function()
{
  return this.toLowerCase().replace(/ /g,"+").replace(/[^0-9a-z\+]/gi,"").trim();
}

function navigate()
{
  console.log(`navigating to ${window.location.hash}`);
}

function lateUpdate()
{
    console.log();
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

window.addEventListener("load", lateUpdate);
window.addEventListener("scroll", on_scroll);
window.addEventListener("hashchange", navigate );