import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

export default function TaskFormModal({ isOpen, onClose, taskToEdit, onSave }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'low'
  });

  useEffect(() => {
    if (taskToEdit) {
      let formattedDate = '';
      if (taskToEdit.dueDate) {
        // Handle both ISO string and just date string
        formattedDate = taskToEdit.dueDate.split('T')[0];
      }
      
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        dueDate: formattedDate,
        status: taskToEdit.status || 'pending',
        priority: taskToEdit.priority || 'low'
      });
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const url = taskToEdit ? `/api/tasks/${taskToEdit.id}` : '/api/tasks';
    const method = taskToEdit ? 'PUT' : 'POST';

    // If dueDate is empty string, convert to null to avoid MySQL empty string date errors
    const submissionData = { ...formData };
    if (!submissionData.dueDate) {
      submissionData.dueDate = null;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        onSave();
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Failed to save task:', errorData);
        setError(errorData.message || 'Failed to save task. Please try again.');
      }
    } catch (err) {
      console.error('Error saving task:', err);
      setError('An unexpected error occurred while saving.');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50, padding: '1rem' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={24} />
        </button>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          {taskToEdit ? 'Edit Task' : 'Create New Task'}
        </h2>

        {error && (
          <div style={{ color: 'var(--error-color)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Title</label>
            <input 
              type="text" 
              className="glass-input" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
            <textarea 
              className="glass-input" 
              rows="3"
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Status</label>
              <select 
                className="glass-input" 
                value={formData.status} 
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="pending" style={{ color: 'black' }}>Pending</option>
                <option value="completed" style={{ color: 'black' }}>Completed</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Priority</label>
              <select 
                className="glass-input" 
                value={formData.priority} 
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low" style={{ color: 'black' }}>Low</option>
                <option value="medium" style={{ color: 'black' }}>Medium</option>
                <option value="high" style={{ color: 'black' }}>High</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Due Date</label>
            <input 
              type="date" 
              className="glass-input" 
              value={formData.dueDate} 
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
