async function fetchData(id, num, keepHeader=false) {
    const response = await fetch(`https://spreadsheets.google.com/feeds/cells/${id}/${num}/public/full?alt=json`);
    const data = await response.json();
    let rows = [];
    let headers = [];
    data['feed']['entry'].forEach((cell) => {
        let rownum = cell['title']['$t'].substring(1) - 1;
        let colnum = cell['title']['$t'].substring(0, 1).charCodeAt(0) - 65;
        let content = isNaN(Number(cell['content']['$t'])) ? cell['content']['$t'].trim() : Number(cell['content']['$t']);
        // Get Headers
        if (rownum == 0) {
            headers.push(content);
        }
        else if (keepHeader || (!keepHeader && rownum != 0)) {
            // Build out rows
            if (rows[rownum] === undefined) {
                rows[rownum] = {};
            }
            rows[rownum][headers[colnum]] = content;
        }

    });
    return rows;
}

