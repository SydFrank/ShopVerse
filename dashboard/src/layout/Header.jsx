import { FaList } from "react-icons/fa6";

/**
 * Header Component
 *
 * Shared header for the admin layout.
 *
 * Props:
 * - showSidebar (boolean): Whether the sidebar is currently open (for mobile).
 * - setShowSidebar (function): Function to toggle sidebar visibility.
 *
 * Features:
 * - Fixed header with full width and high z-index.
 * - Responsive sidebar toggle button (visible only on small screens).
 * - Search input (visible on medium and larger screens).
 * - User profile section with name, role, and avatar.
 */

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    // Outer wrapper: fixed at top, spans full width, with padding and high z-index to stay above other elements
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      {/* Header container: shifts right on large screens to accommodate sidebar, includes background and transition */}
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all">
        {/* Sidebar toggle button (only visible on small screens) */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] round-sm bg-indigo-500 shadow-lg hover: shadow-indigo-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        {/* Search input (only visible on medium and larger screens) */}
        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#423d72] 
            focus: border-indigo-300 overflow-hidden"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        {/* User profile section (includes name, role, and avatar) */}
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-md font-bold ">Frank Xu</h2>
                <span className="text-[14px] font-normal">Admin</span>
              </div>
              <img
                className="w-[45px] h-[45px] rounded-full overflow-hidden"
                src="/images/admin.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
