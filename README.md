# CompramosTuMoto Design System

## How to install

```
npm install ctm-design-system
```

## How to test in sandbox

1. Inside the package folder run:

   ```
   npm i
   npm run build
   npm link
   ```

2. Inside the sandbox folder run:

   ```
   npm i
   npm link ctm-design-system
   ```

3. Inside the package folder run:

   ```
   npm link ../sandbox/node_modules/react from package
   ```

4. Inside the sandbox folder run:

   ```
   npm run start
   ```

5. Each time you make changes in the package, you need to run:

   ```
   npm run build
   ```
