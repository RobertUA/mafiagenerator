let count; 
let rl=[]
let players=[];

function Hide()
{
    if(document.getElementById("list").style.display == "none") 
    {
        document.getElementById("list").style.display = "block";
        document.getElementById("roles").style.display = "none";
        document.getElementById("hide").textContent = "РОЛИ"
        localStorage.setItem("hide", 0);
    }
    else
    {
        document.getElementById("list").style.display = "none";
        document.getElementById("roles").style.display = "grid";
        document.getElementById("hide").textContent = "ИГРОКИ"
        localStorage.setItem("hide", 1);
    }
}

function Addp()
{
    if(Number(document.getElementById("count").value)<Number(document.getElementById("mafc").value))
    {
        let temp = document.getElementById("count").value;
        document.getElementById("count").value = document.getElementById("mafc").value;
        document.getElementById("mafc").value = temp;
    }
    if(Number(document.getElementById("count").value)<2 || Number(document.getElementById("mafc").value)<1) return 1;
    if(Number(document.getElementById("count").value)>299 || Number(document.getElementById("mafc").value)>149)
    {
        alert("Ти шо, дурак?");
        return 1;
    }

    if(localStorage.getItem('hide')==0 && document.getElementById("list").style.display=='none') 
    {
        document.getElementById("list").style.display = "block";
        document.getElementById("hide").textContent = "РОЛИ";
        document.getElementById("roles").style.display = "none";
    }

    document.getElementById("btn").disabled = true;
    document.getElementById("hide").disabled = true;
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
        if(document.getElementById("list").style.display == "none") localStorage.setItem("hide", 1);
        else localStorage.setItem("hide", 0);

        document.getElementById("btn").disabled = false;
        document.getElementById("hide").disabled = false;
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
                let input = document.createElement("div");
                input.textContent=count;
                input.readOnly=true;
                div.appendChild(input);
                input = document.createElement("div");
                input.textContent=players[i];
                input.style.cursor='default'
                if(input.textContent=="МАФИЯ" || input.textContent=="ДОН") input.style.backgroundColor="#b4b4b4";
                if(input.textContent=="ДОКТОР") input.style.backgroundColor="#8cc78f";
                if(input.textContent=="ПУТАНА") input.style.backgroundColor="#fd8dbb";
                if(input.textContent=="ШЕРИФ") input.style.backgroundColor="#9ac3e4";
                if(input.textContent=="ЖУРНАЛИСТ") input.style.backgroundColor="#86e9f7";
                if(input.textContent=="МАНЬЯК") input.style.backgroundColor="#d18775";
                if(input.textContent=="1ЕКСТРА1") input.style.backgroundColor="#d89dff";
                if(input.textContent=="2ЕКСТРА2") input.style.backgroundColor="#fffd9f";
                input.readOnly=true;
                input.style.cursor='pointer'
                input.addEventListener("click", function()
                {
                    var t = this.previousSibling;
                    t.style.backgroundColor = (t.style.backgroundColor == '') ? 'red' : '';
                    this.style.textDecoration = (this.style.textDecoration == 'line-through') ? 'none' : 'line-through';
                    this.style.color = (this.style.color == 'red') ? 'black' : 'red';
                })
                div.appendChild(input);
            }
            for(let i=0;i<players.length;i++)
            {
                localStorage.setItem("p"+i,players[i]);
            }
            updatevalues();
        }
    }
}

function load()
{
    if(localStorage.getItem("values")!=undefined)
    {
        let str = localStorage.getItem("values");
        if(str[0]=='1') document.getElementById("1").checked=true;
        if(str[1]=='1') document.getElementById("2").checked=true;
        if(str[2]=='1') document.getElementById("3").checked=true;
        if(str[3]=='1') document.getElementById("4").checked=true;
        if(str[4]=='1') document.getElementById("5").checked=true;
        if(str[5]=='1') document.getElementById("6").checked=true;
        if(str[6]=='1') document.getElementById("7").checked=true;
        if(str[7]=='1') document.getElementById("8").checked=true;
    }
    if(localStorage.getItem("mafcount")!=undefined) document.getElementById("mafc").value = localStorage.getItem("mafcount");
    if(localStorage.getItem("playerscount")!=undefined) document.getElementById("count").value = localStorage.getItem("playerscount");

    if(localStorage.length<=0) alert("[2.2] Была обновОчка\n - Данные сохраняются\n - У ролей есть цвета\n - Переключение вида \"ИГРОКИ/РОЛИ\"");

    if(localStorage.getItem("version")!="2.3") 
    {
        alert("[2.3] Была обновОчка\n - Клик по игроку, чтобы зачеркнуть (выгнали/убили)\n - Текст в списке не должен выделяться");
    }
    if(localStorage.length<=4) 
    {
        localStorage.setItem('hide', 0);
        document.getElementById("hide").textContent = "ИГРОКИ"
        document.getElementById("list").style.display = "none";
        document.getElementById("hide").disabled = true;
        return 1;
    }

    if(localStorage.getItem('hide') == 0) 
    {
        document.getElementById("list").style.display = "block";
        document.getElementById("roles").style.display = "none";
        document.getElementById("hide").textContent = "РОЛИ"
    }
    else 
    {
        document.getElementById("list").style.display = "none";
        document.getElementById("roles").style.display = "grid";
        document.getElementById("hide").textContent = "ИГРОКИ"
    }

    let count = 0;
    for(let i=0; i<document.getElementById("count").value;i++)
    {
        count++;
        let div = document.createElement("div");
        div.className="row unselectable";
        document.getElementById("list").appendChild(div);
        let input = document.createElement("div");
        input.textContent=count;
        input.readOnly=true;
        input.className='unselectable';
        div.appendChild(input);
        input = document.createElement("div");
        input.textContent=localStorage.getItem("p"+i);
        input.readOnly=true;
        if(input.textContent=="МАФИЯ" || input.textContent=="ДОН") input.style.backgroundColor="#b4b4b4";
        if(input.textContent=="ДОКТОР") input.style.backgroundColor="#8cc78f";
        if(input.textContent=="ПУТАНА") input.style.backgroundColor="#fd8dbb";
        if(input.textContent=="ШЕРИФ") input.style.backgroundColor="#9ac3e4";
        if(input.textContent=="ЖУРНАЛИСТ") input.style.backgroundColor="#86e9f7";
        if(input.textContent=="МАНЬЯК") input.style.backgroundColor="#d18775";
        if(input.textContent=="1ЕКСТРА1") input.style.backgroundColor="#d89dff";
        if(input.textContent=="2ЕКСТРА2") input.style.backgroundColor="#fffd9f";
        input.style.cursor='pointer'
        input.className='unselectable';
        input.addEventListener("click", function()
        {
            var t = this.previousSibling
            t.style.backgroundColor = (t.style.backgroundColor == '') ? 'red' : '';
            this.style.textDecoration = (this.style.textDecoration == 'line-through') ? 'none' : 'line-through';
            this.style.color = (this.style.color == 'red') ? 'black' : 'red';
        })
        div.appendChild(input);
    }
    localStorage.setItem("version", "2.3");
}

function clear()
{
    localStorage.clear();
    while (document.getElementById("list").firstChild) 
    {
        document.getElementById("list").removeChild(document.getElementById("list").firstChild);
    }
}

function updatevalues()
{
    let str = "";
    if(document.getElementById("1").checked==true) str+='1'; else str+='0';
    if(document.getElementById("2").checked==true) str+='1'; else str+='0';
    if(document.getElementById("3").checked==true) str+='1'; else str+='0';
    if(document.getElementById("4").checked==true) str+='1'; else str+='0';
    if(document.getElementById("5").checked==true) str+='1'; else str+='0';
    if(document.getElementById("6").checked==true) str+='1'; else str+='0';
    if(document.getElementById("7").checked==true) str+='1'; else str+='0';
    if(document.getElementById("8").checked==true) str+='1'; else str+='0';
    localStorage.setItem("values", str);
    localStorage.setItem("mafcount",  document.getElementById("mafc").value);
    localStorage.setItem("playerscount", document.getElementById("count").value);
}