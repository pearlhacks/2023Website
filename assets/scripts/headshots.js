let link = 'https://script.google.com/macros/s/AKfycbzky5bSUWS3gWTKw6Kwg0LvMJaD-gLu98jiCvrt_73VN6rq336uZwNYPQ4Dq01ywO8Bfg/exec'
async function makeGetRequest() {

    let res = await axios.get(link);

    let data = res.data.GoogleSheetData;
    let names = [];
    let position = [];
    let pronouns = [];
    let pic = [];
    for(let i = 1; i < data.length; i++){
        let idx=0;
        names.push(data[i][idx])
        position.push(data[i][idx+1])
        pic.push(data[i][idx+2])
        pronouns.push(data[i][idx+3])
    }
    let html = "<div class='d-flex flex-wrap justify-content-center'>";
    for(let ppl= 0; ppl < names.length; ppl++){
        html += 
        `<div class='text-center d-flex flex-column justify-content-start align-items-center align-content-center px-2'>
            <div style="background: url('${pic[ppl]}');" class='headshot rounded-circle m-3'>
            </div>
            <h3 class='m-0'>
            ${names[ppl]}
            </h3>
            <p class="p-0 m-0 text-muted">${pronouns[ppl]}</p>
            <span style="width: 200px;">${position[ppl]}</span>
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