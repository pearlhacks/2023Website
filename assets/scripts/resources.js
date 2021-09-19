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

    let html = "";
    
    for (let r = 0; r < resource.length; r++) {
        html+= `<h3 class="mt-5">${resource[r]}</h3>
        <p><a href="${resourceLink[r]}" target="_blank">${resource[r]}</a> <span>${more[r] ? more[r] : ""}</span></p>`
    }
    return html;
}

$(document).ready(function () {
    getResource().then((data) => {
        document.getElementById("resources").innerHTML = data
    });
});