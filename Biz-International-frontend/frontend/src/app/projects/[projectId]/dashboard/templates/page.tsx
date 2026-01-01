// src/app/projects/[projectId]/dashboard/templates/page.tsx
import React from "react";
import TemplateEditor from "@/components/dashboard/TemplateEditor";

type Props = { params: { projectId: string } };

export default function TemplatesPage({ params }: Props) {
  const { projectId } = params;
  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Templates — Project {projectId}</h1>
      <TemplateEditor projectId={projectId} />
    </main>
  );
}
