window.addEventListener('load', init);

function init() {
    /* Creates and initializes the buttons */
    let niz = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let text = ["AC", "DEL", "/", "1", "0", "*", "=", "+", "-"];
    for (let i = 1; i <= 9; i++) {
        let button = document.createElement('button');
        button.id = 'btn' + i;
        button.classList.add("button");
        button.innerHTML = text[i - 1];
        let div = document.querySelector('.buttons');
        div.appendChild(button);
        button.style.gridArea = niz[i - 1];
    }

    let operators = [];

    let display = document.querySelector(".display");
    display.innerHTML = "0";

    let ac = document.getElementById('btn1');
    ac.addEventListener('click', () => {
        let display = document.querySelector(".display");
        display.innerHTML = "0";
        operators = [];
    })

    let btn1 = document.getElementById('btn4');
    btn1.addEventListener('click', () => {
        let display = document.querySelector(".display");
        if (display.innerHTML == "0")
            display.innerHTML = "";
        display.innerHTML += "1";
    })

    let btn0 = document.getElementById('btn5');
    btn0.addEventListener('click', () => {
        let display = document.querySelector(".display");
        if (display.innerHTML == "0")
            display.innerHTML = "";
        display.innerHTML += "0";
    })

    let divide = document.getElementById('btn3');
    divide.addEventListener('click', () => {
        let display = document.querySelector(".display");
        let lastChar = display.innerHTML[display.innerHTML.length - 1];
        if (lastChar === "/") {
            // do nothing
        } else if (lastChar === "+" || lastChar === "-" || lastChar === "*") {
            display.innerHTML = display.innerHTML.slice(0, -1) + "/"; // changes last character with "/"
            operators[operators.length-1] = "/";
        } else {
            display.innerHTML += "/";
            operators.push("/");
        }
    })

    let miltiply = document.getElementById('btn6');
    miltiply.addEventListener('click', () => {
        let display = document.querySelector(".display");
        let lastChar = display.innerHTML[display.innerHTML.length - 1];
        if (lastChar === "*") {
            // do nothing
        } else if (lastChar === "+" || lastChar === "-" || lastChar === "/") {
            display.innerHTML = display.innerHTML.slice(0, -1) + "*";
            operators[operators.length-1] = "*";
        } else {
            display.innerHTML += "*";
            operators.push("*");
        }
    })

    let subtract = document.getElementById('btn9');
    subtract.addEventListener('click', () => {
        let display = document.querySelector(".display");
        let lastChar = display.innerHTML[display.innerHTML.length - 1];
        if (lastChar === "-") {
            // do nothing
        } else if (lastChar === "+" || lastChar === "/" || lastChar === "*") {
            display.innerHTML = display.innerHTML.slice(0, -1) + "-";
            operators[operators.length-1] = "-";
        } else {
            display.innerHTML += "-";
            operators.push("-");
        }
    })

    let add = document.getElementById('btn8');
    add.addEventListener('click', () => {
        let display = document.querySelector(".display");
        let lastChar = display.innerHTML[display.innerHTML.length - 1];
        if (lastChar === "+") {
            // do nothing
        } else if (lastChar === "/" || lastChar === "-" || lastChar === "*") {
            display.innerHTML = display.innerHTML.slice(0, -1) + "+";
            operators[operators.length-1] = "+";
        } else {
            display.innerHTML += "+";
            operators.push("+");
        }
    })

    let del = document.getElementById('btn2');
    del.addEventListener('click', () => {
        let display = document.querySelector(".display");
        if (display.innerHTML == "1")
            display.innerHTML = "0";
        else if (display.innerHTML == "0") {
            //do nothing
        } else {
            let n = display.innerHTML.length;
            if(display.innerHTML[n-1]=="+"||display.innerHTML[n-1]=="-"||display.innerHTML[n-1]=="*"||display.innerHTML[n-1]=="/")
                operators = operators.slice(0,operators.length-1);
            display.innerHTML = display.innerHTML.split("").slice(0, display.innerHTML.split("").length - 1).join("");
        }
    })

    let equal = document.getElementById('btn7');
    equal.addEventListener('click', () => {
        let display = document.querySelector(".display");
        let regex = /[+\-*/]/;
        let operands = display.innerHTML.split(regex);
        for(let i=0;i<operators.length;i++) { // just for * and /
            if(operators[i]=="*") {
                operands[i] = (parseInt(operands[i],2)*parseInt(operands[i+1],2)).toString(2);
                operands.splice(i+1,1);
                operators.splice(i,1);
                i--;
            } else if(operators[i]=="/") {
                operands[i] = Math.floor((parseInt(operands[i],2)/parseInt(operands[i+1],2))).toString(2);
                operands.splice(i+1,1);
                operators.splice(i,1);
                i--;
            }
        }
        for(let i=0;i<operators.length;i++) { //now for + and -
            if(operators[i]=="+") {
                operands[i] = (parseInt(operands[i],2)+parseInt(operands[i+1],2)).toString(2);
                operands.splice(i+1,1);
                operators.splice(i,1);
                i--;
            } else if(operators[i]=="-") {
                operands[i] = (parseInt(operands[i],2)-parseInt(operands[i+1],2)).toString(2);
                operands.splice(i+1,1);
                operators.splice(i,1);
                i--;
            }
        }
        display.innerHTML = operands[0].toString(2);
        operands = [operands[0]];
        operators = [];
    })
}
