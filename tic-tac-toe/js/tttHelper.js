const tttHelper = (function() {

	const isValidLine = function(index, i, cols) {
		return (index - i) < cols;
	};

	const isValidColumn = function(index, i, cols) {
		return ((index - i) % cols) === 0;
	};

	const check = function(orientationCheck, arr, compare) {
		if (!typeof orientationCheck === 'function') {
			throw  new TypeError(' orientationCheck must be a function' );
		}

		const cols = Math.sqrt(arr.length), // to keep it more general
			defultCompare = function (a, b) { return a === b };

		let res = false;
		
		compare = compare || defultCompare;

		for (let i = 0; i < cols; i += 1) {
    		res = Array.from( arr )
    		.filter((_, index) => orientationCheck(index, i, cols))
    		.reduce((a,b) => compare(a, b));
    		
    		if (res) {    		
	    		return {win:true, where: i}; // TODO: -1 ?
			} 
		}		

		return {win:false, where: -1};
    };

    const pubCheckLines = check.bind({}, isValidLine);
    const pubCheckColumns = check.bind({}, isValidColumn);
    const pubCheckDiagonals = check.bind({}, isValidLine);


    return {
    	checkLines: pubCheckLines,
    	checkColumns: pubCheckColumns
    }

})();