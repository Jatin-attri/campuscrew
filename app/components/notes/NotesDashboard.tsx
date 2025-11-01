// components/notes/NotesDashboard.tsx
"use client";

import { useState } from 'react';
import { Search, Plus, BookOpen } from 'lucide-react';

// --- Import UI Components ---
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// --- Import Notes Components ---
import { NoteCard } from './NoteCard';
// import { NoteEditorDialog } from ';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


// --- Mock Data Structure ---
interface Note {
    id: string;
    title: string;
    subject: string;
    tags: string[];
    contentPreview: string;
    date: string;
}

const mockNotes: Note[] = [
    { id: '1', title: 'Calculus I - Integration by Parts', subject: 'Math', tags: ['ExamPrep', 'Formula'], contentPreview: 'The integral of u dv is uv minus the integral of v du. Remember the LIATE rule for choosing u.', date: 'Oct 25, 2025' },
    { id: '2', title: 'Historical Context: French Revolution', subject: 'History', tags: ['EssayTopic', 'Timeline'], contentPreview: 'Focus on the three estates system and the role of the Jacobins in the Reign of Terror. Key date: Bastille Day (July 14, 1789).', date: 'Oct 20, 2025' },
    { id: '3', title: 'React Hooks Deep Dive: useEffect', subject: 'CS', tags: ['Coding', 'Advanced'], contentPreview: 'Understand the dependency array to prevent infinite loops. Empty array runs once, no array runs on every render.', date: 'Oct 18, 2025' },
    { id: '4', title: 'Cell Biology: Mitosis Stages', subject: 'Science', tags: ['Quiz', 'Diagram'], contentPreview: 'Prophase, Metaphase, Anaphase, Telophase. The mnemonic PMAT is helpful for quick recall.', date: 'Oct 15, 2025' },
];
// ----------------------------

export function NotesDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const filteredNotes = mockNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.contentPreview.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenEditor = (note: Note | null) => {
        setSelectedNote(note);
        setIsEditorOpen(true);
    };

    return (
        <div className="flex flex-col h-full p-6 space-y-6 container mx-auto">

            {/* --- Header and 'Add New Note' Button --- */}
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Student Notes Hub
                </h1>
                <Button onClick={() => handleOpenEditor(null)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add New Note
                </Button>
            </header>

            {/* --- Search and Filter Section --- */}
            <div className="flex items-center space-x-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search notes by title or content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-full max-w-xl"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Filter (Tags/Subject)
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Filter by Subject</DropdownMenuItem>
                        <DropdownMenuItem>Filter by Tag</DropdownMenuItem>
                        <DropdownMenuItem>Sort by Date</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Separator />

            {/* --- Notes Grid (Scrollable Area) --- */}
            <ScrollArea className="flex-grow h-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-6">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onView={() => handleOpenEditor(note)}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground col-span-full">No notes found matching your search term.</p>
                    )}
                </div>
            </ScrollArea>

            {/* --- The Note Editor Dialog --- */}
            {/* <NoteEditorDialog
                isOpen={isEditorOpen}
                onOpenChange={setIsEditorOpen}
                note={selectedNote}
            /> */}
        </div>
    );
}