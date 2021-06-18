let count; 
let rl=[]
let players=[];

current_version="2.4"

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
        players.push(document.getElementById("f11").textContent);
    }
    
    let c=Number(document.getElementById("mafc").value);
    if(document.getElementById("1").checked==true) rl.push(document.getElementById("f1").textContent);
    if(document.getElementById("2").checked==true) rl.push(document.getElementById("f2").textContent);
    if(document.getElementById("3").checked==true) rl.push(document.getElementById("f3").textContent);
    if(document.getElementById("4").checked==true) 
    {
        c--;
        rl.push(document.getElementById("f4").textContent);
    }
    if(document.getElementById("5").checked==true) rl.push(document.getElementById("f5").textContent);
    if(document.getElementById("6").checked==true) rl.push(document.getElementById("f6").textContent);
    if(document.getElementById("7").checked==true) rl.push(document.getElementById("f7").textContent);
    if(document.getElementById("8").checked==true) rl.push(document.getElementById("f8").textContent);
    if(document.getElementById("9").checked==true) rl.push(document.getElementById("f9").textContent);
    if(document.getElementById("10").checked==true) rl.push(document.getElementById("f10").textContent);
    for(let i=0;i<c;i++)
    {
        rl.push(document.getElementById("f12").textContent);
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
                if(input.textContent==document.getElementById("f12").textContent || input.textContent==document.getElementById("f4").textContent) input.style.backgroundColor="#b4b4b4";
                if(input.textContent==document.getElementById("f1").textContent) input.style.backgroundColor="#fd8dbb"; // Путана
                if(input.textContent==document.getElementById("f2").textContent) input.style.backgroundColor="#8cc78f"; //ДОКТОР
                if(input.textContent==document.getElementById("f3").textContent) input.style.backgroundColor="#9ac3e4"; //ШЕРИФ
                if(input.textContent==document.getElementById("f5").textContent) input.style.backgroundColor="#d18775"; //МАНЬЯК
                if(input.textContent==document.getElementById("f6").textContent) input.style.backgroundColor="#86e9f7"; //ЖУРНАЛИСТ
                if(input.textContent==document.getElementById("f7").textContent) input.style.backgroundColor="#d89dff"; //1ЕКСТРА1
                if(input.textContent==document.getElementById("f8").textContent) input.style.backgroundColor="#fffd9f"; //2ЕКСТРА2
                if(input.textContent==document.getElementById("f9").textContent) input.style.backgroundColor="#c8f54c"; //3ЕКСТРА3
                if(input.textContent==document.getElementById("f10").textContent) input.style.backgroundColor="#6c9c98"; //4ЕКСТРА4
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
            for(let i=1; i<=12;i++) updaterolesnames(""+i);
            updatevalues();
        }
    }
}

function load()
{
    if(localStorage.getItem("version")==undefined || localStorage.getItem("version")!=current_version || localStorage.length<=1) 
    {
        alert("[2.4 NEW]\
        \n - Числовые поля теперь числовые :)\
        \n - Можно переименовать роли (стереть чтоб востановить стандартное имя роли)\
        \n - Переключение [вкл/выкл] роль (теперь и по нажатию на текст, а не только по чекбоксах)\
        \n[2.3]\
        \n - Клик по игроку, чтобы зачеркнуть его (выгнали/убили)\
        \n - Текст в списке не должен выделяться\
        \n[2.2]\
        \n - Данные сохраняются\
        \n - У ролей есть цвета\
        \n - Переключение вида \"ИГРОКИ/РОЛИ\"\
        ");
    }
    localStorage.setItem("version", current_version);

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
        if(str[8]=='1') document.getElementById("9").checked=true;
        if(str[9]=='1') document.getElementById("10").checked=true;
    }

    if(localStorage.getItem("n1")!=undefined && localStorage.getItem("n1")!="" && localStorage.getItem("n1")!=getdflt("1")) { 
        document.getElementById("f1").textContent=localStorage.getItem("n1");
        document.getElementById("n1").value=document.getElementById("f1").textContent;
    }
    else document.getElementById("f1").textContent=getdflt("1");

    if(localStorage.getItem("n2")!=undefined && localStorage.getItem("n2")!="" && localStorage.getItem("n2")!=getdflt("2")) { 
        document.getElementById("f2").textContent=localStorage.getItem("n2");
        document.getElementById("n2").value=document.getElementById("f2").textContent;
    }
    else document.getElementById("f2").textContent=getdflt("2");

    if(localStorage.getItem("n3")!=undefined && localStorage.getItem("n3")!="" && localStorage.getItem("n3")!=getdflt("3")) { 
        document.getElementById("f3").textContent=localStorage.getItem("n3");
        document.getElementById("n3").value=document.getElementById("f3").textContent;
    }
    else document.getElementById("f3").textContent=getdflt("3");

    if(localStorage.getItem("n4")!=undefined && localStorage.getItem("n4")!="" && localStorage.getItem("n4")!=getdflt("4")) { 
        document.getElementById("f4").textContent=localStorage.getItem("n4");
        document.getElementById("n4").value=document.getElementById("f4").textContent;
    }
    else document.getElementById("f4").textContent=getdflt("4");

    if(localStorage.getItem("n5")!=undefined && localStorage.getItem("n5")!="" && localStorage.getItem("n5")!=getdflt("5")) { 
        document.getElementById("f5").textContent=localStorage.getItem("n5");
        document.getElementById("n5").value=document.getElementById("f5").textContent;
    }
    else document.getElementById("f5").textContent=getdflt("5");

    if(localStorage.getItem("n6")!=undefined && localStorage.getItem("n6")!="" && localStorage.getItem("n6")!=getdflt("6")) { 
        document.getElementById("f6").textContent=localStorage.getItem("n6");
        document.getElementById("n6").value=document.getElementById("f6").textContent;
    }
    else document.getElementById("f6").textContent=getdflt("6");

    if(localStorage.getItem("n7")!=undefined && localStorage.getItem("n7")!="" && localStorage.getItem("n7")!=getdflt("7")) { 
        document.getElementById("f7").textContent=localStorage.getItem("n7");
        document.getElementById("n7").value=document.getElementById("f7").textContent;
    }
    else document.getElementById("f7").textContent=getdflt("7");

    if(localStorage.getItem("n8")!=undefined && localStorage.getItem("n8")!="" && localStorage.getItem("n8")!=getdflt("8")) { 
        document.getElementById("f8").textContent=localStorage.getItem("n8");
        document.getElementById("n8").value=document.getElementById("f8").textContent;
    }
    else document.getElementById("f8").textContent=getdflt("8");

    if(localStorage.getItem("n9")!=undefined && localStorage.getItem("n9")!="" && localStorage.getItem("n9")!=getdflt("9")){ 
        document.getElementById("f9").textContent=localStorage.getItem("n9");
        document.getElementById("n9").value=document.getElementById("f9").textContent;
    }
    else document.getElementById("f9").textContent=getdflt("9");

    if(localStorage.getItem("n10")!=undefined && localStorage.getItem("n10")!="" && localStorage.getItem("n10")!=getdflt("10")) { 
        document.getElementById("f10").textContent=localStorage.getItem("n10");
        document.getElementById("n10").value=document.getElementById("f10").textContent;
    }
    else document.getElementById("f10").textContent=getdflt("10");

    if(localStorage.getItem("n11")!=undefined && localStorage.getItem("n11")!="" && localStorage.getItem("n11")!=getdflt("11")) { 
        document.getElementById("f11").textContent=localStorage.getItem("n11");
        document.getElementById("n11").value=document.getElementById("f11").textContent;
    }
    else document.getElementById("f11").textContent=getdflt("11");

    if(localStorage.getItem("n12")!=undefined && localStorage.getItem("n12")!="" && localStorage.getItem("n12")!=getdflt("12")) { 
        document.getElementById("f12").textContent=localStorage.getItem("n12");
        document.getElementById("n12").value=document.getElementById("f12").textContent;
    }
    else document.getElementById("f12").textContent=getdflt("12");

    if(localStorage.getItem("mafcount")!=undefined) document.getElementById("mafc").value = localStorage.getItem("mafcount");
    if(localStorage.getItem("playerscount")!=undefined) document.getElementById("count").value = localStorage.getItem("playerscount");

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
        if(input.textContent==document.getElementById("f12").textContent || input.textContent==document.getElementById("f4").textContent) input.style.backgroundColor="#b4b4b4";
        if(input.textContent==document.getElementById("f1").textContent) input.style.backgroundColor="#fd8dbb"; // Путана
        if(input.textContent==document.getElementById("f2").textContent) input.style.backgroundColor="#8cc78f"; //ДОКТОР
        if(input.textContent==document.getElementById("f3").textContent) input.style.backgroundColor="#9ac3e4"; //ШЕРИФ
        if(input.textContent==document.getElementById("f5").textContent) input.style.backgroundColor="#d18775"; //МАНЬЯК
        if(input.textContent==document.getElementById("f6").textContent) input.style.backgroundColor="#86e9f7"; //ЖУРНАЛИСТ
        if(input.textContent==document.getElementById("f7").textContent) input.style.backgroundColor="#d89dff"; //1ЕКСТРА1
        if(input.textContent==document.getElementById("f8").textContent) input.style.backgroundColor="#fffd9f"; //2ЕКСТРА2
        if(input.textContent==document.getElementById("f9").textContent) input.style.backgroundColor="#c8f54c"; //3ЕКСТРА3
        if(input.textContent==document.getElementById("f10").textContent) input.style.backgroundColor="#6c9c98"; //4ЕКСТРА4
        input.style.cursor='pointer'
        input.className='unselectable';
        input.addEventListener("click", function()
        {
            var t = this.previousSibling
            t.style.backgroundColor = (t.style.backgroundColor == '') ? 'red' : '';
            this.style.textDecoration = (this.style.textDecoration == 'line-through') ? 'none' : 'line-through';
            this.style.color = (this.style.color == 'red') ? 'black' : 'red';
            // this.style.fontStyle = (this.style.fontStyle == 'italic') ? 'normal' : 'italic';
        })
        div.appendChild(input);
    }
}

function checkedbydiv(i)
{
    document.getElementById(i).checked = (document.getElementById(i).checked == true) ? false : true;
    updatevalues();
}

function clear()
{
    localStorage.clear();
    localStorage.setItem("version", current_version);
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
    if(document.getElementById("9").checked==true) str+='1'; else str+='0';
    if(document.getElementById("10").checked==true) str+='1'; else str+='0';

    localStorage.setItem("values", str);
    localStorage.setItem("mafcount",  document.getElementById("mafc").value);
    localStorage.setItem("playerscount", document.getElementById("count").value);
}

function getdflt(i)
{
    switch(i)
    {
        case '1': return "ПУТАНА"
        case '2': return "ДОКТОР"
        case '3': return "ШЕРИФ"
        case '4': return "ДОН"
        case '5': return "МАНЬЯК"
        case '6': return "ЖУРНАЛИСТ"
        case '7': return "1ЕКСТРА1"
        case '8': return "2ЕКСТРА2"
        case '9': return "3ЕКСТРА3"
        case '10': return "4ЕКСТРА4"
        case '11': return "мирный"
        case '12': return "МАФИЯ"
    }
}

function updaterolesnames(i)
{
    if(document.getElementById("n"+i).value=="") 
    {
        document.getElementById("f"+i).textContent=getdflt(i);
        localStorage.setItem("n"+i, document.getElementById("f"+i).textContent);
    }
    else
    {
        document.getElementById("f"+i).textContent=document.getElementById("n"+i).value;
        localStorage.setItem("n"+i, document.getElementById("f"+i).textContent);
    }
}