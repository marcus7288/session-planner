import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Clock, Users, GripVertical, Download, FileText, Target, Link as LinkIcon, Edit2, Save, X, FolderOpen, FilePlus, Palette, Moon, Sun } from 'lucide-react';

// Color scheme presets
const colorSchemes = {
  blue: {
    name: 'Blue',
    content: { light: 'bg-blue-100 border-blue-300 text-blue-900', dark: 'bg-blue-900 border-blue-700 text-blue-100' },
    engagement: { light: 'bg-green-100 border-green-300 text-green-900', dark: 'bg-green-900 border-green-700 text-green-100' },
    practice: { light: 'bg-purple-100 border-purple-300 text-purple-900', dark: 'bg-purple-900 border-purple-700 text-purple-100' },
    break: { light: 'bg-gray-100 border-gray-300 text-gray-900', dark: 'bg-gray-700 border-gray-600 text-gray-100' },
    primary: { light: 'bg-blue-500 hover:bg-blue-600', dark: 'bg-blue-600 hover:bg-blue-700' }
  },
  ocean: {
    name: 'Ocean',
    content: { light: 'bg-cyan-100 border-cyan-300 text-cyan-900', dark: 'bg-cyan-900 border-cyan-700 text-cyan-100' },
    engagement: { light: 'bg-teal-100 border-teal-300 text-teal-900', dark: 'bg-teal-900 border-teal-700 text-teal-100' },
    practice: { light: 'bg-sky-100 border-sky-300 text-sky-900', dark: 'bg-sky-900 border-sky-700 text-sky-100' },
    break: { light: 'bg-slate-100 border-slate-300 text-slate-900', dark: 'bg-slate-700 border-slate-600 text-slate-100' },
    primary: { light: 'bg-cyan-500 hover:bg-cyan-600', dark: 'bg-cyan-600 hover:bg-cyan-700' }
  },
  sunset: {
    name: 'Sunset',
    content: { light: 'bg-orange-100 border-orange-300 text-orange-900', dark: 'bg-orange-900 border-orange-700 text-orange-100' },
    engagement: { light: 'bg-pink-100 border-pink-300 text-pink-900', dark: 'bg-pink-900 border-pink-700 text-pink-100' },
    practice: { light: 'bg-rose-100 border-rose-300 text-rose-900', dark: 'bg-rose-900 border-rose-700 text-rose-100' },
    break: { light: 'bg-amber-100 border-amber-300 text-amber-900', dark: 'bg-amber-800 border-amber-700 text-amber-100' },
    primary: { light: 'bg-orange-500 hover:bg-orange-600', dark: 'bg-orange-600 hover:bg-orange-700' }
  },
  forest: {
    name: 'Forest',
    content: { light: 'bg-emerald-100 border-emerald-300 text-emerald-900', dark: 'bg-emerald-900 border-emerald-700 text-emerald-100' },
    engagement: { light: 'bg-lime-100 border-lime-300 text-lime-900', dark: 'bg-lime-900 border-lime-700 text-lime-100' },
    practice: { light: 'bg-green-100 border-green-300 text-green-900', dark: 'bg-green-900 border-green-700 text-green-100' },
    break: { light: 'bg-teal-100 border-teal-300 text-teal-900', dark: 'bg-teal-800 border-teal-700 text-teal-100' },
    primary: { light: 'bg-emerald-500 hover:bg-emerald-600', dark: 'bg-emerald-600 hover:bg-emerald-700' }
  },
  lavender: {
    name: 'Lavender',
    content: { light: 'bg-violet-100 border-violet-300 text-violet-900', dark: 'bg-violet-900 border-violet-700 text-violet-100' },
    engagement: { light: 'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900', dark: 'bg-fuchsia-900 border-fuchsia-700 text-fuchsia-100' },
    practice: { light: 'bg-purple-100 border-purple-300 text-purple-900', dark: 'bg-purple-900 border-purple-700 text-purple-100' },
    break: { light: 'bg-indigo-100 border-indigo-300 text-indigo-900', dark: 'bg-indigo-800 border-indigo-700 text-indigo-100' },
    primary: { light: 'bg-violet-500 hover:bg-violet-600', dark: 'bg-violet-600 hover:bg-violet-700' }
  }
};

export default function SessionPlanner() {
  const [savedSessions, setSavedSessions] = useState([]);
  const [showSessionLibrary, setShowSessionLibrary] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [colorScheme, setColorScheme] = useState('blue');
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

  // Load saved sessions and custom activities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedSessions');
    if (saved) {
      setSavedSessions(JSON.parse(saved));
    }
    
    const customActivities = localStorage.getItem('customActivities');
    if (customActivities) {
      const parsed = JSON.parse(customActivities);
      setActivityLibrary(prev => {
        const defaultIds = ['intro', 'lecture', 'discussion', 'activity', 'break', 'qa', 'review'];
        const defaults = prev.filter(a => defaultIds.includes(a.id));
        return [...defaults, ...parsed];
      });
    }

    // Load theme preferences
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }

    const savedColorScheme = localStorage.getItem('colorScheme');
    if (savedColorScheme) {
      setColorScheme(savedColorScheme);
    }
  }, []);

  // Save theme preferences
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('colorScheme', colorScheme);
  }, [darkMode, colorScheme]);

  // Save custom activities to localStorage
  useEffect(() => {
    const customActivities = activityLibrary.filter(a => a.id.startsWith('custom-'));
    localStorage.setItem('customActivities', JSON.stringify(customActivities));
  }, [activityLibrary]);

  // Get current theme colors
  const getTypeColors = () => {
    const scheme = colorSchemes[colorScheme];
    const mode = darkMode ? 'dark' : 'light';
    return {
      content: scheme.content[mode],
      engagement: scheme.engagement[mode],
      practice: scheme.practice[mode],
      break: scheme.break[mode]
    };
  };

  const typeColors = getTypeColors();
  const primaryButton = colorSchemes[colorScheme].primary[darkMode ? 'dark' : 'light'];

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

  const saveSession = () => {
    if (!sessionTitle.trim()) {
      alert('Please add a session title before saving');
      return;
    }

    const session = {
      id: Date.now(),
      sessionTitle,
      sessionDate,
      startTime,
      participants,
      sessionNotes,
      learningObjectives,
      sessionResources,
      agenda,
      savedAt: new Date().toISOString()
    };

    const newSessions = [...savedSessions, session];
    setSavedSessions(newSessions);
    localStorage.setItem('savedSessions', JSON.stringify(newSessions));
    alert('Session saved successfully!');
  };

  const loadSession = (session) => {
    setSessionTitle(session.sessionTitle);
    setSessionDate(session.sessionDate);
    setStartTime(session.startTime);
    setParticipants(session.participants);
    setSessionNotes(session.sessionNotes);
    setLearningObjectives(session.learningObjectives);
    setSessionResources(session.sessionResources);
    setAgenda(session.agenda);
    setShowSessionLibrary(false);
  };

  const deleteSession = (sessionId) => {
    if (confirm('Are you sure you want to delete this session?')) {
      const newSessions = savedSessions.filter(s => s.id !== sessionId);
      setSavedSessions(newSessions);
      localStorage.setItem('savedSessions', JSON.stringify(newSessions));
    }
  };

  const newSession = () => {
    if (agenda.length > 0 && !confirm('Start a new session? Current unsaved work will be lost.')) {
      return;
    }
    setSessionTitle('');
    setSessionDate('');
    setStartTime('09:00');
    setParticipants('');
    setSessionNotes('');
    setLearningObjectives(['']);
    setSessionResources([{ name: '', url: '' }]);
    setAgenda([]);
  };

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

  const exportToPDF = async () => {
    // Dynamic import of jsPDF
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Helper function to add text with wrapping
    const addText = (text, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize);
      if (isBold) {
        doc.setFont(undefined, 'bold');
      } else {
        doc.setFont(undefined, 'normal');
      }
      
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        if (yPos > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += fontSize * 0.5;
      });
      yPos += 3;
    };

    // Title
    addText(sessionTitle || 'Session Plan', 20, true);
    yPos += 5;

    // Session Details
    if (sessionDate) addText(`Date: ${sessionDate}`, 11);
    if (startTime) addText(`Start Time: ${startTime}`, 11);
    if (participants) addText(`Participants: ${participants}`, 11);
    addText(`Total Duration: ${totalDuration} minutes (${Math.floor(totalDuration/60)}h ${totalDuration%60}m)`, 11, true);
    yPos += 5;

    // Session Notes
    if (sessionNotes) {
      addText('SESSION NOTES', 14, true);
      addText(sessionNotes, 10);
      yPos += 5;
    }

    // Learning Objectives
    const objectives = learningObjectives.filter(obj => obj.trim());
    if (objectives.length > 0) {
      addText('LEARNING OBJECTIVES', 14, true);
      objectives.forEach((obj, i) => {
        addText(`${i + 1}. ${obj}`, 10);
      });
      yPos += 5;
    }

    // Session Resources
    const resources = sessionResources.filter(r => r.name || r.url);
    if (resources.length > 0) {
      addText('SESSION RESOURCES', 14, true);
      resources.forEach(r => {
        addText(`• ${r.name || 'Resource'}: ${r.url}`, 9);
      });
      yPos += 5;
    }

    // Agenda
    if (agenda.length > 0) {
      addText('AGENDA', 16, true);
      yPos += 3;

      agenda.forEach((item, i) => {
        // Activity header
        addText(`${i + 1}. ${item.name}`, 12, true);
        
        // Time and type
        if (times[i]) {
          addText(`   Time: ${times[i].start} - ${times[i].end} (${item.duration} min) | Type: ${item.type}`, 10);
        }

        // Notes
        if (item.notes) {
          addText(`   Notes: ${item.notes}`, 9);
        }

        // Resources
        const activityResources = (item.resources || []).filter(r => r.name || r.url);
        if (activityResources.length > 0) {
          addText('   Resources:', 9, true);
          activityResources.forEach(r => {
            addText(`   • ${r.name || 'Resource'}: ${r.url}`, 8);
          });
        }
        
        yPos += 3;
      });
    }

    // Save PDF
    doc.save(`${sessionTitle || 'session-plan'}.pdf`);
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Theme Customizer Modal */}
        {showThemeCustomizer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-lg shadow-xl max-w-2xl w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`p-6 border-b sticky top-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <Palette className="inline mr-2" size={24} />
                    Theme Customizer
                  </h2>
                  <button
                    onClick={() => setShowThemeCustomizer(false)}
                    className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Dark Mode Toggle */}
                <div>
                  <label className={`text-lg font-semibold mb-3 block ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Display Mode
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        !darkMode
                          ? `${primaryButton} text-white border-transparent`
                          : darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Sun className="mx-auto mb-2" size={24} />
                      <div className="font-semibold">Light Mode</div>
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        darkMode
                          ? `${primaryButton} text-white border-transparent`
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Moon className="mx-auto mb-2" size={24} />
                      <div className="font-semibold">Dark Mode</div>
                    </button>
                  </div>
                </div>

                {/* Color Scheme Selection */}
                <div>
                  <label className={`text-lg font-semibold mb-3 block ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(colorSchemes).map(([key, scheme]) => (
                      <button
                        key={key}
                        onClick={() => setColorScheme(key)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          colorScheme === key
                            ? `${scheme.primary[darkMode ? 'dark' : 'light']} text-white border-transparent`
                            : darkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold mb-2">{scheme.name}</div>
                        <div className="flex gap-1 justify-center">
                          <div className={`w-4 h-4 rounded ${scheme.content[darkMode ? 'dark' : 'light'].split(' ')[0]}`}></div>
                          <div className={`w-4 h-4 rounded ${scheme.engagement[darkMode ? 'dark' : 'light'].split(' ')[0]}`}></div>
                          <div className={`w-4 h-4 rounded ${scheme.practice[darkMode ? 'dark' : 'light'].split(' ')[0]}`}></div>
                          <div className={`w-4 h-4 rounded ${scheme.break[darkMode ? 'dark' : 'light'].split(' ')[0]}`}></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className={`text-lg font-semibold mb-3 block ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Preview
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`p-3 rounded-lg border-2 text-sm ${typeColors.content}`}>
                      <strong>Content</strong>
                      <div className="text-xs mt-1">Lectures & presentations</div>
                    </div>
                    <div className={`p-3 rounded-lg border-2 text-sm ${typeColors.engagement}`}>
                      <strong>Engagement</strong>
                      <div className="text-xs mt-1">Discussions & Q&A</div>
                    </div>
                    <div className={`p-3 rounded-lg border-2 text-sm ${typeColors.practice}`}>
                      <strong>Practice</strong>
                      <div className="text-xs mt-1">Hands-on activities</div>
                    </div>
                    <div className={`p-3 rounded-lg border-2 text-sm ${typeColors.break}`}>
                      <strong>Break</strong>
                      <div className="text-xs mt-1">Rest periods</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => setShowThemeCustomizer(false)}
                  className={`w-full ${primaryButton} text-white px-6 py-3 rounded-lg font-semibold`}
                >
                  Apply Theme
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Session Library Modal */}
        {/* Session Library Modal */}
        {showSessionLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`p-6 border-b sticky top-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Session Library</h2>
                  <button
                    onClick={() => setShowSessionLibrary(false)}
                    className={darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {savedSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderOpen size={64} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No saved sessions yet</p>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Create and save a session to see it here</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {savedSessions.map(session => (
                      <div key={session.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                        darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-300'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{session.sessionTitle}</h3>
                            <div className={`mt-2 space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {session.sessionDate && <p>Date: {session.sessionDate}</p>}
                              {session.startTime && <p>Start: {session.startTime}</p>}
                              {session.participants && <p>Participants: {session.participants}</p>}
                              <p>Activities: {session.agenda.length}</p>
                              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Saved: {new Date(session.savedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => loadSession(session)}
                              className={`${primaryButton} text-white px-4 py-2 rounded text-sm`}
                            >
                              Load
                            </button>
                            <button
                              onClick={() => deleteSession(session.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Session Planner</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowThemeCustomizer(true)}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Palette size={18} /> Theme
              </button>
              <button
                onClick={newSession}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
              >
                <FilePlus size={18} /> New Session
              </button>
              <button
                onClick={() => setShowSessionLibrary(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center gap-2"
              >
                <FolderOpen size={18} /> Session Library ({savedSessions.length})
              </button>
              <button
                onClick={saveSession}
                className={`${primaryButton} text-white px-4 py-2 rounded flex items-center gap-2`}
              >
                <Save size={18} /> Save Session
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Session Title"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            />
            <input
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            />
            <input
              type="text"
              placeholder="# of Participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Session Notes */}
          <div className="mb-4">
            <label className={`flex items-center gap-2 font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              <FileText size={18} />
              Session Notes
            </label>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Add general notes about this session..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent resize-y min-h-20 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Learning Objectives */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className={`flex items-center gap-2 font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <Target size={18} />
                Learning Objectives
              </label>
              <button
                onClick={addLearningObjective}
                className={`text-sm flex items-center gap-1 ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'
                }`}
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
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                    }`}
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
              <label className={`flex items-center gap-2 font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <LinkIcon size={18} />
                Session Resources
              </label>
              <button
                onClick={addSessionResource}
                className={`text-sm flex items-center gap-1 ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'
                }`}
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
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                    }`}
                  />
                  <input
                    type="url"
                    value={resource.url}
                    onChange={(e) => updateSessionResource(index, 'url', e.target.value)}
                    placeholder="https://..."
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                    }`}
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
            <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Activity Library</h2>
              
              <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold text-sm mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Add Custom Activity</h3>
                <input
                  type="text"
                  placeholder="Activity name"
                  value={newActivityName}
                  onChange={(e) => setNewActivityName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded mb-2 text-sm ${
                    darkMode
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="Duration (min)"
                    value={newActivityDuration}
                    onChange={(e) => setNewActivityDuration(e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded text-sm ${
                      darkMode
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <select
                    value={newActivityType}
                    onChange={(e) => setNewActivityType(e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded text-sm ${
                      darkMode
                        ? 'bg-gray-600 border-gray-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="content">Content</option>
                    <option value="engagement">Engagement</option>
                    <option value="practice">Practice</option>
                    <option value="break">Break</option>
                  </select>
                </div>
                <button
                  onClick={addCustomActivity}
                  className={`w-full ${primaryButton} text-white px-3 py-2 rounded flex items-center justify-center gap-2 text-sm`}
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
            <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Session Agenda</h2>
                <div className="flex items-center gap-4">
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Clock className="inline mr-1" size={16} />
                    Total: <span className="font-bold">{totalDuration} min</span> ({Math.floor(totalDuration/60)}h {totalDuration%60}m)
                  </div>
                  {agenda.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={exportAgenda}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 text-sm"
                      >
                        <Download size={16} /> Export TXT
                      </button>
                      <button
                        onClick={exportToPDF}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2 text-sm"
                      >
                        <Download size={16} /> Export PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className="min-h-96 space-y-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e)}
              >
                {agenda.length === 0 ? (
                  <div className={`flex items-center justify-center h-96 border-2 border-dashed rounded-lg ${
                    darkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <p className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
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
                                className={`w-16 px-2 py-1 border rounded text-sm ${
                                  darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                              />
                              <span className="text-sm">min</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              darkMode ? 'bg-gray-700 bg-opacity-70' : 'bg-white bg-opacity-50'
                            }`}>
                              {item.type}
                            </span>
                          </div>

                          {expandedItems[item.agendaId] && (
                            <div className={`mt-4 space-y-3 pt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                              {/* Activity Notes */}
                              <div>
                                <label className={`text-xs font-semibold mb-1 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  Activity Notes
                                </label>
                                <textarea
                                  value={item.notes || ''}
                                  onChange={(e) => updateAgendaNotes(item.agendaId, e.target.value)}
                                  placeholder="Add notes for this activity..."
                                  className={`w-full px-3 py-2 border rounded text-sm resize-y min-h-16 ${
                                    darkMode
                                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                      : 'bg-white border-gray-300 text-gray-900'
                                  }`}
                                />
                              </div>

                              {/* Activity Resources */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Activity Resources
                                  </label>
                                  <button
                                    onClick={() => addResourceToActivity(item.agendaId)}
                                    className={`text-xs flex items-center gap-1 ${
                                      darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                                    }`}
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
                                        className={`flex-1 px-3 py-2 border rounded text-sm ${
                                          darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                      />
                                      <input
                                        type="url"
                                        value={resource.url}
                                        onChange={(e) => updateActivityResource(item.agendaId, rIndex, 'url', e.target.value)}
                                        placeholder="https://..."
                                        className={`flex-1 px-3 py-2 border rounded text-sm ${
                                          darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
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
      </div>
    </div>
  );
}
