import React, { useEffect, useState } from 'react';
import { MoodEntry } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';
import { BACKEND_URL } from '../config';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserMoodEntry } from '../State/ComponetState';

interface MoodTrackerProps {
  entries: MoodEntry[];
  onAddEntry?: (entry: Omit<MoodEntry, 'id' | 'userId' | 'timestamp'>) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ 
  entries = [],
}) => {
  const [mood, setMood] = useState<MoodEntry['mood']>('neutral');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setusermood = useSetRecoilState(UserMoodEntry)
  const usermood = useRecoilValue(UserMoodEntry);
  const moodIcons = {
    veryBad: <ThumbsDown className="h-7 w-7 text-error" />,
    bad: <Frown className="h-7 w-7 text-error/80" />,
    neutral: <Meh className="h-7 w-7 text-gray-400" />,
    good: <Smile className="h-7 w-7 text-success/80" />,
    veryGood: <ThumbsUp className="h-7 w-7 text-success" />
  };

  const moodLabels = {
    veryBad: 'Very Bad',
    bad: 'Bad',
    neutral: 'Neutral',
    good: 'Good',
    veryGood: 'Very Good'
  };

  const moodColors = {
    veryBad: 'bg-error/10 border-error/30',
    bad: 'bg-error/5 border-error/20',
    neutral: 'bg-gray-100 border-gray-200',
    good: 'bg-success/5 border-success/20',
    veryGood: 'bg-success/10 border-success/30'
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async() => {
    console.log(mood);
    console.log(notes);
    setIsLoading(true);
    try{
      const Resposne = await fetch(`${BACKEND_URL}/api/v1/main/postmoodentry`, {
        method : "POST",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          mood : mood,
          notes : notes
        })
      });

      if(Resposne.ok){
        alert("Note Posted");
        setIsLoading(false);
        setMood('neutral');
        setNotes('');
        setTags([]);
      }else{
        alert("Error While Posting")
      }
    }catch(e){
      console.log(e);
      alert('Internal Server Errror')
    }
  };

  const GetMoodUpdate = async()=>{
    try{
      const Response = await fetch(`${BACKEND_URL}/api/v1/main/alluserpost` , {
        method : "GET",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        }
      })
      const json = await Response.json();
      if(Response.ok){
        setusermood(json.posts);
      }
    }catch(e){
      console.log(e);
      alert("Internale Server Error")
    }
  }

  useEffect(()=>{
    GetMoodUpdate();
  },[])
  console.log(usermood);
  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map((moodType) => (
            <button
              key={moodType}
              onClick={() => setMood(moodType)}
              className={`
                flex flex-col items-center p-3 rounded-lg border-2 transition-all
                ${mood === moodType ? `${moodColors[moodType]} ring-2 ring-primary/50` : 'border-transparent hover:bg-gray-50'}
              `}
            >
              {moodIcons[moodType]}
              <span className="mt-1 text-sm">{moodLabels[moodType]}</span>
            </button>
          ))}
        </div>
        
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling? What's on your mind today?"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary focus:ring-primary"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (optional)
          </label>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag (e.g., work, family)"
              className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary focus:ring-primary"
            />
            <button
              onClick={handleAddTag}
              className="rounded-r-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="gray" className="flex items-center gap-1">
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 rounded-full text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </Badge>
            ))}
          </div>
        </div>
        
        <Button onClick={handleSubmit} fullWidth disabled={isLoading} >
           {isLoading ? 'Saving Entry...' : 'Save Entry'}
        </Button>
      </Card>
      
      {entries.length > 0 && (
        <Card className="animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Recent Mood History</h3>
          <div className="space-y-4">
            {usermood.map((entry , index) => (
              <div key={index} className={`p-4 rounded-lg ${moodColors[entry.mood]}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {moodIcons[entry.mood]}
                    <span className="ml-2 font-medium">{moodLabels[entry.mood]}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {entry.notes && <p className="text-gray-700 mb-2">{entry.notes}</p>}
                {entry > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="gray" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MoodTracker;