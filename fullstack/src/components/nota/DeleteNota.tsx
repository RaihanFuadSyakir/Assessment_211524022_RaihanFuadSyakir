"use client"
import Button from '@mui/material/Button';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Nota} from '@prisma/client';
interface ListNota {
    listNota: Nota[];
    index: number;
    setListNota: React.Dispatch<React.SetStateAction<Nota[]>>;
}

export default function DeleteNota({ listNota, index, setListNota }: ListNota) {
    function deleteNota() {
        axios.delete(`/api/nota?id=${listNota[index].KodeNota}`)
            .then(() => {
                const newList = [...listNota];
                newList.splice(index, 1);
                setListNota(newList);
            })
            .catch((err_res) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteNota}
            className='bg-red-600 text-white border-red-600 hover:bg-red-500 hover:border-red-500'>
            Delete
        </Button>
    );
}