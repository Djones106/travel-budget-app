const chart = document.querySelector(".chart");

// Create Canvas Element
const canvas = document.createElement("canvas");
canvas.width = 50;
canvas.hight = 50;

//Append Canvas to Chart Element
chart.appendChild(canvas);

//To Drawing on canvas - context
const ctx = canvas.getContext("2d");

//Line Width
ctx.lineWidth = 8;

//Circle Radius
const R = 20;

function drawCircle(color, radio, anticlockwise){

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(canvas.width/2, R, 0, ratio * 2 * Math.PI, anticlockwise);
    ctx.stroke();

};

function updateChart(income, outcome){

    let ratio = income / (income+outcome)

    drawCircle("#FFFFF", - ratio, true);
    drawCircle("#F0624D", 1 - ratio, false);
}

updateChart(500,500);