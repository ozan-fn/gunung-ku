import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { EllipsisVertical, PlusIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "@/Components/PrimaryButton";

interface Props {
    gunungs: { id: number; nama: string; tinggi: number; lokasi: string; gambar: string }[];
}

export default function Index({ gunungs }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Gunung</h2>
                    </div>
                </>
            }
        >
            <Head title="Gunung" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-12 sm:px-6 lg:px-8">
                    <Link href={route("gunung.create")} className="ml-auto">
                        <PrimaryButton>
                            <PlusIcon className="h-4 w-4" />
                            <p className="ml-1">Tambah Gunung</p>
                        </PrimaryButton>
                    </Link>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {gunungs.map((v, i) => (
                            <CardGunung v={v} key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function CardGunung({ v }: { v: { id: number; nama: string; tinggi: number; lokasi: string; gambar: string } }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="h-full bg-gray-700">
                <img src={v.gambar} className="h-48 w-full object-cover" alt={v.nama} />
                <div className="p-4">
                    <div className="relative flex flex-row justify-between">
                        <h1 className="text-lg font-bold text-white">{v.nama}</h1>

                        <div className="cursor-pointer text-white" onClick={() => setOpen((p) => !p)}>
                            <EllipsisVertical />
                        </div>

                        <AnimatePresence>
                            {open && (
                                <motion.div animate={{ opacity: [0, 1] }} exit={{ opacity: [1, 0] }} onClick={() => setOpen((p) => !p)} className="absolute right-5 top-0 rounded-sm bg-white">
                                    <div className="flex flex-col">
                                        <Link href={route("gunung.edit", { id: v.id })} className="mt-1 items-center px-6 py-1 text-center text-sm hover:bg-green-700">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete this?")) {
                                                    router.delete(route("gunung.destroy", { id: v.id }));
                                                }
                                            }}
                                            className="mb-1 items-center px-6 py-1 text-center text-sm hover:bg-green-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <p className="text-sm text-gray-400">{v.lokasi}</p>
                    <p className="text-sm text-gray-400">Ketinggian: {v.tinggi} m</p>
                </div>
            </div>
        </div>
    );
}
