# Custom Magento Venia PWA

This repository contains custom components for a Magento PWA Studio project based on Venia. Follow the steps below to set up the base project and integrate the custom changes.

## Prerequisites

- Node.js
- Yarn
- Magento 2.4 backend with GraphQL enabled
- PWA Studio setup documentation: [PWA Studio Guide](https://developer.adobe.com/commerce/pwa-studio/)


## Installation

### 1. Clone the Base PWA Studio Project

First, clone the official PWA Studio project:

```bash
git clone https://github.com/magento/pwa-studio.git
cd pwa-studio
yarn install
```

### 2. Download this repository into the base project

Then, download this repository:

```bash
git remote add custom https://github.com/LiberadoW/venia.git
git fetch custom
git merge custom/main --allow-unrelated-histories
```

Resolve any merge conflicts and make sure that the custom changes are applied.

### 3. Install dependencies 

```
yarn install
```

### 4. Start the dev serves

```
yarn watch
```


