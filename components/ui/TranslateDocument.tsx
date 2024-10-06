import React, { FormEvent, useState, useTransition } from "react";
import * as Y from "yjs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./select";
import { LanguagesIcon, ChevronDownIcon } from "lucide-react";
import { SelectContent } from "@radix-ui/react-select";
import { toast } from "sonner";

type Language = "english" | "spanish" | "chinese";
const languages: Language[] = ["english", "chinese", "spanish"];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [language, setLanguage] = useState<string>("");
    const [summary, setSummary] = useState<string>("");

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();
        if (!language) return;

        setIsTranslating(true);
        const toastId = toast.loading("Translating...");

        try {
            const documentData = doc.get('document-store').toJSON();
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translatedocument`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    documentData: documentData,
                    targeting: language
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setSummary(data.translated_text);  // Set the translated text
            toast.success("Translation completed!", { id: toastId });
        } catch (error) {
            console.error("Translation error:", error);
            toast.error("Failed to translate. Please try again.", { id: toastId });
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="border border-red-500 hover:bg-red-100 transition-colors flex items-center space-x-2 px-4 py-2 rounded-full"
                >
                    <LanguagesIcon className="w-5 h-5" />
                    <span>Translate</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-8 bg-white rounded-lg shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                        Translate the Document
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-600">
                        Select the language and AI will translate a summary of the document
                        into the selected language.
                    </DialogDescription>
                </DialogHeader>
                <hr className="my-6 border-gray-200" />
                <form className="flex flex-col gap-4" onSubmit={handleAskQuestion}>
                    <Select value={language} onValueChange={(value) => setLanguage(value)}>
                        <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-white">
                            <SelectValue placeholder="Select a language" />
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg">
                            {languages.map((lang) => (
                                <SelectItem
                                    key={lang}
                                    value={lang}
                                    className="p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 ease-in-out"
                                >
                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        type="submit"
                        disabled={isTranslating || !language}
                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-lg"
                    >
                        {isTranslating ? "Translating..." : "Translate"}
                    </Button>
                </form>
                <hr className="my-6 border-gray-200" />
                {/* Display the translated summary here */}
                {summary && (
                    <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                        <h3 className="font-semibold text-lg">Translated Text:</h3>
                        <p className="text-gray-700">{summary}</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TranslateDocument;
