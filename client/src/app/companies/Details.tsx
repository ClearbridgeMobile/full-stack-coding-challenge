import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { format } from 'fecha';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

function CompanyDetails() {
  const classes = useStyles();
  let { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getData();

    async function getData() {
      const data = await axios.get(`/api/companies/${companyId}`);
      setCompany(data.data);
    }
  }, [companyId]);

  const handleEdit = () => {
    window.location.href = `/edit/${companyId}`;
  };
  const handleDelete = () => {
    deleteData();
    async function deleteData() {
      await axios.delete(`/api/companies/${companyId}`);
      window.location.href = '/';
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
        </Box>
      )}
    </>
  );
}

export default CompanyDetails;
