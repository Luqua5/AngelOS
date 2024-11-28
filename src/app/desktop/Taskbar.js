// src/app/desktop/Taskbar.js
const Taskbar = ({ openWindows }) => (
    <div className="bg-black absolute bottom-0 w-full h-10 bg-gray-900 flex items-center">
        {openWindows.map((title, index) => (
        <div key={index} className="text-white mx-2 px-4 py-1 bg-gray-700 rounded cursor-pointer">
            {title}
        </div>
        ))}
    </div>
);
  
export default Taskbar;
  