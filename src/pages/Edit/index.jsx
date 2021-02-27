import React from 'react'
import { useParams } from 'react-router-dom';
import AdminBreadcrumbs from '../../components/Breadcrumb';
import EditForm from '../../components/Edit';
import Admin from '../../HOCs/Admin'

export default function Edit() {
    const { content, id } = useParams();
    return (
        <Admin>
            <AdminBreadcrumbs path={content} extension='edit' />
            <EditForm content={content} id={id} />
        </Admin>
    )
}
