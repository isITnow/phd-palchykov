const CollaborationCategory = ({ children, classnames, title }) => (
  <div className={classnames}>
    <h3 className="fw-bold mb-4 text-center text-secondary">{title}</h3>
    {children}
  </div>
);

export default CollaborationCategory;
