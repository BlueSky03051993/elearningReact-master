import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from "formik";
import { useStyles } from '../../HOCs/Admin/style';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function AddForm({ content }) {
    const addForm = useMemo(() => ({
        category: ['title', 'icon'],
        course: [
            'categoryId',
            'content',
            'description',
            'discount',
            'image',
            'leturesCount',
            'price',
            'promotionPrice',
            'title',
        ],
        role: ['name', 'description'],
        target: ['title', 'courseId'],
        user: [
            'address',
            'avatar',
            'email',
            'fullname',
            'password',
            'phone',
            'roleId',
        ],
        video: [
            'courseId',
            'timeCount',
            'title',
            'url',
        ]
    }), []);

    const [selected, setSelected] = useState(null);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    let form = {};

    useEffect(() => {
        addForm[content].map(async (input) => {
            if (input.endsWith('Id')) {
                try {
                    const res = await axios({
                        url: `http://localhost:8080/api/admin/${input.replace("Id", "")}`,
                        method: 'GET'
                    })

                    setSelected(res.data);
                } catch (error) {
                    console.log({ ...error });
                }
            }
        });


        addForm[content].map(item => {
            form = { ...form, [item]: '' }
        });

    }, [content]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const { handleChange, values } = useFormik({
        initialValues: { ...form },
    });

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        try {
            const res = await axios({
                url: `http://localhost:8080/api/admin/${content}`,
                method: 'POST',
                data: values
            })
            history.push(`/admin/${content}`);
        } catch (error) {
            console.log({ ...error });
        }
    }, [content]);

    const handlePassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, []);

    return (
        <div className={classes.addForm}>
            <Typography variant='h3' component='h3'> ADD NEW {content.toUpperCase()} </Typography>
            <form onSubmit={handleSubmit} className={classes.formAdd}>
                <Grid container spacing={1}>
                    {addForm[content].map(input => {
                        if (input.endsWith('Id')) {
                            return <Grid item xs={6}>
                                <FormControl className={classes.formAdd} variant="outlined">
                                    <InputLabel id="demo-simple-select-outlined-label">{input.replace("Id", "")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        name={input}
                                        onChange={handleChange}
                                        label={input.replace("Id", "")}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {selected?.map(select =>
                                            <MenuItem value={select.id} key={select.id}>
                                                {select.title || select.description}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>;
                        } else if (input === 'password') {
                            return <Grid item xs={6}>
                                <FormControl className={classes.formAdd} variant="outlined">
                                    <InputLabel id="demo-simple-select-outlined-label">{input}</InputLabel>
                                    <OutlinedInput
                                        key={input}
                                        fullWidth
                                        id="outlined-basic"
                                        label={input}
                                        variant="outlined"
                                        onChange={handleChange}
                                        name={input}
                                        type={showPassword ? 'text' : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handlePassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>;
                        } else {
                            return <Grid item xs={6}>
                                <TextField
                                    key={input}
                                    fullWidth
                                    id="outlined-basic"
                                    label={input}
                                    variant="outlined"
                                    onChange={handleChange}
                                    name={input}
                                />
                            </Grid>;
                        }
                    })}
                </Grid>
                <div className={classes.middleButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        type="submit"
                    >
                        Save
                </Button>
                </div>
            </form>
        </div>
    )
}
