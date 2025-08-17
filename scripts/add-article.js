import readline from 'readline/promises';
import { stdin, stdout } from 'process';

import entries from "../_data/entries.json" with { type: "json" };
import fs from 'fs';

const WIKIPEDIA_ARTICLE_SUMMARY_API = "https://en.wikipedia.org/api/rest_v1/page/summary/";

function articleToTitle(article) {
  return article.split("/").pop();
}

(async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    let url = await rl.question('URL: ');
    url = url.trim();

    if (!url) {
        console.log('No URL provided, exiting.');
        rl.close();
        process.exit(1);
    }


    const result = await fetch(`${WIKIPEDIA_ARTICLE_SUMMARY_API}${articleToTitle(url)}`);
    const data = await result.json();

    let title = await rl.question(`Title (${data.titles?.normalized}): `)
    title = title.trim() || data.titles?.normalized;

    let description = await rl.question(`Description (${data.description}): `);
    description = description.trim() || data.description;

    const currentDate = new Date();
    const defaultDate = currentDate.toISOString().split('T')[0];
    let date = await rl.question(`Date (${defaultDate}):`);
    date = date.trim() || defaultDate;

    let author = await rl.question(`Author: `);
    author = author.trim();
    
    entries.push({
        date,
        url,
        title,
        description,
        author,
    });
    console.log(`✓ Article added: ${title}`);

    await fs.promises.writeFile("./_data/entries.json", JSON.stringify(entries, null, 2));
  } catch(err) {
    console.log(`Error: `, err);
  } finally {
    rl.close();
  }
  process.exit(1);
})();

