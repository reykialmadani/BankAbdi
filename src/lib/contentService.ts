// lib/contentService.ts
import API_BASE_URL from './api-config';

// Definisikan interface untuk data Anda
export interface Content {
  id: string;
  title: string;
  // tambahkan properti lain sesuai model data Anda
}

// Fungsi untuk mengambil semua konten
export const getAllContents = async (): Promise<Content[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contents`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch contents');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contents:', error);
    throw error;
  }
};

// Fungsi untuk mengambil konten berdasarkan ID
export const getContentById = async (id: string): Promise<Content> => {
  // implementasi
};

// Fungsi untuk membuat konten baru
export const createContent = async (data: Omit<Content, 'id'>): Promise<Content> => {
  // implementasi
};

// Fungsi untuk mengupdate konten
export const updateContent = async (id: string, data: Partial<Content>): Promise<Content> => {
  // implementasi
};

// Fungsi untuk menghapus konten
export const deleteContent = async (id: string): Promise<void> => {
  // implementasi
};