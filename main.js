let count; 
let rl=[]
let players=[];
let btncolor="#96964c"
let activebtncolor='yellow'

current_version="2.6"

function getrolecolor(role)
{

    /*
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
    */

    switch(role)
    {
        case document.getElementById("f1").textContent: return '#fd8dbb';   // Путана
        case document.getElementById("f2").textContent: return '#8cc78f';   // ДОКТОР
        case document.getElementById("f3").textContent: return '#9ac3e4';   // ШЕРИФ
        case document.getElementById("f4").textContent: return '#888888';   // ДОН
        case document.getElementById("f5").textContent: return '#d18775';   // МАНЬЯК
        case document.getElementById("f6").textContent: return '#86e9f7';   // ЖУРНАЛИСТ
        case document.getElementById("f7").textContent: return '#d89dff';   // 1ЕКСТРА1
        case document.getElementById("f8").textContent: return '#fffd9f';   // 2ЕКСТРА2
        case document.getElementById("f9").textContent: return '#c8f54c';   // 3ЕКСТРА3
        case document.getElementById("f10").textContent: return '#6c9c98';  // 4ЕКСТРА4
        case document.getElementById("f11").textContent: return '';         // мир
        case document.getElementById("f12").textContent: return '#b4b4b4';   // МАФИЯ
    }
}

// function Hide(i)
// {
//     if(i==1)
//     {
//         document.getElementById("hide1").style.backgroundColor=activebtncolor;
//         document.getElementById("hide2").style.backgroundColor=btncolor;
//         document.getElementById("roles").style.display = "grid";
//         document.getElementById("gtable").style.display = "none";
//         localStorage.setItem("hide", 1);
//     }
//     else if(i==2)
//     {
//         document.getElementById("hide1").style.backgroundColor=btncolor;
//         document.getElementById("hide2").style.backgroundColor=activebtncolor;
//         document.getElementById("roles").style.display = "none";
//         document.getElementById("gtable").style.display = "grid";
//         localStorage.setItem("hide", 2);
//     }
// }

function Addp()
{
    if(Number(document.getElementById("count").value)<Number(document.getElementById("mafc").value))
    {
        let temp = document.getElementById("count").value;
        document.getElementById("count").value = document.getElementById("mafc").value;
        document.getElementById("mafc").value = temp;
        alert("[!] Кол-во мафий было > кол-во игроков\
        \n - Произошла замена :)");
    }
    
    if(Number(document.getElementById("count").value)<2 || Number(document.getElementById("mafc").value)<1)
    {
        alert("Введи нормальное кол-во игроков (всего) и мафий (среди них)");
        return 1;
    }
    if(Number(document.getElementById("count").value)>299 || Number(document.getElementById("mafc").value)>299)
    {
        alert("Ты шо, дурак? [Шота многа]");
        return 1;
    }
    // if(localStorage.getItem('hide')==2 && document.getElementById("gtable").style.display=='none') 
    // {
    //     document.getElementById("roles").style.display = "none";
    //     document.getElementById("gtable").style.display = "grid";
    //     document.getElementById("hide1").style.backgroundColor=btncolor;
    //     document.getElementById("hide2").style.backgroundColor=activebtncolor;
    // }

    document.getElementById("btn").disabled = true;
    // document.getElementById("hide1").disabled = true;
    // document.getElementById("hide2").disabled = true;

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

    localStorage.setItem("mafcount",  document.getElementById("mafc").value);
    localStorage.setItem("playerscount", document.getElementById("count").value);

    let xmlr= "https://www.random.org/sequences/?min=0&max="+Number(document.getElementById("count").value-1)+"&col=1&format=plain";
    let http = new XMLHttpRequest()
    http.open('GET', xmlr);
    http.send();

    http.onreadystatechange = function() 
    {
        document.getElementById("btn").disabled = false;
        if (this.readyState == 4 && this.status == 0) 
        {
            alert("[Эрор крч]\
            \n[!] random.org не ответил на запрос\
            \nВозможные причины:\
            \n - отвалился интернет\
            \n - некореткные инпуты запроса\
            \n - бан за спам запросами\
            \n - random.org умер\
            ");
            return 1;
        }

        // document.getElementById("hide1").disabled = false;
        // document.getElementById("hide2").disabled = false;

        if (this.readyState == 4 && this.status == 200) 
        {
            clear();
            
            // if (document.getElementById("roles").style.display == "grid") localStorage.setItem("hide", 1);
            // else if (document.getElementById("gtable").style.display == "grid") localStorage.setItem("hide", 2);

            let r = [];
            r= (this.response).split('\n');
            for(let i=0;i<rl.length;i++)
            {

                players[Number(r[i])]=rl[i];
            }
            /*
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
                input.style.backgroundColor=getrolecolor(input.textContent);
                input.readOnly=true;
                input.style.cursor='pointer'
                input.className='unselectable ' + i;
                input.addEventListener("click", function()
                {
                    var t = this.previousSibling;
                    if(this.style.textDecoration == "line-through")
                    {
                        t.style.backgroundColor = "";
                        this.style.textDecoration = "none";
                        this.style.color = "black";
                        localStorage.setItem("IA"+this.className.split(" ")[1], "1");
                    }
                    else 
                    {
                        t.style.backgroundColor = "red";
                        this.style.textDecoration = "line-through";
                        this.style.color = "red";
                        localStorage.setItem("IA"+this.className.split(" ")[1], "0");
                    }
                    // this.style.fontStyle = (this.style.fontStyle == 'italic') ? 'normal' : 'italic';
                })
                div.appendChild(input);
            }
            */
            for(let i=0;i<players.length;i++)
            {
                localStorage.setItem("p"+i,players[i]);
            }
            //
            rl = []
            if(document.getElementById("1").checked==true) rl.push(document.getElementById("f1").textContent);
            if(document.getElementById("2").checked==true) rl.push(document.getElementById("f2").textContent);
            if(document.getElementById("3").checked==true) rl.push(document.getElementById("f3").textContent);
            if(document.getElementById("4").checked==true) rl.push(document.getElementById("f4").textContent);
            if(document.getElementById("5").checked==true) rl.push(document.getElementById("f5").textContent);
            if(document.getElementById("6").checked==true) rl.push(document.getElementById("f6").textContent);
            if(document.getElementById("7").checked==true) rl.push(document.getElementById("f7").textContent);
            if(document.getElementById("8").checked==true) rl.push(document.getElementById("f8").textContent);
            if(document.getElementById("9").checked==true) rl.push(document.getElementById("f9").textContent);
            if(document.getElementById("10").checked==true) rl.push(document.getElementById("f10").textContent);
            //

            localStorage.setItem("tn"+0, document.getElementById("f12").textContent);
            localStorage.setItem("tv"+0, 0);
            
            for(let i=1;i<rl.length+1;i++)
            {
                localStorage.setItem("tn"+i, rl[i-1]);
                localStorage.setItem("tv"+i, 0);
            }
            localStorage.setItem("countroles", rl.length+1)

            
            document.getElementById("gtable").innerHTML="";
            document.getElementById("gtable").style.gridTemplateColumns=(" auto").repeat(rl.length+2);

            // div = document.createElement("div");
            // div.textContent="№";
            // div.className="vert"
            // div.id="nm";
            // document.getElementById("gtable").appendChild(div);

            // for (let j=0;j<rl.length+1;j++)
            // {
            //     div = document.createElement("div");
            //     div.className="vert"
            //     div.textContent=localStorage.getItem("tn"+j);
            //     document.getElementById("gtable").appendChild(div);
            // }

            div = document.createElement("div");
            div.className="vert"
            div.textContent="Игроки";
            //div.textContent="РОЛЬ";
            document.getElementById("gtable").appendChild(div);
            for (let j=0;j<localStorage.getItem("countroles");j++)
            {
                div = document.createElement("div");
                div.className="vert"
                div.style.backgroundColor='#ddd5a6'
                div.textContent=localStorage.getItem("tn"+j);
                div.style.backgroundColor=getrolecolor(div.textContent);
                document.getElementById("gtable").appendChild(div);
            }
            
            for(let i=0;i<players.length;i++)
            {
                div = document.createElement("div");
                div.style.backgroundColor='#ddd5a6'
                // div.style.height='100%'
                div.textContent=localStorage.getItem("p"+i);
                div.style.backgroundColor=getrolecolor(div.textContent);
                div.style.cursor='pointer'
                div.className='unselectable ' + i;

                //
                if(localStorage.getItem("IA"+i)=="1" || localStorage.getItem("IA"+i)==undefined)
                {
                    div.style.textDecoration = "none";
                    div.style.color = "black";
                }
                else 
                {
                    div.style.textDecoration = "line-through";
                    div.style.color = "red";
                }
                //

                div.addEventListener("click", function()
                {
                    if(this.style.textDecoration == "line-through")
                    {
                        this.style.textDecoration = "none";
                        this.style.color = "black";
                        localStorage.setItem("IA"+this.className.split(" ")[1], "1");
                    }
                    else 
                    {
                        this.style.textDecoration = "line-through";
                        this.style.color = "red";
                        localStorage.setItem("IA"+this.className.split(" ")[1], "0");
                    }
                    // this.style.fontStyle = (this.style.fontStyle == 'italic') ? 'normal' : 'italic';
                })
                document.getElementById("gtable").appendChild(div);

                for (let j=0;j<rl.length+1;j++)
                {
                    div = document.createElement("div");
                    div.className="cell "+j;
                    div.textContent=i+1;
                    div.style.color=getrolecolor(localStorage.getItem("tn"+j))
                    div.addEventListener("click", function()
                    {
                        if(this.style.backgroundColor == 'red')
                        {
                            localStorage.setItem("tv"+this.className.split(" ")[1], "0")
                            this.style.backgroundColor='whitesmoke';
                            this.style.color='gray';
                        }
                        else 
                        {
                            for (let k=0; k<document.getElementsByClassName(this.className).length;k++)
                            {
                                document.getElementsByClassName(this.className)[k].style.backgroundColor='whitesmoke';
                                document.getElementsByClassName(this.className)[k].style.color='gray';
                            }
                            localStorage.setItem("tv"+this.className.split(" ")[1], this.textContent)
                            this.style.backgroundColor='red';
                            this.style.color='black';
                        }
                        // this.style.backgroundColor = (this.style.backgroundColor == 'red') ? 'whitesmoke' : 'red';
                        // this.style.color = (this.style.color == 'red') ? 'whitesmoke' : 'red';
                    })
                    document.getElementById("gtable").appendChild(div);
                }
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
        alert("[2.7 NEW]\
        \n - Нах** вкладки! Теперь листай вниз\
        \n - Клейкие заголовки в таблице\
        \n[2.5]\
        \n - Больше данных сохраняется\
        \n[2.4]\
        \n - Можно переименовать роли (стереть чтоб востановить стандартное имя роли)\
        \n[2.3]\
        \n - Клик по игроку, чтобы зачеркнуть его (выгнали/убили)\
        \n[2.2]\
        \n - Данные сохраняются\
        \n - У ролей есть цвета\
        ");
    }
    localStorage.setItem("version", current_version);
    document.getElementById("cop").textContent="v"+current_version+" © Робік";
    document.getElementById("cop").style.display="grid";
    
    
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
    else document.getElementById("mafc").value = 3;
    if(localStorage.getItem("playerscount")!=undefined) document.getElementById("count").value = localStorage.getItem("playerscount");
    else document.getElementById("count").value = 10;

    // if(localStorage.length<=4 || localStorage.getItem("n1")==undefined) 
    // {
    //     localStorage.setItem('hide', 1);
    //     document.getElementById("roles").style.display = "grid";
    //     document.getElementById("gtable").style.display = "none";
        
    //     document.getElementById("hide2").disabled = true;

    //     document.getElementById("hide1").style.backgroundColor=activebtncolor;
    //     document.getElementById("hide2").style.backgroundColor=btncolor;
    //     return 1;
    // }

    // if(localStorage.getItem('hide') == 1)
    // {
    //     document.getElementById("hide1").style.backgroundColor=activebtncolor;
    //     document.getElementById("hide2").style.backgroundColor=btncolor;
        
    //     document.getElementById("roles").style.display = "grid";
    //     document.getElementById("gtable").style.display = "none";
    // }
    // else
    // {
    //     document.getElementById("hide1").style.backgroundColor=btncolor;
    //     document.getElementById("hide2").style.backgroundColor=activebtncolor;
        
    //     document.getElementById("roles").style.display = "none";
    //     document.getElementById("gtable").style.display = "grid";
    // }
    
    
    if(localStorage.getItem("countroles")!=undefined)
    {
        document.getElementById("gtable").style.gridTemplateColumns=(" auto").repeat(1+Number(localStorage.getItem("countroles")));

        // div = document.createElement("div");
        // div.textContent="№";
        // div.className="vert"
        // div.id="nm";
        // document.getElementById("gtable").appendChild(div);

        // for (let j=0;j<localStorage.getItem("countroles");j++)
        // {
        //     div = document.createElement("div");
        //     div.className="vert"
        //     div.textContent=localStorage.getItem("tn"+j);
        //     document.getElementById("gtable").appendChild(div);
        // }

        div = document.createElement("div");
        div.className="vert"
        div.textContent="Игроки";
        document.getElementById("gtable").appendChild(div);
        for (let j=0;j<localStorage.getItem("countroles");j++)
        {
            div = document.createElement("div");
            div.className="vert"
            div.style.backgroundColor='#ddd5a6'
            div.textContent=localStorage.getItem("tn"+j);
            div.style.backgroundColor=getrolecolor(div.textContent);
            document.getElementById("gtable").appendChild(div);
        }
        
        for(let i=0;i<localStorage.getItem("playerscount");i++)
        {
            div = document.createElement("div");
            div.style.backgroundColor='#ddd5a6';
            div.textContent=localStorage.getItem("p"+i);
            div.style.backgroundColor=getrolecolor(div.textContent);
            div.style.cursor='pointer'
            div.className='unselectable ' + i;

            //
            if(localStorage.getItem("IA"+i)=="1" || localStorage.getItem("IA"+i)==undefined)
            {
                div.style.textDecoration = "none";
                div.style.color = "black";
            }
            else 
            {
                div.style.textDecoration = "line-through";
                div.style.color = "red";
            }
            //

            div.addEventListener("click", function()
            {
                if(this.style.textDecoration == "line-through")
                {
                    this.style.textDecoration = "none";
                    this.style.color = "black";
                    localStorage.setItem("IA"+this.className.split(" ")[1], "1");
                }
                else 
                {
                    this.style.textDecoration = "line-through";
                    this.style.color = "red";
                    localStorage.setItem("IA"+this.className.split(" ")[1], "0");
                }
                // this.style.fontStyle = (this.style.fontStyle == 'italic') ? 'normal' : 'italic';
            })
            document.getElementById("gtable").appendChild(div);
            
            for (let j=0;j<localStorage.getItem("countroles");j++)
            {
                div = document.createElement("div");
                div.className="cell "+j;
                div.textContent=i+1;
                div.style.color=getrolecolor(localStorage.getItem("tn"+j))
                if(localStorage.getItem("tv"+j)==i+1)
                {
                    div.style.backgroundColor='red';
                    div.style.color='black';
                }
                div.addEventListener("click", function()
                {
                    if(this.style.backgroundColor == 'red')
                    {
                        localStorage.setItem("tv"+this.className.split(" ")[1], "0");
                        this.style.backgroundColor='whitesmoke';
                        this.style.color='gray';
                    }
                    else 
                    {
                        for (let k=0; k<document.getElementsByClassName(this.className).length;k++)
                        {
                            document.getElementsByClassName(this.className)[k].style.backgroundColor='whitesmoke';
                            document.getElementsByClassName(this.className)[k].style.color='gray';
                        }
                        localStorage.setItem("tv"+this.className.split(" ")[1], this.textContent)
                        this.style.backgroundColor='red';
                        this.style.color='black';
                    }
                    // this.style.backgroundColor = (this.style.backgroundColor == 'red') ? 'whitesmoke' : 'red';
                    // this.style.color = (this.style.color == 'red') ? 'whitesmoke' : 'red';
                })
                document.getElementById("gtable").appendChild(div);
            }
        }
    }

    /*
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
        
        let t = input;

        div.appendChild(input);
        input = document.createElement("div");
        input.textContent=localStorage.getItem("p"+i);
        input.readOnly=true;
        
        input.style.backgroundColor=getrolecolor(input.textContent);
        input.style.cursor='pointer'
        input.className='unselectable ' + i;

        //
        if(localStorage.getItem("IA"+i)=="1" || localStorage.getItem("IA"+i)==undefined)
        {
            t.style.backgroundColor = "";
            input.style.textDecoration = "none";
            input.style.color = "black";
        }
        else 
        {
            t.style.backgroundColor = "red";
            input.style.textDecoration = "line-through";
            input.style.color = "red";
        }
        //

        input.addEventListener("click", function()
        {
            let t = this.previousSibling;
            if(this.style.textDecoration == "line-through")
            {
                t.style.backgroundColor = "";
                this.style.textDecoration = "none";
                this.style.color = "black";
                localStorage.setItem("IA"+this.className.split(" ")[1], "1");
            }
            else 
            {
                t.style.backgroundColor = "red";
                this.style.textDecoration = "line-through";
                this.style.color = "red";
                localStorage.setItem("IA"+this.className.split(" ")[1], "0");
            }
            // this.style.fontStyle = (this.style.fontStyle == 'italic') ? 'normal' : 'italic';
        })
        div.appendChild(input);
        
    }
    */
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