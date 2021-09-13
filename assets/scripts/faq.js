let link = 'https://script.google.com/macros/s/AKfycbz6X5a9OCGCNkFkpW2qpIayQL7HQfC1zYYj5VSPdc2L0o-4G6v5mLoQe0PA_FK_HNxjBQ/exec'
async function getFAQ() {

    let res = await axios.get(link);

    let data = res.data.GoogleSheetData;
    let beginner = [];
    let general = [];
    let guidelines = [];
    for (let i = 1; i < data.length; i++) {
        if (data[i][2] == "Beginner's FAQs") {
            beginner.push(data[i])
        } else if (data[i][2] == "General FAQs") {
            general.push(data[i])
        } else {
            guidelines.push(data[i])
        }
    }

    let html = "<h2>Beginner's FAQ</h2><div id='beginnerfaq'><div class='row'>";
    for (let b = 0; b < beginner.length; b++) {
        html += `<div class='col-12 col-lg-6'>
        <div class='rounded collapse-wrapper mb-2'>
            <h3 class='m-0 font-weight-bold collapser collapsed' data-toggle="collapse" aria-expanded="false" data-target="#beginner${b}">${beginner[b][0]}</h3>
            <div class="collapse py-2 pr-2" id="beginner${b}">${beginner[b][1]}</div>
        </div></div>`
    }

    html += "</div></div></div><h2 class='mt-5'>General FAQ</h2><div id='generalfaq'><div class='row'>"
    for (let gen = 0; gen < general.length; gen++) {
        html += `<div class='col-12 col-lg-6'>
        <div class='rounded collapse-wrapper mb-2'>
            <h3 class='m-0 font-weight-bold collapser collapsed' data-toggle="collapse" aria-expanded="false" data-target="#general${gen}">${general[gen][0]}</h3>
            <div class="collapse py-2 pr-2" id="general${gen}">${general[gen][1]}</div>
        </div></div>`
    }

    html += "</div></div></div><h2 class='mt-5'>Guidelines</h2><div id='guidelines'><div class='row'>"
    for (let gu = 0; gu < guidelines.length; gu++) {
        html += `<div class='col-12 col-lg-6'>
        <div class='rounded collapse-wrapper mb-2'>
            <h3 class='m-0 font-weight-bold collapser collapsed' data-toggle="collapse" aria-expanded="false" data-target="#guidelines${gu}">${guidelines[gu][0]}</h3>
            <div class="collapse py-2 pr-2" id="guidelines${gu}">${guidelines[gu][1]}</div>
        </div></div>`
    }
    html += "</div></div></div>"
    return html
}

$(document).ready(function () {
    getFAQ().then((data) => {
        document.getElementById("faq").innerHTML = data
    });
});