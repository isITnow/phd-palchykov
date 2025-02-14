import SocialMedia from '@/components/SocialMedia/SocialMedia';
import Address from '@/components/shared/Address';

import dnuImg from '@/assets/images/dnu.jpeg';

const ContactsPage = () => (
  <div className="row row-cols-1 row-cols-md-2">
    <div className="col col-lg-5 mb-3 mb-md-0">
      <Address />
      <SocialMedia all position={'justify-content-start'} />
    </div>
    <div className="col col-lg-7 ">
      <img className="img-fluid shadow-sm rounded" src={dnuImg} alt="DNU" />
    </div>
  </div>
);

export default ContactsPage;
