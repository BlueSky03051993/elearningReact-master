import { Avatar, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AdminBreadcrumbs from '../../components/Breadcrumb';
import Admin from '../../HOCs/Admin';

export default function HomeAdmin() {
    const [selectedFile, setSelectedFile] = useState()
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setAvatar(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setAvatar(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }
    return (
        <Admin>
            <AdminBreadcrumbs path="home"/>
            <div>
                {selectedFile && <Avatar alt="ava" src={avatar} />}
                <Input type='file' onChange={onSelectFile} />
            </div>
        </Admin>
    )
}
