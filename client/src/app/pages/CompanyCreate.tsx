import React from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { format } from 'fecha';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  textField: {
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));
function CompanyCreate() {
  const classes = useStyles();
  const history = useHistory();
  const company = {
    name: null,
    city: null,
    state: null,
    founded: null,
    description: null,
  };
  const handleSave = () => {
    submitData();
    async function submitData() {
      company.founded = format(new Date(company.founded), 'YYYY:MM:DD');
      await axios.post(`/api/companies/`, company);
      history.push('/');
    }
  };

  return (
    <Box>
      <Typography variant='h2'>Create Company</Typography>
      <form noValidate autoComplete='off'>
        <TextField
          required
          id='outlined-required'
          label='Company Name'
          variant='outlined'
          fullWidth
          onChange={event => {
            company.name = event.target.value;
          }}
          margin='normal'
        />
        <Box mt={2} mb={2}>
          <TextField
            label='City'
            id='margin-none'
            variant='outlined'
            onChange={event => {
              company.city = event.target.value;
            }}
            className={classes.textField}
          />
          <TextField
            label='State'
            id='margin-none'
            variant='outlined'
            onChange={event => {
              company.state = event.target.value;
            }}
            className={classes.textField}
          />
          <TextField
            label='Founded Date'
            id='margin-none'
            variant='outlined'
            onChange={event => {
              company.founded = event.target.value;
            }}
            className={classes.textField}
          />
          <DateRangeIcon fontSize={'large'} />
        </Box>

        <TextField
          required
          id='outlined-required'
          label='Description'
          variant='outlined'
          multiline
          fullWidth
          rows={10}
          onChange={event => {
            company.description = event.target.value;
          }}
          margin='normal'
        />
        <Box textAlign={'right'} mt={2}>
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CompanyCreate;
