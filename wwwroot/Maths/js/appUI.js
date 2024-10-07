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
        RenderCalculation();
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