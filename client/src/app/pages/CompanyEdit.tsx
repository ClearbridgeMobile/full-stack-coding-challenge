import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
function CompanyEdit() {
  const classes = useStyles();
  const history = useHistory();

  let { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getData();

    async function getData() {
      const data = await axios.get(`/api/companies/${companyId}`);
      setCompany(data.data);
    }
  }, [companyId]);

  const handleSave = () => {
    submitData();
    async function submitData() {
      company.founded = format(new Date(company.founded), 'YYYY:MM:DD');
      await axios.put(`/api/companies/${companyId}`, company);
      history.push('/');
    }
  };

  return (
    <>
      {company && (
        <Box>
          <Typography variant='h2'>Edit Company</Typography>
          <form noValidate autoComplete='off'>
            <TextField
              required
              id='outlined-required'
              label='Company Name'
              variant='outlined'
              defaultValue={company.name || null}
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
                defaultValue={company.city || null}
                onChange={event => {
                  company.city = event.target.value;
                }}
                className={classes.textField}
              />
              <TextField
                label='State'
                id='margin-none'
                variant='outlined'
                defaultValue={company.state || null}
                onChange={event => {
                  company.state = event.target.value;
                }}
                className={classes.textField}
              />
              <TextField
                label='Founded Date'
                id='margin-none'
                variant='outlined'
                defaultValue={
                  format(new Date(company.founded), 'YYYY:MM:DD') || null
                }
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
              defaultValue={company.description || null}
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
      )}
    </>
  );
}

export default CompanyEdit;
