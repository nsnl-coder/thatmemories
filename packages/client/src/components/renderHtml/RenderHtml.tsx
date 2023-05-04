interface Props {
  html: string | undefined;
}

function RenderHtml(props: Props): JSX.Element | null {
  const { html } = props;

  if (!html) return null;

  return (
    <div className="ProseMirror">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default RenderHtml;
