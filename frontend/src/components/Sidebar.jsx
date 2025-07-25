const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-lg font-semibold">Menu</h2>
      <ul className="mt-4 space-y-2">
        <li>
          <a href="#" className="block hover:text-blue-400">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="block hover:text-blue-400">
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="block hover:text-blue-400">
            Profile
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
