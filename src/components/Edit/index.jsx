import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useStyles } from '../../HOCs/Admin/style';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function EditForm({ content, id }) {
    const editForm = {
        category: ['id', 'title', 'icon'],
        course: ['id',
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
        role: ['id', 'name', 'description'],
        target: ['id', 'title', 'courseId'],
        user: ['id',
            'address',
            'avatar',
            'fullname',
            'phone',
            'roleId',
        ],
        video: ['id',
            'courseId',
            'timeCount',
            'title',
            'url',
        ]
    };
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    let form = {};

    useEffect(() => {
        editForm[content].map(async (input) => {
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
        })
    }, [content]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    editForm[content].map(item => {
        form = { ...form, [item]: '' }
    });

    const { handleChange, values, setValues } = useFormik({
        initialValues: { ...form },
    });

    useEffect(async () => {
        try {
            const res = await axios({
                url: `http://localhost:8080/api/admin/${content}/${id}`,
                method: 'GET'
            });
            setValues(res.data);
        } catch (error) {
            console.log({ ...error });
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios({
                url: `http://localhost:8080/api/admin/${content}/${id}`,
                method: 'PUT',
                data: values
            });
            history.push(`/admin/${content}`);
        } catch (error) {
            console.log({ ...error });
        }
    }

    return (
        <div className={classes.addForm}>
            <Typography variant='h3' component='h3'> EDIT {content.toUpperCase()} </Typography>
            <form onSubmit={handleSubmit} className={classes.formAdd}>
                <Grid container spacing={1}>
                    {editForm[content].map(input => {
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
                                        name={input.replace("Id", "")}
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
                                    value={values[input]}
                                    disabled={input === 'id'}
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
