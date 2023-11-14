
let data = [];

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

let area = document.getElementById('areaList').value;
let newArea = document.getElementById('areaList');

window.onload = function () {
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
        .then(function (response) {
            data = response.data.data;
            showTicket(data);
            searchPlace();
        });
    newArea.onchange = function () {
        searchPlace();
    }
    function searchPlace() {
        area = document.getElementById('areaList').value;
        console.log(area);
        if (area === "allArea") {
            showTicket(data);
        } else if (area === "taipei") {
            let searchArea = data.filter((data) => data.area === "台北");
            showTicket(searchArea);
        } else if (area === "taichung") {
            let searchArea = data.filter((data) => data.area === "台中");
            showTicket(searchArea);
        } else if (area === "kaohsiung") {
            let searchArea = data.filter((data) => data.area === "高雄");
            showTicket(searchArea);
        }
        return;
    }
    function showTicket(arr) {
        document.getElementById('showTickets').innerHTML = "";
        arr.forEach(function (item) {
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
    function isEmpty() {
        if (ticketName.value.length === 0) {
            return true;
        } else if (ticketURL.value.length === 0) {
            return true;
        } else if (ticketArea.value === "allArea") {
            return true;
        } else if (ticketDetail.value.length === 0) {
            return true;
        } else if (ticketGroup.value.length === 0) {
            return true;
        } else if (ticketPrice.value.length === 0) {
            return true;
        } else if (ticketLevel.value.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    let addBtn = document.getElementById('submitForm');
    addBtn.onclick = function () {
        let formEmpty = isEmpty();
        if (formEmpty) {
            alert('請填寫完整');
        } else {
            let obj = {
                "id": data[data.length - 1].id + 1,
                "name": document.getElementById("ticketName").value,
                "imgUrl": document.getElementById("ticketURL").value,
                "area": document.getElementById("ticketArea").value === "taipei" ? "台北" : document.getElementById("ticketArea").value === "taichung" ? "台中" : "高雄",
                "description": document.getElementById("ticketDetail").value,
                "group": document.getElementById("ticketGroup").value,
                "price": document.getElementById("ticketPrice").value,
                "rate": document.getElementById("ticketLevel").value
            };
            data.push(obj);
            searchPlace();
        }
    }
}   