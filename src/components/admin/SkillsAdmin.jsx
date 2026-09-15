import { useState } from 'react'
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase'
import { useSkills, SKILLS_COLLECTION } from '../../hooks/useSkills'
import { skillGroups as seedSkillGroups } from '../../data/skills'

const EMPTY_FORM = { label: '', items: '' }

function groupToFormValues(group) {
  return {
    label: group.label || '',
    items: (group.items || []).join(', '),
  }
}

function formValuesToGroup(values) {
  return {
    label: values.label.trim(),
    items: values.items
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  }
}

function SkillGroupForm({ initialValues, onCancel, onSave, saving }) {
  const [values, setValues] = useState(initialValues)

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form
      className="admin-entity-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSave(formValuesToGroup(values))
      }}
    >
      <label>
        Group label
        <input value={values.label} onChange={(e) => update('label', e.target.value)} placeholder="Backend" required />
      </label>
      <label>
        Skills (comma-separated)
        <input
          value={values.items}
          onChange={(e) => update('items', e.target.value)}
          placeholder="Python, FastAPI, Supabase"
          required
        />
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

function SkillsAdmin() {
  const { skillGroups, loading } = useSkills()
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [actionError, setActionError] = useState(null)

  async function handleAdd(data) {
    setSaving(true)
    setActionError(null)
    try {
      const maxOrder = skillGroups.reduce((max, g) => Math.max(max, g.order ?? 0), -1)
      await addDoc(collection(db, SKILLS_COLLECTION), { ...data, order: maxOrder + 1 })
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
      await updateDoc(doc(db, SKILLS_COLLECTION, id), data)
      setEditingId(null)
    } catch (err) {
      setActionError(`Couldn't save: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this skill group? This cannot be undone.')) return
    setActionError(null)
    try {
      await deleteDoc(doc(db, SKILLS_COLLECTION, id))
    } catch (err) {
      setActionError(`Couldn't delete: ${err.message}`)
    }
  }

  async function handleMove(index, direction) {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= skillGroups.length) return
    setActionError(null)
    try {
      const a = skillGroups[index]
      const b = skillGroups[targetIndex]
      const batch = writeBatch(db)
      batch.update(doc(db, SKILLS_COLLECTION, a.id), { order: b.order ?? targetIndex })
      batch.update(doc(db, SKILLS_COLLECTION, b.id), { order: a.order ?? index })
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
      seedSkillGroups.forEach((group, index) => {
        const { id, ...rest } = group
        batch.set(doc(db, SKILLS_COLLECTION, id), { ...rest, order: index })
      })
      await batch.commit()
    } catch (err) {
      setActionError(`Couldn't seed: ${err.message}`)
    } finally {
      setSeeding(false)
    }
  }

  // TEMPORARY — one-click add for the two new Data/AI skill groups requested
  // out-of-band. Remove this button + handler once clicked and confirmed.
  async function handleAddDataAiSkills() {
    setSeeding(true)
    setActionError(null)
    try {
      const maxOrder = skillGroups.reduce((max, g) => Math.max(max, g.order ?? 0), -1)
      const newGroups = [
        { label: 'Data Analytics', items: ['Power BI', 'SQL', 'Python (Pandas)'] },
        { label: 'AI/ML', items: ['RAG', 'Agentic AI', 'Vector Databases'] },
      ]
      const batch = writeBatch(db)
      newGroups.forEach((group, index) => {
        batch.set(doc(collection(db, SKILLS_COLLECTION)), { ...group, order: maxOrder + 1 + index })
      })
      await batch.commit()
    } catch (err) {
      setActionError(`Couldn't add: ${err.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <section className="admin-section" aria-label="Manage skills">
      <div className="admin-section-header">
        <h2>Skills</h2>
        {!adding && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setAdding(true)}>
              + Add skill group
            </button>
            {/* TEMPORARY — remove this button once clicked and confirmed working */}
            <button type="button" onClick={handleAddDataAiSkills} disabled={seeding}>
              {seeding ? 'Adding…' : 'Add Data/AI skills'}
            </button>
          </div>
        )}
      </div>

      {actionError && <p className="admin-form-error">{actionError}</p>}

      {loading && <p>Loading…</p>}

      {!loading && skillGroups.length === 0 && !adding && (
        <div className="admin-empty-state">
          <p>No skill groups in Firestore yet.</p>
          <button type="button" onClick={handleSeed} disabled={seeding}>
            {seeding ? 'Seeding…' : 'Seed from static data (one-time)'}
          </button>
        </div>
      )}

      {adding && (
        <SkillGroupForm
          initialValues={EMPTY_FORM}
          onCancel={() => setAdding(false)}
          onSave={handleAdd}
          saving={saving}
        />
      )}

      <ul className="admin-entity-list">
        {skillGroups.map((group, index) =>
          editingId === group.id ? (
            <li key={group.id}>
              <SkillGroupForm
                initialValues={groupToFormValues(group)}
                onCancel={() => setEditingId(null)}
                onSave={(data) => handleEdit(group.id, data)}
                saving={saving}
              />
            </li>
          ) : (
            <li key={group.id} className="admin-entity-row">
              <div className="admin-entity-info">
                <strong>{group.label}</strong>
                <span>{(group.items || []).join(', ')}</span>
              </div>
              <div className="admin-entity-actions">
                <button type="button" onClick={() => handleMove(index, -1)} disabled={index === 0} aria-label="Move up">
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === skillGroups.length - 1}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button type="button" onClick={() => setEditingId(group.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(group.id)}>
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

export default SkillsAdmin
