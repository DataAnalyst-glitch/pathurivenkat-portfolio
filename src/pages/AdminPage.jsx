import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import LoginForm from '../components/admin/LoginForm'
import ProjectsAdmin from '../components/admin/ProjectsAdmin'
import SkillsAdmin from '../components/admin/SkillsAdmin'
import './AdminPage.css'

function AdminPage() {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthChecked(true)
    })
    return unsubscribe
  }, [])

  if (!authChecked) {
    return (
      <main className="admin-page admin-page--centered">
        <p>Loading…</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="admin-page admin-page--centered">
        <LoginForm />
      </main>
    )
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-user">
          <span>{user.email}</span>
          <button type="button" onClick={() => signOut(auth)}>
            Sign out
          </button>
        </div>
      </header>

      <ProjectsAdmin />
      <SkillsAdmin />

      <section className="admin-section" aria-label="Profile photo">
        <h2>Profile Photo</h2>
        <p>
          Placeholder for the Hero profile photo upload (PRD 5C). Not wired yet —
          needs Firebase Storage to be provisioned first, then this will upload to
          Storage and write the resulting URL to the settings/site Firestore
          document's profilePhotoUrl field.
        </p>
        <input type="file" accept="image/*" disabled />
      </section>

      <section className="admin-section" aria-label="Resume">
        <h2>Resume / CV</h2>
        <p>
          Placeholder for the resume PDF upload (PRD 5C). Not wired yet — needs
          Firebase Storage to be provisioned first, then this will upload to
          Storage and write the resulting URL to the settings/site Firestore
          document's resumeUrl field, which the public Contact section's
          &quot;Download Resume&quot; button will read.
        </p>
        <input type="file" accept="application/pdf" disabled />
      </section>
    </main>
  )
}

export default AdminPage
