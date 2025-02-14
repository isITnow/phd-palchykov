const Badge = ({ index, text }) => (
  <div className="mb-3">
    <span className="px-3 badge rounded-pill text-bg-secondary ">
      {`${text} ${index + 1}`}
    </span>
  </div>
);

export default Badge;
