"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useContent } from '@/src/context/ContentContext';
import { SiteContent, PersonData, PublicationData, EventData, GalleryImageData, ContactInfoData, PillarData, CategoryData } from '@/src/data/siteContent';
import { Save, Download, Upload, RotateCcw, Lock, Eye, Plus, Trash2, ChevronDown, ChevronRight, Home, Info, Users, BookOpen, Calendar, PenLine, Mail, MessageSquare, Camera, Mic, LayoutDashboard, X, Search, Send, Menu, AlertTriangle } from 'lucide-react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/src/firebase';

const ADMIN_PASSWORD = '65002 u171749519@145.223.17.93';

// ─── Image compression utility ─────────────────────────────────────────────

async function compressImage(file: File, maxWidth = 1920, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Compression failed'));
        },
        'image/webp',
        quality
      );
    };
    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const TextField: React.FC<{ label: string; value: string; onChange: (v: string) => void; multiline?: boolean }> = ({ label, value, onChange, multiline = false }) => {
  return (
    <div className="mb-5">
      <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#E87722] focus:ring-1 focus:ring-[#E87722]/30 outline-none transition-all resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#E87722] focus:ring-1 focus:ring-[#E87722]/30 outline-none transition-all"
        />
      )}
    </div>
  );
};

const RichTextField: React.FC<{ label: string; value: string; onChange: (v: string) => void; }> = ({ label, value, onChange }) => {
  const handleDriveImport = () => {
    const url = window.prompt("Enter Google Drive Image URL:");
    if (!url) return;
    
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      const imgTag = `<img src="https://drive.google.com/uc?export=view&id=${fileId}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;" />`;
      onChange(value ? value + '<br/>' + imgTag : imgTag);
    } else {
      alert("Invalid Google Drive URL. Could not find File ID.");
    }
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{label}</label>
        <button type="button" onClick={handleDriveImport} className="text-[10px] uppercase tracking-widest bg-[#E87722]/20 text-[#E87722] hover:bg-[#E87722] hover:text-white px-2 py-1 rounded transition-colors font-bold flex items-center gap-1">
          <Camera size={12} />
          Import GDrive Image
        </button>
      </div>
      <div className="bg-white text-black rounded-lg overflow-hidden border border-white/10 shadow-inner p-2">
        <DefaultEditor 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          containerProps={{ style: { minHeight: '350px', border: 'none' } }}
        />
      </div>
    </div>
  );
};


function ImagePickerModal({ onClose, onSelect, selectedValue }: { onClose: () => void, onSelect: (v: string) => void, selectedValue?: string }) {
  const [search, setSearch] = useState('');
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  
  useEffect(() => {
    fetch('/api/images')
      .then(r => r.json())
      .then(setAvailableImages)
      .catch(console.error);
  }, []);
  
  const filteredImages = availableImages.filter(img => 
    img.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4 backdrop-blur-xl" onClick={onClose}>
      <div className="bg-[#0A192F] w-full max-w-6xl p-6 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col h-[85vh] border border-[#E87722]/20 relative overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E87722]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a4b82]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex justify-between items-start mb-6 relative z-10 w-full">
          <div>
            <h3 className="text-white font-black text-2xl tracking-tighter">Media Library</h3>
            <p className="text-white/40 text-[10px] mt-1 font-bold tracking-[0.1em] uppercase">{filteredImages.length} images available</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-[#E87722] rounded-xl text-white/50 hover:text-white transition-all duration-300">
            <X size={20} className="stroke-[3px]" />
          </button>
        </div>

        <div className="mb-6 relative z-10">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search images by name..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white text-sm focus:border-[#E87722] focus:ring-2 focus:ring-[#E87722]/20 outline-none transition-all placeholder-white/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 overflow-y-auto pr-4 pb-4 flex-1 relative z-10">
          {filteredImages.map((imgPath, idx) => {
            const isSelected = imgPath === selectedValue;
            return (
              <div 
                key={idx} 
                onClick={() => { onSelect(imgPath); onClose(); }}
                className={`cursor-pointer group relative w-full pt-[100%] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${isSelected ? 'ring-4 ring-[#E87722] shadow-[#E87722]/30 scale-[0.98]' : 'border border-white/5 hover:border-[#E87722] hover:-translate-y-1 hover:shadow-[#E87722]/20'}`}
              >
                <div className="absolute inset-0 bg-[#1B3B5F]" />
                <img src={imgPath} alt={imgPath} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-[10px] font-bold truncate tracking-wide">{imgPath.split('/').pop()}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#E87722] text-white text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md shadow-lg">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
          {filteredImages.length === 0 && (
            <div className="col-span-full h-full flex flex-col items-center justify-center text-white/30 py-20">
              <Camera size={48} className="mb-4 opacity-30" />
              <p className="font-bold text-lg text-white/50">No images found</p>
              <p className="text-sm mt-1">Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [showPicker, setShowPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDriveImport = () => {
    const url = window.prompt("Enter Google Drive Image URL:");
    if (!url) return;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      onChange(`https://drive.google.com/uc?export=view&id=${match[1]}`);
    } else {
      alert("Invalid Google Drive URL. Could not find File ID.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      // Compress image before upload
      const compressed = await compressImage(file);
      const ext = 'webp';
      const safeName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const storageRef = ref(storage, `images/${Date.now()}_${safeName}.${ext}`);
      
      // Use resumable upload for progress tracking
      const uploadTask = uploadBytesResumable(storageRef, compressed, { contentType: 'image/webp' });
      
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          alert(`Upload failed: ${error.message}`);
          setUploading(false);
          setUploadProgress(0);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onChange(downloadURL);
          setUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (err: any) {
      console.error("Error compressing/uploading image:", err);
      alert(`Upload failed: ${err.message}`);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="mb-5 relative">
      {showPicker && <ImagePickerModal onClose={() => setShowPicker(false)} onSelect={onChange} selectedValue={value} />}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
      <div className="flex justify-between items-center mb-2">
        <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{label}</label>
        <button type="button" onClick={handleDriveImport} className="text-[10px] uppercase tracking-widest bg-[#1B3B5F] text-white hover:bg-[#E87722] px-2 py-1 rounded transition-colors font-bold">
          GDrive URL
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#E87722] focus:ring-1 focus:ring-[#E87722]/30 outline-none transition-all"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-5 py-3 bg-[#E87722]/20 hover:bg-[#E87722] text-[#E87722] hover:text-white rounded-xl text-[11px] font-bold transition-all whitespace-nowrap uppercase tracking-widest shadow-sm disabled:opacity-50"
        >
          {uploading ? `${uploadProgress}%` : "Upload"}
        </button>
        <button 
          onClick={() => setShowPicker(true)}
          className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[11px] font-bold transition-colors whitespace-nowrap uppercase tracking-widest shadow-sm"
        >
          Gallery
        </button>
      </div>
      {/* Upload progress bar */}
      {uploading && (
        <div className="mt-2 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#E87722] to-orange-400 rounded-full upload-progress-bar" 
            style={{ width: `${uploadProgress}%` }} 
          />
        </div>
      )}
      {/* Image preview */}
      {value && !uploading && (
        <div className="mt-3 relative group inline-block">
          <img 
            src={value} 
            alt="Preview" 
            className="h-16 w-16 rounded-xl object-cover border-2 border-white/10 group-hover:border-[#E87722] transition-all"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}
    </div>
  );
}

function ArrayEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div className="mb-6">
      <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">{label}</label>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={e => { const n = [...items]; n[idx] = e.target.value; onChange(n); }}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#E87722] outline-none transition-all"
          />
          <button onClick={() => onChange(items.filter((_, i) => i !== idx))} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])} className="flex items-center gap-2 text-[#E87722] text-xs font-bold hover:text-orange-400 mt-2 transition-colors">
        <Plus size={14} /> Add Item
      </button>
    </div>
  );
}

const PersonEditor: React.FC<{ person: PersonData; onChange: (p: PersonData) => void; onRemove: () => void }> = ({ person, onChange, onRemove }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl mb-3 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-all">
        <div className="flex items-center gap-3">
          {person.image && <img src={person.image} className="w-8 h-8 rounded-full object-cover" alt="" />}
          <span className="text-white text-sm font-bold">{person.name || 'Unnamed'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
          {open ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          <TextField label="Name" value={person.name} onChange={v => onChange({ ...person, name: v })} />
          <ImageField label="Image Path" value={person.image} onChange={v => onChange({ ...person, image: v })} />
          <TextField label="Bio" value={person.bio} onChange={v => onChange({ ...person, bio: v })} multiline />
          <TextField label="LinkedIn URL" value={person.linkedin} onChange={v => onChange({ ...person, linkedin: v })} />
        </div>
      )}
    </div>
  );
};

const PublicationEditor: React.FC<{ pub: PublicationData; onChange: (p: PublicationData) => void; onRemove: () => void }> = ({ pub, onChange, onRemove }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl mb-3 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-all">
        <span className="text-white text-sm font-bold truncate max-w-[80%] text-left">{pub.title || 'Untitled'}</span>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
          {open ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          <TextField label="ID (URL slug)" value={pub.id} onChange={v => onChange({ ...pub, id: v })} />
          <TextField label="Title" value={pub.title} onChange={v => onChange({ ...pub, title: v })} />
          <TextField label="Type (e.g. Perspectives, Commentary)" value={pub.type} onChange={v => onChange({ ...pub, type: v })} />
          <TextField label="Date" value={pub.date} onChange={v => onChange({ ...pub, date: v })} />
          <TextField label="Author" value={pub.author} onChange={v => onChange({ ...pub, author: v })} />
          <ImageField label="Author Image" value={pub.authorImage || ''} onChange={v => onChange({ ...pub, authorImage: v })} />
          <TextField label="Author Bio" value={pub.authorBio || ''} onChange={v => onChange({ ...pub, authorBio: v })} multiline />
          <TextField label="Description" value={pub.description} onChange={v => onChange({ ...pub, description: v })} multiline />
          <ImageField label="Publication Cover Image" value={pub.image} onChange={v => onChange({ ...pub, image: v })} />
          <TextField label="Image Reference Link (e.g. Source: PIB)" value={pub.imageRef || ''} onChange={v => onChange({ ...pub, imageRef: v })} />
          <TextField label="Image Footnote (e.g. caption or additional credit)" value={pub.imageFootnote || ''} onChange={v => onChange({ ...pub, imageFootnote: v })} />
          <RichTextField label="Full Content (HTML)" value={pub.content} onChange={v => onChange({ ...pub, content: v })} />
        </div>
      )}
    </div>
  );
};

const EventEditor: React.FC<{ event: EventData; onChange: (e: EventData) => void; onRemove: () => void }> = ({ event, onChange, onRemove }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl mb-3 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-all">
        <span className="text-white text-sm font-bold">{event.title || 'Untitled'}</span>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
          {open ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          <TextField label="Title" value={event.title} onChange={v => onChange({ ...event, title: v })} />
          <TextField label="Date" value={event.date} onChange={v => onChange({ ...event, date: v })} />
          <TextField label="Type" value={event.type} onChange={v => onChange({ ...event, type: v })} />
          <TextField label="Location" value={event.location} onChange={v => onChange({ ...event, location: v })} />
          <TextField label="Description" value={event.description} onChange={v => onChange({ ...event, description: v })} multiline />
          <TextField label="Link" value={event.link} onChange={v => onChange({ ...event, link: v })} />
          <label className="flex items-center gap-3 text-white/60 text-sm cursor-pointer mt-2">
            <input type="checkbox" checked={event.featured} onChange={e => onChange({ ...event, featured: e.target.checked })} className="accent-[#E87722]" />
            Featured Event
          </label>
        </div>
      )}
    </div>
  );
};

const GalleryEditor: React.FC<{ img: GalleryImageData; onChange: (g: GalleryImageData) => void; onRemove: () => void }> = ({ img, onChange, onRemove }) => {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <div className="flex gap-3 mb-3 items-start">
      {showPicker && <ImagePickerModal onClose={() => setShowPicker(false)} onSelect={v => onChange({ ...img, url: v })} selectedValue={img.url} />}
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <input type="text" value={img.url} onChange={e => onChange({ ...img, url: e.target.value })} placeholder="Image URL" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-[#E87722] outline-none" />
          <button onClick={() => setShowPicker(true)} className="px-3 bg-white/10 hover:bg-[#E87722] text-white rounded-lg text-[10px] font-bold transition-colors uppercase tracking-widest whitespace-nowrap">Browse</button>
        </div>
        <input type="text" value={img.caption} onChange={e => onChange({ ...img, caption: e.target.value })} placeholder="Caption" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-[#E87722] outline-none" />
        <input type="text" value={img.location} onChange={e => onChange({ ...img, location: e.target.value })} placeholder="Location" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-[#E87722] outline-none" />
      </div>
      <button onClick={onRemove} className="p-2 text-red-400 hover:text-red-300 mt-1"><Trash2 size={14} /></button>
    </div>
  );
};

// ─── Tab definitions ─────────────────────────────────────────────────────────

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Info },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'publications', label: 'Publications', icon: BookOpen },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'writeforus', label: 'Write For Us', icon: PenLine },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'volga', label: 'Volga to Ganga', icon: MessageSquare },
  { id: 'digieurasia', label: 'DigiEurasia', icon: Camera },
  { id: 'ierftalks', label: 'IERF Talks', icon: Mic },
  { id: 'footer', label: 'Footer', icon: LayoutDashboard },
  { id: 'inquiries', label: 'Inquiries', icon: Send },
  { id: 'settings', label: 'Settings', icon: LayoutDashboard },
];

// ─── Main Admin Component ────────────────────────────────────────────────────

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [saved, setSaved] = useState(false);
  const { content, updateContent, resetToDefaults, exportContent, importContent, saveToGitHub } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'error'>('idle');
  const [deployError, setDeployError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [inquiries, setInquiries] = useState<{ type: 'newsletter' | 'contact', data: any, date: string, status?: 'new' | 'replied' | 'archived', notes?: string }[]>(() => {
    const stored = (typeof window !== 'undefined' ? localStorage.getItem.bind(localStorage) : () => null)('ierf_inquiries');
    return stored ? JSON.parse(stored) : [];
  });

  const updateInquiry = (idx: number, updates: Partial<{ status: 'new' | 'replied' | 'archived', notes: string }>) => {
    const updated = [...inquiries];
    updated[idx] = { ...updated[idx], ...updates };
    setInquiries(updated);
    (typeof window !== 'undefined' ? localStorage.setItem.bind(localStorage) : () => {})('ierf_inquiries', JSON.stringify(updated));
  };

  useEffect(() => { setDraft(content); }, [content]);

  // Track unsaved changes
  useEffect(() => {
    const isDirty = JSON.stringify(draft) !== JSON.stringify(content);
    setHasUnsavedChanges(isDirty);
  }, [draft, content]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleSave = async () => {
    updateContent(draft);
    setIsSaving(true);
    setDeployStatus('idle');
    try {
      const result = await saveToGitHub(draft);
      if (result.success) {
        setSaved(true);
        setDeployStatus('deploying');
        setHasUnsavedChanges(false);
        setTimeout(() => setSaved(false), 4000);
        setTimeout(() => setDeployStatus('idle'), 5000);
      } else {
        setDeployError(result.message);
        setDeployStatus('error');
        setTimeout(() => setDeployStatus('idle'), 5000);
      }
    } catch (e: any) {
      setDeployError(e.message);
      setDeployStatus('error');
      setTimeout(() => setDeployStatus('idle'), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (importContent(text)) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    };
    reader.readAsText(file);
  };

  // ─── Login Gate ────────────────────────────────────────────────────────────

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1B3B5F] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-[#E87722]" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Admin Panel</h1>
            <p className="text-white/40 text-sm mt-2">India Eurasia Research Forum</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-[#E87722] focus:ring-2 focus:ring-[#E87722]/20 outline-none transition-all mb-4"
              placeholder="Enter admin password"
            />
            {error && <p className="text-red-400 text-xs font-bold mb-4">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-4 bg-[#E87722] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Helper to update nested draft ─────────────────────────────────────────

  const updateDraft = <K extends keyof SiteContent>(section: K, updates: any) => {
    setDraft(prev => {
      const current = prev[section];
      if (Array.isArray(current)) {
        return { ...prev, [section]: updates };
      }
      return { ...prev, [section]: { ...current as any, ...updates } };
    });
  };

  // ─── Tab Renderers ─────────────────────────────────────────────────────────

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Home Page</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Hero Section</h3>
              <TextField label="Hero Tagline" value={draft.home.heroTagline} onChange={v => updateDraft('home', { heroTagline: v })} />
              <TextField label="Hero Subtitle" value={draft.home.heroSubtitle} onChange={v => updateDraft('home', { heroSubtitle: v })} multiline />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Button 1 Text" value={draft.home.heroButton1} onChange={v => updateDraft('home', { heroButton1: v })} />
                <TextField label="Button 2 Text" value={draft.home.heroButton2} onChange={v => updateDraft('home', { heroButton2: v })} />
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Vision Section</h3>
              <TextField label="Badge Text" value={draft.home.visionBadge} onChange={v => updateDraft('home', { visionBadge: v })} />
              <TextField label="Heading" value={draft.home.visionHeading} onChange={v => updateDraft('home', { visionHeading: v })} />
              <TextField label="Body" value={draft.home.visionBody} onChange={v => updateDraft('home', { visionBody: v })} multiline />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Stat 1 Value" value={draft.home.stat1Value} onChange={v => updateDraft('home', { stat1Value: v })} />
                <TextField label="Stat 1 Label" value={draft.home.stat1Label} onChange={v => updateDraft('home', { stat1Label: v })} />
                <TextField label="Stat 2 Value" value={draft.home.stat2Value} onChange={v => updateDraft('home', { stat2Value: v })} />
                <TextField label="Stat 2 Label" value={draft.home.stat2Label} onChange={v => updateDraft('home', { stat2Label: v })} />
              </div>
              <TextField label="Quote" value={draft.home.visionQuote} onChange={v => updateDraft('home', { visionQuote: v })} />
              <ImageField label="Welcome Image Path" value={draft.home.welcomeImage} onChange={v => updateDraft('home', { welcomeImage: v })} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Strategic Pillars</h3>
              <TextField label="Section Title" value={draft.home.focusAreasTitle} onChange={v => updateDraft('home', { focusAreasTitle: v })} />
              <ArrayEditor label="Focus Areas" items={draft.home.focusAreas} onChange={v => updateDraft('home', { focusAreas: v })} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">The IERF Way</h3>
              <TextField label="Section Title" value={draft.home.ierfWayTitle} onChange={v => updateDraft('home', { ierfWayTitle: v })} />
              <TextField label="Subtitle" value={draft.home.ierfWaySubtitle} onChange={v => updateDraft('home', { ierfWaySubtitle: v })} />
              {draft.home.ierfWayPillars.map((p, i) => (
                <div key={i} className="border border-white/5 rounded-lg p-4 mb-3">
                  <TextField label={`Pillar ${i + 1} Title`} value={p.title} onChange={v => { const n = [...draft.home.ierfWayPillars]; n[i] = { ...n[i], title: v }; updateDraft('home', { ierfWayPillars: n }); }} />
                  <TextField label={`Pillar ${i + 1} Body`} value={p.body} onChange={v => { const n = [...draft.home.ierfWayPillars]; n[i] = { ...n[i], body: v }; updateDraft('home', { ierfWayPillars: n }); }} />
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Volga Teaser</h3>
              <TextField label="Heading" value={draft.home.volgaTeaserHeading} onChange={v => updateDraft('home', { volgaTeaserHeading: v })} />
              <TextField label="Body" value={draft.home.volgaTeaserBody} onChange={v => updateDraft('home', { volgaTeaserBody: v })} multiline />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">DigiEurasia Teaser</h3>
              <TextField label="Heading" value={draft.home.digiTeaserHeading} onChange={v => updateDraft('home', { digiTeaserHeading: v })} />
              <TextField label="Body" value={draft.home.digiTeaserBody} onChange={v => updateDraft('home', { digiTeaserBody: v })} multiline />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Call to Action</h3>
              <TextField label="CTA Heading" value={draft.home.ctaHeading} onChange={v => updateDraft('home', { ctaHeading: v })} />
              <TextField label="CTA Body" value={draft.home.ctaBody} onChange={v => updateDraft('home', { ctaBody: v })} multiline />
            </div>
          </div>
        );
      case 'about':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">About Page</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <TextField label="Subtitle" value={draft.about.subtitle} onChange={v => updateDraft('about', { subtitle: v })} />
              <TextField label="Who We Are" value={draft.about.whoWeAre} onChange={v => updateDraft('about', { whoWeAre: v })} multiline />
              <TextField label="What We Do Intro" value={draft.about.whatWeDoIntro} onChange={v => updateDraft('about', { whatWeDoIntro: v })} multiline />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Four Pillars</h3>
              {draft.about.pillars.map((p, i) => (
                <div key={i} className="border border-white/5 rounded-lg p-4 mb-3">
                  <TextField label={`Pillar ${i + 1} Title`} value={p.title} onChange={v => { const n = [...draft.about.pillars]; n[i] = { ...n[i], title: v }; updateDraft('about', { pillars: n }); }} />
                  <TextField label={`Pillar ${i + 1} Description`} value={p.description} onChange={v => { const n = [...draft.about.pillars]; n[i] = { ...n[i], description: v }; updateDraft('about', { pillars: n }); }} multiline />
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Our Vision</h3>
              {draft.about.visionParagraphs.map((p, i) => (
                <TextField key={i} label={`Paragraph ${i + 1}`} value={p} onChange={v => { const n = [...draft.about.visionParagraphs]; n[i] = v; updateDraft('about', { visionParagraphs: n }); }} multiline />
              ))}
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <ArrayEditor label="Focus Areas" items={draft.about.focusAreas} onChange={v => updateDraft('about', { focusAreas: v })} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Why IERF</h3>
              {draft.about.whyIerfParagraphs.map((p, i) => (
                <TextField key={i} label={`Paragraph ${i + 1}`} value={p} onChange={v => { const n = [...draft.about.whyIerfParagraphs]; n[i] = v; updateDraft('about', { whyIerfParagraphs: n }); }} multiline />
              ))}
            </div>
          </div>
        );
      case 'team':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Team Page</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Research Advisor</h3>
              <PersonEditor person={draft.team.advisor} onChange={p => updateDraft('team', { advisor: p })} onRemove={() => {}} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Leadership / Founders</h3>
              {draft.team.leadership.map((p, i) => (
                <PersonEditor key={i} person={p} onChange={v => { const n = [...draft.team.leadership]; n[i] = v; updateDraft('team', { leadership: n }); }} onRemove={() => updateDraft('team', { leadership: draft.team.leadership.filter((_, j) => j !== i) })} />
              ))}
              <button onClick={() => updateDraft('team', { leadership: [...draft.team.leadership, { name: '', image: '', bio: '', linkedin: '' }] })} className="flex items-center gap-2 text-[#E87722] text-xs font-bold hover:text-orange-400 mt-2 transition-colors">
                <Plus size={14} /> Add Member
              </button>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Scholarly Network</h3>
              {draft.team.scholarlyNetwork.map((p, i) => (
                <PersonEditor key={i} person={p} onChange={v => { const n = [...draft.team.scholarlyNetwork]; n[i] = v; updateDraft('team', { scholarlyNetwork: n }); }} onRemove={() => updateDraft('team', { scholarlyNetwork: draft.team.scholarlyNetwork.filter((_, j) => j !== i) })} />
              ))}
              <button onClick={() => updateDraft('team', { scholarlyNetwork: [...draft.team.scholarlyNetwork, { name: '', image: '', bio: '', linkedin: '' }] })} className="flex items-center gap-2 text-[#E87722] text-xs font-bold hover:text-orange-400 mt-2 transition-colors">
                <Plus size={14} /> Add Researcher
              </button>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Technical / Digital Strategy</h3>
              {draft.team.technicalTeam.map((p, i) => (
                <PersonEditor key={i} person={p} onChange={v => { const n = [...draft.team.technicalTeam]; n[i] = v; updateDraft('team', { technicalTeam: n }); }} onRemove={() => updateDraft('team', { technicalTeam: draft.team.technicalTeam.filter((_, j) => j !== i) })} />
              ))}
              <button onClick={() => updateDraft('team', { technicalTeam: [...draft.team.technicalTeam, { name: '', image: '', bio: '', linkedin: '' }] })} className="flex items-center gap-2 text-[#E87722] text-xs font-bold hover:text-orange-400 mt-2 transition-colors">
                <Plus size={14} /> Add Member
              </button>
            </div>
          </div>
        );
      case 'publications':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Publications</h2>
            {draft.publications.map((pub, i) => (
              <PublicationEditor key={i} pub={pub} onChange={v => { const n = [...draft.publications]; n[i] = v; setDraft(prev => ({ ...prev, publications: n })); }} onRemove={() => setDraft(prev => ({ ...prev, publications: prev.publications.filter((_, j) => j !== i) }))} />
            ))}
            <button onClick={() => setDraft(prev => ({ ...prev, publications: [...prev.publications, { id: '', title: '', type: '', date: '', author: '', description: '', image: '', content: '' }] }))} className="flex items-center gap-2 text-[#E87722] text-xs font-bold hover:text-orange-400 mt-4 transition-colors">
              <Plus size={14} /> Add Publication
            </button>
          </div>
        );
      case 'events':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Events</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <TextField label="Page Subtitle" value={draft.events.subtitle} onChange={v => updateDraft('events', { subtitle: v })} />
            </div>
            {draft.events.items.map((ev, i) => (
              <EventEditor key={i} event={ev} onChange={v => { const n = [...draft.events.items]; n[i] = v; updateDraft('events', { items: n }); }} onRemove={() => updateDraft('events', { items: draft.events.items.filter((_, j) => j !== i) })} />
            ))}
            <button onClick={() => updateDraft('events', { items: [...draft.events.items, { title: '', date: '', type: '', location: '', description: '', link: '#', featured: false }] })} className="flex items-center gap-2 text-[#E87722] text-xs font-bold hover:text-orange-400 mt-4 transition-colors">
              <Plus size={14} /> Add Event
            </button>
          </div>
        );
      case 'writeforus':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Write For Us</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <TextField label="Page Subtitle" value={draft.writeForUs.subtitle} onChange={v => updateDraft('writeForUs', { subtitle: v })} />
              <TextField label="Submission Email" value={draft.writeForUs.submissionEmail} onChange={v => updateDraft('writeForUs', { submissionEmail: v })} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Categories</h3>
              {draft.writeForUs.categories.map((cat, i) => (
                <div key={i} className="border border-white/5 rounded-lg p-4 mb-3">
                  <TextField label="Title" value={cat.title} onChange={v => { const n = [...draft.writeForUs.categories]; n[i] = { ...n[i], title: v }; updateDraft('writeForUs', { categories: n }); }} />
                  <TextField label="Word Limit" value={cat.limit} onChange={v => { const n = [...draft.writeForUs.categories]; n[i] = { ...n[i], limit: v }; updateDraft('writeForUs', { categories: n }); }} />
                  <TextField label="Description" value={cat.desc} onChange={v => { const n = [...draft.writeForUs.categories]; n[i] = { ...n[i], desc: v }; updateDraft('writeForUs', { categories: n }); }} multiline />
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <ArrayEditor label="Submission Guidelines" items={draft.writeForUs.guidelines} onChange={v => updateDraft('writeForUs', { guidelines: v })} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TextField label="CTA Heading" value={draft.writeForUs.ctaHeading} onChange={v => updateDraft('writeForUs', { ctaHeading: v })} />
              <TextField label="CTA Body" value={draft.writeForUs.ctaBody} onChange={v => updateDraft('writeForUs', { ctaBody: v })} multiline />
            </div>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Contact Page</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <TextField label="Subtitle" value={draft.contact.subtitle} onChange={v => updateDraft('contact', { subtitle: v })} />
              <TextField label="Heading" value={draft.contact.heading} onChange={v => updateDraft('contact', { heading: v })} />
              <TextField label="Subheading" value={draft.contact.subheading} onChange={v => updateDraft('contact', { subheading: v })} />
              <TextField label="Body" value={draft.contact.body} onChange={v => updateDraft('contact', { body: v })} multiline />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Contact Info</h3>
              {draft.contact.info.map((ci, i) => (
                <div key={i} className="border border-white/5 rounded-lg p-4 mb-3">
                  <TextField label="Title" value={ci.title} onChange={v => { const n = [...draft.contact.info]; n[i] = { ...n[i], title: v }; updateDraft('contact', { info: n }); }} />
                  <TextField label="Description" value={ci.desc} onChange={v => { const n = [...draft.contact.info]; n[i] = { ...n[i], desc: v }; updateDraft('contact', { info: n }); }} />
                  <TextField label="Value" value={ci.value} onChange={v => { const n = [...draft.contact.info]; n[i] = { ...n[i], value: v }; updateDraft('contact', { info: n }); }} />
                  <TextField label="Link (href)" value={ci.href} onChange={v => { const n = [...draft.contact.info]; n[i] = { ...n[i], href: v }; updateDraft('contact', { info: n }); }} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'volga':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Volga to Ganga</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TextField label="Subtitle" value={draft.volgaToGanga.subtitle} onChange={v => updateDraft('volgaToGanga', { subtitle: v })} />
              <TextField label="Main Quote" value={draft.volgaToGanga.mainQuote} onChange={v => updateDraft('volgaToGanga', { mainQuote: v })} multiline />
              {draft.volgaToGanga.paragraphs.map((p, i) => (
                <TextField key={i} label={`Paragraph ${i + 1}`} value={p} onChange={v => { const n = [...draft.volgaToGanga.paragraphs]; n[i] = v; updateDraft('volgaToGanga', { paragraphs: n }); }} multiline />
              ))}
              <TextField label="Phase Text" value={draft.volgaToGanga.ctaPhase} onChange={v => updateDraft('volgaToGanga', { ctaPhase: v })} />
              <TextField label="CTA Heading" value={draft.volgaToGanga.ctaHeading} onChange={v => updateDraft('volgaToGanga', { ctaHeading: v })} />
              <TextField label="CTA Body" value={draft.volgaToGanga.ctaBody} onChange={v => updateDraft('volgaToGanga', { ctaBody: v })} multiline />
            </div>
          </div>
        );
      case 'digieurasia':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">DigiEurasia</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <TextField label="Subtitle" value={draft.digieurasia.subtitle} onChange={v => updateDraft('digieurasia', { subtitle: v })} />
              <TextField label="Heading" value={draft.digieurasia.heading} onChange={v => updateDraft('digieurasia', { heading: v })} />
              <TextField label="Quote" value={draft.digieurasia.quote} onChange={v => updateDraft('digieurasia', { quote: v })} multiline />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Gallery Images</h3>
              {draft.digieurasia.images.map((img, i) => (
                <GalleryEditor key={i} img={img} onChange={v => { const n = [...draft.digieurasia.images]; n[i] = v; updateDraft('digieurasia', { images: n }); }} onRemove={() => updateDraft('digieurasia', { images: draft.digieurasia.images.filter((_, j) => j !== i) })} />
              ))}
              <button onClick={() => updateDraft('digieurasia', { images: [...draft.digieurasia.images, { url: '', caption: '', location: '' }] })} className="flex items-center gap-2 text-[#E87722] text-xs font-bold hover:text-orange-400 mt-2 transition-colors">
                <Plus size={14} /> Add Image
              </button>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TextField label="CTA Heading" value={draft.digieurasia.ctaHeading} onChange={v => updateDraft('digieurasia', { ctaHeading: v })} />
              <TextField label="CTA Body" value={draft.digieurasia.ctaBody} onChange={v => updateDraft('digieurasia', { ctaBody: v })} multiline />
              <TextField label="Submission Email" value={draft.digieurasia.submissionEmail} onChange={v => updateDraft('digieurasia', { submissionEmail: v })} />
            </div>
          </div>
        );
      case 'ierftalks':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">IERF Talks</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TextField label="Subtitle" value={draft.ierfTalks.subtitle} onChange={v => updateDraft('ierfTalks', { subtitle: v })} />
              <TextField label="Heading" value={draft.ierfTalks.heading} onChange={v => updateDraft('ierfTalks', { heading: v })} />
              <TextField label="Body" value={draft.ierfTalks.body} onChange={v => updateDraft('ierfTalks', { body: v })} multiline />
            </div>
          </div>
        );
      case 'footer':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Footer</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TextField label="Description" value={draft.footer.description} onChange={v => updateDraft('footer', { description: v })} multiline />
              <TextField label="Newsletter Title" value={draft.footer.newsletterTitle} onChange={v => updateDraft('footer', { newsletterTitle: v })} />
              <TextField label="Newsletter Body" value={draft.footer.newsletterBody} onChange={v => updateDraft('footer', { newsletterBody: v })} />
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-xl font-black text-white mb-6">Global Site Settings</h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Branding</h3>
              <TextField label="Site Name" value={draft.settings.siteName} onChange={v => updateDraft('settings', { siteName: v })} />
              <ImageField label="Site Logo Path" value={draft.settings.siteLogo} onChange={v => updateDraft('settings', { siteLogo: v })} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Social Media Links</h3>
              <TextField label="X (Twitter) URL" value={draft.settings.socials.x} onChange={v => updateDraft('settings', { socials: { ...draft.settings.socials, x: v } })} />
              <TextField label="Instagram URL" value={draft.settings.socials.instagram} onChange={v => updateDraft('settings', { socials: { ...draft.settings.socials, instagram: v } })} />
              <TextField label="LinkedIn URL" value={draft.settings.socials.linkedin} onChange={v => updateDraft('settings', { socials: { ...draft.settings.socials, linkedin: v } })} />
              <TextField label="YouTube URL" value={draft.settings.socials.youtube} onChange={v => updateDraft('settings', { socials: { ...draft.settings.socials, youtube: v } })} />
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-4">Footer</h3>
              <TextField label="Copyright Text" value={draft.settings.footerCopyright} onChange={v => updateDraft('settings', { footerCopyright: v })} />
            </div>
          </div>
        );
      case 'inquiries':
        const clearInquiries = () => {
          if (window.confirm('Are you sure you want to clear all inquiries? This action cannot be undone.')) {
            (typeof window !== 'undefined' ? localStorage.removeItem.bind(localStorage) : () => {})('ierf_inquiries');
            setInquiries([]);
          }
        };

        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white">Inquiries & Subscriptions</h2>
              {inquiries.length > 0 && (
                <button 
                  onClick={clearInquiries}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-xs font-bold transition-all"
                >
                  <Trash2 size={14} /> Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Mail size={16} /> Newsletter Subscribers
                </h3>
                <div className="space-y-3">
                  {inquiries.filter(i => i.type === 'newsletter').length === 0 ? (
                    <p className="text-white/20 text-xs italic">No newsletter subscriptions yet.</p>
                  ) : (
                    inquiries.filter(i => i.type === 'newsletter').map((inq, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 group hover:border-white/10 transition-all">
                        <span className="text-white font-bold text-sm tracking-wide">{inq.data.email}</span>
                        <span className="text-white/30 text-[10px] font-black">{new Date(inq.date).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-sm font-black text-[#E87722] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <MessageSquare size={16} /> Contact Messages
                </h3>
                <div className="space-y-4">
                  {inquiries.filter(i => i.type === 'contact').length === 0 ? (
                    <p className="text-white/20 text-xs italic">No contact messages yet.</p>
                  ) : (
                    inquiries.map((inq, idx) => {
                      if (inq.type !== 'contact') return null;
                      const status = inq.status || 'new';
                      return (
                      <div key={idx} className={`bg-white/5 p-6 rounded-2xl border ${status === 'new' ? 'border-[#E87722]/50 shadow-[0_0_15px_rgba(232,119,34,0.1)]' : 'border-white/5'} transition-all`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-[#E87722] font-black text-sm mb-0.5">{inq.data.name}</h4>
                            <p className="text-white/40 text-[10px] font-bold">{inq.data.email}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white/20 text-[10px] font-black uppercase tracking-tighter">{new Date(inq.date).toLocaleString()}</span>
                            <select 
                              value={status} 
                              onChange={(e) => updateInquiry(idx, { status: e.target.value as 'new' | 'replied' | 'archived' })}
                              className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md outline-none cursor-pointer ${
                                status === 'new' ? 'bg-[#E87722]/20 text-[#E87722]' : 
                                status === 'replied' ? 'bg-green-500/20 text-green-400' : 
                                'bg-white/10 text-white/40'
                              }`}
                            >
                              <option value="new" className="bg-[#0A192F] text-white">New</option>
                              <option value="replied" className="bg-[#0A192F] text-white">Replied</option>
                              <option value="archived" className="bg-[#0A192F] text-white">Archived</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-3">
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block mb-1">Subject</span>
                          <p className="text-white text-sm font-bold">{inq.data.subject}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block mb-1">Message</span>
                          <p className="text-white/70 text-sm leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">{inq.data.message}</p>
                        </div>
                        <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                           <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Response Management</span>
                             <a 
                               href={`mailto:${inq.data.email}?subject=Re: ${encodeURIComponent(inq.data.subject)}&body=${encodeURIComponent(`\n\n---\nOn ${new Date(inq.date).toLocaleString()}, ${inq.data.name} wrote:\n${inq.data.message}`)}`}
                               onClick={() => updateInquiry(idx, { status: 'replied' })}
                               className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E87722]/10 hover:bg-[#E87722] text-[#E87722] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                             >
                               <Mail size={12} /> Reply via Email
                             </a>
                           </div>
                           <textarea
                             value={inq.notes || ''}
                             onChange={(e) => updateInquiry(idx, { notes: e.target.value })}
                             placeholder="Add internal notes about this response..."
                             className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white/70 text-xs focus:border-[#E87722] focus:ring-1 focus:ring-[#E87722]/30 outline-none transition-all resize-none h-20"
                           />
                        </div>
                      </div>
                    );})
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // ─── Main Dashboard Layout ─────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0A192F] flex">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2.5 bg-[#0D1F3C] border border-white/10 rounded-xl text-white/60 hover:text-white shadow-lg"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64 bg-[#0D1F3C] border-r border-white/5 flex flex-col fixed h-full z-50 transition-transform duration-300`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E87722] rounded-xl flex items-center justify-center">
              <Lock size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-black text-sm">IERF Admin</div>
              <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Content Manager</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 ${activeTab === tab.id ? 'bg-[#E87722] text-white shadow-lg shadow-[#E87722]/20' : 'text-white/40 hover:text-[#E87722] hover:bg-[#E87722]/5'}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5 space-y-2">
          <button onClick={() => { setAuthenticated(false); setPassword(''); }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white/30 hover:text-white text-xs font-bold rounded-lg hover:bg-white/5 transition-all">
            <Lock size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-[#0A192F]/95 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="pl-10 lg:pl-0">
            <h1 className="text-white font-black text-lg">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-white/30 text-xs">Edit content for this section</p>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 rounded-xl text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
              <Upload size={14} /> Import
            </button>
            <button onClick={exportContent} className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 rounded-xl text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
              <Download size={14} /> Export
            </button>
            <button onClick={() => { if (confirm('Reset all content to defaults? This cannot be undone.')) { resetToDefaults(); } }} className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm">
              <RotateCcw size={14} /> Reset
            </button>
            <button onClick={handleSave} disabled={isSaving} className={`flex items-center gap-2 px-4 lg:px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${saved ? 'bg-green-500 text-white' : isSaving ? 'bg-[#E87722]/70 text-white' : hasUnsavedChanges ? 'bg-[#E87722] text-white hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(232,119,34,0.4)] ring-2 ring-[#E87722]/50 ring-offset-2 ring-offset-[#0A192F]' : 'bg-[#E87722] text-white hover:bg-orange-600'}`}>
              {isSaving ? <RotateCcw size={14} className="animate-spin" /> : <Save size={14} />}
              {isSaving ? 'Saving...' : saved ? 'Saved!' : hasUnsavedChanges ? 'Save*' : 'Save'}
            </button>
          </div>
        </div>

        {/* Unsaved changes warning */}
        {hasUnsavedChanges && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 lg:px-8 py-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-400" />
              <p className="text-amber-400 text-[11px] font-bold">You have unsaved changes</p>
            </div>
          </div>
        )}

        {deployStatus === 'deploying' && (
          <div className="bg-green-500/10 border-b border-green-500/20 px-4 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-green-400 text-[11px] font-black uppercase tracking-widest">
                ✓ Content saved to Firebase — Changes are live immediately
              </p>
            </div>
          </div>
        )}
        {deployStatus === 'error' && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-4 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <p className="text-red-400 text-[11px] font-black uppercase tracking-widest">
                ✕ Save failed: {deployError || 'Try again or use Export as a backup'}
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 lg:p-8 max-w-4xl">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
