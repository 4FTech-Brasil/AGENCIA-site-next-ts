"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface BlogPostWithContent {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  image: string;
  content: string;
}

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
    readTime: "5 min",
    image: "/images/blog/default.jpg",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const validateImage = (file: File): string | null => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return "Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF.";
    }

    if (file.size > maxSize) {
      return "Imagem muito grande. Máximo 5MB.";
    }

    if (file.name.length > 100) {
      return "Nome do arquivo muito longo.";
    }

    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImage(file);
    if (validationError) {
      alert(validationError);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Preview da imagem
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setSelectedFileName(file.name);

    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();

      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          image: result.imageUrl,
        }));

        // Limpar o preview temporário após o upload
        URL.revokeObjectURL(objectUrl);
        setPreviewImage(null);

        alert("Imagem enviada com sucesso!");
      } else {
        alert(result.error || "Erro ao enviar imagem");
        // Resetar preview se der erro
        URL.revokeObjectURL(objectUrl);
        setPreviewImage(null);
        setSelectedFileName(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar imagem");
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(null);
      setSelectedFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "/images/blog/default.jpg",
    }));

    // Limpar URL do objeto se existir
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setPreviewImage(null);
    setSelectedFileName(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Cleanup do objeto URL quando o componente desmontar
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${slug}`);
      const data = await response.json();

      if (data.post) {
        setFormData({
          title: data.post.title,
          description: data.post.description,
          content: data.post.content,
          tags: data.post.tags.join(", "),
          readTime: data.post.readTime,
          image: data.post.image,
        });
      }
    } catch (error) {
      console.error("Erro ao carregar post:", error);
      alert("Erro ao carregar post");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      });

      if (response.ok) {
        alert("Post atualizado com sucesso!");
        router.push("/admin");
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao atualizar post");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-brand-dark py-20">
        <div className="container mx-auto px-6">
          <div className="text-white text-center">Carregando post...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Editar Post MDX</h1>

        <form onSubmit={handleSubmit} className="bg-brand-gray rounded-2xl p-6 space-y-6">
          <div>
            <label className="block text-white mb-2">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Conteúdo MDX
              <span className="text-brand-light-gray text-sm ml-2">(Suporta markdown e componentes React)</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={20}
              placeholder="# Título&#10;&#10;Escreva seu conteúdo em **MDX** aqui...&#10;&#10;```javascript&#10;console.log('Código destacado');&#10;```"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Tags (separadas por vírgula)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="marketing, digital, estratégia"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Tempo de Leitura</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Imagem do Post</label>

            {/* Preview da imagem */}
            {(previewImage || formData.image !== "/images/blog/default.jpg") && (
              <div className="mb-4">
                <div className="relative inline-block">
                  <Image
                    src={previewImage || formData.image}
                    alt="Preview"
                    width={64}
                    height={48}
                    className="w-64 h-48 object-cover rounded-lg border-2 border-brand-blue/50"
                    onError={(e) => {
                      // Fallback se a imagem não carregar
                      e.currentTarget.src = "/images/blog/default.jpg";
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
                <p className="text-brand-light-gray text-sm mt-2">{selectedFileName || formData.image.split("/").pop()}</p>
              </div>
            )}

            {/* Input de upload */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-brand-blue transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className={`cursor-pointer block ${uploading ? "opacity-50" : ""}`}>
                <div className="flex flex-col items-center justify-center gap-2">
                  {uploading ? (
                    <>
                      <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-brand-light-gray">Enviando imagem...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-brand-light-gray">Clique para enviar uma imagem</span>
                      <span className="text-gray-500 text-sm">PNG, JPG, JPEG até 5MB</span>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Status do upload */}
            {uploading && (
              <div className="mt-2 bg-blue-900/20 border border-blue-800 rounded p-3">
                <p className="text-blue-300 text-sm">📤 Enviando imagem... Aguarde.</p>
              </div>
            )}

            {/* URL manual (fallback) */}
            <div className="mt-4">
              <label className="block text-brand-light-gray text-sm mb-2">Ou informe a URL da imagem:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/blog/nome-da-imagem.jpg"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-brand-blue focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Atualizando..." : "Atualizar Post"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>

            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Visualizar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
