import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useStyles } from '../../HOCs/Admin/style';
import axios from 'axios';
import { Table, Button, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Toolbar, TablePagination, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell}
                        align='left'
                        padding='none'
                        sortDirection={orderBy === headCell ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell}
                            direction={orderBy === headCell ? order : 'asc'}
                            onClick={createSortHandler(headCell)}
                        >
                            {headCell.toUpperCase()}
                            {orderBy === headCell ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align='left' >
                    ACTION
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    headCells: PropTypes.array.isRequired,
};

export default function EnhancedTable({ content }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [table, setTable] = useState(null);

    const headCells = useMemo(() => table ? Object.getOwnPropertyNames(table[0]) : [], [table]);

    const handlePage = useCallback(text => () => {
        history.push(`/admin/${content}/${text}`);
    }, [content]);

    useEffect(async () => {
        try {
            const res = await axios({
                url: `http://localhost:8080/api/admin/${content}`,
                method: 'GET'
            })
            setTable(res.data);
        } catch (error) {
            console.log({ ...error });
        }
    }, [content]);

    const handleRequestSort = useCallback((property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, []);

    const handleChangePage = useCallback((newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    return (
        <div className={classes.rootTable}>
            <Typography variant='h3' component='h3' align='center'>
                {content.toUpperCase()} LIST
            </Typography>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handlePage('add')}
                startIcon={<AddIcon />}
            >
                ADD
            </Button>
            <div className={classes.rootTable}>
                <Paper className={classes.paper}>
                    <TableContainer className={classes.rootTable}>
                        <Table
                            className={classes.table} aria-labelledby="tableTitle"
                            size='small'
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                headCells={headCells}
                            />
                            <TableBody>
                                {
                                    table &&
                                    stableSort(table, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                {Object.getOwnPropertyNames(row).map((item, i) =>
                                                    <TableCell component={i === 0 ? 'th' : ''} scope={i === 0 ? 'row' : ''} align={i === 0 ? '' : 'left'} key={i} >
                                                        {row[item]}
                                                    </TableCell>
                                                )}
                                                <TableCell align="left" padding='none'>
                                                    <Button
                                                        className={classes.button}
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handlePage(`edit/${row.id}`)}
                                                        key={index}
                                                        startIcon={<EditIcon />}
                                                    >
                                                        EDIT
                                                        </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.button}
                                                        startIcon={<DeleteIcon />}
                                                        key={-index - 1}
                                                        onClick={handlePage(`delete/${row.id}`)}
                                                    >
                                                        Delete
                                                        </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={table?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}