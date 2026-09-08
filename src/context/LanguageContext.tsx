/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

export type HomeLanguage = "it" | "en" | "ja"

interface LanguageContextType {
  language: HomeLanguage
  setLanguage: (language: HomeLanguage) => void
}

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguage] =
    useState<HomeLanguage>("en")

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    )
  }

  return context
}