import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Tipe data untuk konten
export interface Content {
  id: number;
  sub_menu_id: number;
  title: string;
  description: string | null;
  required_documents: string | null;
  thumbnail: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  updated_by: number | null;
  report_type: string | null;
  report_year: string | null;
  sub_menu?: {
    sub_menu_name: string;
    id: number;
    menu_id: number;
    name: string;
    url: string;
    menu?: {
      id: number;
      name: string;
      url: string;
    };
  };
}

export const getAllContents = async (): Promise<Content[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/content`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all contents:", error);
    throw error;
  }
};

// Service untuk mengambil konten berdasarkan ID
export const getContentById = async (id: number): Promise<Content> => {
  try {
    const response = await axios.get(`${API_URL}/api/content/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching content with ID ${id}:`, error);
    throw error;
  }
};

// Service untuk mengambil konten berdasarkan URL sub-menu
export const getContentBySubMenuUrl = async (
  url: string
): Promise<Content[]> => {
  try {
    // Mengambil semua konten dahulu
    const allContents = await getAllContents();

    // Filter konten berdasarkan URL sub-menu
    return allContents.filter(
      (content) =>
        content.sub_menu && content.sub_menu.url === url && content.status
    );
  } catch (error) {
    console.error(`Error fetching content for sub-menu URL ${url}:`, error);
    throw error;
  }
};

// Service untuk membuat konten baru
export const createContent = async (
  contentData: Omit<Content, "id" | "created_at" | "updated_at">
): Promise<Content> => {
  try {
    const response = await axios.post(`${API_URL}/api/content`, contentData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating content:", error);
    throw error;
  }
};

// Service untuk mengupdate konten
export const updateContent = async (
  id: number,
  contentData: Partial<Content>
): Promise<Content> => {
  try {
    const response = await axios.put(
      `${API_URL}/api/content/${id}`,
      contentData
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error updating content with ID ${id}:`, error);
    throw error;
  }
};

// Service untuk menghapus konten
export const deleteContent = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/content/${id}`);
  } catch (error) {
    console.error(`Error deleting content with ID ${id}:`, error);
    throw error;
  }
};
