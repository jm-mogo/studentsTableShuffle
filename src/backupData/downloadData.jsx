function downloadData(students) {
    const csvmaker = function (data) {
        const csvRows = [];

        // Headers is basically a keys of an object which
        // is id, name, and profession
        const headers = Object.keys(data[0]);

        // As for making csv format, headers must be
        // separated by comma and pushing it into array
        csvRows.push(headers.join(","));

        // Pushing Object values into the array with
        // comma separation

        // Looping through the data values and make
        // sure to align values with respect to headers
        for (const row of data) {
            const values = headers.map((e) => {
                return row[e];
            });
            csvRows.push(values.join(","));
        }
        // const values = Object.values(data).join(',');
        // csvRows.push(values)

        // returning the array joining with new line
        download(csvRows.join("\n"));
    };

    const download = (data) => {
        // Create a Blob with the CSV data and type
        const blob = new Blob([data], { type: "text/csv" });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor tag for downloading
        const a = document.createElement("a");

        // Set the URL and download attribute of the anchor tag
        a.href = url;
        a.download = "backup-students.csv";

        // Trigger the download by clicking the anchor tag
        a.click();
    };
    csvmaker(students);
}
export default downloadData;
