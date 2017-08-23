(function () {
	/* all keys */
  var keys = Array.from(document.getElementsByTagName('td'))

	/* just operation keys */
  var opKeys = keys.filter(function (element) {
    return element.className === 'keyboard__operator'
  })

	/* just number keys */
  var numKeys = keys.filter(function (element) {
    return element.className !== 'keyboard__operator'
  })

  var computeOp = {
    '+': function (a, b) { return a + b },
    '-': function (a, b) { return a - b },
    'x': function (a, b) { return a * b },
    '/': function (a, b) { return a / b }
  }

	/* registers */
  var r1 = 0,
    r2 = 0,
    acc = 0,
    op = null

	/* simple controlers */
  var readingFirst = true,
    initialPhase = true,
    enteredOp = false


  /* displays */
  var displayMain = document.getElementById("displayMain")
  var displayHistory = document.getElementById("displayHistory")

	/* onclick function for numbers keys */
  for (let i = 0; i < numKeys.length; i++) {
    numKeys[i].onclick = function () {
      if (acc === 0 || initialPhase) {
        acc = ''
      }
      enteredOp = false
      acc += this.innerText
      displayMain.innerText = acc
      initialPhase = false

      if (readingFirst) {
        r1 = acc
      } else {
        r2 = acc
      }
    }
  }

	/* onclick function for operation keys */
  for (let i = 0; i < opKeys.length; i++) {
    opKeys[i].onclick = function () {
			/* can clear the screen at anytime */
      if (!enteredOp || this.innerText === 'clear') {
				// appends to the history
        displayHistory.innerText += displayMain.innerText

        if (readingFirst) {
          readingFirst = false
          acc = 0
        }

        if (this.innerText === 'clear') {
          r1 = r2 = acc = displayMain.innerText = 0
          displayHistory.innerText = ''
          enteredOp = false
          readingFirst = true
          initialPhase = true
        }

				/* "=" to see the result */
        else if (this.innerText === '=') {
          if (!readingFirst && op !== null) {
						// calc
            acc = computeOp[op](Number(r1), Number(r2))

						// update screen
            displayMain.innerText = acc
            displayHistory.innerText += '='
            displayHistory.innerText += (displayMain.innerText + '\n')

						// reset controlers
            initialPhase = readingFirst = true
            enteredOp = false

						// set registers
            r1 = acc
            r2 = 0
          }
        }
				/* one of the arithmetic operators */
        else {
          enteredOp = true
          op = this.innerText
          displayMain.innerText = this.innerText
          displayHistory.innerText += displayMain.innerText
        }
      }
    }
  }
})()
