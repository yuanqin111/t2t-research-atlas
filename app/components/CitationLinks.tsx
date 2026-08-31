"use client";

import { useLanguage } from "./LanguageContext";

export default function CitationLinks({ ids, label }: { ids: number[]; label?: string }) {
  const { pick } = useLanguage();
  const displayLabel = label ?? pick("参考文献", "References");
  return (
    <div className="citation-links" aria-label={pick(`${displayLabel}编号`, `${displayLabel} numbers`)}>
      <span>{displayLabel}</span>
      <div>
        {ids.map((id) => <a key={id} href={`#ref-${id}`} aria-label={pick(`跳转到参考文献 ${id}`, `Go to reference ${id}`)}>[{id}]</a>)}
      </div>
    </div>
  );
}
