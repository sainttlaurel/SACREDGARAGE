import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Trash2, Plus, Save, X, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react'
import { vehicleService, Vehicle } from '../../lib/supabase'

const AdminInventory = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Vehicle>>({})
  const [loading, setLoading] = useState(true)
  const [showPhotoManager, setShowPhotoManager] = useState(false)
  const [newPhotoUrl, setNewPhotoUrl] = useState('')

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const data = await vehicleService.getAll()
      setVehicles(data)
    } catch (error) {
      console.error('Error loading vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id)
    setEditForm(vehicle)
    setShowPhotoManager(false)
  }

  const saveEdit = async () => {
    if (editingId && editForm.id) {
      try {
        await vehicleService.update(editingId, editForm)
        const updated = vehicles.map(v =>
          v.id === editingId ? { ...v, ...editForm } : v
        )
        setVehicles(updated)
        setEditingId(null)
        setEditForm({})
        setShowPhotoManager(false)
      } catch (error) {
        console.error('Error saving vehicle:', error)
      }
    }
  }

  const deleteVehicle = async (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleService.delete(id)
        const updated = vehicles.filter(v => v.id !== id)
        setVehicles(updated)
      } catch (error) {
        console.error('Error deleting vehicle:', error)
      }
    }
  }

  const toggleAvailability = async (id: string) => {
    try {
      const vehicle = vehicles.find(v => v.id === id)
      if (vehicle) {
        await vehicleService.update(id, { available: !vehicle.available })
        const updated = vehicles.map(v =>
          v.id === id ? { ...v, available: !v.available } : v
        )
        setVehicles(updated)
      }
    } catch (error) {
      console.error('Error toggling availability:', error)
    }
  }

  // Photo management functions
  const addPhoto = () => {
    if (newPhotoUrl.trim() && editForm.images) {
      const updatedImages = [...editForm.images, newPhotoUrl.trim()]
      setEditForm({ ...editForm, images: updatedImages })
      setNewPhotoUrl('')
    }
  }

  const removePhoto = (index: number) => {
    if (editForm.images) {
      const updatedImages = editForm.images.filter((_, i) => i !== index)
      setEditForm({ ...editForm, images: updatedImages })
    }
  }

  const movePhotoUp = (index: number) => {
    if (editForm.images && index > 0) {
      const updatedImages = [...editForm.images]
      ;[updatedImages[index - 1], updatedImages[index]] = [updatedImages[index], updatedImages[index - 1]]
      setEditForm({ ...editForm, images: updatedImages })
    }
  }

  const movePhotoDown = (index: number) => {
    if (editForm.images && index < editForm.images.length - 1) {
      const updatedImages = [...editForm.images]
      ;[updatedImages[index], updatedImages[index + 1]] = [updatedImages[index + 1], updatedImages[index]]
      setEditForm({ ...editForm, images: updatedImages })
    }
  }

  const setMainPhoto = (index: number) => {
    if (editForm.images) {
      const mainPhoto = editForm.images[index]
      const updatedImages = [mainPhoto, ...editForm.images.filter((_, i) => i !== index)]
      setEditForm({ ...editForm, images: updatedImages, image: mainPhoto })
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading inventory...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="heading-section">Inventory Management</h2>
        <button className="btn-secondary flex items-center gap-2">
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-luxury overflow-hidden"
          >
            {editingId === vehicle.id ? (
              // Edit Mode
              <div className="p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <h3 className="font-serif text-xl mb-4">Edit Vehicle</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-small block mb-2">Brand</label>
                    <input
                      type="text"
                      value={editForm.brand || ''}
                      onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="label-small block mb-2">Model</label>
                    <input
                      type="text"
                      value={editForm.model || ''}
                      onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-small block mb-2">Year</label>
                    <input
                      type="number"
                      value={editForm.year || ''}
                      onChange={(e) => setEditForm({ ...editForm, year: parseInt(e.target.value) })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="label-small block mb-2">Price</label>
                    <input
                      type="text"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-small block mb-2">Description</label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm resize-none"
                    rows={3}
                  />
                </div>

                {/* Photo Manager Section */}
                <div className="border-t border-border pt-4">
                  <button
                    onClick={() => setShowPhotoManager(!showPhotoManager)}
                    className="flex items-center gap-2 text-sm font-medium mb-4 hover:opacity-80 transition-opacity"
                  >
                    <ImageIcon size={18} />
                    {showPhotoManager ? 'Hide' : 'Manage'} Photos ({editForm.images?.length || 0})
                  </button>

                  {showPhotoManager && (
                    <div className="space-y-4 bg-background/50 p-4 rounded-sm">
                      {/* Add Photo */}
                      <div className="space-y-2">
                        <label className="label-small block">Add Photo URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newPhotoUrl}
                            onChange={(e) => setNewPhotoUrl(e.target.value)}
                            placeholder="https://example.com/photo.jpg"
                            className="flex-1 bg-background border border-border px-3 py-2 text-sm"
                            onKeyPress={(e) => e.key === 'Enter' && addPhoto()}
                          />
                          <button
                            onClick={addPhoto}
                            className="px-3 py-2 bg-green-500/20 text-green-400 rounded-sm hover:bg-green-500/30 text-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Photo List */}
                      <div className="space-y-2">
                        <label className="label-small block">Photos ({editForm.images?.length || 0})</label>
                        {editForm.images && editForm.images.length > 0 ? (
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {editForm.images.map((photo, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center gap-2 p-2 rounded-sm border ${
                                  idx === 0
                                    ? 'border-motorsport-red/50 bg-motorsport-red/10'
                                    : 'border-border bg-background'
                                }`}
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs truncate">{photo}</p>
                                  {idx === 0 && <p className="text-xs text-motorsport-red">Main Photo</p>}
                                </div>

                                <div className="flex gap-1">
                                  {idx > 0 && (
                                    <button
                                      onClick={() => movePhotoUp(idx)}
                                      className="p-1 hover:bg-foreground-faint/20 rounded"
                                      title="Move up"
                                    >
                                      <ChevronUp size={14} />
                                    </button>
                                  )}
                                  {idx < (editForm.images?.length || 0) - 1 && (
                                    <button
                                      onClick={() => movePhotoDown(idx)}
                                      className="p-1 hover:bg-foreground-faint/20 rounded"
                                      title="Move down"
                                    >
                                      <ChevronDown size={14} />
                                    </button>
                                  )}
                                  {idx !== 0 && (
                                    <button
                                      onClick={() => setMainPhoto(idx)}
                                      className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                                      title="Set as main"
                                    >
                                      Main
                                    </button>
                                  )}
                                  <button
                                    onClick={() => removePhoto(idx)}
                                    className="p-1 hover:bg-motorsport-red/20 text-motorsport-red rounded"
                                    title="Remove"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-foreground-muted">No photos added yet</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <button
                    onClick={saveEdit}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-sm hover:bg-green-500/30"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-foreground-faint/20 text-foreground-muted rounded-sm hover:bg-foreground-faint/30"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-sm text-xs font-medium ${
                      vehicle.available
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-motorsport-red/20 text-motorsport-red'
                    }`}>
                      {vehicle.available ? 'Available' : 'Sold'}
                    </span>
                    <span className="px-3 py-1 rounded-sm text-xs font-medium bg-blue-500/20 text-blue-400">
                      {vehicle.images?.length || 0} photos
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      {vehicle.year} • {vehicle.price}
                    </p>
                  </div>

                  <p className="text-sm line-clamp-2">{vehicle.description}</p>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button
                      onClick={() => startEdit(vehicle)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-sm hover:bg-blue-500/30"
                    >
                      <Edit2 size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleAvailability(vehicle.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-foreground-faint/20 text-foreground-muted rounded-sm hover:bg-foreground-faint/30"
                    >
                      {vehicle.available ? 'Mark Sold' : 'Mark Available'}
                    </button>
                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-motorsport-red/20 text-motorsport-red rounded-sm hover:bg-motorsport-red/30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AdminInventory
