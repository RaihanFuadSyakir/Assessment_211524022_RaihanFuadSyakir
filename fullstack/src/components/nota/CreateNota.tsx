"use client"
import { Nota } from "@prisma/client";
import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { dataResponse } from '@/utils/dataInterface';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
interface ListNota {
    setListNota: React.Dispatch<React.SetStateAction<Nota[]>>;
    listNota: Nota[];
    index: number;
    isEdit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNota({ setListNota, listNota, index, isEdit, setEdit }: ListNota) {
    const [newNota, setNota] = useState<Nota>({
        KodeNota: '',
        KodeTenan: '',
        KodeKasir: '',
        TglNota: new Date(),
        JamNota: new Date(),
        JumlahBelanja: 0,
        Diskon: 0,
        Total: 0,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNota((prevNota) => ({
            ...prevNota,
            [name]: name === 'TglNota' || name === 'JamNota' ? new Date(value) : value,
        }));
    };

    function addNota() {
        axios.post('/api/nota', newNota)
            .then((res: AxiosResponse<dataResponse<Nota>>) => {
                setListNota((prev) => [...prev, newNota]);
            })
            .catch((err_res: AxiosError<dataResponse<Nota>>) => {
                console.log(JSON.stringify(err_res.response?.data));
            });
    }

    function updateNota() {
        axios.put(`/api/nota?id=${listNota[index].KodeNota}`, newNota)
            .then((res: AxiosResponse<dataResponse<Nota>>) => {
                const newList = listNota;
                newList[index] = res.data.data!;
                setListNota(newList);
                setEdit(false);
            })
            .catch((err_res: AxiosError) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <div className='m-4 p-2 flex flex-col w-1/3 bg-orange-100 rounded'>
            <div>{isEdit ? "Form update nota" : "Form tambah nota"}</div>
            <div className='flex flex-col'>
                <TextField
                    label="Kode Nota"
                    variant="outlined"
                    name="KodeNota"
                    value={newNota.KodeNota}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Kode Tenan"
                    variant="outlined"
                    name="KodeTenan"
                    value={newNota.KodeTenan}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Kode Kasir"
                    variant="outlined"
                    name="KodeKasir"
                    value={newNota.KodeKasir}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Tanggal Nota"
                    variant="outlined"
                    type="date"
                    name="TglNota"
                    value={newNota.TglNota.toISOString().split('T')[0]}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Jam Nota"
                    variant="outlined"
                    type="time"
                    name="JamNota"
                    value={newNota.JamNota.toISOString().split('T')[1].substring(0, 5)}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Jumlah Belanja"
                    variant="outlined"
                    type="number"
                    name="JumlahBelanja"
                    value={newNota.JumlahBelanja}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Diskon"
                    variant="outlined"
                    type="number"
                    name="Diskon"
                    value={newNota.Diskon}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Total"
                    variant="outlined"
                    type="number"
                    name="Total"
                    value={newNota.Total}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />
            </div>
            {isEdit ? (
                <Button variant="contained" onClick={updateNota} className='bg-blue-600'>Edit Nota</Button>
            ) : (
                <Button variant="contained" onClick={addNota} className='bg-blue-600'>Tambah Nota</Button>
            )}
        </div>
    );
}