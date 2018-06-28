var data = [];
var zoneArray = [];


// DOM selected
var title = document.querySelector('.title');
var list = document.querySelector('.travelInfo');
var area = document.getElementById('areaId');
var btn = document.querySelectorAll('.btn');
var popData = document.getElementById('popCardId');




// AJAX取得資料 & 選單選項
var xhr = new XMLHttpRequest();
xhr.open("get", "js/data.json", true);
xhr.send(null);
xhr.onload = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      let str = '';
      var rawData = JSON.parse(xhr.responseText);
      data = rawData.result.records;
      for (let i = 0; i < data.length; i++) {
        zoneArray.push(data[i].Zone);
      }
      var zoneList = zoneArray.filter(function (item, index, array) {
        return array.indexOf(item) === index;
      })
      for (let j = 0; j < zoneList.length; j++) {
        str += '<option value="' + zoneList[j] + '">' + zoneList[j] + '</option>';
      }
      area.innerHTML = '<option value="">--請選擇行政區--</option>' + str;
    }
  }
}

//事件監聽
area.addEventListener('change', updateList, false);

for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', updateList, false);
}

list.addEventListener('click', popInfo, false);
popData.addEventListener("click", closeInfo, false);


//將資料渲染至畫面
function updateList(e) {
  var str = '';
  var nowData = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].Zone === e.target.value) {
      nowData.push(data[i]);
    }
  }
  for (let j = 0; j < nowData.length; j++) {
    if (nowData[j].Ticketinfo === '免費參觀') {
      var content = '<li><div class="card" style="background-image: url(' + nowData[j].Picture1 + ')"><h3>' + nowData[j].Name + '</h3><h4>' + nowData[j].Zone + '</h4></div><p class="openTime">' + nowData[j].Opentime + '</p><p class="address">' + nowData[j].Add + '</p><p class="tel">' + nowData[j].Tel + '</p><p class="fee">' + nowData[j].Ticketinfo + '</p><a href="#" data-num="' + j + '"></a></li>'
      str += content;
    } else {
      var content = '<li><div class="card" style="background-image: url(' + nowData[j].Picture1 + ')"><h3>' + nowData[j].Name + '</h3><h4>' + nowData[j].Zone + '</h4></div><p class="openTime">' + nowData[j].Opentime + '</p><p class="address">' + nowData[j].Add + '</p><p class="tel">' + nowData[j].Tel + '</p><a href="#" data-num="' + j + '"></a></li>'
      str += content;
    }
  }
  showData = nowData;
  list.innerHTML = str;
  title.innerHTML = '<h2>' + e.target.value + '</h2>';
}

// 點擊項目跳出介紹
function popInfo(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') {
    return;
  }
  var num = e.target.dataset.num;
  console.log(num);
  var str = `
            <div class="popCard">
      
                <div class="infoCard" style="background-image: url(${showData[num].Picture1})">
                    <h3>${showData[num].Name}</h3>
                    <h4>${showData[num].Zone}</h4>
                </div>
                <p class="description">${showData[num].Description}</p>
                <p class="openTime">${showData[num].Opentime}</p>
                <p class="address">${showData[num].Add}</p>
                <p class="tel">${showData[num].Tel}</p>
                <p class="fee">${showData[num].Ticketinfo}</p>
            </div>
  `;
  popData.innerHTML = str;
  popData.style.visibility = "visible";
  popData.style.opacity= "1";
}

function closeInfo(e) {
  e.stopPropagation();
  if (e.target.id === "popCardId") {
    popData.style.visibility = "hidden";
    popData.style.opacity = "0";
  }
}

document.querySelector('body').addEventListener('click', function (e) {
  console.log(e, e.target.tagName);
}, false);