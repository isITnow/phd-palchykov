import FormTitle from "../FormComponents/FormTitle";
import BackBtn from "./BackBtn";
import Section from "./Section";

const NoItemToEdit = ({ item, backPath }) => {
  return (
    <Section>
      <FormTitle>{`No ${item} To Edit`}</FormTitle>
      <div className="d-flex justify-content-center mt-3">
        <BackBtn path={backPath}>Cancel</BackBtn>
      </div>
    </Section>
  );
};

export default NoItemToEdit;
