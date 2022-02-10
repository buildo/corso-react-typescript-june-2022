import { TranslatedChildren } from "../locales/i18n";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  children?: TranslatedChildren;
};

export const Span = (props: Props) => <span {...props} />;
