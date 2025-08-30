ranges: aNumBetween = [>400 && <800]; // 401 - 799
		aNumBetween2 = [>=400 && <=800] // 400 - 800
		aNumOutside = [<400 || >800] // ... - 399 , 801 - ...
limits: aNumBelow = [<400]; 
		aNumAbove = [>399];
algebraic: aMultiple = [!%4]; // mulitple of 4 (4,8,12,...)
			aM2 = [!%3+2]; // multiple of 3 base 2 (2,5,8,...)
			Am3 = [%5 + 3 && >17], // multiple of 5 base 3 and greater than 17 (22, 27, 32, ...)
			am4 = [%5 && !%3] // multiple of 5 except multiples of 3 (5, 10, 20, 25, 35, ...)
			

