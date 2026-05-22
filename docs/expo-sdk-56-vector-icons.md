# Expo SDK 56: Bottom Tab Icons Showing `?`

## Symptom

After updating to Expo SDK 56, all bottom tab icons rendered as `?`.

The affected code used `react-native-vector-icons` directly:

```js
import FontIcon from 'react-native-vector-icons/FontAwesome'
```

The tab icon names themselves were valid, for example `home`, `user`, and
`address-card`.

## Cause

`react-native-vector-icons` renders icons as text glyphs from bundled icon font
files. After the SDK update, the FontAwesome font was not registered before the
tabs rendered, so React Native displayed the glyph fallback character instead of
the icon.

This can happen even when the icon name exists in the glyph map. In that case,
the issue is not the icon name; it is the font family not being available at
runtime.

## Fix

Load the icon font files explicitly through the existing `expo-font` preload
path in `src/theme/fonts.js`.

The important font family names are:

- `FontAwesome` for `react-native-vector-icons/FontAwesome`
- `FontAwesome5Free-Regular` and `FontAwesome5Free-Solid` for iOS
- `FontAwesome5_Regular` and `FontAwesome5_Solid` for Android/web style
  resolution
- `FontAwesome5Brands-Regular` and `FontAwesome5_Brands` for brand icons

Example:

```js
{
  FontAwesome: require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
}
```

## Verification

Run Expo with a cleared Metro cache after changing font loading:

```sh
npx expo start -c
```

Then confirm the bottom tabs render actual icons instead of `?`.

## Notes

For future SDK upgrades, if vector icons render as `?`, check these in order:

1. The icon name exists in the target icon set glyph map.
2. The matching TTF is loaded with the same font family name used by the icon
   component.
3. Metro cache has been cleared after changing asset or font loading.

