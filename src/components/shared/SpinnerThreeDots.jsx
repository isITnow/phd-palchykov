import { ThreeDots } from 'react-loader-spinner';

const SpinnerThreeDots = () => (
  <ThreeDots
    height="100%"
    width="5rem"
    radius="9"
    color="#a5cfff"
    ariaLabel="three-dots-loading"
    visible={true}
  />
);

export default SpinnerThreeDots;
