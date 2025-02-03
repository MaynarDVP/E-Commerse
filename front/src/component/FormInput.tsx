interface FormInputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
  }
  
  export function FormInput({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    error,
  }: FormInputProps) {
    return (
      <div className="mt-4">
        <label className="block text-gray-500 font-semibold" htmlFor={name}>
          {label}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-black"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
