let link = 'https://script.google.com/macros/s/AKfycbyq316aGjYVvxKd4D4IaB39KE--8VxLMZHAsb8wp1PiQrhEjJtq7t2f7lkdxUDVQEBR6A/exec'
async function getResource() {

    let res = await axios.get(link);

    let data = res.data.GoogleSheetData;
    let resource = [];
    let resourceLink = [];
    let category = [];
    let more = [];
    for (let i = 1; i < data.length; i++) {
        let idx = 0
        resource.push(data[i][idx]);
        resourceLink.push(data[i][idx+1]);
        category.push(data[i][idx+2]);
        more.push(data[i][idx+3]);
    }
    let projects = `<h2 class="mb-4">Past Projects</h2> <div class="row">`;
    let resources = `<h2 class="my-4">Hackathon Resources</h2> <div class="row">`;
    let womenintech = `<h2 class="my-4">Visibility in Tech</h2> <div class="row">`;
    let html = "";


    
    for (let r = 0; r < resource.length; r++) {
        if(category[r] == "Hackathon Projects"){
            projects+= `<div class="col-xs-12 col-md-6"><h3 class="mt-2">${resource[r]}</h3>
            <p><a href="${resourceLink[r]}" target="_blank">${resource[r]}</a> <span>${more[r] ? more[r] : ""}</span></p> </div>`
        } else if (category[r] == "General Hacking"){
            resources+= `<div class="col-xs-12 col-md-6"><h3 class="mt-2">${resource[r]}</h3>
            <p><a href="${resourceLink[r]}" target="_blank">${resource[r]}</a> <span>${more[r] ? more[r] : ""}</span></p> </div>`
        } else if (category[r] == "Non-Traditional Technologists"){
            womenintech += `<div class="col-xs-12 col-md-6"><h3 class="mt-2">${resource[r]}</h3>
            <p><a href="${resourceLink[r]}" target="_blank">${resource[r]}</a> <span>${more[r] ? more[r] : ""}</span></p> </div>`
        }
    }

    projects+="</div>"
    resources+="</div>"
    womenintech +="</div>"

    html += projects
    html += resources
    html += womenintech

    return html;
}

$(document).ready(function () {
    getResource().then((data) => {
        document.getElementById("resources").innerHTML = data
    });
});