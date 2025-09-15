// apps/tools/app/(userArea)/(tools)/(TextAnalysisTools)/word-counter/WordCounterClient.tsx

"use client";

import { Button } from "@shared/components/ui/Button";
import { Input, TextArea } from "@shared/components/ui/Input";
import Section from "@shared/components/ui/Section";
import { cn } from "@shared/utils/cn";
import copyToClipboard from "@shared/utils/CopyToClipboard";
import { useMemo, useState } from "react";

type Keyword = { word: string; count: number };

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const [wordLimit, setWordLimit] = useState<number | "">("");
  const [charLimit, setCharLimit] = useState<number | "">("");
  const [topN, setTopN] = useState(5);

  // Word and character counts
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s+/g, "").length;
  const words = useMemo(() => {
    const ws = text
      .trim()
      .split(/\s+/)
      .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
      .filter(Boolean);
    return ws;
  }, [text]);
  const wordCount = words.length;

  // Keyword extraction
  const keywords: Keyword[] = useMemo(() => {
    const freq = new Map<string, number>();
    for (const w of words) {
      const lower = w.toLowerCase();
      if (lower.length < 1) continue;
      freq.set(lower, (freq.get(lower) || 0) + 1);
    }
    return Array.from(freq.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
      .slice(0, Math.max(0, Number(topN) || 0));
  }, [words, topN]);

  // Progress percentages
  const wordProgress = wordLimit
    ? Math.min(100, Math.round((wordCount / Number(wordLimit)) * 100))
    : 0;
  const charProgress = charLimit
    ? Math.min(100, Math.round((charCount / Number(charLimit)) * 100))
    : 0;

  function handleDownload() {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-counter-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Section className="grid grid-cols-1 md:grid-cols-3 gap-4" title="Word & Character Counter">
      {/* Text editor */}
      <div className="md:col-span-2 flex flex-col">
        <label className="mb-2 font-semibold">Enter your text</label>
        <TextArea
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          maxLength={50000}
          className="w-full max-h-[70vh]"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={() => setText("")}>Clear</Button>
          <Button onClick={() => copyToClipboard(text)}>Copy</Button>
          <Button onClick={handleDownload}>Download .txt</Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div
            className={cn(
              "bg-slate-50 dark:bg-slate-900 border p-3 rounded-lg flex flex-col justify-between",
              wordLimit &&
                (wordCount > wordLimit
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-700"
                  : "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-700")
            )}
          >
            <div>
              <div className="text-xs uppercase tracking-wide">Words</div>
              <div className="text-2xl font-bold">{wordCount}</div>
            </div>
            <div className="mt-2">
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${wordLimit ? wordProgress : 0}%` }}
                  className={cn(
                    "h-full bg-slate-600 dark:bg-slate-400 rounded-full transition-all",
                    wordLimit &&
                      (wordCount > wordLimit
                        ? "bg-red-600 dark:bg-red-400"
                        : "bg-green-600 dark:bg-green-400")
                  )}
                />
              </div>
              {wordLimit ? (
                <div className="mt-2 text-xs">
                  {wordProgress}% of {wordLimit} words
                </div>
              ) : (
                <div className="mt-2 text-xs">No limit set</div>
              )}
            </div>
          </div>

          <div
            className={cn(
              "bg-slate-50 dark:bg-slate-900 border p-3 rounded-lg flex flex-col justify-between",
              charLimit &&
                (charCount > charLimit
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-700"
                  : "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-700")
            )}
          >
            <div>
              <div className="text-xs uppercase tracking-wide">Characters</div>
              <div className="text-2xl font-bold">{charCount}</div>
              <div className="mt-2 text-xs">{charCountNoSpaces} characters (no spaces)</div>
            </div>
            <div className="mt-2">
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${charLimit ? charProgress : 0}%` }}
                  className={cn(
                    "h-full bg-slate-600 dark:bg-slate-400 rounded-full transition-all",
                    charLimit &&
                      (charCount > charLimit
                        ? "bg-red-600 dark:bg-red-400"
                        : "bg-green-600 dark:bg-green-400")
                  )}
                />
              </div>
              {charLimit ? (
                <div className="mt-2 text-xs">
                  {charProgress}% of {charLimit} chars
                </div>
              ) : (
                <div className="mt-2 text-xs">No limit set</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            inputMode="numeric"
            value={String(wordLimit)}
            onChange={(e) => {
              const n = Number(e.target.value);
              setWordLimit(Number.isFinite(n) && n >= 0 ? n : "");
            }}
            placeholder="e.g. 500"
            label="Word limit"
          />

          <Input
            inputMode="numeric"
            value={String(charLimit)}
            onChange={(e) => {
              const n = Number(e.target.value);
              setCharLimit(Number.isFinite(n) && n >= 0 ? n : "");
            }}
            placeholder="e.g. 280"
            label="Character limit"
          />

          <Input
            inputMode="numeric"
            value={String(topN)}
            onChange={(e) => {
              const n = Number(e.target.value);
              setTopN(Number.isFinite(n) && n >= 1 && n <= 20 ? n : 5);
            }}
            onFocus={(e) => e.target.select()}
            placeholder="5"
            label="Top keywords"
          />
        </div>
      </div>

      {/* Keywords Sidebar */}
      <aside className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Top Keywords</h3>
          {keywords.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-300">No keywords yet.</p>
          ) : (
            <ol className="list-decimal pl-5">
              {keywords.map((k) => (
                <li key={k.word} className="text-sm">
                  <span className="font-medium">{k.word}</span>{" "}
                  <span className="text-slate-500 dark:text-slate-400">— {k.count}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </aside>
    </Section>
  );
}
