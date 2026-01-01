'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Project {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  status?: 'ACTIVE' | 'COMPLETED';
}

export default function ProjectsPage() {
  const router = useRouter();

  const { data: projects = [], isLoading, isError } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.client.get('/projects');
      const data = res.data;

      return Array.isArray(data)
        ? data
        : data?.data ?? data?.projects ?? [];
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage construction sites and door specifications.
          </p>
        </div>

        <Link href="/projects/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-red-600">
          Failed to load projects. Please try again.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">
                  {project.name}
                </CardTitle>

                {project.status && (
                  <div
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      project.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {project.status}
                  </div>
                )}
              </CardHeader>

              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <MapPin className="mr-1 h-4 w-4" />
                  {project.location}
                </div>

                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}

          {projects.length === 0 && (
            <div className="text-muted-foreground col-span-full">
              No projects found. Create your first project.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
