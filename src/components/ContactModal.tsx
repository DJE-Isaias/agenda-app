import { Contact } from "@/lib/models/contact";
import Image from "next/image";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  isEditing: boolean;
  onSave: (contact: Contact) => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  contact,
  isEditing,
  onSave,
}: ContactModalProps) {
  const [name, setName] = useState(contact?.name || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [comment, setComment] = useState(contact?.comment || "");
  const [socialLinks, setSocialLinks] = useState(
    contact?.socialLinks || JSON.stringify([])
  );
  const [image, setImage] = useState(contact?.image || "");

  const handleSubmit = async () => {
    const newContact = {
      id: contact?.id || Date.now().toString(),
      name,
      email,
      phone,
      comment,
      socialLinks,
      image,
    };
    onSave(newContact);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Contacto" : "Agregar Contacto"}
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nombre del contacto"
              required
            />
          </div>

          {/* Correo */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Correo electrónico"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Número de teléfono"
              required
            />
          </div>

          {/* Comentarios */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium">
              Comentario
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Comentario sobre el contacto"
            />
          </div>

          {/* Redes sociales */}
          <div>
            <label htmlFor="socials" className="block text-sm font-medium">
              Redes Sociales
            </label>
            <input
              id="socials"
              type="text"
              value={socialLinks}
              onChange={(e) => setSocialLinks(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder='Ingresa redes separadas por comas (Ej: "Facebook, Twitter, Instagram")'
            />
          </div>

          {/* Imagen */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Imagen
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setImage(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full p-2 border rounded"
            />
            {image && (
              <div className="mt-2">
                <Image
                  width={200}
                  height={200}
                  src={image}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEditing ? "Guardar Cambios" : "Agregar Contacto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
