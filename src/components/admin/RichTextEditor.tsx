'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';

// Import ReactQuill dynamiquement pour éviter les erreurs de SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 border border-[var(--border-color)] rounded-lg flex items-center justify-center">Chargement de l'éditeur...</div>
});

// Import des styles CSS de ReactQuill (à ajouter dans votre projet)
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Commencez à rédiger...' }: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef<any>(null);

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Configuration des modules Quill
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        [{ color: [] }, { background: [] }],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: handleImageInsert
      }
    },
    clipboard: {
      matchVisual: false
    }
  };

  // Liste des formats autorisés
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
    'blockquote', 'code-block'
  ];

  // Fonction pour gérer l'insertion d'images
  function handleImageInsert() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        
        try {
          // Dans une vraie application, vous téléchargeriez l'image vers Supabase Storage
          // const { data, error } = await supabase.storage.from('images').upload(`article-images/${Date.now()}-${file.name}`, file);
          // if (error) throw error;
          // const imageUrl = supabase.storage.from('images').getPublicUrl(data.path).data.publicUrl;
          
          // Pour la démo, utiliser une URL de placeholder
          const imageUrl = URL.createObjectURL(file);
          
          // Insérer l'image dans l'éditeur
          const editor = quillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection();
            editor.insertEmbed(range?.index || 0, 'image', imageUrl);
          }
        } catch (error) {
          console.error('Erreur lors du téléchargement de l\'image', error);
          alert('Erreur lors du téléchargement de l\'image');
        }
      }
    };
  }

  // Si non monté (côté serveur), afficher un placeholder
  if (!mounted) {
    return (
      <div className="h-64 border border-[var(--border-color)] rounded-lg flex items-center justify-center">
        Chargement de l'éditeur...
      </div>
    );
  }

  return (
    <div className="rich-text-editor">
      <style jsx global>{`
        .rich-text-editor .ql-container {
          height: 400px;
          font-size: 16px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: var(--border-color);
          background-color: var(--bg-color);
          color: var(--text-color);
        }
        
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: var(--border-color);
          background-color: var(--bg-alt);
        }
        
        .rich-text-editor .ql-editor {
          min-height: 400px;
          max-height: 600px;
          overflow-y: auto;
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: var(--text-muted);
          font-style: normal;
        }
        
        /* Style pour les thèmes sombres */
        .dark .rich-text-editor .ql-snow .ql-stroke {
          stroke: #aaa;
        }
        
        .dark .rich-text-editor .ql-snow .ql-fill {
          fill: #aaa;
        }
        
        .dark .rich-text-editor .ql-snow .ql-picker {
          color: #aaa;
        }
        
        .dark .rich-text-editor .ql-snow .ql-picker-options {
          background-color: var(--card-bg);
          border-color: var(--border-color);
        }
        
        /* Style pour les liens */
        .rich-text-editor .ql-editor a {
          color: var(--primary);
        }
        
        /* Style pour les images */
        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }
        
        /* Style pour les blocs de citation */
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 1rem;
          margin: 1rem 0;
          color: var(--text-muted);
        }
        
        /* Style pour les blocs de code */
        .rich-text-editor .ql-editor pre.ql-syntax {
          background-color: var(--bg-alt);
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          font-family: monospace;
        }
      `}</style>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor; 