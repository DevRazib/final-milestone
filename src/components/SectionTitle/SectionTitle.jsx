
const SectionTitle = ({heading, subHeading}) => {
  return (
    <div className="md:w-4/12 text-center mx-auto my-5">
      <p className="text-yellow-600 py-2"> - - - {subHeading} - - -</p>
      <h3 className="text-3xl border-y-4 py-4 uppercase">{heading}</h3>
    </div>
  );
};

export default SectionTitle;