import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  FormGroup,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { format } from 'fecha';
import { Founder } from 'types';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  editFounderButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    height: 'fit-content',
    alignSelf: 'center',
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  formRow: {
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function CompanyDetails() {
  const classes = useStyles();
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getData();

    async function getData() {
      const data = await axios.get(`/api/companies/${companyId}`);
      setCompany(data.data);
    }
  }, [companyId]);

  const handleEdit = () => {
    history.push(`/edit/${companyId}`);
  };
  const handleDelete = () => {
    deleteData();
    async function deleteData() {
      await axios.delete(`/api/companies/${companyId}`);
      history.push('/');
    }
  };

  return (
    <>
      {company && (
        <Box
          border={1}
          borderRadius={2}
          justifyContent={'center'}
          textAlign={'center'}
        >
          <Typography variant='h2'>{company.name}</Typography>
          <Box width='70%' margin='auto' mt={2} mb={2}>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item xs={4}>
                {format(new Date(company.founded), 'YYYY-MM-DD')}
              </Grid>
              <Grid item xs={4}>
                {company.city}, {company.state}
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant='contained'
                  className={classes.button}
                  color='primary'
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant='contained'
                  className={classes.button}
                  color='primary'
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Typography paragraph> {company.description}</Typography>
          <Founders />
        </Box>
      )}
    </>
  );
}

function Founders() {
  const classes = useStyles();
  const [rowData, setRowData] = useState(null);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const { companyId } = useParams();

  useEffect(() => {
    getData();

    async function getData() {
      const data = await axios.get(`/api/founders/${companyId}`);

      setRowData(data.data.map(founder => ({ founder, disabled: true })));
    }
  }, [companyId]);

  useEffect(() => {
    if (add) {
      const founder: Founder = {
        firstName: '',
        lastName: '',
        title: '',
        companyId,
      };

      rowData.push({ founder, disabled: false });
      setRowData(rowData);
      setAdd(false);
    }
  }, [add, companyId]);

  useEffect(() => {
    if (edit) {
      setRowData(rowData);
    }
  }, [edit]);

  const handleSave = () => {
    submitData();
    async function submitData() {
      const founders = rowData.map(data => data.founder);
      await axios.post(`/api/founders/`, founders);
      window.location.href = '/';
    }
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const handleEdit = index => {
    rowData[index].disabled = false;
    setEdit(true);
  };

  return (
    <Box mt={10}>
      <Typography variant='h3'>Founders</Typography>

      {rowData &&
        rowData.map((data, index) => (
          <FormGroup key={`founder_${index}`} row className={classes.formRow}>
            <TextField
              required
              id='outlined-required'
              label='First Name'
              variant='outlined'
              disabled={data.disabled}
              defaultValue={data.founder.firstName}
              margin='normal'
              className={classes.textField}
              onChange={event => {
                data.founder.firstName = event.target.value;
              }}
            />
            <TextField
              required
              id='outlined-required'
              label='Last Name'
              variant='outlined'
              disabled={data.disabled}
              defaultValue={data.founder.lastName}
              margin='normal'
              className={classes.textField}
              onChange={event => {
                data.founder.lastName = event.target.value;
              }}
            />
            <TextField
              required
              id='outlined-required'
              label='Title'
              variant='outlined'
              defaultValue={data.founder.title}
              disabled={data.disabled}
              margin='normal'
              className={classes.textField}
              onChange={event => {
                data.founder.title = event.target.value;
              }}
            />
            {data.disabled && (
              <Button
                variant='contained'
                className={classes.editFounderButton}
                color='primary'
                onClick={() => handleEdit(index)}
              >
                Edit
              </Button>
            )}
            {!data.disabled && <Box width={'10ch'} />}
          </FormGroup>
        ))}
      <Box
        display='flex'
        justifyContent='right'
        mt={2}
        mb={2}
        textAlign='right'
      >
        <Button
          variant='contained'
          className={classes.button}
          onClick={handleAdd}
          color='primary'
        >
          Add
        </Button>
        <Button
          variant='contained'
          onClick={handleSave}
          className={classes.button}
          color='primary'
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default CompanyDetails;
