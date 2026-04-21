import { Calendar, Edit2, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-in-progress';
      case 'completed': return 'badge-done';
      default: return 'badge-todo';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'low': return 'badge-low';
      case 'medium': return 'badge-medium';
      case 'high': return 'badge-high';
      default: return 'badge-low';
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>{task.title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onEdit} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}>
            <Edit2 size={16} />
          </button>
          <button onClick={onDelete} style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: '0.25rem' }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginTop: 'auto' }}>
        <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
        <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>{task.priority}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: 'auto' }}>
          <Calendar size={14} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
