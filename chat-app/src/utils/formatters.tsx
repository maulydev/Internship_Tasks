export const linkify = (content: string) => {
  const urlRegex = /(\bhttps?:\/\/[^\s]+)/g;

  return content.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          href={part}
          key={index}
          target="_blank"
          rel="noopener noreferer"
          className="underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};
