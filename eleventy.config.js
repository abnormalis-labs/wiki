import { DateTime } from "luxon";
import _ from "lodash";

import entries from "./_data/entries.json" with { type: "json" };

export default function(eleventyConfig) {
  eleventyConfig.addFilter("print", JSON.stringify);
  eleventyConfig.addFilter("asPercent", function(value, total) {
    if (total === 0) return "0%";
    return ((value / total) * 100).toFixed(0) + "%";
  });

  eleventyConfig.addPassthroughCopy({
    "assets/**": undefined,
    'node_modules/magick.css/magick.min.css': 'assets/styles/magick.css',
    'node_modules/normalize.css/normalize.css': 'assets/styles/normalize.css'
  });

  eleventyConfig.addGlobalData('entriesByYearMonth', function() {
    return _.chain(entries)
      .groupBy((entry) => DateTime.fromISO(entry.date).year)
      .map((yearEntries, year) => [
        year,
        _.sortBy(yearEntries, (entry) => -DateTime.fromISO(entry.date))
      ])
      .sortBy(([year]) => -year)
      .value();
  }());

  eleventyConfig.addGlobalData('stats', function() {
    const data = {
      totalEntries: entries.length,
      entriesByAuthor: _.chain(entries)
        .countBy('author')
        .map((count, author) => [author, count])
        .value(),
      entriesByYear: _.chain(entries)
        .countBy((entry) => DateTime.fromISO(entry.date).year)
        .map((count, year) => [year, count])
        .value()
    };
    return data;
  });
};