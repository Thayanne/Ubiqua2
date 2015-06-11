$(function () {
    var LIGHT_33 = 6000;
    var LIGHT_23 = 2000;
    var LIGHT_13 = 50;

    function update() {
        $.get ('http://sensor-api.localdata.com/api/v1/sources/ci4vjer3i000e02s7r2cj23gs/entries.json?count=1&sort=desc')
            .done(function (response) {
                var currentLight = response.data[0].data.light;

                if (currentLight > LIGHT_23) {
                    var state = 'img/suncomplete.svg';

                    var totalOfLight = (LIGHT_33 - LIGHT_23);
                    var sectionLight = (currentLight - LIGHT_23);
                    var percentageHeight = ((33.3) * ((1 - (sectionLight) / totalOfLight))).toFixed(0);
                    
                    if (percentageHeight < 0) {
                        percentageHeight = 0;
                    }
                } 
                else if (currentLight <= LIGHT_23 && currentLight > LIGHT_13) {
                    var state = 'img/half.svg';

                    var totalOfLight = (LIGHT_23 - LIGHT_13);
                    var sectionLight = (currentLight - LIGHT_13);
                    var percentageHeight = (33.3 + ((33.3) * ((1 - (sectionLight / totalOfLight))))).toFixed(0);
                }
                else if (currentLight <= LIGHT_13) {
                    var state = 'img/moon.svg';

                    var totalOfLight = LIGHT_13;
                    var percentageHeight = (66.6 + ((33.3) * ((1 - (currentLight / totalOfLight))))).toFixed(0);
                    
                    if (percentageHeight >= 80) {
                        percentageHeight = 80;
                    }
                }

                $('.star').css({
                    top: percentageHeight + '%'
                }).removeClass('rotate');

                $('.star img').attr('src', state);
            });
    }
    update();

    setInterval(update, 10000);
});
