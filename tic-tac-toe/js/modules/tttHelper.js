const extend = function ext( target, extension ) {
	for (var key in extension) {
		target[key] = extension[key];
	}
}

const tttHelper = (function() {

	const isLine = function(index, i, cols) {
		return (index < (cols + i * cols)) && (index >= (i * cols)) ;
	};

	const isColumn = function(index, i, cols) {
		return ((index - i) % cols) === 0;
	};

	const isMainDiag = function(index, i, cols) {
		let middle = ((cols**2) - 1)/2;
		return (index % 2 === 0) && (index % middle === 0);		
	};

	const isInverseDiag = function(index, i, cols) {
		let middle = ((cols**2) - 1)/2;
		return (index % 2 === 0) && !(index % middle === 0);		
	};

	const defaultCompare = function(a, b) { 
		return a === b;
	};

	const check = function(orientationCheck, orientation, compare, arr) {
		if (!typeof orientationCheck === 'function') {
			throw  new TypeError(' orientationCheck must be a function' );
		}		

		let subArr = false;			

		return function(compare, arr) {

			let result = {
				win: false,
				where: {
					_orientation: orientation,
					_index: -1
				}
			}

			compare = compare || defaultCompare;
			
			const cols = Math.sqrt(arr.length);
			const howMany = (/diagonal./i.test(orientation)) ? 1 : cols;

			for (let i = 0; i < cols; i += 1) {			
	    		subArr = Array.from( arr )
	    		.filter( (_, index) => orientationCheck(index, i, cols) )
	    		.reduce( (a,b) => compare(a, b) );
	    		
	    		if (subArr) {    		
	    			result.win = true;
	    			result.where._index = i;
	    			break;
				} 
			}		

			return result;

		}
		
    };

    const pubCheckLines = check.call( {}, isLine, "line" );
    const pubCheckColumns = check.call( {}, isColumn, "column" );
    const pubCheckMainDiagonal = check.call( {}, isMainDiag, "diagonal" );
    const pubCheckInverseDiagonal = check.call( {}, isInverseDiag, "diagonalinverse" );


    return {
    	name: 'tttModule',
    	checkLines: pubCheckLines,
    	checkColumns: pubCheckColumns,
    	checkMainDiagonal: pubCheckMainDiagonal,
    	checkInverseDiagonal: pubCheckInverseDiagonal
    }

})();