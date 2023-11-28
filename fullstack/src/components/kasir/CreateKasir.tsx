import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { dataResponse } from '@/utils/dataInterface';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Kasir } from '@prisma/client';

interface ListKasir {
    setListKasir: React.Dispatch<React.SetStateAction<Kasir[]>>;
    listKasir: Kasir[];
    index: number;
    isEdit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateKasir({ setListKasir, listKasir, index, isEdit, setEdit }: ListKasir) {
    const [newKasir, setKasir] = useState<Kasir>({
        KodeKasir: '',
        Nama: '',
        HP: '',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setKasir((prevKasir) => ({
            ...prevKasir,
            [name]: value,
        }));
    };

    function addKasir() {
        axios.post('/api/kasir', newKasir)
            .then((res: AxiosResponse<dataResponse<Kasir>>) => {
                setListKasir((prev) => [...prev, newKasir]);
            })
            .catch((err_res: AxiosError<dataResponse<Kasir>>) => {
                console.log(JSON.stringify(err_res.response?.data));
            });
    }

    function updateKasir() {
        axios.put(`/api/kasir?id=${listKasir[index].KodeKasir}`, newKasir)
            .then((res: AxiosResponse<dataResponse<Kasir>>) => {
                const newList = listKasir;
                newList[index] = res.data.data!;
                setListKasir(newList);
                setEdit(false);
            })
            .catch((err_res: AxiosError) => {
                console.log(JSON.stringify(err_res));
            });
    }

    return (
        <div className='m-4 p-2 flex flex-col w-1/3 bg-orange-100 rounded'>
            <div>{isEdit ? "Form update kasir" : "Form tambah kasir"}</div>
            <div className='flex flex-col'>
                <TextField
                    label="Kode Kasir"
                    variant="outlined"
                    name="KodeKasir"
                    value={newKasir.KodeKasir}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Nama Kasir"
                    variant="outlined"
                    name="Nama"
                    value={newKasir.Nama}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Nomor HP"
                    variant="outlined"
                    name="HP"
                    value={newKasir.HP}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />
            </div>
            {isEdit ? (
                <Button variant="contained" onClick={updateKasir} className='bg-blue-600'>Edit Kasir</Button>
            ) : (
                <Button variant="contained" onClick={addKasir} className='bg-blue-600'>Tambah Kasir</Button>
            )}
        </div>
    );
}