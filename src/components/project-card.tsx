import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, X as XIcon, Music2, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  badge: string;
  title: string;
  description: string;
  tags: { label: string; variant: 'default' | 'secondary' | 'outline' }[];
  comingSoon?: boolean;
  onFreeDownload?: () => void;
  onLiveDemo?: () => void;
}

export function ProjectCard({ badge, title, description, tags, comingSoon, onFreeDownload, onLiveDemo }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5 space-y-3">
        <Badge variant="outline" className={`text-xs font-semibold tracking-wide ${comingSoon ? 'text-muted-foreground border-muted' : 'text-primary border-primary/30'}`}>
          {badge}
        </Badge>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => {
            const colorClass = t.label === 'Free' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400' :
              t.label === 'Paid' ? 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800 dark:text-amber-400' :
              t.variant === 'default' ? 'bg-primary/10 text-primary border-primary/20' : '';
            return (
              <Badge key={t.label} variant={t.variant} className={`text-xs font-medium ${colorClass}`}>
                {t.label}
              </Badge>
            );
          })}
        </div>
        {comingSoon ? (
          <Button variant="outline" size="sm" disabled className="opacity-40 pointer-events-none">
            In Development
          </Button>
        ) : (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a href="https://github.com/KnowNationHQ/form001" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" aria-label="GitHub">
                <Code2 className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://x.com/KnowNationHQ" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:text-blue-500" aria-label="X / Twitter">
                <XIcon className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://tiktok.com/@KnowNationHQ" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:text-pink-500" aria-label="TikTok">
                <Music2 className="h-4 w-4" />
              </Button>
            </a>
            {onFreeDownload && (
              <Button variant="secondary" size="sm" onClick={onFreeDownload} className="ml-auto bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-200 dark:border-emerald-800">
                Free Download
              </Button>
            )}
            {onLiveDemo && (
              <Button variant="outline" size="sm" onClick={onLiveDemo} className="border-primary/30 text-primary hover:bg-primary/10">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Live Demo
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
