let schedule = `https://script.google.com/macros/s/AKfycbzUtOtwgL5MmL6AkmdfHCtmV36WTxPOb0OU5KwHcqIdEdQQWxMxAVc5pR3MboJ8oRgF-w/exec`;
let schedule2 = `https://script.google.com/macros/s/AKfycbwo0C9n0_9f2Uz7Blj9YdDFbZ4XNB1oNyux2omIuhq9-03BSJFcArJOrB3-_YbohLkh9Q/exec`;

async function getSchedule() {
  let res = await axios.get(schedule);
  let res2 = await axios.get(schedule2);
  let data = res.data.GoogleSheetData;
  let data2 = res2.data.GoogleSheetData;
  let friday2, saturday2, sunday2;
  let tableHead = `<table class="table col-12 m-0"> <tr class="header-row"> <th colspan="5">`;
  let friday =
    (friday2 = `${tableHead}<h3 class="m-0">Friday, Feb. 10th</h3></th></tr>`);
  let saturday =
    (saturday2 = `${tableHead}<h3 class="m-0">Saturday, Feb. 11th</h3></th></tr>`);
  let sunday =
    (sunday2 = `${tableHead}<h3 class="m-0">Sunday, Feb. 12th</h3></th></tr>`);
  let closeTable = `</table>`;

  for (let i = 1; i < data.length || i < data2.length; i++) {
    let idx = 0;
    if (i < data.length) {
      let content = `<tr>
            <td>${data[i][idx + 1]}</td>
            <td colspan="3">${data[i][idx]}</td>
            <td>${data[i][idx + 3]}</td>
            </tr>`;
      //   data[i][idx + 2] == "Saturday, Feb. 11th"
      //     ? (saturday += content)
      //     : (sunday += content);
      if (data[i][idx + 2] == "Friday, Feb. 10th") {
        friday += content;
      } else if (data[i][idx + 2] == "Saturday, Feb. 11th") {
        saturday += content;
      } else if (data[i][idx + 2] == "Sunday, Feb. 12th") {
        sunday += content;
      }
    }
    if (i < data2.length) {
      let content = `<tr>
            <td>${data2[i][idx + 1]}</td>
            <td colspan="3">${data2[i][idx]}</td>
            <td>${data2[i][idx + 3]}</td>
            </tr>`;
      if (data2[i][idx + 2] == "Friday, Feb. 10th") {
        friday2 += content;
      } else if (data2[i][idx + 2] == "Saturday, Feb. 11th") {
        saturday2 += content;
      } else if (data2[i][idx + 2] == "Sunday, Feb. 12th") {
        sunday2 += content;
      }
    }
  }
  let first = friday + closeTable + saturday + closeTable + sunday + closeTable;
  let second =
    friday2 + closeTable + saturday2 + closeTable + sunday2 + closeTable;
  return { tab1: first, tab2: second };
}
$(document).ready(function () {
  getSchedule().then((data) => {
    document.getElementById("tab1-content").innerHTML = data["tab1"];
    // document.getElementById("tab2-content").innerHTML = data["tab2"];
  });
});
