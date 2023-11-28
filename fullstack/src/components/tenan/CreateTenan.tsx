"use client"
import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { dataResponse } from '@/utils/dataInterface';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Tenan } from '@prisma/client';
interface ListTenan {
    setListTenan: React.Dispatch<React.SetStateAction<Tenan[]>>;
    listTenan: Tenan[];
    index: number;
    isEdit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateTenan({ setListTenan, listTenan, index, isEdit, setEdit }: ListTenan) {
    const [newTenan, setTenan] = useState<Tenan>({
        KodeTenan: '',
        NamaTenan: '',
        HP: '',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTenan((prevTenan) => ({
            ...prevTenan,
            [name]: value,
        }));
    };

    function addTenan() {
        axios.post('/api/tenan', newTenan)
            .then((res: AxiosResponse<dataResponse<Tenan>>) => {
                setListTenan((prev) => [...prev, newTenan]);
            })
            .catch((err_res: AxiosError<dataResponse<Tenan>>) => {
                console.log(JSON.stringify(err_res.response?.data));
            });
    }

    function updateTenan() {
        axios.put(`/api/tenan?id=${listTenan[index].KodeTenan}`, newTenan)
            .then((res: AxiosResponse<dataResponse<Tenan>>) => {
                const newList = listTenan;
                newList[index] = res.data.data!;
                setListTenan(newList);
                setEdit(false);
            })
            .catch((err_res: AxiosError) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <div className='m-4 p-2 flex flex-col w-1/3 bg-orange-100 rounded'>
            <div>{isEdit ? "Form update tenan" : "Form tambah tenan"}</div>
            <div className='flex flex-col'>
                <TextField
                    label="Kode Tenan"
                    variant="outlined"
                    name="KodeTenan"
                    value={newTenan.KodeTenan}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Nama Tenan"
                    variant="outlined"
                    name="NamaTenan"
                    value={newTenan.NamaTenan}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Nomor HP"
                    variant="outlined"
                    name="HP"
                    value={newTenan.HP}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />
            </div>
            {isEdit ? (
                <Button variant="contained" onClick={updateTenan} className='bg-blue-600'>Edit Tenan</Button>
            ) : (
                <Button variant="contained" onClick={addTenan} className='bg-blue-600'>Tambah Tenan</Button>
            )}
        </div>
    );
}