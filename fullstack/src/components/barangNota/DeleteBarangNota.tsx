"use client"
import Button from '@mui/material/Button';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { BarangNota } from '@prisma/client';
interface ListBarangNota {
    listBarangNota: BarangNota[];
    index: number;
    setListBarangNota: React.Dispatch<React.SetStateAction<BarangNota[]>>;
}

export default function DeleteBarangNota({ listBarangNota, index, setListBarangNota }: ListBarangNota) {
    function deleteBarangNota() {
        axios.delete(`/api/barangNota?id=${listBarangNota[index].KodeNota}`)
            .then(() => {
                const newList = [...listBarangNota];
                newList.splice(index, 1);
                setListBarangNota(newList);
            })
            .catch((err_res) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteBarangNota}
            className='bg-red-600 text-white border-red-600 hover:bg-red-500 hover:border-red-500'>
            Delete
        </Button>
    );
}