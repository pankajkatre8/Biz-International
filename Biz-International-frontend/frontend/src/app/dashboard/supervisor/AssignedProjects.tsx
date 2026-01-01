type Props = {
  projects: any[];
};

export default function AssignedProjects({ projects }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow border">
      <h2 className="text-lg font-semibold mb-4">
        Assigned Projects
      </h2>

      {projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-sm">
            No projects assigned yet.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Projects assigned by admin will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.location || "No location"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
