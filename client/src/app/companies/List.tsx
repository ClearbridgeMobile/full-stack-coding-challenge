import React, { useEffect, useState } from 'react';

import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles(() => ({
  heading: {
    borderRight: '2px solid black',
  },
  location: {
    paddingLeft: '10px',
  },
}));
function CompanyList() {
  const classes = useStyles();
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    getData();

    async function getData() {
      const data = await axios.get('/api/companies');
      setCompanies(data.data);
    }
  }, []);

  const handleClick = () => {
    window.location.href = '/edit';
  };

  return (
    <>
      <Typography variant='h2'>List of Companies</Typography>

      {companies &&
        companies.map(company => (
          <Box
            border={1}
            borderRadius={2}
            key={company.companyId}
            padding={2}
            margin={2}
          >
            <Grid container>
              <Grid item xs={6} className={classes.heading}>
                <Typography variant='h3'>{company.name}</Typography>
              </Grid>
              <Grid item xs={5} className={classes.location}>
                <Typography>
                  {company.city}, {company.state}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button color='primary' href={`/details/${company.companyId}`}>
                  more
                </Button>{' '}
              </Grid>
            </Grid>
            <Typography paragraph>{company.description}</Typography>
          </Box>
        ))}
      <Box textAlign={'right'} margin={2}>
        <Button variant='contained' color='primary' onClick={handleClick}>
          Add Company
        </Button>
      </Box>
    </>
  );
}

export default CompanyList;
