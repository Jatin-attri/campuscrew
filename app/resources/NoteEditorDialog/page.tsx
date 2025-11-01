// NoteEditorDialog.tsx
import { X, Save, Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NoteEditorDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    note: any | null; // Use your actual Note type
}

// NOTE: In a real app, replace this Textarea with a styled Tiptap/Lexical editor
// The full Tiptap setup is too large for this example, but this provides the correct UI structure.
const RichTextEditorPlaceholder = () => (
    <div className="border rounded-md min-h-[300px] p-4 bg-background">
        <p className="text-sm text-muted-foreground mb-4">
            [ Placeholder for a **Rich Text Editor (e.g., Tiptap/Lexical)** with shadcn/ui buttons for formatting ]
        </p>
        <Textarea
            placeholder="Start typing your detailed, informative note here..."
            className="w-full h-full min-h-[400px] resize-none border-none focus-visible:ring-0"
        />
    </div>
);


export function NoteEditorDialog({ isOpen, onOpenChange, note }: NoteEditorDialogProps) {
    const isNewNote = !note;
    const title = isNewNote ? 'Create New Note' : note?.title;

    const handleSave = () => {
        // Logic to save the note goes here
        onOpenChange(false);
    }

    return (
        // Use a full-width, tall dialog for a focused, professional writing experience
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 flex flex-col">
                <ScrollArea className="flex-grow h-full">
                    <div className="p-6">
                        <DialogHeader>
                            <div className="flex items-center justify-between w-full">
                                <DialogTitle className="text-2xl font-extrabold text-primary w-full pr-4">
                                    {/* The actual note title editor/viewer */}
                                    <Input
                                        defaultValue={title}
                                        placeholder="Untitled Note"
                                        className="text-2xl font-bold border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
                                    />
                                </DialogTitle>
                                <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="shrink-0">
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            {/* Metadata below the title */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="secondary">Subject: {note?.subject || 'Select Subject'}</Badge>
                                <Badge variant="outline">Tags: {note?.tags.join(', ') || 'Add Tags...'}</Badge>
                                <span className="text-sm text-muted-foreground ml-auto">
                                    {isNewNote ? 'New Draft' : `Last Updated: ${note?.date}`}
                                </span>
                            </div>
                        </DialogHeader>

                        {/* The main editor area */}
                        <div className="py-6">
                            <RichTextEditorPlaceholder />
                        </div>
                    </div>
                </ScrollArea>

                {/* Sticky Footer for Actions */}
                <div className="sticky bottom-0 border-t bg-background p-4 flex justify-between items-center">
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print / Export PDF
                    </Button>
                    <Button onClick={handleSave} className="ml-auto">
                        <Save className="w-4 h-4 mr-2" />
                        {isNewNote ? 'Create Note' : 'Save Changes'}
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
}