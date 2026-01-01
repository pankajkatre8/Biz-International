type Props = {
  projects: any[];
};

export default function SupervisorStats({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-5 shadow border">
        <p className="text-sm text-gray-500">Assigned Projects</p>
        <p className="text-3xl font-bold mt-1">{projects.length}</p>
      </div>

      <div className="bg-white rounded-xl p-5 shadow border">
        <p className="text-sm text-gray-500">Active Sites</p>
        <p className="text-3xl font-bold mt-1">
          {projects.length}
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 shadow border">
        <p className="text-sm text-gray-500">Status</p>
        <p className="text-sm font-medium mt-2 text-green-600">
          On Track
        </p>
      </div>
    </div>
  );
}
