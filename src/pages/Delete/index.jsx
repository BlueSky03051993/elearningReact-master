import axios from 'axios';
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

export default function Delete() {
    const history = useHistory();
    const { content, id } = useParams();

    useEffect(async () => {
        try {
            const res = await axios({
                url: `http://localhost:8080/api/admin/${content}/${id}`,
                method: 'DELETE'
            });

            console.log(res);
        } catch (error) {
            console.log({ ...error });
        }
        history.push(`/admin/${content}`);
    }, [])
    return (
        <>

        </>
    )
}
