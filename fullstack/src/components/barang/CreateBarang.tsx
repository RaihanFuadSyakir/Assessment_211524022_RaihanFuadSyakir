"use client"
import { dataResponse } from '@/utils/dataInterface';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Barang } from '@prisma/client'
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react'
interface ListBarang {
    setListBarang: React.Dispatch<React.SetStateAction<Barang[]>>;
    listBarang:Barang[];
    index : number;
    isEdit:boolean;
    setEdit : React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreateBarang({ setListBarang ,listBarang,index,isEdit,setEdit}: ListBarang) {
    const [newBarang, setBarang] = useState<Barang>({
        KodeBarang: '',
        NamaBarang: '',
        Satuan: '',
        HargaSatuan: 0,
        Stok: 0,
    });

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setBarang((prevBarang) => ({
            ...prevBarang,
            [name]: name === 'HargaSatuan' || name === 'Stok' ? Number(value) : value,
        }));
    };
    function addBarang() {
        axios.post('/api/barang', newBarang)
            .then((res: AxiosResponse<dataResponse<Barang>>) => {
                setListBarang((prev) => [...prev, newBarang]);
            })
            .catch((err_res: AxiosError<dataResponse<Barang>>) => {
                console.log(JSON.stringify(err_res.response?.data));
            })
    }
    function UpdateBarang() {
        axios.put(`/api/barang?id=${listBarang[index].KodeBarang}`,newBarang)
        .then((res : AxiosResponse<dataResponse<Barang>>)=>{
            const newList = listBarang;
            newList[index] = res.data.data!;
            setListBarang(newList);
            setEdit(false);
        })
        .catch((err_res)=>{
            console.log(JSON.stringify(err_res));
        })
    }
    return (
        <div className='m-4 p-2 flex flex-col w-1/3 bg-orange-100 rounded'>
            <div>{isEdit ? "Form update barang" : "Form tambah barang"}</div>
            <div className='flex flex-col'>
                <TextField
                    label="Kode Barang"
                    variant="outlined"
                    name="KodeBarang"
                    value={newBarang.KodeBarang}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Nama Barang"
                    variant="outlined"
                    name="NamaBarang"
                    value={newBarang.NamaBarang}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Satuan"
                    variant="outlined"
                    name="Satuan"
                    value={newBarang.Satuan}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Harga Satuan"
                    variant="outlined"
                    type="number"
                    name="HargaSatuan"
                    value={newBarang.HargaSatuan}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Stok"
                    variant="outlined"
                    type="number"
                    name="Stok"
                    value={newBarang.Stok}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />
            </div>
            {isEdit ? (
                <Button variant="contained" onClick={UpdateBarang} className='bg-blue-600'>Edit Barang</Button>
            ):(
                <Button variant="contained" onClick={addBarang} className='bg-blue-600'>Tambah Barang</Button>
            )}
            
            
        </div>
    );
}
