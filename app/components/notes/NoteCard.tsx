
// components/notes/NoteCard.tsx
import { MoreHorizontal, Pencil, Trash2, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Re-defining the Note type for clarity
interface Note {
    id: string;
    title: string;
    subject: string;
    tags: string[];
    contentPreview: string;
    date: string;
}

interface NoteCardProps {
    note: Note;
    onView: () => void;
}

export function NoteCard({ note, onView }: NoteCardProps) {
    // Simple function to map subjects to a badge variant/color
    const getSubjectVariant = (subject: string): "default" | "secondary" | "outline" | "destructive" => {
        switch (subject.toLowerCase()) {
            case 'math': return 'default';
            case 'history': return 'secondary';
            case 'cs': return 'outline';
            case 'science': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <Card className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            {/* Note: Stop propagation on menu actions to prevent opening the editor */}
            <div onClick={onView}>
                <CardHeader className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        {/* Subject Badge */}
                        <Badge variant={getSubjectVariant(note.subject)} className="text-xs font-medium">
                            {note.subject}
                        </Badge>
                        {/* Context Menu for Edit/Delete */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(); }} className="cursor-pointer">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); alert('Deleting note ' + note.title); }} className="text-red-600 cursor-pointer">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {/* Note Title */}
                    <CardTitle className="text-lg leading-snug">{note.title}</CardTitle>
                    {/* Date Metadata */}
                    <CardDescription className="text-xs">{note.date}</CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                    {/* Content Preview */}
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{note.contentPreview}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {note.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs font-normal">#{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
            </div>

            <CardFooter className="p-4 pt-0 border-t">
                <Button onClick={onView} variant="link" className="p-0 h-auto">
                    <BookOpen className="w-4 h-4 mr-1" /> Read Full Note
                </Button>
            </CardFooter>
        </Card>
    );
}