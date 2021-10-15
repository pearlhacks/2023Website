let link = 'https://script.google.com/macros/s/AKfycbxLyjCzLzQKkUBHOtDzVnAs8pGozwicf4cWY98v2SL9AqE7WvWKvQbocmylHz5dQuzgaA/exec'
async function getSponsor() {

    let res = await axios.get(link);

    let data = res.data.GoogleSheetData;
    let sponsor = [];
    let site = [];
    let image = [];
    let tier = [];
    for (let i = 1; i < data.length; i++) {
        let idx = 0
        sponsor.push(data[i][idx]);
        site.push(data[i][idx+1]);
        image.push(data[i][idx+2]);
        tier.push(data[i][idx+3]);
    }
    console.log(sponsor)
    console.log(site)

    let html = "<div class='d-flex flex-wrap justify-content-center align-items-center align-content-center'>";
    let pearl = "<div class='row d-flex justify-content-center align-items-center'>";
    let gold = "<div class='row d-flex justify-content-center align-items-center'>";
    let silver = "<div class='row d-flex justify-content-center align-items-center'>";
    let custom = "<div class='row d-flex justify-content-center align-items-center'>";
    for (let s = 0; s < sponsor.length; s++) {
        if(tier[s] === "Pearl"){
            pearl += `<div class='col-12 col-lg-6 pearl p-3'>
                        <a href="${site[s]}" target='_blank' rel="noopener">
                        <img src='${image[s]}' class='img-fluid' alt='${sponsor[s]}'>
                        </a></div>`
        } else if(tier[s] === "Gold"){
            gold += `<div class='col-12 col-lg-4 gold p-3'>
                        <a href="${site[s]}" target='_blank' rel="noopener">
                        <img src='${image[s]}' class='img-fluid' alt='${sponsor[s]}'>
                        </a></div>`
        }
         else if(tier[s] === "Silver"){
            silver += `<div class='col-12 col-lg-3 silver p-3'>
                        <a href="${site[s]}" target='_blank' rel="noopener">
                        <img src='${image[s]}' class='img-fluid' alt='${sponsor[s]}'>
                        </a></div>`
        } else{
            custom +=  `<div class='col-12 col-lg-2 custom p-3'>
                        <a href="${site[s]}" target='_blank' rel="noopener">
                        <img src='${image[s]}' class='img-fluid' alt='${sponsor[s]}'>
                        </a></div>`
        }
    }
    pearl += "</div>";
    gold += "</div>";
    silver += "</div>";
    custom += "</div>";
    return html + pearl + gold + silver + custom + "</div>";
}

$(document).ready(function () {
    getSponsor().then((data) => {
        document.getElementById("sponsorsinfo").innerHTML = data
    });
});