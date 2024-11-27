const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="loading-spinner text-center">
      <span className="animate-spin text-xl">⌛</span> Loading...
    </div>
  );
};

export default Loading;
