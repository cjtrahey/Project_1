  
var zipFormEl = document.querySelector('#zip-form');
var zipInputEl = document.querySelector('#Zip');
var todayBox = document.querySelector('#today-box');
var menuList = document.querySelector('#menu-list');


var zipForm = function (event){
    event.preventDefault();

    var zip = zipInputEl.value.trim();
    if(zip) {
        getTodayWeather(zip);
        getAreaMenu(zip);
        console.log(zip);

        // todayBox.textContent = '';
        // zipInputEl.value = '';
    } else {
        alert('Please enter a zip code')
    }
};



var getTodayWeather = function (zip) {
    var todayApi = 'https://api.openweathermap.org/data/2.5/weather?zip='+zip+'&units=imperial&appid=8066018655ed008933d2f7b865448329';

    fetch(todayApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    
                })
            }
        })
}

var getAreaMenu = function (zip) {
    var menuApi = 'https://api.documenu.com/v2/restaurants/zip_code/'+zip+'?key=a066d36aaebc3eeceb6e2edd2c821cbb&fullmenu=true&size=50&page=1';

    fetch(menuApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);


                    for (var i = 0; i < 10; i++) {
                        var name = data.data[i].restaurant_name;
                        var address = data.data[i].address.formatted;
                       var  phone = data.data[i].restaurant_phone;
                       var website = data.data[i].restaurant_website;

                       console.log('name',name);
                       console.log('address',address);
                       console.log('phone',phone);
                       console.log('website',website);
                    }
                    
                })
            }
        })
}



zipFormEl.addEventListener('submit', zipForm);