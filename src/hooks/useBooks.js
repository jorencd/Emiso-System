import { useState, useEffect } from 'react'
import { supabase } from "../supabaseClient";

export function useBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('title')

      if (error) throw error

      // Transform data to include full URLs for PDFs
      const transformedData = data.map(book => ({
        ...book,
        pdfEbook: book.pdf_ebook 
          ? supabase.storage.from('ebooks').getPublicUrl(book.pdf_ebook).data.publicUrl
          : 'https://placekitten.com/200/300' // Fallback image
      }))

      setBooks(transformedData)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching books:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return { books, loading, error }
}