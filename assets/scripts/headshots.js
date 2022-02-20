let link = 'https://script.google.com/macros/s/AKfycbzky5bSUWS3gWTKw6Kwg0LvMJaD-gLu98jiCvrt_73VN6rq336uZwNYPQ4Dq01ywO8Bfg/exec'
async function makeGetRequest() {

    let res = await axios.get(link,        {
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    let data = res.data.GoogleSheetData;
    let html = "<div class='d-flex flex-wrap justify-content-center'>";

    for(let i = 1; i < data.length; i++){
        let idx=0;
        let names = data[i][idx];
        let position = data[i][idx + 1];
        let pic = data[i][idx + 2];
        let pronouns = data[i][idx + 3];
        html += 
        `<div class='text-center d-flex flex-column justify-content-start align-items-center align-content-center px-2'>
            <div style="background: url('${pic}') center;" class='headshot rounded-circle m-3'>
            </div>
            <h3 class='m-0'>
            ${names}
            </h3>
            <p class="p-0 m-0 text-muted">${pronouns}</p>
            <span style="width: 200px;">${position}</span>
        </div>`;

    }

    html += "</div>"
    return html;
}

$(document).ready(function () {
    // Director Info
    makeGetRequest().then((data) => {
        document.getElementById("directorinfo").innerHTML = data
    });
});