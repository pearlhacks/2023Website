function buildHTMLString(data, target) {
    let html = "<div class='row'>";
    let col1 = "<div class='col-12 col-lg-6'>";
    let col2 = "<div class='col-12 col-lg-6'>";
    data.forEach((question, i) => {
        if (i < data.length / 2) {
            col1 += `
            <div class='rounded collapse-wrapper mb-2'>
                <h3 class='m-0 font-weight-bold collapser collapsed' data-toggle="collapse" aria-expanded="false" data-target="#${target}${i}">${question['Question']}</h3>
                <div class="collapse py-2 pr-2" id="${target}${i}">${question['Answer']}</div>
            </div>`
        }

        else {
            col2 += `
            <div class='rounded collapse-wrapper mb-2'>
                <h3 class='m-0 font-weight-bold collapser collapsed' data-toggle="collapse" aria-expanded="false" data-target="#${target}${i}">${question['Question']}</h3>
                <div class="collapse py-2 pr-2" id="${target}${i}">${question['Answer']}</div>
            </div>`
        }
    });
    col1 += "</div>"
    col2 += "</div>"
    html += col1 + col2 + "</div>"

    return html;
}

$(document).ready(function () {
    // Beginner FAQ
    fetchData('1BGIwq8YTtXVaFZjRDPbZcZNe06KYFepPu3CG1lvyVpM', '1').then((data) => {
        document.getElementById("beginnerfaq").innerHTML = buildHTMLString(data, "beginnersfaq")
    });

     // General FAQ
     fetchData('1BGIwq8YTtXVaFZjRDPbZcZNe06KYFepPu3CG1lvyVpM', '2').then((data) => {
        document.getElementById("generalfaq").innerHTML = buildHTMLString(data, "generalfaq")
    });

     // Guidelines
     fetchData('1BGIwq8YTtXVaFZjRDPbZcZNe06KYFepPu3CG1lvyVpM', '3').then((data) => {
        document.getElementById("guidelines").innerHTML = buildHTMLString(data, "guidelines")
    });
});