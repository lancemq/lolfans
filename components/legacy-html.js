export function LegacyHtml({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
