import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/blogs/images');

export async function GET(request: NextRequest) {
    try {
        // Verifica se o diretório existe
        try {
            await fs.access(UPLOAD_DIR);
        } catch {
            // Se não existir, cria o diretório
            await fs.mkdir(UPLOAD_DIR, { recursive: true });
            return NextResponse.json({ images: [] });
        }

        const files = await fs.readdir(UPLOAD_DIR);

        const images = await Promise.all(
            files
                .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
                .map(async (file) => {
                    const filePath = path.join(UPLOAD_DIR, file);
                    const stats = await fs.stat(filePath);

                    return {
                        name: file,
                        url: `/uploads/blogs/images/${file}`,
                        path: filePath,
                        size: stats.size,
                        lastModified: stats.mtime.toISOString()
                    };
                })
        );

        // Ordena por data de modificação (mais recentes primeiro)
        images.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Erro ao listar imagens:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
        }

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: 'Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF.'
            }, { status: 400 });
        }

        // Validar tamanho (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({
                error: 'Imagem muito grande. Máximo 5MB.'
            }, { status: 400 });
        }

        // Validar nome do arquivo
        if (file.name.length > 100) {
            return NextResponse.json({
                error: 'Nome do arquivo muito longo.'
            }, { status: 400 });
        }

        // Criar diretório se não existir
        await fs.mkdir(UPLOAD_DIR, { recursive: true });

        // Gerar nome único para o arquivo
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        // Converter File para Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validar se é uma imagem válida (verificação básica)
        if (buffer.length < 10) {
            return NextResponse.json({ error: 'Arquivo de imagem inválido' }, { status: 400 });
        }

        // Salvar arquivo
        await fs.writeFile(filePath, buffer);

        console.log(`✅ Imagem salva: ${fileName} (${file.size} bytes)`);

        // Retornar URL da imagem
        const imageUrl = `/uploads/blogs/images/${fileName}`;

        return NextResponse.json({
            success: true,
            imageUrl,
            fileName,
            fileSize: file.size
        });

    } catch (error) {
        console.error('❌ Erro no upload:', error);
        return NextResponse.json({
            error: 'Erro interno no servidor durante o upload'
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const imageName = searchParams.get('image');

        if (!imageName) {
            return NextResponse.json(
                { error: 'Nome da imagem não fornecido' },
                { status: 400 }
            );
        }

        // Previne path traversal - mais restritivo para UUID
        if (imageName.includes('..') || imageName.includes('/') || imageName.includes('\\') || !/^[a-f0-9-]+\.[a-z]+$/i.test(imageName)) {
            return NextResponse.json(
                { error: 'Nome de arquivo inválido' },
                { status: 400 }
            );
        }

        const imagePath = path.join(UPLOAD_DIR, imageName);

        // Verifica se o arquivo existe
        try {
            await fs.access(imagePath);
        } catch {
            return NextResponse.json(
                { error: 'Imagem não encontrada' },
                { status: 404 }
            );
        }

        // Deleta o arquivo
        await fs.unlink(imagePath);

        console.log(`🗑️ Imagem excluída: ${imageName}`);

        return NextResponse.json({
            success: true,
            message: 'Imagem excluída com sucesso'
        });
    } catch (error) {
        console.error('Erro ao excluir imagem:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}