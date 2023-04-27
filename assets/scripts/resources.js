let link = 'https://script.google.com/macros/s/AKfycbyq316aGjYVvxKd4D4IaB39KE--8VxLMZHAsb8wp1PiQrhEjJtq7t2f7lkdxUDVQEBR6A/exec'
async function getResource() {

    let res = await axios.get(link, {
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    let data = res.data.GoogleSheetData;
    let projects = `<h2 class="my-5">Past Projects</h2> <div class="resources-grid mb-5">`;
    let starter = `<h2 class="my-5">Where to Start?</h2> <div class="resources-grid">`;
    let resources = `<h2 class="my-5">Useful Tools & Articles</h2><div class="resources-grid2 mb-5"><div class="resources-card2"><h3 class="my-4">Hackathon Resources</h3><ul>`;
    let womenintech = `<div class="resources-card2"><h3 class="my-4">Visibility in Tech</h3><ul>`;
    let technical = `<div class="resources-grid2 mb-5"><div class="resources-card2"><h3 class="my-4">Hackathon Resources</h3><ul>`;
    let mental = `<div class="resources-card2"><h3 class="my-4">Social & Mental Resources </h3><ul>`;

    for (let i = 1; i < data.length; i++) {
        let idx = 0
        let resource = data[i][idx];
        let resourceLink = data[i][idx + 1];
        let category = data[i][idx + 2];
        let more = data[i][idx + 3];

        if (category == "Hackathon Projects") {
            projects += `<a href="${resourceLink}" style = "color: var(--darkblue)" target="_blank"><div class="resources-card"><h3 class="mt-2 resource-link">
            <img class = "resources-img" src = "${more}"/>
            <br>
            ${resource}</h3> </div></a>`
        } else if (category == "General Hacking") {
            resources += `<li>
            <a href="${resourceLink}" style = "color: var(--darkblue)" class="mt-2 resource-link" target="_blank">${resource}</a></li>`
        } else if (category == "Non-Traditional Technologists") {
            womenintech += `<li>
            <a href="${resourceLink}" class="mt-2 resource-link" style = "color: var(--darkblue)" target="_blank">${resource}</a></li>`
        } else if (category == "Starter") {
            starter += ` <a href="${resourceLink}" style = "color: var(--darkblue)" target="_blank"><div class="resources-card"><h3 class="mt-2 resource-link">
            <img class = "resources-img" src = "${more}"/>
            <br>
           ${resource}</h3> </div></a>`
        } else if (category == "Technical Help") {
            technical += `<li>
            <a href="${resourceLink}" class="mt-2 resource-link" style = "color: var(--darkblue)" target="_blank">${resource}</a></li>`
        } else if (category == "Mental") {
            mental += `<li>
            <a href="${resourceLink}" class="mt-2 resource-link" style = "color: var(--darkblue)" target="_blank">${resource}</a></li>`
        }
    }

    projects += "</div>"
    starter += "</div>"
    resources += "</ul></div>"
    womenintech += "<ul></div></div>"
    technical += "<ul></div>"
    mental += "<ul></div></div>"
    return starter + projects + resources + womenintech + technical + mental;
}

$(document).ready(function () {
    getResource().then((data) => {
        document.getElementById("resources").innerHTML = data
    });
});