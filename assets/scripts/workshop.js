let workshop = `https://script.google.com/macros/s/AKfycbxur1foeZwz7LQ7Bjmrhh8K9jqcUrq8W6pUtWG7gjmXx2PuMl5HVs16Q_ur57-GJ6awCA/exec`;

async function makeGetRequest() {

    let res = await axios.get(workshop);
    let data = res.data.GoogleSheetData;
    let w1 = ''
    let w2 = ''
    let w3 = ''
    let w4 = ''
    let w5 = ''
    for(let i = 1; i < data.length; i++){
        let idx=0;
        let content =`<tr style="background-color: white">
                        <td>${data[i][idx+3]}</td>
                        <td>
                            <span class="collapser desc-ws collapsed" data-toggle="collapse" data-target="#${data[i][idx+7]}" role="button" aria-expanded="false" aria-controls="${data[i][idx+7]}">${data[i][idx+1]}</span>
                            <div class="collapse" id="${data[i][idx+7]}">${data[i][idx+5]}</div>
                            <td>${data[i][idx+4]}</td>
                            <td>${data[i][idx+2]}</td>
                        </td>
                        </tr>`
        if(data[i][idx] == '1'){
            w1+= content
        } else if(data[i][idx] == '2'){
            w2+=content
        } else if(data[i][idx] == '3'){
            w3+=content
        } else if(data[i][idx] == '4'){
            w4+=content
        } else if(data[i][idx] == '5'){
            w5+=content
        }

    }
    return w1+ w2+ w3+ w4+ w5
}

$(document).ready(function () {
    // Director Info
    makeGetRequest().then((data) => {
        document.getElementById("workshop-content").innerHTML += data
    });
});