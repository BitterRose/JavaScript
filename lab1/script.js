function DoSomething() {
    var x1 = document.getElementById("in1").valueAsNumber;
    var x2 = document.getElementById("in2").valueAsNumber;
    var x3 = document.getElementById("in3").valueAsNumber;
    var x4 = document.getElementById("in4").valueAsNumber;
    
    var srednia = (x1 + x2 + x3 + x4)/4;
    var suma = (x1 + x2 + x3 + x4);
    var max = Math.max(x1, x2, x3, x4);
    var min = Math.min(x1, x2, x3, x4);
    
    document.getElementById("sum").innerHTML = "Suma: " + suma;
    document.getElementById("sr1").innerHTML = "Średnia: " + srednia;
    document.getElementById("max").innerHTML = "Max wartość: " + max;
    document.getElementById("min").innerHTML = "Min wartość: " + min;
}