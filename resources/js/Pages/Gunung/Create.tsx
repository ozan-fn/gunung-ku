import Button from "@/Components/Button";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

export default function Add() {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });

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

        post(route("gunung.store"));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                setImage(reader.result);
            },
            false,
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.src = url;
        });

    const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return null;
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

        return canvas.toDataURL("image/jpeg");
    };

    const onCropComplete = async (_croppedArea: Area, croppedAreaPixels: Area) => {
        if (image && typeof image === "string") {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);

            if (croppedImage) {
                const response = await fetch(croppedImage);
                const blob = await response.blob();
                setData("gambar", blob);
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {/*  */}
                    Gunung
                </h2>
            }
        >
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

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="gambar">Gambar</label>
                                    <input id="gambar" onChange={handleFileChange} type="file" hidden accept="image/*" />
                                    {!image ? (
                                        <label htmlFor="gambar" className="flex aspect-video w-full max-w-sm flex-row items-center justify-center gap-2 border border-dashed md:max-w-md">
                                            +
                                        </label>
                                    ) : (
                                        <div className="relative aspect-video w-full max-w-sm md:max-w-md">
                                            <Cropper
                                                //
                                                onCropComplete={onCropComplete}
                                                image={(image as string) ?? ""}
                                                crop={crop}
                                                onCropChange={setCrop}
                                                aspect={16 / 9}
                                                zoom={1}
                                            />

                                            <div onClick={() => setImage(null)} className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center bg-red-500">
                                                X
                                            </div>
                                        </div>
                                    )}
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
