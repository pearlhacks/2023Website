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
        resourceLink.push(data[i][idx + 1]);
        category.push(data[i][idx + 2]);
        more.push(data[i][idx + 3]);
    }
    let projects = `<h2 class="my-5">Past Projects</h2> <div class="resources-grid mb-5">`;
    let starter = `<h2 class="my-5">Where to Start?</h2> <div class="resources-grid">`;
    let resources = `<h2 class="my-5">Useful Tools & Articles</h2><div class="resources-grid2 mb-5"><div class="resources-card2"><h3 class="my-4">Hackathon Resources</h3><ul>`;
    let womenintech = `<div class="resources-card2"><h3 class="my-4">Visibility in Tech</h3><ul>`;
    let html = "";


    for (let r = 0; r < resource.length; r++) {
        if (category[r] == "Hackathon Projects") {
            projects += `<a href="${resourceLink[r]}" style = "color: var(--darkblue)" target="_blank"><div class="resources-card"><h3 class="mt-2 resource-link">
            <img class = "resources-img" src = "${more[r]}"/>
            <br>
            ${resource[r]}</h3> </div></a>`
        } else if (category[r] == "General Hacking") {
            resources += `<li>
            <a href="${resourceLink[r]}" style = "color: var(--darkblue)" class="mt-2 resource-link" target="_blank">${resource[r]}</a></li>`
        } else if (category[r] == "Non-Traditional Technologists") {
            womenintech += `<li>
            <a href="${resourceLink[r]}" class="mt-2 resource-link" style = "color: var(--darkblue)" target="_blank">${resource[r]}</a></li>`
        } else if (category[r] == "Starter") {
            starter += ` <a href="${resourceLink[r]}" style = "color: var(--darkblue)" target="_blank"><div class="resources-card"><h3 class="mt-2 resource-link">
            <img class = "resources-img" src = "${more[r]}"/>
            <br>
           ${resource[r]}</h3> </div></a>`
        }
    }

    projects += "</div>"
    starter += "</div>"
    resources += "</ul></div>"
    womenintech += "<ul></div></div>"
    html += starter
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