import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonOwn from "../ButtonOwn.jsx";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

function AlertDialog({
    students,
    setStudents,
    rowSelectionModel,
    setRowSelectionModel,
}) {
    const handleClick = () => {
        let newStudents = [...students];
        rowSelectionModel.map((id) => {
            newStudents = newStudents.filter((student) => student.id !== id);
        });
        setStudents(newStudents);
        setRowSelectionModel([]);
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        handleClick();
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                color="error"
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={handleClickOpen}
            >
                Delete Selected students
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are going to delete {rowSelectionModel.length}{" "}
                        students
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonOwn varient="danger" onClick={handleDelete}>
                        Delete
                    </ButtonOwn>
                    <ButtonOwn varient="secondary" onClick={handleClose}>
                        Cancel
                    </ButtonOwn>
                </DialogActions>
            </Dialog>
        </>
    );
}

function EditToolbar(props) {
    const { setStudents, setRowModesModel } = props;

    const handleClick = () => {
        setStudents((oldRows) => [
            ...oldRows,
            { id: oldRows.length, name: "", isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    return (
        <GridToolbarContainer>
            {/* <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}
            >
                Add record
            </Button> */}
        </GridToolbarContainer>
    );
}

function deleteMuliple(props) {
    const { students, setStudents, rowSelectionModel, setRowSelectionModel } =
        props;

    if (rowSelectionModel.length > 0)
        return (
            <GridToolbarContainer>
                <Box sx={{ flexGrow: 1 }} />
                <AlertDialog
                    students={students}
                    setStudents={setStudents}
                    rowSelectionModel={rowSelectionModel}
                    setRowSelectionModel={setRowSelectionModel}
                />
            </GridToolbarContainer>
        );
}

const StudentTable = ({
    students,
    setStudents,
    AskConfirmationToDeleteUser,
}) => {
    students.map((student, index) => {
        student.id = index;
    });
    const [rowModesModel, setRowModesModel] = useState({});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => () => {
        AskConfirmationToDeleteUser(students[id].name, id);
        // setStudents(students.filter((student) => student.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = students.find((student) => student.id === id);
        if (editedRow.isNew) {
            setStudents(students.filter((student) => student.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setStudents(
            students.map((student) =>
                student.id === newRow.id ? updatedRow : student
            )
        );
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
            editable: true,
            type: "",
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 180,
            editable: true,
            type: "singleSelect",
            valueOptions: ["M", "F"],
        },
        {
            field: "role",
            headerName: "Role",
            width: 180,
            editable: true,
            type: "singleSelect",
            valueOptions: ["student", "supervisor"],
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id, name }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id, name)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: "100%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <DataGrid
                rows={students}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                disableRowSelectionOnClick
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: deleteMuliple,
                }}
                slotProps={{
                    toolbar: {
                        students,
                        setStudents,
                        rowSelectionModel,
                        setRowSelectionModel,
                    },
                }}
            />
        </Box>
    );
};

export default StudentTable;
