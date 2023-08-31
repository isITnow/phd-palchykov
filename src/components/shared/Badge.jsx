const Badge = ({ index, text }) => {
  return (
    <div className="text-end border-bottom border-3 mb-3 py-2">
      <span className="px-3 badge rounded-pill text-bg-secondary ">
        {`${text} ${index + 1}`}
      </span>
    </div>
  );
};

export default Badge;
