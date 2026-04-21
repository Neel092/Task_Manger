import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Plus, Search } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      let url = '/api/tasks';
      if (filter) {
        url += `?status=${filter}`;
      }
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary-color)' }}>Task</span>Master
          </h1>
        </div>
        <button onClick={logout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="glass-input"
            style={{ width: 'auto', paddingRight: '2rem' }}
          >
            <option value="" style={{ color: 'black' }}>All Tasks</option>
            <option value="pending" style={{ color: 'black' }}>Pending</option>
            <option value="completed" style={{ color: 'black' }}>Completed</option>
          </select>
        </div>
        <button onClick={handleOpenModal} className="btn-primary">
          <Plus size={20} /> New Task
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDelete={() => handleDelete(task.id)} 
            onEdit={() => handleEdit(task)} 
          />
        ))}
        {tasks.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: 'var(--surface-color)', marginBottom: '1rem' }}>
              <Search size={40} />
            </div>
            <h3>No tasks found</h3>
            <p>Create a new task to get started.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <TaskFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          taskToEdit={taskToEdit} 
          onSave={fetchTasks} 
        />
      )}
    </div>
  );
}
