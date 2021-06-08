import { TfIdf, WordNet } from "natural";
const wordnet = new WordNet();

export const extractKeywords = async (
  text: string,
  options: { max?: number } = {}
) => {
  const tfidf = new TfIdf();
  tfidf.addDocument(text);
  const terms = tfidf.listTerms(0);

  const keywords: string[] = [];
  await Promise.all(
    terms.map((term) => {
      return new Promise<void>((resolve) => {
        wordnet.lookup(term.term, (results) => {
          if (
            results.some((result) => result.pos == "n" || result.pos == "v")
          ) {
            keywords.push(term.term);
          }

          resolve();
        });
      });
    })
  );

  if (options.max) {
    return keywords.slice(0, options.max);
  } else {
    return keywords;
  }
};
