var data = [];

console.log(data.length);

var title = document.querySelector('.title');
var list = document.querySelector('.travelInfo');
var area = document.getElementById('areaId');
var btn = document.querySelectorAll('.btn');

// AJAX
var xhr = new XMLHttpRequest();
xhr.open("get", "js/data.json", true);
xhr.send(null);
xhr.onload = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var rawData = JSON.parse(xhr.responseText);
      data = rawData.result.records;
      console.log(data);
    }
  }
}



//將資料印在畫面
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