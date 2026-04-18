export const SecurityTab: React.FC = () => (
  <div className="bg-white w-full lg:w-2/3 p-4 lg:p-6 rounded shadow-md">
    <div className="mb-4 mt-5">
      <label
        htmlFor="current-password"
        className="block text-sm font-medium text-gray-700"
      >
        Current Password
      </label>
      <input
        type="password"
        id="current-password"
        name="current-password"
        placeholder="Enter your current password"
        className="mt-2 block w-full p-2 text-black border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="new-password"
        className="block text-sm font-medium text-gray-700"
      >
        New Password
      </label>
      <input
        type="password"
        id="new-password"
        name="new-password"
        placeholder="Enter your new password"
        className="mt-2 block w-full p-2 text-black border border-gray-300 rounded-md"
      />
    </div>
    <button className="bg-blue-500 text-white mt-5 px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
      Update Password
    </button>
  </div>
);
 