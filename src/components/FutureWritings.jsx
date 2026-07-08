import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Lock, Unlock, Trash2 } from 'lucide-react';

const FutureWritings = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expandedEntry, setExpandedEntry] = useState(null);

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('karthika_future_diary');
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load diary entries from localStorage:", e);
    }
  }, []);

  // Save entries helper
  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    try {
      localStorage.setItem('karthika_future_diary', JSON.stringify(newEntries));
    } catch (e) {
      console.error("Failed to save diary entries to localStorage:", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id, e) => {
    e.stopPropagation(); // Prevent expanding card when deleting
    if (window.confirm("Are you sure you want to delete this capsule letter?")) {
      const updated = entries.filter(entry => entry.id !== id);
      saveEntries(updated);
      if (expandedEntry === id) {
        setExpandedEntry(null);
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedEntry(expandedEntry === id ? null : id);
  };

  return (
    <div className="future-writings-section animate-fade-in">
      <h2 className="section-title text-center glow-text">Letters to the Future</h2>
      <p className="section-subtitle text-center">Write a letter or list down goals for your future self</p>

      {/* Diary / Notebook Input Form */}
      <form onSubmit={handleSubmit} className="notebook-form glass">
        <div className="notebook-header">
          <BookOpen className="notebook-icon" size={20} />
          <span>New Capsule Entry</span>
        </div>
        
        <div className="notebook-paper">
          <input 
            type="text" 
            placeholder="Title of your letter..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="notebook-title-input"
            required
            maxLength={60}
          />
          <textarea
            placeholder="Dear Future Karthu..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="notebook-text-area"
            required
            rows={6}
          ></textarea>
        </div>

        <button type="submit" className="notebook-submit-btn">
          Lock in Capsule 🔒
        </button>
      </form>

      {/* Saved Entries List */}
      <div className="saved-capsules-area">
        <h3 className="capsules-header">Your Saved Time Capsules</h3>
        {entries.length === 0 ? (
          <div className="empty-capsules glass">
            <Lock size={32} className="text-muted mb-2" />
            <p>No letters locked yet. Write your very first capsule letter above!</p>
          </div>
        ) : (
          <div className="capsules-list">
            {entries.map((entry) => {
              const isExpanded = expandedEntry === entry.id;
              return (
                <div 
                  key={entry.id}
                  className={`capsule-card glass ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => toggleExpand(entry.id)}
                >
                  <div className="capsule-card-header">
                    <div className="capsule-card-meta">
                      <Calendar size={14} className="meta-icon" />
                      <span>{entry.date}</span>
                    </div>
                    <button 
                      onClick={(e) => handleDelete(entry.id, e)}
                      className="delete-capsule-btn"
                      aria-label="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="capsule-card-title-row">
                    {isExpanded ? <Unlock size={18} className="lock-icon-unlocked" /> : <Lock size={18} className="lock-icon" />}
                    <h4 className="capsule-card-title">{entry.title}</h4>
                  </div>

                  {isExpanded && (
                    <div className="capsule-card-body animate-fade-in">
                      <p className="capsule-content-text">{entry.content}</p>
                    </div>
                  )}

                  {!isExpanded && (
                    <p className="capsule-peek-text">
                      {entry.content.substring(0, 60)}...
                    </p>
                  )}
                  
                  <div className="capsule-expand-hint">
                    {isExpanded ? "Tap to lock letter" : "Tap to open and read"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FutureWritings;
