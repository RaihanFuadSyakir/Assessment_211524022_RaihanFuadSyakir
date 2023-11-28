"use client"
import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { dataResponse } from '@/utils/dataInterface';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BarangNota } from "@prisma/client";
interface ListBarangNota {
    setListBarangNota: React.Dispatch<React.SetStateAction<BarangNota[]>>;
    listBarangNota: BarangNota[];
    index: number;
    isEdit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateBarangNota({ setListBarangNota, listBarangNota, index, isEdit, setEdit }: ListBarangNota) {
    const [newBarangNota, setBarangNota] = useState<BarangNota>({
        KodeNota: '',
        KodeBarang: '',
        JumlahBarang: 0,
        HargaSatuan: 0,
        Jumlah: 0,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBarangNota((prevBarangNota) => ({
            ...prevBarangNota,
            [name]: name === 'JumlahBarang' || name === 'HargaSatuan' || name === 'Jumlah' ? Number(value) : value,
        }));
    };

    function addBarangNota() {
        axios.post('/api/barangNota', newBarangNota)
            .then((res: AxiosResponse<dataResponse<BarangNota>>) => {
                setListBarangNota((prev) => [...prev, newBarangNota]);
            })
            .catch((err_res: AxiosError<dataResponse<BarangNota>>) => {
                console.log(JSON.stringify(err_res.response?.data));
            });
    }

    function updateBarangNota() {
        axios.put(`/api/barangNota?id=${listBarangNota[index].KodeNota}`, newBarangNota)
            .then((res: AxiosResponse<dataResponse<BarangNota>>) => {
                const newList = listBarangNota;
                newList[index] = res.data.data!;
                setListBarangNota(newList);
                setEdit(false);
            })
            .catch((err_res: AxiosError) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <div className='m-4 p-2 flex flex-col w-1/3 bg-orange-100 rounded'>
            <div>{isEdit ? "Form update barang nota" : "Form tambah barang nota"}</div>
            <div className='flex flex-col'>
                <TextField
                    label="Kode Nota"
                    variant="outlined"
                    name="KodeNota"
                    value={newBarangNota.KodeNota}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Kode Barang"
                    variant="outlined"
                    name="KodeBarang"
                    value={newBarangNota.KodeBarang}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Jumlah Barang"
                    variant="outlined"
                    type="number"
                    name="JumlahBarang"
                    value={newBarangNota.JumlahBarang}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Harga Satuan"
                    variant="outlined"
                    type="number"
                    name="HargaSatuan"
                    value={newBarangNota.HargaSatuan}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Jumlah"
                    variant="outlined"
                    type="number"
                    name="Jumlah"
                    value={newBarangNota.Jumlah}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />
            </div>
            {isEdit ? (
                <Button variant="contained" onClick={updateBarangNota} className='bg-blue-600'>Edit Barang Nota</Button>
            ) : (
                <Button variant="contained" onClick={addBarangNota} className='bg-blue-600'>Tambah Barang Nota</Button>
            )}
        </div>
    );
}