# CompramosTuMoto Design System

## How to use

```bash
npm install ctm-design-system
```

#### Import and use components

```javascript
import { Button } from 'ctm-design-system';

const Component = () => {
  return (
    <Button
      id={'idForTestingButton'}
      type="button"
      label="Action"
      buttonType={ButtonType.POSITIVE}
      onClick={() => doAction()}
    />
  );
};
```

#### Import and use scss variables and mixins

```scss
@import '~ctm-design-system/dist/tokens';

.my-class {
  color: $color-primary-400;
  padding: $spacing-m;

  @include for-desktop {
    color: $color-grey-400;
  }
}
```

---

## How to develop

#### To build the library

From the package folder, run:

```bash
npm run build
```

#### To deploy the library

From the package folder, run:

```bash
npm run deploy
```

#### How to test in sandbox

From the root folder, run:

```bash
./setup.sh
```

If you get a permission error, run `chmod +x setup.sh` and try again.
