export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 " style={{margin:"0px", backdropFilter:"blur(4px)",transition:"ease-in"}}>

      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>

      </div>
    </div>
  );
}