import Button from '@mui/material/Button';
import { Barang } from '@prisma/client';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
interface ListBarang {
    listBarang: Barang[];
    index: number;
    setListBarang: React.Dispatch<React.SetStateAction<Barang[]>>;
}
export default function DeleteBarang({ listBarang, index, setListBarang }: ListBarang) {
    function DeleteBarang() {
        axios.delete(`/api/barang?id=${listBarang[index].KodeBarang}`)
        .then((res)=>{
            const newList = listBarang;
            newList.splice(index,1);
            setListBarang(newList);
        })
        .catch((err_res)=>{
            console.log(JSON.stringify(err_res));
        })
    }
    return (
        <Button 
        variant="outlined" 
        startIcon={<DeleteIcon />} 
        onClick={DeleteBarang} 
        className='bg-red-600 text-white border-red-600 hover:bg-red-500 hover:border-red-500'>
            Delete
        </Button>
    )
}
