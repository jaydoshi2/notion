// app/doc/[id]/published/layout.tsx
export default function PublishedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children} {/* Only renders the content of the published page */}
    </>
  );
}
