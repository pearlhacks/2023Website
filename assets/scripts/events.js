let eventlink = 'https://script.google.com/macros/s/AKfycbyIl2pAx5XjWpxcdFh_nIz5iJOk8YIySvnc5O4T1gVwRd9YhbpnfJlJUZij1t5UNswRmA/exec';
async function getSponsor() {

    let res = await axios.get(eventlink,
        {
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

    let data = res.data.GoogleSheetData;
    let id = [];
    let event = [];
    let start = [];
    let end = [];
    let location = [];
    let medium = [];
    let details = [];
    let checkin = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 1; i < data.length; i++) {
        let idx = 0
        id.push(data[i][idx]);
        event.push(data[i][idx+1]);
        start.push(data[i][idx+2]);
        end.push(data[i][idx+3]);
        location.push(data[i][idx+4]);
        medium.push(data[i][idx+5]);
        details.push(data[i][idx+6]);
        checkin.push(data[i][idx+7]);
    }

    let upcoming = "<h2 class='year mt-2 text-center'>Upcoming Events</h3>";
    let past = "<h2 class='year mt-2 text-center'>Past Events</h3>";
    let current = "";
    let archive = "";
   for (let s = 0; s < event.length; s++) {
        let startTime = new Date(start[s])
        let endTime = new Date(end[s])
        console.log
        let eventcontainer = `<div class='event'>
                                <div class='event-left'>
                                    <div class='event-date'>
                                        <div class="date">${startTime.getDate()}</div>
                                        <div class="month">${monthNames[startTime.getMonth()]}</div>
                                    </div>
                                </div>
                                <div class="event-right">
                                    <h3 class="event-title">${event[s]}</h3>
                                    <div class="event-description">
                                        ${details[s]}
                                    </div>
                                    <div class="event-timing">
                                    <div><i class="fas fa-clock pr-1"></i>
                                    ${startTime.getHours()>12?startTime.getHours()-12:startTime.getHours()}:${startTime.getMinutes()<10?'00':'' + startTime.getMinutes()}${startTime.getHours() > 11 ? 'PM' : 'AM'}
                                        - ${endTime.getHours() > 12 ? endTime.getHours()-12:endTime.getHours()}:${endTime.getMinutes()<10?'00':'' + endTime.getMinutes()}${endTime.getHours() > 11 ? 'PM' : 'AM'} (EST)</div>
                                        <div><strong>Location: </strong>${location[s]}</div>
                                        </div>
                                        <a class="checkin" href="${checkin[s]}">Register</a>

                                </div>
                            </div>`;
        if(id[s] == "Upcoming") {
            current += eventcontainer
        } else {
            archive += eventcontainer
        }
    }

    return upcoming + current + past + archive;
}


$(document).ready(function () {
    getSponsor().then((data) => {
        document.getElementById("events").innerHTML = data
    });
});
