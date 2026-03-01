import { useState, useEffect } from 'react'
import { supabase } from "../supabaseClient";

export function useJournals() {
  const [journals, setJournals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJournals()
  }, [])

  async function fetchJournals() {
    try {
      setLoading(true)
         
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('title')

      if (error) throw error

      const transformedData = data.map(journal => ({
        ...journal,
        pdfUrl: journal.pdf_journal
          ? supabase.storage.from('journals')
              .getPublicUrl(journal.pdf_journal).data.publicUrl
          : null,

        bgImageUrl: journal.bg_image
          ? supabase.storage.from('journals')
              .getPublicUrl(journal.bg_image).data.publicUrl
          : 'https://placehold.co/600x400'
      }))

      setJournals(transformedData)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching journals:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return { journals, loading, error }
}