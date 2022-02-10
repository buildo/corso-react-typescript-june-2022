import { TranslatedString } from "./locales/i18n";

type Props = {
  status: "idle" | "loading" | "error" | "success";
  onClick: () => void;
  labels: Record<Props["status"], TranslatedString>;
  className?: string;
};

export function AsyncButton({ status, onClick, labels, className }: Props) {
  return (
    <button className={className} onClick={onClick}>
      {labels[status]}
    </button>
  );
}
