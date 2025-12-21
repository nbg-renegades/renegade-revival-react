import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "de" ? "en" : "de")}
      aria-label="Toggle language"
      className="h-9 px-2 font-medium text-xs"
    >
      {language === "de" ? "EN" : "DE"}
    </Button>
  );
}
