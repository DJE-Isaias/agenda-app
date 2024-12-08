import { Contact } from "@/lib/models/contact";

interface ContactCardProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ContactCard({
  contact,
  onEdit,
  onDelete,
}: ContactCardProps) {
  const socials = JSON.parse(contact.socialLinks);

  return (
    <div className="relative bg-white p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={contact.image}
        alt={contact.name}
        className="w-16 h-16 rounded-full mx-auto"
      />
      <h3 className="mt-4 text-center font-bold">{contact.name}</h3>
      <p className="text-center text-sm text-gray-500">{contact.phone}</p>
      <p className="text-center text-sm text-gray-500">{contact.email}</p>
      <div className="absolute top-4 right-4 space-x-2 hidden group-hover:block">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Eliminar
        </button>
      </div>
      <div className="mt-2 flex justify-center space-x-2">
        {socials.map((social: string) => (
          <span key={social} className="text-xs text-gray-500">
            {social}
          </span>
        ))}
      </div>
    </div>
  );
}
