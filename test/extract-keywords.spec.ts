import { extractKeywords } from "../src";

describe("extractKeywords", () => {
  it("should extract some keywords", async () => {
    expect(
      await extractKeywords(
        "the t-shirt is green and nice and soft, it is well liked by both men and women, great success. my dad loved it when he tried it"
      )
    ).toMatchInlineSnapshot(`
      Array [
        "shirt",
        "men",
        "dad",
        "great",
        "success",
        "nice",
        "green",
      ]
    `);
  });

  it("salient keywords should appear sooner than less salient keywords", async () => {
    expect(
      await extractKeywords(
        "shirts are great, I love shirts, I wear a shirt every day, my favourite article of clothing is shirts, especially green ones"
      )
    ).toMatchInlineSnapshot(`
      Array [
        "shirt",
        "great",
        "clothing",
        "article",
        "favourite",
        "green",
        "love",
        "day",
        "wear",
      ]
    `);
  });
});
