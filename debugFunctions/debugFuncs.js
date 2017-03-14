function elementsWidthCheck() {
    'use strict';
    var elems = document.body.getElementsByTagName('*'), // returns NodeList object
        width = window.innerWidth,
        extraWidthElems = [];

    console.log('Width = ' + width);

    for (var e of elems) {
        if (e.offsetWidth > width) {
            extraWidthElems.push(e);
        }
    }

    return extraWidthElems;
}
