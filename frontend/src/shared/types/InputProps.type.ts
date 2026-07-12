import type { Input } from "../ui/Input";

export type InputProps = React.ComponentProps<typeof Input> & {
  label?: string;
};