function problem1() {
	var max = 1000;
	var number_one = 3;
	var number_two = 5;
	var sum = 0;
	for (var i = 1; i < max; i++) {
		if (i % number_one == 0 || i % number_two == 0) {
			sum += i;
		}
	}
	console.log(sum);
}
problem1();

function problem2() {
	function fib(n) {
		var sum = 0;
		var a = 1,
			b = 2;
		sum += 2;
		while (b < n) {
			var c = a + b;
			a = b;
			b = c;
			if (c % 2 == 0) {
				sum += c;
			}
		}
		console.log(sum);
	}
	fib(4000000);
}
// problem2();

function problem3() {
	var num = 600851475143;
	var factorArr = [];
	for (var i = 0; i <= num; i++) {
		if (num % i == 0) {
			factorArr.push(i);
			num = (num / i);
		}
	}
	console.log(factorArr[factorArr.length - 1]);
}
// problem3();

function problem4() { /*求3位数组成的最大回文数 9009类似*/
	var number_one = 999;
	var number_two = 999;
	var stop = false;
	for (var i = 999 * 999; i > 100 * 100; i--) {
		if (ifPalindromic(i)) {
			for (var j = 999; j > 100; j--) {
				if (i % j == 0 && i / j <= 999) {
					console.log(i);
					stop = true;
					break;
				}
			}
		}
		if(stop) break;
	}
	function ifPalindromic(num) {
		var numToArr = num.toString().split('');
		if (numToArr.length % 2 != 0) return false;
		var strLen = numToArr.length;
		var arrOne = numToArr.splice(0, strLen / 2);
		if (arrOne.toString() == numToArr.reverse().toString()) return true;
		else return false;
	}
}
// problem4();


function problem5() {         /*求最小公倍数*/
	var num = 20;
	var nowSmallestPositiveNumer = 1;
	for(var i = 1; i < num; i++){
		nowSmallestPositiveNumer*=i;
	}
	for(var j = 1; j <= nowSmallestPositiveNumer; j++){
		for(var k = 1;k<=num;k++){
			if(j%k!==0){
				break;
			}else if(k===num){
				console.log(j);
				return ;
			}
		}
	}
}	
// problem5();


function problem6() {
	var max = 100;
	var total_one = 0,
		total_two = 0;
	var answer;
	for (var i = 1; i <= 100; i++) {
		total_one += i * i;
	}
	total_two = (1 + 100) * 100 / 2 * (1 + 100) * 100 / 2;
	answer = total_two - total_one;
	console.log(answer);
}
// problem6();
