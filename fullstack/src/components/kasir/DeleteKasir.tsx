import Button from '@mui/material/Button';

import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Kasir } from '@prisma/client';
interface ListKasir {
    listKasir: Kasir[];
    index: number;
    setListKasir: React.Dispatch<React.SetStateAction<Kasir[]>>;
}

export default function DeleteKasir({ listKasir, index, setListKasir }: ListKasir) {
    function deleteKasir() {
        axios.delete(`/api/kasir?id=${listKasir[index].KodeKasir}`)
            .then(() => {
                const newList = [...listKasir];
                newList.splice(index, 1);
                setListKasir(newList);
            })
            .catch((err_res) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteKasir}
            className='bg-red-600 text-white border-red-600 hover:bg-red-500 hover:border-red-500'>
            Delete
        </Button>
    );
}