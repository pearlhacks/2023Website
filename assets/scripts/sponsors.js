let sponsorlink =
  "https://script.google.com/macros/s/AKfycbxLyjCzLzQKkUBHOtDzVnAs8pGozwicf4cWY98v2SL9AqE7WvWKvQbocmylHz5dQuzgaA/exec";
async function getSponsor() {
  let res = await axios.get(sponsorlink, {
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  let data = res.data.GoogleSheetData;
  let html =
    "<div class='d-flex flex-wrap justify-content-center align-items-center align-content-center'>";
  let pearl =
    "<div class='row d-flex justify-content-center align-items-center'>";
  let gold =
    "<div class='row d-flex justify-content-center align-items-center'>";
  let silver =
    "<div class='row d-flex justify-content-center align-items-center'>";
  let custom =
    "<div class='row d-flex justify-content-center align-items-center'>";
  let closeDiv = "</div>";
  for (let i = 1; i < data.length; i++) {
    let idx = 0;
    let sponsorData = `<a href="${
      data[i][idx + 1]
    }" target="_blank" rel="noopener">
                                <img src='${
                                  data[i][idx + 2]
                                }' class='img-fluid' alt='${data[i][idx]}'>
                        </a></div>`;
    let tier = data[i][idx + 3];
    if (tier === "Pearl") {
      pearl += `<div class='col-12 col-lg-6 pearl p-2'>${sponsorData}`;
    } else if (tier === "Gold") {
      gold += `<div class='col-12    col-lg-12 gold p-2'>${sponsorData}`;
    } else if (tier === "Silver") {
      silver += `<div class='col-6 col-lg-3 silver px-3 py-1'>${sponsorData}`;
    } else {
      custom += `<div class='col-4 col-lg-3 custom p-3'>${sponsorData}`;
    }
  }
  return (
    html +
    pearl +
    closeDiv +
    gold +
    closeDiv +
    silver +
    closeDiv +
    custom +
    closeDiv +
    closeDiv
  );
}

$(document).ready(function () {
  getSponsor().then((data) => {
    document.getElementById("sponsorsinfo").innerHTML = data;
  });
});
