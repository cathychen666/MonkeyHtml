var isStarted = false;
function startGame()
{
    $("#startBtn").hide();
    $("#stopBtn").show();

    if (isStarted) {
        timedCount();
        timedCount1();
        return;
    }

    isStarted = true;

    //add stop button
    var stopBtnHtml = "<button type='button' id='stopBtn' onclick='stopGame()'>stop</button>";
    $(".header").append(stopBtnHtml);

    //remove right view and footer view
    $(".right").remove();
    $(".footer").remove();

    //change left view and middle view size
    $(".main").animate({height:'430px'});
    $(".left").animate({height:'430px'});
    document.getElementById("middle").style.height = "430px";
    document.getElementById("middle").style.width = "calc(100% - 100px)";

    //add 7*7 square
    $("#middle").empty();
    for (var index = 0; index < 49; index++) {
        var squareHtml = "<div class='newSquare' onclick='squareClicked(this)' id='" + index + "'></div>";
        $("#middle").append(squareHtml);
    }

    //add time and score in left view
    var timeHtml = "<div><p id='time'>time:30s</p></div>";
    $(".left").append(timeHtml);
    var scoreHtml = "<div'><p id='score'>score:0</p></div>";
    $(".left").append(scoreHtml);

    //create timer 30s
    timedCount();
    timedCount1();
}

function stopGame()
{
    $("#startBtn").show();
    $("#stopBtn").hide();

    alert("Game Over! Your Score:" + score + "!");
    $("#time").html("time:30s");
    $("#score").html("score:0");

    clearSquare();
    clearTimeout(timerOut);
    clearSquare1();
    clearTimeout(timerOut1);
    time = 30;
    timerOut = null;
    timerOut1 = null;
    random = 0;
    random1 = 0;
    score = 0;
}

var time = 30;
var timerOut, timerOut1;
var random, random1;
var score = 0;
function timedCount()
{
    $("#time").html("time:" + time + "s");
    time--;
    if (time >= 0) {
        changeSquare();
        timerOut = setTimeout("timedCount()",1000);
    } else {
        stopGame();
    }
}

function changeSquare()
{
    clearSquare();
    random = Math.floor(Math.random() * 49);
    var classRandom = Math.floor(Math.random() * 2);
    var className = (classRandom % 2 == 0) ? "mouse" : "bomb";
    $("#" + random).addClass(className);
}

function clearSquare()
{
    $("#" + random).removeClass("mouse");
    $("#" + random).removeClass("bomb");
    $("#" + random).removeClass("bam");
    $("#" + random).removeClass("heat");
}

function squareClicked(obj)
{
    if ($(obj).hasClass("mouse")) {
        score++;
        var idString = $(obj).attr("id");
        $("#" + idString).addClass("heat");
        $("#" + idString).removeClass("mouse");
        $("#" + idString).removeClass("bomb");
    } else if ($(obj).hasClass("bomb")) {
        score--;
        var idString = $(obj).attr("id");
        $("#" + idString).addClass("bam");
        $("#" + idString).removeClass("mouse");
        $("#" + idString).removeClass("bomb");
    }
    $("#score").html("score:" + score);
}

function timedCount1()
{
    if (time >= 0) {
        changeSquare1();
        timerOut1 = setTimeout("timedCount1()",1600);
    } else {
        clearSquare1();
        clearTimeout(timerOut1);
    }
}

function changeSquare1()
{
    clearSquare1();
    random1 = Math.floor(Math.random() * 49);
    var classRandom = Math.floor(Math.random() * 2);
    var className = (classRandom % 2 == 0) ? "mouse" : "bomb";
    $("#" + random1).addClass(className);
}

function clearSquare1()
{
    $("#" + random1).removeClass("mouse");
    $("#" + random1).removeClass("bomb");
    $("#" + random1).removeClass("bam");
    $("#" + random1).removeClass("heat");
}
