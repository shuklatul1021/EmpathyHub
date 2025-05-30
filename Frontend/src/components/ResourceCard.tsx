import React from 'react';
import { Resource } from '../types';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { BookOpen, Film, Dumbbell, PenTool as Tool } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const typeIcons = {
    article: <BookOpen className="h-5 w-5" />,
    video: <Film className="h-5 w-5" />,
    exercise: <Dumbbell className="h-5 w-5" />,
    tool: <Tool className="h-5 w-5" />,
  };

  const typeColors = {
    article: 'bg-primary/10 text-primary',
    video: 'bg-accent/10 text-accent',
    exercise: 'bg-success/10 text-success',
    tool: 'bg-secondary/10 text-secondary',
  };

  return (
    <Card 
      className="h-full transition-transform duration-300 hover:translate-y-[-4px]"
      padding="none"
    >
      <div className="aspect-video overflow-hidden rounded-t-xl">
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant={
              resource.type === 'article' ? 'primary' :
              resource.type === 'video' ? 'accent' :
              resource.type === 'exercise' ? 'success' : 'secondary'
            }
            className="flex items-center gap-1"
          >
            {typeIcons[resource.type]}
            <span className="capitalize">{resource.type}</span>
          </Badge>
          <Badge variant="gray">{resource.category}</Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-3">{resource.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="gray" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
        <a
          href={resource.url}
          className="inline-block text-primary font-medium hover:text-primary-dark hover:underline"
        >
          View Resource →
        </a>
      </div>
    </Card>
  );
};

export default ResourceCard;