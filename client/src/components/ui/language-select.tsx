import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function LanguageSelect() {
  const { t, i18n } = useTranslation("global");

  function onLanguageChange(event: string) {
    i18n.changeLanguage(event);
  }
  return (
    <div>
      <Select onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t(i18n.language)} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("languages")}</SelectLabel>
            <SelectItem value="ru">Русский</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
