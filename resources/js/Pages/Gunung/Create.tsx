import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Button";
import ImageCropper from "@/Components/ImageCropper";

export default function Add() {
    const [image, setImage] = useState<string | null>(null);

    const { data, setData, post } = useForm({
        nama: "",
        tinggi: "",
        lokasi: "",
        gambar: null as Blob | null,
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as "nama" | "tinggi" | "lokasi" | "gambar", value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("gunung.store"), {
            onSuccess: () => handleImageReset,
        });
    };

    const handleImageReset = () => {
        setData("gambar", null);
        setImage(null);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Gunung</h2>}>
            <Head title="Gunung" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nama">Nama</label>
                                    <input value={data.nama} onChange={handleInput} name="nama" id="nama" type="text" className="dark:bg-gray-700" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="tinggi">Tinggi</label>
                                    <input value={data.tinggi} onChange={handleInput} name="tinggi" id="tinggi" type="text" className="dark:bg-gray-700" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="lokasi">Lokasi</label>
                                    <input value={data.lokasi} onChange={handleInput} name="lokasi" id="lokasi" type="text" className="dark:bg-gray-700" />
                                </div>

                                <div className="flex max-w-md flex-col gap-2">
                                    <label htmlFor="gambar">Gambar</label>
                                    <ImageCropper image={image} setImage={setImage} onReset={handleImageReset} onCropped={(e) => setData("gambar", e)} />
                                </div>

                                <div className="flex">
                                    <Button variant="primary" type="submit" className="ml-auto">
                                        SUBMIT
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
