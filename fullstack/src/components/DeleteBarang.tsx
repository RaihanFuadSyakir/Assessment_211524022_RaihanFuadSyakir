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
        axios.delete('/api/barang/')
    }
    return (
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={DeleteBarang}>
            Delete
        </Button>
    )
}
