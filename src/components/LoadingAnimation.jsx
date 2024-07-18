const LoadingAnimation = () => (
    <div className="loading-container">
      <div className="spinner"></div>
      <style>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .spinner {
          border: 8px solid #fff;
          border-top: 8px solid #aaa;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  export default LoadingAnimation;