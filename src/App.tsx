import React, { useState, ReactNode } from 'react';
import './App.css';
import API from './lib/axios.api'
import { Button, Container, TextField, Table, TableHead, TableRow, TableCell } from '@material-ui/core'
import { FormHelperText, Paper, TableContainer, TableBody } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    table: {
      minWidth: 300,
    }
  }),
);

function App() {

  const [inCount, setinCount] = useState<Number>(0);
  const [res, setRes] = useState<string[]>([])
  const [error, setError] = useState<string>("");
  const classes = useStyles();

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinCount(parseInt(event.currentTarget.value));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await API.get<string[]>('/fizzbuzz', {
        params: {
          count: inCount
        }
      });
      if (res.status === 200) {
        setRes(res.data);
        setError("")
      }
    } catch (err) {
      console.log(err.response)
      setError(err.response.data);
      setRes([""]);
    }
  }



  const displayElement: ReactNode = res.map((val, index) =>
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell align="right">{val}</TableCell>
    </TableRow>
  );


  var finalDisplayElement: ReactNode = "";

  if (res.length > 0 && res[0] !== "") {
    finalDisplayElement = (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple-table">
          <TableHead>
            <TableRow>
              <TableCell>Original Number</TableCell>
              <TableCell align="right">Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayElement}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


  return (
    <Container maxWidth="sm">
      <div>
        <h1>FizzBuzz Application</h1>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="input-number" label="Enter Number" onChange={handleChangeNumber} />
          <Button variant="contained" type="submit" color="primary">Generate</Button>
          <FormHelperText error={true} id="input-error-text">{error}</FormHelperText>
        </form>
        {finalDisplayElement}
      </div>
    </Container>
  )
}

export default App;
