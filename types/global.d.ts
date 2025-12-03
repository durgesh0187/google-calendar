declare global {
  namespace JSX {
    interface IntrinsicElements {
      "full-calendar": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
