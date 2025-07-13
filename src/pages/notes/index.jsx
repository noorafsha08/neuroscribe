import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NoteCard from './components/NoteCard';
import EmotionFilterChips from './components/EmotionFilterChips';
import NotesSearchBar from './components/NotesSearchBar';
import NotesEmptyState from './components/NotesEmptyState';
import NotesSkeletonLoader from './components/NotesSkeletonLoader';
import AdvancedFiltersPanel from './components/AdvancedFiltersPanel';

const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    emotions: [],
    intensityLevels: [],
    dateRange: '',
    customDateStart: '',
    customDateEnd: '',
    sortBy: 'recent',
    hasBookmarks: false,
    hasTags: false,
    wordCountMin: '',
    wordCountMax: ''
  });
  const [page, setPage] = useState(1);
  const [hasMoreNotes, setHasMoreNotes] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Mock notes data with emotional analysis
  const mockNotes = [
    {
      id: 1,
      title: "Morning Reflection",
      preview: "Started the day with meditation and journaling. Feeling centered and ready to tackle new challenges. The sunrise was particularly beautiful today, reminding me to appreciate small moments of peace.",
      content: "Started the day with meditation and journaling. Feeling centered and ready to tackle new challenges. The sunrise was particularly beautiful today, reminding me to appreciate small moments of peace. I've been practicing mindfulness for three weeks now and can already notice improvements in my focus and emotional regulation.",
      emotion: "calm",
      emotionIntensity: 0.7,
      createdAt: new Date(2025, 6, 13, 8, 30),
      updatedAt: new Date(2025, 6, 13, 8, 45),
      tags: ["mindfulness", "morning", "meditation"],
      wordCount: 89,
      isBookmarked: true,
      isArchived: false
    },
    {
      id: 2,
      title: "Project Deadline Stress",
      preview: "The client presentation is tomorrow and I\'m feeling overwhelmed. Still have three slides to finish and the data analysis isn\'t complete. Need to prioritize and focus on what\'s most important.",
      content: "The client presentation is tomorrow and I'm feeling overwhelmed. Still have three slides to finish and the data analysis isn't complete. Need to prioritize and focus on what's most important. Taking deep breaths and breaking this down into smaller tasks. Maybe I should ask Sarah for help with the charts.",
      emotion: "anxious",
      emotionIntensity: 0.8,
      createdAt: new Date(2025, 6, 12, 16, 20),
      updatedAt: new Date(2025, 6, 12, 16, 35),
      tags: ["work", "deadline", "stress"],
      wordCount: 67,
      isBookmarked: false,
      isArchived: false
    },
    {
      id: 3,
      title: "Weekend Adventure Plans",
      preview: "Excited about the hiking trip this weekend! Finally booked the cabin and mapped out the trail. Can\'t wait to disconnect from technology and reconnect with nature.",
      content: "Excited about the hiking trip this weekend! Finally booked the cabin and mapped out the trail. Can\'t wait to disconnect from technology and reconnect with nature. Planning to bring my camera to capture the autumn colors. This is exactly what I need after a busy week at work.",
      emotion: "happy",
      emotionIntensity: 0.9,
      createdAt: new Date(2025, 6, 11, 19, 15),
      updatedAt: new Date(2025, 6, 11, 19, 30),
      tags: ["adventure", "hiking", "weekend"],
      wordCount: 54,
      isBookmarked: true,
      isArchived: false
    },
    {
      id: 4,
      title: "Learning New Skills",
      preview: "Started the React course today and I\'m amazed by how much there is to learn. The component-based architecture makes so much sense. Feeling motivated to build something meaningful.",
      content: "Started the React course today and I\'m amazed by how much there is to learn. The component-based architecture makes so much sense. Feeling motivated to build something meaningful. Already have ideas for a personal project that could help with my daily productivity. The instructor\'s teaching style is engaging and the examples are practical.",
      emotion: "motivated",
      emotionIntensity: 0.85,
      createdAt: new Date(2025, 6, 10, 14, 45),
      updatedAt: new Date(2025, 6, 10, 15, 10),
      tags: ["learning", "react", "programming"],
      wordCount: 78,
      isBookmarked: false,
      isArchived: false
    },
    {
      id: 5,
      title: "Family Dinner Thoughts",
      preview: "Had dinner with parents tonight. Mom's cooking always brings back childhood memories. Grateful for these moments together, especially as they're getting older.",
      content: "Had dinner with parents tonight. Mom's cooking always brings back childhood memories. Grateful for these moments together, especially as they're getting older. We talked about old family trips and shared stories I hadn't heard before. Dad seems more reflective lately, sharing wisdom about life and relationships.",
      emotion: "happy",
      emotionIntensity: 0.6,
      createdAt: new Date(2025, 6, 9, 20, 30),
      updatedAt: new Date(2025, 6, 9, 20, 45),
      tags: ["family", "gratitude", "memories"],
      wordCount: 65,
      isBookmarked: true,
      isArchived: false
    },
    {
      id: 6,
      title: "Creative Block",
      preview: "Struggling with the design project today. Nothing feels right and I keep second-guessing every decision. Maybe I need to step away and come back with fresh eyes tomorrow.",
      content: "Struggling with the design project today. Nothing feels right and I keep second-guessing every decision. Maybe I need to step away and come back with fresh eyes tomorrow. Sometimes the best ideas come when you\'re not actively trying to force them. Going for a walk might help clear my head.",
      emotion: "stressed",
      emotionIntensity: 0.7,
      createdAt: new Date(2025, 6, 8, 11, 20),
      updatedAt: new Date(2025, 6, 8, 11, 35),
      tags: ["creativity", "design", "block"],
      wordCount: 56,
      isBookmarked: false,
      isArchived: false
    },
    {
      id: 7,
      title: "Breakthrough Moment",
      preview: "Finally solved the algorithm problem I\'ve been working on for days! The solution was simpler than I thought. Feeling accomplished and ready to tackle the next challenge.",
      content: "Finally solved the algorithm problem I've been working on for days! The solution was simpler than I thought. Feeling accomplished and ready to tackle the next challenge. This reminds me why I love programming - the satisfaction of breaking down complex problems into elegant solutions. Time to celebrate with some good coffee.",
      emotion: "focused",
      emotionIntensity: 0.9,
      createdAt: new Date(2025, 6, 7, 15, 10),
      updatedAt: new Date(2025, 6, 7, 15, 25),
      tags: ["programming", "breakthrough", "achievement"],
      wordCount: 71,
      isBookmarked: true,
      isArchived: false
    },
    {
      id: 8,
      title: "Rainy Day Reflections",
      preview: "The rain today matches my contemplative mood. Spent time reading and thinking about future goals. Sometimes quiet moments like these are exactly what the soul needs.",
      content: "The rain today matches my contemplative mood. Spent time reading and thinking about future goals. Sometimes quiet moments like these are exactly what the soul needs. Been reflecting on the past year and how much I've grown personally and professionally. The sound of rain is surprisingly therapeutic.",
      emotion: "calm",
      emotionIntensity: 0.5,
      createdAt: new Date(2025, 6, 6, 13, 45),
      updatedAt: new Date(2025, 6, 6, 14, 0),
      tags: ["reflection", "rain", "goals"],
      wordCount: 62,
      isBookmarked: false,
      isArchived: false
    }
  ];

  // Load initial notes
  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotes(mockNotes);
      setFilteredNotes(mockNotes);
      setIsLoading(false);
    };

    loadNotes();
  }, []);

  // Filter and search notes
  useEffect(() => {
    let filtered = [...notes];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply emotion filters
    if (selectedEmotions.length > 0) {
      filtered = filtered.filter(note => selectedEmotions.includes(note.emotion));
    }

    // Apply advanced filters
    if (filters.intensityLevels.length > 0) {
      filtered = filtered.filter(note => {
        return filters.intensityLevels.some(level => {
          if (level === 'low') return note.emotionIntensity <= 0.33;
          if (level === 'medium') return note.emotionIntensity > 0.33 && note.emotionIntensity <= 0.66;
          if (level === 'high') return note.emotionIntensity > 0.66;
          return false;
        });
      });
    }

    if (filters.hasBookmarks) {
      filtered = filtered.filter(note => note.isBookmarked);
    }

    if (filters.hasTags) {
      filtered = filtered.filter(note => note.tags && note.tags.length > 0);
    }

    if (filters.wordCountMin) {
      filtered = filtered.filter(note => note.wordCount >= parseInt(filters.wordCountMin));
    }

    if (filters.wordCountMax) {
      filtered = filtered.filter(note => note.wordCount <= parseInt(filters.wordCountMax));
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange !== 'custom') {
      const now = new Date();
      filtered = filtered.filter(note => {
        const noteDate = new Date(note.createdAt);
        switch (filters.dateRange) {
          case 'today':
            return noteDate.toDateString() === now.toDateString();
          case 'yesterday':
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            return noteDate.toDateString() === yesterday.toDateString();
          case 'week':
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return noteDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return noteDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'emotion':
          return a.emotion.localeCompare(b.emotion);
        case 'wordCount':
          return b.wordCount - a.wordCount;
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredNotes(filtered);
  }, [notes, searchQuery, selectedEmotions, filters]);

  // Load more notes (infinite scroll simulation)
  const loadMoreNotes = useCallback(async () => {
    if (loadingMore || !hasMoreNotes) return;
    
    setLoadingMore(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we'll just mark as no more notes after first load
    setHasMoreNotes(false);
    setLoadingMore(false);
  }, [loadingMore, hasMoreNotes]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        return;
      }
      loadMoreNotes();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreNotes]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEmotionFilter = (emotions) => {
    setSelectedEmotions(emotions);
  };

  const handleAdvancedFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleArchiveNote = (noteId) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, isArchived: true } : note
    ));
  };

  const handleCreateNote = () => {
    navigate('/note-editor');
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <main className="lg:ml-64 pb-16 lg:pb-0">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            <NotesSearchBar
              onSearch={handleSearch}
              onFilterToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
            />
            
            <EmotionFilterChips
              selectedEmotions={selectedEmotions}
              onEmotionToggle={handleEmotionFilter}
            />
          </div>

          {/* Advanced Filters Panel */}
          <div className="relative">
            <AdvancedFiltersPanel
              isOpen={showAdvancedFilters}
              onClose={() => setShowAdvancedFilters(false)}
              filters={filters}
              onFiltersChange={handleAdvancedFilters}
            />
          </div>

          {/* Notes Content */}
          {isLoading ? (
            <NotesSkeletonLoader count={6} />
          ) : filteredNotes.length === 0 ? (
            <NotesEmptyState
              hasSearchQuery={searchQuery.length > 0 || selectedEmotions.length > 0}
              searchQuery={searchQuery}
            />
          ) : (
            <div className="space-y-4">
              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">
                  {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
                </p>
                {(searchQuery || selectedEmotions.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedEmotions([]);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onArchive={handleArchiveNote}
                  />
                ))}
              </div>

              {/* Load More Indicator */}
              {loadingMore && (
                <div className="py-8">
                  <NotesSkeletonLoader count={2} />
                </div>
              )}

              {!hasMoreNotes && filteredNotes.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-text-secondary text-sm">
                    You've reached the end of your notes
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <Button
        variant="default"
        size="icon"
        iconName="Plus"
        onClick={handleCreateNote}
        className="fixed bottom-20 lg:bottom-6 right-6 h-14 w-14 rounded-full shadow-soft-lg z-40"
      />

      <BottomTabNavigation />
    </div>
  );
};

export default NotesPage;