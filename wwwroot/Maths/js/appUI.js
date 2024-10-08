//<span class="cmdIcon fa-solid fa-ellipsis-vertical"></span>
let contentScrollPosition = 0;
let selectedCategory = "";

Init_UI();

function Init_UI() {
    RenderMaths();
    $('#aideButton').on("click", function () {
        RenderAide();
    });
}
function RenderMaths() {
    $("#header").html(`
            <fieldset>
                <legend>Url Du site</legend>
                <input type="text" id="urlText">
                /api/maths
                <input type="button" value="Démarrer le test" id="testButton">
                <input type="button" value="Aide" id="aideButton">
            </fieldset>
        `);
    $("#content").html(`
            <fieldset>
                <legend>Tests</legend>
                <div id="mathsRespond">

                <div>
            </fieldset>
        `);
    $("#testButton").on("click", function () {
        CalculateUrl("http://localhost:5000/api/maths?op=+&x=1&y=0");
        CalculateUrl("http://localhost:5000/api/maths?op=+&x=-111&y=-244");
        CalculateUrl("http://localhost:5000/api/maths?op=-&x=1&y=abc");
        CalculateUrl("http://localhost:5000/api/maths?n=a&op=p");
        CalculateUrl("http://localhost:5000/api/maths?op=-&x=111&y244");
        CalculateUrl("http://localhost:5000/api/maths?op=*&x=11.56&y=244.12345");
        CalculateUrl("http://localhost:5000/api/maths?op=/&x=99&y=11.06");
        CalculateUrl("http://localhost:5000/api/maths?op=/&x=99&y=0");
        CalculateUrl("http://localhost:5000/api/maths?op=/&x=0&y=0");
        CalculateUrl("http://localhost:5000/api/maths?op=%&x=5&y=5");
        CalculateUrl("http://localhost:5000/api/maths?op=%&x=100&y=13");
        CalculateUrl("http://localhost:5000/api/maths?op=%&x=100&y=0");
        CalculateUrl("http://localhost:5000/api/maths?op=%&x=0&y=0");

        CalculateUrl("http://localhost:5000/api/maths?n=0&op=!");
        CalculateUrl("http://localhost:5000/api/maths?n=0&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=1&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=2&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=5&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=6&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=6.5&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=113&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=114&op=p");
        CalculateUrl("http://localhost:5000/api/maths?n=1&op=np");
        CalculateUrl("http://localhost:5000/api/maths?n=30&op=np");

        CalculateUrl("http://localhost:5000/api/maths?x=111&op=+&y=244");
        CalculateUrl("http://localhost:5000/api/maths?y=244&op=+&x=111");
        CalculateUrl("http://localhost:5000/api/maths?op=+&x=111&y=244&z=0");
        CalculateUrl("http://localhost:5000/api/maths?n=5&op=!&z=0");
        CalculateUrl("http://localhost:5000/api/maths?n=5.5&op=!");
        CalculateUrl("http://localhost:5000/api/maths?z=0");
        CalculateUrl("http://localhost:5000/api/maths?n=-5&op=!");
        CalculateUrl("http://localhost:5000/api/maths?x=null");
    });
}

async function RenderCalculation() {
    let result = await Maths_API.GetCalculation($("#urlText").val());

    let str = "";

    if (result == null) {
        str = "ERREUR";
    } else {
        str = `OK ---> ` + JSON.stringify(result);
    }

    $("#mathsRespond").append(
        $(`
            <span>
                ${str}
            </span><br>
            `));
}

async function CalculateUrl(url) {
    let result = await Maths_API.GetCalculation(url);

    let str = "";

    if (result == null) {
        str = "ERREUR";
    } else {
        str = `OK ---> ` + JSON.stringify(result);
    }

    $("#mathsRespond").append(
        $(`
            <span>
                ${str}
            </span><br>
            `));
}

function RenderAide() {
    $("#header").html(``);
    $("#content").html(`
        <div class="title3">
                GET : Maths endpoint <br>
                List of possible query strings:
            </div><br>
            <hr><br>
            <div class="title4">
                ? op = + & x = number & y = number <br>
                return{"op":"+", "x":number, "y":number, "value": x + y}
            </div><br>
            <div class="title4">
                ? op = - & x = number & y = number <br>
                return{"op":"-", "x":number, "y":number, "value": x - y}
            </div><br>
            <div class="title4">
                ? op = * & x = number & y = number <br>
                return{"op":"*", "x":number, "y":number, "value": x * y}
            </div><br>
            <div class="title4">
                ? op = / & x = number & y = number <br>
                return{"op":"/", "x":number, "y":number, "value": x / y}
            </div><br>
            <div class="title4">
                ? op = % & x = number & y = number <br>
                return{"op":"%", "x":number, "y":number, "value": x % y}
            </div><br>
            <div class="title4">
                ? op = ! & n = integer <br>
                return{"op":"!", "n":integer, "value": n!}
            </div><br>
            <div class="title4">
                ? op = p & n = integer <br>
                return{"op":"p", "n":integer, "value": true if n is a prime number}
            </div><br>
            <div class="title4">
                ? op = np & n = integer <br>
                return{"op":"n", "n":integer, "value": nth prime number}
            </div><br>
    `);
}