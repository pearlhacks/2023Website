function buildScheduleTable(data, header) {
    let html = "<div class='table mt-4 rounded'>";
    html += `<div class='rounded-top row mx-0 text-center font-weight-bold th py-2 text-uppercase'>
                <div class='col-12'>  
                    ${header}
                </div>
            </div>`;
    data.forEach((event) => {
        let row = "<div class='row mx-0 text-center py-2'>";
        row += `
        <div class='col-3 font-weight-bold'>
            ${event['Time']}
        </div>
        <div class='col-6'>
            ${event['Event']}
        </div>
        <div class='col-3'>
            ${event['Location']}
        </div>`;
        row += "</div>";
        html += row;
    });
    
    return html + "</div>";
}

$(document).ready(function () {
    // Friday
    let schedule = "";
    fetchData('1Dgw8Iu_UupbrTwnYgy-MAAeHTHQgcgYhgHa93wQk2M4', '1').then((data) => {
        schedule += buildScheduleTable(data.filter(item => item != null), "Friday");
        // Saturday
        fetchData('1Dgw8Iu_UupbrTwnYgy-MAAeHTHQgcgYhgHa93wQk2M4', '2').then((data) => {
            schedule += buildScheduleTable(data.filter(item => item != null), "Saturday");
            // Sunday
            fetchData('1Dgw8Iu_UupbrTwnYgy-MAAeHTHQgcgYhgHa93wQk2M4', '3').then((data) => {
                schedule += buildScheduleTable(data.filter(item => item != null), "Sunday");
                document.getElementById("schedule").innerHTML = schedule;
            });
        });
    });
});