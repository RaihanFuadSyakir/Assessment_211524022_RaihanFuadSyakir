"use client"
import { Barang } from '@prisma/client';
import React from 'react'
interface ListBarang {
    setListBarang: React.Dispatch<React.SetStateAction<Barang[]>>;
}
export default function UpdateBarang() {
    return (
        <div>UpdateBarang</div>
    )
}
