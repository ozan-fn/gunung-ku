interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export default function Textarea({ className = "", ...props }: TextareaProps) {
    return <textarea {...props} rows={4} className={`${className} focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}></textarea>;
}
