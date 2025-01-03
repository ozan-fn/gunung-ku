import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface Props {
    gunung: { id: number; nama: string; tinggi: number; lokasi: string; gambar: string };
}

export default function Edit({ gunung }: Props) {
    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        _method: "patch",
        nama: gunung.nama,
        tinggi: Number(gunung.tinggi),
        lokasi: gunung.lokasi,
        gambar: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("gunung.update", { id: gunung.id }));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form className="space-y-4" onSubmit={submit}>
                                <div>
                                    <label className="block text-sm font-medium">Nama Gunung</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        defaultValue={data.nama}
                                        value={data.nama}
                                        onChange={(e) => setData("nama", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Tinggi (mdpl)</label>
                                    <input
                                        type="number"
                                        name="tinggi"
                                        value={data.tinggi}
                                        onChange={(e) => setData("tinggi", Number(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Lokasi</label>
                                    <input
                                        type="text"
                                        name="lokasi"
                                        value={data.lokasi}
                                        onChange={(e) => setData("lokasi", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Gambar Saat Ini</label>
                                    <img src={data.gambar ? URL.createObjectURL(data.gambar) : gunung.gambar} className="mt-2 h-48 w-auto rounded-lg object-cover" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Upload Gambar Baru</label>
                                    <input
                                        onChange={(e) => setData("gambar", e.target.files?.[0] ?? null)}
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-200"
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
