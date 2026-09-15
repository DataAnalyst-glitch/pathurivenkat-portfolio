import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export const SKILLS_COLLECTION = 'skills'

export function useSkills() {
  const [skillGroups, setSkillGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, SKILLS_COLLECTION), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setSkillGroups(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
        setLoading(false)
      },
      () => {
        setSkillGroups([])
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { skillGroups, loading }
}
