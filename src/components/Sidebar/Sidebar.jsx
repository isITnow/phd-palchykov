import QrCode from '@/components/QRCode/QrCode';
import SocialMedia from '@/components/SocialMedia/SocialMedia';

import photo from '@/assets/images/photo.jpg';
import s from '@/components/Sidebar/sidebar.module.css';

const Sidebar = () => (
  <>
    <div className="mb-4">
      <img
        className={`shadow-sm rounded ${s.img}`}
        src={photo}
        alt="Vitalii Palchykov at work"
      />
    </div>
    <div className="d-flex justify-content-center">
      <SocialMedia position={'justify-content-around'} />
    </div>
    <QrCode />
  </>
);

export default Sidebar;
