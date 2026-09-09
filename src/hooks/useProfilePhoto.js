import { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { app } from '../firebase'

// Written by the admin dashboard's profile photo upload (PRD 5C) to
// settings/site.profilePhotoUrl once that field is wired to Firebase Storage.
const SETTINGS_COLLECTION = 'settings'
const SETTINGS_DOC = 'site'

export function useProfilePhoto() {
  const [photoUrl, setPhotoUrl] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadPhoto() {
      try {
        const db = getFirestore(app)
        const snapshot = await getDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC))
        const url = snapshot.exists() ? snapshot.data().profilePhotoUrl : null
        if (!cancelled && url) setPhotoUrl(url)
      } catch {
        // Firebase not configured yet, or no settings doc — fall back to placeholder.
      }
    }

    loadPhoto()
    return () => {
      cancelled = true
    }
  }, [])

  return photoUrl
}
