import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperProps {
    image: string | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    onCropped: (blob: Blob) => void;
    onReset: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, setImage, onCropped, onReset }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result as string);
        };
    };

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener("load", () => resolve(img));
            img.addEventListener("error", (error) => reject(error));
            img.src = url;
        });

    const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
        const img = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return null;
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

        return canvas.toDataURL("image/jpeg");
    };

    const onCropComplete = async (_croppedArea: Area, croppedAreaPixels: Area) => {
        if (image && typeof image === "string") {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);

            if (croppedImage) {
                const response = await fetch(croppedImage);
                const blob = await response.blob();
                onCropped(blob);
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <input id="gambar" onChange={handleFileChange} type="file" hidden accept="image/*" />

            {!image ? (
                <>
                    <label htmlFor="gambar" className="flex aspect-video w-full items-center justify-center border border-dashed">
                        <PlusIcon className="h-6 w-6 text-gray-500" />
                    </label>
                </>
            ) : (
                <div className="relative aspect-video w-full">
                    <Cropper onCropComplete={onCropComplete} classes={{ mediaClassName: "rounded-md" }} image={image as string} crop={crop} onCropChange={setCrop} aspect={16 / 9} zoom={1} />
                    <div
                        onClick={() => {
                            setImage(null);
                            onReset();
                        }}
                        className="absolute -right-2 -top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-500"
                    >
                        <XIcon className="h-6 w-6 text-white" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
