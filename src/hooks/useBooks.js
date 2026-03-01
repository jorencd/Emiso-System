import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("title");

      if (error) throw error;

      const transformedData = data.map((book) => ({
        ...book,
        pdfUrl: book.pdf_ebook
          ? supabase.storage
              .from("ebooks")
              .getPublicUrl(book.pdf_ebook).data.publicUrl
          : null,

        bgImageUrl: book.bg_image
          ? supabase.storage
              .from("ebooks")
              .getPublicUrl(book.bg_image).data.publicUrl
          : "https://placehold.co/600x400",
      }));

      setBooks(transformedData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching books:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { books, loading, error };
}