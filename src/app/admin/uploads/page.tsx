"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface UploadedImage {
  name: string;
  url: string;
  path: string;
  size: number;
  lastModified: string;
}

export default function UploadsAdminPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/uploads");
      const data = await response.json();

      if (response.ok) {
        setImages(data.images);
      } else {
        showNotification("error", data.error || "Erro ao carregar imagens");
      }
    } catch (error) {
      console.error("Erro:", error);
      showNotification("error", "Erro ao carregar imagens");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Processar múltiplos arquivos
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // ... mesma lógica de validação acima

      // Fazer upload de cada arquivo
      await uploadSingleFile(file);
    }
  };

  const uploadSingleFile = async (file: File) => {
    if (!file) return;

    // Validações (mantenha as mesmas do seu route.ts)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      showNotification("error", "Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF.");
      return;
    }

    if (file.size > maxSize) {
      showNotification("error", "Imagem muito grande. Máximo 5MB.");
      return;
    }

    if (file.name.length > 100) {
      showNotification("error", "Nome do arquivo muito longo.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        showNotification("success", "Imagem enviada com sucesso!");
        await loadImages(); // Recarrega a lista
      } else {
        showNotification("error", result.error || "Erro ao enviar imagem");
      }
    } catch (error) {
      console.error("Erro:", error);
      showNotification("error", "Erro ao enviar imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageName: string) => {
    try {
      const response = await fetch(`/api/admin/uploads?image=${encodeURIComponent(imageName)}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        showNotification("success", "Imagem excluída com sucesso!");
        setDeleteConfirm(null);
        await loadImages(); // Recarrega a lista
      } else {
        showNotification("error", data.error || "Erro ao excluir imagem");
      }
    } catch (error) {
      console.error("Erro:", error);
      showNotification("error", "Erro ao excluir imagem");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showNotification("success", "URL copiada para a área de transferência!");
      })
      .catch(() => {
        showNotification("error", "Erro ao copiar URL");
      });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-brand-dark py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Uploads</h1>
            <p className="text-brand-light-gray">Gerencie as imagens do seu blog</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              Voltar
            </Link>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-900/20 border border-green-800 text-green-300"
                : "bg-red-900/20 border border-red-800 text-red-300"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-brand-gray rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Adicionar Nova Imagem</h2>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-brand-blue transition-colors">
            <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" id="bulk-upload" multiple />
            <label htmlFor="bulk-upload" className={`cursor-pointer block ${uploading ? "opacity-50" : ""}`}>
              <div className="flex flex-col items-center justify-center gap-3">
                {uploading ? (
                  <>
                    <div className="w-10 h-10 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-brand-light-gray">Enviando imagem...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div>
                      <span className="text-brand-light-gray block">Clique para enviar imagens</span>
                      <span className="text-gray-500 text-sm">PNG, JPG, JPEG, WebP, GIF até 5MB</span>
                    </div>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Images Grid */}
        <div className="bg-brand-gray rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Imagens ({images.length})</h2>
            <button
              onClick={loadImages}
              disabled={loading}
              className="bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Carregando..." : "Atualizar"}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="text-brand-light-gray mt-2">Carregando imagens...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-brand-light-gray text-lg">Nenhuma imagem encontrada</p>
              <p className="text-gray-500 mt-2">Faça upload de imagens para começar</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <div
                  key={image.name}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-brand-blue transition-colors"
                >
                  {/* Image Preview */}
                  <div className="relative aspect-video bg-gray-900 cursor-pointer" onClick={() => setSelectedImage(image)}>
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover hover:opacity-80 transition-opacity"
                      onError={(e) => {
                        e.currentTarget.src = "/images/blog/default.jpg";
                      }}
                    />
                  </div>

                  {/* Image Info */}
                  <div className="p-4">
                    <h3 className="text-white font-medium truncate text-sm mb-2" title={image.name}>
                      {image.name}
                    </h3>
                    <div className="text-xs text-brand-light-gray space-y-1">
                      <div>{formatFileSize(image.size)}</div>
                      <div>{formatDate(image.lastModified)}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => copyToClipboard(image.url)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                      >
                        Copiar URL
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(image.name)}
                        className="bg-red-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-red-700 transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl">
              × Fechar
            </button>
            <Image src={selectedImage.url} alt={selectedImage.name} width={800} height={600} className="max-w-full max-h-full object-contain" />
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 p-3 rounded">
              <div className="text-white text-sm">
                <div className="font-medium">{selectedImage.name}</div>
                <div className="text-gray-300 text-xs mt-1">
                  {formatFileSize(selectedImage.size)} • {formatDate(selectedImage.lastModified)}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(selectedImage.url)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Copiar URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-brand-gray rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Confirmar Exclusão</h3>
            <p className="text-brand-light-gray mb-6">
              Tem certeza que deseja excluir a imagem <strong className="text-white">{deleteConfirm}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
