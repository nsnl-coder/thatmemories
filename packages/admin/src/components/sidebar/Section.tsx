interface Props {
  children: JSX.Element | JSX.Element[];
  sectionName?: string;
}

function Section(props: Props): JSX.Element {
  const { children, sectionName = 'Please provide some section name' } = props;
  return (
    <section className="space-y-2 mb-8">
      <h3 className="uppercase text-p2 text-paragraph-light">
        {' '}
        {sectionName}{' '}
      </h3>
      {children}
    </section>
  );
}

export default Section;
