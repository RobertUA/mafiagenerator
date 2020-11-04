let count; 
let rl=[]
let players=[];
function Addp()
{
    document.getElementById("btn").disabled = true;
    rl=[];
    players=[];
    for(let i=0; i<document.getElementById("count").value;i++)
    {
        players.push("мирный");
    }
    let c=Number(document.getElementById("mafc").value);
    if(document.getElementById("1").checked==true) rl.push("ПУТАНА");
    if(document.getElementById("2").checked==true) rl.push("ДОКТОР");
    if(document.getElementById("3").checked==true) rl.push("ШЕРИФ");
    if(document.getElementById("4").checked==true) 
    {
        c--;
        rl.push("ДОН");
    }
    if(document.getElementById("5").checked==true) rl.push("МАНЬЯК");
    if(document.getElementById("6").checked==true) rl.push("ЖУРНАЛИСТ");
    if(document.getElementById("7").checked==true) rl.push("1ЕКСТРА1");
    if(document.getElementById("8").checked==true) rl.push("2ЕКСТРА2");
    for(let i=0;i<c;i++)
    {
        rl.push("МАФИЯ");
    }
    let xmlr= "https://www.random.org/sequences/?min=0&max="+Number(document.getElementById("count").value-1)+"&col=1&format=plain";
    let http = new XMLHttpRequest()
    http.open('GET', xmlr);
    http.send(); // отправляем запрос на сервер
    http.onreadystatechange = function() 
    {
        clear();
        document.getElementById("btn").disabled = false;
        if (this.readyState == 4 && this.status == 200) 
        {
            let r = [];
            r= (this.response).split('\n');
            for(let i=0;i<rl.length;i++)
            {

                players[Number(r[i])]=rl[i];
            }
            count=0
            for(let i=0; i<document.getElementById("count").value;i++)
            {
                count++;
                let div = document.createElement("div");
                div.className="row";
                document.getElementById("list").appendChild(div);
                let input = document.createElement("input");
                input.value=count;
                input.readOnly=true;
                div.appendChild(input);
                input = document.createElement("input");
                input.value=players[i];
                input.readOnly=true;
                div.appendChild(input);
            }
        }
    }
}

function clear()
{
    while (document.getElementById("list").firstChild) 
    {
        document.getElementById("list").removeChild(document.getElementById("list").firstChild);
    }
}