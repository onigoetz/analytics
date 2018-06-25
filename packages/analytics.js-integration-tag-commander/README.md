# TagCommander implementation
https://commandersact.com/en/products/tagcommander/

## Implementation specificities
TagCommander doesn't provide a main JavaScript file that load the required tags depending on the configuration (unlike GTM).

Instead of that, on every tag modification (tag configuration, adding / removing a tag), a new version of the Container
is generated. The Container is a JavaScript file that loads every required tags with the correct configuration.

TagCommander allow to have a unique URL for a specific container, independently of the version. The container can be
pushed to a CDN provided by TagCommander.

## Configuration
There are two configuration keys required for the TagCommander integration:
 * *containerId*: ID of the container (stay the same for every container version)
 * *url*: URL of the container. The easiest way to handle this value is to publish the last version of the container
   directly in the TagCommander CDN and use the returned URL.
