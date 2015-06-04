$(function() {
    var LIGHT_33 = 6000;
    var LIGHT_23 = 3000;
    var LIGHT_13 = 0;

    function update() {
        $.get('http://sensor-api.localdata.com/api/v1/sources/ci4vye225000n02s7rxjdfxa1/entries.json?count=1&sort=desc')
            .done(function(response) {
                var currentLight = response.data[0].data.light;
                var percentageHeight = ((1-(currentLight / LIGHT_33)) * 100).toFixed(0);
                if(percentageHeight >= 80) {
                    percentageHeight = 80;
                }
                else if(percentageHeight < 0) {
                    percentageHeight = 0;
                }

                var state = 'img/suncomplete.svg';
                if(percentageHeight <= LIGHT_13) {
                    state = 'img/half.svg';
                }
                else if(percentageHeight <= LIGHT_23) {
                    state = 'img/moon.svg';
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
