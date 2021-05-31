function buildHTMLString(data) {
    let html = "<div class='d-flex flex-wrap justify-content-center align-items-center align-content-center'>";
    let pearl = "<div class='row'>";
    let gold = "<div class='row'>";
    let silver = "<div class='row'>";
    let custom = "<div class='row'>";
    data.forEach((sponsor) => {
        if (sponsor['Sponsor Tier'] === 'Pearl') {
            pearl += 
            `<div class='col-12 col-lg-6 pearl p-3'>
                <a href="${sponsor['Sponsor Site URL']}" target='new'>
                    <img src='${sponsor['Sponsor Image URL']}' class='img-fluid' alt='${sponsor['Sponsor Title']}'>
                </a>
            </div>`;
        }

        else if (sponsor['Sponsor Tier'] === 'Gold') {
            gold += 
            `<div class='col-12 col-lg-4 gold p-3'>
                <a href="${sponsor['Sponsor Site URL']}" target='new'>
                    <img src='${sponsor['Sponsor Image URL']}' class='img-fluid' alt='${sponsor['Sponsor Title']}'>
                </a>
            </div>`;
        }

        else if (sponsor['Sponsor Tier'] === 'Silver') {
            silver += 
            `<div class='col-12 col-lg-3 silver p-3'>
                <a href="${sponsor['Sponsor Site URL']}" target='new'>
                    <img src='${sponsor['Sponsor Image URL']}' class='img-fluid' alt='${sponsor['Sponsor Title']}'>
                </a>
            </div>`;
        }
        
        else {
            custom += 
            `<div class='col-12 col-lg-2 custom p-3'>
                <a href="${sponsor['Sponsor Site URL']}" target='new'>
                    <img src='${sponsor['Sponsor Image URL']}' class='img-fluid' alt='${sponsor['Sponsor Title']}'>
                </a>
            </div>`;
        }
    });
    pearl += "</div>";
    gold += "</div>";
    silver += "</div>";
    custom += "</div>";
    return html + pearl + gold + silver + custom + "</div>";
}

$(document).ready(function () {
    fetchData('1biudrolhcYpl1ldsUFrGwR38bS3UaBWApW-ui1x1Gvc', '1').then((data) => {
        document.getElementById("sponsors").innerHTML = buildHTMLString(data)
    });
});