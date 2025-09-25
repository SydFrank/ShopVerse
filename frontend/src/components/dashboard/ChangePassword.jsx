import React from "react";

// Password change form component
const ChangePassword = () => {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl text-slate-600 pb-5 font-semibold">
        Change Password
      </h2>
      {/* Password change form */}
      <form>
        {/* Old password input */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old_password">Old Password</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="old_password"
            id="old_password"
            placeholder="Old Password"
          />
        </div>

        {/* New password input */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="new_password">New Password</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="new_password"
            id="new_password"
            placeholder="New Password"
          />
        </div>

        {/* Confirm password input */}
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm Password"
          />
        </div>

        {/* Submit button */}
        <div>
          <button className="px-8 py-2 bg-[#059473] shadow-lg hover:shadow-green-500/30 text-white rounded-md ">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
