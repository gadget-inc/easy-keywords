# easy-keywords

Simple utility for extracting some high-salience normalized keywords from a string of English text.

## Installation

Install the `easy-keywords` npm package:

```bash
npm install easy-keywords
```

or

```bash
yarn install easy-keywords
```

## Usage

Use the `extractKeywords` function to extract keywords from a string.

```typescript
import { extractKeywords } from "easy-keywords"

const keywords = await extractKeywords("the t-shirt is green and nice and soft, it is well liked by both men and women, great success. my dad loved it when he tried it");
// returns an array of strings: [
//   "shirt",
//   "men",
//   "dad",
//   "great",
//   "success",
//   "nice",
//   "green",
// ]
```

### Options:

`extractKeywords` takes options as a second argument.

- `max`: Return a maximum of n keywords, like `extractKeywords("some phrase", {max: 1})` to get the top scoring keyword from a phrase.

## Algorithm

`easy-keywords` uses the `wordnet-db` to filter down the input string to just nouns and verbs, and then uses TF/IDF to determine term salience, which is a fancy way of saying that terms that occur more frequently in the input text are assumed to be more important. After normalizing each term and identifying which terms have high TF/IDF scores, we filter down to only nouns and verbs to try to get a bit better signal-to-noise.

TF/IDF is the same algorithm that underlies Lucene's and Elasticsearch's idea of search salience and is a good starting point. If you want higher salience, you could put your entire corpus of documents into a search system and use TF/IDF over the whole corpus. This is currently out of scope for `easy-keywords` but PRs are welcome!
