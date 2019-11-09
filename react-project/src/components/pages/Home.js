// import React from 'react';
// import clsx from 'clsx';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
// import listReactFiles from 'list-react-files';
// import { mergeClasses } from '@material-ui/styles';
// import { TableHead, TableRow, TableCell } from '@material-ui/core';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TablePagination from '@material-ui/core/TablePagination';
// const columns = [
//   {id:'name', label:'Name', minWidth:200},
//   {id:'price', label:'Price', minWidth:100},
//   {id:'site', label:'Site', minWidth:150},
// ];
// function createData(name, price, site){
//   return {name, price, site};
// }
// const rows = [
//   createData("first","$250.00","amazon.com"),
//   createData("second","$54.00","ebay.com"),
//   createData("third","$0.99","bestbuy.com"),
// ];
// // const Home = () => (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} md={8} lg={9}>
// //         <Paper className={clsx(useStyles().paper, useStyles().fixedHeight)}>
// //         </Paper>
// //       </Grid>
// //       <Grid item xs={12} md={4} lg={3}>
// //         <Paper className={clsx(useStyles().paper, useStyles().fixedHeight)}>
// //         </Paper>
// //       </Grid>
// //       <Grid item xs={12}>
// //         <Paper className={useStyles().paper}>
// //         </Paper>
// //       </Grid>
// //     </Grid>
// //   );

//   const useStyles = makeStyles(theme => ({
//     paper: {
//       padding: theme.spacing(2),
//       display: 'flex',
//       overflow: 'auto',
//       flexDirection: 'column',
//     },
//     fixedHeight: {
//       height: 240,
//     },
//     root: {
//       width:'100%',
//     },
//     tableWrapper: {
//       maxHeight: '80%',
//       overflow: 'auto',
//     }
//   }));
// function getHomePage(){
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper className={classes.root}>
//       <div className={classes.tableWrapper}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map(column => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
//               return (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                   {columns.map(column => {
//                     const value = row[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format && typeof value === 'number' ? column.format(value) : value}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         backIconButtonProps={{
//           'aria-label': 'previous page',
//         }}
//         nextIconButtonProps={{
//           'aria-label': 'next page',
//         }}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
// export default getHomePage;






















import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { ClickAwayListener } from '@material-ui/core';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'site', label: 'Site', minWidth: 100 },
  // { id: 'link', label: 'Link', minWidth: 250 },
];

function createData(name, price, site,link) {
  return { name, price, site };
}

const rows = [
  createData('asdf', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('second', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('third', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('fourth', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('fith', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('sixth', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('seventh', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('eighth', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('ninth', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('tenth', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
  createData('eleventh', '$129.99.00', 'amazon.com', 'https://www.amazon.com/gp/product/B01MZ61PRW/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    // maxHeight: 440,
    overflow: 'auto',
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = event => {
    alert('something was clicked!');
    event.preventDefault();
  };
  return (
    <Paper className={classes.root}> 
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    if(column.id == "name"){
                      return(
                        <TableCell key={column.id} align={column.align} >
                          <a href={"../../items/"+value}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </a>
                        </TableCell>
                      );
                    }else{
                    return (
                      <TableCell key={column.id} align={column.align} >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}