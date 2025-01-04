import Button from "@/Components/Button";
import ImageCropper from "@/Components/ImageCropper";
import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { error } from "console";
import { PlusIcon, XIcon } from "lucide-react";
import { div } from "motion/react-client";
import { FormEventHandler, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

interface Basecamp {
    id: number;
    gunung_id: number;
    user_id: number;
    nama: string;
    alamat: any;
    harga: any;
    deskripsi: any;
    kuota: any;
    telepon: any;
    gmaps_link: any;
    photos: { path: string; id: number }[];
    created_at: string;
    updated_at: string;
}

export default function Index({ basecamp }: { basecamp: Basecamp }) {
    const [image, setImage] = useState(null);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        //
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const { data, setData, post, errors, recentlySuccessful } = useForm({
        _method: "patch",
        nama: basecamp.nama,
        alamat: basecamp.alamat,
        harga: basecamp.harga,
        deskripsi: basecamp.deskripsi,
        kuota: basecamp.kuota,
        telepon: basecamp.telepon,
        gmaps_link: basecamp.gmaps_link,
    });

    const handleInput = (name: keyof typeof data) => {
        return {
            value: data[name],
            onChange: (e: any) => setData(name, e.target.value),
        };
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("basecamp.update", basecamp.id), { preserveScroll: true });
    };

    const handleDeletePhoto = (id: number) => {
        router.delete(route("basecamp.photo.delete", id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Basecamp</h2>}>
            <Head title="Basecamp" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/*  */}
                    <div className="mb-4" hidden={!recentlySuccessful} id="success-message">
                        <div className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline">Basecamp created successfully.</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/*  */}

                        <div className="w-full max-w-md shrink-0">
                            <div className="mb-4">
                                <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
                                    {basecamp.photos.map((v, i) => {
                                        return (
                                            <div className="relative">
                                                <img
                                                    //
                                                    key={i}
                                                    className="relative aspect-video w-full rounded-lg object-cover"
                                                    src={v.path}
                                                    width="300"
                                                />
                                                <div className="absolute -right-2 -top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-500" onClick={() => handleDeletePhoto(v.id)}>
                                                    <XIcon className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <UploadImage id={basecamp.id} />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="flex-1 rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="nama">
                                    Basecamp Name
                                </label>
                                <Input {...handleInput("nama")} placeholder="Enter basecamp name" type="text" />

                                {errors.nama && <p className="mt-2 text-xs italic text-red-500">{errors.nama}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="alamat">
                                    Address
                                </label>
                                <Input {...handleInput("alamat")} placeholder="Enter basecamp name" type="text" />
                                {errors.alamat && <p className="mt-2 text-xs italic text-red-500">{errors.alamat}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="harga">
                                    Price
                                </label>
                                <Input {...handleInput("harga")} placeholder="Enter basecamp name" type="text" />
                                {errors.harga && <p className="mt-2 text-xs italic text-red-500">{errors.harga}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="deskripsi">
                                    Description
                                </label>
                                <Textarea placeholder="Deskripsi" {...handleInput("deskripsi")} />
                                {errors.deskripsi && <p className="mt-2 text-xs italic text-red-500">{errors.deskripsi}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="kuota">
                                    Quota
                                </label>
                                <Input {...handleInput("kuota")} placeholder="Enter basecamp name" type="text" />
                                {errors.kuota && <p className="mt-2 text-xs italic text-red-500">{errors.kuota}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="telepon">
                                    Phone Number
                                </label>
                                <Input {...handleInput("telepon")} placeholder="Enter basecamp name" type="text" />
                                {errors.telepon && <p className="mt-2 text-xs italic text-red-500">{errors.telepon}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="gmaps_link">
                                    Google Maps Link
                                </label>
                                <Input {...handleInput("gmaps_link")} placeholder="Enter basecamp name" type="text" />
                                {errors.gmaps_link && <p className="mt-2 text-xs italic text-red-500">{errors.gmaps_link}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="focus:shadow-outline rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none" type="submit">
                                    Create Basecamp
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <code>{JSON.stringify(basecamp, null, 4)}</code>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function UploadImage({ id }: { id: number }) {
    const [image, setImage] = useState<null | string>(null);

    const { post, setData } = useForm({
        _method: "patch",
        photo: null as Blob | null,
    });

    const handleupload = () => {
        post(route("basecamp.update", id), {
            onSuccess: handleReset,
        });
    };

    const handleReset = () => {
        setImage(null);
        setData("photo", null);
    };

    return (
        <div className="flex flex-col gap-2">
            <ImageCropper image={image} setImage={setImage} onCropped={(t) => setData("photo", t)} onReset={() => {}} />
            <Button variant="primary" onClick={handleupload} className={`ml-auto ${!image && "hidden"}`}>
                UPLOAD
            </Button>
        </div>
    );
}
