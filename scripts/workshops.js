function buildWorkshops(data) {
    let html = "<div class='table mt-4 rounded'>";
    html += `<div class='rounded-top row mx-0 text-center font-weight-bold th py-2 text-uppercase'>
                <div class='col-2 font-weight-bold'>
                    Time
                    </div>
                    <div class='col-6'>
                        Title
                    </div>
                    <div class='col-2'>
                        Room
                    </div>
                    <div class='col-2'>
                        Level
                    </div>
                </div>`;
    data.forEach((event) => {
        console.log(event)
        let row = "<div class='row mx-0 text-center py-2'>";
        row += `
        <div class='col-2 font-weight-bold'>
            ${event['Time']}
        </div>
        <div class='col-6'>
            ${event['Workshop Title']}
        </div>
        <div class='col-2'>
            ${event['Room']}
        </div>
        <div class='col-2'>
            ${event['Level']}/3
        </div>`;
        row += "</div>";
        html += row;
    });
    
    return html + "</div>";
}

$(document).ready(function () {
    let workshops = "";
    fetchData('15L2munTuAObRbaxE48rTaveJnVm_iC5uJCEDYt82y9E', '1').then((data) => {
        workshops += buildWorkshops(data.filter(item => item != null));
        document.getElementById("workshops").innerHTML = workshops;
        // console.log(document.getElementById("workshops"))
    });
});