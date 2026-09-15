import { useState } from 'react'
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase'
import { useProjects } from '../../hooks/useProjects'
import { PROJECTS_COLLECTION } from '../../hooks/useProjects'
import { projects as seedProjects } from '../../data/projects'

const EMPTY_FORM = {
  name: '',
  description: '',
  tech: '',
  status: '',
  link: '',
  linkLabel: '',
  proves: '',
  accent: '#facc15',
}

function projectToFormValues(project) {
  return {
    name: project.name || '',
    description: project.description || '',
    tech: (project.tech || []).join(', '),
    status: project.status || '',
    link: project.link || '',
    linkLabel: project.linkLabel || '',
    proves: project.proves || '',
    accent: project.accent || '#facc15',
  }
}

function formValuesToProject(values) {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
    tech: values.tech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    status: values.status.trim() || null,
    link: values.link.trim() || null,
    linkLabel: values.linkLabel.trim() || 'View',
    proves: values.proves.trim(),
    accent: values.accent.trim() || '#facc15',
  }
}

function ProjectForm({ initialValues, onCancel, onSave, saving }) {
  const [values, setValues] = useState(initialValues)

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form
      className="admin-entity-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSave(formValuesToProject(values))
      }}
    >
      <label>
        Name
        <input value={values.name} onChange={(e) => update('name', e.target.value)} required />
      </label>
      <label>
        Description
        <textarea
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
          required
        />
      </label>
      <label>
        Tech stack (comma-separated)
        <input value={values.tech} onChange={(e) => update('tech', e.target.value)} placeholder="React, Firebase" />
      </label>
      <label>
        Status line
        <input
          value={values.status}
          onChange={(e) => update('status', e.target.value)}
          placeholder="Live on Play Store · used by 2 hostels"
        />
      </label>
      <label>
        Link URL
        <input value={values.link} onChange={(e) => update('link', e.target.value)} placeholder="https://..." />
      </label>
      <label>
        Link label
        <input
          value={values.linkLabel}
          onChange={(e) => update('linkLabel', e.target.value)}
          placeholder="View on Play Store"
        />
      </label>
      <label>
        &quot;What this proves&quot; line
        <input value={values.proves} onChange={(e) => update('proves', e.target.value)} required />
      </label>
      <label>
        Accent color
        <input type="color" value={values.accent} onChange={(e) => update('accent', e.target.value)} />
      </label>
      <div className="admin-form-actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function ProjectsAdmin() {
  const { projects, loading } = useProjects()
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [actionError, setActionError] = useState(null)

  async function handleAdd(data) {
    setSaving(true)
    setActionError(null)
    try {
      const maxOrder = projects.reduce((max, p) => Math.max(max, p.order ?? 0), -1)
      await addDoc(collection(db, PROJECTS_COLLECTION), { ...data, order: maxOrder + 1 })
      setAdding(false)
    } catch (err) {
      setActionError(`Couldn't save: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleEdit(id, data) {
    setSaving(true)
    setActionError(null)
    try {
      await updateDoc(doc(db, PROJECTS_COLLECTION, id), data)
      setEditingId(null)
    } catch (err) {
      setActionError(`Couldn't save: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    setActionError(null)
    try {
      await deleteDoc(doc(db, PROJECTS_COLLECTION, id))
    } catch (err) {
      setActionError(`Couldn't delete: ${err.message}`)
    }
  }

  async function handleMove(index, direction) {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= projects.length) return
    setActionError(null)
    try {
      const a = projects[index]
      const b = projects[targetIndex]
      const batch = writeBatch(db)
      batch.update(doc(db, PROJECTS_COLLECTION, a.id), { order: b.order ?? targetIndex })
      batch.update(doc(db, PROJECTS_COLLECTION, b.id), { order: a.order ?? index })
      await batch.commit()
    } catch (err) {
      setActionError(`Couldn't reorder: ${err.message}`)
    }
  }

  async function handleSeed() {
    setSeeding(true)
    setActionError(null)
    try {
      const batch = writeBatch(db)
      seedProjects.forEach((project, index) => {
        const { id, ...rest } = project
        batch.set(doc(db, PROJECTS_COLLECTION, id), { ...rest, order: index })
      })
      await batch.commit()
    } catch (err) {
      setActionError(`Couldn't seed: ${err.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <section className="admin-section" aria-label="Manage projects">
      <div className="admin-section-header">
        <h2>Projects</h2>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)}>
            + Add project
          </button>
        )}
      </div>

      {actionError && <p className="admin-form-error">{actionError}</p>}

      {loading && <p>Loading…</p>}

      {!loading && projects.length === 0 && !adding && (
        <div className="admin-empty-state">
          <p>No projects in Firestore yet.</p>
          <button type="button" onClick={handleSeed} disabled={seeding}>
            {seeding ? 'Seeding…' : 'Seed from static data (one-time)'}
          </button>
        </div>
      )}

      {adding && (
        <ProjectForm
          initialValues={EMPTY_FORM}
          onCancel={() => setAdding(false)}
          onSave={handleAdd}
          saving={saving}
        />
      )}

      <ul className="admin-entity-list">
        {projects.map((project, index) =>
          editingId === project.id ? (
            <li key={project.id}>
              <ProjectForm
                initialValues={projectToFormValues(project)}
                onCancel={() => setEditingId(null)}
                onSave={(data) => handleEdit(project.id, data)}
                saving={saving}
              />
            </li>
          ) : (
            <li key={project.id} className="admin-entity-row">
              <span className="admin-entity-swatch" style={{ background: project.accent }} />
              <div className="admin-entity-info">
                <strong>{project.name}</strong>
                <span>{project.description}</span>
              </div>
              <div className="admin-entity-actions">
                <button type="button" onClick={() => handleMove(index, -1)} disabled={index === 0} aria-label="Move up">
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === projects.length - 1}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button type="button" onClick={() => setEditingId(project.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(project.id)}>
                  Delete
                </button>
              </div>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}

export default ProjectsAdmin
