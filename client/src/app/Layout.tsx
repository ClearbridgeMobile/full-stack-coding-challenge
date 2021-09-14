import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Container, makeStyles } from '@material-ui/core';
import CompanyDetails from './companies/Details';
import CompanyEdit from './companies/Edit';
import CompanyList from './companies/List';
import CompanyCreate from './companies/Create';
const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

function Layout() {
  const classes = useStyles();

  return (
    <Router>
      <Container className={classes.container}>
        <Switch>
          <Route exact path='/details/:companyId'>
            <CompanyDetails />
          </Route>
          <Route exact path='/edit/:companyId'>
            <CompanyEdit />
          </Route>
          <Route exact path='/create'>
            <CompanyCreate />
          </Route>
          <Route exact path='/'>
            <CompanyList />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default Layout;
