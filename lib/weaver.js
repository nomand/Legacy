let DATABASE = {};

function Weaver()
{
    html = document.body;
    let j = new Scribe(DATABASE.daily).parse();
    let view = ``;
    
    view += doHeader("0003");
    view += `<div class="content">${doJournal(j)}</div>`;
    view += doFooter();

    html.innerHTML = view;

    function doJournal(log)
    {
        let posts = ``
        for(i in log)
        {
            if(log[i].term != "")
                posts += `
                <div class="entry">
                    <a href="#${String(log[i].term).to_url()}" class="project">${log[i].term}</a>
                    <a href="" class="date">${log[i].date}</a>
                    <div class="note">${log[i].note}</div>
                    ${log[i].pict != "" ? `<div class="pict round" style="background-image: url('content/images/${log[i].pict}.jpg');" ></div>` : ``}
                </div>`;
        }
        return posts;
    }

    function doHeader(img)
    {
        return `
        <div id="header" style="background-image: url('assets/img/noise.png'), url('content/images/${img}.jpg');">
            <a id="logo" href="#home"></a>
        </div>`;
    }

    function doFooter()
    {
        return `
        <div id="footer">
            <div id="fwrap">
                <a id="footerlogo" href="#home"></a>
                <a class="icon" href="#home"></a>
                <a class="icon" href="#home"></a>
                <a class="icon" href="#home"></a>
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

window.onhashchange = function()
{
  console.log("moving away");
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

    if(scroll > header.offsetHeight - 130)
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

window.addEventListener("scroll", on_scroll);
//window.addEventListener("hashchange", function() );