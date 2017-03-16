// BMO: our little friend for debug
var bmo = (function () {
    'use strict';

    return {
        // look for HTML elements which are larger than the screen
        bodyOverflow: function () {
            var allBodyElements = document.body.getElementsByTagName('*'),
                screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                overflowElements = [];

            console.log('Width = ' + screenWidth);
            console.log('Overflowed elements: ');

            for (var elem of allBodyElements) {
                if (elem.offsetWidth > screenWidth) {
                    overflowElements.push(elem);
                }
            }
            return overflowElements;
        }
    }

})();
