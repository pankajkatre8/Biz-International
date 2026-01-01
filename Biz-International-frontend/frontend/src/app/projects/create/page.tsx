'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

interface CreateProjectForm {
  name: string;
  location: string;
  floors: number;
}

export default function CreateProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectForm>();

  const onSubmit = async (data: CreateProjectForm) => {
  setLoading(true);
  try {
    const res = await api.client.post('/projects', data);

    // 🔥 Normalize backend response
    const project =
      res.data?.id
        ? res.data
        : res.data?.data
        ? res.data.data
        : res.data?.project;

    if (!project?.id) {
      throw new Error('Project ID not returned from backend');
    }

    router.push(`/projects/${project.id}`);
  } catch (error) {
    console.error('Failed to create project', error);
    alert('Project created but redirect failed');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/projects"
          className="flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>
              <Input
                {...register('name', { required: 'Project name is required' })}
                placeholder="e.g. Sunrise Apartments"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                {...register('location', {
                  required: 'Location is required',
                })}
                placeholder="e.g. Downtown, Mumbai"
              />
              {errors.location && (
                <p className="text-red-500 text-xs">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Floors</label>
              <Input
                type="number"
                {...register('floors', {
                  required: 'Number of floors is required',
                  min: 1,
                })}
                placeholder="e.g. 5"
              />
              {errors.floors && (
                <p className="text-red-500 text-xs">
                  {errors.floors.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
