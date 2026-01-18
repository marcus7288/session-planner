import React, { useState } from 'react';
import { Plus, Trash2, Clock, Users, GripVertical, Download, FileText, Target, Link as LinkIcon, Edit2, Save, X } from 'lucide-react';

export default function SessionPlanner() {
  const [sessions, setSessions] = useState([]);
  const [activityLibrary, setActivityLibrary] = useState([
    { id: 'intro', name: 'Introduction & Icebreaker', duration: 10, type: 'engagement' },
    { id: 'lecture', name: 'Lecture/Presentation', duration: 20, type: 'content' },
    { id: 'discussion', name: 'Group Discussion', duration: 15, type: 'engagement' },
    { id: 'activity', name: 'Hands-on Activity', duration: 30, type: 'practice' },
    { id: 'break', name: 'Break', duration: 10, type: 'break' },
    { id: 'qa', name: 'Q&A Session', duration: 15, type: 'engagement' },
    { id: 'review', name: 'Review & Recap', duration: 10, type: 'content' },
  ]);
  
  const [agenda, setAgenda] = useState([]);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [participants, setParticipants] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [learningObjectives, setLearningObjectives] = useState(['']);
  const [sessionResources, setSessionResources] = useState([{ name: '', url: '' }]);
  
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityDuration, setNewActivityDuration] = useState(15);
  const [newActivityType, setNewActivityType] = useState('content');
  
  const [draggedItem, setDraggedItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const typeColors = {
    content: 'bg-blue-100 border-blue-300 text-blue-800',
    engagement: 'bg-green-100 border-green-300 text-green-800',
    practice: 'bg-purple-100 border-purple-300 text-purple-800',
    break: 'bg-gray-100 border-gray-300 text-gray-800',
  };

  const addCustomActivity = () => {
    if (newActivityName.trim()) {
      const newActivity = {
        id: `custom-${Date.now()}`,
        name: newActivityName,
        duration: parseInt(newActivityDuration),
        type: newActivityType
      };
      setActivityLibrary([...activityLibrary, newActivity]);
      setNewActivityName('');
      setNewActivityDuration(15);
    }
  };

  const addToAgenda = (activity) => {
    setAgenda([...agenda, { 
      ...activity, 
      agendaId: Date.now(),
      notes: '',
      resources: [{ name: '', url: '' }]
    }]);
  };

  const removeFromAgenda = (agendaId) => {
    setAgenda(agenda.filter(item => item.agendaId !== agendaId));
  };

  const updateAgendaDuration = (agendaId, newDuration) => {
    setAgenda(agenda.map(item => 
      item.agendaId === agendaId ? { ...item, duration: parseInt(newDuration) } : item
    ));
  };

  const updateAgendaNotes = (agendaId, notes) => {
    setAgenda(agenda.map(item => 
      item.agendaId === agendaId ? { ...item, notes } : item
    ));
  };

  const updateAgendaResources = (agendaId, resources) => {
    setAgenda(agenda.map(item => 
      item.agendaId === agendaId ? { ...item, resources } : item
    ));
  };

  const addResourceToActivity = (agendaId) => {
    const item = agenda.find(i => i.agendaId === agendaId);
    if (item) {
      updateAgendaResources(agendaId, [...(item.resources || []), { name: '', url: '' }]);
    }
  };

  const updateActivityResource = (agendaId, resourceIndex, field, value) => {
    const item = agenda.find(i => i.agendaId === agendaId);
    if (item) {
      const newResources = [...item.resources];
      newResources[resourceIndex] = { ...newResources[resourceIndex], [field]: value };
      updateAgendaResources(agendaId, newResources);
    }
  };

  const removeActivityResource = (agendaId, resourceIndex) => {
    const item = agenda.find(i => i.agendaId === agendaId);
    if (item && item.resources.length > 1) {
      updateAgendaResources(agendaId, item.resources.filter((_, i) => i !== resourceIndex));
    }
  };

  const toggleExpanded = (agendaId) => {
    setExpandedItems(prev => ({ ...prev, [agendaId]: !prev[agendaId] }));
  };

  const addLearningObjective = () => {
    setLearningObjectives([...learningObjectives, '']);
  };

  const updateLearningObjective = (index, value) => {
    const newObjectives = [...learningObjectives];
    newObjectives[index] = value;
    setLearningObjectives(newObjectives);
  };

  const removeLearningObjective = (index) => {
    if (learningObjectives.length > 1) {
      setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
    }
  };

  const addSessionResource = () => {
    setSessionResources([...sessionResources, { name: '', url: '' }]);
  };

  const updateSessionResource = (index, field, value) => {
    const newResources = [...sessionResources];
    newResources[index] = { ...newResources[index], [field]: value };
    setSessionResources(newResources);
  };

  const removeSessionResource = (index) => {
    if (sessionResources.length > 1) {
      setSessionResources(sessionResources.filter((_, i) => i !== index));
    }
  };

  const handleDragStart = (e, item, source) => {
    setDraggedItem({ item, source });
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e, targetIndex = null) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.source === 'library') {
      const newItem = { 
        ...draggedItem.item, 
        agendaId: Date.now(),
        notes: '',
        resources: [{ name: '', url: '' }]
      };
      if (targetIndex !== null) {
        const newAgenda = [...agenda];
        newAgenda.splice(targetIndex, 0, newItem);
        setAgenda(newAgenda);
      } else {
        setAgenda([...agenda, newItem]);
      }
    } else {
      const newAgenda = [...agenda];
      const draggedIndex = agenda.findIndex(item => item.agendaId === draggedItem.item.agendaId);
      const [removed] = newAgenda.splice(draggedIndex, 1);
      newAgenda.splice(targetIndex !== null ? targetIndex : newAgenda.length, 0, removed);
      setAgenda(newAgenda);
    }
    setDraggedItem(null);
  };

  const calculateTimes = () => {
    if (!startTime) return [];
    const times = [];
    let currentTime = startTime.split(':').map(Number);
    
    agenda.forEach((item, index) => {
      const hours = currentTime[0];
      const minutes = currentTime[1];
      const start = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      currentTime[1] += item.duration;
      if (currentTime[1] >= 60) {
        currentTime[0] += Math.floor(currentTime[1] / 60);
        currentTime[1] = currentTime[1] % 60;
      }
      
      const end = `${currentTime[0].toString().padStart(2, '0')}:${currentTime[1].toString().padStart(2, '0')}`;
      times.push({ start, end });
    });
    
    return times;
  };

  const totalDuration = agenda.reduce((sum, item) => sum + item.duration, 0);
  const times = calculateTimes();

  const exportAgenda = () => {
    const text = `
${sessionTitle || 'Session Plan'}
${sessionDate ? `Date: ${sessionDate}` : ''}
${startTime ? `Start Time: ${startTime}` : ''}
${participants ? `Participants: ${participants}` : ''}

Total Duration: ${totalDuration} minutes (${Math.floor(totalDuration/60)}h ${totalDuration%60}m)

${sessionNotes ? `\nSESSION NOTES:\n${sessionNotes}\n` : ''}

${learningObjectives.filter(obj => obj.trim()).length > 0 ? `\nLEARNING OBJECTIVES:\n${learningObjectives.filter(obj => obj.trim()).map((obj, i) => `${i + 1}. ${obj}`).join('\n')}\n` : ''}

${sessionResources.filter(r => r.name || r.url).length > 0 ? `\nSESSION RESOURCES:\n${sessionResources.filter(r => r.name || r.url).map(r => `- ${r.name || 'Resource'}: ${r.url}`).join('\n')}\n` : ''}

AGENDA:
${agenda.map((item, i) => `
${i + 1}. ${item.name}
   Time: ${times[i]?.start} - ${times[i]?.end} (${item.duration} min)
   Type: ${item.type}
   ${item.notes ? `Notes: ${item.notes}` : ''}
   ${item.resources && item.resources.filter(r => r.name || r.url).length > 0 ? `Resources:\n   ${item.resources.filter(r => r.name || r.url).map(r => `- ${r.name || 'Resource'}: ${r.url}`).join('\n   ')}` : ''}
`).join('\n')}
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sessionTitle || 'session-plan'}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Session Planner</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Session Title"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="# of Participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Session Notes */}
          <div className="mb-4">
            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
              <FileText size={18} />
              Session Notes
            </label>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Add general notes about this session..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-20"
            />
          </div>

          {/* Learning Objectives */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <Target size={18} />
                Learning Objectives
              </label>
              <button
                onClick={addLearningObjective}
                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
              >
                <Plus size={16} /> Add Objective
              </button>
            </div>
            <div className="space-y-2">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => updateLearningObjective(index, e.target.value)}
                    placeholder={`Learning objective ${index + 1}...`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {learningObjectives.length > 1 && (
                    <button
                      onClick={() => removeLearningObjective(index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Session Resources */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <LinkIcon size={18} />
                Session Resources
              </label>
              <button
                onClick={addSessionResource}
                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
              >
                <Plus size={16} /> Add Resource
              </button>
            </div>
            <div className="space-y-2">
              {sessionResources.map((resource, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resource.name}
                    onChange={(e) => updateSessionResource(index, 'name', e.target.value)}
                    placeholder="Resource name"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    value={resource.url}
                    onChange={(e) => updateSessionResource(index, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {sessionResources.length > 1 && (
                    <button
                      onClick={() => removeSessionResource(index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Library */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Activity Library</h2>
              
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">Add Custom Activity</h3>
                <input
                  type="text"
                  placeholder="Activity name"
                  value={newActivityName}
                  onChange={(e) => setNewActivityName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm"
                />
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="Duration (min)"
                    value={newActivityDuration}
                    onChange={(e) => setNewActivityDuration(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <select
                    value={newActivityType}
                    onChange={(e) => setNewActivityType(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="content">Content</option>
                    <option value="engagement">Engagement</option>
                    <option value="practice">Practice</option>
                    <option value="break">Break</option>
                  </select>
                </div>
                <button
                  onClick={addCustomActivity}
                  className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2 text-sm"
                >
                  <Plus size={16} /> Add Activity
                </button>
              </div>

              <div className="space-y-2">
                {activityLibrary.map(activity => (
                  <div
                    key={activity.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, activity, 'library')}
                    onClick={() => addToAgenda(activity)}
                    className={`p-3 border-2 rounded-lg cursor-move hover:shadow-md transition-shadow ${typeColors[activity.type]}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{activity.name}</div>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <Clock size={12} />
                          <span>{activity.duration} min</span>
                        </div>
                      </div>
                      <GripVertical size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agenda Builder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Session Agenda</h2>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <Clock className="inline mr-1" size={16} />
                    Total: <span className="font-bold">{totalDuration} min</span> ({Math.floor(totalDuration/60)}h {totalDuration%60}m)
                  </div>
                  {agenda.length > 0 && (
                    <button
                      onClick={exportAgenda}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 text-sm"
                    >
                      <Download size={16} /> Export
                    </button>
                  )}
                </div>
              </div>

              <div 
                className="min-h-96 space-y-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e)}
              >
                {agenda.length === 0 ? (
                  <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-400 text-center">
                      Drag activities here or click them to add to agenda
                    </p>
                  </div>
                ) : (
                  agenda.map((item, index) => (
                    <div
                      key={item.agendaId}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, 'agenda')}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`p-4 border-2 rounded-lg ${typeColors[item.type]} relative`}
                    >
                      <div className="flex items-start gap-3">
                        <GripVertical size={20} className="text-gray-400 cursor-move mt-1 flex-shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-bold text-lg">{index + 1}. {item.name}</div>
                              {times[index] && (
                                <div className="text-sm font-semibold mt-1">
                                  {times[index].start} - {times[index].end}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => toggleExpanded(item.agendaId)}
                                className="text-gray-600 hover:text-gray-800 p-1"
                                title="Edit details"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => removeFromAgenda(item.agendaId)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              <input
                                type="number"
                                value={item.duration}
                                onChange={(e) => updateAgendaDuration(item.agendaId, e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <span className="text-sm">min</span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded">
                              {item.type}
                            </span>
                          </div>

                          {expandedItems[item.agendaId] && (
                            <div className="mt-4 space-y-3 pt-3 border-t border-gray-300">
                              {/* Activity Notes */}
                              <div>
                                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                                  Activity Notes
                                </label>
                                <textarea
                                  value={item.notes || ''}
                                  onChange={(e) => updateAgendaNotes(item.agendaId, e.target.value)}
                                  placeholder="Add notes for this activity..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-y min-h-16 bg-white"
                                />
                              </div>

                              {/* Activity Resources */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="text-xs font-semibold text-gray-700">
                                    Activity Resources
                                  </label>
                                  <button
                                    onClick={() => addResourceToActivity(item.agendaId)}
                                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1"
                                  >
                                    <Plus size={14} /> Add
                                  </button>
                                </div>
                                <div className="space-y-2">
                                  {(item.resources || []).map((resource, rIndex) => (
                                    <div key={rIndex} className="flex gap-2">
                                      <input
                                        type="text"
                                        value={resource.name}
                                        onChange={(e) => updateActivityResource(item.agendaId, rIndex, 'name', e.target.value)}
                                        placeholder="Resource name"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                                      />
                                      <input
                                        type="url"
                                        value={resource.url}
                                        onChange={(e) => updateActivityResource(item.agendaId, rIndex, 'url', e.target.value)}
                                        placeholder="https://..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                                      />
                                      {item.resources.length > 1 && (
                                        <button
                                          onClick={() => removeActivityResource(item.agendaId, rIndex)}
                                          className="text-red-500 hover:text-red-700 px-1"
                                        >
                                          <X size={16} />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
