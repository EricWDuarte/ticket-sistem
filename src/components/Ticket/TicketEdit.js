import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  Input,
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  Box,
  Alert,
  FormControlLabel,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "../../firebase-config";
import { UpdateTicket } from "../../apis/TicketsApi";
import { useAuth } from "../../contexts/AuthContext";
import Validated from "../Validated";

export default function TicketEdit(props) {
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [showFileError, setShowFileError] = useState(false);
  const [validationList, setValidationList] = useState([]);

  const titleRef = useRef();
  const appStopedRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const environmentRef = useRef();
  const filesRef = useRef([]);
  const fraseRef = useRef();
  const impactedUsersRef = useRef();
  const priorityRef = useRef();
  const productRef = useRef();

  let filesUrls = [];

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function UpdatedData() {
    return {
      userId: currentUser.uid,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      product: productRef.current.value,
      category: categoryRef.current.value,
      priority: priorityRef.current.value,
      frase: fraseRef.current.value,
      impactedUsers: impactedUsersRef.current.value,
      appStoped: appStopedRef.current.value,
      environment: environmentRef.current.value,
      filesUrls: filesUrls,
    };
  }

  function addToValidationList(ref) {
    setValidationList((prev) => [...prev, ref]);
  }

  function validateFiles() {
    const filesArr = Array.from(filesRef.current.files);
    setFileError("");
    setShowFileError(false);

    console.log("entered validateFiles");

    if (filesArr.length === 0) {
      setFileError("File required");
      setShowFileError(true);
      return false;
    }

    const correctExtensions = filesArr.every((file) => {
      console.log(file);
      const extension = file.name.split(".").pop();
      return extension === "pdf" || extension === "txt";
    });

    if (!correctExtensions) {
      setFileError("Only pdf and txt files accepted");
      setShowFileError(true);
      return false;
    }

    return true;
  }

  function allValid() {
    console.log('validationList', validationList)

    if (!validationList.every((val) => val.current === true)) {
      return false;
    }
    console.log("valid not empty");

    if (!validateFiles()) {
      return false;
    }

    console.log("valid files");

    return true;
  }

  function fileChanged() {
    validateFiles();
  }

  function CancelHandler() {
    props.close();
  }

  function ConfirmHandler() {
    console.log("confirmed");
    setFileError("");

    if (!allValid()) {
      return;
    }

    console.log("valid");

    const filesArr = Array.from(filesRef.current.files);

    const promises = [];

    filesArr.map((file) => {
      setLoading(true);
      const storageRef = ref(storage, `/files/${currentUser.uid}/${file.name}`);
      promises.push(
        uploadBytes(storageRef, file).then(() => {
          return getDownloadURL(storageRef);
        })
      );
    });

    Promise.all(promises)
      .then((urlList) => {
        filesUrls = [];
        urlList.forEach((url) => {
          filesUrls.push(url);
        });
        UpdateTicket(props.parentProps.id, UpdatedData()).then(() => {
          window.location.reload(false);
          props.close();
        });
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }

  return (
    <FormControl>
      <Box m={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2">Edit Ticket</Typography>
          </Grid>
          <Grid item xs={12}>
            <Validated
              startedFilled={true}
              addToValidationList={addToValidationList}
              types={{ limited: 40 }}
              value={titleRef}
            >
              <TextField
                defaultValue={props.parentProps.title}
                variant="standard"
                fullWidth
                inputRef={titleRef}
                label="Title"
              />
            </Validated>
          </Grid>
          <Grid item xs={12}>
            <Validated
              startedFilled={true}
              addToValidationList={addToValidationList}
              value={fraseRef}
              types={{ limited: 80 }}
            >
              <TextField
                defaultValue={props.parentProps.frase}
                variant="standard"
                fullWidth
                onBlur={validateFiles}
                inputRef={fraseRef}
                label="Problem in one line"
              />
            </Validated>
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={props.parentProps.priority}
              variant="standard"
              select
              fullWidth
              inputRef={priorityRef}
              label="Priority"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              select
              fullWidth
              inputRef={impactedUsersRef}
              label="Users Impacted"
              defaultValue={props.parentProps.impactedUsers}
            >
              <MenuItem value="1">Only 1</MenuItem>
              <MenuItem value="1 - 10">1 to 10 users</MenuItem>
              <MenuItem value="11 - 30">11 to 30 users</MenuItem>
              <MenuItem value="31 - 50">31 to 50 users</MenuItem>
              <MenuItem value="50+">More than 50 users</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              select
              fullWidth
              inputRef={environmentRef}
              label="Environment"
              defaultValue={props.parentProps.environment}
            >
              <MenuItem value="Test">
                Data/Test Environment - Test only
              </MenuItem>
              <MenuItem value="Production">
                Production Environment - Active Client/License
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <Validated
              startedFilled={true}
              addToValidationList={addToValidationList}
              value={categoryRef}
            >
              <TextField
                variant="standard"
                inputRef={productRef}
                label="Product"
                defaultValue={props.parentProps.product}
              />
            </Validated>
          </Grid>
          <Grid item xs={4}>
            <Validated
              startedFilled={true}
              addToValidationList={addToValidationList}
              value={categoryRef}
            >
              <TextField
                variant="standard"
                inputRef={categoryRef}
                label="Category"
                defaultValue={props.parentProps.category}
              />
            </Validated>
          </Grid>
          <Grid item xs={12}>
            <Validated
              startedFilled={true}
              addToValidationList={addToValidationList}
              value={descriptionRef}
            >
              <TextField
                variant="standard"
                fullWidth
                multiline
                inputRef={descriptionRef}
                label="Description of the Problem"
                defaultValue={props.parentProps.description}
              />
            </Validated>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={
                    props.parentProps.appStoped === "On" ? true : false
                  }
                  inputRef={appStopedRef}
                />
              }
              label="Application Stoped?"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              type="file"
              inputRef={filesRef}
              onChange={fileChanged}
              inputProps={{ multiple: true }}
            />
            {showFileError && <Alert severity="error">{fileError}</Alert>}
          </Grid>
          <Grid container item justifyContent="center" xs={12}>
            <ButtonGroup>
              <Button
                disabled={loading}
                type="submit"
                value="Submit"
                color="primary"
                fullWidth
                onClick={ConfirmHandler}
              >
                Confirm
              </Button>
              <Button
                disabled={loading}
                color="primary"
                fullWidth
                onClick={CancelHandler}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <Typography>Loading...</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </FormControl>
  );
}
