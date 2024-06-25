import downloadData from "./downloadData.jsx"

const BackupData = ({students}) => {
    return (<>
        <button onClick={() => {
            downloadData(students)
        }}>Download data</button>
    </>)
}

export default BackupData