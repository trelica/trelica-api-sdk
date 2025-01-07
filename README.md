# Trelica API SDK

This is a TypeScript SDK for interacting with the Trelica API.

## Getting started

Create an [OAuth client in Trelica](https://help.trelica.com/hc/en-us/articles/7739284192413-Creating-an-app).

Note that the SDK uses [client credentials flow](https://help.trelica.com/hc/en-us/articles/7739284069277-Client-credentials-flow) for authentication.

Install the SDK using npm or yarn

```
npm install https://github.com/trelica/trelica-api-sdk
```

or

```
yarn add https://github.com/trelica/trelica-api-sdk
```

Then create a javascript file, inserting the client Id and secret.

```
import { TrelicaSDK } from "trelica-api-sdk";

(async () => {
    const sdk = new TrelicaSDK(
        "https://app.trelica.com",
        "XXXXXXXXXXXXX",
        "XXXXXXXXXXXXX"
    );

    const apps = await sdk.apps.listAllApps({
        filter: `status eq "Managed"`,
    });
    console.log("Managed apps:", apps.map((a) => a.name).join("\n"));
})()
```

## Conventions

The SDK often provides two variants when listing data, e.g. either `listAssets` or `listAllAssets`.

`listAssets` will return a single page of data from the API, with the next page URL in the `next` attribute
if there are more pages to fetch.

`listAllAssets` will fetch all pages and put the results into a single array.

## Errors

The SDK throws SDKServerError exceptions with a context object describing the issue.

e.g.

```
context: {
    url: 'https://app.trelica.com/api/people/v1/teams/674a519b2d5c6e84a3851e65',
    responseCode: 404,
    responseText: '{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"extensions":{"traceId":"00-2xxxxxxxxxxxxxxx3-01"}}'
}
```

## Supported APIs

The SDK supports

-   Apps (and associated users)
-   Assets
-   Audit logs
-   Contracts
-   People (and associated apps)
-   Teams
-   Workflows

## Utility functions

### Iterating over a team hierarchy

Use the TeamNodeIterator to iterate depth first through the hierarchy

```
import { TrelicaSDK, utils } from "trelica-api-sdk";

const teamHierarchy = await sdk.teams.listTeamsAsTree();

const iterator = new utils.TeamNodeIterator(teamHierarchy);
for (const { node, depth, path } of iterator) {
    console.log(
        `Node: ${node.name}, Depth: ${depth}, Path: ${path.join(" > ")}`
    );
}
```

### Finding a specific team in the hierarchy

If you want to find a specific team node, then use the `findNodeByName` utility function.

```
import { TrelicaSDK, utils } from "trelica-api-sdk";

const teamHierarchy = await sdk.teams.listTeamsAsTree();
const result = utils.findNodeByName(teamHierarchy, "Customer Success");

if (result.node) {
    console.log(`Found node:`, result.node);
    console.log(`Path: ${result.path.join(" > ")}`);
} else {
    console.log("Node not found");
}
```
