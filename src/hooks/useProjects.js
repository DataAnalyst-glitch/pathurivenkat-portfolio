import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export const PROJECTS_COLLECTION = 'projects'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setProjects(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
        setLoading(false)
      },
      () => {
        // Firestore unreachable/misconfigured — fail quiet, render nothing rather than crash.
        setProjects([])
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { projects, loading }
}
