// src/pages/Profile.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Role:</strong> {user.role}
      </div>
      {/* Thêm các thông tin khác của user nếu cần */}
    </div>
  );
}

export default Profile;
