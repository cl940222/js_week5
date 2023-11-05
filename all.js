
let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];

window.onload = function(){
    let area = document.getElementById('areaList').value;
    searchPlace();
    let newArea = document.getElementById('areaList');
    newArea.onchange = function(){
        searchPlace();
    }
    function searchPlace(){
        area = document.getElementById('areaList').value;
        console.log(area);
        if(area === "allArea"){
            showTicket(data);
        } else if (area === "taipei"){
            let searchArea = data.filter((data)=>data.area === "台北");
            showTicket(searchArea);
        } else if (area === "taichung"){
            let searchArea = data.filter((data)=>data.area === "台中");
            showTicket(searchArea);
        } else if (area === "kaohsiung"){
            let searchArea = data.filter((data)=>data.area === "高雄");
            showTicket(searchArea);
        }
        return;
    }
    function showTicket(arr){
        document.getElementById('showTickets').innerHTML = "";
        arr.forEach(function(item){
            let itemHTML = `<li class="ticketCard">
                                <div class="ticketImg">
                                    <a href="#">
                                        <img src=${item.imgUrl}>
                                    </a>
                                    <div class="ticketArea">${item.area}</div>
                                    <div class="ticketRank">${item.rate}</div>
                                </div>
                                <h2 class="ticketTitle">${item.name}</h2>
                                <p class="ticketDescription">${item.description}</p>
                                <div class="ticketSale">
                                    <div class="ticketAmount">
                                        <i class="fa-solid fa-circle-exclamation" style="color: #00807e;"></i>
                                        剩下最後 ${item.group} 組
                                    </div>
                                    <div class="ticketCost" >
                                        <span>TWD</span>
                                        <span class="price">
                                            ${numeral(item.price).format('$0,0')}
                                        </span>
                                    </div>
                                </div>
                            </li>`
            let ticket = document.getElementById('showTickets');
            ticket.innerHTML += itemHTML;
            document.getElementById("chooseNum").innerHTML = `本次搜尋共 ${arr.length} 筆資料`;
        })
    }

    let addBtn = document.getElementById('submitForm');
    let obj = {
        "id": 1,
        "name": "",
        "imgUrl": "",
        "area": "",
        "description": "",
        "group": 0,
        "price": 0,
        "rate": 0
    };
    addBtn.onclick = function(){
        let obj = {
            "id": data[data.length-1].id + 1,
            "name": document.getElementById("ticketName").value,
            "imgUrl": document.getElementById("ticketURL").value,
            "area": document.getElementById("ticketArea").value === "taipei"? "台北" : document.getElementById("ticketArea").value === "taichung"? "台中" : "高雄",
            "description": document.getElementById("ticketDetail").value,
            "group": document.getElementById("ticketGroup").value,
            "price": document.getElementById("ticketPrice").value,
            "rate": document.getElementById("ticketLevel").value
        };
        data.push(obj);
        searchPlace();
    }
}   