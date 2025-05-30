const UserList = ({ users, currentUser }) => {
  return (
    <div className="w-64 bg-[#111B21] p-4 border-r border-gray-700">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user, idx) => (
          <li
            key={idx}
            className={`p-2 rounded ${
              user === currentUser ? "bg-green-600 font-bold" : "bg-gray-700"
            }`}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
