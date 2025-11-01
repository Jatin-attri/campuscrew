// app/resources/notes/page.tsx
import { NotesDashboard } from "@/app/components/notes/NotesDashboard";

export default function NotesPage() {
  return (
    // You can set the full-screen layout here, e.g., using padding and container classes
    <main className="flex min-h-screen flex-col">
      <NotesDashboard />
    </main>
  );
}

// Optional: Add metadata for SEO
export const metadata = {
  title: 'Student Notes | Resources Hub',
  description: 'Manage and organize your academic notes.',
};