import React from 'react'
import { useParams } from 'react-router-dom';
import AddForm from '../../components/Add';
import AdminBreadcrumbs from '../../components/Breadcrumb';
import Admin from '../../HOCs/Admin'

export default function Add() {
    const { content } = useParams();
    return (
        <Admin>
            <AdminBreadcrumbs path={content} extension={'add'} />
            <AddForm content={content}/>
        </Admin>
    )
}
