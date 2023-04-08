import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Store = () => {
    
    const [showstore,setShowstore] = useState([]);

    useEffect(() => {
        getstore();
    }, []);

    const getstore = () => {
        Axios.get('http://localhost:3001/product').then((response) => {
            setShowstore(response.data);
        })
    }
    return(
        <div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">other</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showstore.map((row) => (
            <TableRow
              key={row.Product_Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.Product_Id}</TableCell>
              <TableCell align="left">{row.Product_Name}</TableCell>
              <TableCell align="center">{row.Product_Type}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="right">{row.other}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            {/* {showstore.map((val,key) => (
                <div className="">
                    <p>ID: {val.Product_Id}</p>
                    <p>Name: {val.Product_Name}</p>
                    <p>Type: {val.Product_Type}</p>
                    <p>amount: {val.amount}</p>
                    <p>other: {val.other}</p>
                </div>
            ))} */}
    </div>
    );
};