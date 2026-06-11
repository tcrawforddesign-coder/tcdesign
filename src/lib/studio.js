export function splitProjectTitle(title = "") {
  const segments = title.split(/—|-/).map((segment) => segment.trim()).filter(Boolean);
  return { primary: segments[0] ?? title, secondary: segments.slice(1).join(" — ") };
}

export function normalizeWord(value = "") {
  return value.toLowerCase().replace(/[^\w'-]/g, "");
}

export function tokenIsInPhrases(tokens, phrases = [], tokenIndex) {
  return phrases.some((phrase) => {
    const phraseTokens = phrase.split(/\s+/).filter(Boolean);
    if (!phraseTokens.length) return false;
    return phraseTokens.every((phraseToken, offset) => normalizeWord(tokens[tokenIndex + offset]) === normalizeWord(phraseToken));
  });
}
