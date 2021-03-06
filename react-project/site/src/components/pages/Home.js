import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField'
class App extends Component {
    constructor() {
        super()
        this.state = {
          data: [],
          page: 0,
          rowsPerPage: 10,
          filter: ''
        };
    }
    
    async componentDidMount() {
        const resp = await fetch('http://localhost:8080/items');
        this.setState({data: await resp.json()});
    }
    
    render(){
        const {data, page, rowsPerPage, filter} = this.state;
        console.warn("DATA!!!!")
        console.log(data);

        const setPage = (page) => {
          this.setState({page: page});
        }

        const setRowsPerPage = (rowsPerPage) => {
          this.setState({rowsPerPage: rowsPerPage})
        }
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = event => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        };

        const handleFilterChange = event => {
          this.setState({filter: event.target.value.toLowerCase()})
        }
        const columns = this.getColumns()
        return(
          <Paper>
                <form>
                  <TextField style={{width: '100%'}} label="Filter" variant="filled" onChange={handleFilterChange} />
                </form>
                <TablePagination
                
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    
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
                

                <div>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.filter(i => i.name.toLowerCase().includes(filter) || i.price.toLowerCase().includes(filter) || i.site.toLowerCase().includes(filter)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      if(column.id === "name"){
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
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>


                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    
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
        )
    }
    
    getColumns() {
        const columns = [
            { id: 'name', label: 'Name', minWidth: 170 },
            { id: 'price', label: 'Price', minWidth: 100 },
            { id: 'site', label: 'Site', minWidth: 100 },
            // { id: 'link', label: 'Link', minWidth: 250 },
        ];
        return columns;
    };
}
export default App