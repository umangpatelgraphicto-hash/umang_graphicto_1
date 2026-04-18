export const ProfileTab: React.FC = () => (
  <div className="bg-white w-full lg:w-2/3 p-4 lg:p-6 rounded shadow-md">
    <div className="mb-4 mt-5">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        className="mt-2 block w-full p-2 text-black border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700"
      >
        Country
      </label>
      <select
        id="country"
        name="country"
        className="mt-2 block w-full sm:w-60 p-2 text-black border border-gray-300 rounded-md"
      >
        <option value="">Select your country</option>
        <option value="United States">United States</option>
        <option value="Canada">Canada</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="India">India</option>
        <option value="Australia">Australia</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="Japan">Japan</option>
        <option value="China">China</option>
        <option value="Brazil">Brazil</option>
      </select>
    </div>
    <button className="bg-blue-500 text-white mt-5 px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
      Save Changes
    </button>
  </div>
);
