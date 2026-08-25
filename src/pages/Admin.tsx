import React, { useState } from 'react';
import { useFirestoreCollection, addDocument, updateDocument, deleteDocument } from '../lib/db';
import { Camera, BookOpen, MapPin, Calendar, Plus, Edit2, Trash2, X, Save, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

type CollectionConfig = {
  id: string;
  label: string;
  icon: React.ElementType;
  fields: { name: string; label: string; type: 'text' | 'textarea' | 'number' | 'boolean' | 'array' }[];
};

const COLLECTIONS: CollectionConfig[] = [
  {
    id: 'photographs',
    label: 'Fotografías',
    icon: Camera,
    fields: [
      { name: 'title', label: 'Título', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'textarea' },
      { name: 'imageUrl', label: 'URL de Imagen', type: 'text' },
      { name: 'year', label: 'Año', type: 'text' },
      { name: 'author', label: 'Autor', type: 'text' },
      { name: 'tags', label: 'Etiquetas (coma)', type: 'array' },
    ]
  },
  {
    id: 'stories',
    label: 'Historias',
    icon: BookOpen,
    fields: [
      { name: 'title', label: 'Título', type: 'text' },
      { name: 'content', label: 'Contenido', type: 'textarea' },
      { name: 'authorId', label: 'Autor', type: 'text' },
      { name: 'tags', label: 'Etiquetas (coma)', type: 'array' },
      { name: 'audioUrl', label: 'URL de Audio', type: 'text' },
    ]
  },
  {
    id: 'locations',
    label: 'Lugares',
    icon: MapPin,
    fields: [
      { name: 'title', label: 'Título', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'textarea' },
      { name: 'lat', label: 'Latitud', type: 'number' },
      { name: 'lng', label: 'Longitud', type: 'number' },
      { name: 'year', label: 'Año', type: 'text' },
      { name: 'imageUrl', label: 'URL de Imagen', type: 'text' },
    ]
  },
  {
    id: 'workshops',
    label: 'Talleres',
    icon: Calendar,
    fields: [
      { name: 'title', label: 'Título', type: 'text' },
      { name: 'description', label: 'Descripción', type: 'textarea' },
      { name: 'date', label: 'Fecha', type: 'text' },
      { name: 'time', label: 'Hora', type: 'text' },
      { name: 'location', label: 'Lugar', type: 'text' },
      { name: 'imageUrl', label: 'URL de Imagen', type: 'text' },
    ]
  }
];

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clave, setClave] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState(COLLECTIONS[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (clave === 'manrique' && password === 'manrique1234') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => setIsAuthenticated(false);

  const activeCollection = COLLECTIONS.find(c => c.id === activeTab)!;
  const { data, loading, refetch } = useFirestoreCollection<any>(activeTab);

  const handleEdit = (doc: any) => {
    setCurrentDoc(doc);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentDoc({});
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      await deleteDocument(activeTab, id);
      refetch();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentDoc.id) {
        const { id, ...dataToSave } = currentDoc;
        await updateDocument(activeTab, id, dataToSave);
      } else {
        await addDocument(activeTab, currentDoc);
      }
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error(error);
      alert('Error guardando documento. ¿Tienes permisos?');
    }
  };

  const handleChange = (name: string, value: any, type: string) => {
    if (type === 'array') {
      value = typeof value === 'string' ? value.split(',').map(s => s.trim()) : value;
    } else if (type === 'number') {
      value = parseFloat(value) || 0;
    }
    
    setCurrentDoc(prev => ({ ...prev, [name]: value }));
  };

  const getValueForInput = (name: string, type: string) => {
    const val = currentDoc?.[name];
    if (type === 'array') {
      return Array.isArray(val) ? val.join(', ') : '';
    }
    return val || '';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-md mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="font-editorial text-4xl mb-4">Acceso CMS</h1>
        <p className="text-foreground/70 mb-8 font-light">Ingresa tus credenciales para administrar el contenido.</p>
        
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Clave de usuario"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="w-full bg-background border border-foreground/20 p-3 focus:outline-none focus:border-medellin-orange transition-colors"
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-foreground/20 p-3 focus:outline-none focus:border-medellin-orange transition-colors"
              required
            />
          </div>
          {authError && (
            <p className="text-red-500 text-sm">Credenciales incorrectas.</p>
          )}
          <button 
            type="submit"
            className="w-full bg-medellin-orange text-background px-8 py-3 font-montserrat text-xs uppercase tracking-widest hover:bg-medellin-orange/90 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 space-y-2">
        <div className="mb-8">
          <h2 className="font-editorial text-2xl mb-2">CMS Manrique</h2>
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Conectado como Administrador</span>
          </div>
        </div>
        
        {COLLECTIONS.map(collection => (
          <button
            key={collection.id}
            onClick={() => {
              setActiveTab(collection.id);
              setIsEditing(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
              activeTab === collection.id 
                ? "bg-medellin-orange/10 text-medellin-orange border-l-2 border-medellin-orange" 
                : "hover:bg-muted/50 text-foreground/70"
            )}
          >
            <collection.icon size={18} />
            <span className="font-montserrat uppercase tracking-wider text-xs">{collection.label}</span>
          </button>
        ))}

        <button 
          onClick={handleLogout}
          className="w-full mt-8 flex items-center gap-3 px-4 py-3 text-left text-foreground/50 hover:text-foreground transition-colors"
        >
          <LogOut size={18} />
          <span className="font-montserrat uppercase tracking-wider text-xs">Cerrar Sesión</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-editorial text-4xl">{activeCollection.label}</h1>
          {!isEditing && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-medellin-orange text-background px-4 py-2 font-montserrat text-xs uppercase tracking-wider hover:bg-medellin-orange/90 transition-colors"
            >
              <Plus size={16} /> Agregar Nuevo
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="bg-muted/10 border border-foreground/10 p-6 md:p-8 relative">
            <button 
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground"
            >
              <X size={20} />
            </button>
            <h2 className="font-editorial text-2xl mb-6">
              {currentDoc.id ? 'Editar Registro' : 'Nuevo Registro'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {activeCollection.fields.map(field => (
                  <div key={field.name} className={cn("space-y-2", field.type === 'textarea' && "md:col-span-2")}>
                    <label className="block font-montserrat uppercase text-xs tracking-wider text-foreground/70">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={getValueForInput(field.name, field.type)}
                        onChange={(e) => handleChange(field.name, e.target.value, field.type)}
                        className="w-full bg-background border border-foreground/20 p-3 min-h-[120px] focus:outline-none focus:border-medellin-orange transition-colors"
                        required={field.name === 'title' || field.name === 'name'}
                      />
                    ) : (
                      <input
                        type={field.type === 'number' ? 'number' : 'text'}
                        step={field.type === 'number' ? 'any' : undefined}
                        value={getValueForInput(field.name, field.type)}
                        onChange={(e) => handleChange(field.name, e.target.value, field.type)}
                        className="w-full bg-background border border-foreground/20 p-3 focus:outline-none focus:border-medellin-orange transition-colors"
                        required={field.name === 'title' || field.name === 'name'}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-foreground/20 font-montserrat text-xs uppercase tracking-wider hover:bg-foreground/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-medellin-orange text-background px-6 py-2 font-montserrat text-xs uppercase tracking-wider hover:bg-medellin-orange/90 transition-colors"
                >
                  <Save size={16} /> Guardar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-muted/10 border border-foreground/10">
            {loading ? (
              <div className="p-8 text-center text-foreground/50">Cargando...</div>
            ) : data.length === 0 ? (
              <div className="p-8 text-center text-foreground/50">No hay registros todavía.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-foreground/5 border-b border-foreground/10">
                    <tr>
                      <th className="p-4 font-montserrat text-xs uppercase tracking-wider font-normal">Título / Nombre</th>
                      <th className="p-4 font-montserrat text-xs uppercase tracking-wider font-normal">Fecha Creación</th>
                      <th className="p-4 font-montserrat text-xs uppercase tracking-wider font-normal text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {data.map((item) => (
                      <tr key={item.id} className="hover:bg-foreground/5 transition-colors">
                        <td className="p-4 font-medium">{item.title || item.name || 'Sin título'}</td>
                        <td className="p-4 text-sm text-foreground/70">
                          {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-foreground/50 hover:text-medellin-orange transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-foreground/50 hover:text-red-500 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
