function AdminPage() {
  return (
    <main>
      <h1>Admin</h1>
      <p>Admin area placeholder — not built yet.</p>

      <section aria-label="Profile photo">
        <h2>Profile Photo</h2>
        <p>
          Placeholder for the Hero profile photo upload (PRD 5C). Not wired yet —
          needs to upload to Firebase Storage and write the resulting URL to the
          settings/site Firestore document's profilePhotoUrl field once the admin
          CRUD batch is built.
        </p>
        <input type="file" accept="image/*" disabled />
      </section>
    </main>
  )
}

export default AdminPage
