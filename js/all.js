var data = [];
var zoneArray=[];
var area = document.getElementById('areaID');

console.log(data.length);

var title = document.querySelector('.title');
var list = document.querySelector('.travelInfo');
var area = document.getElementById('areaId');
var btn = document.querySelectorAll('.btn');

// AJAX取得資料 & 選單選項
var xhr = new XMLHttpRequest();
xhr.open("get", "js/data.JSON", true);
xhr.send(null);
xhr.onload = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      let str='';
      var rawData = JSON.parse(xhr.responseText);
      data = rawData.result.records;
      for (let i = 0; i < data.length; i++) {
        zoneArray.push(data[i].Zone);
      } 
      var zoneList = zoneArray.filter(function (item,index,array) {
        return array.indexOf(item) === index;
      })
      for (let j = 0; j < zoneList.length; j++) {
        str += '<option value="' +zoneList[j]+'">'+zoneList[j]+'</option>';
      }
      area.innerHTML = '<option value="">--請選擇行政區--</option>'+ str;

      
    }
  }
}





//將資料渲染至畫面
function updateList(e) {
  var str = '';
  for (var i = 0; i < data.length; i++) {
    if (data[i].Zone === e.target.value) {
      if (data[i].Ticketinfo === '免費參觀') {
        var content = '<li><div class="card" style="background-image: url(' + data[i].Picture1 + ')"><h3>' + data[i].Name + '</h3><h4>' + data[i].Zone + '</h4></div><p class="openTime">' + data[i].Opentime + '</p><p class="address">' + data[i].Add + '</p><p class="tel">' + data[i].Tel + '</p><p class="fee">' + data[i].Ticketinfo + '</p></li>'
        str += content;
      } else {
        var content = '<li><div class="card" style="background-image: url(' + data[i].Picture1 + ')"><h3>' + data[i].Name + '</h3><h4>' + data[i].Zone + '</h4></div><p class="openTime">' + data[i].Opentime + '</p><p class="address">' + data[i].Add + '</p><p class="tel">' + data[i].Tel + '</p></li>'
        str += content;
      }
    }

  }
  list.innerHTML = str;
  title.innerHTML = '<h2>' + e.target.value + '</h2>';
}

area.addEventListener('change', updateList, false);
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', updateList, false);
}