"use client"
import Button from '@mui/material/Button';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Tenan } from '@prisma/client';
interface ListTenan {
    listTenan: Tenan[];
    index: number;
    setListTenan: React.Dispatch<React.SetStateAction<Tenan[]>>;
}

export default function DeleteTenan({ listTenan, index, setListTenan }: ListTenan) {
    function deleteTenan() {
        axios.delete(`/api/tenan?id=${listTenan[index].KodeTenan}`)
            .then(() => {
                const newList = [...listTenan];
                newList.splice(index, 1);
                setListTenan(newList);
            })
            .catch((err_res) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteTenan}
            className='bg-red-600 text-white border-red-600 hover:bg-red-500 hover:border-red-500'>
            Delete
        </Button>
    );
}