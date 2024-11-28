// src/app/desktop/Icon.js
const Icon = ({ label, onClick }) => (
    <div className="flex flex-col items-center m-4 cursor-pointer" onClick={onClick}>
        <div className="w-12 h-12 bg-gray-300 rounded mb-2" /> {/* Placeholder pour une icône */}
        <span className="text-white">{label}</span>
    </div>
);

export default Icon;
  