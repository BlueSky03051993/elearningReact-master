import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import AdminBreadcrumbs from '../../components/Breadcrumb';
import EnhancedTable from '../../components/Table';
import Admin from '../../HOCs/Admin'
import createAction from '../../redux/actions';
import Constants from '../../redux/constants';

export default function Content() {
    const { content } = useParams();
    const dispatch = useDispatch();

    
    return (
        <Admin>
            <AdminBreadcrumbs path={content}/>
            <EnhancedTable content={content}/>
        </Admin>
    )
}
