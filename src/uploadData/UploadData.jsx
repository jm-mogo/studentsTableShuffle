const UploadData = ({students, setStudents}) => {
    const csvFileInput = document.querySelector("#csvInput");

    function csvToArr(stringVal, splitter) {
        const [keys, ...rest] = stringVal
          .trim()
          .split("\n")
          .map((item) => item.split(splitter));
      
        const formedArr = rest.map((item) => {
          const object = {};
          keys.forEach((key, index) => (object[key] = item.at(index)));
          return object;
        });
        return formedArr;
      }
    
    const convertData = (e) => {
        
    const file = document.querySelector("#csvInput").files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        // Access to content with e.target.result
        const csvArray = csvToArr(e.target.result, ",");
        console.log(csvArray)
        setStudents(csvArray)
      };
      
      reader.readAsText(file);
    
    console.log(file);}
   


    return (<><form id="csvForm">
                <input type="file" id="csvInput" accept=".csv" />
                <button type="button" onClick={(e) => {
                    convertData(e)
                }}>Upload</button>
            </form></>)
}

export default UploadData