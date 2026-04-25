function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      
      <div className="w-full max-w-lg p-6 bg-[#1a1a1a] rounded-xl border border-white/10">
        
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400">✖</button>
        </div>

        {/* CONTENT */}
        {children}

      </div>
    </div>
  );
}

export default Modal;