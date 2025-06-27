import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface MarkdownTextProps {
  content: string | undefined;
  className?: string;
}

const Markdown: React.FC<MarkdownTextProps> = ({ content, className }) => {
  return (
    <ReactMarkdown 
      components={{
        a: ({href, children}) => (
          <Link href={href || '#'} className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </Link>
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;