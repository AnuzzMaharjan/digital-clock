document.addEventListener('DOMContentLoaded', function () {
    const numArray = ['tenHour', 'oneHour', 'tenMinute', 'oneMinute', 'tenSecond', 'oneSecond'];
    const top = ['clip00', 'clip10', 'clip20', 'clip30', 'clip40', 'clip50'];
    const topLeft = ['clip01', 'clip11', 'clip21', 'clip31', 'clip41', 'clip51'];
    const topRight = ['clip02', 'clip12', 'clip22', 'clip32', 'clip42', 'clip52'];
    const mid = ['clip03', 'clip13', 'clip23', 'clip33', 'clip43', 'clip53'];
    const bottomLeft = ['clip04', 'clip14', 'clip24', 'clip34', 'clip44', 'clip54'];
    const bottomRight = ['clip05', 'clip15', 'clip25', 'clip35', 'clip45', 'clip55'];
    const bottom = ['clip06', 'clip16', 'clip26', 'clip36', 'clip46', 'clip56'];

    const activeCombination = [
        {
            digit: 0,
            combination: [...top, ...topLeft, ...topRight, ...bottomLeft, ...bottomRight, ...bottom]
        },
        {
            digit: 1,
            combination: [...topRight, ...bottomRight]
        },
        {
            digit: 2,
            combination: [...top, ...topRight, ...mid, ...bottomLeft, ...bottom]
        },
        {
            digit: 3,
            combination: [...top, ...topRight, ...mid, ...bottomRight, ...bottom]
        },
        {
            digit: 4,
            combination: [...topLeft, ...mid, ...topRight, ...bottomRight]
        },
        {
            digit: 5,
            combination: [...top, ...topLeft, ...mid, ...bottomRight, ...bottom]
        },
        {
            digit: 6,
            combination: [...top, ...topLeft, ...mid, ...bottomRight, ...bottom, ...bottomLeft]
        },
        {
            digit: 7,
            combination: [...top, ...topRight, ...bottomRight]
        },
        {
            digit: 8,
            combination: [...top, ...topLeft, ...topRight, ...mid, ...bottomLeft, ...bottomRight, ...bottom]
        },
        {
            digit: 9,
            combination: [...top, ...topRight, ...topLeft, ...mid, ...bottomRight, ...bottom]
        }
    ]

    function elements(classname, classnameSecond, id, parentElem) {
        var elem = document.createElement('div');
        elem.setAttribute('class', classname);
        classnameSecond ? elem.classList.add(classnameSecond) : '';
        elem.setAttribute('id', id);
        document.querySelector(parentElem).appendChild(elem);
    }

    function createElem() {
        for (var i = 0; i < 6; i++) {
            //creating child divs
            if (i == 0) {
                elements('hour', '', '', '.clock');
                elements(numArray[i], '', '', '.hour');
            }
            else if (i == 1) {
                elements(numArray[i], '', '', '.hour');
            }
            else if (i == 2) {
                elements('minute', '', '', '.clock');
                elements(numArray[i], '', '', '.minute');
            }
            else if (i == 3) {
                elements(numArray[i], '', '', '.minute');
            }
            else if (i == 4) {
                elements('second', '', '', '.clock');
                elements(numArray[i], '', '', '.second');
            }
            else if (i == 5) {
                elements(numArray[i], '', '', '.second');
            }

            //creating clips to form a digit
            for (var j = 0; j < 7; j++) {
                if (i == 0) {
                    elements('clips', 'passive', `clip${i}${j}`, '.tenHour');
                }
                else if (i == 1) {
                    elements('clips', 'passive', `clip${i}${j}`, '.oneHour');

                }
                else if (i == 2) {
                    elements('clips', 'passive', `clip${i}${j}`, '.tenMinute');

                }
                else if (i == 3) {
                    elements('clips', 'passive', `clip${i}${j}`, '.oneMinute');

                }
                else if (i == 4) {
                    elements('clips', 'passive', `clip${i}${j}`, '.tenSecond');

                }
                else if (i == 5) {
                    elements('clips', 'passive', `clip${i}${j}`, '.oneSecond');

                }
            }
        }
    }

    function activeDetermination() {
        const date = new Date();
        const time = date.toLocaleTimeString('en-GB');
        const splitTimeArray = time.split(':');
        const [tenHour, oneHour] = splitTimeArray[0].split('');
        const [tenMinute, oneMinute] = splitTimeArray[1].split('');
        const [tenSecond, oneSecond] = splitTimeArray[2].split('');

        const timeDigitsArray = [
            {
                digit: tenHour,
                digitInfo: 'tenHour'
            },
            {
                digit: oneHour,
                digitInfo: 'oneHour'
            },
            {
                digit: tenMinute,
                digitInfo: 'tenMinute'
            },
            {
                digit: oneMinute,
                digitInfo: 'oneMinute'
            },
            {
                digit: tenSecond,
                digitInfo: 'tenSecond'
            },
            {
                digit: oneSecond,
                digitInfo: 'oneSecond'
            },
        ]
        activeElements(timeDigitsArray);
    }
    function activeElements(digitArray) {
        let childIds = [];
        let checkedCombinationArray = [];
        for (var i = 0; i < digitArray.length; i++) {
            let digitInfo = digitArray[i].digitInfo;
            let parentElems = document.querySelectorAll(`.${digitInfo}`);
            let childElemIds = [];
            for (var j = 0; j < parentElems[0].childNodes.length; j++) {
                childElemIds.push(parentElems[0].childNodes[j].id);
            }
            let combinationArray = [];
            let combination = activeCombination[digitArray[i].digit].combination;
            for (var k = 0; k < childElemIds.length; k++) {
                for (var l = 0; l < combination.length; l++) {
                    if (childElemIds[k] === combination[l]) {
                        combinationArray.push(childElemIds[k]);
                    }
                }
            }
            checkedCombinationArray.push(combinationArray);
            childIds.push(childElemIds);
        }
        childIds.forEach(arr => {
            arr.forEach(ids => {
                let element = document.getElementById(ids);
                if (element.classList.contains('active')) {
                    element.classList.remove('active');
                    element.classList.add('passive');
                }
            })
        })
        checkedCombinationArray.forEach(arr => {
            arr.forEach(ids => {
                let element = document.getElementById(ids);
                element.classList.remove('passive');
                element.classList.add('active');

            })
        })
    }

    createElem();
    setInterval(() => {
        activeDetermination();
    }, 999);

})
