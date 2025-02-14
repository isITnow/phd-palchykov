import FormTitle from '@/components/FormComponents/FormTitle';
import BackBtn from '@/components/shared/BackBtn';
import Section from '@/components/shared/Section';

const NoItemToEdit = ({ item, backPath }) => (
  <Section>
    <FormTitle>{`No ${item} To Edit`}</FormTitle>
    <div className="d-flex justify-content-center mt-3">
      <BackBtn path={backPath}>Cancel</BackBtn>
    </div>
  </Section>
);

export default NoItemToEdit;
