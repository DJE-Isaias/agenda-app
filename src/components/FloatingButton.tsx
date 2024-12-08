interface FloatingButtonProps {
    onClick: () => void;
  }
  
  export default function FloatingButton({ onClick }: FloatingButtonProps) {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark"
      >
        +
      </button>
    );
  }
  