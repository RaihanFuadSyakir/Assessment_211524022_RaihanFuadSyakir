"use client"
import CreateBarang from '@/components/barang/CreateBarang';
import { dataResponse } from '@/utils/dataInterface';
import { Barang } from '@prisma/client'
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteBarang from '@/components/barang/DeleteBarang';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
export default function BarangPage() {
    const [items, setItems] = useState<Barang[]>([]);
    const [isEdit,setEdit] = useState(false);
    const [arrNum,setArrNum] = useState(-1);
    useEffect(() => {
        axios.get('/api/barang')
            .then((res: AxiosResponse<dataResponse<Barang[]>>) => {
                setItems(res.data.data!);
            })
            .catch((err_res: AxiosError<dataResponse<Barang[]>>) => {
                console.log(JSON.stringify(err_res.response?.data.data));
            })
    },[])
    
    return (
        <div className='flex flex-row'>
            <CreateBarang setListBarang={setItems} listBarang={items} index={arrNum} isEdit={isEdit} setEdit={setEdit}/>
            <div className='m-4 flex flex-row flex-wrap'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-gray-400 border-2'>
                                <TableCell>No</TableCell>
                                <TableCell align="center">Kode Barang</TableCell>
                                <TableCell align="center">Nama Barang</TableCell>
                                <TableCell align="center">Harga Satuan</TableCell>
                                <TableCell align="center">Satuan</TableCell>
                                <TableCell align="center">Stok</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="center">{row.KodeBarang}</TableCell>
                                    <TableCell align="center">{row.NamaBarang}</TableCell>
                                    <TableCell align="center">{row.HargaSatuan}</TableCell>
                                    <TableCell align="center">{row.Satuan}</TableCell>
                                    <TableCell align="center">{row.Stok}</TableCell>
                                    <TableCell align="center" className='flex flex-col'>
                                        <DeleteBarang listBarang={items} index={index} setListBarang={setItems}/>
                                        <Button 
                                        variant="outlined" 
                                        startIcon={<EditIcon />} 
                                        onClick={()=>{setEdit(true);setArrNum(index)}}
                                        className='bg-blue-600 text-white border-blue-600 hover:bg-blue-500 hover:border-blue-500'>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
