# Etymo

A Nodejs wrapper for fetching etymology information in various langauges from Douglas Harper's wonderful Online Etymology Dictionary (https://www.etymonline.com)

Please refer to Online Etymology Dictionary's [Terms of Service](https://www.etymonline.com/legal/terms) to make sure you are not infringing intellectual property rights with your use case, and please be kind to their servers.

<a href="https://www.buymeacoffee.com/clairefro"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a potato&emoji=🍠&slug=clairefro&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>

## Get started

Add `etymo-js` to your Node project

```bash
npm install etymo-js
```

```js
// initialize
const etymo = new Etymo();

async function run() {
  const results = await etymo.search("remember");
  console.log(results);
}

run();
```

Returns an array of search results, with most relevant at position `0`:

```json
[
      {
        "term": "remember (v.)",
        "def": "mid-14c., remembren, \"keep or bear (something or someone) in mind, retain in the memory, preserve unforgotten,\" from Old French remembrer [...]",
        "path": "/word/disremember#etymonline_v_11486",
        "id": "11486"
      },
      {
        "term": "*(s)mer- (1)",
        "def": "Proto-Indo-European root meaning \"to remember.\" \n' +
          'It forms all or part of: commemorate; commemoration; mourn; memo; memoir; memorable; memorandum; memorial [...]"
        "path": "/word/*%28s%29mer-#etymonline_v_53458",
        "id": "53458"
      },
      {
        "term": "remembrance (n.)",
        "def": "c. 1300, remembraunce, \"a memory, recollection,\" from Old French remembrance (11c.), from remembrer (see remember). From late 14c. as \"consideration, reflection; present consciousness [...]",
        "path": "/word/remembrance#etymonline_v_37059",
        "id": "37059"
      } ...
      ]
```

## Usage

Note - requires internet connection to retrieve data.

### .search()

**Basic search**

Returns array of search result obejcts (`{ term, def, path, id}`), ordered by relevance

```js
const res = await etymo.search("remember");
```

```json
[
    {
    "term": "remember (v.)",
    "def": "mid-14c., remembren, \"keep or bear (something or someone) in mind, retain in the memory, preserve unforgotten,\" from Old French remembrer [...]",
    "path": "/word/disremember#etymonline_v_11486",
    "id": "11486"
    }, ...
]
```

**Multi word search**

It's fine to use spaces in the search term

```js
const res = await etymo.search("back seat");
```

```json
[
  {
    "term": "back seat (n.)",
    "def": "also back-seat, 1832, originally of coaches, from back (adj.) + seat (n.). Used figuratively for \"less or least prominent position\" by 1868. Back-seat driver \"passenger who gives the driver unwanted advice\" is [...]",
    "path": "/word/back%20seat#etymonline_v_42318",
    "id": "42318"
  }, ...
]
```

### .get() entry by path

You can use any of the paths returned from search to get single entries. You can also specifify the language of the definition returned.

Returns a single entry (`{ term, def, path, id}`)

**get English definition**

```js
const res = await etymo.search("/word/remember#etymonline_v_10402");
```

```json
{
  "term": "remember (v.)",
  "def": "mid-14c., remembren, \"keep or bear (something or someone) in mind, retain in the memory, preserve unforgotten,\" from Old French remembrer \"remember, recall, bring to mind\" (11c.), from Latin rememorari \"recall to mind, remember,\" from re- \"again\" (see re-) + memorari \"be mindful of, [...]",
  "path": "/word/remember#etymonline_v_10402",
  "id": "10402"
}
```

**get definition in another language**

You can specify an option `lang` parameter . See avaialable languages below. Note that the `lang` parameter will override any language pre-pended in the provided `path`.

```js
// get definition in Japanese
const res = await etymo.search("/word/remember#etymonline_v_10402", {
  lang: "jp",
});
```

```json
{
  "term": "remember (v.)",
  "def": "14世紀中頃、remembren は、「（何かや誰かを）心に留める、記憶に保つ、忘れないようにする」という意味で使われました。これは、古フランス語の remembrer「思い出す、思い起こす」（11世紀）から来ており、ラテン語の rememorari「思い出す、記憶する」から派生したものです。これは、re-「再び」（re- を参照） [...]",
  "path": "/word/remember#etymonline_v_10402",
  "id": "10402"
}
```

Supported languages
| Language | Two-Letter Code |
|-------------|-----------------|
| English | `en` |
| Spanish | `es` |
| French | `fr` |
| German | `de` |
| Italian | `it` |
| Portuguese | `pt` |
| Japanese | `ja` |
| Chinese | `zh` |
| Korean | `ko` |

### .trending()

Returns a list of terms currently trending on etymonline.com

```js
const res = await etymo.trending();

// => ['nepotism','nickelodeon','hero','island','ego','fast','spell','gospel','father','confidence']
```

## Development

Package created with [@el3um4s/typescript-npm-package-starter](https://www.npmjs.com/package/@el3um4s/typescript-npm-package-starter)

Ignore the TS errors in the test file 🤷 Jest doesn't seem to care.

### Build the package

Run

```bash
npm run build
```

### Test the package

You can test the code with [Jest](https://jestjs.io/)

```bash
npm test
```

You can find the test coverage in `coverage/lcov-report/index.html`.

### Check dependencies

You can check and upgrade dependencies to the latest versions, ignoring specified versions. with [npm-check-updates](https://www.npmjs.com/package/npm-check-updates):

```bash
npm run check-updates
```

You can also use `npm run check-updates:minor` to update only patch and minor.

Instead `npm run check-updates:patch` only updates patch.

### Publish

First commit the changes to GitHub. Then login to your [NPM](https://www.npmjs.com) account (If you don’t have an account you can do so on [https://www.npmjs.com/signup](https://www.npmjs.com/signup))

```bash
npm login
```

Then run publish:

```bash
npm publish
```

If you're using a scoped name use:

```bash
npm publish --access public
```

### Bumping a new version

To update the package use:

```bash
npm version patch
```

and then

```bash
npm publish
```
